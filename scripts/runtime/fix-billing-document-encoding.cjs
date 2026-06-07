const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = [
  path.join(root, "src", "components", "erp", "billing", "InvoiceDocumentActions.tsx"),
  path.join(root, "src", "components", "erp", "billing", "PaymentReceiptActions.tsx"),
];

const replacements = [
  ["Payée", "Payée"],
  ["Payé", "Payé"],
  ["Annulée", "Annulée"],
  ["Annulé", "Annulé"],
  ["Validé", "Validé"],
  ["Rejeté", "Rejeté"],
  ["Espèces", "Espèces"],
  ["Chèque", "Chèque"],
  ["Référence", "Référence"],
  ["Véhicule", "Véhicule"],
  ["véhicule", "véhicule"],
  ["Client non renseigné", "Client non renseigné"],
  ["Véhicule non renseigné", "Véhicule non renseigné"],
  ["Intervention non renseignée", "Intervention non renseignée"],
  [""¢", "•"],
  ["'", "’"],
  ["é", "é"],
  ["è", "è"],
  ["ê", "ê"],
  ["à", "à"],
  ["ô", "ô"],
  ["É", "É"],
  ["À", "À"],
  ["Â", ""],
];

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.log("SKIP missing " + path.relative(root, file));
    continue;
  }

  let content = fs.readFileSync(file, "utf8");
  const before = content;

  for (const [bad, good] of replacements) {
    content = content.split(bad).join(good);
  }

  if (content !== before) {
    fs.writeFileSync(file, content, { encoding: "utf8" });
    console.log("UPDATED " + path.relative(root, file));
  } else {
    console.log("UNCHANGED " + path.relative(root, file));
  }
}

console.log("DONE fix billing document encoding");