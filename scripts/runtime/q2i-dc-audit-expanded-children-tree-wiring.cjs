const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  expandedChildren: "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  recordTree: "src/components/erp/operational/ERPOperationalRecordTree.tsx",
  treeView: "src/components/erp/operational/ERPOperationalTreeView.tsx",
};

const checks = [];
const ok = [];
const fail = [];

function read(rel) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}

function exists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}

function add(label, condition, details = "") {
  const item = { label, condition, details };
  checks.push(item);
  if (condition) ok.push(item);
  else fail.push(item);
}

const expanded = read(files.expandedChildren);
const recordTree = read(files.recordTree);
const treeView = read(files.treeView);

add(
  "Expanded children component exists",
  exists(files.expandedChildren),
  files.expandedChildren
);

add(
  "Record tree wrapper exists",
  exists(files.recordTree),
  files.recordTree
);

add(
  "Tree view exists",
  exists(files.treeView),
  files.treeView
);

add(
  "Expanded children receives parentModule",
  /parentModule/.test(expanded),
  "Required for generic runtime tree resolution."
);

add(
  "Expanded children receives parentRecord",
  /parentRecord/.test(expanded),
  "Required for generic runtime tree resolution."
);

add(
  "Expanded children already works in parent record context",
  /type ERPOperationalExpandedChildrenProps/.test(expanded) &&
    /parentModule: ERPModule/.test(expanded) &&
    /parentRecord: Record<string, unknown>/.test(expanded),
  "The component has the exact context needed by ERPOperationalRecordTree."
);

add(
  "Expanded children already preserves return context",
  /buildRuntimeCurrentReturnTo/.test(expanded) &&
    /buildRuntimeReturnLabel/.test(expanded) &&
    /appendRuntimeReturnContext/.test(expanded),
  "Tree links must stay aligned with existing navigation context."
);

add(
  "Expanded children delegates loading to runtime children resolver",
  /RuntimeOperationalChildrenResolver\.resolveExpandedChildren/.test(expanded),
  "The existing component is already runtime-driven."
);

add(
  "Record tree delegates to runtime tree resolver",
  /RuntimeOperationalTreeResolver/.test(recordTree) &&
    /resolveTree/.test(recordTree),
  "No tree traversal should be implemented inside expanded children."
);

add(
  "Record tree renders tree view",
  /ERPOperationalTreeView/.test(recordTree),
  "Expanded children should only mount the wrapper."
);

add(
  "Expanded children currently does not mount record tree",
  !/ERPOperationalRecordTree/.test(expanded),
  "Q2-I-D-C-B should add the mount once."
);

add(
  "No direct Firestore access in record tree",
  !/firebase\/firestore|getFirestore|collection\(|doc\(|query\(/.test(recordTree),
  "UI wrapper must not access Firestore directly."
);

add(
  "No RuntimeDataBinding.list in record tree",
  !/RuntimeDataBinding\.list/.test(recordTree),
  "Data access must remain runtime resolver responsibility."
);

add(
  "No AMARKHYS hardcode in tree components",
  !/AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(expanded + recordTree + treeView),
  "Operational tree wiring must remain generic."
);

const reportRel = "docs/audits/Q2-I-D-C-A-expanded-children-tree-wiring-readiness.md";
const report = path.join(ROOT, reportRel);

const lines = [];
lines.push("# Q2-I-D-C-A — Expanded children tree wiring readiness");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Goal: inspect whether `ERPOperationalRecordTree` can be mounted in the generic expanded children flow.");
lines.push("- No business page wiring.");
lines.push("- No UI modification in this audit pass.");
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
  lines.push("Q2-I-D-C-A is validated. `ERPOperationalExpandedChildren` is the correct generic wiring point for mounting `ERPOperationalRecordTree`.");
  lines.push("");
  lines.push("Next step: Q2-I-D-C-B can mount `ERPOperationalRecordTree` inside `ERPOperationalExpandedChildren`, without modifying business pages.");
} else {
  lines.push("Q2-I-D-C-A is blocked. Fix failed checks before wiring.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\n"), "utf8");

console.log("[Q2-I-D-C-A] Expanded children tree wiring readiness");
console.log("[OK]", ok.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}
