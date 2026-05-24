const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPEnterpriseForm.tsx"
);

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function backup(file, suffix) {
  const backupPath = `${file}.bak-${suffix}`;

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(file, backupPath);
    console.log(`[BACKUP] ${path.relative(root, backupPath)}`);
  }
}

if (!fs.existsSync(target)) {
  throw new Error(`Fichier introuvable: ${target}`);
}

backup(target, "q20d6-remove-form-stock-double-processing");

let content = read(target);

if (!content.includes("Q20D3_PROCESS_STOCK_AFTER_LINE_SAVE")) {
  console.log("[SKIP] Q20D3_PROCESS_STOCK_AFTER_LINE_SAVE introuvable. Rien à retirer.");
  process.exit(0);
}

const start = content.indexOf(`        // Q20D3_PROCESS_STOCK_AFTER_LINE_SAVE`);

if (start === -1) {
  throw new Error("Début du bloc Q20D3 introuvable.");
}

const endMarker = `      }`;

const afterStart = content.slice(start);
const localEnd = afterStart.indexOf(endMarker);

if (localEnd === -1) {
  throw new Error("Fin du bloc Q20D3 introuvable.");
}

const end = start + localEnd + endMarker.length;

// On retire uniquement le bloc Q20D3 interne.
// Le bloc parent lignesinterventionauto et la synchro totaux restent en place.
content =
  content.slice(0, start) +
  content.slice(end);

write(target, content);

console.log("");
console.log("[Q20D6_DONE] Double traitement stock côté ERPEnterpriseForm supprimé.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("");
console.log("Puis tester une nouvelle ligne validée : le stock doit décrémenter une seule fois.");