const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/rendezvous/rendezvous.module.ts";
const reportRel = "docs/audits/AMARKHYS-REBUILD-05E-B-FIX1-rdv-status-readonlyif.md";

const modulePath = path.join(root, moduleRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("Missing file: " + moduleRel);
}

const backupPath = modulePath + ".bak-rebuild-05e-b-fix1-readonlyif";
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

// Remove invalid properties added by 05E-B.
block = block.replace(/\s*readOnly:\s*true,\r?\n/g, "");
block = block.replace(/\s*locked:\s*true,\r?\n/g, "");

// Add valid ERPModuleField property if absent.
if (!/readonlyIf\s*:/.test(block)) {
  const insertAfter = 'label: "Statut",';
  if (!block.includes(insertAfter)) {
    fail('Cannot find label: "Statut" inside statut field');
  }

  block = block.replace(
    insertAfter,
    `${insertAfter}
        readonlyIf: {
          field: "statut",
          in: ["planifie", "confirme", "en_cours", "termine", "annule"],
        },`
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
    label: "readOnly supprimé",
    ok: !/readOnly\s*:\s*true/.test(updatedBlock),
  },
  {
    label: "locked supprimé",
    ok: !/locked\s*:\s*true/.test(updatedBlock),
  },
  {
    label: "readonlyIf présent",
    ok: /readonlyIf\s*:/.test(updatedBlock),
  },
  {
    label: "readonlyIf couvre tous les statuts RDV",
    ok:
      updatedBlock.includes('"planifie"') &&
      updatedBlock.includes('"confirme"') &&
      updatedBlock.includes('"en_cours"') &&
      updatedBlock.includes('"termine"') &&
      updatedBlock.includes('"annule"'),
  },
  {
    label: "helperText conservé",
    ok: updatedBlock.includes("Statut piloté par les actions"),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-05E-B-FIX1 — Statut RDV readonlyIf",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Cause",
  "",
  "ERPModuleField n'accepte pas readOnly/locked. Le contrat expose readonlyIf.",
  "",
  "## Correction",
  "",
  "- Suppression de readOnly: true.",
  "- Suppression de locked: true.",
  "- Ajout de readonlyIf sur le champ statut.",
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

console.log("[AMARKHYS-REBUILD-05E-B-FIX1] RDV status readonlyIf");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-05E-B-FIX1] DONE");
console.log("[NEXT] pnpm build, then manual UI check.");