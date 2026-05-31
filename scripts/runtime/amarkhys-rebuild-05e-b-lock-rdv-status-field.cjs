const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/rendezvous/rendezvous.module.ts";
const reportRel = "docs/audits/AMARKHYS-REBUILD-05E-B-lock-rdv-status-field.md";

const modulePath = path.join(root, moduleRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("Missing file: " + moduleRel);
}

const backupPath = modulePath + ".bak-rebuild-05e-b-lock-status-field";
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

const keyMarker = 'key: "statut"';
const keyIndex = content.indexOf(keyMarker);

if (keyIndex === -1) {
  fail('Cannot find field key: "statut"');
}

const blockStart = content.lastIndexOf("{", keyIndex);
if (blockStart === -1) {
  fail("Cannot find statut field block start");
}

const blockEnd = findMatchingBrace(content, blockStart);
if (blockEnd === -1) {
  fail("Cannot find statut field block end");
}

let block = content.slice(blockStart, blockEnd + 1);

if (!/readOnly\s*:\s*true/.test(block) && !/readonly\s*:\s*true/.test(block) && !/disabled\s*:\s*true/.test(block)) {
  const insertAfter = 'label: "Statut",';
  if (!block.includes(insertAfter)) {
    fail('Cannot find label: "Statut" inside statut field');
  }

  block = block.replace(
    insertAfter,
    `${insertAfter}
        readOnly: true,
        locked: true,
        helperText: "Statut piloté par les actions. Utilisez les boutons d’action pour changer l’état du rendez-vous.",`
  );
}

content = content.slice(0, blockStart) + block + content.slice(blockEnd + 1);

fs.writeFileSync(modulePath, content, "utf8");

const updatedBlock = content.slice(blockStart, blockStart + block.length);

const checks = [
  {
    label: "champ statut présent",
    ok: updatedBlock.includes('key: "statut"'),
  },
  {
    label: "champ statut en readOnly",
    ok: /readOnly\s*:\s*true/.test(updatedBlock),
  },
  {
    label: "champ statut marqué locked",
    ok: /locked\s*:\s*true/.test(updatedBlock),
  },
  {
    label: "helperText statut présent",
    ok: updatedBlock.includes("Statut piloté par les actions"),
  },
  {
    label: "statuts conservés",
    ok:
      updatedBlock.includes('"planifie"') &&
      updatedBlock.includes('"confirme"') &&
      updatedBlock.includes('"en_cours"') &&
      updatedBlock.includes('"termine"') &&
      updatedBlock.includes('"annule"'),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-05E-B — Verrouillage champ statut RDV",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Décision ERP",
  "",
  "- Le statut RDV est un état de processus.",
  "- Il doit rester visible mais ne doit pas être modifié librement.",
  "- Les changements de statut passent par les actions runtime.",
  "",
  "## Correction appliquée",
  "",
  "- Ajout de readOnly: true sur le champ statut.",
  "- Ajout de locked: true sur le champ statut.",
  "- Ajout d'un helperText explicite.",
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

console.log("[AMARKHYS-REBUILD-05E-B] Lock RDV status field");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-05E-B] DONE");
console.log("[NEXT] Build, manual check status select, then commit.");