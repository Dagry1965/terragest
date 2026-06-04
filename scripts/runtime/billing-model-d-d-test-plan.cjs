const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  businessRules: path.join(root, "src", "runtime", "business-rules", "runtimeBusinessRules.ts"),
  factures: path.join(root, "src", "runtime", "modules", "generated", "facturesauto", "facturesauto.module.ts"),
  lignesFacture: path.join(root, "src", "runtime", "modules", "generated", "lignesfactureauto", "lignesfactureauto.module.ts"),
  lignesIntervention: path.join(root, "src", "runtime", "modules", "generated", "lignesinterventionauto", "lignesinterventionauto.module.ts"),
};

const reportPath = path.join(root, "docs", "audits", "BILLING-MODEL-D-D-functional-test-plan.md");

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function has(file, marker) {
  return read(file).includes(marker);
}

const checks = [
  {
    key: "business rule creates invoice header",
    pass: has(files.businessRules, "const createdFacture") &&
      has(files.businessRules, "facturesModule") &&
      has(files.businessRules, "RuntimeDataBinding"),
  },
  {
    key: "business rule creates invoice lines",
    pass: has(files.businessRules, "lignesFactureModule") &&
      has(files.businessRules, "RuntimeDataBinding.create(") &&
      has(files.businessRules, "factureIdForLines"),
  },
  {
    key: "strict intervention line filter",
    pass: has(files.businessRules, "lineInterventionId === interventionId"),
  },
  {
    key: "invoice lines module exists",
    pass: fs.existsSync(files.lignesFacture),
  },
  {
    key: "invoice module has child panel",
    pass: has(files.factures, 'moduleKey: "lignesfactureauto"') &&
      has(files.factures, 'foreignKey: "factureId"'),
  },
  {
    key: "invoice line source fields exist",
    pass: has(files.lignesFacture, 'key: "sourceLineId"') &&
      has(files.lignesFacture, 'key: "sourceModule"') &&
      has(files.lignesFacture, 'key: "factureId"'),
  },
];

const fails = checks.filter((check) => !check.pass);

let report = "# BILLING-MODEL-D-D — Plan de test fonctionnel\n\n";

report += "## Précontrôles statiques\n\n";
for (const check of checks) {
  report += `- ${check.pass ? "OK" : "FAIL"} — ${check.key}\n`;
}

report += "\n## Scénario fonctionnel recommandé\n\n";
report += "1. Ouvrir une intervention existante qui possède au moins une ligne intervention active/validée.\n";
report += "2. Vérifier qu'aucune facture active n'est encore liée à cette intervention.\n";
report += "3. Passer l'intervention à `terminee` via l'action/runtime existant.\n";
report += "4. Ouvrir la facture créée.\n";
report += "5. Vérifier le panneau enfant `Lignes facture`.\n";
report += "6. Vérifier que chaque ligne facture possède `factureId`, `interventionId`, `sourceModule = lignesinterventionauto`, `sourceLineId`, `designation`, `quantite`, `montantHT`, `montantTTC`.\n";
report += "7. Vérifier qu'aucune ligne `removedAt`, `annulee` ou `retiree` n'a été reprise.\n";
report += "8. Vérifier qu'un deuxième passage de l'intervention à `terminee` ne recrée pas une deuxième facture grâce à l'anti-doublon existant.\n";

report += "\n## Décision\n\n";
if (fails.length === 0) {
  report += "- Précontrôles OK. Le test fonctionnel peut être lancé manuellement dans l'application.\n";
} else {
  report += `- Précontrôles KO : ${fails.length} échec(s). Corriger avant test fonctionnel.\n`;
  for (const fail of fails) {
    report += `  - ${fail.key}\n`;
  }
}

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log("[BILLING-MODEL-D-D] DONE");
console.log("[REPORT]", path.relative(root, reportPath));
console.log("[OK]", checks.filter((check) => check.pass).length);
console.log("[FAIL]", fails.length);

if (fails.length > 0) {
  process.exit(1);
}
