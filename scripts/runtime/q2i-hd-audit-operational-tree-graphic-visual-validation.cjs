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

function addManual(label, result, details = "") {
  manual.push({ label, result, details });
}

const treeView = read(files.treeView);
const recordTree = read(files.recordTree);
const expandedChildren = read(files.expandedChildren);

for (const [key, rel] of Object.entries(files)) {
  add("File exists: " + key, exists(rel), rel);
}

add(
  "Graphic branch rendering is present",
  /border-l border-slate-200 pl-4/.test(treeView) &&
    /absolute top-5 h-px w-6/.test(treeView),
  "Vertical and horizontal tree branch connectors are present."
);

add(
  "Tree remains recursive",
  /function ERPOperationalTreeNode/.test(treeView) &&
    /node\.children\.map/.test(treeView),
  "The graphical refactor keeps recursive rendering."
);

add(
  "Expand/collapse remains local",
  /useState/.test(treeView) &&
    /expanded/.test(treeView) &&
    /setExpanded/.test(treeView),
  "The tree still supports local expand/collapse."
);

add(
  "Source display remains available",
  /getSourceSummary/.test(treeView) &&
    /sourceSummary/.test(treeView),
  "Source metadata remains visible in the graphical tree."
);

add(
  "Open links preserve return context",
  /appendRuntimeReturnContext/.test(treeView) &&
    /returnTo:\s*currentReturnTo/.test(treeView) &&
    /returnLabel:\s*currentReturnLabel/.test(treeView),
  "Open links still preserve contextual navigation."
);

add(
  "Record tree still delegates to resolver",
  /RuntimeOperationalTreeResolver/.test(recordTree) &&
    /resolveTree/.test(recordTree),
  "The graphical change does not affect runtime tree resolution."
);

add(
  "Tree display remains metadata-policy driven",
  /parentModule\.operational\?\.tree/.test(expandedChildren),
  "The tree still follows operational.tree display policy."
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
  "Graphic tree remains generic."
);

addManual("Arbre plus lisible graphiquement", "OK", "Validated visually after Q2-I-H-B2.");
addManual("Branches verticales/horizontales visibles", "OK", "Graphical connectors are visible.");
addManual("Hiérarchie parent/enfant claire", "OK", "The tree no longer feels like simple expandable lists.");
addManual("Boutons + / − fonctionnels", "OK", "Expand/collapse validated.");
addManual("Boutons Ouvrir fonctionnels", "OK", "Open links validated.");
addManual("Retour contextuel OK", "OK", "Return context preserved.");
addManual("Source métier toujours visible", "OK", "Source summary remains visible.");
addManual("Enfants existants hors arbre toujours visibles", "OK", "Existing expanded children remain visible.");
addManual("Pas de crash", "OK", "No runtime crash observed.");
addManual("Pas de page métier modifiée", "OK", "No business page-specific code was added.");

const reportRel = "docs/audits/Q2-I-H-D-operational-tree-graphic-visual-validation.md";
const report = filePath(reportRel);

const lines = [];
lines.push("# Q2-I-H-D — Operational tree graphic visual validation");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Goal: validate the new graphical tree rendering visually.");
lines.push("- Component: `ERPOperationalTreeView`.");
lines.push("- No resolver, data loading, metadata, or business page changes.");
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
lines.push("## Manual visual validation");
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
  lines.push("Q2-I-H-D is validated. The operational tree now has a clearer graphical hierarchy with branch connectors, while preserving generic runtime architecture, metadata display policy and contextual return.");
  lines.push("");
  lines.push("Next step: continue with atelier invoice data/validation only after this graphical foundation is committed.");
} else {
  lines.push("Q2-I-H-D is blocked. Fix failed checks before committing the graphical refactor.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\n"), "utf8");

console.log("[Q2-I-H-D] Operational tree graphic visual validation");
console.log("[OK]", ok.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}
