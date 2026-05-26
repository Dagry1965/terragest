const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const TARGET =
  "src/runtime/scheduling/settings/RuntimeSchedulingSettingsService.ts";

const targetPath = path.join(ROOT, TARGET);

if (!fs.existsSync(targetPath)) {
  throw new Error(`Fichier introuvable: ${TARGET}`);
}

const backupPath = `${targetPath}.bak-q22e9n-d2c-validation-flow`;
fs.copyFileSync(targetPath, backupPath);

let content = fs.readFileSync(targetPath, "utf8");

content = content.replace(
  `  static validate(
    settings: RuntimeSchedulingSettings
  ): RuntimeSchedulingSettingsValidationResult {
    return RuntimeSchedulingSettingsEngine.validate(settings);
  }`,
  `  static validateEffectiveConfig(
    config: RuntimeSchedulingEffectiveConfig
  ): RuntimeSchedulingSettingsValidationResult {
    return RuntimeSchedulingSettingsEngine.validate(config);
  }`
);

content = content.replace(
  `    const validation =
      RuntimeSchedulingSettingsEngine.validate(settings);

    if (!validation.ok) {
      return {
        validation,
      };
    }

    if (scope === "tenant") {`,
  `    if (scope === "tenant") {`
);

content = content.replace(
  `    const effectiveConfig =
      await resolveEffectiveConfigIfPossible(context);

    return {
      validation,
      effectiveConfig,
    };`,
  `    const effectiveConfig =
      await resolveEffectiveConfigIfPossible(context);

    const validation = effectiveConfig
      ? RuntimeSchedulingSettingsEngine.validate(effectiveConfig)
      : {
          ok: true,
          issues: [],
        };

    return {
      validation,
      effectiveConfig,
    };`
);

if (content.includes("RuntimeSchedulingSettingsEngine.validate(settings)")) {
  throw new Error("Validation incorrecte des settings bruts encore présente.");
}

fs.writeFileSync(targetPath, content, "utf8");

console.log("");
console.log("[Q22E-9N-D2-C] DONE");
console.log(`[BACKUP] ${path.relative(ROOT, backupPath).replace(/\\/g, "/")}`);
console.log(`[UPDATED] ${TARGET}`);
console.log("");
console.log("Next:");
console.log("pnpm build");