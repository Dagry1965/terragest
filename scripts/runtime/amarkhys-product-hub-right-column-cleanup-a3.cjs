const fs = require("fs");
const path = require("path");

const root = process.cwd();
const sheetPath = path.join(root, "src/components/erp/hub/ERPProductStockOperationalSheet.tsx");
const reportPath = path.join(root, "docs/audits/AMARKHYS-PRODUCT-HUB-RIGHT-COLUMN-CLEANUP-A3.md");

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function fail(message) {
  throw new Error(message);
}

let content = read(sheetPath);
write(sheetPath + ".bak-right-column-cleanup-a3", content);

/**
 * A3 robuste :
 * - localise le dernier aside de la fiche
 * - dans cet aside, trouve la section Approvisionnement rendue
 * - trouve la section Liens rapides
 * - supprime tout entre Approvisionnement et Liens rapides
 */
const asideIndex = content.lastIndexOf('<aside className="space-y-5">');

if (asideIndex < 0) {
  fail("Aside colonne droite introuvable.");
}

const beforeAside = content.slice(0, asideIndex);
const asideAndAfter = content.slice(asideIndex);

const rightApproTitleIndex = asideAndAfter.indexOf('title="Approvisionnement"');
const quickLinksTitleIndex = asideAndAfter.indexOf('title="Liens rapides"');

if (rightApproTitleIndex < 0) {
  fail('title="Approvisionnement" introuvable dans l’aside.');
}

if (quickLinksTitleIndex < 0) {
  fail('title="Liens rapides" introuvable dans l’aside.');
}

if (quickLinksTitleIndex <= rightApproTitleIndex) {
  fail("Ordre inattendu dans l’aside : Liens rapides avant Approvisionnement.");
}

const removeStartRelative = asideAndAfter.lastIndexOf("<section", rightApproTitleIndex);
const keepStartRelative = asideAndAfter.lastIndexOf("<section", quickLinksTitleIndex);

if (removeStartRelative < 0) {
  fail("Début section Approvisionnement introuvable.");
}

if (keepStartRelative < 0) {
  fail("Début section Liens rapides introuvable.");
}

if (keepStartRelative <= removeStartRelative) {
  fail("Bornes invalides pour suppression Approvisionnement/Dossier sélectionné.");
}

const cleanedAsideAndAfter =
  asideAndAfter.slice(0, removeStartRelative) + asideAndAfter.slice(keepStartRelative);

content = beforeAside + cleanedAsideAndAfter;

const finalAside = content.slice(content.lastIndexOf('<aside className="space-y-5">'));

const checks = [
  ["Liens rapides kept", finalAside.includes('title="Liens rapides"')],
  ["Right Approvisionnement removed", !finalAside.includes('title="Approvisionnement"')],
  ["Dossier sélectionné removed", !finalAside.includes('title="Dossier sélectionné"')],
  ["Operational summary kept", content.includes('title="Synthèse opérationnelle du produit"')],
  ["Operational summary Approvisionnement card kept", content.includes('title="Approvisionnement"')],
  ["Order lines delivery kept", content.includes('title="Lignes de commande du produit"')],
];

console.table(checks.map(([label, ok]) => ({ label, ok })));

const failed = checks.filter(([, ok]) => !ok);

if (failed.length > 0) {
  fail("Vérifications échouées.");
}

write(sheetPath, content);

write(
  reportPath,
  [
    "# AMARKHYS-PRODUCT-HUB-RIGHT-COLUMN-CLEANUP-A3",
    "",
    "## Objectif",
    "",
    "Supprimer les blocs Approvisionnement et Dossier sélectionné de la colonne droite.",
    "",
    "## Suppressions",
    "",
    "- Approvisionnement colonne droite",
    "- Dossier sélectionné",
    "",
    "## Conservé",
    "",
    "- Liens rapides",
    "- Synthèse opérationnelle du produit",
    "- Carte Approvisionnement dans la synthèse",
    "- Lignes de commande du produit",
    "",
    "## Hors périmètre",
    "",
    "- Aucun changement loader.",
    "- Aucun changement moteur stock.",
    "- Aucun changement mutation stock.",
    "- Aucun changement navigation.",
    "",
  ].join("\n")
);

console.log("[OK] AMARKHYS-PRODUCT-HUB-RIGHT-COLUMN-CLEANUP-A3 applied");