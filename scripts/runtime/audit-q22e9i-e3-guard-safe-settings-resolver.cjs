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

function main() {
  console.log("");
  console.log("=== Q22E-9I-E3 — Audit guard-safe settings resolver ===");
  console.log("");

  const resolverPath = p(
    "src",
    "runtime",
    "scheduling",
    "settings",
    "RuntimeSchedulingSettingsResolver.ts"
  );

  const guardPath = p(
    "src",
    "runtime",
    "guards",
    "processRuntimeBeforeMutationGuards.ts"
  );

  const mutationPath = p(
    "src",
    "runtime",
    "firestore",
    "FirestoreRuntimeMutation.ts"
  );

  const resolver = read(resolverPath);
  const guard = read(guardPath);
  const mutation = read(mutationPath);

  ok("RuntimeSchedulingSettingsResolver.ts existe");
  ok("processRuntimeBeforeMutationGuards.ts existe");
  ok("FirestoreRuntimeMutation.ts existe");

  console.log("");
  console.log("=== Vérification resolver guard-safe ===");

  assertIncludes(
    resolver,
    "static async resolveForRuntimeGuard",
    "Resolver expose resolveForRuntimeGuard()"
  );

  assertIncludes(
    resolver,
    "hasPersistedSettingsContext",
    "Resolver vérifie le contexte complet avant persisted settings"
  );

  assertRegex(
    resolver,
    /Boolean\(input\.context\.tenantId\?\.trim\(\)\)[\s\S]*Boolean\(input\.context\.workspaceId\?\.trim\(\)\)[\s\S]*Boolean\(input\.context\.moduleKey\?\.trim\(\)\)/,
    "Resolver exige tenantId + workspaceId + moduleKey avant loadAndResolve()"
  );

  assertRegex(
    resolver,
    /if\s*\(\s*!hasPersistedSettingsContext\s*\)[\s\S]*return\s+this\.resolve/,
    "Resolver fallback sur resolve() si contexte incomplet"
  );

  assertRegex(
    resolver,
    /try\s*\{[\s\S]*return\s+await\s+this\.loadAndResolve\(input\)[\s\S]*\}\s*catch\s*\{[\s\S]*return\s+this\.resolve/,
    "Resolver fallback sur resolve() si loadAndResolve() échoue"
  );

  assertIncludes(
    resolver,
    "RuntimeSchedulingSettingsRepository.resolveStoredSettings",
    "loadAndResolve() charge les settings persistés via repository"
  );

  console.log("");
  console.log("=== Vérification guard scheduling ===");

  assertIncludes(
    guard,
    "await RuntimeSchedulingSettingsResolver.resolveForRuntimeGuard",
    "Guard utilise resolveForRuntimeGuard()"
  );

  assertNotIncludes(
    guard,
    "RuntimeSchedulingSettingsResolver.resolve({",
    "Guard n'appelle plus directement resolve()"
  );

  assertIncludes(
    guard,
    "async function getSchedulingConfig",
    "getSchedulingConfig est async"
  );

  assertRegex(
    guard,
    /await\s+getSchedulingConfig\(module,\s*context\)/,
    "Guard attend getSchedulingConfig(module, context)"
  );

  assertNotIncludes(
    guard,
    "getSchedulingConfig(module)?.",
    "Aucun ancien appel sync getSchedulingConfig(module)?."
  );

  assertNotIncludes(
    guard,
    "getSchedulingConfig(module);",
    "Aucun ancien appel getSchedulingConfig(module) sans context"
  );

  assertRegex(
    guard,
    /const\s+schedulingConfig\s*=[\s\S]*await\s+getSchedulingConfig\(module,\s*context\)[\s\S]*const\s+openingHoursValidation\s*=[\s\S]*RuntimeSchedulingEngine\.assertWithinOpeningHours/,
    "openingHoursValidation utilise une schedulingConfig async déjà résolue"
  );

  assertIncludes(
    guard,
    "calendarExceptions: schedulingConfig?.calendarExceptions",
    "calendarExceptions vient de schedulingConfig effectif"
  );

  assertIncludes(
    guard,
    "schedulingConfig?.blockingStatuses",
    "blockingStatuses vient de schedulingConfig effectif"
  );

  console.log("");
  console.log("=== Vérification mutation context ===");

  assertIncludes(
    mutation,
    "tenantId: asRuntimeTenantId(computedData)",
    "Mutation transmet tenantId au guard"
  );

  assertIncludes(
    mutation,
    "workspaceId: asRuntimeWorkspaceId(computedData)",
    "Mutation transmet workspaceId au guard"
  );

  assertIncludes(
    mutation,
    "moduleKey: module.metadata.key",
    "Mutation transmet moduleKey au guard"
  );

  console.log("");
  console.log("[Q22E9I_E3_AUDIT_OK] Guard-safe settings resolver audité.");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  git status --short");
  console.log("  git add .\\scripts\\runtime\\audit-q22e9i-e3-guard-safe-settings-resolver.cjs");
  console.log('  git commit -m "test(runtime): audit guard safe scheduling settings resolver"');
  console.log("  git tag q22e9i-e3-guard-safe-settings-resolver-audit");
}

try {
  main();
} catch (error) {
  console.error("");
  console.error(error.message || error);
  console.error("");
  process.exit(1);
}