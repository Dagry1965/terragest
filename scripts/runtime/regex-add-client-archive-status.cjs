const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "clientsauto",
  "clientsauto.module.ts"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");

if (
  content.includes('value:"archive"') ||
  content.includes('value: "archive"')
) {
  console.log("archive status already exists");
  process.exit(0);
}

const before = content;

content = content.replace(
  /(\{\s*label\s*:\s*"Inactif"\s*,\s*value\s*:\s*"inactif"\s*\})/,
  `$1,
            {
              label:"Archivé",
              value:"archive"
            }`
);

content = content
  .replaceAll("IdentitÃ©", "Identité")
  .replaceAll("PrÃ©nom", "Prénom")
  .replaceAll("TÃ©lÃ©phone", "Téléphone")
  .replaceAll("DÃ©sactiver", "Désactiver")
  .replaceAll("CÃ´te d'Ivoire", "Côte d'Ivoire");

if (content === before) {
  console.error("NO CHANGE - regex did not match.");
  console.error("Show the exact statut block:");
  console.error(
    'Get-Content ".\\\\src\\\\runtime\\\\modules\\\\generated\\\\clientsauto\\\\clientsauto.module.ts" | Select-Object -Skip 90 -First 45'
  );
  process.exit(1);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED clientsauto.module.ts");
console.log("DONE regex add client archive status");