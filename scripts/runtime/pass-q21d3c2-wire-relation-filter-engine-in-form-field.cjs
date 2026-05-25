const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/forms/enterprise/ERPFormField.tsx";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21d3c2-wire-relation-filter-engine`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21d3c2-wire-relation-filter-engine`);
}

let content = fs.readFileSync(file, "utf8");

if (content.includes("Q21D3C2_RELATION_FILTER_ENGINE")) {
  console.log("[SKIP] Q21D-3C2 already installed.");
  process.exit(0);
}

const importMarker =
  `import { ERPRelationDataLoader } from "@/runtime/modules/lifecycle/ERPRelationDataLoader";`;

const engineImport =
  `import { RuntimeRelationFilterEngine } from "@/runtime/relations";`;

if (!content.includes(importMarker)) {
  console.error("[ERROR] Cannot locate ERPRelationDataLoader import marker.");
  process.exit(1);
}

if (!content.includes(engineImport)) {
  content = content.replace(
    importMarker,
    `${importMarker}
${engineImport}`
  );
}

const oldBlock = `    const filteredByContext =
      relationOptions.filter((option) => {
        if (
          !filterConfig?.sourceField ||
          !filterConfig?.targetField
        ) {
          return true;
        }

        const targetValue =
          option.record?.[filterConfig.targetField];

        if (!relationFilterSourceValue) {
          return filterConfig.includeEmptyTarget
            ? relationTargetIsEmpty(targetValue)
            : true;
        }

        return (
          String(targetValue ?? "") === String(relationFilterSourceValue) ||
          (
            Boolean(filterConfig.includeEmptyTarget) &&
            relationTargetIsEmpty(targetValue)
          )
        );
      });`;

if (!content.includes(oldBlock)) {
  console.error("[ERROR] Cannot locate exact local relation filter block.");
  process.exit(1);
}

const newBlock = `    // Q21D3C2_RELATION_FILTER_ENGINE
    // Generic metadata-driven relation filtering.
    // ERPFormField provides UI context; RuntimeRelationFilterEngine applies filterBy.
    const filteredByContext =
      RuntimeRelationFilterEngine.apply({
        options: relationOptions,
        filterBy: filterConfig,
        formValues,
      });`;

content = content.replace(oldBlock, newBlock);

fs.writeFileSync(file, content, "utf8");

console.log("[Q21D3C2_DONE] ERPFormField now delegates relation filtering to RuntimeRelationFilterEngine.");
console.log("Next:");
console.log("  Select-String verification");
console.log("  pnpm build");