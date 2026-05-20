const fs = require("fs");
const os = require("os");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "lifecycle",
  "ERPRelationDataLoader.ts"
);

if (!fs.existsSync(file)) {
  throw new Error(`Fichier introuvable: ${file}`);
}

const backupDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "terragest-relation-labels-")
);

const backupFile = path.join(
  backupDir,
  "ERPRelationDataLoader.ts.bak"
);

let content = fs.readFileSync(file, "utf8");
fs.writeFileSync(backupFile, content, "utf8");

console.log("BACKUP:", backupFile);

// 1. Corrige le séparateur mojibake éventuel.
content = content.replace(/join\(" Â· "\)/g, `join(" · ")`);
content = content.replace(/Â·/g, "·");

// 2. Ajoute les alias produits/stocks si absents.
if (!content.includes("produitsauto: [")) {
  content = content.replace(
    `  vehicules: [
    "vehicules",
    "vehiculesauto",
  ],`,
    `  vehicules: [
    "vehicules",
    "vehiculesauto",
  ],
  produitsauto: [
    "produitsauto",
    "produits",
  ],
  stocksauto: [
    "stocksauto",
    "stocks",
  ],`
  );
}

// 3. Insère un label produit/stock AVANT le bloc factureNumber.
// Important : actuellement "reference" court-circuite les produits.
if (!content.includes("const productPrimaryLabel =")) {
  const marker = `    const factureNumber =
      numeroFacture ||
      referenceTransaction ||
      referencePaiement ||
      reference ||
      numero;

    if (factureNumber) {`;

  const productBlock = `    const productPrimaryLabel =
      value("nom") ||
      value("designation") ||
      value("produit");

    const productBrand =
      value("marque");

    if (productPrimaryLabel && (reference || productBrand)) {
      return compact(
        productPrimaryLabel,
        productBrand,
        reference ? "Réf. " + reference : ""
      );
    }

    const stockLocation =
      value("emplacement");

    const stockType =
      value("typeStock");

    const stockQuantity =
      value("quantite");

    if (stockLocation || stockType) {
      return compact(
        stockLocation,
        stockType,
        stockQuantity ? stockQuantity + " unité(s)" : ""
      );
    }

    const factureNumber =
      numeroFacture ||
      referenceTransaction ||
      referencePaiement ||
      reference ||
      numero;

    if (factureNumber) {`;

  if (!content.includes(marker)) {
    throw new Error("Marqueur factureNumber introuvable.");
  }

  content = content.replace(marker, productBlock);
}

// 4. Améliore le label véhicule pour garder un format propre.
content = content.replace(
  `    const vehiculeLabel =
      compact(
        compact(marque || vehicule, modele),
        immatriculation
      );`,
  `    const vehiculeLabel =
      compact(
        compact(marque || vehicule, modele),
        immatriculation
      );`
);

// 5. Améliore le label personne : prénom/nom/codeClient, sans casser l'existant.
content = content.replace(
  `    const personneLabel =
      compact(
        compact(prenom, nom),
        codeClient
      );`,
  `    const personneLabel =
      compact(
        compact(prenom, nom),
        codeClient
      );`
);

fs.writeFileSync(file, content, "utf8");

console.log("OK: libellés relationnels produits/stocks renforcés.");