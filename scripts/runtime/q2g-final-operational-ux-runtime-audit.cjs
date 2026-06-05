const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  "src/components/erp/operational/ERPOperationalTable.tsx",
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  "src/components/erp/operational/ERPOperationalKpiStrip.tsx",
  "src/components/erp/operational/ERPOperationalFilters.tsx",
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
  "src/runtime/operational/index.ts",
  "src/runtime/modules/ERPModule.ts",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  "docs/audits/Q2-D-G-final-operational-runtime-foundation-audit.md",
  "docs/audits/Q2-E-D-final-right-panel-data-driven-audit.md",
  "docs/audits/Q2-F-D-final-operational-children-resolver-audit.md",
];

const modules = [
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
  const rightPanelIndex = content.indexOf("rightPanel:", tableIndex);
  const compositionIndex = content.indexOf("composition:", operationalIndex);

  const endCandidates = [
    relationLabelFieldsIndex,
    childTotalsIndex,
    rightPanelIndex,
    compositionIndex,
    content.length,
  ].filter((index) => index > fieldsIndex);

  return content.slice(fieldsIndex, Math.min(...endCandidates));
}

console.log("");
console.log("[Q2-G-FINAL-OPERATIONAL-UX-RUNTIME-AUDIT]");
console.log("");

const contents = Object.fromEntries(files.map((rel) => [rel, read(rel)]));

const runtimePage = contents["src/components/erp/runtime/ERPRuntimePage.tsx"];
const modulePage = contents["src/components/erp/operational/ERPOperationalModulePage.tsx"];
const table = contents["src/components/erp/operational/ERPOperationalTable.tsx"];
const rightPanel = contents["src/components/erp/operational/ERPOperationalRightPanel.tsx"];
const expanded = contents["src/components/erp/operational/ERPOperationalExpandedChildren.tsx"];
const kpi = contents["src/components/erp/operational/ERPOperationalKpiStrip.tsx"];
const filters = contents["src/components/erp/operational/ERPOperationalFilters.tsx"];
const dataResolver = contents["src/runtime/operational/RuntimeOperationalDataResolver.ts"];
const childrenResolver = contents["src/runtime/operational/RuntimeOperationalChildrenResolver.ts"];
const operationalIndex = contents["src/runtime/operational/index.ts"];
const erpModule = contents["src/runtime/modules/ERPModule.ts"];

/**
 * Runtime page routing.
 */
checkContains(
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  runtimePage,
  "shouldUseOperationalPage",
  "ERPRuntimePage détecte les modules opérationnels"
);

checkContains(
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  runtimePage,
  "ERPOperationalModulePage",
  "ERPRuntimePage branche ERPOperationalModulePage"
);

/**
 * Contracts.
 */
for (const pattern of [
  "ERPOperationalModuleConfig",
  "ERPOperationalKpiConfig",
  "ERPOperationalFilterConfig",
  "ERPOperationalTableConfig",
  "ERPOperationalChildTotalConfig",
  "ERPOperationalBrandingConfig",
  "ERPOperationalRightPanelMetricConfig",
  "metrics?: ERPOperationalRightPanelMetricConfig[]",
  "branding?: ERPOperationalBrandingConfig",
  "ERPCompositionChild",
  "children?: ERPCompositionChild[]",
  "openLabel?: string",
]) {
  checkContains(
    "src/runtime/modules/ERPModule.ts",
    erpModule,
    pattern,
    `ERPModule contient ${pattern}`
  );
}

/**
 * Operational modules.
 */
for (const item of modules) {
  const content = contents[item.rel];
  const operational = extractOperationalBlock(content);
  const tableFields = extractOperationalTableFields(content);

  checkContains(item.rel, content, "operational:", `${item.key} déclare operational`);
  checkContains(item.rel, operational, "enabled: true", `${item.key} active operational`);
  checkContains(item.rel, operational, "branding:", `${item.key} déclare branding`);
  checkContains(item.rel, operational, "kpis:", `${item.key} déclare kpis`);
  checkContains(item.rel, operational, "filters:", `${item.key} déclare filters`);
  checkContains(item.rel, operational, "table:", `${item.key} déclare table`);
  checkContains(item.rel, operational, "rightPanel:", `${item.key} déclare rightPanel`);
  checkContains(item.rel, operational, "metrics:", `${item.key} déclare rightPanel.metrics`);
  checkContains(item.rel, operational, "relationLabelFields:", `${item.key} déclare relationLabelFields`);

  for (const field of item.expectedFields) {
    checkContains(item.rel, tableFields, field, `${item.key} table.fields contient ${field}`);
  }

  for (const child of item.expectedChildren) {
    checkContains(item.rel, content, child, `${item.key} déclare enfant ${child}`);
  }
}

/**
 * Operational module page.
 */
checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  modulePage,
  "config?.branding",
  "ModulePage consomme operational.branding"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  modulePage,
  "{eyebrow}",
  "ModulePage affiche eyebrow metadata-driven"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  modulePage,
  "data={filteredData}",
  "ModulePage transmet filteredData"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  modulePage,
  "<ERPOperationalTable",
  "ModulePage branche ERPOperationalTable"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  modulePage,
  "<ERPOperationalRightPanel",
  "ModulePage branche ERPOperationalRightPanel"
);

/**
 * Table data resolver.
 */
checkContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  table,
  "RuntimeOperationalDataResolver",
  "Table utilise RuntimeOperationalDataResolver"
);

checkContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  table,
  "resolveRelationLabels",
  "Table utilise resolveRelationLabels"
);

checkContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  table,
  "resolveChildTotals",
  "Table utilise resolveChildTotals"
);

checkNotContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  table,
  "RuntimeDataBinding.list",
  "Table ne lit pas RuntimeDataBinding.list directement"
);

/**
 * RightPanel metrics.
 */
checkContains(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rightPanel,
  "panel.metrics",
  "RightPanel lit panel.metrics"
);

checkContains(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rightPanel,
  "resolveMetricValue",
  "RightPanel calcule les metrics"
);

for (const metricType of [
  'metric.type === "count"',
  'metric.type === "countWhere"',
  'metric.type === "sum"',
  'metric.type === "average"',
]) {
  checkContains(
    "src/components/erp/operational/ERPOperationalRightPanel.tsx",
    rightPanel,
    metricType,
    `RightPanel supporte ${metricType}`
  );
}

checkNotContains(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rightPanel,
  "RuntimeDataBinding.list",
  "RightPanel ne lit pas RuntimeDataBinding.list directement"
);

/**
 * Expanded children resolver.
 */
checkContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expanded,
  "RuntimeOperationalChildrenResolver",
  "ExpandedChildren utilise RuntimeOperationalChildrenResolver"
);

checkContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expanded,
  "RuntimeOperationalChildrenResolver.resolveExpandedChildren",
  "ExpandedChildren appelle resolveExpandedChildren"
);

checkContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expanded,
  "module: parentModule",
  "ExpandedChildren transmet module"
);

checkContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expanded,
  "record: parentRecord",
  "ExpandedChildren transmet record"
);

checkContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expanded,
  "maxDepth: 2",
  "ExpandedChildren limite maxDepth à 2"
);

checkContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expanded,
  'child.openLabel ?? "Ouvrir"',
  "ExpandedChildren utilise openLabel metadata-driven"
);

checkNotContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expanded,
  "RuntimeDataBinding.list",
  "ExpandedChildren ne lit pas RuntimeDataBinding.list directement"
);

/**
 * Runtime operational resolvers.
 */
checkContains(
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  dataResolver,
  "export class RuntimeOperationalDataResolver",
  "RuntimeOperationalDataResolver existe"
);

checkContains(
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  dataResolver,
  "static async resolveRelationLabels",
  "DataResolver expose resolveRelationLabels"
);

checkContains(
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  dataResolver,
  "static async resolveChildTotals",
  "DataResolver expose resolveChildTotals"
);

checkContains(
  "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
  childrenResolver,
  "export class RuntimeOperationalChildrenResolver",
  "ChildrenResolver existe"
);

checkContains(
  "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
  childrenResolver,
  "static async resolveExpandedChildren",
  "ChildrenResolver expose resolveExpandedChildren"
);

checkContains(
  "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
  childrenResolver,
  "RuntimeDataBinding.list",
  "ChildrenResolver centralise RuntimeDataBinding.list"
);

checkContains(
  "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
  childrenResolver,
  "maxDepth",
  "ChildrenResolver supporte maxDepth"
);

checkContains(
  "src/runtime/operational/index.ts",
  operationalIndex,
  "RuntimeOperationalDataResolver",
  "runtime/operational exporte RuntimeOperationalDataResolver"
);

checkContains(
  "src/runtime/operational/index.ts",
  operationalIndex,
  "RuntimeOperationalChildrenResolver",
  "runtime/operational exporte RuntimeOperationalChildrenResolver"
);

/**
 * No direct Firestore in operational UI/resolvers.
 */
for (const rel of [
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  "src/components/erp/operational/ERPOperationalTable.tsx",
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  "src/components/erp/operational/ERPOperationalKpiStrip.tsx",
  "src/components/erp/operational/ERPOperationalFilters.tsx",
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
]) {
  checkNotContains(
    rel,
    contents[rel],
    "firebase/firestore",
    `${rel} ne lit pas Firestore directement`
  );
}

/**
 * Prior final audits.
 */
for (const rel of [
  "docs/audits/Q2-D-G-final-operational-runtime-foundation-audit.md",
  "docs/audits/Q2-E-D-final-right-panel-data-driven-audit.md",
  "docs/audits/Q2-F-D-final-operational-children-resolver-audit.md",
]) {
  const content = contents[rel];

  checkContains(rel, content, "#", `${rel} existe`);
  checkContains(rel, content, "FAIL: 0", `${rel} validé sans FAIL`);
}

/**
 * Findings.
 */
if (operationalIndex.includes('export * from "./RuntimeOperationalChildrenResolver"')) {
  addFinding(
    "INFO",
    "src/runtime/operational/index.ts",
    "export * supplémentaire pour RuntimeOperationalChildrenResolver ; non bloquant."
  );
}

if (childrenResolver.includes("RuntimeDataBinding.list")) {
  addFinding(
    "OK",
    "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
    "RuntimeDataBinding.list est centralisé dans le resolver children."
  );
}

const okCount = checks.filter((check) => check.level === "OK").length;
const failCount = checks.filter((check) => check.level === "FAIL").length;
const failFindings = findings.filter((finding) => finding.level === "FAIL").length;
const infoCount = findings.filter((finding) => finding.level === "INFO").length;

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
console.log("FAIL_FINDINGS:", failFindings);
console.log("INFO:", infoCount);

const reportDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(reportDir, { recursive: true });

const report = [
  "# Q2-G — Audit global final Operational UX Runtime",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  `FAIL_FINDINGS: ${failFindings}`,
  `INFO: ${infoCount}`,
  "",
  "## Scope",
  "",
  "- Q2-D Operational Runtime Foundation",
  "- Q2-E RightPanel data-driven",
  "- Q2-F Operational Children Resolver",
  "- Pages opérationnelles: rendezvous, interventionsauto, facturesauto",
  "- Resolvers runtime operational",
  "- Composants UI opérationnels",
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
  failCount === 0 && failFindings === 0
    ? "Operational UX Runtime est validé globalement après Q2-D, Q2-E et Q2-F."
    : "Corriger les FAIL avant clôture globale.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-G-final-operational-ux-runtime-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-G-final-operational-ux-runtime-audit.md");

if (failCount > 0 || failFindings > 0) {
  console.log("");
  console.log("[RESULT] FAIL — Operational UX Runtime non clôturable.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK/INFO — Operational UX Runtime global validé.");
