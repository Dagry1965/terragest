const fs = require("fs");
const path = require("path");

const root = process.cwd();
const moduleRel = "src/runtime/modules/generated/vehicules/vehicules.module.ts";
const modulePath = path.join(root, moduleRel);
const reportRel = "docs/audits/AMARKHYS-REBUILD-04B-FIX1-vehicules-fields-comma.md";
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("Missing file: " + moduleRel);
}

const backupPath = modulePath + ".bak-rebuild-04b-fix1-fields-comma";
fs.copyFileSync(modulePath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(modulePath, "utf8");

const before = content;

content = content.replace(
  /(\n\s*grid\s*:\s*\{\s*cols\s*:\s*6\s*\}\s*\n\s*\})(\s*\n\s*\{\s*\n\s*name:\s*"energie")/,
  "$1,$2"
);

content = content.replace(
  /(\n\s*type:\s*"date",\s*\n\s*required:\s*false,\s*\n\s*\})(\s*\n\s*\])/,
  "$1,$2"
);

fs.writeFileSync(modulePath, content, "utf8");

const checks = [
  {
    label: "virgule présente avant champ energie",
    ok: /grid\s*:\s*\{\s*cols\s*:\s*6\s*\}\s*\n\s*\},\s*\n\s*\{\s*\n\s*name:\s*"energie"/.test(content),
  },
  {
    label: "champ energie présent",
    ok: content.includes('name: "energie"'),
  },
  {
    label: "champ dateFinGarantie présent",
    ok: content.includes('name: "dateFinGarantie"'),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-04B-FIX1 — Correction virgule champs vehicules",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Cause",
  "",
  "Le champ energie avait été inséré après un objet de champ sans virgule séparatrice.",
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

console.log("[AMARKHYS-REBUILD-04B-FIX1] DONE");