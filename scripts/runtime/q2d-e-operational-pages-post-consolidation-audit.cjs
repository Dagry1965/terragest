const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  "src/components/erp/operational/ERPOperationalTable.tsx",
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  "src/components/erp/operational/ERPOperationalKpiStrip.tsx",
  "src/components/erp/operational/ERPOperationalFilters.tsx",
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  "src/runtime/operational/index.ts",
  "src/runtime/modules/ERPModule.ts",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
];

const operationalModules = [
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
    expectedChildren: ["interventionsauto"],
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
    expectedChildren: ["lignesinterventionauto", "facturesauto"],
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
    expectedChildren: ["encaissementsauto", "echeancespaiementauto"],
  },
];

const checks = [];
const findings = [];

function abs(rel) {
  return path.join(ROOT, rel);
}

function read(rel) {
  const file = abs(rel);

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

const contents = Object.fromEntries(files.map((rel) => [rel, read(rel)]));

const runtimePage = contents["src/components/erp/runtime/ERPRuntimePage.tsx"];
const operationalPage = contents["src/components/erp/operational/ERPOperationalModulePage.tsx"];
const operationalTable = contents["src/components/erp/operational/ERPOperationalTable.tsx"];
const expandedChildren = contents["src/components/erp/operational/ERPOperationalExpandedChildren.tsx"];
const kpiStrip = contents["src/components/erp/operational/ERPOperationalKpiStrip.tsx"];
const filters = contents["src/components/erp/operational/ERPOperationalFilters.tsx"];
const rightPanel = contents["src/components/erp/operational/ERPOperationalRightPanel.tsx"];
const resolver = contents["src/runtime/operational/RuntimeOperationalDataResolver.ts"];
const resolverIndex = contents["src/runtime/operational/index.ts"];
const erpModule = contents["src/runtime/modules/ERPModule.ts"];

console.log("");
console.log("[Q2-D-E-OPERATIONAL-PAGES-POST-CONSOLIDATION-AUDIT]");
console.log("");

/**
 * Runtime routing + contract.
 */
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
  "ERPModule contient ERPOperationalModuleConfig"
);

checkContains(
  "src/runtime/modules/ERPModule.ts",
  erpModule,
  "openLabel?: string",
  "ERPCompositionChild supporte openLabel metadata-driven"
);

checkContains(
  "src/runtime/modules/ERPModule.ts",
  erpModule,
  "ERPOperationalChildTotalConfig",
  "ERPModule contient ERPOperationalChildTotalConfig"
);

/**
 * Modules operational metadata.
 */
for (const item of operationalModules) {
  const content = contents[item.rel];
  const operationalBlock = extractOperationalBlock(content);
  const tableFields = extractOperationalTableFields(content);

  checkContains(item.rel, content, "operational:", `${item.key} déclare operational`);
  checkContains(item.rel, operationalBlock, "enabled: true", `${item.key} active operational`);
  checkContains(item.rel, operationalBlock, "kpis:", `${item.key} déclare kpis`);
  checkContains(item.rel, operationalBlock, "filters:", `${item.key} déclare filters`);
  checkContains(item.rel, operationalBlock, "table:", `${item.key} déclare table`);
  checkContains(item.rel, operationalBlock, "rightPanel:", `${item.key} déclare rightPanel`);
  checkContains(item.rel, operationalBlock, "relationLabelFields:", `${item.key} déclare relationLabelFields`);

  for (const field of item.expectedFields) {
    checkContains(item.rel, tableFields, field, `${item.key} table.fields contient ${field}`);
  }

  for (const child of item.expectedChildren) {
    checkContains(item.rel, content, child, `${item.key} déclare enfant ${child}`);
  }
}

/**
 * Resolver wiring.
 */
checkContains(
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  resolver,
  "export class RuntimeOperationalDataResolver",
  "RuntimeOperationalDataResolver est présent"
);

checkContains(
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  resolver,
  "static async resolveRelationLabels",
  "Resolver expose resolveRelationLabels"
);

checkContains(
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  resolver,
  "static async resolveChildTotals",
  "Resolver expose resolveChildTotals"
);

checkContains(
  "src/runtime/operational/index.ts",
  resolverIndex,
  "RuntimeOperationalDataResolver",
  "src/runtime/operational/index.ts exporte le resolver"
);

checkContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  operationalTable,
  "RuntimeOperationalDataResolver",
  "ERPOperationalTable utilise RuntimeOperationalDataResolver"
);

checkContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  operationalTable,
  "resolveRelationLabels",
  "ERPOperationalTable utilise resolveRelationLabels"
);

checkContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  operationalTable,
  "resolveChildTotals",
  "ERPOperationalTable utilise resolveChildTotals"
);

checkNotContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  operationalTable,
  "RuntimeDataBinding.list",
  "ERPOperationalTable ne lit plus RuntimeDataBinding.list directement"
);

/**
 * Operational UI generic checks.
 */
checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  operationalPage,
  "const config = module.operational",
  "ERPOperationalModulePage consomme module.operational"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  operationalPage,
  "Connecté :",
  "Header opérationnel affiche l’utilisateur connecté"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  operationalPage,
  "Aujourd’hui",
  "Header opérationnel affiche la date du jour"
);

checkContains(
  "src/components/erp/operational/ERPOperationalKpiStrip.tsx",
  kpiStrip,
  "kpis?: ERPOperationalKpiConfig[]",
  "KPI strip consomme les KPI via props"
);

checkContains(
  "src/components/erp/operational/ERPOperationalFilters.tsx",
  filters,
  "filters?: ERPOperationalFilterConfig[]",
  "Filters consomme les filtres via props"
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
  'child.openLabel ?? "Ouvrir"',
  "Expand utilise openLabel metadata-driven"
);

checkNotContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expandedChildren,
  "Ouvrir intervention",
  "Expand ne hardcode plus Ouvrir intervention"
);

checkNotContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expandedChildren,
  "Ouvrir facture",
  "Expand ne hardcode plus Ouvrir facture"
);

checkContains(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rightPanel,
  "rightPanel",
  "RightPanel existe"
);

/**
 * No direct Firestore in operational UI/resolver.
 */
for (const rel of [
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  "src/components/erp/operational/ERPOperationalTable.tsx",
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  "src/components/erp/operational/ERPOperationalKpiStrip.tsx",
  "src/components/erp/operational/ERPOperationalFilters.tsx",
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
]) {
  checkNotContains(
    rel,
    contents[rel],
    "firebase/firestore",
    `${rel} ne lit pas Firestore directement`
  );
}

/**
 * Findings for next steps.
 */
if (operationalPage.includes("AMARKHYS")) {
  addFinding(
    "WARN",
    "src/components/erp/operational/ERPOperationalModulePage.tsx",
    "AMARKHYS reste hardcodé dans le header opérationnel ; prévoir tenant/company branding metadata-driven."
  );
}

if (rightPanel && !rightPanel.includes("data")) {
  addFinding(
    "WARN",
    "src/components/erp/operational/ERPOperationalRightPanel.tsx",
    "RightPanel encore peu connecté aux données ; prochaine consolidation possible."
  );
}

if (expandedChildren.includes("RuntimeDataBinding.list")) {
  addFinding(
    "WARN",
    "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
    "Expand charge encore ses enfants directement via RuntimeDataBinding.list ; acceptable lazy court terme."
  );
}

const okCount = checks.filter((check) => check.level === "OK").length;
const failCount = checks.filter((check) => check.level === "FAIL").length;
const warnCount = findings.filter((finding) => finding.level === "WARN").length;

console.log("[CHECKS]");
for (const check of checks) {
  console.log(`[${check.level}] ${check.file}`);
  console.log("     " + check.message);
  if (check.level === "FAIL" && check.pattern) {
    console.log("     pattern: " + check.pattern);
  }
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
console.log("WARN:", warnCount);

const reportDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(reportDir, { recursive: true });

const report = [
  "# Q2-D-E — Audit global post-consolidation des pages opérationnelles",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  `WARN: ${warnCount}`,
  "",
  "## Checks",
  "",
  ...checks.map((check) => `- [${check.level}] ${check.file} — ${check.message}`),
  "",
  "## Findings",
  "",
  ...(findings.length
    ? findings.map((finding) => `- [${finding.level}] ${finding.file} — ${finding.message}`)
    : ["- [OK] Aucun finding."]),
  "",
  "## Décision",
  "",
  failCount === 0
    ? "Les trois pages opérationnelles sont stables après consolidation du resolver."
    : "Corriger les FAIL avant de continuer.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-D-E-operational-pages-post-consolidation-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-D-E-operational-pages-post-consolidation-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — corriger avant suite.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK/WARN — socle opérationnel post-consolidation validé.");
