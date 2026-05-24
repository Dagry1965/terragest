const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21c-hide-reception-movement-field`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21c-hide-reception-movement-field`);
}

let content = fs.readFileSync(file, "utf8");

// Keep mouvementStockId in schema for runtime/audit,
// but remove it from visible form fields/tabs.
content = content.replaceAll(`          "mouvementStockId",\n`, "");
content = content.replaceAll(`              "mouvementStockId",\n`, "");

// Make the schema field clearly technical.
content = content.replace(
  `      {
        key: "mouvementStockId",
        label: "Mouvement stock",
        type: "relation",
        relation: { module: "mouvementsstockauto" },
        grid: { cols: 4 },
      },`,
  `      {
        key: "mouvementStockId",
        label: "Mouvement stock",
        type: "relation",
        relation: { module: "mouvementsstockauto" },
        grid: { cols: 4 },
        list: { visible: false },
      },
      {
        key: "stockProcessedAt",
        label: "Date traitement stock",
        type: "date",
        grid: { cols: 4 },
        list: { visible: false },
      },
      {
        key: "stockProcessedQuantity",
        label: "Quantite traitee stock",
        type: "number",
        grid: { cols: 4 },
        list: { visible: false },
      },`
);

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Reception stock technical movement fields hidden from form.");
console.log("Next: pnpm build");