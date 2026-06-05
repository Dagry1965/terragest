const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  resolver: "src/runtime/operational/RuntimeOperationalTreeResolver.ts",
  treeView: "src/components/erp/operational/ERPOperationalTreeView.tsx",
  recordTree: "src/components/erp/operational/ERPOperationalRecordTree.tsx",
  expandedChildren: "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
};

const checks = [];
const ok = [];
const fail = [];

function filePath(rel) {
  return path.join(ROOT, rel);
}

function exists(rel) {
  return fs.existsSync(filePath(rel));
}

function read(rel) {
  if (!exists(rel)) return "";
  return fs.readFileSync(filePath(rel), "utf8");
}

function add(label, condition, details = "") {
  const item = { label, condition, details };
  checks.push(item);
  if (condition) ok.push(item);
  else fail.push(item);
}

const resolver = read(files.resolver);
const treeView = read(files.treeView);
const recordTree = read(files.recordTree);
const expandedChildren = read(files.expandedChildren);

for (const [key, rel] of Object.entries(files)) {
  add("File exists: " + key, exists(rel), rel);
}

add(
  "Runtime summary tone type exists",
  /export type RuntimeOperationalTreeSummaryTone/.test(resolver) &&
    /"success"/.test(resolver) &&
    /"warning"/.test(resolver) &&
    /"danger"/.test(resolver) &&
    /"info"/.test(resolver),
  "Summary badges can use generic semantic tones."
);

add(
  "Runtime summary metric format exists",
  /export type RuntimeOperationalTreeMetricFormat/.test(resolver) &&
    /"currency"/.test(resolver) &&
    /"number"/.test(resolver) &&
    /"percent"/.test(resolver),
  "Summary metrics can be formatted generically."
);

add(
  "Runtime summary badge contract exists",
  /export interface RuntimeOperationalTreeSummaryBadge/.test(resolver) &&
    /label: string/.test(resolver) &&
    /tone\?: RuntimeOperationalTreeSummaryTone/.test(resolver),
  "Badges are generic and not invoice-specific."
);

add(
  "Runtime summary metric contract exists",
  /export interface RuntimeOperationalTreeSummaryMetric/.test(resolver) &&
    /label: string/.test(resolver) &&
    /value: unknown/.test(resolver) &&
    /format\?: RuntimeOperationalTreeMetricFormat/.test(resolver),
  "Metrics are generic and not invoice-specific."
);

add(
  "Runtime tree node exposes optional summary",
  /summary\?: RuntimeOperationalTreeSummary;/.test(resolver),
  "Any tree node can optionally expose a summary."
);

add(
  "Tree view renders summary badges",
  /node\.summary\?\.badges/.test(treeView) &&
    /getSummaryToneClassName/.test(treeView),
  "Badges are rendered only when present."
);

add(
  "Tree view renders summary metrics",
  /node\.summary\?\.metrics/.test(treeView) &&
    /formatSummaryMetricValue/.test(treeView),
  "Metrics are rendered only when present."
);

add(
  "Tree view summary is generic",
  !/montantHT|montantTTC|statutPaiement|FAC-ATELIER|facturesauto/.test(treeView),
  "Generic renderer must not know invoice fields."
);

add(
  "Tree graphic rendering preserved",
  /border-l border-slate-200 pl-4/.test(treeView) &&
    /absolute top-5 h-px w-6/.test(treeView),
  "Summary must not remove graphical hierarchy."
);

add(
  "Tree return context preserved",
  /appendRuntimeReturnContext/.test(treeView) &&
    /returnTo:\s*currentReturnTo/.test(treeView),
  "Open links must preserve contextual return."
);

add(
  "Record tree still delegates to resolver",
  /RuntimeOperationalTreeResolver/.test(recordTree) &&
    /resolveTree/.test(recordTree),
  "No UI loading regression."
);

add(
  "Expanded children still consumes operational tree policy",
  /parentModule\.operational\?\.tree/.test(expandedChildren),
  "Display remains metadata-policy driven."
);

add(
  "No direct Firestore access in tree UI stack",
  !/firebase\/firestore|getFirestore|collection\(|doc\(|query\(/.test(
    treeView + recordTree + expandedChildren
  ),
  "UI stack must not read Firestore directly."
);

add(
  "No RuntimeDataBinding.list in tree UI stack",
  !/RuntimeDataBinding\.list/.test(treeView + recordTree + expandedChildren),
  "UI stack must not call RuntimeDataBinding.list."
);

add(
  "No hardcoded AMARKHYS context",
  !/AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(
    treeView + recordTree + expandedChildren
  ),
  "Summary rendering remains generic."
);

const reportRel = "docs/audits/Q2-I-J-B3-operational-tree-node-summary-contract.md";
const report = filePath(reportRel);

const lines = [];
lines.push("# Q2-I-J-B3 — Operational tree node summary contract audit");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Goal: validate the generic `RuntimeOperationalTreeNode.summary` contract.");
lines.push("- No invoice-specific configuration in this pass.");
lines.push("- Renderer must stay generic and data-loading free.");
lines.push("");
lines.push("## Summary");
lines.push("");
lines.push("- OK: " + ok.length);
lines.push("- FAIL: " + fail.length);
lines.push("");
lines.push("## Checks");
lines.push("");
lines.push("| Status | Check | Details |");
lines.push("|---|---|---|");

for (const check of checks) {
  lines.push(
    "| " +
      (check.condition ? "OK" : "FAIL") +
      " | " +
      check.label.replace(/\|/g, "\\|") +
      " | " +
      String(check.details || "").replace(/\|/g, "\\|") +
      " |"
  );
}

lines.push("");
lines.push("## Decision");
lines.push("");

if (fail.length === 0) {
  lines.push("Q2-I-J-B3 is validated. The operational tree now supports a generic optional node summary with badges and metrics, without invoice-specific hardcode.");
  lines.push("");
  lines.push("Next step: Q2-I-J-C can configure `facturesauto` metadata and map summary values from records.");
} else {
  lines.push("Q2-I-J-B3 is blocked. Fix failed checks before commit.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\n"), "utf8");

console.log("[Q2-I-J-B3] Operational tree node summary contract audit");
console.log("[OK]", ok.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}
