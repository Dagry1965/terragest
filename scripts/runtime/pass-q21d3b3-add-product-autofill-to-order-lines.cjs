const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21d3b3-product-autofill`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21d3b3-product-autofill`);
}

let content = fs.readFileSync(file, "utf8");

if (content.includes("Q21D3B3_PRODUCT_AUTOFILL")) {
  console.log("[SKIP] Q21D-3B3 already installed.");
  process.exit(0);
}

const oldBlock = `        relation: { module: "produitsauto" },
        required: true,
        searchable: true,`;

if (!content.includes(oldBlock)) {
  console.error("[ERROR] Cannot locate produitId simple relation block.");
  process.exit(1);
}

const newBlock = `        relation: {
          module: "produitsauto",
          // Q21D3B3_PRODUCT_AUTOFILL
          // Product is the source of designation and purchase price.
          autoFill: {
            map: {
              designation: ["nom", "designation", "reference", "code"],
              prixUnitaireHT: ["prixAchat"],
            },
            recalculate: false,
          },
        },
        required: true,
        searchable: true,`;

content = content.replace(oldBlock, newBlock);

fs.writeFileSync(file, content, "utf8");

console.log("[Q21D3B3_DONE] produitId autofill added to lignescommandestockauto.");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm audit:local");