/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(...parts) {
  return path.join(root, ...parts);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function backup(file, suffix) {
  const target = `${file}.bak-${suffix}`;
  if (!fs.existsSync(target)) {
    fs.copyFileSync(file, target);
    console.log(`[BACKUP] ${path.relative(root, target)}`);
  }
}

function findObjectBlock(content, keyNeedle) {
  const keyIndex = content.indexOf(keyNeedle);

  if (keyIndex < 0) {
    throw new Error(`Champ introuvable: ${keyNeedle}`);
  }

  let start = keyIndex;

  while (start >= 0 && content[start] !== "{") {
    start -= 1;
  }

  if (start < 0) {
    throw new Error(`Début objet introuvable pour: ${keyNeedle}`);
  }

  let depth = 0;

  for (let index = start; index < content.length; index += 1) {
    const char = content[index];

    if (char === "{") {
      depth += 1;
    }

    if (char === "}") {
      depth -= 1;

      if (depth === 0) {
        let end = index + 1;

        while (
          end < content.length &&
          (content[end] === "," ||
            content[end] === "\r" ||
            content[end] === "\n" ||
            content[end] === " ")
        ) {
          if (content[end] === ",") {
            end += 1;
            break;
          }

          end += 1;
        }

        return {
          start,
          end,
          block: content.slice(start, end),
        };
      }
    }
  }

  throw new Error(`Fin objet introuvable pour: ${keyNeedle}`);
}

function patchProduitIdAutoFill() {
  const file = p(
    "src",
    "runtime",
    "modules",
    "generated",
    "lignesinterventionauto",
    "lignesinterventionauto.module.ts"
  );

  backup(file, "q16c2c2-product-autofill");

  let content = read(file);

  if (content.includes("autoFill: {") && content.includes('produitCode: ["code", "reference"]')) {
    console.log("[SKIP] autoFill produitId déjà présent");
    return;
  }

  const found = findObjectBlock(content, 'key: "produitId"');

  const newBlock = `{
        key: "produitId",
        label: "Produit / pièce",
        type: "relation",
        relation: { module: "produitsauto" },
        autoFill: {
          map: {
            produitCode: ["code", "reference"],
            produitNom: ["nom", "designation"],
            designation: ["nom", "designation"],
            typeArticle: ["typeArticle"],
            typeLigne: ["typeArticle"],
            prixUnitaireHT: ["prixPromo", "prixUnitaireHT", "prixVente", "prixUnitaire"],
            prixUnitaire: ["prixPromo", "prixUnitaireHT", "prixVente", "prixUnitaire"],
            tauxTVA: ["tauxTVA"],
          },
          recalculate: true,
        },
        searchable: true,
        list: { order: 2 },
        grid: { cols: 6 },
      },`;

  content =
    content.slice(0, found.start) +
    newBlock +
    content.slice(found.end);

  write(file, content);

  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function main() {
  console.log("");
  console.log("[PASS] 2N-Q16C2C2 - Fix produitId autoFill module");
  patchProduitIdAutoFill();

  console.log("");
  console.log("[Q16C2C2_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  tester choix produit -> prix/TVA/montants visibles");
}

main();