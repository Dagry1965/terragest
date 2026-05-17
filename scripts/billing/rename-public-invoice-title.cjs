const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "app",
  "facture",
  "[token]",
  "page.tsx"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");

content = content.replaceAll(
  "Facture publique",
  "Votre facture AMARKHYS"
);

content = content.replaceAll(
  "Consultez le détail de votre facture, le montant payé et le reste à régler.",
  "Consultez le détail de votre facture, les montants réglés et le solde restant."
);

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED src/app/facture/[token]/page.tsx");
console.log("DONE rename public invoice title");