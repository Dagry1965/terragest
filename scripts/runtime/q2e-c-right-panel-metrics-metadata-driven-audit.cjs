const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/runtime/modules/ERPModule.ts",
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
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

console.log("");
console.log("[Q2-E-C-RIGHT-PANEL-METRICS-METADATA-DRIVEN-AUDIT]");
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
  "ERPOperationalRightPanelConfig supporte metrics"
);

for (const type of ['"count"', '"countWhere"', '"sum"', '"average"']) {
  checkContains(
    "src/runtime/modules/ERPModule.ts",
    erpModule,
    type,
    `Type métrique supporté ${type}`
  );
}

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
  "RightPanel résout les valeurs métriques"
);

checkContains(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rightPanel,
  "formatMetricValue",
  "RightPanel formate les valeurs métriques"
);

checkContains(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rightPanel,
  "countWhere",
  "RightPanel supporte countWhere"
);

checkContains(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rightPanel,
  "sum",
  "RightPanel supporte sum"
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

for (const rel of [
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
]) {
  const content = contents[rel];

  checkContains(rel, content, "rightPanel:", `${rel} déclare rightPanel`);
  checkContains(rel, content, "metrics:", `${rel} déclare rightPanel.metrics`);
  checkContains(rel, content, 'type: "count"', `${rel} utilise count`);
}

checkContains(
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  contents["src/runtime/modules/generated/rendezvous/rendezvous.module.ts"],
  'type: "countWhere"',
  "rendezvous utilise countWhere"
);

checkContains(
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  contents["src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts"],
  'field: "coutTotal"',
  "interventionsauto métrique coût total déclarée"
);

checkContains(
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  contents["src/runtime/modules/generated/facturesauto/facturesauto.module.ts"],
  'field: "resteAPayer"',
  "facturesauto métrique reste à payer déclarée"
);

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
  "# Q2-E-C — Audit rightPanel.metrics metadata-driven",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  "",
  "## Checks",
  "",
  ...checks.map((check) => `- [${check.level}] ${check.file} — ${check.message}`),
  "",
  "## Décision",
  "",
  failCount === 0
    ? "RightPanel metrics est metadata-driven et validé."
    : "Corriger les FAIL avant commit.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-E-C-right-panel-metrics-metadata-driven-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-E-C-right-panel-metrics-metadata-driven-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — corriger avant commit.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK — rightPanel.metrics metadata-driven validé.");
