const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/rendezvous/rendezvous.module.ts";
const reportRel = "docs/audits/AMARKHYS-REBUILD-05E-B-FIX2-rdv-status-readonlyif-rule.md";

const modulePath = path.join(root, moduleRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("Missing file: " + moduleRel);
}

const backupPath = modulePath + ".bak-rebuild-05e-b-fix2-readonlyif-rule";
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

const readonlyRule = `readonlyIf: {
          field: "statut",
          operator: "in",
          values: ["planifie", "confirme", "en_cours", "termine", "annule"],
        },`;

// Remove any invalid readonlyIf block first.
block = block.replace(
  /readonlyIf:\s*\{[\s\S]*?\},\s*/m,
  ""
);

// Remove invalid properties if they survived.
block = block.replace(/\s*readOnly:\s*true,\r?\n/g, "");
block = block.replace(/\s*locked:\s*true,\r?\n/g, "");

// Ensure helperText has its own line and does not get glued to previous properties.
block = block.replace(
  /,\s*helperText:\s*"Statut piloté par les actions\. Utilisez les boutons d’action pour changer l’état du rendez-vous\.",/,
  ',\n        helperText: "Statut piloté par les actions. Utilisez les boutons d’action pour changer l’état du rendez-vous.",'
);

const insertAfter = 'label: "Statut",';
if (!block.includes(insertAfter)) {
  fail('Cannot find label: "Statut" inside statut field');
}

block = block.replace(
  insertAfter,
  `${insertAfter}
        ${readonlyRule}`
);

// If helperText is missing, add it after readonlyIf.
if (!block.includes("Statut piloté par les actions")) {
  block = block.replace(
    readonlyRule,
    `${readonlyRule}
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
    label: "readonlyIf utilise operator in",
    ok: updatedBlock.includes('operator: "in"'),
  },
  {
    label: "readonlyIf utilise values",
    ok: updatedBlock.includes('values: ["planifie", "confirme", "en_cours", "termine", "annule"]'),
  },
  {
    label: "ancienne clé in supprimée",
    ok: !/readonlyIf:\s*\{[\s\S]*?\bin\s*:/.test(updatedBlock),
  },
  {
    label: "readOnly/locked invalides supprimés",
    ok: !/readOnly\s*:\s*true/.test(updatedBlock) && !/locked\s*:\s*true/.test(updatedBlock),
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
  "# AMARKHYS-REBUILD-05E-B-FIX2 — Correction readonlyIf statut RDV",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Cause",
  "",
  "ERPConditionalRule utilise operator + value/values. La clé directe in n'est pas valide.",
  "",
  "## Correction",
  "",
  "- readonlyIf.field = statut",
  "- readonlyIf.operator = in",
  "- readonlyIf.values = tous les statuts RDV",
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

console.log("[AMARKHYS-REBUILD-05E-B-FIX2] RDV status readonlyIf rule");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-05E-B-FIX2] DONE");
console.log("[NEXT] pnpm build, then manual UI check.");