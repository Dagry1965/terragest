const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const loaderFile = path.join(
  ROOT,
  "src",
  "runtime",
  "modules",
  "lifecycle",
  "ERPRelationDataLoader.ts"
);

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(filePath, content.replace(/\r\n/g, "\n"), "utf8");
  console.log("[WRITTEN]", path.relative(ROOT, filePath));
}

function backup(filePath) {
  const backupPath = filePath + ".bak-q16c1e-produitsauto-label";

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
    console.log("[BACKUP]", path.relative(ROOT, backupPath));
  }
}

backup(loaderFile);

let content = read(loaderFile);

if (content.includes("Q16C1E_PRODUITSAUTO_LABEL")) {
  console.log("[SKIP] produitsauto relation label already patched");
  process.exit(0);
}

const marker = `    if (normalizedModuleKey === "stocksauto") {`;

const block = `    // Q16C1E_PRODUITSAUTO_LABEL
    // Libellé métier pour produitsauto, utilisé notamment par parentProductId.
    // Exemple attendu : HUI-5W40 · Huile moteur 5W40
    if (normalizedModuleKey === "produitsauto") {
      const productLabel = compact(
        value("reference"),
        value("nom") ||
          value("designation") ||
          value("libelle") ||
          value("produit"),
        value("marque")
      );

      if (productLabel) {
        return productLabel;
      }
    }

`;

if (!content.includes(marker)) {
  throw new Error(
    '[Q16C1E] Marqueur "stocksauto" introuvable dans ERPRelationDataLoader.ts'
  );
}

content = content.replace(marker, block + marker);

write(loaderFile, content);

console.log("");
console.log("[Q16C1E_DONE] Libellé relationnel produitsauto renforcé.");
console.log("");
console.log("Next:");
console.log("  pnpm build");