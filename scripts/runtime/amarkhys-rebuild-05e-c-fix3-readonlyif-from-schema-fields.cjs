const fs = require("fs");
const path = require("path");

const root = process.cwd();

const formRel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const reportRel = "docs/audits/AMARKHYS-REBUILD-05E-C-FIX3-readonlyif-from-schema-fields.md";

const formPath = path.join(root, formRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(formPath)) {
  fail("Missing file: " + formRel);
}

const backupPath = formPath + ".bak-rebuild-05e-c-fix3-readonlyif-from-schema-fields";
fs.copyFileSync(formPath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(formPath, "utf8");
const before = content;

const blockRegex = /  const readonlyIfFields =\r?\n[\s\S]*?          \.map\(\(field\) => field\.key\);\r?\n\r?\n/;

const match = content.match(blockRegex);
if (!match) {
  fail("Cannot find readonlyIfFields block");
}

// Remove misplaced block.
content = content.replace(blockRegex, "");

const readOnlyIndex = content.indexOf("  const readOnlyFields =");
if (readOnlyIndex === -1) {
  fail("Cannot find readOnlyFields declaration");
}

const readonlyIfBlock = `  const readonlyIfFields =
    mode === "create"
      ? []
      : (module.schema.fields ?? [])
          .filter((field) =>
            evaluateERPConditionalRule(
              field.readonlyIf,
              {
                ...(initialData ?? {}),
                ...formValues,
              }
            )
          )
          .map((field) => field.key);

`;

// Insert immediately before readOnlyFields.
content =
  content.slice(0, readOnlyIndex) +
  readonlyIfBlock +
  content.slice(readOnlyIndex);

fs.writeFileSync(formPath, content, "utf8");

const newReadonlyIfIndex = content.indexOf("  const readonlyIfFields =");
const newReadOnlyIndex = content.indexOf("  const readOnlyFields =");

const checks = [
  {
    label: "readonlyIfFields présent",
    ok: newReadonlyIfIndex !== -1,
  },
  {
    label: "readOnlyFields présent",
    ok: newReadOnlyIndex !== -1,
  },
  {
    label: "readonlyIfFields placé avant readOnlyFields",
    ok: newReadonlyIfIndex !== -1 && newReadOnlyIndex !== -1 && newReadonlyIfIndex < newReadOnlyIndex,
  },
  {
    label: "readonlyIfFields utilise module.schema.fields",
    ok: content.includes("(module.schema.fields ?? [])"),
  },
  {
    label: "readonlyIfFields injecté dans readOnlyFields",
    ok: content.includes("...readonlyIfFields"),
  },
  {
    label: "readonlyIfFields ne dépend plus de visibleFields",
    ok: !/const readonlyIfFields[\s\S]*?visibleFields/.test(content),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-05E-C-FIX3 — readonlyIf depuis module.schema.fields",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Cause",
  "",
  "readOnlyFields est déclaré avant visibleFields dans ERPEnterpriseForm. readonlyIfFields ne doit donc pas dépendre de visibleFields.",
  "",
  "## Correction",
  "",
  "- readonlyIfFields est calculé depuis module.schema.fields.",
  "- readonlyIfFields est placé avant readOnlyFields.",
  "- Injection dans readOnlyFields conservée.",
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

console.log("[AMARKHYS-REBUILD-05E-C-FIX3] readonlyIf from schema fields");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-05E-C-FIX3] DONE");
console.log("[NEXT] pnpm build, then manual UI check.");