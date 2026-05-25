const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q21d3d-line-product-stock-labels-v2";

function file(pathname) {
  return path.join(ROOT, pathname);
}

function read(pathname) {
  return fs.readFileSync(file(pathname), "utf8");
}

function write(pathname, content) {
  fs.writeFileSync(file(pathname), content, "utf8");
  console.log(`[WRITTEN] ${pathname}`);
}

function backup(pathname) {
  const src = file(pathname);
  const dest = file(`${pathname}.bak-${TAG}`);

  if (!fs.existsSync(dest)) {
    fs.copyFileSync(src, dest);
    console.log(`[BACKUP] ${pathname}.bak-${TAG}`);
  }
}

function replaceOrFail(content, search, replacement, label) {
  if (!content.includes(search)) {
    throw new Error(`[MISSING] ${label}`);
  }

  return content.replace(search, replacement);
}

const receptionModule =
  "src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts";

const stockModule =
  "src/runtime/modules/generated/stocksauto/stocksauto.module.ts";

backup(receptionModule);
backup(stockModule);

/**
 * 1) Reception stock:
 * ligneCommandeId transporte produitId + quantiteCommandee.
 */
let reception = read(receptionModule);

if (!reception.includes("Q21D3D_LINE_COMMAND_AUTOFILL_PRODUCT")) {
  reception = replaceOrFail(
    reception,
`          excludeUsedBy: {
            module: "receptionsstockauto",
            field: "ligneCommandeId",
          },
`,
`          excludeUsedBy: {
            module: "receptionsstockauto",
            field: "ligneCommandeId",
          },

          // Q21D3D_LINE_COMMAND_AUTOFILL_PRODUCT
          // The selected order line carries the product and ordered quantity.
          // RuntimeAutoFillEngine applies this generically from relation metadata.
          autoFill: {
            map: {
              produitId: ["produitId"],
              quantiteRecue: ["quantiteCommandee"],
            },
            recalculate: true,
          },
`,
    "add autoFill on receptionsstockauto.ligneCommandeId"
  );
}

/**
 * 2) Stocks:
 * Ajouter composition.labelFields avant workflows.
 */
let stock = read(stockModule);

if (!stock.includes("Q21D3D_STOCK_RELATION_LABEL_FIELDS")) {
  const compositionBlock = `
  composition: {
    // Q21D3D_STOCK_RELATION_LABEL_FIELDS
    // Relation labels are metadata-driven.
    // produitId is resolved by RuntimeRelationLabelEngine through ERPRelationDataLoader.
    labelFields: ["produitId", "emplacement", "typeStock", "quantite", "statut"],
  },

`;

  const workflowsRegex = /(\n\s*workflows\s*:\s*\[)/;

  if (workflowsRegex.test(stock)) {
    stock = stock.replace(workflowsRegex, "\n" + compositionBlock + "  workflows: [");
  } else {
    const closingRegex = /\n};\s*$/;

    if (!closingRegex.test(stock)) {
      throw new Error("[MISSING] stocksauto insertion point");
    }

    stock = stock.replace(
      closingRegex,
      `,

${compositionBlock}};`
    );
  }
}

write(receptionModule, reception);
write(stockModule, stock);

console.log("");
console.log("[Q21D_3D_DONE] Reception line -> product autofill and stock label metadata are declared.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm audit:local");
console.log("  Test:");
console.log("    /receptionsstockauto/nouveau");
console.log("    choisir commande -> ligne commande -> produit auto -> stock filtré avec label lisible");