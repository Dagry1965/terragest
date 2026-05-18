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
  .replaceAll("Ã‰mise", "Émise")
  .replaceAll("AnnulÃ©e", "Annulée")
  .replaceAll("PayÃ©", "Payé")
  .replaceAll("NumÃ©ro facture", "Numéro facture")
  .replaceAll("Montant payÃ©", "Montant payé")
  .replaceAll("Reste Ã payer", "Reste à payer")
  .replaceAll("Reste Ã  payer", "Reste à payer")
  .replaceAll("EspÃ¨ces", "Espèces")
  .replaceAll("VÃ©hicule", "Véhicule")
  .replaceAll("Relations mÃ©tier", "Relations métier");

if (content === before) {
  console.log("NO CHANGE");
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED facturesauto.module.ts encoding");