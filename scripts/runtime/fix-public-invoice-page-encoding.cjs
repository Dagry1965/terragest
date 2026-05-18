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
const before = content;

const replacements = [
  ["PayÃ©e", "Payée"],
  ["PayÃ©", "Payé"],
  ["AnnulÃ©e", "Annulée"],
  ["AnnulÃ©", "Annulé"],
  ["Client non renseignÃ©", "Client non renseigné"],
  ["VÃ©hicule non renseignÃ©", "Véhicule non renseigné"],
  ["VÃ©hicule", "Véhicule"],
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

for (const [bad, good] of replacements) {
  content = content.split(bad).join(good);
}

if (content === before) {
  console.log("NO CHANGE");
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED src/app/facture/[token]/page.tsx encoding");