const fs = require("fs");
const path = require("path");

const root = process.cwd();
const passName = "BILLING-MODEL-D-D2-B";

const files = {
  coreModules: path.join(root, "src", "runtime", "modules", "definitions", "coreModules.ts"),
  index: path.join(root, "src", "runtime", "modules", "index.ts"),
  lignesFactureModule: path.join(root, "src", "runtime", "modules", "generated", "lignesfactureauto", "lignesfactureauto.module.ts"),
  businessRules: path.join(root, "src", "runtime", "business-rules", "runtimeBusinessRules.ts"),
};

const reportPath = path.join(
  root,
  "docs",
  "audits",
  "BILLING-MODEL-D-D2-B-runtime-invoice-line-module-diagnosis.md"
);

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function check(name, pass, detail) {
  return { name, pass, detail };
}

const core = read(files.coreModules);
const index = read(files.index);
const lignesFacture = read(files.lignesFactureModule);
const businessRules = read(files.businessRules);

const checks = [
  check(
    "lignesfactureauto module file exists",
    fs.existsSync(files.lignesFactureModule),
    "Le fichier module lignesfactureauto existe."
  ),
  check(
    "coreModules imports lignesfactureautoModule",
    core.includes("lignesfactureautoModule"),
    "coreModules.ts doit importer et enregistrer lignesfactureautoModule."
  ),
  check(
    "coreModules contains metadata key lignesfactureauto through import registration",
    core.includes("lignesfactureautoModule,"),
    "Le module doit être présent dans le tableau runtime."
  ),
  check(
    "index exports lignesfactureautoModule",
    index.includes("lignesfactureautoModule"),
    "index.ts doit exporter le module."
  ),
  check(
    "lignesfactureauto collection is correct",
    lignesFacture.includes('collection: "lignesfactureauto"'),
    "Le schema doit cibler la collection lignesfactureauto."
  ),
  check(
    "lignesfactureauto requires factureId",
    lignesFacture.includes('key: "factureId"') &&
      lignesFacture.includes('required: true'),
    "Le champ factureId doit exister et être obligatoire."
  ),
  check(
    "business rule searches lignesfactureauto",
    businessRules.includes('module.metadata.key ===\n              "lignesfactureauto"') ||
      businessRules.includes('"lignesfactureauto"'),
    "La règle intervention terminée doit chercher lignesfactureauto dans coreERPModules."
  ),
  check(
    "business rule creates lignesFactureModule",
    businessRules.includes("RuntimeDataBinding.create(") &&
      businessRules.includes("lignesFactureModule"),
    "La règle doit créer les lignes via RuntimeDataBinding.create(lignesFactureModule, ...)."
  ),
];

const fails = checks.filter((item) => !item.pass);

let report = "# BILLING-MODEL-D-D2-B — Diagnostic module runtime lignes facture\n\n";

report += "## Résultats\n\n";
for (const item of checks) {
  report += `- ${item.pass ? "OK" : "FAIL"} — ${item.name}: ${item.detail}\n`;
}

report += "\n## Interprétation\n\n";

if (fails.length === 0) {
  report += "- Les déclarations statiques semblent OK.\n";
  report += "- Si aucune ligne facture n'est créée en exécution, le problème est probablement dans l'exécution runtime : module non chargé par le serveur en cours, contrainte create, ou erreur silencieuse pendant RuntimeDataBinding.create(lignesFactureModule, ...).\n";
  report += "- Prochaine correction recommandée : ajouter une journalisation/notification contrôlée autour de la création des lignes facture, ou créer un script de réparation D-D2-C pour générer les lignes manquantes et valider le modèle de données.\n";
} else {
  report += `- ${fails.length} échec(s) détecté(s). Corriger l'enregistrement module avant de retester.\n`;
}

report += "\n## Fichiers inspectés\n\n";
for (const [key, file] of Object.entries(files)) {
  report += `- ${key}: \`${path.relative(root, file)}\`\n`;
}

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log(`[${passName}] DONE`);
console.log(`[REPORT] ${path.relative(root, reportPath)}`);
console.log(`[OK] ${checks.filter((item) => item.pass).length}`);
console.log(`[FAIL] ${fails.length}`);

if (fails.length > 0) {
  process.exit(1);
}
