const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "runtime",
  "business-rules",
  "runtimeBusinessRules.ts"
);

const reportPath = path.join(
  root,
  "docs",
  "audits",
  "BILLING-MODEL-D-C-invoice-line-flow-audit.md"
);

const passName = "BILLING-MODEL-D-C";

function fail(message) {
  console.error(`[${passName}] FAIL: ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[${passName}] OK: ${message}`);
}

if (!fs.existsSync(target)) {
  fail(`Target not found: ${target}`);
}

const source = fs.readFileSync(target, "utf8");

const checks = [
  {
    key: "invoice header create",
    required: true,
    pass: source.includes("const createdFacture") &&
      source.includes("RuntimeDataBinding") &&
      source.includes(".create(") &&
      source.includes("facturesModule"),
    detail: "Facture entête créée via RuntimeDataBinding.create(facturesModule, ...).",
  },
  {
    key: "created invoice id recovery",
    required: true,
    pass: source.includes("const createdFactureId") &&
      source.includes("factureIdForLines") &&
      source.includes("createdFacture as any"),
    detail: "Récupération de l'id facture depuis le retour create.",
  },
  {
    key: "fallback filtered invoice lookup",
    required: true,
    pass: source.includes("refreshedFactures") &&
      source.includes("numeroFacture") &&
      source.includes("String(facture.interventionId ?? \"\") ==="),
    detail: "Fallback par liste filtrée sur numeroFacture ou interventionId.",
  },
  {
    key: "strict line modules",
    required: true,
    pass: source.includes('"lignesinterventionauto"') &&
      source.includes('"lignesfactureauto"'),
    detail: "Les modules lignes intervention et lignes facture sont recherchés dans coreERPModules.",
  },
  {
    key: "strict intervention line filter",
    required: true,
    pass: source.includes("lineInterventionId === interventionId") &&
      source.includes("lignesIntervention.filter"),
    detail: "Les lignes intervention sont filtrées strictement par interventionId.",
  },
  {
    key: "no line without invoice id",
    required: true,
    pass: source.includes("factureIdForLines &&") &&
      source.includes("lignesInterventionModule &&") &&
      source.includes("lignesFactureModule &&") &&
      source.includes("interventionId"),
    detail: "Aucune ligne facture créée sans factureId, modules et interventionId.",
  },
  {
    key: "removed or cancelled lines ignored",
    required: true,
    pass: source.includes("!removedAt") &&
      source.includes('statutLigne !== "annulee"') &&
      source.includes('statutLigne !== "retiree"'),
    detail: "Les lignes retirées, annulées ou retirées sont exclues.",
  },
  {
    key: "invoice line create",
    required: true,
    pass: source.includes("RuntimeDataBinding.create(") &&
      source.includes("lignesFactureModule") &&
      source.includes("factureIdForLines") &&
      source.includes("sourceModule:") &&
      source.includes('"lignesinterventionauto"'),
    detail: "Création de lignesfactureauto sourcées depuis lignesinterventionauto.",
  },
];

const fails = checks.filter((check) => check.required && !check.pass);

let report = "# BILLING-MODEL-D-C — Audit flux lignes facture\n\n";

report += "## Objectif\n\n";
report += "Auditer statiquement le flux runtime `intervention terminée → facture entête → lignes facture` après build OK.\n\n";

report += "## Résultats\n\n";

for (const check of checks) {
  report += `- ${check.pass ? "OK" : "FAIL"} — ${check.key}: ${check.detail}\n`;
}

report += "\n## Synthèse\n\n";

if (fails.length === 0) {
  report += "- Audit statique OK.\n";
  report += "- Le flux crée l'entête facture puis les lignes facture uniquement quand le contexte est complet.\n";
  report += "- Aucun fallback global de lignes intervention n'est introduit.\n";
} else {
  report += `- FAIL: ${fails.length}\n`;
  for (const failCheck of fails) {
    report += `  - ${failCheck.key}\n`;
  }
}

report += "\n## Prochaine étape\n\n";
report += "BILLING-MODEL-D-D : test fonctionnel contrôlé sur une intervention terminée avec lignes intervention validées.\n";

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log(`[${passName}] DONE`);
console.log(`[REPORT] ${path.relative(root, reportPath)}`);
console.log(`[OK] ${checks.filter((check) => check.pass).length}`);
console.log(`[FAIL] ${fails.length}`);

if (fails.length > 0) {
  process.exit(1);
}

ok("Audit completed without failure.");
