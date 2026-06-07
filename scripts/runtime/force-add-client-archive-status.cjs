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
const before = content;

if (!content.includes('value:"archive"') && !content.includes('value: "archive"')) {
  content = content.replace(
    `            {
              label:"Inactif",
              value:"inactif"
            }`,
    `            {
              label:"Inactif",
              value:"inactif"
            },
            {
              label:"Archivé",
              value:"archive"
            }`
  );
}

/**
 * Fallback encore plus direct si le format exact ne matche pas.
 */
if (!content.includes('value:"archive"') && !content.includes('value: "archive"')) {
  content = content.replace(
    `              value:"inactif"
            }`,
    `              value:"inactif"
            },
            {
              label:"Archivé",
              value:"archive"
            }`
  );
}

content = content
  .replaceAll("Prénom", "Prénom")
  .replaceAll("Téléphone", "Téléphone")
  .replaceAll("Côte d'Ivoire", "Côte d'Ivoire")
  .replaceAll("Identité", "Identité")
  .replaceAll("Désactiver", "Désactiver");

if (content === before) {
  console.log("NO CHANGE");
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED clientsauto.module.ts");
console.log("DONE force add client archive status");