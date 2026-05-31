const fs = require("fs");
const path = require("path");

const root = process.cwd();

const formRel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const reportRel = "docs/audits/AMARKHYS-REBUILD-05E-C-FIX4-remove-formvalues-from-readonlyif.md";

const formPath = path.join(root, formRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(formPath)) {
  fail("Missing file: " + formRel);
}

const backupPath = formPath + ".bak-rebuild-05e-c-fix4-remove-formvalues";
fs.copyFileSync(formPath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(formPath, "utf8");
const before = content;

content = content.replace(
  /\{\s*\.\.\.\(initialData\s*\?\?\s*\{\}\),\s*\.\.\.formValues,\s*\}/g,
  "{\n                ...(initialData ?? {}),\n              }"
);

fs.writeFileSync(formPath, content, "utf8");

const checks = [
  {
    label: "readonlyIfFields présent",
    ok: content.includes("const readonlyIfFields ="),
  },
  {
    label: "readonlyIfFields n'utilise plus formValues",
    ok: !/const readonlyIfFields[\s\S]*?\.\.\.formValues/.test(content),
  },
  {
    label: "readonlyIfFields utilise initialData",
    ok: /const readonlyIfFields[\s\S]*?initialData/.test(content),
  },
  {
    label: "evaluateERPConditionalRule conservé",
    ok: content.includes("function evaluateERPConditionalRule"),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-05E-C-FIX4 — Retrait formValues de readonlyIfFields",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Cause",
  "",
  "readonlyIfFields était calculé avant l'initialisation de formValues.",
  "",
  "## Correction",
  "",
  "- readonlyIfFields utilise initialData uniquement.",
  "- Cela suffit pour verrouiller les champs en edit selon l'état courant du record.",
  "- Pas de patch local rendezvous.",
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

console.log("[AMARKHYS-REBUILD-05E-C-FIX4] Remove formValues from readonlyIfFields");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-05E-C-FIX4] DONE");
console.log("[NEXT] pnpm build, then manual UI check.");