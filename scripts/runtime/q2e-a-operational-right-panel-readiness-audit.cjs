const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  "src/components/erp/operational/ERPOperationalKpiStrip.tsx",
  "src/components/erp/operational/ERPOperationalTable.tsx",
  "src/runtime/modules/ERPModule.ts",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
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

function addFinding(level, file, message) {
  findings.push({
    level,
    file,
    message,
  });
}

function countMatches(content, pattern) {
  return content.split(pattern).length - 1;
}

function extractContext(content, pattern, context = 8) {
  const lines = content.split(/\r?\n/);
  const blocks = [];

  lines.forEach((line, index) => {
    if (!line.includes(pattern)) return;

    const start = Math.max(0, index - context);
    const end = Math.min(lines.length, index + context + 1);

    blocks.push(
      lines
        .slice(start, end)
        .map((value, offset) => String(start + offset + 1).padStart(4, "0") + ": " + value)
        .join("\n")
    );
  });

  return blocks;
}

const contents = Object.fromEntries(files.map((rel) => [rel, read(rel)]));

const pageRel = "src/components/erp/operational/ERPOperationalModulePage.tsx";
const rightPanelRel = "src/components/erp/operational/ERPOperationalRightPanel.tsx";
const moduleRel = "src/runtime/modules/ERPModule.ts";

const page = contents[pageRel];
const rightPanel = contents[rightPanelRel];
const erpModule = contents[moduleRel];

console.log("");
console.log("[Q2-E-A-OPERATIONAL-RIGHT-PANEL-READINESS-AUDIT]");
console.log("");

checkContains(
  moduleRel,
  erpModule,
  "ERPOperationalRightPanelConfig",
  "Contrat ERPOperationalRightPanelConfig présent"
);

checkContains(
  moduleRel,
  erpModule,
  "rightPanel?: ERPOperationalRightPanelConfig",
  "ERPOperationalModuleConfig supporte rightPanel"
);

checkContains(
  rightPanelRel,
  rightPanel,
  "ERPOperationalRightPanel",
  "Composant ERPOperationalRightPanel présent"
);

checkContains(
  pageRel,
  page,
  "ERPOperationalRightPanel",
  "ERPOperationalModulePage branche ERPOperationalRightPanel"
);

checkContains(
  pageRel,
  page,
  "ERPOperationalRightPanel",
  "ERPOperationalModulePage branche le composant RightPanel"
);

for (const rel of [
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
]) {
  const content = contents[rel];

  checkContains(
    rel,
    content,
    "rightPanel:",
    `${rel} déclare operational.rightPanel`
  );

  checkContains(
    rel,
    content,
    "type:",
    `${rel} rightPanel déclare un type`
  );
}

if (rightPanel.includes("data")) {
  addFinding(
    "OK",
    rightPanelRel,
    "RightPanel semble déjà recevoir/utiliser data."
  );
} else {
  addFinding(
    "WARN",
    rightPanelRel,
    "RightPanel ne semble pas utiliser les données runtime ; probablement décoratif."
  );
}

if (rightPanel.includes("RuntimeDataBinding.list")) {
  addFinding(
    "WARN",
    rightPanelRel,
    "RightPanel lit directement RuntimeDataBinding.list ; à éviter si on veut un resolver."
  );
} else {
  addFinding(
    "OK",
    rightPanelRel,
    "RightPanel ne lit pas RuntimeDataBinding.list directement."
  );
}

if (rightPanel.includes("firebase/firestore")) {
  addFinding(
    "FAIL",
    rightPanelRel,
    "RightPanel lit Firestore directement."
  );
} else {
  addFinding(
    "OK",
    rightPanelRel,
    "RightPanel ne lit pas Firestore directement."
  );
}

if (countMatches(rightPanel, "module.") === 0) {
  addFinding(
    "WARN",
    rightPanelRel,
    "RightPanel ne semble pas exploiter module/metadata."
  );
}

if (countMatches(rightPanel, "rightPanel") > 0) {
  addFinding(
    "INFO",
    rightPanelRel,
    "RightPanel contient déjà une référence à rightPanel/config."
  );
}

console.log("[RIGHT PANEL CONTEXT]");
for (const pattern of [
  "type ERPOperationalRightPanel",
  "function ERPOperationalRightPanel",
  "export function ERPOperationalRightPanel",
  "rightPanel",
  "data",
  "summary",
]) {
  const blocks = extractContext(rightPanel, pattern, 8);

  for (const block of blocks.slice(0, 2)) {
    console.log("");
    console.log("---- PATTERN:", pattern, "----");
    console.log(block);
  }
}

console.log("");
console.log("[MODULE PAGE CONTEXT]");
for (const pattern of ["ERPOperationalRightPanel", "rightPanel"]) {
  const blocks = extractContext(page, pattern, 8);

  for (const block of blocks.slice(0, 2)) {
    console.log("");
    console.log("---- PATTERN:", pattern, "----");
    console.log(block);
  }
}

const okCount = checks.filter((item) => item.level === "OK").length;
const failCount = checks.filter((item) => item.level === "FAIL").length;
const warnCount = findings.filter((item) => item.level === "WARN").length;
const failFindingCount = findings.filter((item) => item.level === "FAIL").length;

console.log("");
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
for (const finding of findings) {
  console.log(`[${finding.level}] ${finding.file}`);
  console.log("     " + finding.message);
}

console.log("");
console.log("[SUMMARY]");
console.log("OK:", okCount);
console.log("FAIL:", failCount);
console.log("WARN:", warnCount);
console.log("FAIL_FINDINGS:", failFindingCount);

const reportDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(reportDir, { recursive: true });

const report = [
  "# Q2-E-A — Audit RightPanel opérationnel readiness",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  `WARN: ${warnCount}`,
  `FAIL_FINDINGS: ${failFindingCount}`,
  "",
  "## Checks",
  "",
  ...checks.map((item) => `- [${item.level}] ${item.file} — ${item.message}`),
  "",
  "## Findings",
  "",
  ...findings.map((item) => `- [${item.level}] ${item.file} — ${item.message}`),
  "",
  "## Décision",
  "",
  failCount === 0 && failFindingCount === 0
    ? "RightPanel peut être rendu data-driven via metadata/resolver sans risque identifié."
    : "Corriger les FAIL avant de modifier RightPanel.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-E-A-operational-right-panel-readiness-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-E-A-operational-right-panel-readiness-audit.md");

if (failCount > 0 || failFindingCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — corriger avant Q2-E-B.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK/WARN — RightPanel data-driven préparatoire recommandé.");
