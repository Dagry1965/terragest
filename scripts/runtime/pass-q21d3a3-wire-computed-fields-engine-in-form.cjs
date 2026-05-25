const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21d3a3-wire-computed-fields-engine`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21d3a3-wire-computed-fields-engine`);
}

let content = fs.readFileSync(file, "utf8");

if (content.includes("Q21D3A3_COMPUTED_FIELDS_ENGINE")) {
  console.log("[SKIP] Q21D-3A3 already installed.");
  process.exit(0);
}

const computedImport =
  `import { RuntimeComputedFieldsEngine } from "@/runtime/computed";`;

if (!content.includes(computedImport)) {
  const importMarker =
    `import { RuntimeStatusGovernanceEngine } from "@/runtime/status";`;

  if (!content.includes(importMarker)) {
    console.error("[ERROR] Cannot locate RuntimeStatusGovernanceEngine import marker.");
    process.exit(1);
  }

  content = content.replace(
    importMarker,
    `${importMarker}
${computedImport}`
  );
}

const oldBlock = `      const autoFilledValues =
        applyRelationAutoFill(
          nextValues,
          context
        );

      if (
        module.metadata.key === "lignesinterventionauto" &&
        [
          "quantite",
          "prixUnitaire",
          "prixUnitaireHT",
          "tauxTVA",
          "produitId",
        ].includes(key)
      ) {
        return applyLineItemFormCalculations(autoFilledValues);
      }

      return autoFilledValues;`;

if (!content.includes(oldBlock)) {
  console.error("[ERROR] Cannot locate autoFilledValues block in handleFieldChange.");
  process.exit(1);
}

const newBlock = `      const autoFilledValues =
        applyRelationAutoFill(
          nextValues,
          context
        );

      // Q21D3A3_COMPUTED_FIELDS_ENGINE
      // Generic metadata-driven computed fields.
      // The form updates values; RuntimeComputedFieldsEngine applies module.composition.computedFields.
      const computedResult =
        RuntimeComputedFieldsEngine.apply({
          module,
          values: autoFilledValues,
        });

      const computedValues =
        computedResult.values;

      if (
        module.metadata.key === "lignesinterventionauto" &&
        [
          "quantite",
          "prixUnitaire",
          "prixUnitaireHT",
          "tauxTVA",
          "produitId",
        ].includes(key)
      ) {
        return applyLineItemFormCalculations(computedValues);
      }

      return computedValues;`;

content = content.replace(oldBlock, newBlock);

fs.writeFileSync(file, content, "utf8");

console.log("[Q21D3A3_DONE] RuntimeComputedFieldsEngine wired into ERPEnterpriseForm.");
console.log("Next:");
console.log("  Select-String verification");
console.log("  pnpm build");