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
  fail("Lecture directe module.scheduling?.enabled introuvable");
}

if (!content.includes("RuntimeSchedulingSettingsResolver")) {
  const importAnchor = /from\s+["']@\/runtime\/scheduling\/RuntimeSchedulingEngine["'];/;

  if (importAnchor.test(content)) {
    content = content.replace(
      importAnchor,
      (match) =>
        `${match}\nimport { RuntimeSchedulingSettingsResolver } from "@/runtime/scheduling/settings";`
    );
  } else {
    const firstImportMatch = content.match(/^import[\s\S]*?;\r?\n/);

    if (!firstImportMatch) {
      fail("Impossible d’insérer l’import RuntimeSchedulingSettingsResolver");
    }

    content = content.replace(
      firstImportMatch[0],
      `${firstImportMatch[0]}import { RuntimeSchedulingSettingsResolver } from "@/runtime/scheduling/settings";\n`
    );
  }

  ok("Import RuntimeSchedulingSettingsResolver ajouté");
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
  fail("Bloc schedulingConfig direct introuvable ou déjà modifié");
}

content = content.replace(oldBlock, newBlock);

fs.writeFileSync(planningPath, content, "utf8");

ok("ERPSchedulingPlanningView utilise RuntimeSchedulingSettingsResolver.resolve()");
ok("Le planning ne lit plus directement module.scheduling?.enabled");

console.log("");
console.log("[Q22E9F_B_DONE] Planning branché sur la configuration effective locale.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");
console.log("  git add .");
console.log('  git commit -m "feat(runtime): use effective scheduling config in planning"');
console.log("  git tag q22e9f-b-planning-effective-config");