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

backup(target, "q20h5c-c-hide-delete-line-items");

let content = read(target);

if (content.includes(`"lignesinterventionauto",`)) {
  console.log("[SKIP] lignesinterventionauto déjà sensible.");
} else {
  content = content.replace(
`      "echeancespaiementauto",
    ].includes(module.metadata.key);`,
`      "echeancespaiementauto",
      "lignesinterventionauto",
    ].includes(module.metadata.key);`
  );
}

content = content.replace(
`                Suppression masquée pour ce module sensible. Utilisez l’action métier
                d’archivage ou d’annulation afin de conserver l’historique.`,
`                Suppression masquée pour préserver l’historique. Utilisez l’action métier
                adaptée, comme “Retirer la ligne”, afin que le stock, les totaux et
                la traçabilité soient corrigés proprement.`
);

write(target, content);

console.log("");
console.log("[Q20H5C_C_DONE] Suppression masquée pour lignesinterventionauto.");
console.log("");
console.log("Next:");
console.log("  pnpm build");