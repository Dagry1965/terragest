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

const audits = [
  "docs/audits/Q2-A-F-operational-appointments-stabilization-audit.md",
  "docs/audits/Q2-B-C-operational-interventions-stabilization-audit.md",
  "docs/audits/Q2-C-C-operational-invoices-stabilization-audit.md",
  "docs/audits/Q2-D-A-operational-runtime-consolidation-audit.md",
  "docs/audits/Q2-D-C-A-operational-relation-labels-child-totals-audit.md",
  "docs/audits/Q2-D-C-B2-runtime-operational-data-resolver-foundation-audit.md",
  "docs/audits/Q2-D-C-D-operational-table-resolver-wiring-audit.md",
  "docs/audits/Q2-D-E-operational-pages-post-consolidation-audit.md",
  "docs/audits/Q2-D-F-A-operational-branding-hardcode-audit.md",
  "docs/audits/Q2-D-F-C-operational-branding-metadata-driven-audit.md",
];

const modules = [
  {
    key: "rendezvous",
    rel: "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
    fields: [
      '"clientId"',
      '"vehiculeId"',
      '"dateRendezVous"',
      '"heureRendezVous"',
      '"typeService"',
      '"statut"',
    ],
    children: ["interventionsauto"],
  },
  {
    key: "interventionsauto",
    rel: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
    fields: [
      '"clientId"',
      '"vehiculeId"',
      '"dateIntervention"',
      '"typeIntervention"',
      '"kilometrage"',
      '"coutTotal"',
      '"statut"',
    ],
    children: ["lignesinterventionauto", "facturesauto"],
  },
  {
    key: "facturesauto",
    rel: "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
    fields: [
      '"numeroFacture"',
      '"clientId"',
      '"vehiculeId"',
      '"dateFacture"',
      '"montantTTC"',
      '"montantPaye"',
      '"resteAPayer"',
      '"statutPaiement"',
    ],
    children: ["encaissementsauto", "echeancespaiementauto"],
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
console.log("[Q2-D-G-FINAL-OPERATIONAL-RUNTIME-FOUNDATION-AUDIT]");
console.log("");

const contents = Object.fromEntries(files.map((rel) => [rel, read(rel)]));

const runtimePage = contents["src/components/erp/runtime/ERPRuntimePage.tsx"];
const modulePage = contents["src/components/erp/operational/ERPOperationalModulePage.tsx"];
const table = contents["src/components/erp/operational/ERPOperationalTable.tsx"];
const expanded = contents["src/components/erp/operational/ERPOperationalExpandedChildren.tsx"];
const kpi = contents["src/components/erp/operational/ERPOperationalKpiStrip.tsx"];
const filters = contents["src/components/erp/operational/ERPOperationalFilters.tsx"];
const rightPanel = contents["src/components/erp/operational/ERPOperationalRightPanel.tsx"];
const resolver = contents["src/runtime/operational/RuntimeOperationalDataResolver.ts"];
const resolverIndex = contents["src/runtime/operational/index.ts"];
const erpModule = contents["src/runtime/modules/ERPModule.ts"];

/**
 * Core route/runtime wiring.
 */
checkContains(
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  runtimePage,
  "shouldUseOperationalPage",
  "ERPRuntimePage détecte operational.enabled"
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
  "branding?: ERPOperationalBrandingConfig",
  "openLabel?: string",
  "relationLabelFields",
]) {
  checkContains(
    "src/runtime/modules/ERPModule.ts",
    erpModule,
    pattern,
    `ERPModule contient ${pattern}`
  );
}

/**
 * Module operational configs.
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
  checkContains(item.rel, operational, "relationLabelFields:", `${item.key} déclare relationLabelFields`);

  for (const field of item.fields) {
    checkContains(item.rel, tableFields, field, `${item.key} table.fields contient ${field}`);
  }

  for (const child of item.children) {
    checkContains(item.rel, content, child, `${item.key} déclare enfant ${child}`);
  }
}

/**
 * Operational components.
 */
checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  modulePage,
  "config?.branding",
  "ModulePage lit branding"
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
  "Connecté :",
  "ModulePage affiche utilisateur connecté"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  modulePage,
  "Aujourd’hui",
  "ModulePage affiche date du jour"
);

checkContains(
  "src/components/erp/operational/ERPOperationalKpiStrip.tsx",
  kpi,
  "kpis?: ERPOperationalKpiConfig[]",
  "KPI strip reçoit kpis par props"
);

checkContains(
  "src/components/erp/operational/ERPOperationalFilters.tsx",
  filters,
  "filters?: ERPOperationalFilterConfig[]",
  "Filters reçoit filters par props"
);

checkContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expanded,
  'child.openLabel ?? "Ouvrir"',
  "Expand utilise openLabel metadata-driven"
);

checkNotContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expanded,
  "Ouvrir intervention",
  "Expand ne hardcode pas Ouvrir intervention"
);

checkNotContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expanded,
  "Ouvrir facture",
  "Expand ne hardcode pas Ouvrir facture"
);

checkContains(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rightPanel,
  "rightPanel",
  "RightPanel existe"
);

/**
 * Resolver.
 */
checkContains(
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  resolver,
  "export class RuntimeOperationalDataResolver",
  "Resolver existe"
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
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  resolver,
  "RuntimeDataBinding.list",
  "Resolver centralise RuntimeDataBinding.list"
);

checkContains(
  "src/runtime/operational/index.ts",
  resolverIndex,
  "RuntimeOperationalDataResolver",
  "runtime/operational index exporte resolver"
);

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
  "Table ne lit plus RuntimeDataBinding.list directement"
);

/**
 * No direct Firestore.
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
 * Audit artifacts.
 */
for (const audit of audits) {
  const content = read(audit);
  checkContains(audit, content, "#", `${audit} existe`);
}

/**
 * Remaining known debt.
 */
if (expanded.includes("RuntimeDataBinding.list")) {
  addFinding(
    "WARN",
    "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
    "Expand charge encore ses enfants directement via RuntimeDataBinding.list en lazy. Accepté court terme."
  );
}

if (rightPanel && !rightPanel.includes("data")) {
  addFinding(
    "WARN",
    "src/components/erp/operational/ERPOperationalRightPanel.tsx",
    "RightPanel existe mais reste peu data-driven. Prochaine consolidation possible."
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
  "# Q2-D-G — Audit final Operational Runtime Foundation",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  `WARN: ${warnCount}`,
  "",
  "## Scope",
  "",
  "- Operational pages: rendezvous, interventionsauto, facturesauto",
  "- Runtime resolver: RuntimeOperationalDataResolver",
  "- Metadata-driven behaviors: branding, openLabel, relationLabelFields, childTotals",
  "- UI components: ModulePage, Table, Expand, KPI, Filters, RightPanel",
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
    ? "Q2-D Operational Runtime Foundation est validée et peut être considérée comme socle stable."
    : "Corriger les FAIL avant clôture Q2-D.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-D-G-final-operational-runtime-foundation-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-D-G-final-operational-runtime-foundation-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — Q2-D ne doit pas être clôturé.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK/WARN — Q2-D Operational Runtime Foundation validée.");
