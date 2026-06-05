const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
  "src/runtime/operational/index.ts",
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
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

const resolverRel = "src/runtime/operational/RuntimeOperationalChildrenResolver.ts";
const indexRel = "src/runtime/operational/index.ts";
const expandedRel = "src/components/erp/operational/ERPOperationalExpandedChildren.tsx";

const resolver = contents[resolverRel];
const indexFile = contents[indexRel];
const expanded = contents[expandedRel];

console.log("");
console.log("[Q2-F-B2-RUNTIME-OPERATIONAL-CHILDREN-RESOLVER-FOUNDATION-AUDIT]");
console.log("");

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
  "resolveExpandedChildren est présent"
);

checkContains(
  resolverRel,
  resolver,
  "RuntimeOperationalExpandedGroup",
  "RuntimeOperationalExpandedGroup est présent"
);

checkContains(
  resolverRel,
  resolver,
  "RuntimeOperationalChildrenResolverRequest",
  "RuntimeOperationalChildrenResolverRequest est présent"
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
    `Resolver expose la propriété ${pattern}`
  );
}

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
  "Resolver supporte parentModule/module"
);

checkContains(
  resolverRel,
  resolver,
  "request.parentRecord ?? request.record",
  "Resolver supporte parentRecord/record"
);

checkNotContains(
  resolverRel,
  resolver,
  "firebase/firestore",
  "Resolver ne lit pas Firestore directement"
);

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

checkContains(
  expandedRel,
  expanded,
  "RuntimeOperationalChildrenResolver.resolveExpandedChildren",
  "ERPOperationalExpandedChildren appelle le resolver"
);

checkContains(
  expandedRel,
  expanded,
  "module: parentModule",
  "ERPOperationalExpandedChildren utilise l’alias module"
);

checkContains(
  expandedRel,
  expanded,
  "record: parentRecord",
  "ERPOperationalExpandedChildren utilise l’alias record"
);

checkContains(
  expandedRel,
  expanded,
  "maxDepth: 2",
  "ERPOperationalExpandedChildren limite la profondeur à 2"
);

checkNotContains(
  expandedRel,
  expanded,
  "firebase/firestore",
  "ERPOperationalExpandedChildren ne lit pas Firestore directement"
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
  "# Q2-F-B2 — Audit RuntimeOperationalChildrenResolver foundation",
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
    ? "RuntimeOperationalChildrenResolver foundation est validé."
    : "Corriger les FAIL avant commit.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-F-B2-runtime-operational-children-resolver-foundation-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-F-B2-runtime-operational-children-resolver-foundation-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — corriger avant commit.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK — RuntimeOperationalChildrenResolver foundation validé.");
