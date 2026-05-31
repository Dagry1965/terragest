const fs = require("fs");
const path = require("path");

const root = process.cwd();
const moduleRel = "src/runtime/modules/generated/vehicules/vehicules.module.ts";
const modulePath = path.join(root, moduleRel);
const reportRel = "docs/audits/AMARKHYS-REBUILD-04B-FIX2-vehicules-field-keys.md";
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("Missing file: " + moduleRel);
}

const backupPath = modulePath + ".bak-rebuild-04b-fix2-field-keys";
fs.copyFileSync(modulePath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(modulePath, "utf8");
const before = content;

content = content.replace('name: "energie"', 'key: "energie"');
content = content.replace('name: "dateFinGarantie"', 'key: "dateFinGarantie"');

fs.writeFileSync(modulePath, content, "utf8");

const checks = [
  {
    label: "champ energie utilise key",
    ok: content.includes('key: "energie"') && !content.includes('name: "energie"'),
  },
  {
    label: "champ dateFinGarantie utilise key",
    ok: content.includes('key: "dateFinGarantie"') && !content.includes('name: "dateFinGarantie"'),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-04B-FIX2 — Alignement clés champs vehicules",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Cause",
  "",
  "ERPModuleField n'accepte pas la propriété name. Les champs ajoutés doivent utiliser key.",
  "",
  "## Correction",
  "",
  "- name: energie -> key: energie",
  "- name: dateFinGarantie -> key: dateFinGarantie",
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

console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-04B-FIX2] DONE");