const fs = require("fs");
const os = require("os");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "mouvementsstockauto",
  "mouvementsstockauto.module.ts"
);

if (!fs.existsSync(file)) {
  throw new Error(`Fichier introuvable: ${file}`);
}

const backupDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "terragest-q11f-precheck-b-")
);

const backupFile = path.join(
  backupDir,
  "mouvementsstockauto.module.ts.bak"
);

let content = fs.readFileSync(file, "utf8");
fs.writeFileSync(backupFile, content, "utf8");

console.log("BACKUP:", backupFile);

const technicalFields = [
  "sourceModule",
  "sourceId",
  "ligneInterventionId",
];

for (const field of technicalFields) {
  content = content.replace(
    new RegExp(`\\s*"${field}",\\n`, "g"),
    ""
  );
}

fs.writeFileSync(file, content, "utf8");

console.log("OK: champs techniques retirés du formulaire mouvementsstockauto.");