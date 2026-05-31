const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  module: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  relatedPanel: "src/components/erp/runtime/ERPRelatedRecordsPanel.tsx",
  runtimePage: "src/components/erp/runtime/ERPRuntimePage.tsx",
  form: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
};

const reportRel = "docs/audits/AMARKHYS-REBUILD-06C-FIX4-A-audit-ui-governance.md";
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

function extractObjectBlock(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) return "";

  const start = source.lastIndexOf("{", markerIndex);
  if (start === -1) return "";

  let depth = 0;
  let quote = null;
  let escape = false;

  for (let i = start; i < source.length; i++) {
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
      if (depth === 0) return source.slice(start, i + 1);
    }
  }

  return "";
}

const moduleContent = read(files.module);
const relatedPanelContent = read(files.relatedPanel);
const runtimePageContent = read(files.runtimePage);
const formContent = read(files.form);

const mecanicienFieldBlock = extractObjectBlock(moduleContent, 'key: "mecanicienId"');
const facturesBlock = extractObjectBlock(moduleContent, 'moduleKey: "facturesauto"');
const lignesBlock = extractObjectBlock(moduleContent, 'moduleKey: "lignesinterventionauto"');

const readOnlyBlockMatch = moduleContent.match(/readOnlyFields:\s*\[[\s\S]*?\]/);
const readOnlyBlock = readOnlyBlockMatch ? readOnlyBlockMatch[0] : "";

const checks = [
  {
    group: "Module metadata",
    label: "mecanicienId existe dans schema.fields",
    ok: mecanicienFieldBlock.includes('key: "mecanicienId"'),
  },
  {
    group: "Module metadata",
    label: "mecanicienId apparaît dans les layouts form/tabs/sections",
    ok: /fields:\s*\[[\s\S]*?"mecanicienId"/.test(moduleContent) || /sections:\s*\[[\s\S]*?"mecanicienId"/.test(moduleContent),
  },
  {
    group: "Module metadata",
    label: "dateIntervention est actuellement verrouillée",
    ok: readOnlyBlock.includes('"dateIntervention"'),
  },
  {
    group: "Module metadata",
    label: "kilometrage est actuellement verrouillé",
    ok: readOnlyBlock.includes('"kilometrage"'),
  },
  {
    group: "Module metadata",
    label: "facturesauto allowCreate false",
    ok: facturesBlock.includes("allowCreate: false"),
  },
  {
    group: "Module metadata",
    label: "facturesauto conserve createLabel Ajouter une facture",
    ok: facturesBlock.includes('createLabel: "Ajouter une facture"'),
  },
  {
    group: "Module metadata",
    label: "lignesinterventionauto autorise ajout ligne",
    ok: lignesBlock.includes('createLabel: "Ajouter une ligne"') && !/allowCreate:\s*false/.test(lignesBlock),
  },
  {
    group: "Générique related panel",
    label: "ERPRelatedRecordsPanel lit allowCreate",
    ok: relatedPanelContent.includes("allowCreate"),
  },
  {
    group: "Générique related panel",
    label: "ERPRelatedRecordsPanel masque création si allowCreate false",
    ok:
      relatedPanelContent.includes("allowCreate !== false") ||
      relatedPanelContent.includes("allowCreate === true") ||
      relatedPanelContent.includes("child.allowCreate"),
  },
  {
    group: "Générique form",
    label: "ERPEnterpriseForm applique readOnlyFields",
    ok: formContent.includes("readOnlyFields"),
  },
  {
    group: "Générique form",
    label: "ERPEnterpriseForm applique readonlyIf",
    ok: formContent.includes("readonlyIfFields") && formContent.includes("evaluateERPConditionalRule"),
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const grouped = checks.reduce((acc, check) => {
  acc[check.group] ||= [];
  acc[check.group].push(check);
  return acc;
}, {});

const report = [];

report.push("# AMARKHYS-REBUILD-06C-FIX4-A — Audit UI governance interventionsauto");
report.push("");
report.push(`Date: ${new Date().toISOString()}`);
report.push("");
report.push("## Objectif");
report.push("");
report.push("Identifier ce qui relève du module interventionsauto et ce qui relève des composants génériques.");
report.push("");
report.push("## Synthèse");
report.push("");
report.push(`- OK: ${okCount}`);
report.push(`- FAIL: ${failCount}`);
report.push("");
report.push("## Checks");
report.push("");

for (const [group, items] of Object.entries(grouped)) {
  report.push(`### ${group}`);
  report.push("");
  for (const item of items) {
    report.push(`- ${item.ok ? "OK" : "FAIL"} — ${item.label}`);
  }
  report.push("");
}

report.push("## Blocs module");
report.push("");
report.push("### mecanicienId");
report.push("");
report.push(mecanicienFieldBlock || "- Non trouvé.");
report.push("");
report.push("### readOnlyFields");
report.push("");
report.push(readOnlyBlock || "- Non trouvé.");
report.push("");
report.push("### facturesauto");
report.push("");
report.push(facturesBlock || "- Non trouvé.");
report.push("");
report.push("### lignesinterventionauto");
report.push("");
report.push(lignesBlock || "- Non trouvé.");
report.push("");

report.push("## Hits ERPRelatedRecordsPanel");
report.push("");
for (const hit of lineHits(relatedPanelContent, ["allowCreate", "createLabel", "openLabel", "href", "button", "Button", "Ajouter"])) {
  report.push(`- ${hit.pattern} — L${hit.line}: ${hit.text}`);
}
report.push("");

report.push("## Lecture attendue");
report.push("");
report.push("- Si mecanicienId existe mais n'est pas dans form.tabs.sections.fields, corriger le module.");
report.push("- Si dateIntervention/kilometrage sont dans readOnlyFields, corriger le module.");
report.push("- Si facturesauto a allowCreate false mais le bouton reste visible, corriger ERPRelatedRecordsPanel générique.");
report.push("");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[AMARKHYS-REBUILD-06C-FIX4-A] Audit UI governance");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);
console.log("[NEXT] Extract FAILs and related panel hits.");