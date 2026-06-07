const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "facturesauto",
  "facturesauto.module.ts"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");
const before = content;

content = content
  .replaceAll("Émise", "Émise")
  .replaceAll("Annulée", "Annulée")
  .replaceAll("Payé", "Payé")
  .replaceAll("Numéro facture", "Numéro facture")
  .replaceAll("Montant payé", "Montant payé")
  .replaceAll("Reste àpayer", "Reste à payer")
  .replaceAll("Reste à payer", "Reste à payer")
  .replaceAll("Espèces", "Espèces")
  .replaceAll("Véhicule", "Véhicule")
  .replaceAll("Relations métier", "Relations métier");

if (content === before) {
  console.log("NO CHANGE");
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED facturesauto.module.ts encoding");