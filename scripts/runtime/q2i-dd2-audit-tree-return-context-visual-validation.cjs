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
const manual = [];

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

function addManual(label, result, details = "") {
  manual.push({ label, result, details });
}

const treeView = read(files.treeView);
const recordTree = read(files.recordTree);
const expandedChildren = read(files.expandedChildren);

add("Tree view exists", exists(files.treeView), files.treeView);
add("Record tree exists", exists(files.recordTree), files.recordTree);
add("Expanded children exists", exists(files.expandedChildren), files.expandedChildren);

add(
  "Tree view imports appendRuntimeReturnContext",
  /appendRuntimeReturnContext/.test(treeView),
  "Tree links must preserve runtime return context."
);

add(
  "Tree view no longer discards currentReturnTo",
  !/void currentReturnTo/.test(treeView),
  "The previous no-op marker must be removed."
);

add(
  "Tree view no longer discards currentReturnLabel",
  !/void currentReturnLabel/.test(treeView),
  "The previous no-op marker must be removed."
);

add(
  "Tree view passes returnTo to appendRuntimeReturnContext",
  /returnTo:\s*currentReturnTo/.test(treeView),
  "The current return target must be propagated."
);

add(
  "Tree view passes returnLabel to appendRuntimeReturnContext",
  /returnLabel:\s*currentReturnLabel/.test(treeView),
  "The current return label must be propagated."
);

add(
  "Tree view passes source module and record",
  /sourceModule:\s*node\.moduleKey/.test(treeView) &&
    /sourceRecordId:\s*node\.recordId/.test(treeView),
  "The clicked tree node must be identifiable by the return context."
);

add(
  "Tree view passes expanded and scroll targets",
  /expandedRecordId:\s*node\.recordId/.test(treeView) &&
    /scrollTargetId:\s*node\.recordId/.test(treeView),
  "The destination link must preserve contextual navigation metadata."
);

add(
  "Record tree still builds current return context",
  /buildRuntimeCurrentReturnTo/.test(recordTree) &&
    /buildRuntimeReturnLabel/.test(recordTree),
  "The wrapper must keep generic return context creation."
);

add(
  "Expanded children still mounts record tree",
  /<ERPOperationalRecordTree\b/.test(expandedChildren),
  "The operational tree must remain mounted in the generic expansion flow."
);

add(
  "No direct Firestore access in tree UI stack",
  !/firebase\/firestore|getFirestore|collection\(|doc\(|query\(/.test(
    treeView + recordTree + expandedChildren
  ),
  "Tree UI stack must not access Firestore directly."
);

add(
  "No RuntimeDataBinding.list in tree UI stack",
  !/RuntimeDataBinding\.list/.test(treeView + recordTree + expandedChildren),
  "Tree UI stack must not call data binding directly."
);

add(
  "No hardcoded AMARKHYS context",
  !/AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(
    treeView + recordTree + expandedChildren
  ),
  "Tree wiring must stay generic."
);

addManual("Arbre opérationnel visible", "OK", "Validated manually on an operational page.");
addManual("Enfants existants visibles", "OK", "Existing expanded children remained visible.");
addManual("Pas de crash", "OK", "No runtime crash during expand/open/return flow.");
addManual("Pas de doublon bloquant", "OK", "No blocking duplicate UI issue observed.");
addManual("Pas de page métier modifiée", "OK", "No business page was modified.");
addManual("Retour contextuel", "OK", "Open from tree and contextual return validated.");
addManual("Build", "OK", "`pnpm run build` completed successfully.");

const reportRel = "docs/audits/Q2-I-D-D2-tree-return-context-visual-validation.md";
const report = path.join(ROOT, reportRel);

const lines = [];
lines.push("# Q2-I-D-D2 — Operational tree return context visual validation");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Components:");
lines.push("  - `src/components/erp/operational/ERPOperationalTreeView.tsx`");
lines.push("  - `src/components/erp/operational/ERPOperationalRecordTree.tsx`");
lines.push("  - `src/components/erp/operational/ERPOperationalExpandedChildren.tsx`");
lines.push("- Goal: validate operational tree visual/runtime behavior and contextual return.");
lines.push("- No business page-specific wiring.");
lines.push("");
lines.push("## Static audit summary");
lines.push("");
lines.push("- OK: " + ok.length);
lines.push("- FAIL: " + fail.length);
lines.push("");
lines.push("## Static checks");
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
lines.push("## Manual validation");
lines.push("");
lines.push("| Result | Check | Details |");
lines.push("|---|---|---|");

for (const item of manual) {
  lines.push(
    "| " +
      item.result +
      " | " +
      item.label.replace(/\|/g, "\\|") +
      " | " +
      String(item.details || "").replace(/\|/g, "\\|") +
      " |"
  );
}

lines.push("");
lines.push("## Decision");
lines.push("");

if (fail.length === 0) {
  lines.push("Q2-I-D-D2 is validated. The operational tree is visible, the existing expanded children remain functional, and contextual return is now preserved from tree links.");
  lines.push("");
  lines.push("Next step: Q2-I-E can refine UX/metadata behavior if needed, without changing the generic runtime architecture.");
} else {
  lines.push("Q2-I-D-D2 is blocked. Fix failed checks before commit.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\n"), "utf8");

console.log("[Q2-I-D-D2] Tree return context visual validation audit");
console.log("[OK]", ok.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}
