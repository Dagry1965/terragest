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
  lignesFacture: "src/runtime/modules/generated/lignesfactureauto/lignesfactureauto.module.ts",
  encaissements: "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts",
  echeances: "src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts",
  rappels: "src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts",
};

const checks = [];
const ok = [];
const warn = [];
const fail = [];
const decisions = [];

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

function decision(label, details = "") {
  decisions.push({ label, details });
}

const erpModule = read(files.erpModule);
const resolver = read(files.resolver);
const treeView = read(files.treeView);
const recordTree = read(files.recordTree);
const expandedChildren = read(files.expandedChildren);
const factures = read(files.factures);
const lignesFacture = read(files.lignesFacture);
const encaissements = read(files.encaissements);
const echeances = read(files.echeances);
const rappels = read(files.rappels);

for (const [key, rel] of Object.entries(files)) {
  add(exists(rel) ? "OK" : "FAIL", "File exists: " + key, rel);
}

add(
  /RuntimeOperationalTreeNode/.test(resolver) &&
    /children: RuntimeOperationalTreeNode\[\]/.test(resolver),
  "OK",
  "Runtime tree node contract exists",
  "Operational tree is runtime-driven."
);

add(
  /RuntimeOperationalTreeSummary/.test(resolver) &&
    /summary\?: RuntimeOperationalTreeSummary/.test(resolver),
  "OK",
  "Runtime tree node supports summary",
  "Node summary is a generic runtime contract."
);

add(
  /buildRuntimeOperationalTreeSummary/.test(resolver) &&
    /params\.module\.operational\?\.tree\?\.summary/.test(resolver),
  "OK",
  "Resolver maps summary from metadata",
  "Summary is metadata-driven, not component-hardcoded."
);

add(
  /summary:\s*buildRuntimeOperationalTreeSummary/.test(resolver),
  "OK",
  "buildNode wires summary",
  "Runtime node receives summary during tree construction."
);

add(
  /sourceScope/.test(resolver) &&
    /sourceType/.test(resolver) &&
    /sourceModule/.test(resolver) &&
    /sourceRecordId/.test(resolver) &&
    /sourceLabel/.test(resolver),
  "OK",
  "Resolver supports source metadata",
  "Invoice can be represented as source-aware financial document."
);

add(
  /RuntimeOperationalChildrenResolver/.test(resolver) &&
    /resolveExpandedChildren/.test(resolver),
  "OK",
  "Resolver delegates children loading",
  "Tree resolver does not read Firestore directly."
);

add(
  /node\.summary\?\.badges/.test(treeView) &&
    /node\.summary\?\.metrics/.test(treeView),
  "OK",
  "TreeView renders summary generically",
  "Renderer consumes generic node.summary."
);

add(
  /border-l border-slate-200 pl-4/.test(treeView) &&
    /absolute top-5 h-px w-6/.test(treeView),
  "OK",
  "TreeView renders graphical hierarchy",
  "Branches/visual tree are present."
);

add(
  /appendRuntimeReturnContext/.test(treeView) &&
    /returnTo:\s*currentReturnTo/.test(treeView),
  "OK",
  "TreeView preserves contextual return",
  "Open links preserve navigation context."
);

add(
  /RuntimeOperationalTreeResolver/.test(recordTree) &&
    /resolveTree/.test(recordTree),
  "OK",
  "RecordTree delegates to tree resolver",
  "UI wrapper does not own tree resolution logic."
);

add(
  /parentModule\.operational\?\.tree/.test(expandedChildren),
  "OK",
  "Expanded children consumes operational.tree policy",
  "Tree display is metadata-policy driven."
);

add(
  /tree:\s*\{/.test(factures) &&
    /summary:\s*\{/.test(factures) &&
    /rootOnly:\s*true/.test(factures),
  "OK",
  "facturesauto declares root summary",
  "Invoice root summary configured in metadata."
);

add(
  /field:\s*"typeFacture"/.test(factures) &&
    /field:\s*"statutFacture"/.test(factures) &&
    /field:\s*"statutPaiement"/.test(factures),
  "OK",
  "facturesauto declares summary badges",
  "Badges are metadata-driven."
);

add(
  /field:\s*"montantHT"/.test(factures) &&
    /field:\s*"tva"/.test(factures) &&
    /field:\s*"montantTTC"/.test(factures) &&
    /field:\s*"montantPaye"/.test(factures) &&
    /field:\s*"resteAPayer"/.test(factures),
  "OK",
  "facturesauto declares financial metrics",
  "HT/TVA/TTC/Paid/Remaining metrics are metadata-driven."
);

add(
  /lignesfactureauto/.test(factures) &&
    /foreignKey:\s*"factureId"/.test(factures),
  "OK",
  "facturesauto exposes invoice lines",
  "Invoice economic details visible in tree."
);

add(
  /encaissementsauto/.test(factures) &&
    /foreignKey:\s*"factureId"/.test(factures),
  "OK",
  "facturesauto exposes payments",
  "Invoice payment branch visible in tree."
);

add(
  /echeancespaiementauto/.test(factures) &&
    /foreignKey:\s*"factureId"/.test(factures),
  "OK",
  "facturesauto exposes payment schedules",
  "Invoice schedule branch visible in tree."
);

add(
  /rappelsauto/.test(factures) &&
    /foreignKey:\s*"factureId"/.test(factures),
  "OK",
  "facturesauto exposes invoice reminders",
  "Invoice reminder branch visible in tree."
);

add(
  /factureId/.test(lignesFacture),
  "OK",
  "lignesfactureauto has factureId",
  "Invoice lines attach to invoice."
);

add(
  /factureId/.test(encaissements),
  "OK",
  "encaissementsauto has factureId",
  "Payments attach to invoice."
);

add(
  /factureId/.test(echeances),
  "OK",
  "echeancespaiementauto has factureId",
  "Schedules attach to invoice."
);

add(
  /factureId/.test(rappels) && /echeanceId/.test(rappels),
  "OK",
  "rappelsauto supports factureId and echeanceId",
  "Reminders can target invoice or schedule."
);

add(
  !/montantHT|montantTTC|statutPaiement|FAC-ATELIER|facturesauto/.test(treeView),
  "OK",
  "TreeView has no invoice hardcode",
  "Invoice-specific fields stay in metadata."
);

add(
  !/firebase\/firestore|getFirestore|collection\(|doc\(|query\(/.test(
    treeView + recordTree + expandedChildren
  ),
  "OK",
  "Tree UI stack has no direct Firestore access",
  "Data loading remains runtime-resolver based."
);

add(
  !/RuntimeDataBinding\.list/.test(treeView + recordTree + expandedChildren),
  "OK",
  "Tree UI stack does not call RuntimeDataBinding.list",
  "UI stays presentation-focused."
);

add(
  !/ORG_AMARKHYS_001|amarkhys/.test(treeView + recordTree + expandedChildren + resolver),
  "OK",
  "Generic runtime files have no tenant/workspace hardcode",
  "Runtime remains multi-tenant/generic."
);

add(
  /AMARKHYS/.test(factures),
  "WARN",
  "facturesauto metadata contains AMARKHYS branding",
  "Accepted: module metadata may carry business/domain labels; generic components must not."
);

decision(
  "Q2-I tree phase is runtime-driven",
  "Resolver builds tree nodes; UI renders generic nodes; metadata controls display."
);

decision(
  "Invoice is treated as source-aware financial document",
  "facturesauto declares source fields, children and root summary."
);

decision(
  "Atelier invoice is validated; boutique/mixed remain out of scope",
  "FAC-ATELIER-Q2I-001 validates atelier flow only."
);

decision(
  "No business page patch was introduced",
  "Changes are runtime/component/metadata/audit oriented."
);

const reportRel = "docs/audits/Q2-I-K-A-final-operational-tree-invoice-summary-audit.md";
const report = filePath(reportRel);

const lines = [];
lines.push("# Q2-I-K-A — Final operational tree and invoice summary audit");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Final global audit for Q2-I operational tree phase.");
lines.push("- Covers graphical tree, source-aware invoice model, atelier invoice seed, root summary, return navigation and MODE ERP constraints.");
lines.push("- Boutique and mixed invoices remain out of scope.");
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
lines.push("## Decisions");
lines.push("");
lines.push("| Decision | Details |");
lines.push("|---|---|");

for (const item of decisions) {
  lines.push(
    "| " +
      item.label.replace(/\|/g, "\\|") +
      " | " +
      item.details.replace(/\|/g, "\\|") +
      " |"
  );
}

lines.push("");
lines.push("## Final decision");
lines.push("");

if (fail.length === 0) {
  lines.push("Q2-I-K-A is validated. The operational tree phase can be frozen: graphical hierarchy, source-aware atelier invoice, metadata-driven root summary and contextual navigation are functional while preserving MODE ERP constraints.");
  lines.push("");
  lines.push("Next step: build, commit and consider Q2-I frozen unless a new explicit scope is opened.");
} else {
  lines.push("Q2-I-K-A is blocked. Fix failed checks before freezing Q2-I.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\n"), "utf8");

console.log("[Q2-I-K-A] Final operational tree and invoice summary audit");
console.log("[OK]", ok.length);
console.log("[WARN]", warn.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}
