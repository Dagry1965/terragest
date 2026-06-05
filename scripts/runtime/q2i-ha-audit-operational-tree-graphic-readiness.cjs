const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  treeView: "src/components/erp/operational/ERPOperationalTreeView.tsx",
  recordTree: "src/components/erp/operational/ERPOperationalRecordTree.tsx",
  expandedChildren: "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  resolver: "src/runtime/operational/RuntimeOperationalTreeResolver.ts",
  tokens: "src/components/erp/operational/operationalUiTokens.ts",
};

const checks = [];
const ok = [];
const warn = [];
const fail = [];
const recommendations = [];

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

function recommend(label, details = "") {
  recommendations.push({ label, details });
}

const treeView = read(files.treeView);
const recordTree = read(files.recordTree);
const expandedChildren = read(files.expandedChildren);
const resolver = read(files.resolver);
const tokens = read(files.tokens);

for (const [key, rel] of Object.entries(files)) {
  add(exists(rel) ? "OK" : "FAIL", "File exists: " + key, rel);
}

add(
  /RuntimeOperationalTreeNode/.test(treeView)
    ? "OK"
    : "FAIL",
  "Tree view consumes RuntimeOperationalTreeNode",
  "The graphic renderer must remain based on runtime tree nodes."
);

add(
  /function ERPOperationalTreeNode/.test(treeView)
    ? "OK"
    : "FAIL",
  "Tree view has a node renderer",
  "The graphical refactor can be localized in the node renderer."
);

add(
  /node\.children\.map/.test(treeView) || /children\.map/.test(treeView)
    ? "OK"
    : "FAIL",
  "Tree view renders children recursively",
  "Required for hierarchical visual rendering."
);

add(
  /useState/.test(treeView) && /expanded/.test(treeView)
    ? "OK"
    : "WARN",
  "Tree view supports expand/collapse",
  "The refactor should preserve local expand/collapse."
);

add(
  /node\.depth/.test(treeView)
    ? "OK"
    : "WARN",
  "Tree view uses node depth",
  "Depth can drive indentation and branch spacing."
);

add(
  /paddingLeft/.test(treeView)
    ? "WARN"
    : "OK",
  "Current indentation is padding-based",
  "Refactor should move toward explicit branch/line rendering."
);

add(
  /rounded-2xl border border-slate-200 bg-white p-3/.test(treeView)
    ? "WARN"
    : "OK",
  "Current node display is card-like",
  "User requested a more graphical tree, less expandable-list/card stack."
);

add(
  /getRoleClassName/.test(treeView)
    ? "OK"
    : "WARN",
  "Tree view has role-based styling",
  "Role styling can be preserved while changing layout."
);

add(
  /getSourceSummary/.test(treeView)
    ? "OK"
    : "WARN",
  "Tree view displays source summary",
  "Source metadata must remain visible in the new graphic representation."
);

add(
  /sourceScope|sourceType|sourceModule|sourceRecordId|sourceLabel/.test(treeView)
    ? "OK"
    : "WARN",
  "Tree view exposes source fields",
  "Required for invoice/source documentary display."
);

add(
  /appendRuntimeReturnContext/.test(treeView)
    ? "OK"
    : "FAIL",
  "Tree view preserves return context",
  "Graphic refactor must not break open/return navigation."
);

add(
  /openLabel/.test(treeView)
    ? "OK"
    : "WARN",
  "Tree view supports openLabel",
  "Open action must stay available but visually less intrusive."
);

add(
  /RuntimeOperationalTreeResolver/.test(recordTree) && /resolveTree/.test(recordTree)
    ? "OK"
    : "FAIL",
  "Record tree delegates to resolver",
  "Graphic refactor must not touch data resolution."
);

add(
  /operational\.tree/.test(expandedChildren)
    ? "OK"
    : "WARN",
  "Tree display policy is consumed",
  "Graphic rendering should remain controlled by operational.tree."
);

add(
  /sourceScope/.test(resolver) &&
    /sourceType/.test(resolver) &&
    /sourceModule/.test(resolver) &&
    /sourceRecordId/.test(resolver) &&
    /sourceLabel/.test(resolver)
    ? "OK"
    : "FAIL",
  "Resolver provides source metadata",
  "Needed for invoice atelier source display."
);

add(
  /firebase\/firestore|getFirestore|collection\(|doc\(|query\(/.test(treeView + recordTree + expandedChildren)
    ? "FAIL"
    : "OK",
  "No direct Firestore access in tree UI stack",
  "Graphic refactor must stay presentation-only."
);

add(
  /RuntimeDataBinding\.list/.test(treeView + recordTree + expandedChildren)
    ? "FAIL"
    : "OK",
  "No RuntimeDataBinding.list in tree UI stack",
  "Graphic refactor must not add loading logic."
);

add(
  /AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(treeView + recordTree + expandedChildren)
    ? "FAIL"
    : "OK",
  "No hardcoded AMARKHYS context",
  "Graphic refactor must remain generic."
);

add(
  /tree|branch|connector|timeline/i.test(tokens)
    ? "OK"
    : "WARN",
  "Operational tokens may include tree/branch styling",
  "If absent, refactor can use local stable classes first, then tokenize later."
);

recommend(
  "Replace card-stack feel with explicit tree branches",
  "Use a vertical connector line and horizontal branch segment per child node."
);

recommend(
  "Keep node content compact",
  "Show role badge, module label, main label, subtitle and source summary without large cards."
);

recommend(
  "Preserve local expand/collapse",
  "A tree node with children should keep a small expand button at the branch point."
);

recommend(
  "Keep Open action secondary",
  "Open should remain available but not dominate the graphical hierarchy."
);

recommend(
  "Do not alter resolver or data loading",
  "Q2-I-H-B should modify only graphical rendering in ERPOperationalTreeView."
);

const reportRel = "docs/audits/Q2-I-H-A-operational-tree-graphic-readiness.md";
const report = filePath(reportRel);

const lines = [];
lines.push("# Q2-I-H-A — Operational tree graphic readiness audit");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Goal: prepare a generic graphical refactor of `ERPOperationalTreeView`.");
lines.push("- No code modification in this pass.");
lines.push("- Target: render a readable hierarchical business tree, not a stack of expandable cards.");
lines.push("");
lines.push("## Target visual direction");
lines.push("");
lines.push("```text");
lines.push("Client");
lines.push("├── Vehicules");
lines.push("│   └── Rendez-vous");
lines.push("│       └── Interventions");
lines.push("│           ├── Lignes intervention");
lines.push("│           └── Sources de lignes facture atelier");
lines.push("└── Factures liees atelier");
lines.push("    └── Source metier");
lines.push("        ├── sourceScope = atelier");
lines.push("        ├── sourceType = intervention");
lines.push("        ├── sourceModule = interventionsauto");
lines.push("        ├── sourceRecordId = interventionId");
lines.push("        ├── sourceLabel = Intervention / vehicule / client");
lines.push("        ├── Lignes facture");
lines.push("        ├── Encaissements");
lines.push("        ├── Echeances");
lines.push("        │   └── Relances echeance");
lines.push("        └── Relances facture");
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
lines.push("## Recommendations");
lines.push("");
lines.push("| Recommendation | Details |");
lines.push("|---|---|");

for (const item of recommendations) {
  lines.push(
    "| " +
      item.label.replace(/\|/g, "\\|") +
      " | " +
      item.details.replace(/\|/g, "\\|") +
      " |"
  );
}

lines.push("");
lines.push("## Decision");
lines.push("");

if (fail.length === 0) {
  lines.push("Q2-I-H-A is validated. The graphical refactor can be localized in `ERPOperationalTreeView` while preserving resolver, metadata policy, return context and generic runtime doctrine.");
  lines.push("");
  lines.push("Next step: Q2-I-H-B refactor `ERPOperationalTreeView` into a compact branch-based visual tree.");
} else {
  lines.push("Q2-I-H-A is blocked. Fix FAIL checks before graphical refactor.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\n"), "utf8");

console.log("[Q2-I-H-A] Operational tree graphic readiness audit");
console.log("[OK]", ok.length);
console.log("[WARN]", warn.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}
