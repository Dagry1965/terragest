const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/components/erp/operational/ERPOperationalTable.tsx",
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
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
  if (!pattern) return 0;
  return content.split(pattern).length - 1;
}

function extractBlocks(content, pattern, context = 10) {
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

const tableRel = "src/components/erp/operational/ERPOperationalTable.tsx";
const expandedRel = "src/components/erp/operational/ERPOperationalExpandedChildren.tsx";
const pageRel = "src/components/erp/operational/ERPOperationalModulePage.tsx";
const moduleRel = "src/runtime/modules/ERPModule.ts";

const table = contents[tableRel];
const expanded = contents[expandedRel];
const page = contents[pageRel];
const moduleTypes = contents[moduleRel];

console.log("");
console.log("[Q2-D-C-A-OPERATIONAL-RELATION-LABELS-CHILD-TOTALS-AUDIT]");
console.log("");

checkContains(
  tableRel,
  table,
  "RuntimeDataBinding.list",
  "ERPOperationalTable utilise RuntimeDataBinding.list"
);

checkContains(
  tableRel,
  table,
  "relationLabels",
  "ERPOperationalTable gère relationLabels"
);

checkContains(
  tableRel,
  table,
  "childTotals",
  "ERPOperationalTable gère childTotals"
);

checkContains(
  tableRel,
  table,
  "relationLabelFields",
  "ERPOperationalTable lit relationLabelFields"
);

checkContains(
  tableRel,
  table,
  "totalField",
  "ERPOperationalTable lit totalField"
);

checkContains(
  tableRel,
  table,
  "foreignKey",
  "ERPOperationalTable lit foreignKey"
);

checkContains(
  expandedRel,
  expanded,
  "RuntimeDataBinding.list",
  "ERPOperationalExpandedChildren utilise RuntimeDataBinding.list"
);

checkContains(
  expandedRel,
  expanded,
  "parentModule.composition?.children",
  "ERPOperationalExpandedChildren lit composition.children"
);

checkContains(
  moduleRel,
  moduleTypes,
  "ERPOperationalChildTotalConfig",
  "Type ERPOperationalChildTotalConfig présent"
);

checkContains(
  moduleRel,
  moduleTypes,
  "relationLabelFields",
  "Type relationLabelFields présent"
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
    "operational:",
    `${rel} déclare operational`
  );

  checkContains(
    rel,
    content,
    "relationLabelFields:",
    `${rel} déclare relationLabelFields`
  );
}

const tableListCount = countMatches(table, "RuntimeDataBinding.list");
const expandedListCount = countMatches(expanded, "RuntimeDataBinding.list");
const relationLabelsCount = countMatches(table, "relationLabels");
const childTotalsCount = countMatches(table, "childTotals");

addFinding(
  "INFO",
  tableRel,
  `RuntimeDataBinding.list dans la table : ${tableListCount}`
);

addFinding(
  "INFO",
  expandedRel,
  `RuntimeDataBinding.list dans l'expand : ${expandedListCount}`
);

addFinding(
  "INFO",
  tableRel,
  `Occurrences relationLabels : ${relationLabelsCount}`
);

addFinding(
  "INFO",
  tableRel,
  `Occurrences childTotals : ${childTotalsCount}`
);

if (tableListCount >= 2) {
  addFinding(
    "WARN",
    tableRel,
    "La table semble charger séparément les relations et les totaux enfants. Un resolver/cache central est recommandé."
  );
}

if (expandedListCount >= 1) {
  addFinding(
    "WARN",
    expandedRel,
    "L'expand charge les enfants via RuntimeDataBinding.list. À garder lazy, mais prévoir cache/batch pour gros volumes."
  );
}

if (table.includes("Promise.all")) {
  addFinding(
    "OK",
    tableRel,
    "Des chargements parallèles Promise.all existent déjà."
  );
} else {
  addFinding(
    "WARN",
    tableRel,
    "Aucun Promise.all détecté dans ERPOperationalTable ; vérifier si les chargements sont séquentiels."
  );
}

if (table.includes("setRelationLabels")) {
  addFinding(
    "INFO",
    tableRel,
    "relationLabels est stocké localement dans le composant."
  );
}

if (table.includes("setChildTotals")) {
  addFinding(
    "INFO",
    tableRel,
    "childTotals est stocké localement dans le composant."
  );
}

if (table.includes("useEffect")) {
  addFinding(
    "INFO",
    tableRel,
    "ERPOperationalTable utilise useEffect pour charger des données auxiliaires."
  );
}

if (!fs.existsSync(abs("src/runtime/operational"))) {
  addFinding(
    "RECOMMEND",
    "src/runtime/operational",
    "Créer une couche runtime dédiée : RuntimeOperationalDataResolver."
  );
}

console.log("[LOAD BLOCKS - ERPOperationalTable RuntimeDataBinding.list]");
for (const block of extractBlocks(table, "RuntimeDataBinding.list", 12)) {
  console.log("");
  console.log(block);
}

console.log("");
console.log("[LOAD BLOCKS - ERPOperationalExpandedChildren RuntimeDataBinding.list]");
for (const block of extractBlocks(expanded, "RuntimeDataBinding.list", 12)) {
  console.log("");
  console.log(block);
}

const okCount = checks.filter((item) => item.level === "OK").length;
const failCount = checks.filter((item) => item.level === "FAIL").length;
const warnCount = findings.filter((item) => item.level === "WARN").length;
const recommendCount = findings.filter((item) => item.level === "RECOMMEND").length;

console.log("");
console.log("[CHECKS]");
for (const item of checks) {
  console.log(`[${item.level}] ${item.file}`);
  console.log("     " + item.message);
}

console.log("");
console.log("[FINDINGS]");
for (const item of findings) {
  console.log(`[${item.level}] ${item.file}`);
  console.log("     " + item.message);
}

console.log("");
console.log("[SUMMARY]");
console.log("OK:", okCount);
console.log("FAIL:", failCount);
console.log("WARN:", warnCount);
console.log("RECOMMEND:", recommendCount);

const reportDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(reportDir, { recursive: true });

const report = [
  "# Q2-D-C-A — Audit relationLabels / childTotals loading",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  `WARN: ${warnCount}`,
  `RECOMMEND: ${recommendCount}`,
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
  failCount === 0
    ? "Préparer RuntimeOperationalDataResolver sans modifier encore le comportement UI."
    : "Corriger les FAIL avant de créer un resolver.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-D-C-A-operational-relation-labels-child-totals-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-D-C-A-operational-relation-labels-child-totals-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — corriger avant resolver/cache.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK/WARN — resolver/cache préparatoire recommandé.");
