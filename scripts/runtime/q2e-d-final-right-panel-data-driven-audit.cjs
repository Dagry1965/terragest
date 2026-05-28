const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/runtime/modules/ERPModule.ts",
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  "docs/audits/Q2-E-A-operational-right-panel-readiness-audit.md",
  "docs/audits/Q2-E-C-right-panel-metrics-metadata-driven-audit.md",
];

const checks = [];

function read(rel) {
  const file = path.join(ROOT, rel);

  if (!fs.existsSync(file)) {
    checks.push({ level: "FAIL", file: rel, message: "Fichier introuvable" });
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

const contents = Object.fromEntries(files.map((rel) => [rel, read(rel)]));

const erpModule = contents["src/runtime/modules/ERPModule.ts"];
const rightPanel = contents["src/components/erp/operational/ERPOperationalRightPanel.tsx"];
const modulePage = contents["src/components/erp/operational/ERPOperationalModulePage.tsx"];

console.log("");
console.log("[Q2-E-D-FINAL-RIGHT-PANEL-DATA-DRIVEN-AUDIT]");
console.log("");

checkContains(
  "src/runtime/modules/ERPModule.ts",
  erpModule,
  "ERPOperationalRightPanelMetricConfig",
  "Contrat ERPOperationalRightPanelMetricConfig présent"
);

checkContains(
  "src/runtime/modules/ERPModule.ts",
  erpModule,
  "metrics?: ERPOperationalRightPanelMetricConfig[]",
  "rightPanel.metrics existe dans le contrat"
);

for (const metricType of ['"count"', '"countWhere"', '"sum"', '"average"']) {
  checkContains(
    "src/runtime/modules/ERPModule.ts",
    erpModule,
    metricType,
    `Type métrique supporté : ${metricType}`
  );
}

checkContains(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rightPanel,
  "module: ERPModule",
  "ERPOperationalRightPanel reçoit module"
);

checkContains(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rightPanel,
  "data: Record<string, unknown>[]",
  "ERPOperationalRightPanel reçoit data"
);

checkContains(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rightPanel,
  "panel.metrics",
  "ERPOperationalRightPanel lit panel.metrics"
);

checkContains(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rightPanel,
  "resolveMetricValue",
  "ERPOperationalRightPanel calcule les métriques"
);

checkContains(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rightPanel,
  "formatMetricValue",
  "ERPOperationalRightPanel formate les métriques"
);

checkContains(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rightPanel,
  'metric.type === "count"',
  "RightPanel supporte count"
);

checkContains(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rightPanel,
  'metric.type === "countWhere"',
  "RightPanel supporte countWhere"
);

checkContains(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rightPanel,
  'metric.type === "sum"',
  "RightPanel supporte sum"
);

checkContains(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rightPanel,
  'metric.type === "average"',
  "RightPanel supporte average"
);

checkNotContains(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rightPanel,
  "RuntimeDataBinding.list",
  "RightPanel ne lit pas RuntimeDataBinding.list directement"
);

checkNotContains(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rightPanel,
  "firebase/firestore",
  "RightPanel ne lit pas Firestore directement"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  modulePage,
  "<ERPOperationalRightPanel",
  "ERPOperationalModulePage branche ERPOperationalRightPanel"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  modulePage,
  "data={filteredData}",
  "ERPOperationalModulePage transmet filteredData au RightPanel"
);

for (const rel of [
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
]) {
  const content = contents[rel];

  checkContains(rel, content, "rightPanel:", `${rel} déclare rightPanel`);
  checkContains(rel, content, "metrics:", `${rel} déclare rightPanel.metrics`);
  checkContains(rel, content, 'type: "count"', `${rel} déclare une métrique count`);
}

checkContains(
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  contents["src/runtime/modules/generated/rendezvous/rendezvous.module.ts"],
  'type: "countWhere"',
  "rendezvous déclare countWhere"
);

checkContains(
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  contents["src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts"],
  'type: "sum"',
  "interventionsauto déclare sum"
);

checkContains(
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  contents["src/runtime/modules/generated/facturesauto/facturesauto.module.ts"],
  'type: "sum"',
  "facturesauto déclare sum"
);

for (const rel of [
  "docs/audits/Q2-E-A-operational-right-panel-readiness-audit.md",
  "docs/audits/Q2-E-C-right-panel-metrics-metadata-driven-audit.md",
]) {
  const content = contents[rel];

  checkContains(rel, content, "#", `${rel} existe`);
  checkContains(rel, content, "FAIL: 0", `${rel} est validé sans FAIL`);
}

const okCount = checks.filter((check) => check.level === "OK").length;
const failCount = checks.filter((check) => check.level === "FAIL").length;

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
  "# Q2-E-D — Audit final RightPanel opérationnel data-driven",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  "",
  "## Scope",
  "",
  "- ERPOperationalRightPanel",
  "- rightPanel.metrics",
  "- Modules opérationnels rendezvous / interventionsauto / facturesauto",
  "- Absence de Firestore direct",
  "- Absence de RuntimeDataBinding.list direct",
  "",
  "## Checks",
  "",
  ...checks.map((check) => `- [${check.level}] ${check.file} — ${check.message}`),
  "",
  "## Décision",
  "",
  failCount === 0
    ? "Q2-E RightPanel opérationnel data-driven est validé."
    : "Corriger les FAIL avant clôture Q2-E.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-E-D-final-right-panel-data-driven-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-E-D-final-right-panel-data-driven-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — Q2-E ne doit pas être clôturé.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK — Q2-E RightPanel data-driven validé.");
