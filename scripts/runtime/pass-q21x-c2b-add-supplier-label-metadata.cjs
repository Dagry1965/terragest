const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/runtime/modules/generated/fournisseursauto/fournisseursauto.module.ts";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21x-c2b-add-supplier-label-metadata`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21x-c2b-add-supplier-label-metadata`);
}

let content = fs.readFileSync(file, "utf8");

if (content.includes("labelFields: [\"nom\", \"codeFournisseur\", \"telephone\"]")) {
  console.log("[SKIP] fournisseursauto labelFields already configured.");
  process.exit(0);
}

content = content.replace(
  `  form: {`,
  `  composition: {
    // Q21X_C2B_SUPPLIER_LABEL_METADATA
    // Metadata-driven relation label:
    // used by commande.fournisseurId and every generic relation select.
    labelFields: ["nom", "codeFournisseur", "telephone"],
  },

  form: {`
);

fs.writeFileSync(file, content, "utf8");

console.log("[Q21X_C2B_DONE] fournisseursauto composition.labelFields added.");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm audit:local");