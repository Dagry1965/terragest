const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
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

const treeView = read(files.treeView);
const recordTree = read(files.recordTree);
const expandedChildren = read(files.expandedChildren);

for (const [key, rel] of Object.entries(files)) {
  add("File exists: " + key, exists(rel), rel);
}

add(
  "Tree view keeps RuntimeOperationalTreeNode contract",
  /RuntimeOperationalTreeNode/.test(treeView),
  "Graphic refactor must keep runtime node typing."
);

add(
  "Tree view keeps recursive renderer",
  /function ERPOperationalTreeNode/.test(treeView) &&
    /node\.children\.map/.test(treeView),
  "Tree must remain recursive."
);

add(
  "Tree view keeps local expand collapse",
  /useState/.test(treeView) &&
    /expanded/.test(treeView) &&
    /setExpanded/.test(treeView),
  "Expand/collapse must remain local UI state."
);

add(
  "Tree view has vertical branch connector",
  /border-l border-slate-200 pl-4/.test(treeView) ||
    /w-px bg-slate-200/.test(treeView),
  "Graphical tree must show vertical branch structure."
);

add(
  "Tree view has horizontal branch connector",
  /absolute top-5 h-px w-6/.test(treeView),
  "Graphical tree must show child connector lines."
);

add(
  "Tree view is more compact than previous card stack",
  /px-3 py-2\.5/.test(treeView) &&
    /h-6 w-6/.test(treeView),
  "Node card and expand button should be compact."
);

add(
  "Tree view keeps role label",
  /getRoleLabel/.test(treeView) &&
    /getRoleClassName/.test(treeView),
  "Role-based semantic display must be preserved."
);

add(
  "Tree view keeps source summary",
  /getSourceSummary/.test(treeView) &&
    /sourceSummary/.test(treeView),
  "Source metadata remains visible."
);

add(
  "Tree view keeps open links",
  /openHref/.test(treeView) &&
    /node\.openLabel/.test(treeView),
  "Open action must remain available."
);

add(
  "Tree view preserves return context",
  /appendRuntimeReturnContext/.test(treeView) &&
    /returnTo:\s*currentReturnTo/.test(treeView) &&
    /returnLabel:\s*currentReturnLabel/.test(treeView),
  "Open action must preserve contextual return."
);

add(
  "Record tree still delegates to RuntimeOperationalTreeResolver",
  /RuntimeOperationalTreeResolver/.test(recordTree) &&
    /resolveTree/.test(recordTree),
  "Graphic refactor must not change loading."
);

add(
  "Expanded children still consumes operational.tree policy",
  /parentModule\.operational\?\.tree/.test(expandedChildren),
  "Display policy remains metadata-driven."
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
  "Graphic renderer must remain generic."
);

const reportRel = "docs/audits/Q2-I-H-C-operational-tree-graphic-view-audit.md";
const report = filePath(reportRel);

const lines = [];
lines.push("# Q2-I-H-C — Operational tree graphic view audit");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Component: `src/components/erp/operational/ERPOperationalTreeView.tsx`");
lines.push("- Goal: validate compact graphical tree rendering with branch connectors.");
lines.push("- No resolver, data loading, metadata, or business page changes.");
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
  lines.push("Q2-I-H-C is validated. `ERPOperationalTreeView` now renders a compact graphical hierarchy while preserving runtime resolver delegation, metadata display policy and contextual return.");
  lines.push("");
  lines.push("Next step: visual validation on operational pages, especially `/facturesauto` and `/rendezvous`.");
} else {
  lines.push("Q2-I-H-C is blocked. Fix failed checks before visual validation.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\n"), "utf8");

console.log("[Q2-I-H-C] Operational tree graphic view audit");
console.log("[OK]", ok.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}
