const fs = require("fs");
const path = require("path");

const root = process.cwd();

const formRel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const reportRel = "docs/audits/AMARKHYS-REBUILD-05E-C-wire-readonlyif-rendering.md";

const formPath = path.join(root, formRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(formPath)) {
  fail("Missing file: " + formRel);
}

const backupPath = formPath + ".bak-rebuild-05e-c-wire-readonlyif";
fs.copyFileSync(formPath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(formPath, "utf8");
const before = content;

if (!content.includes("function evaluateERPConditionalRule")) {
  const marker = "export function ERPEnterpriseForm({";
  const index = content.indexOf(marker);

  if (index === -1) {
    fail("Cannot find ERPEnterpriseForm export");
  }

  const helper = `
function evaluateERPConditionalRule(
  rule:
    | {
        field: string;
        operator: "equals" | "notEquals" | "in" | "notIn";
        value?: unknown;
        values?: unknown[];
      }
    | undefined,
  values: Record<string, unknown>
): boolean {
  if (!rule || !rule.field || !rule.operator) {
    return false;
  }

  const currentValue = values[rule.field];

  switch (rule.operator) {
    case "equals":
      return currentValue === rule.value;

    case "notEquals":
      return currentValue !== rule.value;

    case "in":
      return Array.isArray(rule.values) && rule.values.includes(currentValue);

    case "notIn":
      return Array.isArray(rule.values) && !rule.values.includes(currentValue);

    default:
      return false;
  }
}

`;

  content = content.slice(0, index) + helper + content.slice(index);
}

if (!content.includes("const readonlyIfFields =")) {
  const marker = "  const lockedFields =";
  const index = content.indexOf(marker);

  if (index === -1) {
    fail("Cannot find lockedFields declaration");
  }

  const insertion = `  const readonlyIfFields =
    mode === "create"
      ? []
      : visibleFields
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

  content = content.slice(0, index) + insertion + content.slice(index);
}

if (!content.includes("...readonlyIfFields")) {
  const readOnlyFieldsIndex = content.indexOf("  const readOnlyFields =");

  if (readOnlyFieldsIndex === -1) {
    fail("Cannot find readOnlyFields declaration");
  }

  const newSetIndex = content.indexOf("new Set([", readOnlyFieldsIndex);

  if (newSetIndex === -1) {
    fail("Cannot find new Set([ inside readOnlyFields");
  }

  const insertIndex = newSetIndex + "new Set([".length;

  content =
    content.slice(0, insertIndex) +
    "\n            ...readonlyIfFields," +
    content.slice(insertIndex);
}

fs.writeFileSync(formPath, content, "utf8");

const checks = [
  {
    label: "helper evaluateERPConditionalRule ajouté",
    ok: content.includes("function evaluateERPConditionalRule"),
  },
  {
    label: "operator equals supporté",
    ok: content.includes('case "equals"'),
  },
  {
    label: "operator notEquals supporté",
    ok: content.includes('case "notEquals"'),
  },
  {
    label: "operator in supporté",
    ok: content.includes('case "in"'),
  },
  {
    label: "operator notIn supporté",
    ok: content.includes('case "notIn"'),
  },
  {
    label: "readonlyIfFields calculé",
    ok: content.includes("const readonlyIfFields ="),
  },
  {
    label: "readonlyIfFields injecté dans readOnlyFields",
    ok: content.includes("...readonlyIfFields"),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-05E-C — Branchement readonlyIf dans ERPEnterpriseForm",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Décision ERP",
  "",
  "readonlyIf est une metadata générique ERPModuleField. Elle doit être évaluée par le renderer formulaire générique.",
  "",
  "## Correction appliquée",
  "",
  "- Ajout evaluateERPConditionalRule.",
  "- Support equals / notEquals / in / notIn.",
  "- Calcul readonlyIfFields depuis visibleFields + initialData + formValues.",
  "- Injection de readonlyIfFields dans readOnlyFields.",
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

console.log("[AMARKHYS-REBUILD-05E-C] Wire readonlyIf rendering");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-05E-C] DONE");
console.log("[NEXT] pnpm build, then manual UI check.");