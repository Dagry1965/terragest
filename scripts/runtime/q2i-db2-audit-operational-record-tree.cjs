const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  recordTree: "src/components/erp/operational/ERPOperationalRecordTree.tsx",
  treeView: "src/components/erp/operational/ERPOperationalTreeView.tsx",
  componentIndex: "src/components/erp/operational/index.ts",
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

const recordTree = read(files.recordTree);
const treeView = read(files.treeView);
const componentIndex = read(files.componentIndex);

add("ERPOperationalRecordTree exists", exists(files.recordTree), files.recordTree);

add(
  "Receives parentModule",
  /parentModule/.test(recordTree),
  "The component must receive the runtime module context."
);

add(
  "Receives parentRecord",
  /parentRecord/.test(recordTree),
  "The component must receive the runtime record context."
);

add(
  "Uses RuntimeOperationalTreeResolver",
  /RuntimeOperationalTreeResolver/.test(recordTree) && /resolveTree/.test(recordTree),
  "The component must reuse the runtime tree resolver."
);

add(
  "Stores RuntimeOperationalTreeNode state",
  /RuntimeOperationalTreeNode/.test(recordTree) &&
    /useState<RuntimeOperationalTreeNode \| null>/.test(recordTree),
  "The component must keep resolver output typed."
);

add(
  "Delegates rendering to ERPOperationalTreeView",
  /ERPOperationalTreeView/.test(recordTree),
  "Tree rendering must stay in the existing tree view component."
);

add(
  "Uses runtime return context builder",
  /buildRuntimeCurrentReturnTo/.test(recordTree) &&
    /buildRuntimeReturnLabel/.test(recordTree),
  "Navigation return context must remain generic."
);

add(
  "No direct Firestore access",
  !/firebase\/firestore|getFirestore|collection\(|doc\(|query\(/.test(recordTree),
  "UI component must not access Firestore directly."
);

add(
  "No RuntimeDataBinding.list in UI component",
  !/RuntimeDataBinding\.list/.test(recordTree),
  "Data loading must remain runtime resolver responsibility."
);

add(
  "No AMARKHYS hardcode",
  !/AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(recordTree),
  "Component must remain generic."
);

add("Tree view exported", /ERPOperationalTreeView/.test(componentIndex), files.componentIndex);

add("Record tree exported", /ERPOperationalRecordTree/.test(componentIndex), files.componentIndex);

add(
  "Tree view still present",
  exists(files.treeView) && /RuntimeOperationalTreeNode/.test(treeView),
  files.treeView
);

const reportRel = "docs/audits/Q2-I-D-B2-operational-record-tree-audit.md";
const report = path.join(ROOT, reportRel);

const lines = [];
lines.push("# Q2-I-D-B2 — ERPOperationalRecordTree audit");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Component: `src/components/erp/operational/ERPOperationalRecordTree.tsx`");
lines.push("- Goal: validate generic runtime-driven tree resolver wrapper.");
lines.push("- No business page wiring in this pass.");
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
  lines.push("Q2-I-D-B2 is validated. `ERPOperationalRecordTree` is ready as the generic wrapper between runtime tree resolution and tree display.");
  lines.push("");
  lines.push("Next step: Q2-I-D-C can wire this component into the existing generic operational expansion flow.");
} else {
  lines.push("Q2-I-D-B2 is blocked. Fix failed checks before wiring.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\n"), "utf8");

console.log("[Q2-I-D-B2] ERPOperationalRecordTree audit");
console.log("[OK]", ok.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}
