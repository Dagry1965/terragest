const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  "src/components/erp/operational/ERPOperationalTable.tsx",
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  "src/components/erp/operational/ERPOperationalKpiStrip.tsx",
  "src/components/erp/operational/ERPOperationalFilters.tsx",
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  "src/runtime/modules/ERPModule.ts",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
];

const checks = [];

function read(rel) {
  const file = path.join(ROOT, rel);

  if (!fs.existsSync(file)) {
    checks.push({
      level: "FAIL",
      file: rel,
      message: "Fichier introuvable",
    });

    return "";
  }

  return fs.readFileSync(file, "utf8");
}

function checkContains(rel, content, pattern, message) {
  checks.push({
    level: content.includes(pattern) ? "OK" : "FAIL",
    file: rel,
    message,
    pattern,
  });
}


function extractOperationalTableFields(content) {
  const operationalIndex = content.indexOf("operational:");
  if (operationalIndex < 0) return "";

  const tableIndex = content.indexOf("table:", operationalIndex);
  if (tableIndex < 0) return "";

  const fieldsIndex = content.indexOf("fields:", tableIndex);
  if (fieldsIndex < 0) return "";

  const hiddenFieldsIndex = content.indexOf("hiddenFields:", fieldsIndex);
  const rightPanelIndex = content.indexOf("rightPanel:", tableIndex);

  const endCandidates = [hiddenFieldsIndex, rightPanelIndex, content.length]
    .filter((index) => index > fieldsIndex);

  const endIndex = Math.min(...endCandidates);

  return content.slice(fieldsIndex, endIndex);
}

function checkNotContains(rel, content, pattern, message) {
  checks.push({
    level: content.includes(pattern) ? "FAIL" : "OK",
    file: rel,
    message,
    pattern,
  });
}

const contents = Object.fromEntries(
  files.map((rel) => [rel, read(rel)])
);

checkContains(
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  contents["src/components/erp/runtime/ERPRuntimePage.tsx"],
  "shouldUseOperationalPage",
  "ERPRuntimePage détecte les pages opérationnelles"
);

checkContains(
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  contents["src/components/erp/runtime/ERPRuntimePage.tsx"],
  "ERPOperationalModulePage",
  "ERPRuntimePage branche ERPOperationalModulePage"
);

checkContains(
  "src/runtime/modules/ERPModule.ts",
  contents["src/runtime/modules/ERPModule.ts"],
  "ERPOperationalModuleConfig",
  "ERPModule contient le contrat operational générique"
);

checkContains(
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  contents["src/runtime/modules/generated/rendezvous/rendezvous.module.ts"],
  "operational:",
  "rendezvous déclare operational"
);

checkContains(
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  contents["src/runtime/modules/generated/rendezvous/rendezvous.module.ts"],
  "childTotals",
  "rendezvous déclare un total enfant pour Montant total"
);

checkNotContains(
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  extractOperationalTableFields(
    contents["src/runtime/modules/generated/rendezvous/rendezvous.module.ts"]
  ),
  '"codeRendezVous"',
  "codeRendezVous absent de operational.table.fields"
);

checkNotContains(
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  extractOperationalTableFields(
    contents["src/runtime/modules/generated/rendezvous/rendezvous.module.ts"]
  ),
  '"consumedByInterventionId"',
  "Intervention liée absente de operational.table.fields"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  contents["src/components/erp/operational/ERPOperationalModulePage.tsx"],
  "Connecté :",
  "Header opérationnel affiche l’utilisateur connecté"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  contents["src/components/erp/operational/ERPOperationalModulePage.tsx"],
  "Aujourd’hui",
  "Header opérationnel affiche la date du jour"
);

checkContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  contents["src/components/erp/operational/ERPOperationalTable.tsx"],
  "relationLabels",
  "Table opérationnelle résout les libellés relationnels"
);

checkContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  contents["src/components/erp/operational/ERPOperationalTable.tsx"],
  "childTotals",
  "Table opérationnelle calcule les totaux enfants"
);

checkContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  contents["src/components/erp/operational/ERPOperationalTable.tsx"],
  "Fragment key={recordId}",
  "Table opérationnelle utilise une key React stable pour l’expand"
);

checkNotContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  contents["src/components/erp/operational/ERPOperationalTable.tsx"],
  ">Actions<",
  "Colonne Actions retirée du tableau principal"
);

checkContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  contents["src/components/erp/operational/ERPOperationalExpandedChildren.tsx"],
  "Ouvrir intervention",
  "Expand affiche le bouton Ouvrir intervention"
);

checkContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  contents["src/components/erp/operational/ERPOperationalExpandedChildren.tsx"],
  "Ouvrir facture",
  "Expand prévoit le bouton Ouvrir facture"
);

checkContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  contents["src/components/erp/operational/ERPOperationalExpandedChildren.tsx"],
  "RuntimeDataBinding.list",
  "Expand charge les enfants via RuntimeDataBinding"
);

checkNotContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  contents["src/components/erp/operational/ERPOperationalExpandedChildren.tsx"],
  "firebase/firestore",
  "Expand ne lit pas Firestore directement"
);

checkNotContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  contents["src/components/erp/operational/ERPOperationalTable.tsx"],
  "firebase/firestore",
  "Table opérationnelle ne lit pas Firestore directement"
);

const failCount = checks.filter((check) => check.level === "FAIL").length;
const okCount = checks.filter((check) => check.level === "OK").length;

console.log("");
console.log("[Q2-A-F-OPERATIONAL-APPOINTMENTS-STABILIZATION-AUDIT]");
console.log("");

for (const check of checks) {
  console.log(`[${check.level}] ${check.file}`);
  console.log("     " + check.message);
  if (check.level === "FAIL" && check.pattern) {
    console.log("     pattern: " + check.pattern);
  }
}

console.log("");
console.log("[SUMMARY]");
console.log("OK:", okCount);
console.log("FAIL:", failCount);

const reportDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(reportDir, { recursive: true });

const report = [
  "# Q2-A-F — Audit stabilisation page opérationnelle RDV",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  "",
  ...checks.map((check) => `- [${check.level}] ${check.file} — ${check.message}`),
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-A-F-operational-appointments-stabilization-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-A-F-operational-appointments-stabilization-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — corriger avant de continuer vers Q2-B.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK — base opérationnelle RDV prête pour extension.");
