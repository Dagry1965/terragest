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

const erpModule = read(files.erpModule);
const expanded = read(files.expandedChildren);
const recordTree = read(files.recordTree);
const treeView = read(files.treeView);

for (const [key, rel] of Object.entries(files)) {
  add("File exists: " + key, exists(rel), rel);
}

add(
  "ERPOperationalTreePlacement is typed",
  /export type ERPOperationalTreePlacement/.test(erpModule) &&
    /"beforeChildren"/.test(erpModule) &&
    /"afterChildren"/.test(erpModule) &&
    /"hidden"/.test(erpModule),
  "Tree placement must be generic and metadata-driven."
);

add(
  "ERPOperationalTreeConfig is typed",
  /export interface ERPOperationalTreeConfig/.test(erpModule) &&
    /enabled\?: boolean/.test(erpModule) &&
    /title\?: string/.test(erpModule) &&
    /emptyLabel\?: string/.test(erpModule) &&
    /defaultExpandedDepth\?: number/.test(erpModule) &&
    /placement\?: ERPOperationalTreePlacement/.test(erpModule),
  "Tree display policy must expose enabled/title/empty/depth/placement."
);

add(
  "ERPOperationalModuleConfig exposes tree policy",
  /tree\?: ERPOperationalTreeConfig/.test(erpModule),
  "Module metadata can now configure operational tree display."
);

add(
  "Expanded children reads parentModule.operational.tree",
  /const treeConfig = parentModule\.operational\?\.tree;/.test(expanded),
  "Display policy must come from module metadata."
);

add(
  "Expanded children supports hidden placement",
  /treePlacement !== "hidden"/.test(expanded),
  "Metadata can hide the tree without page patches."
);

add(
  "Expanded children supports beforeChildren placement",
  /treePlacement === "beforeChildren"/.test(expanded),
  "Metadata can place tree before child blocks."
);

add(
  "Expanded children supports afterChildren placement",
  /treePlacement === "afterChildren"/.test(expanded),
  "Metadata can place tree after child blocks."
);

add(
  "Expanded children supports enabled false",
  /treeConfig\?\.enabled !== false/.test(expanded),
  "Metadata can disable the tree."
);

add(
  "Expanded children uses metadata title",
  /title=\{treeTitle\}/.test(expanded) &&
    /treeConfig\?\.title/.test(expanded),
  "Fixed title must be replaced by policy value."
);

add(
  "Expanded children uses metadata empty label",
  /emptyLabel=\{treeEmptyLabel\}/.test(expanded) &&
    /treeConfig\?\.emptyLabel/.test(expanded),
  "Fixed empty label must be replaced by policy value."
);

add(
  "Expanded children uses metadata expanded depth",
  /defaultExpandedDepth=\{treeDefaultExpandedDepth\}/.test(expanded) &&
    /treeConfig\?\.defaultExpandedDepth/.test(expanded),
  "Fixed depth must be replaced by policy value."
);

add(
  "Fixed tree props removed from mount",
  !/title="Arbre operationnel"|emptyLabel="Aucun arbre operationnel disponible\."|defaultExpandedDepth=\{2\}/.test(expanded),
  "Mount should be metadata-driven."
);

add(
  "Record tree still delegates to RuntimeOperationalTreeResolver",
  /RuntimeOperationalTreeResolver/.test(recordTree) &&
    /resolveTree/.test(recordTree),
  "Display policy must not affect data resolution."
);

add(
  "Tree view still preserves return context",
  /appendRuntimeReturnContext/.test(treeView) &&
    /returnTo:\s*currentReturnTo/.test(treeView),
  "Return context must remain preserved."
);

add(
  "No direct Firestore access in tree UI stack",
  !/firebase\/firestore|getFirestore|collection\(|doc\(|query\(/.test(expanded + recordTree + treeView),
  "UI stack must not read Firestore directly."
);

add(
  "No RuntimeDataBinding.list in tree UI stack",
  !/RuntimeDataBinding\.list/.test(expanded + recordTree + treeView),
  "UI stack must not call RuntimeDataBinding.list."
);

add(
  "No hardcoded AMARKHYS context in tree UI stack",
  !/AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(expanded + recordTree + treeView),
  "Policy must remain generic."
);

const reportRel = "docs/audits/Q2-I-E-B-C-operational-tree-display-policy.md";
const report = path.join(ROOT, reportRel);

const lines = [];
lines.push("# Q2-I-E-B-C — Operational tree display policy audit");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Type: `ERPOperationalTreeConfig`");
lines.push("- Metadata location: `ERPOperationalModuleConfig.tree`");
lines.push("- Consumer: `ERPOperationalExpandedChildren`");
lines.push("- Goal: validate generic display policy for operational tree.");
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
  lines.push("Q2-I-E-B-C is validated. Operational tree display is now controlled by generic module metadata via `operational.tree` with fallbacks.");
  lines.push("");
  lines.push("Next step: optionally configure selected modules through metadata, or run a visual validation with default policy.");
} else {
  lines.push("Q2-I-E-B-C is blocked. Fix failed checks before commit.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\n"), "utf8");

console.log("[Q2-I-E-B-C] Operational tree display policy audit");
console.log("[OK]", ok.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}
