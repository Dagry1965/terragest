const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
  "src/runtime/operational/index.ts",
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  "src/runtime/modules/ERPModule.ts",
  "docs/audits/Q2-F-A-expand-children-lazy-loading-audit.md",
  "docs/audits/Q2-F-B2-runtime-operational-children-resolver-foundation-audit.md",
  "docs/audits/Q2-F-C-expand-children-resolver-wiring-audit.md",
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

const contents = Object.fromEntries(files.map((rel) => [rel, read(rel)]));

const resolverRel = "src/runtime/operational/RuntimeOperationalChildrenResolver.ts";
const indexRel = "src/runtime/operational/index.ts";
const expandedRel = "src/components/erp/operational/ERPOperationalExpandedChildren.tsx";
const moduleRel = "src/runtime/modules/ERPModule.ts";

const resolver = contents[resolverRel];
const indexFile = contents[indexRel];
const expanded = contents[expandedRel];
const erpModule = contents[moduleRel];

console.log("");
console.log("[Q2-F-D-FINAL-OPERATIONAL-CHILDREN-RESOLVER-AUDIT]");
console.log("");

/**
 * Resolver foundation.
 */
checkContains(
  resolverRel,
  resolver,
  "export class RuntimeOperationalChildrenResolver",
  "RuntimeOperationalChildrenResolver est exporté"
);

checkContains(
  resolverRel,
  resolver,
  "static async resolveExpandedChildren",
  "Resolver expose resolveExpandedChildren"
);

checkContains(
  resolverRel,
  resolver,
  "RuntimeOperationalExpandedGroup",
  "Resolver expose RuntimeOperationalExpandedGroup"
);

checkContains(
  resolverRel,
  resolver,
  "RuntimeOperationalChildrenResolverRequest",
  "Resolver expose RuntimeOperationalChildrenResolverRequest"
);

for (const pattern of [
  "moduleKey: string",
  "moduleLabel: string",
  "foreignKey: string",
  "openLabel?: string",
  "parentRecordId?: string",
  "children: RuntimeOperationalExpandedGroup[]",
  "grandchildrenByParentId",
]) {
  checkContains(
    resolverRel,
    resolver,
    pattern,
    `Resolver expose ${pattern}`
  );
}

/**
 * Lazy loading centralization.
 */
checkContains(
  resolverRel,
  resolver,
  "RuntimeDataBinding.list",
  "Resolver centralise RuntimeDataBinding.list"
);

checkContains(
  resolverRel,
  resolver,
  "allERPModules",
  "Resolver résout les modules via allERPModules"
);

checkContains(
  resolverRel,
  resolver,
  "isVisibleRuntimeRecord",
  "Resolver filtre les records visibles"
);

checkContains(
  resolverRel,
  resolver,
  "removedAt",
  "Resolver filtre removedAt"
);

checkContains(
  resolverRel,
  resolver,
  'status !== "retiree"',
  "Resolver filtre le statut retiree"
);

checkContains(
  resolverRel,
  resolver,
  "maxDepth",
  "Resolver supporte maxDepth"
);

checkContains(
  resolverRel,
  resolver,
  "request.parentModule ?? request.module",
  "Resolver accepte parentModule/module"
);

checkContains(
  resolverRel,
  resolver,
  "request.parentRecord ?? request.record",
  "Resolver accepte parentRecord/record"
);

checkNotContains(
  resolverRel,
  resolver,
  "firebase/firestore",
  "Resolver ne lit pas Firestore directement"
);

/**
 * Index exports.
 */
checkContains(
  indexRel,
  indexFile,
  "RuntimeOperationalChildrenResolver",
  "index.ts exporte RuntimeOperationalChildrenResolver"
);

checkContains(
  indexRel,
  indexFile,
  "RuntimeOperationalExpandedGroup",
  "index.ts exporte RuntimeOperationalExpandedGroup"
);

/**
 * UI wiring.
 */
checkContains(
  expandedRel,
  expanded,
  "RuntimeOperationalChildrenResolver",
  "ERPOperationalExpandedChildren utilise RuntimeOperationalChildrenResolver"
);

checkContains(
  expandedRel,
  expanded,
  "RuntimeOperationalChildrenResolver.resolveExpandedChildren",
  "ERPOperationalExpandedChildren appelle resolveExpandedChildren"
);

checkContains(
  expandedRel,
  expanded,
  "module: parentModule",
  "ERPOperationalExpandedChildren transmet module"
);

checkContains(
  expandedRel,
  expanded,
  "record: parentRecord",
  "ERPOperationalExpandedChildren transmet record"
);

checkContains(
  expandedRel,
  expanded,
  "maxDepth: 2",
  "ERPOperationalExpandedChildren limite maxDepth à 2"
);

checkContains(
  expandedRel,
  expanded,
  "grandchildrenByParentId",
  "ERPOperationalExpandedChildren conserve l’affichage petits-enfants"
);

checkContains(
  expandedRel,
  expanded,
  'child.openLabel ?? "Ouvrir"',
  "ERPOperationalExpandedChildren conserve openLabel metadata-driven"
);

checkNotContains(
  expandedRel,
  expanded,
  "RuntimeDataBinding.list",
  "ERPOperationalExpandedChildren ne lit plus RuntimeDataBinding.list directement"
);

checkNotContains(
  expandedRel,
  expanded,
  "firebase/firestore",
  "ERPOperationalExpandedChildren ne lit pas Firestore directement"
);

/**
 * Module contract still supports children.
 */
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
  moduleRel,
  erpModule,
  "openLabel?: string",
  "ERPCompositionChild supporte openLabel"
);

/**
 * Prior audits.
 */
for (const rel of [
  "docs/audits/Q2-F-A-expand-children-lazy-loading-audit.md",
  "docs/audits/Q2-F-B2-runtime-operational-children-resolver-foundation-audit.md",
  "docs/audits/Q2-F-C-expand-children-resolver-wiring-audit.md",
]) {
  const content = contents[rel];

  checkContains(rel, content, "#", `${rel} existe`);
  checkContains(rel, content, "FAIL: 0", `${rel} est validé sans FAIL`);
}

if (expanded.includes("RuntimeDataBinding.list")) {
  addFinding(
    "FAIL",
    expandedRel,
    "RuntimeDataBinding.list reste dans le composant UI"
  );
}

if (resolver.includes("RuntimeDataBinding.list")) {
  addFinding(
    "OK",
    resolverRel,
    "RuntimeDataBinding.list est centralisé dans RuntimeOperationalChildrenResolver"
  );
}

if (indexFile.includes('export * from "./RuntimeOperationalChildrenResolver"')) {
  addFinding(
    "INFO",
    indexRel,
    "index.ts contient export * en plus des exports nommés ; non bloquant."
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
  "# Q2-F-D — Audit final Operational Children Resolver",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  `FAIL_FINDINGS: ${failFindings}`,
  `INFO: ${infoCount}`,
  "",
  "## Scope",
  "",
  "- RuntimeOperationalChildrenResolver",
  "- ERPOperationalExpandedChildren",
  "- Lazy loading children/grandchildren",
  "- RuntimeDataBinding.list centralisé hors UI",
  "- Absence de Firestore direct",
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
    ? "Q2-F Operational Children Resolver est validé et clôturable."
    : "Corriger les FAIL avant clôture Q2-F.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-F-D-final-operational-children-resolver-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-F-D-final-operational-children-resolver-audit.md");

if (failCount > 0 || failFindings > 0) {
  console.log("");
  console.log("[RESULT] FAIL — Q2-F ne doit pas être clôturé.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK/INFO — Q2-F Operational Children Resolver validé.");
