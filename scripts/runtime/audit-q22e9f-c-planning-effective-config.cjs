/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function p(...parts) {
  return path.join(ROOT, ...parts);
}

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`[MISSING] ${path.relative(ROOT, filePath)}`);
  }

  return fs.readFileSync(filePath, "utf8");
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

function fail(message) {
  throw new Error(`[FAIL] ${message}`);
}

function assertIncludes(content, needle, message) {
  if (!content.includes(needle)) {
    fail(message);
  }

  ok(message);
}

function assertNotIncludes(content, needle, message) {
  if (content.includes(needle)) {
    fail(message);
  }

  ok(message);
}

function assertRegex(content, regex, message) {
  if (!regex.test(content)) {
    fail(message);
  }

  ok(message);
}

function scanTargetBackups() {
  const targets = [
    p("src", "components", "erp", "scheduling"),
    p("src", "runtime", "scheduling", "settings"),
    p("scripts", "runtime"),
  ];

  const suspicious = [];

  function walk(dir) {
    if (!fs.existsSync(dir)) return;

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (
          entry.name === ".git" ||
          entry.name === ".next" ||
          entry.name === "node_modules"
        ) {
          continue;
        }

        walk(fullPath);
        continue;
      }

      if (
        entry.name.includes(".bak") ||
        entry.name.endsWith(".tmp") ||
        entry.name.endsWith("~")
      ) {
        suspicious.push(path.relative(ROOT, fullPath));
      }
    }
  }

  for (const target of targets) {
    walk(target);
  }

  if (suspicious.length) {
    fail(
      `Backups/fichiers temporaires détectés dans les zones ciblées :\n${suspicious
        .map((item) => `  - ${item}`)
        .join("\n")}`
    );
  }

  ok("Aucun backup/temporaire détecté dans les zones ciblées Q22E-9F-C");
}

function main() {
  console.log("");
  console.log("=== Q22E-9F-C — Audit planning effective config ===");
  console.log("");

  const planningPath = p(
    "src",
    "components",
    "erp",
    "scheduling",
    "ERPSchedulingPlanningView.tsx"
  );

  const resolverPath = p(
    "src",
    "runtime",
    "scheduling",
    "settings",
    "RuntimeSchedulingSettingsResolver.ts"
  );

  const planning = read(planningPath);
  const resolver = read(resolverPath);

  ok("ERPSchedulingPlanningView.tsx existe");
  ok("RuntimeSchedulingSettingsResolver.ts existe");

  console.log("");
  console.log("=== Vérification planning ===");

  assertIncludes(
    planning,
    'RuntimeSchedulingSettingsResolver',
    "Le planning importe/utilise RuntimeSchedulingSettingsResolver"
  );

  assertIncludes(
    planning,
    "RuntimeSchedulingSettingsResolver.resolve",
    "Le planning appelle RuntimeSchedulingSettingsResolver.resolve()"
  );

  assertIncludes(
    planning,
    "const effectiveSchedulingConfig",
    "Le planning calcule une config effective"
  );

  assertIncludes(
    planning,
    "moduleKey: module.route",
    "Le planning transmet module.route comme moduleKey contextuel"
  );

  assertIncludes(
    planning,
    "effectiveSchedulingConfig.enabled",
    "Le planning active/désactive à partir de la config effective"
  );

  assertNotIncludes(
    planning,
    "module.scheduling?.enabled",
    "Le planning ne lit plus directement module.scheduling?.enabled"
  );

  assertRegex(
    planning,
    /const\s+schedulingConfig\s*=\s*[\s\S]*effectiveSchedulingConfig\.enabled[\s\S]*\?\s*effectiveSchedulingConfig[\s\S]*:\s*null/,
    "schedulingConfig dépend bien de effectiveSchedulingConfig"
  );

  assertRegex(
    planning,
    /if\s*\(\s*!schedulingConfig\s*\)/,
    "loadRecords continue de dépendre de schedulingConfig"
  );

  console.log("");
  console.log("=== Vérification resolver ===");

  assertIncludes(
    resolver,
    "moduleKey: requireModuleKey(input.context)",
    "Le resolver exige moduleKey depuis le contexte"
  );

  assertIncludes(
    resolver,
    "moduleScheduling: input.module.scheduling",
    "Le resolver transmet module.scheduling comme moduleScheduling"
  );

  assertIncludes(
    resolver,
    "RuntimeSchedulingSettingsEngine.resolve",
    "Le resolver délègue la fusion à l’engine"
  );

  console.log("");
  console.log("=== Vérification backups ciblés ===");

  scanTargetBackups();

  console.log("");
  console.log("[Q22E9F_C_AUDIT_OK] Planning effective config audité.");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  git status --short");
  console.log("  git add .\\scripts\\runtime\\audit-q22e9f-c-planning-effective-config.cjs");
  console.log('  git commit -m "test(runtime): audit planning effective scheduling config"');
  console.log("  git tag q22e9f-c-planning-effective-config-audit");
  console.log("  git status --short");
  console.log("  git log --oneline -10");
}

try {
  main();
} catch (error) {
  console.error("");
  console.error(error.message || error);
  console.error("");
  process.exit(1);
}