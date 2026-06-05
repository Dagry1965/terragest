const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  erpModule: "src/runtime/modules/ERPModule.ts",
  resolver: "src/runtime/operational/RuntimeOperationalTreeResolver.ts",
  treeView: "src/components/erp/operational/ERPOperationalTreeView.tsx",
  recordTree: "src/components/erp/operational/ERPOperationalRecordTree.tsx",
  expandedChildren: "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  factures: "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
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

const erpModule = read(files.erpModule);
const resolver = read(files.resolver);
const treeView = read(files.treeView);
const recordTree = read(files.recordTree);
const expandedChildren = read(files.expandedChildren);
const factures = read(files.factures);

for (const [key, rel] of Object.entries(files)) {
  add(exists(rel) ? "OK" : "FAIL", "File exists: " + key, rel);
}

add(
  /export interface ERPOperationalTreeConfig/.test(erpModule)
    ? "OK"
    : "FAIL",
  "Operational tree config exists",
  "Root summary policy should extend the existing operational.tree config."
);

add(
  /RuntimeOperationalTreeNode/.test(resolver)
    ? "OK"
    : "FAIL",
  "RuntimeOperationalTreeNode exists in resolver",
  "Node summary should be added to the runtime tree node contract."
);

add(
  /label/.test(resolver) &&
    /subtitle/.test(resolver) &&
    /moduleLabel/.test(resolver) &&
    /nodeRole/.test(resolver),
  "OK",
  "Resolver already maps node display fields",
  "Summary can follow the same mapping pattern."
);

add(
  /sourceScope|sourceType|sourceModule|sourceRecordId|sourceLabel/.test(resolver)
    ? "OK"
    : "FAIL",
  "Resolver already supports source metadata",
  "Source metadata must remain separate from financial summary."
);

add(
  /montantHT/.test(factures) &&
    /tva/.test(factures) &&
    /montantTTC/.test(factures) &&
    /montantPaye/.test(factures) &&
    /resteAPayer/.test(factures)
    ? "OK"
    : "FAIL",
  "facturesauto exposes financial fields",
  "Invoice root summary can use these fields through metadata."
);

add(
  /typeFacture/.test(factures) &&
    /statutFacture/.test(factures) &&
    /statutPaiement/.test(factures)
    ? "OK"
    : "FAIL",
  "facturesauto exposes status/type fields",
  "Invoice root badges can use these fields through metadata."
);

add(
  /summary|metrics|badges|nodeSummary/.test(erpModule + resolver + treeView)
    ? "WARN"
    : "OK",
  "No existing node summary mechanism detected",
  "Q2-I-J-B can introduce one generically."
);

add(
  /function ERPOperationalTreeNode/.test(treeView)
    ? "OK"
    : "FAIL",
  "Tree view has localized node renderer",
  "Summary rendering can be added inside node renderer only."
);

add(
  /border-l border-slate-200 pl-4/.test(treeView) &&
    /absolute top-5 h-px w-6/.test(treeView)
    ? "OK"
    : "FAIL",
  "Graphic tree rendering is active",
  "Summary must preserve the graphical hierarchy."
);

add(
  /appendRuntimeReturnContext/.test(treeView)
    ? "OK"
    : "FAIL",
  "Tree view preserves return context",
  "Summary rendering must not affect open/return navigation."
);

add(
  /RuntimeOperationalTreeResolver/.test(recordTree) &&
    /resolveTree/.test(recordTree)
    ? "OK"
    : "FAIL",
  "Record tree delegates to resolver",
  "No loading logic should be added to the tree view."
);

add(
  /parentModule\.operational\?\.tree/.test(expandedChildren)
    ? "OK"
    : "FAIL",
  "Expanded children consumes operational.tree policy",
  "Root summary should remain metadata/runtime policy-driven."
);

add(
  /firebase\/firestore|getFirestore|collection\(|doc\(|query\(/.test(
    treeView + recordTree + expandedChildren
  )
    ? "FAIL"
    : "OK",
  "No direct Firestore access in tree UI stack",
  "Summary must not add direct data reads."
);

add(
  /RuntimeDataBinding\.list/.test(treeView + recordTree + expandedChildren)
    ? "FAIL"
    : "OK",
  "No RuntimeDataBinding.list in tree UI stack",
  "Summary must use data already present in runtime tree nodes."
);

add(
  /AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(
    treeView + recordTree + expandedChildren + resolver
  )
    ? "FAIL"
    : "OK",
  "No hardcoded AMARKHYS context",
  "Summary mechanism must remain generic."
);

recommend(
  "Add a generic node summary contract",
  "Example: RuntimeOperationalTreeNode.summary with badges and metrics."
);

recommend(
  "Drive summary fields by metadata",
  "Example: operational.tree.summary.fields or operational.tree.nodeSummary."
);

recommend(
  "Keep invoice-specific choices in facturesauto metadata",
  "The renderer must not know about montantHT, montantTTC or statutPaiement directly."
);

recommend(
  "Render summary only when present",
  "Non-financial modules should keep the compact node layout."
);

recommend(
  "Start with root node summary only",
  "Avoid overloading every child node before validating the UX."
);

const reportRel = "docs/audits/Q2-I-J-A-operational-tree-root-summary-readiness.md";
const report = filePath(reportRel);

const lines = [];
lines.push("# Q2-I-J-A — Operational tree root summary readiness audit");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Goal: prepare a generic root/node summary mechanism for the graphical operational tree.");
lines.push("- No code modification in this pass.");
lines.push("- Target use case: invoice root summary for atelier invoice `FAC-ATELIER-Q2I-001`.");
lines.push("- Doctrine: no invoice-specific hardcode in the generic renderer.");
lines.push("");
lines.push("## Target visual direction");
lines.push("");
lines.push("```text");
lines.push("FAC-ATELIER-Q2I-001");
lines.push("[FACTURE ATELIER] [EMISE] [PAIEMENT PARTIEL]");
lines.push("HT 140 000 | TVA 25 200 | TTC 165 200 | Paye 90 000 | Reste 75 200");
lines.push("");
lines.push("├── Source metier");
lines.push("├── Lignes facture");
lines.push("├── Encaissements");
lines.push("├── Echeances");
lines.push("└── Relances");
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
  lines.push("Q2-I-J-A is validated. A generic root/node summary mechanism can be introduced without changing data loading, resolver responsibilities or business pages.");
  lines.push("");
  lines.push("Recommended next step: Q2-I-J-B add metadata-driven summary config and map it into RuntimeOperationalTreeNode.");
} else {
  lines.push("Q2-I-J-A is blocked. Fix FAIL checks before adding root summary.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\n"), "utf8");

console.log("[Q2-I-J-A] Operational tree root summary readiness audit");
console.log("[OK]", ok.length);
console.log("[WARN]", warn.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}
