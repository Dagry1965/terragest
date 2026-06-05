const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  expandedChildren: "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  recordTree: "src/components/erp/operational/ERPOperationalRecordTree.tsx",
  treeView: "src/components/erp/operational/ERPOperationalTreeView.tsx",
  treeResolver: "src/runtime/operational/RuntimeOperationalTreeResolver.ts",
  factures: "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  lignesFacture: "src/runtime/modules/generated/lignesfactureauto/lignesfactureauto.module.ts",
  encaissements: "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts",
  echeances: "src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts",
  rappels: "src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts",
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

const expanded = read(files.expandedChildren);
const recordTree = read(files.recordTree);
const treeView = read(files.treeView);
const resolver = read(files.treeResolver);
const factures = read(files.factures);
const lignesFacture = read(files.lignesFacture);
const encaissements = read(files.encaissements);
const echeances = read(files.echeances);
const rappels = read(files.rappels);

for (const [key, rel] of Object.entries(files)) {
  add(exists(rel) ? "OK" : "FAIL", "File exists: " + key, rel);
}

add(
  /<ERPOperationalRecordTree\b/.test(expanded) ? "OK" : "FAIL",
  "Operational tree is mounted in generic expanded children flow",
  "The tree must not be wired inside business pages."
);

add(
  /ERPOperationalRecordTree/.test(expanded) &&
    /parentModule=\{parentModule\}/.test(expanded) &&
    /parentRecord=\{parentRecord\}/.test(expanded)
    ? "OK"
    : "FAIL",
  "Tree receives generic parent module and record context",
  "This confirms runtime-driven wiring."
);

add(
  /RuntimeOperationalTreeResolver/.test(recordTree) && /resolveTree/.test(recordTree)
    ? "OK"
    : "FAIL",
  "Record tree delegates loading to RuntimeOperationalTreeResolver",
  "The UI wrapper must not rebuild tree traversal."
);

add(
  /ERPOperationalTreeView/.test(recordTree)
    ? "OK"
    : "FAIL",
  "Record tree delegates rendering to ERPOperationalTreeView",
  "Presentation remains separated from resolution."
);

add(
  /appendRuntimeReturnContext/.test(treeView) &&
    /returnTo:\s*currentReturnTo/.test(treeView) &&
    /returnLabel:\s*currentReturnLabel/.test(treeView)
    ? "OK"
    : "FAIL",
  "Tree links preserve return context",
  "The visual test validated contextual return."
);

add(
  /RuntimeOperationalChildrenResolver\.resolveExpandedChildren/.test(expanded)
    ? "OK"
    : "FAIL",
  "Existing expanded children remain runtime-driven",
  "The tree must not replace the existing operational child blocks."
);

add(
  /RuntimeDataBinding\.list/.test(expanded + recordTree + treeView)
    ? "FAIL"
    : "OK",
  "No RuntimeDataBinding.list in tree UI stack",
  "Data loading must remain behind runtime resolvers."
);

add(
  /firebase\/firestore|getFirestore|collection\(|doc\(|query\(/.test(
    expanded + recordTree + treeView
  )
    ? "FAIL"
    : "OK",
  "No direct Firestore access in tree UI stack",
  "UI components must remain runtime consumers."
);

add(
  /AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(
    expanded + recordTree + treeView + resolver
  )
    ? "FAIL"
    : "OK",
  "No hardcoded AMARKHYS context",
  "The operational tree must stay tenant/workspace generic."
);

add(
  /sourceScope/.test(resolver) &&
    /sourceType/.test(resolver) &&
    /sourceModule/.test(resolver) &&
    /sourceRecordId/.test(resolver) &&
    /sourceLabel/.test(resolver)
    ? "OK"
    : "FAIL",
  "Tree resolver supports source/documentary metadata",
  "Required for invoices beyond intervention-only child model."
);

add(
  /sourceScope|sourceType|sourceModule|sourceRecordId|sourceLabel/.test(factures)
    ? "OK"
    : "WARN",
  "facturesauto exposes source/documentary fields",
  "Invoice should be representable as autonomous financial document."
);

add(
  /lignesfactureauto/.test(factures) && /composition/.test(factures)
    ? "OK"
    : "WARN",
  "facturesauto exposes invoice lines as composition children",
  "Invoice economic details should be readable under invoice."
);

add(
  /encaissementsauto/.test(factures) && /composition/.test(factures)
    ? "OK"
    : "WARN",
  "facturesauto exposes payments as composition children",
  "Payments should reduce invoice remaining amount."
);

add(
  /echeancespaiementauto/.test(factures) && /composition/.test(factures)
    ? "OK"
    : "WARN",
  "facturesauto exposes payment schedules as composition children",
  "Schedules should split the invoice remaining amount."
);

add(
  /rappelsauto/.test(factures) && /factureId/.test(rappels)
    ? "OK"
    : "WARN",
  "Invoice reminders are linked to facturesauto",
  "Reminders should be attachable to invoice."
);

add(
  /rappelsauto/.test(echeances) && /echeanceId/.test(rappels)
    ? "OK"
    : "WARN",
  "Schedule reminders are linked to echeancespaiementauto",
  "Reminders should be attachable to payment schedule."
);

add(
  /title="Arbre operationnel"/.test(expanded)
    ? "WARN"
    : "OK",
  "Tree title is currently hardcoded in the mount",
  "Consider metadata/config driven label later if UX needs workspace-specific wording."
);

add(
  /defaultExpandedDepth=\{2\}/.test(expanded)
    ? "WARN"
    : "OK",
  "Tree default expanded depth is fixed in mount",
  "Consider metadata-driven display settings if the tree becomes visually heavy."
);

add(
  /<ERPOperationalRecordTree\b[\s\S]*?<div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">/.test(expanded)
    ? "OK"
    : "WARN",
  "Tree is displayed before existing child blocks",
  "This is acceptable but may be visually heavy; visual validation should decide whether it belongs collapsed/lower."
);

recommend(
  "Keep tree as navigation/documentary structure",
  "Existing expanded children should remain the main operational reading surface."
);

recommend(
  "Do not add page-specific wiring",
  "Future refinements must stay in metadata/runtime/config, not in rendezvous/interventions/factures pages."
);

recommend(
  "Consider metadata-driven tree display options",
  "Possible future fields: operational.tree.enabled, defaultExpandedDepth, placement, title, collapsedByDefault."
);

recommend(
  "Review invoice source semantics",
  "Factura must stay autonomous and source-aware: atelier, boutique, mixed, or other facturable source."
);

const reportRel = "docs/audits/Q2-I-E-A-operational-tree-ux-runtime-audit.md";
const report = filePath(reportRel);

const lines = [];
lines.push("# Q2-I-E-A — Operational tree UX/runtime audit");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Goal: evaluate the operational tree after generic wiring.");
lines.push("- No code modification in this pass.");
lines.push("- Focus: UX weight, generic runtime architecture, invoice/source/document behavior.");
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
      String(item.details || "").replace(/\|/g, "\\|") +
      " |"
  );
}

lines.push("");
lines.push("## Decision");
lines.push("");

if (fail.length === 0) {
  lines.push("Q2-I-E-A is validated with warnings only if any. The operational tree is generically wired and should now be refined through metadata/runtime display policy, not page-specific patches.");
  lines.push("");
  lines.push("Recommended next step: Q2-I-E-B introduce a generic display policy for the operational tree if the current placement or expanded depth is visually too heavy.");
} else {
  lines.push("Q2-I-E-A is blocked. Fix FAIL checks before UX/runtime refinement.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\n"), "utf8");

console.log("[Q2-I-E-A] Operational tree UX/runtime audit");
console.log("[OK]", ok.length);
console.log("[WARN]", warn.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}
