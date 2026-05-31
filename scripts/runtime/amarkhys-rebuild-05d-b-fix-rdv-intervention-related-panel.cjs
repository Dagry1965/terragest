const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/rendezvous/rendezvous.module.ts";
const reportRel = "docs/audits/AMARKHYS-REBUILD-05D-B-fix-rdv-intervention-related-panel.md";

const modulePath = path.join(root, moduleRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("Missing file: " + moduleRel);
}

const backupPath = modulePath + ".bak-rebuild-05d-b-rdv-intervention-panel";
fs.copyFileSync(modulePath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(modulePath, "utf8");
const before = content;

function findMatchingBrace(source, openIndex) {
  let depth = 0;
  let quote = null;
  let escape = false;

  for (let i = openIndex; i < source.length; i++) {
    const ch = source[i];

    if (escape) {
      escape = false;
      continue;
    }

    if (ch === "\\") {
      escape = true;
      continue;
    }

    if (quote) {
      if (ch === quote) quote = null;
      continue;
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      continue;
    }

    if (ch === "{") depth++;
    if (ch === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }

  return -1;
}

const keyMarker = 'key: "interventions-rendezvous"';
const keyIndex = content.indexOf(keyMarker);

if (keyIndex === -1) {
  fail('Cannot find related block key: "interventions-rendezvous"');
}

const blockStart = content.lastIndexOf("{", keyIndex);
if (blockStart === -1) {
  fail("Cannot find block start");
}

const blockEnd = findMatchingBrace(content, blockStart);
if (blockEnd === -1) {
  fail("Cannot find block end");
}

let block = content.slice(blockStart, blockEnd + 1);

block = block.replace(/displayIn:\s*\[[^\]]*\]/, 'displayIn: ["detail"]');
block = block.replace(/allowCreate:\s*true/, "allowCreate: false");

// Sécurité : si createLabel reste, il devient documentaire mais non actif.
// On le garde pour limiter le diff, car allowCreate=false empêche l'action de création.
// Le panneau reste lisible en detail uniquement.

content = content.slice(0, blockStart) + block + content.slice(blockEnd + 1);

fs.writeFileSync(modulePath, content, "utf8");

const checks = [
  {
    label: "bloc interventions-rendezvous présent",
    ok: content.includes('key: "interventions-rendezvous"'),
  },
  {
    label: "panneau affiché uniquement en detail",
    ok: /key:\s*"interventions-rendezvous"[\s\S]*?displayIn:\s*\["detail"\]/.test(content),
  },
  {
    label: "création désactivée depuis le panneau",
    ok: /key:\s*"interventions-rendezvous"[\s\S]*?allowCreate:\s*false/.test(content),
  },
  {
    label: "ancien affichage edit supprimé du bloc",
    ok: !/key:\s*"interventions-rendezvous"[\s\S]*?displayIn:\s*\[[^\]]*"edit"[^\]]*\]/.test(content),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-05D-B — Correction panneau RDV intervention",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Décision métier",
  "",
  "- Un RDV ne doit pas être l'espace de composition d'une intervention.",
  "- Un RDV peut afficher l'intervention liée en lecture/detail.",
  "- La création d'intervention doit passer par une action runtime contrôlée.",
  "- Une intervention peut porter plusieurs lignes d'intervention.",
  "",
  "## Correction appliquée",
  "",
  "- displayIn: [\"detail\", \"edit\"] -> displayIn: [\"detail\"]",
  "- allowCreate: true -> allowCreate: false",
  "",
  "## Checks",
  "",
  ...checks.map((c) => `- ${c.ok ? "OK" : "FAIL"} — ${c.label}`),
  "",
  "## Synthèse",
  "",
  `- OK: ${okCount}`,
  `- FAIL: ${failCount}`,
  "",
].join("\n");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log("[AMARKHYS-REBUILD-05D-B] Fix RDV intervention related panel");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-05D-B] DONE");
console.log("[NEXT] Rerun 05D audit, build, then manual check edit RDV.");