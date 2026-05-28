const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  "src/components/erp/operational/ERPOperationalTable.tsx",
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  "src/runtime/modules/ERPModule.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts",
  "src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts",
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

function extractOperationalBlock(content) {
  const operationalIndex = content.indexOf("operational:");
  if (operationalIndex < 0) return "";

  const compositionIndex = content.indexOf("composition:", operationalIndex);
  const workflowsIndex = content.indexOf("workflows:", operationalIndex);
  const endCandidates = [compositionIndex, workflowsIndex, content.length]
    .filter((index) => index > operationalIndex);

  return content.slice(operationalIndex, Math.min(...endCandidates));
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

const contents = Object.fromEntries(files.map((rel) => [rel, read(rel)]));

const runtimePage = contents["src/components/erp/runtime/ERPRuntimePage.tsx"];
const erpModule = contents["src/runtime/modules/ERPModule.ts"];
const factures = contents["src/runtime/modules/generated/facturesauto/facturesauto.module.ts"];
const encaissements = contents["src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts"];
const echeances = contents["src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts"];
const table = contents["src/components/erp/operational/ERPOperationalTable.tsx"];
const expanded = contents["src/components/erp/operational/ERPOperationalExpandedChildren.tsx"];
const modulePage = contents["src/components/erp/operational/ERPOperationalModulePage.tsx"];

const operationalBlock = extractOperationalBlock(factures);
const operationalTableFields = extractOperationalTableFields(factures);

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
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  factures,
  "operational:",
  "facturesauto déclare operational"
);

checkContains(
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  operationalBlock,
  'title: "Factures"',
  "facturesauto operational.title est déclaré"
);

checkContains(
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  operationalBlock,
  "kpis:",
  "facturesauto operational.kpis est déclaré"
);

checkContains(
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  operationalBlock,
  "filters:",
  "facturesauto operational.filters est déclaré"
);

checkContains(
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  operationalBlock,
  "table:",
  "facturesauto operational.table est déclaré"
);

for (const field of [
  '"numeroFacture"',
  '"clientId"',
  '"vehiculeId"',
  '"dateFacture"',
  '"montantTTC"',
  '"montantPaye"',
  '"resteAPayer"',
  '"statutPaiement"',
]) {
  checkContains(
    "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
    operationalTableFields,
    field,
    `${field} présent dans operational.table.fields`
  );
}

checkContains(
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  operationalBlock,
  'clientId: ["nom", "prenom", "telephone"]',
  "libellé relationnel client configuré"
);

checkContains(
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  operationalBlock,
  'vehiculeId: ["immatriculation", "modele"]',
  "libellé relationnel véhicule configuré"
);

checkContains(
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  factures,
  "encaissementsauto",
  "facturesauto déclare encaissementsauto comme enfant"
);

checkContains(
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  factures,
  "echeancespaiementauto",
  "facturesauto déclare echeancespaiementauto comme enfant"
);

checkContains(
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  factures,
  'foreignKey: "factureId"',
  "children utilisent factureId comme foreignKey"
);

checkContains(
  "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts",
  encaissements,
  'key: "factureId"',
  "encaissementsauto contient factureId"
);

checkContains(
  "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts",
  encaissements,
  'key: "montant"',
  "encaissementsauto contient montant"
);

checkContains(
  "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts",
  encaissements,
  'key: "statut"',
  "encaissementsauto contient statut"
);

checkContains(
  "src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts",
  echeances,
  'key: "factureId"',
  "echeancespaiementauto contient factureId"
);

checkContains(
  "src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts",
  echeances,
  "montantPrevu",
  "echeancespaiementauto contient montantPrevu"
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
  "RuntimeDataBinding.list",
  "Expand charge les enfants via RuntimeDataBinding"
);

checkContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expanded,
  "Ouvrir",
  "Expand affiche des boutons de navigation"
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
console.log("[Q2-C-C-OPERATIONAL-INVOICES-STABILIZATION-AUDIT]");
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
  "# Q2-C-C — Audit stabilisation page opérationnelle Factures",
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
  path.join(reportDir, "Q2-C-C-operational-invoices-stabilization-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-C-C-operational-invoices-stabilization-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — corriger avant de considérer les factures stabilisées.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK — page opérationnelle Factures stabilisée.");
