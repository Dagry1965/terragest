const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/runtime/modules/lifecycle/ERPRelationDataLoader.ts";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21x-c3b-wire-relation-label-engine`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21x-c3b-wire-relation-label-engine`);
}

let content = fs.readFileSync(file, "utf8");

if (content.includes("Q21X_C3B_RELATION_LABEL_ENGINE_WIRED")) {
  console.log("[SKIP] Q21X-C3B already installed.");
  process.exit(0);
}

// 1) Add import
if (!content.includes('RuntimeRelationLabelEngine')) {
  const importMarker = `import { allERPModules } from "../definitions/coreModules";`;

  if (!content.includes(importMarker)) {
    console.error("[ERROR] Cannot locate allERPModules import marker.");
    process.exit(1);
  }

  content = content.replace(
    importMarker,
    `${importMarker}
import { RuntimeRelationLabelEngine } from "@/runtime/relations";`
  );
}

// 2) Insert engine call at the beginning of getLabel()
const getLabelMarker = `  static getLabel(
    record: Record<string, unknown>,
    moduleKey = ""
  ): string {
`;

if (!content.includes(getLabelMarker)) {
  console.error("[ERROR] Cannot locate getLabel() marker.");
  process.exit(1);
}

const injection = `  static getLabel(
    record: Record<string, unknown>,
    moduleKey = ""
  ): string {
    // Q21X_C3B_RELATION_LABEL_ENGINE_WIRED
    // Metadata-driven labels are delegated to the dedicated runtime engine.
    // Existing fallbacks stay in place for compatibility.
    const engineLabel = RuntimeRelationLabelEngine.buildLabel({
      moduleKey,
      record,
      modules: allERPModules,
    });

    if (engineLabel.source === "metadata" && engineLabel.label) {
      return engineLabel.label;
    }

`;

content = content.replace(getLabelMarker, injection);

fs.writeFileSync(file, content, "utf8");

console.log("[Q21X_C3B_DONE] ERPRelationDataLoader now delegates metadata labels to RuntimeRelationLabelEngine.");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm audit:local");