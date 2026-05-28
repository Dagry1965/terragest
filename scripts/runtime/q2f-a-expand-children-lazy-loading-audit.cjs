const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  "src/runtime/operational/index.ts",
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

function countMatches(content, pattern) {
  return content.split(pattern).length - 1;
}

function extractContext(content, pattern, context = 10) {
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

const expandedRel = "src/components/erp/operational/ERPOperationalExpandedChildren.tsx";
const resolverRel = "src/runtime/operational/RuntimeOperationalDataResolver.ts";
const indexRel = "src/runtime/operational/index.ts";
const moduleRel = "src/runtime/modules/ERPModule.ts";

const expanded = contents[expandedRel];
const resolver = contents[resolverRel];
const indexFile = contents[indexRel];
const erpModule = contents[moduleRel];

console.log("");
console.log("[Q2-F-A-EXPAND-CHILDREN-LAZY-LOADING-AUDIT]");
console.log("");

checkContains(
  expandedRel,
  expanded,
  "ERPOperationalExpandedChildren",
  "Composant ERPOperationalExpandedChildren présent"
);

checkContains(
  expandedRel,
  expanded,
  "parentModule.composition?.children",
  "Expand lit composition.children"
);

checkContains(
  expandedRel,
  expanded,
  "RuntimeDataBinding.list",
  "Expand charge encore via RuntimeDataBinding.list"
);

checkContains(
  expandedRel,
  expanded,
  "grandchildrenByParentId",
  "Expand gère déjà les petits-enfants"
);

checkContains(
  expandedRel,
  expanded,
  'child.openLabel ?? "Ouvrir"',
  "Expand utilise openLabel metadata-driven"
);

checkContains(
  expandedRel,
  expanded,
  "isVisibleRuntimeRecord",
  "Expand filtre les records retirés"
);

checkContains(
  expandedRel,
  expanded,
  "foreignKey",
  "Expand filtre les enfants par foreignKey"
);

checkContains(
  moduleRel,
  erpModule,
  "ERPCompositionChild",
  "ERPModule contient ERPCompositionChild"
);

checkContains(
  moduleRel,
  erpModule,
  "children?: ERPCompositionChild[]",
  "ERPModule supporte composition.children"
);

checkContains(
  resolverRel,
  resolver,
  "RuntimeOperationalDataResolver",
  "RuntimeOperationalDataResolver existe déjà"
);

checkContains(
  indexRel,
  indexFile,
  "RuntimeOperationalDataResolver",
  "runtime/operational index existe déjà"
);

checkNotContains(
  expandedRel,
  expanded,
  "firebase/firestore",
  "Expand ne lit pas Firestore directement"
);

for (const rel of [
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
]) {
  const content = contents[rel];

  checkContains(rel, content, "children:", `${rel} déclare composition.children`);
  checkContains(rel, content, "foreignKey:", `${rel} déclare foreignKey dans children`);
  checkContains(rel, content, "openLabel:", `${rel} déclare openLabel metadata-driven`);
}

const listCount = countMatches(expanded, "RuntimeDataBinding.list");
const childCount = countMatches(expanded, "child.");
const grandchildCount = countMatches(expanded, "grandchild");

addFinding(
  "INFO",
  expandedRel,
  `RuntimeDataBinding.list dans Expand : ${listCount}`
);

addFinding(
  "INFO",
  expandedRel,
  `Occurrences child.* : ${childCount}`
);

addFinding(
  "INFO",
  expandedRel,
  `Occurrences grandchild : ${grandchildCount}`
);

if (listCount > 0) {
  addFinding(
    "WARN",
    expandedRel,
    "Expand contient encore la logique runtime de chargement lazy ; créer RuntimeOperationalChildrenResolver."
  );
}

if (!resolver.includes("resolveChildren")) {
  addFinding(
    "RECOMMEND",
    resolverRel,
    "Ajouter une méthode resolveChildren/resolveExpandedChildren dans le runtime operational."
  );
}

console.log("[EXPAND CONTEXT]");
for (const pattern of [
  "RuntimeDataBinding.list",
  "async function",
  "load",
  "grandchildrenByParentId",
  "composition?.children",
  "foreignKey",
  "openLabel",
]) {
  const blocks = extractContext(expanded, pattern, 10);

  for (const block of blocks.slice(0, 3)) {
    console.log("");
    console.log("---- PATTERN:", pattern, "----");
    console.log(block);
  }
}

const okCount = checks.filter((check) => check.level === "OK").length;
const failCount = checks.filter((check) => check.level === "FAIL").length;
const warnCount = findings.filter((finding) => finding.level === "WARN").length;
const recommendCount = findings.filter((finding) => finding.level === "RECOMMEND").length;

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
console.log("RECOMMEND:", recommendCount);

const reportDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(reportDir, { recursive: true });

const report = [
  "# Q2-F-A — Audit Expand children lazy loading",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  `WARN: ${warnCount}`,
  `RECOMMEND: ${recommendCount}`,
  "",
  "## Checks",
  "",
  ...checks.map((check) => `- [${check.level}] ${check.file} — ${check.message}`),
  "",
  "## Findings",
  "",
  ...findings.map((finding) => `- [${finding.level}] ${finding.file} — ${finding.message}`),
  "",
  "## Décision",
  "",
  failCount === 0
    ? "Créer une fondation RuntimeOperationalChildrenResolver sans brancher l’UI immédiatement."
    : "Corriger les FAIL avant de créer le resolver.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-F-A-expand-children-lazy-loading-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-F-A-expand-children-lazy-loading-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — corriger avant Q2-F-B.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK/WARN — créer RuntimeOperationalChildrenResolver foundation.");
