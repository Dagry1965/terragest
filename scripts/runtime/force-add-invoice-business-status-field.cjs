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

if (!content.includes('key: "statutFacture"')) {
  const marker = `      {
        key: "statutPaiement",
        label: "Statut paiement",
        type: "select",
        defaultValue: "en_attente",`;

  if (!content.includes(marker)) {
    console.error("statutPaiement marker not found");
    process.exit(1);
  }

  const statutFactureField = `      {
        key: "statutFacture",
        label: "Statut facture",
        type: "select",
        defaultValue: "emise",
        options: [
          { label: "Brouillon", value: "brouillon" },
          { label: "Émise", value: "emise" },
          { label: "Annulée", value: "annulee" },
        ],
        list: { order: 3 },
        grid: { cols: 4 },
      },
`;

  content = content.replace(
    marker,
    statutFactureField + marker
  );
}

content = content
  .replaceAll("NumÃ©ro facture", "Numéro facture")
  .replaceAll("PayÃ©", "Payé")
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

console.log("UPDATED facturesauto.module.ts");
console.log("DONE force add invoice business status field");