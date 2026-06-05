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
const resolver = read(files.resolver);
const treeView = read(files.treeView);
const factures = read(files.factures);

for (const [key, rel] of Object.entries(files)) {
  add("File exists: " + key, exists(rel), rel);
}

add(
  "ERPModule exposes generic summary metadata config",
  /ERPOperationalTreeSummaryConfig/.test(erpModule) &&
    /summary\?: ERPOperationalTreeSummaryConfig/.test(erpModule),
  "Metadata can declare tree summary badges and metrics."
);

add(
  "Resolver maps metadata summary into runtime nodes",
  /buildRuntimeOperationalTreeSummary/.test(resolver) &&
    /summary:\s*buildRuntimeOperationalTreeSummary/.test(resolver),
  "RuntimeOperationalTreeNode.summary is built from module metadata and record values."
);

add(
  "TreeView renders summary generically",
  /node\.summary\?\.badges/.test(treeView) &&
    /node\.summary\?\.metrics/.test(treeView),
  "Renderer consumes generic summary only."
);

add(
  "TreeView has no invoice hardcode",
  !/montantHT|montantTTC|statutPaiement|FAC-ATELIER|facturesauto/.test(treeView),
  "Invoice fields stay in metadata, not in the generic component."
);

add(
  "facturesauto declares summary badges",
  /summary:\s*\{/.test(factures) &&
    /field:\s*"typeFacture"/.test(factures) &&
    /field:\s*"statutFacture"/.test(factures) &&
    /field:\s*"statutPaiement"/.test(factures),
  "Invoice badges are metadata-driven."
);

add(
  "facturesauto declares financial metrics",
  /field:\s*"montantHT"/.test(factures) &&
    /field:\s*"tva"/.test(factures) &&
    /field:\s*"montantTTC"/.test(factures) &&
    /field:\s*"montantPaye"/.test(factures) &&
    /field:\s*"resteAPayer"/.test(factures),
  "Invoice financial summary is metadata-driven."
);

add(
  "Summary is root-only",
  /rootOnly:\s*true/.test(factures),
  "Invoice summary should enrich the root invoice node without overloading children."
);

add(
  "No direct Firestore access in TreeView",
  !/firebase\/firestore|getFirestore|collection\(|doc\(|query\(/.test(treeView),
  "Rendering remains presentation-only."
);

add(
  "No hardcoded AMARKHYS context in generic runtime files",
  !/AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(treeView + resolver),
  "Generic runtime remains tenant/domain agnostic."
);

addManual("Badges visibles", "OK", "FACTURE ATELIER / ÉMISE / PAIEMENT PARTIEL visible.");
addManual("Métriques visibles", "OK", "HT / TVA / TTC / Payé / Reste visible.");
addManual("Arbre graphique toujours visible", "OK", "The graphical hierarchy remains visible.");
addManual("Source intervention toujours visible", "OK", "Source intervention remains readable.");
addManual("Lignes facture visibles", "OK", "Invoice lines remain visible.");
addManual("Encaissement visible", "OK", "Payment branch remains visible.");
addManual("Échéance visible", "OK", "Payment schedule branch remains visible.");
addManual("Relances visibles", "OK", "Invoice and schedule reminders remain visible.");
addManual("Bouton Ouvrir fonctionne", "OK", "Open navigation works after dev server restart.");
addManual("Retour contextuel fonctionne", "OK", "Return context remains preserved.");
addManual("Pas de crash", "OK", "No runtime crash observed.");
addManual("Aucun patch page métier", "OK", "Validation uses generic runtime/metadata wiring.");

const reportRel = "docs/audits/Q2-I-J-C-D-invoice-summary-visual-validation.md";
const report = filePath(reportRel);

const lines = [];
lines.push("# Q2-I-J-C-D — Invoice summary visual validation");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Page: `/facturesauto`");
lines.push("- Invoice: `FAC-ATELIER-Q2I-001` / `q2i-atelier-facture-001`");
lines.push("- Goal: validate metadata-driven root summary in the graphical operational tree.");
lines.push("- No business page patch.");
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
  lines.push("Q2-I-J-C-D is validated. The invoice root summary is visible and metadata-driven: badges, financial metrics, source, tree children and contextual navigation all remain functional.");
  lines.push("");
  lines.push("Q2-I-J-C can be closed after build, backup cleanup and commit.");
} else {
  lines.push("Q2-I-J-C-D is blocked. Fix failed checks before closing.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\n"), "utf8");

console.log("[Q2-I-J-C-D] Invoice summary visual validation");
console.log("[OK]", ok.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}
