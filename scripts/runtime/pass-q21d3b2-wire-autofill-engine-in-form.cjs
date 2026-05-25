const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21d3b2-wire-autofill-engine`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21d3b2-wire-autofill-engine`);
}

let content = fs.readFileSync(file, "utf8");

if (content.includes("Q21D3B2_AUTOFILL_ENGINE")) {
  console.log("[SKIP] Q21D-3B2 already installed.");
  process.exit(0);
}

const computedImport =
  `import { RuntimeComputedFieldsEngine } from "@/runtime/computed";`;

const autoFillImport =
  `import { RuntimeAutoFillEngine } from "@/runtime/autofill";`;

if (!content.includes(autoFillImport)) {
  if (!content.includes(computedImport)) {
    console.error("[ERROR] Cannot locate RuntimeComputedFieldsEngine import marker.");
    process.exit(1);
  }

  content = content.replace(
    computedImport,
    `${computedImport}
${autoFillImport}`
  );
}

const oldBlock = `    const nextValues = {
      ...currentValues,
    };

    for (const [targetField, sourceFields] of Object.entries(autoFillConfig.map)) {
      const value =
        resolveAutoFillValue(
          record,
          sourceFields
        );

      if (
        value !== undefined &&
        value !== null
      ) {
        nextValues[targetField] = value;
      }
    }

    return autoFillConfig.recalculate
      ? applyLineItemFormCalculations(nextValues)
      : nextValues;`;

if (!content.includes(oldBlock)) {
  console.error("[ERROR] Cannot locate exact applyRelationAutoFill mapping block.");
  process.exit(1);
}

const newBlock = `    // Q21D3B2_AUTOFILL_ENGINE
    // Generic metadata-driven autofill.
    // The form extracts the relation context; RuntimeAutoFillEngine applies the mapping.
    const autoFillResult =
      RuntimeAutoFillEngine.apply({
        values: currentValues,
        selectedRecord: record,
        autoFill: autoFillConfig,
      });

    return autoFillConfig.recalculate
      ? applyLineItemFormCalculations(autoFillResult.values)
      : autoFillResult.values;`;

content = content.replace(oldBlock, newBlock);

fs.writeFileSync(file, content, "utf8");

console.log("[Q21D3B2_DONE] ERPEnterpriseForm now delegates autofill mapping to RuntimeAutoFillEngine.");
console.log("Next:");
console.log("  Select-String verification");
console.log("  pnpm build");