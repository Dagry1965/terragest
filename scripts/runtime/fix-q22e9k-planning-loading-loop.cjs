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

if (!content.includes("RuntimeSchedulingSettingsResolver.resolve")) {
  fail("RuntimeSchedulingSettingsResolver.resolve introuvable dans le planning");
}

const oldBlock = `  const effectiveSchedulingConfig =
    RuntimeSchedulingSettingsResolver.resolve({
      module,
      context: {
        tenantId: "runtime",
        moduleKey: module.metadata.key,
      },
    });

  const schedulingConfig =
    effectiveSchedulingConfig.enabled
      ? effectiveSchedulingConfig
      : null;`;

const newBlock = `  const effectiveSchedulingConfig = useMemo(
    () =>
      RuntimeSchedulingSettingsResolver.resolve({
        module,
        context: {
          tenantId: "runtime",
          moduleKey: module.metadata.key,
        },
      }),
    [module]
  );

  const schedulingConfig = useMemo(
    () =>
      effectiveSchedulingConfig.enabled
        ? effectiveSchedulingConfig
        : null,
    [effectiveSchedulingConfig]
  );`;

if (!content.includes(oldBlock)) {
  fail("Bloc effectiveSchedulingConfig/schedulingConfig non trouvé ou déjà modifié");
}

content = content.replace(oldBlock, newBlock);

fs.writeFileSync(planningPath, content, "utf8");

ok("schedulingConfig stabilisé avec useMemo");
ok("Le planning ne devrait plus boucler sur Chargement du planning...");

console.log("");
console.log("[Q22E9K_PLANNING_LOADING_LOOP_FIX_DONE]");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");