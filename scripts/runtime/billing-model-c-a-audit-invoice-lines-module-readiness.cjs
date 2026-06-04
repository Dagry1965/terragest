const fs = require("fs");
const path = require("path");

const root = process.cwd();
const reportPath = path.join(
  root,
  "docs",
  "audits",
  "BILLING-MODEL-C-A-invoice-lines-module-readiness.md"
);

const modulePaths = [
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts",
  "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts",
  "src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts",
  "src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts",
  "src/runtime/modules/definitions/coreModules.ts",
  "src/runtime/modules/index.ts",
  "src/runtime/modules.ts",
];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function extractSignals(relativePath) {
  if (!exists(relativePath)) {
    return {
      path: relativePath,
      exists: false,
      signals: [],
    };
  }

  const content = read(relativePath);

  const checks = [
    "export const",
    "ERPModule",
    "collection",
    "schema",
    "fields",
    "form",
    "tabs",
    "sections",
    "composition",
    "labelFields",
    "readOnlyFields",
    "lockedFields",
    "children",
    "relations",
    "requiresParentContext",
    "allowedParents",
    "parentModuleKey",
    "parentRecordId",
    "parentForeignKey",
    "factureId",
    "interventionId",
    "clientId",
    "vehiculeId",
    "produitId",
    "montantHT",
    "montantTTC",
    "statut",
    "status",
  ];

  return {
    path: relativePath,
    exists: true,
    signals: checks.filter((check) => content.includes(check)),
  };
}

const results = modulePaths.map(extractSignals);

let report = "";

report += "# BILLING-MODEL-C-A — Audit readiness lignesfactureauto\n\n";
report += "## Objectif\n\n";
report += "Préparer la création du module générique `lignesfactureauto` sans inventer de conventions locales.\n\n";
report += "Le module cible doit devenir l'enfant financier de `facturesauto`, équivalent conceptuel des lignes d'intervention ou lignes de commande, mais pour la facturation commune.\n\n";

report += "## Modules inspectés\n\n";

for (const result of results) {
  report += `### ${result.path}\n\n`;

  if (!result.exists) {
    report += "- Statut : ABSENT\n\n";
    continue;
  }

  report += "- Statut : présent\n";
  report += `- Signaux trouvés : ${result.signals.length > 0 ? result.signals.join(", ") : "aucun"}\n\n`;
}

report += "## Décision cible proposée\n\n";
report += "- `facturesauto` reste l'entête financier commun.\n";
report += "- `lignesfactureauto` doit être créé comme module enfant de `facturesauto`.\n";
report += "- `factureId` doit être obligatoire.\n";
report += "- `clientId`, `vehiculeId`, `interventionId` doivent être des snapshots/contextes verrouillés si présents.\n";
report += "- `sourceType`, `sourceModule`, `sourceRecordId`, `sourceLineId` doivent porter l'origine métier de la ligne.\n";
report += "- Les montants doivent être portés par la ligne, mais leur calcul sera ensuite confié à un moteur runtime, pas à une logique locale formulaire.\n";
report += "- Aucun fallback dangereux ne doit afficher toutes les lignes si aucune ligne strictement liée n'existe.\n\n";

report += "## Champs minimum recommandés pour lignesfactureauto\n\n";
report += "- factureId\n";
report += "- designation\n";
report += "- description\n";
report += "- quantite\n";
report += "- prixUnitaireHT\n";
report += "- montantHT\n";
report += "- tauxTVA\n";
report += "- montantTVA\n";
report += "- montantTTC\n";
report += "- sourceType\n";
report += "- sourceModule\n";
report += "- sourceRecordId\n";
report += "- sourceLineId\n";
report += "- clientId\n";
report += "- vehiculeId\n";
report += "- interventionId\n";
report += "- venteId\n";
report += "- produitId\n";
report += "- statutLigne\n\n";

report += "## Prochaine passe\n\n";
report += "BILLING-MODEL-C-B : générer `src/runtime/modules/generated/lignesfactureauto/lignesfactureauto.module.ts` et l'enregistrer dans le registry runtime selon les conventions réellement détectées.\n";

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log("[BILLING-MODEL-C-A] DONE");
console.log(`[REPORT] ${path.relative(root, reportPath)}`);

let missingImportant = false;

for (const required of [
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts",
]) {
  if (!exists(required)) {
    console.log(`[FAIL] Missing required module: ${required}`);
    missingImportant = true;
  }
}

if (missingImportant) {
  process.exit(1);
}

console.log("[OK] Required billing modules found.");
console.log("[NEXT] Inspect report, then run BILLING-MODEL-C-B.");
