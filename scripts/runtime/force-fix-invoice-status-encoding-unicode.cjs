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

/**
 * Mojibake ciblé :
 * Ã‰mise   = \u00c3\u2030mise
 * AnnulÃ©e = Annul\u00c3\u00a9e
 * PayÃ©    = Pay\u00c3\u00a9
 */
content = content
  .replaceAll("\u00c3\u2030mise", "Émise")
  .replaceAll("Annul\u00c3\u00a9e", "Annulée")
  .replaceAll("Pay\u00c3\u00a9", "Payé")
  .replaceAll("Num\u00c3\u00a9ro facture", "Numéro facture")
  .replaceAll("Montant pay\u00c3\u00a9", "Montant payé")
  .replaceAll("Reste \u00c3\u00a0 payer", "Reste à payer")
  .replaceAll("Reste \u00c3  payer", "Reste à payer")
  .replaceAll("Esp\u00c3\u00a8ces", "Espèces")
  .replaceAll("V\u00c3\u00a9hicule", "Véhicule")
  .replaceAll("Relations m\u00c3\u00a9tier", "Relations métier");

if (content === before) {
  console.log("NO CHANGE");
  console.log("The exact bytes may differ. Showing suspicious lines:");
  content
    .split(/\r?\n/)
    .forEach((line, index) => {
      if (
        line.includes("mise") ||
        line.includes("Annul") ||
        line.includes("Pay")
      ) {
        console.log(`${index + 1}: ${line}`);
      }
    });
  process.exit(1);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED facturesauto.module.ts encoding with unicode-safe replacements");