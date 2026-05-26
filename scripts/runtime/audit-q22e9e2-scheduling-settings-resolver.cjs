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

function assertRegex(content, regex, message) {
  if (!regex.test(content)) {
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

function scanBackups() {
  const targets = [
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
      `Backups/fichiers temporaires détectés :\n${suspicious
        .map((item) => `  - ${item}`)
        .join("\n")}`
    );
  }

  ok("Aucun backup/temporaire détecté dans scheduling/settings et scripts/runtime");
}

function main() {
  console.log("");
  console.log("=== Q22E-9E2 — Audit RuntimeSchedulingSettingsResolver ===");
  console.log("");

  const resolverPath = p(
    "src",
    "runtime",
    "scheduling",
    "settings",
    "RuntimeSchedulingSettingsResolver.ts"
  );

  const repositoryPath = p(
    "src",
    "runtime",
    "scheduling",
    "settings",
    "RuntimeSchedulingSettingsRepository.ts"
  );

  const enginePath = p(
    "src",
    "runtime",
    "scheduling",
    "settings",
    "RuntimeSchedulingSettingsEngine.ts"
  );

  const indexPath = p(
    "src",
    "runtime",
    "scheduling",
    "settings",
    "index.ts"
  );

  const resolver = read(resolverPath);
  const repository = read(repositoryPath);
  const engine = read(enginePath);
  const index = read(indexPath);

  ok("RuntimeSchedulingSettingsResolver.ts existe");
  ok("RuntimeSchedulingSettingsRepository.ts existe");
  ok("RuntimeSchedulingSettingsEngine.ts existe");
  ok("settings/index.ts existe");

  console.log("");
  console.log("=== Vérification export resolver ===");

  assertIncludes(
    index,
    'export * from "./RuntimeSchedulingSettingsResolver"',
    "index.ts exporte RuntimeSchedulingSettingsResolver"
  );

  console.log("");
  console.log("=== Vérification resolver ===");

  assertRegex(
    resolver,
    /export\s+class\s+RuntimeSchedulingSettingsResolver/,
    "RuntimeSchedulingSettingsResolver est déclaré"
  );

  assertRegex(
    resolver,
    /static\s+resolve\s*\(/,
    "resolve() existe"
  );

  assertRegex(
    resolver,
    /static\s+async\s+loadAndResolve\s*\(/,
    "loadAndResolve() existe"
  );

  assertIncludes(
    resolver,
    "RuntimeSchedulingSettingsRepository.resolveStoredSettings",
    "loadAndResolve() charge les settings persistés via repository"
  );

  assertIncludes(
    resolver,
    "RuntimeSchedulingSettingsEngine.resolve",
    "resolve() délègue la fusion au moteur"
  );

  assertIncludes(
    resolver,
    "moduleKey: requireModuleKey(input.context)",
    "moduleKey vient du context runtime"
  );

  assertIncludes(
    resolver,
    "moduleScheduling: input.module.scheduling",
    "moduleScheduling vient du module runtime"
  );

  assertRegex(
    resolver,
    /function\s+unwrapStoredSettings/,
    "unwrapStoredSettings() existe"
  );

  assertRegex(
    resolver,
    /value\.settings/,
    "unwrapStoredSettings() extrait RuntimeStoredSchedulingSettings.settings"
  );

  assertRegex(
    resolver,
    /function\s+requireModuleKey/,
    "requireModuleKey() existe"
  );

  console.log("");
  console.log("=== Vérification responsabilités ===");

  assertNotIncludes(
    resolver,
    "getDoc(",
    "Le resolver ne lit pas Firestore directement"
  );

  assertNotIncludes(
    resolver,
    "setDoc(",
    "Le resolver n’écrit pas Firestore directement"
  );

  assertNotIncludes(
    resolver,
    "collection(",
    "Le resolver ne manipule pas les collections Firestore"
  );

  assertNotIncludes(
    repository,
    "RuntimeSchedulingSettingsEngine.resolve",
    "Le repository ne fusionne pas via l’engine"
  );

  assertNotIncludes(
    engine,
    "RuntimeSchedulingSettingsRepository",
    "L’engine ne dépend pas du repository"
  );

  console.log("");
  console.log("=== Vérification séparation des rôles ===");

  assertIncludes(
    repository,
    "resolveStoredSettings",
    "Repository expose resolveStoredSettings()"
  );

  assertIncludes(
    engine,
    "moduleScheduling",
    "Engine accepte moduleScheduling"
  );

  assertIncludes(
    engine,
    "tenantSettings",
    "Engine accepte tenantSettings"
  );

  assertIncludes(
    engine,
    "workspaceSettings",
    "Engine accepte workspaceSettings"
  );

  assertIncludes(
    engine,
    "moduleSettings",
    "Engine accepte moduleSettings"
  );

  console.log("");
  console.log("=== Vérification backups ===");

  scanBackups();

  console.log("");
  console.log("[Q22E9E2_AUDIT_OK] RuntimeSchedulingSettingsResolver audité.");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  git status --short");
  console.log("  git add .\\scripts\\runtime\\audit-q22e9e2-scheduling-settings-resolver.cjs");
  console.log('  git commit -m "test(runtime): audit scheduling settings resolver"');
  console.log("  git tag q22e9e2-scheduling-settings-resolver-audit");
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