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
  ["Payée", "Payée"],
  ["Payé", "Payé"],
  ["Annulée", "Annulée"],
  ["Annulé", "Annulé"],
  ["Client non renseigné", "Client non renseigné"],
  ["Véhicule non renseigné", "Véhicule non renseigné"],
  ["Véhicule", "Véhicule"],
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

for (const [bad, good] of replacements) {
  content = content.split(bad).join(good);
}

if (content === before) {
  console.log("NO CHANGE");
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED src/app/facture/[token]/page.tsx encoding");