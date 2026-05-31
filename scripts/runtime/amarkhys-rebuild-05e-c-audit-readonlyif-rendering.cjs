const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  form: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  field: "src/components/erp/forms/enterprise/ERPFormField.tsx",
  tabs: "src/components/erp/forms/enterprise/ERPFormTabs.tsx",
  schema: "src/runtime/modules/schemas/ERPModuleSchema.ts",
  rdvModule: "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
};

const reportRel = "docs/audits/AMARKHYS-REBUILD-05E-C-audit-readonlyif-rendering.md";
const reportPath = path.join(root, reportRel);

function read(rel) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}

function lineHits(content, patterns) {
  const lines = content.split(/\r?\n/);
  const hits = [];

  lines.forEach((line, index) => {
    for (const pattern of patterns) {
      if (line.includes(pattern)) {
        hits.push({
          pattern,
          line: index + 1,
          text: line.trim().slice(0, 260),
        });
      }
    }
  });

  return hits;
}

const patterns = [
  "readonlyIf",
  "readOnly",
  "readonly",
  "disabled",
  "lockedFields",
  "readOnlyFields",
  "isFieldLocked",
  "fieldIsLocked",
  "isReadonly",
  "operator",
  "equals",
  "notEquals",
  "in",
  "notIn",
];

const summaries = Object.entries(files).map(([label, rel]) => {
  const content = read(rel);
  return {
    label,
    rel,
    hits: lineHits(content, patterns),
  };
});

const formContent = read(files.form);
const fieldContent = read(files.field);
const rdvContent = read(files.rdvModule);

const checks = [
  {
    label: "rendezvous statut contient readonlyIf",
    ok: /key:\s*"statut"[\s\S]*?readonlyIf:/.test(rdvContent),
  },
  {
    label: "readonlyIf utilise operator in",
    ok: /readonlyIf:\s*\{[\s\S]*?operator:\s*"in"/.test(rdvContent),
  },
  {
    label: "ERPEnterpriseForm lit readonlyIf",
    ok: formContent.includes("readonlyIf"),
  },
  {
    label: "ERPFormField reçoit readOnly/disabled",
    ok: /readOnly|disabled/.test(fieldContent),
  },
  {
    label: "ERPEnterpriseForm sait évaluer operator in/notIn",
    ok: formContent.includes('operator === "in"') || formContent.includes("case \"in\""),
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [];

report.push("# AMARKHYS-REBUILD-05E-C — Audit readonlyIf rendering");
report.push("");
report.push(`Date: ${new Date().toISOString()}`);
report.push("");
report.push("## Objectif");
report.push("");
report.push("Vérifier pourquoi readonlyIf est valide dans la metadata mais n'est pas appliqué visuellement dans le formulaire.");
report.push("");
report.push("## Checks");
report.push("");

for (const check of checks) {
  report.push(`- ${check.ok ? "OK" : "FAIL"} — ${check.label}`);
}

report.push("");
report.push("## Synthèse");
report.push("");
report.push(`- OK: ${okCount}`);
report.push(`- FAIL: ${failCount}`);
report.push("");

for (const summary of summaries) {
  report.push(`## ${summary.label} — ${summary.rel}`);
  report.push("");
  if (!summary.hits.length) {
    report.push("- Aucun hit.");
    report.push("");
    continue;
  }

  for (const hit of summary.hits) {
    report.push(`- ${hit.pattern} — L${hit.line}: ${hit.text}`);
  }
  report.push("");
}

report.push("## Lecture recommandée");
report.push("");
report.push("Si ERPEnterpriseForm ne lit pas readonlyIf, ajouter une évaluation générique ERPConditionalRule et injecter le résultat dans le readOnly/disabled du champ.");
report.push("");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[AMARKHYS-REBUILD-05E-C] Audit readonlyIf rendering");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  console.log("[NEXT] Apply generic readonlyIf rendering support.");
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-05E-C] DONE");