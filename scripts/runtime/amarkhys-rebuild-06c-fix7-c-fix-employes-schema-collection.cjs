const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/employes/employes.module.ts";
const reportRel = "docs/audits/AMARKHYS-REBUILD-06C-FIX7-C-fix-employes-schema-collection.md";

const modulePath = path.join(root, moduleRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("Missing file: " + moduleRel);
}

const backupPath = modulePath + ".bak-rebuild-06c-fix7-c-schema-collection";
fs.copyFileSync(modulePath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(modulePath, "utf8");
const before = content;

if (!/schema:\s*\{\s*collection:\s*"employes"/.test(content)) {
  content = content.replace(
    /schema:\s*\{\s*\r?\n\s*fields:\s*\[/,
    `schema: {
    collection: "employes",
    fields: [`
  );
}

fs.writeFileSync(modulePath, content, "utf8");

const checks = [
  {
    label: "schema.collection ajouté",
    ok: /schema:\s*\{\s*collection:\s*"employes"/.test(content),
  },
  {
    label: "fields conservé",
    ok: content.includes("fields: ["),
  },
  {
    label: "module employes conservé",
    ok: content.includes("export const employesModule"),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-06C-FIX7-C — Fix employes schema collection",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Correction",
  "",
  "- Ajout de schema.collection = employes dans employes.module.ts.",
  "- Correction requise par ERPModuleSchema.",
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

console.log("[AMARKHYS-REBUILD-06C-FIX7-C] Fix employes schema collection");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-06C-FIX7-C] DONE");
console.log("[NEXT] pnpm build");