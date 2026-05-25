const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21d3a2-computed-fields-metadata`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21d3a2-computed-fields-metadata`);
}

let content = fs.readFileSync(file, "utf8");

if (content.includes("Q21D3A2_ORDER_LINE_COMPUTED_FIELDS")) {
  console.log("[SKIP] Q21D-3A2 already installed.");
  process.exit(0);
}

const compositionMarker = `  composition: {`;

if (!content.includes(compositionMarker)) {
  console.error("[ERROR] Cannot locate composition block.");
  process.exit(1);
}

content = content.replace(
  compositionMarker,
  `  composition: {
    // Q21D3A2_ORDER_LINE_COMPUTED_FIELDS
    // Metadata-driven computed fields.
    // The runtime engine calculates these values; the form must not recalculate locally.
    computedFields: [
      {
        target: "montantHT",
        formula: "multiply",
        sources: ["quantiteCommandee", "prixUnitaireHT"],
        round: 2,
        defaultValue: 0,
      },
      {
        target: "montantTTC",
        formula: "taxIncluded",
        sources: ["montantHT", "tauxTVA"],
        round: 2,
        defaultValue: 0,
      },
    ],`
);

// Ensure computed fields are read-only at metadata level.
if (content.includes(`readOnlyFields: [`)) {
  content = content.replace(
    /readOnlyFields:\s*\[([\s\S]*?)\]/,
    (match, inner) => {
      const fields = new Set(
        inner
          .split(",")
          .map((item) => item.replace(/["'\s]/g, ""))
          .filter(Boolean)
      );

      fields.add("montantHT");
      fields.add("montantTTC");

      return `readOnlyFields: [${Array.from(fields)
        .map((field) => `"${field}"`)
        .join(", ")}]`;
    }
  );
} else {
  content = content.replace(
    `computedFields: [`,
    `readOnlyFields: ["designation", "montantHT", "montantTTC"],

    computedFields: [`
  );
}

fs.writeFileSync(file, content, "utf8");

console.log("[Q21D3A2_DONE] Computed fields metadata added to lignescommandestockauto.");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm audit:local");