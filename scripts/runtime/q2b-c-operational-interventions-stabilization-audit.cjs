const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  "src/components/erp/operational/ERPOperationalTable.tsx",
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  "src/runtime/modules/ERPModule.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
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

function checkNotContains(rel, content, pattern, message) {
  checks.push({
    level: content.includes(pattern) ? "FAIL" : "OK",
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

  const relationLabelFieldsIndex = content.indexOf("relationLabelFields:", fieldsIndex);
  const hiddenFieldsIndex = content.indexOf("hiddenFields:", fieldsIndex);
  const rightPanelIndex = content.indexOf("rightPanel:", tableIndex);
  const compositionIndex = content.indexOf("composition:", operationalIndex);

  const endCandidates = [
    relationLabelFieldsIndex,
    hiddenFieldsIndex,
    rightPanelIndex,
    compositionIndex,
    content.length,
  ].filter((index) => index > fieldsIndex);

  return content.slice(fieldsIndex, Math.min(...endCandidates));
}

function extractOperationalBlock(content) {
  const operationalIndex = content.indexOf("operational:");
  if (operationalIndex < 0) return "";

  const compositionIndex = content.indexOf("composition:", operationalIndex);
  const workflowsIndex = content.indexOf("workflows:", operationalIndex);
  const endCandidates = [compositionIndex, workflowsIndex, content.length]
    .filter((index) => index > operationalIndex);

  return content.slice(operationalIndex, Math.min(...endCandidates));
}

const contents = Object.fromEntries(files.map((rel) => [rel, read(rel)]));

const runtimePage = contents["src/components/erp/runtime/ERPRuntimePage.tsx"];
const erpModule = contents["src/runtime/modules/ERPModule.ts"];
const interventions = contents["src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts"];
const lignes = contents["src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts"];
const factures = contents["src/runtime/modules/generated/facturesauto/facturesauto.module.ts"];
const table = contents["src/components/erp/operational/ERPOperationalTable.tsx"];
const expanded = contents["src/components/erp/operational/ERPOperationalExpandedChildren.tsx"];
const modulePage = contents["src/components/erp/operational/ERPOperationalModulePage.tsx"];

const operationalBlock = extractOperationalBlock(interventions);
const operationalTableFields = extractOperationalTableFields(interventions);

checkContains(
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  runtimePage,
  "shouldUseOperationalPage",
  "ERPRuntimePage détecte les pages opérationnelles"
);

checkContains(
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  runtimePage,
  "ERPOperationalModulePage",
  "ERPRuntimePage branche ERPOperationalModulePage"
);

checkContains(
  "src/runtime/modules/ERPModule.ts",
  erpModule,
  "ERPOperationalModuleConfig",
  "ERPModule contient le contrat operational générique"
);

checkContains(
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  interventions,
  "operational:",
  "interventionsauto déclare operational"
);

checkContains(
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  operationalBlock,
  'title: "Interventions"',
  "interventionsauto operational.title est déclaré"
);

checkContains(
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  operationalBlock,
  "kpis:",
  "interventionsauto operational.kpis est déclaré"
);

checkContains(
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  operationalBlock,
  "filters:",
  "interventionsauto operational.filters est déclaré"
);

checkContains(
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  operationalBlock,
  "table:",
  "interventionsauto operational.table est déclaré"
);

for (const field of [
  '"clientId"',
  '"vehiculeId"',
  '"dateIntervention"',
  '"typeIntervention"',
  '"kilometrage"',
  '"coutTotal"',
  '"statut"',
]) {
  checkContains(
    "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
    operationalTableFields,
    field,
    `${field} présent dans operational.table.fields`
  );
}

checkContains(
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  operationalBlock,
  'clientId: ["nom", "prenom", "telephone"]',
  "libellé relationnel client configuré"
);

checkContains(
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  operationalBlock,
  'vehiculeId: ["immatriculation", "modele"]',
  "libellé relationnel véhicule configuré"
);

checkContains(
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  interventions,
  "lignesinterventionauto",
  "interventionsauto déclare lignesinterventionauto comme enfant"
);

checkContains(
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  interventions,
  "facturesauto",
  "interventionsauto déclare facturesauto comme enfant"
);

checkContains(
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  interventions,
  'foreignKey: "interventionId"',
  "children utilisent interventionId comme foreignKey"
);

checkContains(
  "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts",
  lignes,
  'key: "interventionId"',
  "lignesinterventionauto contient interventionId"
);

checkContains(
  "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts",
  lignes,
  "montantTotal",
  "lignes intervention contiennent montantTotal"
);

checkContains(
  "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts",
  lignes,
  'key: "statut"',
  "lignes intervention contiennent un statut"
);

checkContains(
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  factures,
  'key: "interventionId"',
  "facturesauto contient interventionId"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  modulePage,
  "Connecté :",
  "Header opérationnel affiche l’utilisateur connecté"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  modulePage,
  "Aujourd’hui",
  "Header opérationnel affiche la date du jour"
);

checkContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  table,
  "relationLabels",
  "Table opérationnelle résout les libellés relationnels"
);

checkContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  table,
  "childTotals",
  "Table opérationnelle supporte les totaux enfants"
);

checkContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  table,
  "Fragment key={recordId}",
  "Table opérationnelle utilise une key React stable pour l’expand"
);

checkNotContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  table,
  ">Actions<",
  "Colonne Actions absente du tableau principal"
);

checkContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expanded,
  "Ouvrir intervention",
  "Expand affiche le bouton Ouvrir intervention"
);

checkContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expanded,
  "Ouvrir facture",
  "Expand affiche le bouton Ouvrir facture"
);

checkContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expanded,
  "RuntimeDataBinding.list",
  "Expand charge les enfants via RuntimeDataBinding"
);

checkNotContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expanded,
  "firebase/firestore",
  "Expand ne lit pas Firestore directement"
);

checkNotContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  table,
  "firebase/firestore",
  "Table opérationnelle ne lit pas Firestore directement"
);

const okCount = checks.filter((check) => check.level === "OK").length;
const failCount = checks.filter((check) => check.level === "FAIL").length;

console.log("");
console.log("[Q2-B-C-OPERATIONAL-INTERVENTIONS-STABILIZATION-AUDIT]");
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
  "# Q2-B-C — Audit stabilisation page opérationnelle Interventions",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  "",
  "## Checks",
  "",
  ...checks.map((check) => `- [${check.level}] ${check.file} — ${check.message}`),
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-B-C-operational-interventions-stabilization-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-B-C-operational-interventions-stabilization-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — corriger avant d’étendre vers factures.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK — page opérationnelle Interventions prête pour extension.");
