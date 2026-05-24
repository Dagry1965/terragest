const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "lignesinterventionauto",
  "lignesinterventionauto.module.ts"
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

backup(target, "q20h5c-b1-remove-line-action");

let content = read(target);

if (content.includes(`key: "retirer-ligne"`)) {
  console.log("[SKIP] Action retirer-ligne déjà présente.");
  process.exit(0);
}

const anchor = `  workflows: [`;

if (!content.includes(anchor)) {
  throw new Error("Bloc workflows introuvable.");
}

const actionsBlock = `  actions: [
    {
      key: "retirer-ligne",
      label: "Retirer la ligne",
      type: "danger",
      runtimeOnly: true,
      permission: "lignesinterventionauto:update",
    },
  ],

`;

content = content.replace(anchor, actionsBlock + anchor);

write(target, content);

console.log("");
console.log("[Q20H5C_B1_DONE] Action runtimeOnly Retirer la ligne ajoutée au module.");
console.log("");
console.log("Next:");
console.log("  pnpm build");