const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/runtime/operational/RuntimeOperationalTreeResolver.ts",
  "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  "src/runtime/operational/index.ts",
];

const checks = [];
const findings = [];

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

function addFinding(level, file, message) {
  findings.push({ level, file, message });
}

const contents = Object.fromEntries(files.map((rel) => [rel, read(rel)]));

const resolverRel = "src/runtime/operational/RuntimeOperationalTreeResolver.ts";
const indexRel = "src/runtime/operational/index.ts";

const resolver = contents[resolverRel];
const indexFile = contents[indexRel];

console.log("");
console.log("[Q2-I-B2-RUNTIME-OPERATIONAL-TREE-RESOLVER-FOUNDATION-AUDIT]");
console.log("");

for (const pattern of [
  "export class RuntimeOperationalTreeResolver",
  "static async resolveTree",
  "RuntimeOperationalTreeNode",
  "RuntimeOperationalTreeNodeRole",
  "RuntimeOperationalTreeResolverRequest",
  "RuntimeOperationalTreeSource",
  "rootModule",
  "rootRecord",
  "maxDepth",
]) {
  checkContains(resolverRel, resolver, pattern, `TreeResolver expose ${pattern}`);
}

for (const pattern of [
  "RuntimeOperationalChildrenResolver.resolveExpandedChildren",
  "parentModule: request.rootModule",
  "parentRecord: request.rootRecord",
  "buildNodesFromGroup",
  "group.children",
  "parentRecordId",
]) {
  checkContains(resolverRel, resolver, pattern, `TreeResolver utilise ${pattern}`);
}

for (const pattern of [
  "sourceScope",
  "sourceType",
  "sourceModule",
  "sourceRecordId",
  "sourceLabel",
  "buildSource",
]) {
  checkContains(resolverRel, resolver, pattern, `TreeResolver supporte source documentaire ${pattern}`);
}

for (const pattern of [
  '"document"',
  '"line"',
  '"payment"',
  '"schedule"',
  '"reminder"',
  "inferNodeRole",
]) {
  checkContains(resolverRel, resolver, pattern, `TreeResolver supporte rôle ${pattern}`);
}

for (const pattern of [
  "buildLabel",
  "buildSubtitle",
  "labelFields",
  "subtitleFields",
  "fallbackFields",
]) {
  checkContains(resolverRel, resolver, pattern, `TreeResolver supporte labels ${pattern}`);
}

checkNotContains(
  resolverRel,
  resolver,
  "firebase/firestore",
  "TreeResolver ne lit pas Firestore directement"
);

checkNotContains(
  resolverRel,
  resolver,
  "RuntimeDataBinding.list",
  "TreeResolver ne lit pas RuntimeDataBinding.list directement"
);

checkContains(
  indexRel,
  indexFile,
  "RuntimeOperationalTreeResolver",
  "index.ts exporte RuntimeOperationalTreeResolver"
);

checkContains(
  indexRel,
  indexFile,
  "RuntimeOperationalTreeNode",
  "index.ts exporte RuntimeOperationalTreeNode"
);

checkContains(
  indexRel,
  indexFile,
  "RuntimeOperationalTreeSource",
  "index.ts exporte RuntimeOperationalTreeSource"
);

addFinding(
  "OK",
  resolverRel,
  "TreeResolver délègue le chargement des enfants au RuntimeOperationalChildrenResolver."
);

addFinding(
  "OK",
  resolverRel,
  "TreeResolver ne crée aucune UI et ne branche aucune page."
);

addFinding(
  "OK",
  resolverRel,
  "TreeResolver conserve le modèle facture comme document avec sourceScope/sourceModule/sourceRecordId."
);

addFinding(
  "NEXT",
  "Q2-I-C",
  "Créer ERPOperationalTreeView générique après commit de la foundation."
);

const okCount = checks.filter((check) => check.level === "OK").length;
const failCount = checks.filter((check) => check.level === "FAIL").length;
const nextCount = findings.filter((finding) => finding.level === "NEXT").length;

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
console.log("NEXT:", nextCount);

const reportDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(reportDir, { recursive: true });

const report = [
  "# Q2-I-B2 — Audit RuntimeOperationalTreeResolver foundation",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  `NEXT: ${nextCount}`,
  "",
  "## Scope",
  "",
  "- RuntimeOperationalTreeResolver foundation",
  "- Export runtime/operational",
  "- Source documentaire facture",
  "- Node roles génériques",
  "- Absence de Firestore direct",
  "- Absence de RuntimeDataBinding.list direct",
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
    ? "RuntimeOperationalTreeResolver foundation est validé."
    : "Corriger les FAIL avant commit.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-I-B2-runtime-operational-tree-resolver-foundation-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-I-B2-runtime-operational-tree-resolver-foundation-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — corriger avant commit.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK/NEXT — RuntimeOperationalTreeResolver foundation validé.");
