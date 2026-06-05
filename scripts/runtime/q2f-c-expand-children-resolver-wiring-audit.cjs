const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
  "src/runtime/operational/index.ts",
  "docs/audits/Q2-F-A-expand-children-lazy-loading-audit.md",
  "docs/audits/Q2-F-B2-runtime-operational-children-resolver-foundation-audit.md",
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

const expandedRel = "src/components/erp/operational/ERPOperationalExpandedChildren.tsx";
const resolverRel = "src/runtime/operational/RuntimeOperationalChildrenResolver.ts";
const indexRel = "src/runtime/operational/index.ts";

const expanded = contents[expandedRel];
const resolver = contents[resolverRel];
const indexFile = contents[indexRel];

console.log("");
console.log("[Q2-F-C-EXPAND-CHILDREN-RESOLVER-WIRING-AUDIT]");
console.log("");

checkContains(
  expandedRel,
  expanded,
  "RuntimeOperationalChildrenResolver",
  "ERPOperationalExpandedChildren importe/utilise RuntimeOperationalChildrenResolver"
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
  "ERPOperationalExpandedChildren transmet module alias"
);

checkContains(
  expandedRel,
  expanded,
  "record: parentRecord",
  "ERPOperationalExpandedChildren transmet record alias"
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
  "RuntimeDataBinding.list",
  "ERPOperationalExpandedChildren ne lit plus RuntimeDataBinding.list directement"
);

checkNotContains(
  expandedRel,
  expanded,
  "firebase/firestore",
  "ERPOperationalExpandedChildren ne lit pas Firestore directement"
);

checkContains(
  resolverRel,
  resolver,
  "export class RuntimeOperationalChildrenResolver",
  "RuntimeOperationalChildrenResolver est présent"
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
  "RuntimeDataBinding.list",
  "Resolver centralise RuntimeDataBinding.list"
);

checkContains(
  resolverRel,
  resolver,
  "moduleKey: string",
  "Resolver expose moduleKey"
);

checkContains(
  resolverRel,
  resolver,
  "children: RuntimeOperationalExpandedGroup[]",
  "Resolver expose children compatible UI"
);

checkContains(
  resolverRel,
  resolver,
  "parentRecordId?: string",
  "Resolver expose parentRecordId"
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

checkContains(
  resolverRel,
  resolver,
  "maxDepth",
  "Resolver supporte maxDepth"
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
  "docs/audits/Q2-F-A-expand-children-lazy-loading-audit.md",
  contents["docs/audits/Q2-F-A-expand-children-lazy-loading-audit.md"],
  "FAIL: 0",
  "Audit Q2-F-A validé sans FAIL"
);

checkContains(
  "docs/audits/Q2-F-B2-runtime-operational-children-resolver-foundation-audit.md",
  contents["docs/audits/Q2-F-B2-runtime-operational-children-resolver-foundation-audit.md"],
  "FAIL: 0",
  "Audit Q2-F-B2 validé sans FAIL"
);

if (expanded.includes("RuntimeDataBinding.list")) {
  addFinding(
    "FAIL",
    expandedRel,
    "RuntimeDataBinding.list reste dans ERPOperationalExpandedChildren"
  );
}

if (resolver.includes("RuntimeDataBinding.list")) {
  addFinding(
    "OK",
    resolverRel,
    "RuntimeDataBinding.list est centralisé dans le resolver"
  );
}

const okCount = checks.filter((check) => check.level === "OK").length;
const failCount = checks.filter((check) => check.level === "FAIL").length;
const failFindings = findings.filter((finding) => finding.level === "FAIL").length;

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

const reportDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(reportDir, { recursive: true });

const report = [
  "# Q2-F-C — Audit branchement Expand children vers RuntimeOperationalChildrenResolver",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  `FAIL_FINDINGS: ${failFindings}`,
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
    ? "ERPOperationalExpandedChildren est branché proprement sur RuntimeOperationalChildrenResolver."
    : "Corriger les FAIL avant clôture Q2-F-C.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-F-C-expand-children-resolver-wiring-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-F-C-expand-children-resolver-wiring-audit.md");

if (failCount > 0 || failFindings > 0) {
  console.log("");
  console.log("[RESULT] FAIL — corriger avant commit.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK — branchement Expand children resolver validé.");
