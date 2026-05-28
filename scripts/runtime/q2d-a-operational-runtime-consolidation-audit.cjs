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
  "src/components/erp/operational/index.ts",
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  "src/runtime/modules/ERPModule.ts",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
];

const moduleFiles = [
  {
    key: "rendezvous",
    rel: "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
    expectedFields: [
      '"clientId"',
      '"vehiculeId"',
      '"dateRendezVous"',
      '"heureRendezVous"',
      '"typeService"',
      '"statut"',
    ],
  },
  {
    key: "interventionsauto",
    rel: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
    expectedFields: [
      '"clientId"',
      '"vehiculeId"',
      '"dateIntervention"',
      '"typeIntervention"',
      '"kilometrage"',
      '"coutTotal"',
      '"statut"',
    ],
  },
  {
    key: "facturesauto",
    rel: "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
    expectedFields: [
      '"numeroFacture"',
      '"clientId"',
      '"vehiculeId"',
      '"dateFacture"',
      '"montantTTC"',
      '"montantPaye"',
      '"resteAPayer"',
      '"statutPaiement"',
    ],
  },
];

const checks = [];
const findings = [];

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

function check(level, file, message) {
  checks.push({ level, file, message });
}

function checkContains(rel, content, pattern, message) {
  check(content.includes(pattern) ? "OK" : "FAIL", rel, message);
}

function checkNotContains(rel, content, pattern, message) {
  check(content.includes(pattern) ? "FAIL" : "OK", rel, message);
}

function addFinding(level, file, message) {
  findings.push({ level, file, message });
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
  const childTotalsIndex = content.indexOf("childTotals:", fieldsIndex);
  const hiddenFieldsIndex = content.indexOf("hiddenFields:", fieldsIndex);
  const rightPanelIndex = content.indexOf("rightPanel:", tableIndex);
  const compositionIndex = content.indexOf("composition:", operationalIndex);

  const endCandidates = [
    relationLabelFieldsIndex,
    childTotalsIndex,
    hiddenFieldsIndex,
    rightPanelIndex,
    compositionIndex,
    content.length,
  ].filter((index) => index > fieldsIndex);

  return content.slice(fieldsIndex, Math.min(...endCandidates));
}

function count(content, pattern) {
  return content.split(pattern).length - 1;
}

console.log("");
console.log("[Q2-D-A-OPERATIONAL-RUNTIME-CONSOLIDATION-AUDIT]");
console.log("");

const contents = Object.fromEntries(files.map((rel) => [rel, read(rel)]));

const operationalPage = contents["src/components/erp/operational/ERPOperationalModulePage.tsx"];
const operationalTable = contents["src/components/erp/operational/ERPOperationalTable.tsx"];
const expandedChildren = contents["src/components/erp/operational/ERPOperationalExpandedChildren.tsx"];
const kpiStrip = contents["src/components/erp/operational/ERPOperationalKpiStrip.tsx"];
const filters = contents["src/components/erp/operational/ERPOperationalFilters.tsx"];
const rightPanel = contents["src/components/erp/operational/ERPOperationalRightPanel.tsx"];
const runtimePage = contents["src/components/erp/runtime/ERPRuntimePage.tsx"];
const erpModule = contents["src/runtime/modules/ERPModule.ts"];

/**
 * Runtime generic contract checks.
 */
checkContains(
  "src/runtime/modules/ERPModule.ts",
  erpModule,
  "ERPOperationalModuleConfig",
  "Contrat ERPOperationalModuleConfig présent"
);

checkContains(
  "src/runtime/modules/ERPModule.ts",
  erpModule,
  "ERPOperationalKpiConfig",
  "Contrat KPI opérationnel présent"
);

checkContains(
  "src/runtime/modules/ERPModule.ts",
  erpModule,
  "ERPOperationalFilterConfig",
  "Contrat filtre opérationnel présent"
);

checkContains(
  "src/runtime/modules/ERPModule.ts",
  erpModule,
  "ERPOperationalTableConfig",
  "Contrat table opérationnelle présent"
);

checkContains(
  "src/runtime/modules/ERPModule.ts",
  erpModule,
  "ERPOperationalChildTotalConfig",
  "Contrat childTotals présent"
);

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
  "ERPRuntimePage branche la page opérationnelle générique"
);

/**
 * Module metadata checks.
 */
for (const item of moduleFiles) {
  const content = contents[item.rel];
  const operationalBlock = extractOperationalBlock(content);
  const tableFields = extractOperationalTableFields(content);

  checkContains(item.rel, content, "operational:", `${item.key} déclare operational`);
  checkContains(item.rel, operationalBlock, "enabled: true", `${item.key} active operational.enabled`);
  checkContains(item.rel, operationalBlock, "kpis:", `${item.key} déclare operational.kpis`);
  checkContains(item.rel, operationalBlock, "filters:", `${item.key} déclare operational.filters`);
  checkContains(item.rel, operationalBlock, "table:", `${item.key} déclare operational.table`);
  checkContains(item.rel, operationalBlock, "rightPanel:", `${item.key} déclare operational.rightPanel`);
  checkContains(item.rel, operationalBlock, "relationLabelFields:", `${item.key} déclare relationLabelFields`);

  for (const field of item.expectedFields) {
    checkContains(item.rel, tableFields, field, `${item.key} table.fields contient ${field}`);
  }
}

/**
 * Generic component checks.
 */
checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  operationalPage,
  "const config = module.operational",
  "ModulePage consomme module.operational"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  operationalPage,
  "Connecté :",
  "ModulePage affiche l'utilisateur connecté"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  operationalPage,
  "Aujourd’hui",
  "ModulePage affiche la date du jour"
);

checkContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  operationalTable,
  "relationLabels",
  "Table résout les libellés relationnels"
);

checkContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  operationalTable,
  "childTotals",
  "Table supporte les totaux enfants"
);

checkContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  operationalTable,
  "RuntimeDataBinding.list",
  "Table passe par RuntimeDataBinding pour les lectures auxiliaires"
);

checkContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expandedChildren,
  "RuntimeDataBinding.list",
  "Expand charge les enfants via RuntimeDataBinding"
);

checkContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expandedChildren,
  "parentModule.composition?.children",
  "Expand utilise composition.children"
);

checkContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expandedChildren,
  "buildRecordHref",
  "Expand construit les liens de navigation génériques"
);

checkContains(
  "src/components/erp/operational/ERPOperationalKpiStrip.tsx",
  kpiStrip,
  "kpis?: ERPOperationalKpiConfig[]",
  "KPI strip consomme une configuration KPI opérationnelle via props"
);

checkContains(
  "src/components/erp/operational/ERPOperationalFilters.tsx",
  filters,
  "filters?: ERPOperationalFilterConfig[]",
  "Filtres consomment une configuration de filtres opérationnels via props"
);

checkContains(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rightPanel,
  "rightPanel",
  "RightPanel existe et consomme la configuration"
);

/**
 * No direct Firestore in operational UI.
 */
for (const rel of [
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  "src/components/erp/operational/ERPOperationalTable.tsx",
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  "src/components/erp/operational/ERPOperationalKpiStrip.tsx",
  "src/components/erp/operational/ERPOperationalFilters.tsx",
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
]) {
  checkNotContains(
    rel,
    contents[rel],
    "firebase/firestore",
    `${rel} ne lit pas Firestore directement`
  );
}

/**
 * Local-specific coupling inspection.
 * These are warnings, not fails, because labels such as "Ouvrir intervention" are still tolerated,
 * but we want to identify what should become metadata-driven.
 */
const hardcodedLabels = [
  "Ouvrir intervention",
  "Ouvrir facture",
  "AMARKHYS",
  "Facturation aujourd'hui",
  "Atelier aujourd'hui",
];

for (const rel of files) {
  const content = contents[rel] ?? "";

  for (const label of hardcodedLabels) {
    if (content.includes(label)) {
      addFinding(
        "WARN",
        rel,
        `Chaîne métier hardcodée détectée: ${label}`
      );
    }
  }
}

/**
 * Performance findings.
 */
if (count(operationalTable, "RuntimeDataBinding.list") >= 2) {
  addFinding(
    "WARN",
    "src/components/erp/operational/ERPOperationalTable.tsx",
    "La table effectue plusieurs RuntimeDataBinding.list pour relations/totaux ; prévoir cache/resolver opérationnel."
  );
}

if (count(expandedChildren, "RuntimeDataBinding.list") >= 1) {
  addFinding(
    "WARN",
    "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
    "L'expand charge récursivement les enfants ; prévoir batch/cache/lazy resolver pour gros volumes."
  );
}

if (operationalTable.includes("[fieldKeys.join(\"|\"), module]")) {
  addFinding(
    "WARN",
    "src/components/erp/operational/ERPOperationalTable.tsx",
    "Dépendance useMemo basée sur fieldKeys.join ; acceptable court terme, à consolider."
  );
}

/**
 * Right panel maturity.
 */
if (!rightPanel.includes("RuntimeDataBinding") && !rightPanel.includes("data")) {
  addFinding(
    "WARN",
    "src/components/erp/operational/ERPOperationalRightPanel.tsx",
    "RightPanel probablement encore décoratif ; prévoir contenu runtime utile."
  );
}

const okCount = checks.filter((check) => check.level === "OK").length;
const failCount = checks.filter((check) => check.level === "FAIL").length;
const warnCount = findings.filter((finding) => finding.level === "WARN").length;

console.log("");
console.log("[CHECKS]");
for (const item of checks) {
  console.log(`[${item.level}] ${item.file}`);
  console.log("     " + item.message);
}

console.log("");
console.log("[FINDINGS]");
if (findings.length === 0) {
  console.log("[OK] Aucun finding.");
} else {
  for (const finding of findings) {
    console.log(`[${finding.level}] ${finding.file}`);
    console.log("     " + finding.message);
  }
}

console.log("");
console.log("[SUMMARY]");
console.log("OK:", okCount);
console.log("FAIL:", failCount);
console.log("WARN_FINDINGS:", warnCount);

const reportDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(reportDir, { recursive: true });

const report = [
  "# Q2-D-A — Audit global operational runtime consolidation",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  `WARN_FINDINGS: ${warnCount}`,
  "",
  "## Checks",
  "",
  ...checks.map((item) => `- [${item.level}] ${item.file} — ${item.message}`),
  "",
  "## Findings",
  "",
  ...(findings.length
    ? findings.map((item) => `- [${item.level}] ${item.file} — ${item.message}`)
    : ["- [OK] Aucun finding."]),
  "",
  "## Décision",
  "",
  failCount === 0
    ? "Le socle opérationnel est consolidable. Les warnings doivent guider les prochaines passes Q2-D-B/C/D."
    : "Corriger les FAIL avant toute consolidation.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-D-A-operational-runtime-consolidation-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-D-A-operational-runtime-consolidation-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — corriger avant consolidation.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK/WARN — consolidation possible.");
