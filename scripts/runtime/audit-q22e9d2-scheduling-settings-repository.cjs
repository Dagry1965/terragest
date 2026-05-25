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
  console.log("=== Q22E-9D2 — Audit RuntimeSchedulingSettingsRepository ===");
  console.log("");

  const repositoryPath = p(
    "src",
    "runtime",
    "scheduling",
    "settings",
    "RuntimeSchedulingSettingsRepository.ts"
  );

  const typesPath = p(
    "src",
    "runtime",
    "scheduling",
    "settings",
    "RuntimeSchedulingSettingsTypes.ts"
  );

  const indexPath = p(
    "src",
    "runtime",
    "scheduling",
    "settings",
    "index.ts"
  );

  const repository = read(repositoryPath);
  const types = read(typesPath);
  const index = read(indexPath);

  ok("RuntimeSchedulingSettingsRepository.ts existe");
  ok("RuntimeSchedulingSettingsTypes.ts existe");
  ok("settings/index.ts existe");

  console.log("");
  console.log("=== Vérification exports/types ===");

  assertIncludes(
    index,
    'export * from "./RuntimeSchedulingSettingsRepository"',
    "index.ts exporte RuntimeSchedulingSettingsRepository"
  );

  assertRegex(
  types,
  /RuntimeSchedulingSettingsScope/,
  "RuntimeSchedulingSettingsScope existe"
);

assertRegex(
  types,
  /["']tenant["']/,
  "RuntimeSchedulingSettingsScope couvre tenant"
);

assertRegex(
  types,
  /["']workspace["']/,
  "RuntimeSchedulingSettingsScope couvre workspace"
);

assertRegex(
  types,
  /["']module["']/,
  "RuntimeSchedulingSettingsScope couvre module"
);

  assertRegex(
    types,
    /export\s+interface\s+RuntimeStoredSchedulingSettings/,
    "RuntimeStoredSchedulingSettings existe"
  );

  assertRegex(
    types,
    /settings\s*:\s*RuntimeSchedulingSettings/,
    "RuntimeStoredSchedulingSettings contient settings: RuntimeSchedulingSettings"
  );

  console.log("");
  console.log("=== Vérification repository ===");

  assertRegex(
    repository,
    /export\s+class\s+RuntimeSchedulingSettingsRepository/,
    "RuntimeSchedulingSettingsRepository est déclaré"
  );

  assertRegex(
    repository,
    /readTenantSettings\s*\(/,
    "readTenantSettings() existe"
  );

  assertRegex(
    repository,
    /readWorkspaceSettings\s*\(/,
    "readWorkspaceSettings() existe"
  );

  assertRegex(
    repository,
    /readModuleSettings\s*\(/,
    "readModuleSettings() existe"
  );

  assertRegex(
    repository,
    /saveTenantSettings\s*\(/,
    "saveTenantSettings() existe"
  );

  assertRegex(
    repository,
    /saveWorkspaceSettings\s*\(/,
    "saveWorkspaceSettings() existe"
  );

  assertRegex(
    repository,
    /saveModuleSettings\s*\(/,
    "saveModuleSettings() existe"
  );

  assertRegex(
    repository,
    /resolveStoredSettings\s*\(/,
    "resolveStoredSettings() existe"
  );

  console.log("");
  console.log("=== Vérification Firestore paths ===");

  assertIncludes(
    repository,
    '"runtimeSchedulingSettings"',
    "Collection racine runtimeSchedulingSettings utilisée"
  );

  assertIncludes(
    repository,
    '"workspaces"',
    "Sous-collection workspaces utilisée"
  );

  assertIncludes(
    repository,
    '"modules"',
    "Sous-collection modules utilisée"
  );

  assertRegex(
    repository,
    /tenantDocRef\s*\(/,
    "tenantDocRef() existe"
  );

  assertRegex(
    repository,
    /workspaceDocRef\s*\(/,
    "workspaceDocRef() existe"
  );

  assertRegex(
    repository,
    /moduleDocRef\s*\(/,
    "moduleDocRef() existe"
  );

  console.log("");
  console.log("=== Vérification responsabilités ===");

  assertNotIncludes(
    repository,
    "RuntimeSchedulingSettingsEngine.resolve",
    "Le repository ne fait pas la fusion effective des settings"
  );

  assertNotIncludes(
    repository,
    "DEFAULT_RUNTIME_SCHEDULING_SETTINGS",
    "Le repository ne porte pas les defaults métier du moteur"
  );

  assertRegex(
    repository,
    /getDoc\s*\(/,
    "Le repository lit via getDoc()"
  );

  assertRegex(
    repository,
    /setDoc\s*\(/,
    "Le repository écrit via setDoc()"
  );

  assertRegex(
    repository,
    /merge\s*:\s*true/,
    "Les écritures utilisent merge: true"
  );

  assertRegex(
    repository,
    /serverTimestamp\s*\(/,
    "Les écritures tracent updatedAt via serverTimestamp()"
  );

  console.log("");
  console.log("=== Vérification guards minimaux ===");

  assertRegex(
    repository,
    /assertTenantId\s*\(/,
    "Guard tenantId présent"
  );

  assertRegex(
    repository,
    /assertWorkspaceId\s*\(/,
    "Guard workspaceId présent"
  );

  assertRegex(
    repository,
    /assertModuleKey\s*\(/,
    "Guard moduleKey présent"
  );

  console.log("");
  console.log("=== Vérification backups ===");

  scanBackups();

  console.log("");
  console.log("[Q22E9D2_AUDIT_OK] RuntimeSchedulingSettingsRepository audité.");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  git status --short");
  console.log("  git add .\\scripts\\runtime\\audit-q22e9d2-scheduling-settings-repository.cjs");
  console.log('  git commit -m "test(runtime): audit scheduling settings repository"');
  console.log("  git tag q22e9d2-scheduling-settings-repository-audit");
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