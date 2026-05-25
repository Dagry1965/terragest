const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/runtime/modules/ERPModule.ts";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21d3a2-computed-fields-type`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21d3a2-computed-fields-type`);
}

let content = fs.readFileSync(file, "utf8");

if (content.includes("computedFields?:")) {
  console.log("[SKIP] computedFields already exists in ERPModuleComposition.");
  process.exit(0);
}

const marker = `  readOnlyFields?: string[];`;

if (!content.includes(marker)) {
  console.error("[ERROR] Cannot locate readOnlyFields marker in ERPModuleComposition.");
  process.exit(1);
}

content = content.replace(
  marker,
  `${marker}

  /**
   * Q21D3A2_COMPUTED_FIELDS_METADATA
   * Declarative computed fields executed by RuntimeComputedFieldsEngine.
   * Modules declare formulas; forms and pages must not hardcode calculations.
   */
  computedFields?: Array<{
    target: string;
    formula: "multiply" | "taxIncluded" | "taxAmount" | "add" | "subtract";
    sources: string[];
    round?: number;
    defaultValue?: number;
  }>;`
);

fs.writeFileSync(file, content, "utf8");

console.log("[Q21D3A2_TYPE_DONE] ERPModuleComposition now supports computedFields.");
console.log("Next: pnpm build");