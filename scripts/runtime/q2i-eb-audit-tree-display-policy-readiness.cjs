const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  erpModule: "src/runtime/modules/ERPModule.ts",
  expandedChildren: "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  recordTree: "src/components/erp/operational/ERPOperationalRecordTree.tsx",
  treeView: "src/components/erp/operational/ERPOperationalTreeView.tsx",
};

const checks = [];
const ok = [];
const warn = [];
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

function add(status, label, details = "") {
  const item = { status, label, details };
  checks.push(item);
  if (status === "OK") ok.push(item);
  if (status === "WARN") warn.push(item);
  if (status === "FAIL") fail.push(item);
}

const erpModule = read(files.erpModule);
const expanded = read(files.expandedChildren);
const recordTree = read(files.recordTree);
const treeView = read(files.treeView);

for (const [key, rel] of Object.entries(files)) {
  add(exists(rel) ? "OK" : "FAIL", "File exists: " + key, rel);
}

add(
  /export interface ERPOperationalModuleConfig/.test(erpModule)
    ? "OK"
    : "FAIL",
  "ERPOperationalModuleConfig exists",
  "Tree display policy should be added to the existing operational config."
);

add(
  /rightPanel\?: ERPOperationalRightPanelConfig/.test(erpModule)
    ? "OK"
    : "FAIL",
  "Operational config already hosts rightPanel policy",
  "This confirms tree config belongs beside table/rightPanel."
);

add(
  /tree\?:/.test(erpModule)
    ? "WARN"
    : "OK",
  "No existing operational tree config",
  "Q2-I-E-B-B can introduce it without replacing another config."
);

add(
  /<ERPOperationalRecordTree\b/.test(expanded)
    ? "OK"
    : "FAIL",
  "Record tree currently mounted",
  "The display policy will control this generic mount."
);

add(
  /title="Arbre operationnel"/.test(expanded)
    ? "WARN"
    : "OK",
  "Tree title is fixed in expanded children",
  "This should become operational.tree.title with fallback."
);

add(
  /emptyLabel="Aucun arbre operationnel disponible\."/.test(expanded)
    ? "WARN"
    : "OK",
  "Tree empty label is fixed in expanded children",
  "This should become operational.tree.emptyLabel with fallback."
);

add(
  /defaultExpandedDepth=\{2\}/.test(expanded)
    ? "WARN"
    : "OK",
  "Tree default expanded depth is fixed in expanded children",
  "This should become operational.tree.defaultExpandedDepth with fallback."
);

add(
  /parentModule=\{parentModule\}/.test(expanded) &&
    /parentRecord=\{parentRecord\}/.test(expanded)
    ? "OK"
    : "FAIL",
  "Record tree receives generic parent context",
  "Policy can be read from parentModule.operational?.tree."
);

add(
  /title\?: string/.test(recordTree) &&
    /emptyLabel\?: string/.test(recordTree) &&
    /defaultExpandedDepth\?: number/.test(recordTree)
    ? "OK"
    : "FAIL",
  "Record tree already accepts display props",
  "Wiring can pass metadata values without changing resolver behavior."
);

add(
  /defaultExpandedDepth = 2/.test(recordTree)
    ? "WARN"
    : "OK",
  "Record tree has fallback expanded depth",
  "Acceptable fallback, but parent policy should drive preferred value."
);

add(
  /title = "Arbre/.test(treeView) || /title = "Arbre operationnel"/.test(treeView)
    ? "WARN"
    : "OK",
  "Tree view has fallback title",
  "Fallback is acceptable, but mounted policy should drive user-facing label."
);

add(
  /RuntimeOperationalTreeResolver/.test(recordTree) &&
    /resolveTree/.test(recordTree)
    ? "OK"
    : "FAIL",
  "Record tree still delegates to resolver",
  "Display policy must not alter tree loading architecture."
);

add(
  /RuntimeDataBinding\.list/.test(expanded + recordTree + treeView)
    ? "FAIL"
    : "OK",
  "No RuntimeDataBinding.list in UI stack",
  "Policy must stay display-only."
);

add(
  /firebase\/firestore|getFirestore|collection\(|doc\(|query\(/.test(
    expanded + recordTree + treeView
  )
    ? "FAIL"
    : "OK",
  "No direct Firestore access in UI stack",
  "Policy must not add UI data loading."
);

add(
  /AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(expanded + recordTree + treeView)
    ? "FAIL"
    : "OK",
  "No hardcoded AMARKHYS context",
  "Tree policy must remain generic."
);

add(
  /operational:\s*\{/.test(read("src/runtime/modules/generated/facturesauto/facturesauto.module.ts"))
    ? "WARN"
    : "OK",
  "Generated modules do not obviously declare operational config in search result",
  "Not blocking: policy can be typed first, configured later only where needed."
);

const reportRel = "docs/audits/Q2-I-E-B-A-tree-display-policy-readiness.md";
const report = filePath(reportRel);

const lines = [];
lines.push("# Q2-I-E-B-A — Operational tree display policy readiness");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Goal: inspect readiness for a generic operational tree display policy.");
lines.push("- No code modification in this pass.");
lines.push("- Target policy location: `ERPOperationalModuleConfig.tree`.");
lines.push("");
lines.push("## Proposed policy");
lines.push("");
lines.push("```ts");
lines.push("export type ERPOperationalTreePlacement =");
lines.push('  | "beforeChildren"');
lines.push('  | "afterChildren"');
lines.push('  | "hidden";');
lines.push("");
lines.push("export interface ERPOperationalTreeConfig {");
lines.push("  enabled?: boolean;");
lines.push("  title?: string;");
lines.push("  emptyLabel?: string;");
lines.push("  defaultExpandedDepth?: number;");
lines.push("  placement?: ERPOperationalTreePlacement;");
lines.push("}");
lines.push("```");
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
  lines.push("Q2-I-E-B-A is validated. The operational tree display policy can be added generically to `ERPOperationalModuleConfig.tree`.");
  lines.push("");
  lines.push("Recommended next step: Q2-I-E-B-B add the type and consume `parentModule.operational?.tree` in `ERPOperationalExpandedChildren`, while keeping fallbacks.");
} else {
  lines.push("Q2-I-E-B-A is blocked. Fix FAIL checks before adding display policy.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\n"), "utf8");

console.log("[Q2-I-E-B-A] Operational tree display policy readiness");
console.log("[OK]", ok.length);
console.log("[WARN]", warn.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}

