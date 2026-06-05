const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  treeView: "src/components/erp/operational/ERPOperationalTreeView.tsx",
  recordTree: "src/components/erp/operational/ERPOperationalRecordTree.tsx",
  expandedChildren: "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  resolver: "src/runtime/operational/RuntimeOperationalTreeResolver.ts",
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
const resolver = read(files.resolver);

for (const [key, rel] of Object.entries(files)) {
  add("File exists: " + key, exists(rel), rel);
}

add(
  "Graphic tree rendering remains present",
  /border-l border-slate-200 pl-4/.test(treeView) &&
    /absolute top-5 h-px w-6/.test(treeView),
  "The atelier invoice validation used the graphical hierarchy."
);

add(
  "Tree preserves source metadata display",
  /getSourceSummary/.test(treeView) &&
    /sourceSummary/.test(treeView),
  "Source atelier/intervention remains visible in the tree."
);

add(
  "Tree preserves return context",
  /appendRuntimeReturnContext/.test(treeView) &&
    /returnTo:\s*currentReturnTo/.test(treeView) &&
    /returnLabel:\s*currentReturnLabel/.test(treeView),
  "Open links keep contextual return."
);

add(
  "Record tree delegates to RuntimeOperationalTreeResolver",
  /RuntimeOperationalTreeResolver/.test(recordTree) &&
    /resolveTree/.test(recordTree),
  "Data loading remains runtime-driven."
);

add(
  "Expanded children mounts record tree generically",
  /<ERPOperationalRecordTree\b/.test(expandedChildren) &&
    /parentModule=\{parentModule\}/.test(expandedChildren) &&
    /parentRecord=\{parentRecord\}/.test(expandedChildren),
  "No business page-specific wiring."
);

add(
  "Expanded children consumes operational.tree policy",
  /parentModule\.operational\?\.tree/.test(expandedChildren),
  "Tree display remains metadata-policy driven."
);

add(
  "Resolver supports source metadata",
  /sourceScope/.test(resolver) &&
    /sourceType/.test(resolver) &&
    /sourceModule/.test(resolver) &&
    /sourceRecordId/.test(resolver) &&
    /sourceLabel/.test(resolver),
  "Required for atelier invoice source representation."
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
  "No hardcoded AMARKHYS context in tree UI stack",
  !/AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(
    treeView + recordTree + expandedChildren
  ),
  "Tree remains generic."
);

addManual("Facture atelier visible dans la liste", "OK", "Validated on /facturesauto with FAC-ATELIER-Q2I-001.");
addManual("Expand facture", "OK", "Invoice expansion works.");
addManual("Arbre graphique visible", "OK", "Graphical hierarchy is displayed.");
addManual("Source atelier/intervention visible", "OK", "Source intervention context is readable.");
addManual("Lignes facture visibles dans l’arbre", "OK", "Invoice lines are visible.");
addManual("Encaissement visible", "OK", "Payment child is visible.");
addManual("Échéance visible", "OK", "Payment schedule child is visible.");
addManual("Relance facture visible", "OK", "Invoice reminder is visible.");
addManual("Relance échéance visible", "OK", "Schedule reminder is visible.");
addManual("Boutons + / − fonctionnels", "OK", "Expand/collapse works.");
addManual("Boutons Ouvrir fonctionnels", "OK", "Open links work.");
addManual("Retour contextuel OK", "OK", "Return context is preserved.");
addManual("Enfants existants hors arbre visibles", "OK", "Existing expanded child blocks remain visible.");
addManual("Pas de crash", "OK", "No runtime crash observed.");
addManual("Pas de page métier modifiée", "OK", "Validation used generic runtime wiring.");

const reportRel = "docs/audits/Q2-I-G-atelier-invoice-visual-validation.md";
const report = filePath(reportRel);

const lines = [];
lines.push("# Q2-I-G — Atelier invoice visual validation");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Page: `/facturesauto`");
lines.push("- Seeded invoice: `FAC-ATELIER-Q2I-001` / `q2i-atelier-facture-001`");
lines.push("- Source intervention: `demo-intervention-old-001`");
lines.push("- Scope: atelier invoice only. Boutique and mixed invoices are excluded.");
lines.push("- Goal: validate the graphical operational tree on a real atelier invoice scenario.");
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
  lines.push("Q2-I-G is validated. The atelier invoice is correctly represented in the graphical operational tree with source intervention, invoice lines, payment, schedule and reminders.");
  lines.push("");
  lines.push("Next step: close Q2-I-G after build and commit. Future boutique/mixed invoices remain out of scope until explicitly reopened.");
} else {
  lines.push("Q2-I-G is blocked. Fix failed checks before closing visual validation.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\n"), "utf8");

console.log("[Q2-I-G] Atelier invoice visual validation");
console.log("[OK]", ok.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}
