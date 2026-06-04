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
  "BILLING-MODEL-D-A-intervention-to-invoice-flow.md"
);

const passName = "BILLING-MODEL-D-A";

function fail(message) {
  console.error(`[${passName}] FAIL: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(target)) {
  fail(`Target not found: ${target}`);
}

const source = fs.readFileSync(target, "utf8");

const lines = source.split(/\r?\n/);

const patterns = [
  "module.metadata.key ===",
  '"facturesauto"',
  "existingFactures",
  "alreadyCreated",
  "RuntimeDataBinding",
  ".create(",
  "numeroFacture",
  "dateFacture",
  "interventionId",
  "Facture créée",
  "Facture générée depuis intervention terminée",
];

const hits = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (patterns.some((pattern) => line.includes(pattern))) {
    const start = Math.max(0, i - 6);
    const end = Math.min(lines.length, i + 14);

    hits.push({
      line: i + 1,
      patternLine: line,
      snippet: lines
        .slice(start, end)
        .map((value, index) => `${start + index + 1}: ${value}`)
        .join("\n"),
    });
  }
}

let report = "# BILLING-MODEL-D-A — Audit intervention vers facture\n\n";

report += "## Objectif\n\n";
report += "Identifier précisément le flux runtime actuel qui crée une facture depuis une intervention terminée, avant de le renforcer pour créer aussi des lignes de facture.\n\n";

report += "## Fichier audité\n\n";
report += "- `src/runtime/business-rules/runtimeBusinessRules.ts`\n\n";

report += "## Résumé du diagnostic\n\n";
report += "- Le flux intervention terminée → facture est dans `runtimeBusinessRules.ts`.\n";
report += "- La facture est créée via `RuntimeDataBinding.create(facturesModule, {...})`.\n";
report += "- Un contrôle anti-doublon existe déjà via `existingFactures` et `interventionId`.\n";
report += "- Le modèle actuel crée une facture entête avec montants globaux.\n";
report += "- La prochaine passe doit créer les `lignesfactureauto` depuis `lignesinterventionauto`, sans logique UI et sans fallback global.\n\n";

report += "## Points détectés\n\n";

for (const hit of hits) {
  report += `### Ligne ${hit.line}\n\n`;
  report += "```ts\n";
  report += hit.snippet;
  report += "\n```\n\n";
}

report += "## Décision pour BILLING-MODEL-D-B\n\n";
report += "- Trouver `lignesfactureautoModule` dans `coreERPModules`.\n";
report += "- Trouver `lignesinterventionautoModule` dans `coreERPModules`.\n";
report += "- Après création de la facture, récupérer l'identifiant de la facture créée.\n";
report += "- Lister les lignes intervention strictement liées à `interventionId`.\n";
report += "- Créer une ligne `lignesfactureauto` par ligne intervention validée ou facturable.\n";
report += "- Remplir `factureId`, `designation`, `quantite`, `prixUnitaireHT`, `montantHT`, `tauxTVA`, `montantTVA`, `montantTTC`, `clientId`, `vehiculeId`, `interventionId`, `sourceType`, `sourceModule`, `sourceRecordId`, `sourceLineId`.\n";
report += "- Ne jamais créer de lignes depuis toute la collection si `interventionId` est absent.\n";
report += "- Garder l'anti-doublon facture existant.\n";

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log(`[${passName}] DONE`);
console.log(`[REPORT] ${path.relative(root, reportPath)}`);
console.log(`[HITS] ${hits.length}`);
