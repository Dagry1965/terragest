const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  erpModule: "src/runtime/modules/ERPModule.ts",
  resolver: "src/runtime/operational/RuntimeOperationalTreeResolver.ts",
  treeView: "src/components/erp/operational/ERPOperationalTreeView.tsx",
  factures: "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
};

const checks = [];
const ok = [];
const fail = [];

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

const erpModule = read(files.erpModule);
const resolver = read(files.resolver);
const treeView = read(files.treeView);
const factures = read(files.factures);

for (const [key, rel] of Object.entries(files)) {
  add("File exists: " + key, exists(rel), rel);
}

add(
  "ERPModule exposes operational tree summary config",
  /ERPOperationalTreeSummaryConfig/.test(erpModule) &&
    /summary\?: ERPOperationalTreeSummaryConfig/.test(erpModule),
  "Metadata type must allow operational.tree.summary."
);

add(
  "Resolver exposes runtime summary contract",
  /RuntimeOperationalTreeSummary/.test(resolver) &&
    /summary\?: RuntimeOperationalTreeSummary/.test(resolver),
  "Runtime tree node must expose summary."
);

add(
  "Resolver builds summary from module metadata",
  /buildRuntimeOperationalTreeSummary/.test(resolver) &&
    /params\.module\.operational\?\.tree\?\.summary/.test(resolver),
  "Summary must be metadata-driven."
);

add(
  "Resolver maps summary into buildNode",
  /summary:\s*buildRuntimeOperationalTreeSummary/.test(resolver),
  "Every node can receive a summary when configured."
);

add(
  "Resolver applies rootOnly policy",
  /rootOnly !== false/.test(resolver) &&
    /params\.depth > 0/.test(resolver),
  "Summary can be limited to root node."
);

add(
  "TreeView renders summary generically",
  /node\.summary\?\.badges/.test(treeView) &&
    /node\.summary\?\.metrics/.test(treeView),
  "Renderer consumes generic node.summary only."
);

add(
  "TreeView has no invoice field hardcode",
  !/montantHT|montantTTC|statutPaiement|FAC-ATELIER|facturesauto/.test(treeView),
  "Invoice-specific fields must stay in metadata."
);

add(
  "facturesauto configures operational tree summary",
  /tree:\s*\{/.test(factures) &&
    /summary:\s*\{/.test(factures) &&
    /rootOnly:\s*true/.test(factures),
  "Invoice summary must be configured in module metadata."
);

add(
  "facturesauto configures invoice badges",
  /field:\s*"typeFacture"/.test(factures) &&
    /field:\s*"statutFacture"/.test(factures) &&
    /field:\s*"statutPaiement"/.test(factures) &&
    /FACTURE ATELIER/.test(factures) &&
    /ÉMISE/.test(factures) &&
    /PAIEMENT PARTIEL/.test(factures),
  "Badges should reflect type/status/payment status."
);

add(
  "facturesauto configures financial metrics",
  /field:\s*"montantHT"/.test(factures) &&
    /field:\s*"tva"/.test(factures) &&
    /field:\s*"montantTTC"/.test(factures) &&
    /field:\s*"montantPaye"/.test(factures) &&
    /field:\s*"resteAPayer"/.test(factures),
  "Metrics should expose HT/TVA/TTC/paid/remaining."
);

add(
  "facturesauto metrics use currency format",
  /format:\s*"currency"/.test(factures),
  "Financial metrics should render as currency-like numbers."
);

add(
  "No direct Firestore access in tree UI stack",
  !/firebase\/firestore|getFirestore|collection\(|doc\(|query\(/.test(treeView),
  "TreeView remains presentation-only."
);

add(
  "No hardcoded AMARKHYS context in generic runtime files",
  !/AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(treeView + resolver),
  "Generic runtime must remain tenant/domain agnostic."
);

const reportRel = "docs/audits/Q2-I-J-C-C-invoice-summary-metadata-mapping.md";
const report = filePath(reportRel);

const lines = [];
lines.push("# Q2-I-J-C-C — Invoice summary metadata mapping audit");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Goal: validate metadata-driven invoice summary in the operational tree.");
lines.push("- Renderer must stay generic.");
lines.push("- Invoice fields must live in `facturesauto` metadata.");
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
  lines.push("Q2-I-J-C-C is validated. Invoice root summary is now metadata-driven and mapped into RuntimeOperationalTreeNode.summary without hardcoding invoice fields in the generic renderer.");
  lines.push("");
  lines.push("Next step: visual validation on FAC-ATELIER-Q2I-001.");
} else {
  lines.push("Q2-I-J-C-C is blocked. Fix failed checks before visual validation.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\n"), "utf8");

console.log("[Q2-I-J-C-C] Invoice summary metadata mapping audit");
console.log("[OK]", ok.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}
