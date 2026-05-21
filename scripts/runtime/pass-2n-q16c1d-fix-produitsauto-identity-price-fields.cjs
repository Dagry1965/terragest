const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const file = path.join(
  ROOT,
  "src",
  "runtime",
  "modules",
  "generated",
  "produitsauto",
  "produitsauto.module.ts"
);

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(filePath, content.replace(/\r\n/g, "\n"), "utf8");
  console.log("[WRITTEN]", path.relative(ROOT, filePath));
}

function backup(filePath) {
  const backupPath = filePath + ".bak-q16c1d-fix-form-fields";
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
    console.log("[BACKUP]", path.relative(ROOT, backupPath));
  }
}

function replaceExact(content, oldBlock, newBlock, label) {
  if (!content.includes(oldBlock)) {
    console.log("[WARN] bloc introuvable:", label);
    return content;
  }

  return content.replace(oldBlock, newBlock);
}

backup(file);

let content = read(file);

content = replaceExact(
  content,
`        fields: [
          "reference",
          "nom",
          "marque",
          "categorie",
          "typeProduit",
          "unite",
          "statut",
        ],`,
`        fields: [
          "reference",
          "nom",
          "marque",
          "typeRecord",
          "parentProductId",
          "typeArticle",
          "categorie",
          "sousCategorie",
          "typeProduit",
          "stockable",
          "unite",
          "statut",
        ],`,
  "tab identite fields"
);

content = replaceExact(
  content,
`            fields: [
              "reference",
              "nom",
              "marque",
              "categorie",
              "typeProduit",
              "unite",
              "statut",
            ],`,
`            fields: [
              "reference",
              "nom",
              "marque",
              "typeRecord",
              "parentProductId",
              "typeArticle",
              "categorie",
              "sousCategorie",
              "typeProduit",
              "stockable",
              "unite",
              "statut",
            ],`,
  "section infos fields"
);

content = replaceExact(
  content,
`        fields: [
          "prixAchat",
          "prixVente",
          "seuilMinimum",
        ],`,
`        fields: [
          "prixAchat",
          "prixVente",
          "tauxTVA",
          "prixPromo",
          "seuilMinimum",
        ],`,
  "tab prix fields"
);

content = replaceExact(
  content,
`            fields: [
              "prixAchat",
              "prixVente",
              "seuilMinimum",
            ],`,
`            fields: [
              "prixAchat",
              "prixVente",
              "tauxTVA",
              "prixPromo",
              "seuilMinimum",
            ],`,
  "section tarifs fields"
);

write(file, content);

console.log("");
console.log("[Q16C1D_DONE] Champs catalogue ajoutés aux onglets Identité/Prix.");
console.log("");
console.log("Next:");
console.log("  pnpm build");