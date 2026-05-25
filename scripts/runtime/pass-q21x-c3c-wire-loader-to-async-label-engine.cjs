const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/runtime/modules/lifecycle/ERPRelationDataLoader.ts";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21x-c3c-wire-loader`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21x-c3c-wire-loader`);
}

let content = fs.readFileSync(file, "utf8");

if (content.includes("Q21X_C3C_ASYNC_RELATION_LABEL_ENGINE")) {
  console.log("[SKIP] Q21X-C3C loader wiring already installed.");
  process.exit(0);
}

// 1) load(): use async engine helper instead of getLabel().
content = content.replace(
  `            label: ERPRelationDataLoader.getLabel(
              record as Record<string, unknown>,
              module.metadata.key
            ),`,
  `            label: await ERPRelationDataLoader.getLabelAsync(
              record as Record<string, unknown>,
              module.metadata.key,
              1
            ),`
);

// 2) resolveLabel(): add depth param.
content = content.replace(
  `  static async resolveLabel(
    moduleKey: string,
    id: string
  ): Promise<string> {`,
  `  static async resolveLabel(
    moduleKey: string,
    id: string,
    depth = 1
  ): Promise<string> {`
);

// 3) resolveLabel(): use async helper in both branches.
content = content.replaceAll(
  `        const label =
          ERPRelationDataLoader.getLabel(
            record as Record<string, unknown>,
            module.metadata.key
          );`,
  `        const label =
          await ERPRelationDataLoader.getLabelAsync(
            record as Record<string, unknown>,
            module.metadata.key,
            depth
          );`
);

// 4) Insert getLabelAsync before getLabel().
const marker = `  static getLabel(
    record: Record<string, unknown>,
    moduleKey = ""
  ): string {`;

if (!content.includes(marker)) {
  console.error("[ERROR] Cannot locate getLabel marker.");
  process.exit(1);
}

const method = `  // Q21X_C3C_ASYNC_RELATION_LABEL_ENGINE
  static async getLabelAsync(
    record: Record<string, unknown>,
    moduleKey = "",
    depth = 1
  ): Promise<string> {
    const engineLabel = await RuntimeRelationLabelEngine.buildLabelAsync({
      moduleKey,
      record,
      modules: allERPModules,
      depth,
      resolveRelationLabel: (targetModuleKey, id, nextDepth) =>
        ERPRelationDataLoader.resolveLabel(targetModuleKey, id, nextDepth),
    });

    if (engineLabel.label) {
      return engineLabel.label;
    }

    return ERPRelationDataLoader.getLabel(record, moduleKey);
  }

`;

content = content.replace(marker, method + marker);

fs.writeFileSync(file, content, "utf8");

console.log("[Q21X_C3C_STEP2_DONE] ERPRelationDataLoader now uses async relation label engine.");
console.log("Next: pnpm build");