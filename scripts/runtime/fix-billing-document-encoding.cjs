const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = [
  path.join(root, "src", "components", "erp", "billing", "InvoiceDocumentActions.tsx"),
  path.join(root, "src", "components", "erp", "billing", "PaymentReceiptActions.tsx"),
];

const replacements = [
  ["PayÃ©e", "Payée"],
  ["PayÃ©", "Payé"],
  ["AnnulÃ©e", "Annulée"],
  ["AnnulÃ©", "Annulé"],
  ["ValidÃ©", "Validé"],
  ["RejetÃ©", "Rejeté"],
  ["EspÃ¨ces", "Espèces"],
  ["ChÃ¨que", "Chèque"],
  ["RÃ©fÃ©rence", "Référence"],
  ["VÃ©hicule", "Véhicule"],
  ["vÃ©hicule", "véhicule"],
  ["Client non renseignÃ©", "Client non renseigné"],
  ["Véhicule non renseignÃ©", "Véhicule non renseigné"],
  ["Intervention non renseignÃ©e", "Intervention non renseignée"],
  ["â€¢", "•"],
  ["â€™", "’"],
  ["Ã©", "é"],
  ["Ã¨", "è"],
  ["Ãª", "ê"],
  ["Ã ", "à"],
  ["Ã´", "ô"],
  ["Ã‰", "É"],
  ["Ã€", "À"],
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