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
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  "docs/audits/Q2-G-final-operational-ux-runtime-audit.md",
];

const pages = [
  {
    key: "rendezvous",
    label: "Rendez-vous",
    rel: "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
    expectedTableFields: [
      "clientId",
      "vehiculeId",
      "dateRendezVous",
      "heureRendezVous",
      "typeService",
      "statut",
    ],
    expectedFilters: ["statut", "typeService", "clientId"],
    expectedMetrics: ["total"],
    expectedChildren: ["interventionsauto"],
  },
  {
    key: "interventionsauto",
    label: "Interventions",
    rel: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
    expectedTableFields: [
      "clientId",
      "vehiculeId",
      "dateIntervention",
      "typeIntervention",
      "kilometrage",
      "coutTotal",
      "statut",
    ],
    expectedFilters: ["statut", "typeIntervention", "clientId"],
    expectedMetrics: ["total", "en_cours", "cout_total"],
    expectedChildren: ["lignesinterventionauto", "facturesauto"],
  },
  {
    key: "facturesauto",
    label: "Factures",
    rel: "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
    expectedTableFields: [
      "numeroFacture",
      "clientId",
      "vehiculeId",
      "dateFacture",
      "montantTTC",
      "montantPaye",
      "resteAPayer",
      "statutPaiement",
    ],
    expectedFilters: ["statutPaiement", "statutFacture", "clientId"],
    expectedMetrics: ["total", "montant_ttc", "reste_a_payer"],
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

function extractBlock(content, startPattern, endPatterns) {
  const start = content.indexOf(startPattern);
  if (start < 0) return "";

  const ends = endPatterns
    .map((pattern) => content.indexOf(pattern, start + startPattern.length))
    .filter((index) => index > start);

  const end = ends.length ? Math.min(...ends) : content.length;

  return content.slice(start, end);
}

function extractOperationalBlock(content) {
  return extractBlock(content, "operational:", ["composition:", "actions:", "workflows:"]);
}

function extractTableBlock(content) {
  const operational = extractOperationalBlock(content);
  return extractBlock(operational, "table:", ["rightPanel:", "filters:", "kpis:"]);
}

function extractFiltersBlock(content) {
  const operational = extractOperationalBlock(content);
  return extractBlock(operational, "filters:", ["table:", "rightPanel:"]);
}

function extractRightPanelBlock(content) {
  const operational = extractOperationalBlock(content);
  return extractBlock(operational, "rightPanel:", ["composition:", "actions:", "workflows:"]);
}

function extractCompositionBlock(content) {
  return extractBlock(content, "composition:", ["actions:", "workflows:"]);
}

console.log("");
console.log("[Q2-H-A-OPERATIONAL-PAGES-VISUAL-UX-READINESS-AUDIT]");
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

/**
 * Runtime operational routing.
 */
checkContains(
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  runtimePage,
  "shouldUseOperationalPage",
  "Runtime page détecte operational.enabled"
);

checkContains(
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  runtimePage,
  "ERPOperationalModulePage",
  "Runtime page branche la page opérationnelle"
);

/**
 * UX shell readiness.
 */
for (const pattern of [
  "config?.branding",
  "{eyebrow}",
  "Aujourd",
  "Connect",
  "<ERPOperationalKpiStrip",
  "<ERPOperationalFilters",
  "<ERPOperationalTable",
  "<ERPOperationalRightPanel",
  "data={filteredData}",
]) {
  checkContains(
    "src/components/erp/operational/ERPOperationalModulePage.tsx",
    modulePage,
    pattern,
    `ModulePage contient ${pattern}`
  );
}

/**
 * Component readiness.
 */
for (const pattern of [
  "RuntimeOperationalDataResolver",
  "resolveRelationLabels",
  "resolveChildTotals",
  "expandedRows",
  "ERPOperationalExpandedChildren",
]) {
  checkContains(
    "src/components/erp/operational/ERPOperationalTable.tsx",
    table,
    ` ${pattern}`.trim(),
    `Table opérationnelle contient ${pattern}`
  );
}

for (const pattern of [
  "panel.metrics",
  "resolveMetricValue",
  "formatMetricValue",
  'metric.type === "count"',
  'metric.type === "countWhere"',
  'metric.type === "sum"',
  'metric.type === "average"',
]) {
  checkContains(
    "src/components/erp/operational/ERPOperationalRightPanel.tsx",
    rightPanel,
    pattern,
    `RightPanel contient ${pattern}`
  );
}

for (const pattern of [
  "RuntimeOperationalChildrenResolver",
  "resolveExpandedChildren",
  "maxDepth: 2",
  'child.openLabel ?? "Ouvrir"',
  "grandchildrenByParentId",
]) {
  checkContains(
    "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
    expanded,
    pattern,
    `ExpandedChildren contient ${pattern}`
  );
}

checkContains(
  "src/components/erp/operational/ERPOperationalKpiStrip.tsx",
  kpi,
  "kpis",
  "KpiStrip consomme les KPI metadata"
);

checkContains(
  "src/components/erp/operational/ERPOperationalFilters.tsx",
  filters,
  "filters",
  "Filters consomme les filtres metadata"
);

/**
 * Module metadata readiness.
 */
for (const page of pages) {
  const content = contents[page.rel];
  const operational = extractOperationalBlock(content);
  const tableBlock = extractTableBlock(content);
  const filtersBlock = extractFiltersBlock(content);
  const rightPanelBlock = extractRightPanelBlock(content);
  const compositionBlock = extractCompositionBlock(content);

  checkContains(page.rel, operational, "enabled: true", `${page.label} operational.enabled`);
  checkContains(page.rel, operational, "branding:", `${page.label} branding metadata`);
  checkContains(page.rel, operational, "kpis:", `${page.label} kpis metadata`);
  checkContains(page.rel, operational, "filters:", `${page.label} filters metadata`);
  checkContains(page.rel, operational, "table:", `${page.label} table metadata`);
  checkContains(page.rel, operational, "rightPanel:", `${page.label} rightPanel metadata`);
  checkContains(page.rel, rightPanelBlock, "metrics:", `${page.label} rightPanel.metrics metadata`);
  checkContains(page.rel, tableBlock, "relationLabelFields:", `${page.label} relationLabelFields metadata`);

  for (const field of page.expectedTableFields) {
    checkContains(page.rel, tableBlock, `"${field}"`, `${page.label} table field ${field}`);
  }

  for (const filter of page.expectedFilters) {
    checkContains(page.rel, filtersBlock, `key: "${filter}"`, `${page.label} filter ${filter}`);
  }

  for (const metric of page.expectedMetrics) {
    checkContains(page.rel, rightPanelBlock, `key: "${metric}"`, `${page.label} rightPanel metric ${metric}`);
  }

  for (const child of page.expectedChildren) {
    checkContains(page.rel, compositionBlock, child, `${page.label} child ${child}`);
  }
}

/**
 * Resolver readiness.
 */
for (const pattern of [
  "export class RuntimeOperationalDataResolver",
  "resolveRelationLabels",
  "resolveChildTotals",
  "RuntimeDataBinding.list",
]) {
  checkContains(
    "src/runtime/operational/RuntimeOperationalDataResolver.ts",
    dataResolver,
    pattern,
    `DataResolver contient ${pattern}`
  );
}

for (const pattern of [
  "export class RuntimeOperationalChildrenResolver",
  "resolveExpandedChildren",
  "RuntimeDataBinding.list",
  "maxDepth",
  "moduleKey: string",
  "parentRecordId?: string",
]) {
  checkContains(
    "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
    childrenResolver,
    pattern,
    `ChildrenResolver contient ${pattern}`
  );
}

/**
 * No direct Firestore / no list in UI components.
 */
for (const rel of [
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  "src/components/erp/operational/ERPOperationalTable.tsx",
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  "src/components/erp/operational/ERPOperationalKpiStrip.tsx",
  "src/components/erp/operational/ERPOperationalFilters.tsx",
]) {
  checkNotContains(rel, contents[rel], "firebase/firestore", `${rel} pas de Firestore direct`);
}

for (const rel of [
  "src/components/erp/operational/ERPOperationalTable.tsx",
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
]) {
  checkNotContains(rel, contents[rel], "RuntimeDataBinding.list", `${rel} pas de RuntimeDataBinding.list direct`);
}

/**
 * Previous final audit anchor.
 */
checkContains(
  "docs/audits/Q2-G-final-operational-ux-runtime-audit.md",
  contents["docs/audits/Q2-G-final-operational-ux-runtime-audit.md"],
  "FAIL: 0",
  "Q2-G final audit validé sans FAIL"
);

checkContains(
  "docs/audits/Q2-G-final-operational-ux-runtime-audit.md",
  contents["docs/audits/Q2-G-final-operational-ux-runtime-audit.md"],
  "FAIL_FINDINGS: 0",
  "Q2-G final audit validé sans FAIL_FINDINGS"
);

/**
 * Findings UX manual checklist.
 */
addFinding(
  "MANUAL",
  "UX",
  "Vérifier visuellement /rendezvous : KPI, filtres, table, RightPanel, expand interventions."
);

addFinding(
  "MANUAL",
  "UX",
  "Vérifier visuellement /interventionsauto : kilometrage visible, coût total, statut, expand lignes/factures."
);

addFinding(
  "MANUAL",
  "UX",
  "Vérifier visuellement /facturesauto : montant payé, reste à payer, statut paiement visibles, expand enfants."
);

addFinding(
  "MANUAL",
  "UX",
  "Vérifier absence de crash console et lisibilité mobile/desktop."
);

const okCount = checks.filter((check) => check.level === "OK").length;
const failCount = checks.filter((check) => check.level === "FAIL").length;
const manualCount = findings.filter((finding) => finding.level === "MANUAL").length;

for (const check of checks) {
  console.log(`[${check.level}] ${check.file}`);
  console.log("     " + check.message);

  if (check.level === "FAIL" && check.pattern) {
    console.log("     pattern: " + check.pattern);
  }
}

console.log("");
console.log("[FINDINGS]");
for (const finding of findings) {
  console.log(`[${finding.level}] ${finding.file}`);
  console.log("     " + finding.message);
}

console.log("");
console.log("[SUMMARY]");
console.log("OK:", okCount);
console.log("FAIL:", failCount);
console.log("MANUAL:", manualCount);

const reportDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(reportDir, { recursive: true });

const report = [
  "# Q2-H-A — Audit readiness UX visuel operational pages",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  `MANUAL: ${manualCount}`,
  "",
  "## Scope",
  "",
  "- /rendezvous",
  "- /interventionsauto",
  "- /facturesauto",
  "- KPI / filters / table / right panel / expanded children",
  "- Readiness avant contrôle visuel utilisateur",
  "",
  "## Checks",
  "",
  ...checks.map((check) => `- [${check.level}] ${check.file} — ${check.message}`),
  "",
  "## Manual checks à réaliser",
  "",
  ...findings.map((finding) => `- [${finding.level}] ${finding.message}`),
  "",
  "## Décision",
  "",
  failCount === 0
    ? "Readiness UX visuel validée. Passer au test manuel des trois pages."
    : "Corriger les FAIL avant test visuel.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-H-A-operational-pages-visual-ux-readiness-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-H-A-operational-pages-visual-ux-readiness-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — corriger avant test visuel.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK/MANUAL — readiness validée, passer au contrôle visuel.");
