const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  modulePage: "src/components/erp/operational/ERPOperationalModulePage.tsx",
  table: "src/components/erp/operational/ERPOperationalTable.tsx",
  expandedChildren: "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  treeView: "src/components/erp/operational/ERPOperationalTreeView.tsx",
  resolver: "src/runtime/operational/RuntimeOperationalTreeResolver.ts",
  operationalIndex: "src/runtime/operational/index.ts",
  componentIndex: "src/components/erp/operational/index.ts",
};

const checks = [];
const ok = [];
const warn = [];
const fail = [];

function read(rel) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}

function exists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}

function add(status, label, details = "") {
  const item = { status, label, details };
  checks.push(item);
  if (status === "OK") ok.push(item);
  if (status === "WARN") warn.push(item);
  if (status === "FAIL") fail.push(item);
}

const modulePage = read(files.modulePage);
const table = read(files.table);
const expandedChildren = read(files.expandedChildren);
const treeView = read(files.treeView);
const resolver = read(files.resolver);
const operationalIndex = read(files.operationalIndex);
const componentIndex = read(files.componentIndex);

add(exists(files.modulePage) ? "OK" : "FAIL", "Operational module page exists", files.modulePage);
add(exists(files.table) ? "OK" : "FAIL", "Operational table exists", files.table);
add(exists(files.expandedChildren) ? "OK" : "FAIL", "Expanded children component exists", files.expandedChildren);
add(exists(files.treeView) ? "OK" : "FAIL", "Operational tree view exists", files.treeView);
add(exists(files.resolver) ? "OK" : "FAIL", "RuntimeOperationalTreeResolver exists", files.resolver);

add(
  /ERPOperationalExpandedChildren/.test(table) || /ERPOperationalExpandedChildren/.test(modulePage),
  "OK",
  "Expanded children is already wired in the operational UI flow",
  "This confirms the existing generic expansion location."
);

add(
  /parentModule/.test(expandedChildren) && /parentRecord/.test(expandedChildren),
  "OK",
  "Expanded children receives parent module and parent record",
  "This is the correct runtime context for tree resolution."
);

add(
  /RuntimeOperationalChildrenResolver\.resolveExpandedChildren/.test(expandedChildren),
  "OK",
  "Expanded children currently delegates child loading to runtime resolver",
  "No Firestore loading should be duplicated in the UI."
);

add(
  /RuntimeOperationalTreeResolver/.test(resolver),
  "OK",
  "Tree resolver is available as runtime layer",
  "Q2-I-D can reuse it instead of rebuilding traversal in UI."
);

add(
  /RuntimeOperationalTreeResolver/.test(operationalIndex),
  "OK",
  "Tree resolver is exported from runtime operational index",
  "Component wiring can import from runtime operational barrel."
);

add(
  /RuntimeOperationalTreeNode/.test(treeView),
  "OK",
  "Tree view consumes RuntimeOperationalTreeNode",
  "UI contract is already aligned with resolver output."
);

add(
  /firebase\/firestore|getFirestore|collection\(|doc\(|query\(/.test(treeView) ? "FAIL" : "OK",
  "Tree view has no direct Firestore access",
  "UI must stay presentation-only."
);

add(
  /RuntimeDataBinding\.list/.test(treeView) ? "FAIL" : "OK",
  "Tree view does not call RuntimeDataBinding.list",
  "Data loading must remain resolver/service side."
);

add(
  /AMARKHYS|ORG_AMARKHYS_001/.test(treeView + expandedChildren + modulePage) ? "FAIL" : "OK",
  "No hardcoded AMARKHYS context in operational UI files",
  "Operational UI must stay generic."
);

add(
  /ERPOperationalTreeView/.test(componentIndex) ? "OK" : "WARN",
  "Tree view exported from operational component index",
  "If missing, Q2-I-D-B should export it before wiring."
);

add(
  /appendRuntimeReturnContext/.test(expandedChildren),
  "OK",
  "Expanded children already preserves runtime return context",
  "Tree links should reuse the same navigation strategy."
);

add(
  /currentReturnTo|currentReturnLabel/.test(treeView),
  "OK",
  "Tree view has return context props",
  "Q2-I-D-B can wire return context without changing page-specific code."
);

const reportRel = "docs/audits/Q2-I-D-A-operational-tree-wiring-readiness.md";
const report = path.join(ROOT, reportRel);

const lines = [];
lines.push("# Q2-I-D-A — Operational tree wiring readiness audit");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Goal: inspect where to wire `ERPOperationalTreeView` without page-specific patches.");
lines.push("- No UI modification in this pass.");
lines.push("- Expected doctrine: runtime / metadata-driven / no hardcoded AMARKHYS.");
lines.push("");
lines.push("## Summary");
lines.push("");
lines.push("- OK: " + ok.length);
lines.push("- WARN: " + warn.length);
lines.push("- FAIL: " + fail.length);
lines.push("");
lines.push("## Checks");
lines.push("");
lines.push("| Status | Check | Details |");
lines.push("|---|---|---|");

for (const check of checks) {
  lines.push(
    "| " +
      check.status +
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
  lines.push("Q2-I-D-A is ready. The preferred wiring layer is the generic operational expansion flow, not a business page and not the metrics right panel.");
  lines.push("");
  lines.push("Recommended next pass: Q2-I-D-B wire `RuntimeOperationalTreeResolver` into a generic operational component, likely near `ERPOperationalExpandedChildren`, then render `ERPOperationalTreeView` from the resolved tree.");
} else {
  lines.push("Q2-I-D-A is blocked. Fix FAIL checks before wiring.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\n"), "utf8");

console.log("[Q2-I-D-A] Operational tree wiring readiness audit");
console.log("[OK]", ok.length);
console.log("[WARN]", warn.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}
