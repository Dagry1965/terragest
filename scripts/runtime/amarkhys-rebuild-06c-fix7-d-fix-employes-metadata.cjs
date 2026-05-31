const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/employes/employes.module.ts";
const reportRel = "docs/audits/AMARKHYS-REBUILD-06C-FIX7-D-fix-employes-metadata.md";

const modulePath = path.join(root, moduleRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("Missing file: " + moduleRel);
}

const backupPath = modulePath + ".bak-rebuild-06c-fix7-d-metadata";
fs.copyFileSync(modulePath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(modulePath, "utf8");
const before = content;

content = content.replace(
  /metadata:\s*\{\s*\r?\n\s*icon:\s*"users",/,
  `metadata: {
    key: "employes",
    label: "Employés",
    icon: "users",`
);

fs.writeFileSync(modulePath, content, "utf8");

const checks = [
  {
    label: "metadata.key ajouté",
    ok: /metadata:\s*\{[\s\S]*?key:\s*"employes"/.test(content),
  },
  {
    label: "metadata.label ajouté",
    ok: /metadata:\s*\{[\s\S]*?label:\s*"Employés"/.test(content),
  },
  {
    label: "metadata.icon conservé",
    ok: /metadata:\s*\{[\s\S]*?icon:\s*"users"/.test(content),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-06C-FIX7-D — Fix employes metadata",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Correction",
  "",
  "- Ajout de metadata.key.",
  "- Ajout de metadata.label.",
  "- Conservation de icon/category/tags.",
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

console.log("[AMARKHYS-REBUILD-06C-FIX7-D] Fix employes metadata");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-06C-FIX7-D] DONE");
console.log("[NEXT] pnpm build");