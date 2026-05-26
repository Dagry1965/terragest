/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const planningPath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "scheduling",
  "ERPSchedulingPlanningView.tsx"
);

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

if (!fs.existsSync(planningPath)) {
  fail("ERPSchedulingPlanningView.tsx introuvable");
}

let content = fs.readFileSync(planningPath, "utf8");

if (!content.includes("module.scheduling?.enabled")) {
  fail("Ancienne lecture module.scheduling?.enabled introuvable");
}

/**
 * Ajoute l'import du resolver après le dernier import du fichier,
 * sans dépendre de l'import RuntimeSchedulingEngine.
 */
if (!content.includes("RuntimeSchedulingSettingsResolver")) {
  const importLines = [...content.matchAll(/^import[\s\S]*?;\s*$/gm)];

  if (!importLines.length) {
    fail("Aucun import trouvé pour insérer RuntimeSchedulingSettingsResolver");
  }

  const lastImport = importLines[importLines.length - 1];
  const insertAt = lastImport.index + lastImport[0].length;

  content =
    content.slice(0, insertAt) +
    `\nimport { RuntimeSchedulingSettingsResolver } from "@/runtime/scheduling/settings";` +
    content.slice(insertAt);

  ok("Import RuntimeSchedulingSettingsResolver ajouté après le dernier import");
} else {
  ok("Import RuntimeSchedulingSettingsResolver déjà présent");
}

const oldBlock = `  const schedulingConfig =
    module.scheduling?.enabled
      ? module.scheduling
      : null;`;

const newBlock = `  const effectiveSchedulingConfig =
    RuntimeSchedulingSettingsResolver.resolve({
      module,
      context: {
        tenantId: "runtime",
        moduleKey: module.route,
      },
    });

  const schedulingConfig =
    effectiveSchedulingConfig.enabled
      ? effectiveSchedulingConfig
      : null;`;

if (!content.includes(oldBlock)) {
  fail("Bloc schedulingConfig direct introuvable");
}

content = content.replace(oldBlock, newBlock);

if (content.includes("module.scheduling?.enabled")) {
  fail("Ancienne lecture module.scheduling?.enabled encore présente");
}

if (!content.includes("RuntimeSchedulingSettingsResolver.resolve")) {
  fail("RuntimeSchedulingSettingsResolver.resolve non présent après correction");
}

fs.writeFileSync(planningPath, content, "utf8");

ok("Planning restauré sur RuntimeSchedulingSettingsResolver.resolve()");
console.log("");
console.log("[Q22E9J_PLANNING_RESTORE_DONE]");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  node .\\scripts\\runtime\\audit-q22e9j-final-scheduling-settings-runtime-chain.cjs");
console.log("  git status --short");