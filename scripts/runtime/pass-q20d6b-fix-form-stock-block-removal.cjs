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

const backup = `${target}.bak-q20d6-remove-form-stock-double-processing`;

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function copyBackupBack() {
  if (!fs.existsSync(backup)) {
    throw new Error(`Backup Q20D6 introuvable: ${backup}`);
  }

  fs.copyFileSync(backup, target);
  console.log(`[RESTORED] ${path.relative(root, target)} depuis ${path.relative(root, backup)}`);
}

if (!fs.existsSync(target)) {
  throw new Error(`Fichier introuvable: ${target}`);
}

copyBackupBack();

let content = read(target);

const startMarker = `        // Q20D3_PROCESS_STOCK_AFTER_LINE_SAVE`;
const endMarker = `      }

      if (workflowAction && savedRecord) {`;

const start = content.indexOf(startMarker);

if (start === -1) {
  console.log("[SKIP] Bloc Q20D3 introuvable après restauration.");
  process.exit(0);
}

const end = content.indexOf(endMarker, start);

if (end === -1) {
  throw new Error("Fin du bloc Q20D3 introuvable. Inspection manuelle nécessaire.");
}

content =
  content.slice(0, start) +
  endMarker +
  content.slice(end + endMarker.length);

write(target, content);

console.log("");
console.log("[Q20D6B_DONE] ERPEnterpriseForm restauré puis double traitement stock retiré proprement.");
console.log("");
console.log("Next:");
console.log("  pnpm build");