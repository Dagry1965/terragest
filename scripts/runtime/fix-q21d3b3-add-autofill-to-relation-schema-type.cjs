const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/runtime/modules/schemas/ERPModuleSchema.ts";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21d3b3-relation-autofill-type`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21d3b3-relation-autofill-type`);
}

let content = fs.readFileSync(file, "utf8");

if (content.includes("Q21D3B3_RELATION_AUTOFILL_TYPE")) {
  console.log("[SKIP] relation.autoFill type already installed.");
  process.exit(0);
}

const marker = `      labelField?: string;`;

if (!content.includes(marker)) {
  console.error("[ERROR] Cannot locate relation labelField marker.");
  process.exit(1);
}

content = content.replace(
  marker,
  `${marker}

      /**
       * Q21D3B3_RELATION_AUTOFILL_TYPE
       * Declarative relation autofill executed by RuntimeAutoFillEngine.
       * Example: produitId -> designation / prixUnitaireHT.
       */
      autoFill?: RuntimeRelationAutoFillConfig;`
);

fs.writeFileSync(file, content, "utf8");

console.log("[Q21D3B3_TYPE_DONE] relation.autoFill type added to ERPModuleSchema.");
console.log("Next:");
console.log("  pnpm build");