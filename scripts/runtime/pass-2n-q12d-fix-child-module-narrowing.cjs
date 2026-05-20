const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "components",
  "erp",
  "runtime",
  "ERPRelatedRecordsPanel.tsx"
);

if (!fs.existsSync(file)) {
  throw new Error(`Fichier introuvable: ${file}`);
}

let content = fs.readFileSync(file, "utf8");

const backup = `${file}.bak-q12d-fix-child-module-narrowing`;
fs.writeFileSync(backup, content, "utf8");

console.log("BACKUP:", backup);

const oldBlock = `    if (!parentRecordId || !childModule) {
      setRecords([]);
      setRelationLabels({});
      setLoading(false);
      return;
    }

    let mounted = true;`;

const newBlock = `    if (!parentRecordId || !childModule) {
      setRecords([]);
      setRelationLabels({});
      setLoading(false);
      return;
    }

    const moduleForLoad = childModule;

    let mounted = true;`;

if (!content.includes(oldBlock)) {
  throw new Error("Bloc childModule guard introuvable.");
}

content = content.replace(oldBlock, newBlock);

content = content.replace(
  "const data = await RuntimeDataBinding.list(childModule);",
  "const data = await RuntimeDataBinding.list(moduleForLoad);"
);

fs.writeFileSync(file, content, "utf8");

console.log("OK: narrowing childModule corrigé avec moduleForLoad.");