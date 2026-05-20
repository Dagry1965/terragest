const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(
  root,
  "src",
  "components",
  "erp",
  "runtime",
  "ERPRuntimeDetails.tsx"
);

if (!fs.existsSync(file)) {
  throw new Error(`Fichier introuvable: ${file}`);
}

let content = fs.readFileSync(file, "utf8");

const backup = `${file}.bak-q11e-remove-metadata-slug`;
fs.writeFileSync(backup, content, "utf8");

console.log("BACKUP:", backup);

content = content.replace(/\s+module\.metadata\?\.slug \?\?/g, "");

fs.writeFileSync(file, content, "utf8");

console.log("OK: module.metadata?.slug supprimé de ERPRuntimeDetails.tsx");