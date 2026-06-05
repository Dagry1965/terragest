const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  factures: "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  lignesFacture: "src/runtime/modules/generated/lignesfactureauto/lignesfactureauto.module.ts",
  encaissements: "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts",
  echeances: "src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts",
  rappels: "src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts",
  interventions: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  lignesIntervention: "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts",
  clients: "src/runtime/modules/generated/clientsauto/clientsauto.module.ts",
  vehicules: "src/runtime/modules/generated/vehicules/vehicules.module.ts",
};

const checks = [];
const ok = [];
const warn = [];
const fail = [];
const scenarios = [];

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

function scenario(key, label, details) {
  scenarios.push({ key, label, details });
}

const factures = read(files.factures);
const lignesFacture = read(files.lignesFacture);
const encaissements = read(files.encaissements);
const echeances = read(files.echeances);
const rappels = read(files.rappels);
const interventions = read(files.interventions);
const lignesIntervention = read(files.lignesIntervention);
const clients = read(files.clients);
const vehicules = read(files.vehicules);

for (const [key, rel] of Object.entries(files)) {
  add(exists(rel) ? "OK" : "FAIL", "Module metadata exists: " + key, rel);
}

const factureRequired = [
  "numeroFacture",
  "dateFacture",
  "statutFacture",
  "statutPaiement",
  "clientId",
  "vehiculeId",
  "interventionId",
  "montantHT",
  "tva",
  "montantTTC",
  "montantPaye",
  "resteAPayer",
];

for (const field of factureRequired) {
  add(
    factures.includes(field) ? "OK" : "FAIL",
    "facturesauto field: " + field,
    "Required for atelier invoice seed."
  );
}

const sourceRequired = [
  "typeFacture",
  "sourceScope",
  "sourceType",
  "sourceModule",
  "sourceRecordId",
  "sourceLabel",
];

for (const field of sourceRequired) {
  add(
    factures.includes(field) ? "OK" : "FAIL",
    "facturesauto source field: " + field,
    "Required for source-aware atelier invoice."
  );
}

const factureChildren = [
  { module: "lignesfactureauto", foreignKey: "factureId" },
  { module: "encaissementsauto", foreignKey: "factureId" },
  { module: "echeancespaiementauto", foreignKey: "factureId" },
  { module: "rappelsauto", foreignKey: "factureId" },
];

for (const relation of factureChildren) {
  add(
    factures.includes(relation.module) &&
      factures.includes(`foreignKey: "${relation.foreignKey}"`),
    "facturesauto child relation: " + relation.module + " via " + relation.foreignKey,
    "Required for visual tree children."
  );
}

add(
  lignesFacture.includes("factureId") ? "OK" : "FAIL",
  "lignesfactureauto has factureId",
  "Invoice lines must be attached to invoice."
);

add(
  lignesFacture.includes("interventionId") ? "OK" : "WARN",
  "lignesfactureauto has interventionId",
  "Useful to trace atelier source lines."
);

add(
  lignesFacture.includes("sourceLineId") || lignesFacture.includes("sourceRecordId")
    ? "OK"
    : "WARN",
  "lignesfactureauto has source line reference",
  "Useful to trace invoice line from intervention line."
);

add(
  encaissements.includes("factureId") ? "OK" : "FAIL",
  "encaissementsauto has factureId",
  "Payment must be attached to invoice."
);

add(
  echeances.includes("factureId") ? "OK" : "FAIL",
  "echeancespaiementauto has factureId",
  "Payment schedule must be attached to invoice."
);

add(
  rappels.includes("factureId") ? "OK" : "FAIL",
  "rappelsauto has factureId",
  "Invoice reminder must be attached to invoice."
);

add(
  rappels.includes("echeanceId") ? "OK" : "FAIL",
  "rappelsauto has echeanceId",
  "Schedule reminder must be attached to payment schedule."
);

add(
  echeances.includes("rappelsauto") &&
    echeances.includes('foreignKey: "echeanceId"')
    ? "OK"
    : "WARN",
  "echeancespaiementauto exposes reminders by echeanceId",
  "Needed for nested schedule reminder tree."
);

const interventionRequired = ["clientId", "vehiculeId", "statut"];

for (const field of interventionRequired) {
  add(
    interventions.includes(field) ? "OK" : "FAIL",
    "interventionsauto field: " + field,
    "Required to create atelier source intervention."
  );
}

add(
  lignesIntervention.includes("interventionId") ? "OK" : "FAIL",
  "lignesinterventionauto has interventionId",
  "Required to create source intervention lines."
);

add(
  clients.includes("clientsauto") || clients.includes("nom") || clients.includes("prenom")
    ? "OK"
    : "WARN",
  "clientsauto appears usable",
  "Needed for readable client context."
);

add(
  vehicules.includes("vehicule") || vehicules.includes("immatriculation")
    ? "OK"
    : "WARN",
  "vehicules appears usable",
  "Needed for readable vehicle context."
);

scenario(
  "atelier-paid",
  "Facture atelier payée",
  "Intervention terminée, facture atelier, deux lignes facture, un encaissement complet, reste à payer 0."
);

scenario(
  "atelier-partial-schedule",
  "Facture atelier partielle avec échéance",
  "Intervention terminée, facture atelier, lignes facture, paiement partiel, échéance restante et relance d'échéance."
);

const reportRel = "docs/audits/Q2-I-G0-A-atelier-invoice-seed-readiness.md";
const report = filePath(reportRel);

const lines = [];
lines.push("# Q2-I-G0-A — Atelier invoice seed readiness audit");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Goal: prepare controlled demo data for atelier invoice visual validation.");
lines.push("- No Firestore write in this pass.");
lines.push("- Scope is atelier invoices only. Boutique and mixed invoices are intentionally excluded.");
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
      check.label.replace(/\\|/g, "\\\\|") +
      " | " +
      String(check.details || "").replace(/\\|/g, "\\\\|") +
      " |"
  );
}

lines.push("");
lines.push("## Proposed atelier demo scenarios");
lines.push("");
lines.push("| Key | Scenario | Details |");
lines.push("|---|---|---|");

for (const item of scenarios) {
  lines.push(
    "| " +
      item.key +
      " | " +
      item.label.replace(/\\|/g, "\\\\|") +
      " | " +
      item.details.replace(/\\|/g, "\\\\|") +
      " |"
  );
}

lines.push("");
lines.push("## Decision");
lines.push("");

if (fail.length === 0) {
  lines.push("Q2-I-G0-A is validated. Metadata is ready for controlled atelier invoice seed scenarios.");
  lines.push("");
  lines.push("Next step: Q2-I-G0-B should inspect current Firestore demo data and define deterministic atelier invoice records before writing.");
} else {
  lines.push("Q2-I-G0-A is blocked. Fix FAIL items before generating atelier invoice demo data.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\\n"), "utf8");

console.log("[Q2-I-G0-A] Atelier invoice seed readiness audit");
console.log("[OK]", ok.length);
console.log("[WARN]", warn.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}
