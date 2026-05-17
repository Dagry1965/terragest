const fs = require("fs");
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
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");

const before = content;

/**
 * Client label:
 * before: prénom • nom • téléphone • email
 * after: prénom nom / raison sociale / nom / codeClient
 */
content = content.replace(
  `    if (personneLabel) {
      return compact(
        personneLabel,
        telephone || phone,
        email
      );
    }

    if (raisonSociale) {
      return compact(
        raisonSociale,
        telephone || phone,
        email
      );
    }

    if (nom) {
      return compact(
        nom,
        telephone || phone,
        email
      );
    }

    if (codeClient) {
      return compact(
        codeClient,
        telephone || phone,
        email
      );
    }`,
  `    if (personneLabel) {
      return personneLabel;
    }

    if (raisonSociale) {
      return raisonSociale;
    }

    if (nom) {
      return nom;
    }

    if (codeClient) {
      return codeClient;
    }`
);

/**
 * Vehicle label:
 * before: marque • modele • immatriculation
 * after: marque modele
 */
content = content.replace(
  `    const vehiculeLabel =
      compact(
        marque,
        modele,
        immatriculation
      );

    if (vehiculeLabel) {
      return vehiculeLabel;
    }`,
  `    const vehiculeLabel =
      [marque, modele]
        .filter(Boolean)
        .join(" ")
        .trim();

    if (vehiculeLabel) {
      return vehiculeLabel;
    }

    if (immatriculation) {
      return immatriculation;
    }`
);

/**
 * Invoice label:
 * before: facture • montant • payé • reste • statut • date
 * after: numéro facture only
 */
content = content.replace(
  `    if (factureNumber) {
      return compact(
        factureNumber,
        montantTTC,
        montantPaye ? "Payé " + montantPaye : "",
        resteAPayer ? "Reste " + resteAPayer : "",
        statutPaiement,
        dateFacture
      );
    }`,
  `    if (factureNumber) {
      return factureNumber;
    }`
);

if (content === before) {
  console.log("NO CHANGE");
  console.log("Inspect ERPRelationDataLoader.ts manually.");
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED src/runtime/modules/lifecycle/ERPRelationDataLoader.ts");
console.log("DONE simplify relation select labels");