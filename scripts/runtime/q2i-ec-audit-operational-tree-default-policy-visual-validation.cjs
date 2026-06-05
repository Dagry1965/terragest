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

const erpModule = read(files.erpModule);
const expanded = read(files.expandedChildren);
const recordTree = read(files.recordTree);
const treeView = read(files.treeView);

for (const [key, rel] of Object.entries(files)) {
  add("File exists: " + key, exists(rel), rel);
}

add(
  "ERPOperationalModuleConfig exposes tree policy",
  /tree\?: ERPOperationalTreeConfig/.test(erpModule),
  "Metadata can configure operational tree display."
);

add(
  "Default placement is beforeChildren",
  /const treePlacement = treeConfig\?\.placement \?\? "beforeChildren";/.test(expanded),
  "Tree is visible before child blocks by default."
);

add(
  "Tree can be hidden by metadata",
  /treePlacement !== "hidden"/.test(expanded) &&
    /treeConfig\?\.enabled !== false/.test(expanded),
  "Modules can hide tree without page-specific code."
);

add(
  "Default depth is 2",
  /treeConfig\?\.defaultExpandedDepth \?\? 2/.test(expanded),
  "Default depth stays coherent with visual validation."
);

add(
  "Before children mount is metadata-driven",
  /treePlacement === "beforeChildren"/.test(expanded) &&
    /title=\{treeTitle\}/.test(expanded) &&
    /emptyLabel=\{treeEmptyLabel\}/.test(expanded) &&
    /defaultExpandedDepth=\{treeDefaultExpandedDepth\}/.test(expanded),
  "No fixed props remain in the default mount."
);

add(
  "After children placement is supported",
  /treePlacement === "afterChildren"/.test(expanded),
  "Future metadata can move tree below child blocks."
);

add(
  "Record tree still delegates to RuntimeOperationalTreeResolver",
  /RuntimeOperationalTreeResolver/.test(recordTree) &&
    /resolveTree/.test(recordTree),
  "Data resolution remains runtime-driven."
);

add(
  "Tree view preserves return context",
  /appendRuntimeReturnContext/.test(treeView) &&
    /returnTo:\s*currentReturnTo/.test(treeView) &&
    /returnLabel:\s*currentReturnLabel/.test(treeView),
  "Tree links preserve contextual return."
);

add(
  "No direct Firestore access in tree UI stack",
  !/firebase\/firestore|getFirestore|collection\(|doc\(|query\(/.test(
    expanded + recordTree + treeView
  ),
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
  "Tree remains generic."
);

addManual("Arbre visible par défaut", "OK", "Validated visually with default operational.tree policy.");
addManual("Placement beforeChildren par défaut", "OK", "Tree appears before existing child blocks.");
addManual("Profondeur par défaut cohérente", "OK", "Default depth did not create blocking visual overload.");
addManual("Enfants existants visibles", "OK", "Existing child blocks remain visible and functional.");
addManual("Retour contextuel depuis l’arbre", "OK", "Open/return flow remains contextual.");
addManual("Pas de crash", "OK", "No runtime crash during visual validation.");
addManual("Pas de page métier modifiée", "OK", "Validation confirms generic runtime wiring.");
addManual("Pas de surcharge visuelle bloquante", "OK", "Default policy is acceptable for now.");

const reportRel = "docs/audits/Q2-I-E-C-operational-tree-default-policy-visual-validation.md";
const report = filePath(reportRel);

const lines = [];
lines.push("# Q2-I-E-C — Operational tree default policy visual validation");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Goal: validate default `operational.tree` behavior after generic display policy.");
lines.push("- No code modification in this pass.");
lines.push("- Validation confirms default visibility, placement, depth, contextual return, and no business-page wiring.");
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
  lines.push("Q2-I-E-C is validated. The operational tree default policy is acceptable visually and remains fully generic.");
  lines.push("");
  lines.push("Next step: keep defaults for now. Configure `operational.tree` only module by module if visual overload appears later.");
} else {
  lines.push("Q2-I-E-C is blocked. Fix failed checks before committing the visual validation.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\n"), "utf8");

console.log("[Q2-I-E-C] Operational tree default policy visual validation");
console.log("[OK]", ok.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}
