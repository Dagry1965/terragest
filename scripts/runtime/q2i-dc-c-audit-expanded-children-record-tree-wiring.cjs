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
  "Expanded children exists",
  exists(files.expandedChildren),
  files.expandedChildren
);

add(
  "Record tree exists",
  exists(files.recordTree),
  files.recordTree
);

add(
  "Tree view exists",
  exists(files.treeView),
  files.treeView
);

add(
  "Expanded children imports ERPOperationalRecordTree",
  /import\s+\{\s*ERPOperationalRecordTree\s*\}\s+from\s+"\.\/ERPOperationalRecordTree";/.test(expanded),
  "The generic wrapper must be imported from the same operational component layer."
);

add(
  "Expanded children mounts ERPOperationalRecordTree",
  /<ERPOperationalRecordTree\b/.test(expanded),
  "The tree must be mounted in the generic expanded children flow."
);

add(
  "Expanded children passes parentModule",
  /parentModule=\{parentModule\}/.test(expanded),
  "The tree resolver wrapper must receive module context."
);

add(
  "Expanded children passes parentRecord",
  /parentRecord=\{parentRecord\}/.test(expanded),
  "The tree resolver wrapper must receive record context."
);

add(
  "Expanded children still uses RuntimeOperationalChildrenResolver",
  /RuntimeOperationalChildrenResolver\.resolveExpandedChildren/.test(expanded),
  "Existing expanded children behavior must remain runtime-driven."
);

add(
  "Expanded children still preserves return navigation context",
  /appendRuntimeReturnContext/.test(expanded) &&
    /buildRuntimeCurrentReturnTo/.test(expanded) &&
    /buildRuntimeReturnLabel/.test(expanded),
  "Existing child/grandchild links must remain protected."
);

add(
  "Record tree still delegates to RuntimeOperationalTreeResolver",
  /RuntimeOperationalTreeResolver/.test(recordTree) &&
    /resolveTree/.test(recordTree),
  "Tree loading must stay in runtime resolver layer."
);

add(
  "Record tree still delegates UI to ERPOperationalTreeView",
  /ERPOperationalTreeView/.test(recordTree),
  "Tree rendering must stay in the tree view component."
);

add(
  "No direct Firestore access in wired files",
  !/firebase\/firestore|getFirestore|collection\(|doc\(|query\(/.test(expanded + recordTree + treeView),
  "Operational UI must not read Firestore directly."
);

add(
  "No RuntimeDataBinding.list in wired files",
  !/RuntimeDataBinding\.list/.test(expanded + recordTree + treeView),
  "UI must not call data binding list directly."
);

add(
  "No hardcoded AMARKHYS context",
  !/AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(expanded + recordTree + treeView),
  "Wiring must stay generic and tenant/workspace agnostic."
);

add(
  "No business page path wiring",
  !/\/rendezvous|\/interventionsauto|\/facturesauto/.test(expanded),
  "The tree must not be wired through business-specific routes."
);

const reportRel = "docs/audits/Q2-I-D-C-C-expanded-children-record-tree-wiring.md";
const report = path.join(ROOT, reportRel);

const lines = [];
lines.push("# Q2-I-D-C-C — Expanded children record tree wiring audit");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Component: `src/components/erp/operational/ERPOperationalExpandedChildren.tsx`");
lines.push("- Mounted component: `ERPOperationalRecordTree`");
lines.push("- Goal: validate generic tree wiring in the operational expansion flow.");
lines.push("- No business page wiring.");
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
  lines.push("Q2-I-D-C-C is validated. `ERPOperationalRecordTree` is now mounted in the generic operational expanded children flow.");
  lines.push("");
  lines.push("Next step: visual/runtime test on one operational page, without adding any page-specific code.");
} else {
  lines.push("Q2-I-D-C-C is blocked. Fix failed checks before commit.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\n"), "utf8");

console.log("[Q2-I-D-C-C] Expanded children record tree wiring audit");
console.log("[OK]", ok.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}
