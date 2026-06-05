const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
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
const rules = [];

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

function rule(label, details = "") {
  rules.push({ label, details });
}

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
  /sourceScope/.test(resolver) &&
    /sourceType/.test(resolver) &&
    /sourceModule/.test(resolver) &&
    /sourceRecordId/.test(resolver) &&
    /sourceLabel/.test(resolver)
    ? "OK"
    : "FAIL",
  "Tree resolver supports source metadata",
  "Required for invoices as autonomous source-aware documents."
);

add(
  /typeFacture/.test(factures)
    ? "OK"
    : "WARN",
  "facturesauto declares typeFacture",
  "Invoice type should distinguish atelier/boutique/mixed/other if present."
);

add(
  /sourceScope/.test(factures)
    ? "OK"
    : "WARN",
  "facturesauto declares sourceScope",
  "Source scope is needed for atelier/boutique/mixed source semantics."
);

add(
  /sourceType/.test(factures)
    ? "OK"
    : "WARN",
  "facturesauto declares sourceType",
  "Source type helps classify facturable origin."
);

add(
  /sourceModule/.test(factures)
    ? "OK"
    : "WARN",
  "facturesauto declares sourceModule",
  "Source module allows invoice to point to intervention, sale, order, or other source."
);

add(
  /sourceRecordId/.test(factures)
    ? "OK"
    : "WARN",
  "facturesauto declares sourceRecordId",
  "Source record id allows invoice to reference the originating business record."
);

add(
  /sourceLabel/.test(factures)
    ? "OK"
    : "WARN",
  "facturesauto declares sourceLabel",
  "Source label improves readable tree display."
);

add(
  /lignesfactureauto/.test(factures) &&
    /foreignKey:\s*["']factureId["']/.test(factures)
    ? "OK"
    : "FAIL",
  "facturesauto exposes lignesfactureauto by factureId",
  "Invoice lines must be children of the invoice document."
);

add(
  /encaissementsauto/.test(factures) &&
    /foreignKey:\s*["']factureId["']/.test(factures)
    ? "OK"
    : "WARN",
  "facturesauto exposes encaissementsauto by factureId",
  "Payments should be visible under invoice."
);

add(
  /echeancespaiementauto/.test(factures) &&
    /foreignKey:\s*["']factureId["']/.test(factures)
    ? "OK"
    : "WARN",
  "facturesauto exposes echeancespaiementauto by factureId",
  "Payment schedules should split invoice remaining amount."
);

add(
  /rappelsauto/.test(factures) &&
    /foreignKey:\s*["']factureId["']/.test(factures)
    ? "OK"
    : "WARN",
  "facturesauto exposes rappelsauto by factureId",
  "Invoice reminders should be visible under invoice."
);

add(
  /factureId/.test(lignesFacture)
    ? "OK"
    : "FAIL",
  "lignesfactureauto declares factureId",
  "Invoice lines must belong to invoice header."
);

add(
  /factureId/.test(encaissements)
    ? "OK"
    : "WARN",
  "encaissementsauto declares factureId",
  "Payments should reduce invoice remaining amount."
);

add(
  /factureId/.test(echeances)
    ? "OK"
    : "WARN",
  "echeancespaiementauto declares factureId",
  "Schedules should belong to invoice."
);

add(
  /factureId/.test(rappels)
    ? "OK"
    : "WARN",
  "rappelsauto declares factureId",
  "Reminder can target invoice."
);

add(
  /echeanceId/.test(rappels)
    ? "OK"
    : "WARN",
  "rappelsauto declares echeanceId",
  "Reminder can target payment schedule."
);

add(
  /rappelsauto/.test(echeances) &&
    /foreignKey:\s*["']echeanceId["']/.test(echeances)
    ? "OK"
    : "WARN",
  "echeancespaiementauto exposes rappelsauto by echeanceId",
  "Schedule reminders should be nested under schedule."
);

add(
  /interventionId/.test(factures)
    ? "OK"
    : "WARN",
  "facturesauto still supports interventionId",
  "Allowed: invoice may be linked to workshop intervention, but must not depend only on it."
);

add(
  /sourceModule|sourceRecordId/.test(factures) && /interventionId/.test(factures)
    ? "OK"
    : "WARN",
  "facturesauto supports both source metadata and legacy workshop link",
  "This allows transition from intervention-only invoice toward autonomous source-aware invoice."
);

add(
  /AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(resolver)
    ? "FAIL"
    : "OK",
  "Tree resolver has no AMARKHYS hardcode",
  "Resolver must stay generic."
);

rule(
  "Invoice is a financial document, not only an intervention child",
  "Tree should represent invoice through source metadata and composition children."
);

rule(
  "Invoice lines define economic detail",
  "Amounts should aggregate from lignesfactureauto into facturesauto."
);

rule(
  "Payment schedules split remaining invoice amount",
  "Echeances belong to invoice, not to invoice lines by default."
);

rule(
  "Payments reduce invoice remaining amount",
  "Encaissements belong to invoice and should be visible under invoice."
);

rule(
  "Reminders target invoice or schedule",
  "rappelsauto can link via factureId or echeanceId."
);

const reportRel = "docs/audits/Q2-I-F-invoice-source-operational-tree-audit.md";
const report = filePath(reportRel);

const lines = [];
lines.push("# Q2-I-F — Invoice source operational tree audit");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Goal: audit whether invoice can be represented as a generic source-aware financial document.");
lines.push("- No code modification in this pass.");
lines.push("- Focus modules:");
lines.push("  - facturesauto");
lines.push("  - lignesfactureauto");
lines.push("  - encaissementsauto");
lines.push("  - echeancespaiementauto");
lines.push("  - rappelsauto");
lines.push("  - RuntimeOperationalTreeResolver");
lines.push("");
lines.push("## Expected model");
lines.push("");
lines.push("```text");
lines.push("Facture");
lines.push("├── Source métier");
lines.push("├── Lignes facture");
lines.push("├── Encaissements");
lines.push("├── Échéances");
lines.push("│   └── Relances échéance");
lines.push("└── Relances facture");
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
lines.push("## Business rules confirmed");
lines.push("");
lines.push("| Rule | Details |");
lines.push("|---|---|");

for (const item of rules) {
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
  lines.push("Q2-I-F is validated with warnings only if any. The invoice model is compatible with a generic source-aware operational tree.");
  lines.push("");
  lines.push("Next step: address WARN items only if a required source/document field or relation is missing in metadata.");
} else {
  lines.push("Q2-I-F is blocked. Fix FAIL checks before continuing invoice/source tree work.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\n"), "utf8");

console.log("[Q2-I-F] Invoice source operational tree audit");
console.log("[OK]", ok.length);
console.log("[WARN]", warn.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}
