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
  console.log("=== Q22E-9J — Audit final scheduling settings runtime chain ===");
  console.log("");

  const files = {
    repository: p("src", "runtime", "scheduling", "settings", "RuntimeSchedulingSettingsRepository.ts"),
    resolver: p("src", "runtime", "scheduling", "settings", "RuntimeSchedulingSettingsResolver.ts"),
    engine: p("src", "runtime", "scheduling", "settings", "RuntimeSchedulingSettingsEngine.ts"),
    types: p("src", "runtime", "scheduling", "settings", "RuntimeSchedulingSettingsTypes.ts"),
    settingsIndex: p("src", "runtime", "scheduling", "settings", "index.ts"),
    planning: p("src", "components", "erp", "scheduling", "ERPSchedulingPlanningView.tsx"),
    guards: p("src", "runtime", "guards", "processRuntimeBeforeMutationGuards.ts"),
    mutation: p("src", "runtime", "firestore", "FirestoreRuntimeMutation.ts"),
    moduleType: p("src", "runtime", "modules", "ERPModule.ts"),
    rendezvous: p("src", "runtime", "modules", "generated", "rendezvous", "rendezvous.module.ts"),
  };

  const content = Object.fromEntries(
    Object.entries(files).map(([key, file]) => [key, read(file)])
  );

  for (const [key, file] of Object.entries(files)) {
    ok(`${key} existe : ${path.relative(ROOT, file)}`);
  }

  console.log("");
  console.log("=== 1. Types scheduling settings ===");

  assertIncludes(
    content.types,
    "RuntimeSchedulingSettingsStorageScope",
    "Types séparent le scope de stockage tenant/workspace/module"
  );

  assertIncludes(
    content.types,
    "RuntimeStoredSchedulingSettings",
    "Types déclarent RuntimeStoredSchedulingSettings"
  );

  assertIncludes(
    content.types,
    "RuntimeSchedulingSettingsResolutionInput",
    "Types déclarent RuntimeSchedulingSettingsResolutionInput"
  );

  console.log("");
  console.log("=== 2. Repository ===");

  assertIncludes(
    content.repository,
    "class RuntimeSchedulingSettingsRepository",
    "Repository déclaré"
  );

  assertIncludes(
    content.repository,
    "readTenantSettings",
    "Repository lit les settings tenant"
  );

  assertIncludes(
    content.repository,
    "readWorkspaceSettings",
    "Repository lit les settings workspace"
  );

  assertIncludes(
    content.repository,
    "readModuleSettings",
    "Repository lit les settings module"
  );

  assertIncludes(
    content.repository,
    "saveTenantSettings",
    "Repository écrit les settings tenant"
  );

  assertIncludes(
    content.repository,
    "saveWorkspaceSettings",
    "Repository écrit les settings workspace"
  );

  assertIncludes(
    content.repository,
    "saveModuleSettings",
    "Repository écrit les settings module"
  );

  assertIncludes(
    content.repository,
    "resolveStoredSettings",
    "Repository expose resolveStoredSettings()"
  );

  assertNotIncludes(
    content.repository,
    "RuntimeSchedulingSettingsEngine.resolve",
    "Repository ne fusionne pas les settings"
  );

  console.log("");
  console.log("=== 3. Engine ===");

  assertIncludes(
    content.engine,
    "class RuntimeSchedulingSettingsEngine",
    "Engine déclaré"
  );

  assertIncludes(
    content.engine,
    "static resolve",
    "Engine expose resolve()"
  );

  assertIncludes(
    content.engine,
    "moduleScheduling",
    "Engine accepte moduleScheduling"
  );

  assertIncludes(
    content.engine,
    "tenantSettings",
    "Engine accepte tenantSettings"
  );

  assertIncludes(
    content.engine,
    "workspaceSettings",
    "Engine accepte workspaceSettings"
  );

  assertIncludes(
    content.engine,
    "moduleSettings",
    "Engine accepte moduleSettings"
  );

  assertNotIncludes(
    content.engine,
    "RuntimeSchedulingSettingsRepository",
    "Engine ne dépend pas du repository"
  );

  console.log("");
  console.log("=== 4. Resolver ===");

  assertIncludes(
    content.resolver,
    "class RuntimeSchedulingSettingsResolver",
    "Resolver déclaré"
  );

  assertIncludes(
    content.resolver,
    "RuntimeSchedulingSettingsRepository.resolveStoredSettings",
    "Resolver peut charger les settings persistés"
  );

  assertIncludes(
    content.resolver,
    "RuntimeSchedulingSettingsEngine.resolve",
    "Resolver délègue la fusion à l’engine"
  );

  assertIncludes(
    content.resolver,
    "static async resolveForRuntimeGuard",
    "Resolver expose resolveForRuntimeGuard()"
  );

  assertRegex(
    content.resolver,
    /Boolean\(input\.context\.tenantId\?\.trim\(\)\)[\s\S]*Boolean\(input\.context\.workspaceId\?\.trim\(\)\)[\s\S]*Boolean\(input\.context\.moduleKey\?\.trim\(\)\)/,
    "resolveForRuntimeGuard exige tenantId + workspaceId + moduleKey avant persisted settings"
  );

  assertRegex(
    content.resolver,
    /if\s*\(\s*!hasPersistedSettingsContext\s*\)[\s\S]*return\s+this\.resolve/,
    "resolveForRuntimeGuard fallback sur resolve() si contexte incomplet"
  );

  assertRegex(
    content.resolver,
    /try\s*\{[\s\S]*return\s+await\s+this\.loadAndResolve\(input\)[\s\S]*\}\s*catch\s*\{[\s\S]*return\s+this\.resolve/,
    "resolveForRuntimeGuard fallback sur resolve() si loadAndResolve échoue"
  );

  console.log("");
  console.log("=== 5. Planning ===");

  assertIncludes(
    content.planning,
    "RuntimeSchedulingSettingsResolver.resolve",
    "Planning consomme RuntimeSchedulingSettingsResolver.resolve()"
  );

  assertIncludes(
    content.planning,
    "effectiveSchedulingConfig",
    "Planning calcule une config effective"
  );

  assertIncludes(
    content.planning,
    "moduleKey: module.metadata.key",
    "Planning transmet module.metadata.key comme moduleKey"
  );

  assertNotIncludes(
    content.planning,
    "module.scheduling?.enabled",
    "Planning ne lit plus directement module.scheduling?.enabled"
  );

  console.log("");
  console.log("=== 6. Guards ===");

  assertIncludes(
    content.guards,
    "RuntimeSchedulingSettingsResolver.resolveForRuntimeGuard",
    "Guards consomment resolveForRuntimeGuard()"
  );

  assertIncludes(
    content.guards,
    "async function getSchedulingConfig",
    "getSchedulingConfig est async"
  );

  assertRegex(
    content.guards,
    /await\s+getSchedulingConfig\(module,\s*context\)/,
    "Guards attendent getSchedulingConfig(module, context)"
  );

  assertNotIncludes(
    content.guards,
    "RuntimeSchedulingSettingsResolver.resolve({",
    "Guards n’appellent plus resolve() directement"
  );

  assertNotIncludes(
    content.guards,
    "getSchedulingConfig(module)?.",
    "Aucun ancien appel sync getSchedulingConfig(module)?."
  );

  assertIncludes(
    content.guards,
    "calendarExceptions: schedulingConfig?.calendarExceptions",
    "Guards utilisent calendarExceptions depuis la config effective"
  );

  assertIncludes(
    content.guards,
    "schedulingConfig?.blockingStatuses",
    "Guards utilisent blockingStatuses depuis la config effective"
  );

  assertIncludes(
    content.guards,
    "RuntimeSchedulingEngine.assertNoAppointmentConflict",
    "Guards conservent le contrôle conflit planning"
  );

  console.log("");
  console.log("=== 7. Mutation context ===");

  assertIncludes(
    content.guards,
    "tenantId?: string;",
    "Guard context accepte tenantId"
  );

  assertIncludes(
    content.guards,
    "workspaceId?: string;",
    "Guard context accepte workspaceId"
  );

  assertIncludes(
    content.guards,
    "moduleKey?: string;",
    "Guard context accepte moduleKey"
  );

  assertIncludes(
    content.mutation,
    "tenantId: asRuntimeTenantId(computedData)",
    "Mutation transmet tenantId au guard"
  );

  assertIncludes(
    content.mutation,
    "workspaceId: asRuntimeWorkspaceId(computedData)",
    "Mutation transmet workspaceId au guard"
  );

  assertIncludes(
    content.mutation,
    "moduleKey: module.metadata.key",
    "Mutation transmet moduleKey au guard"
  );

  console.log("");
  console.log("=== 8. Rendezvous metadata ===");

  assertRegex(
    content.rendezvous,
    /metadata:\s*\{[\s\S]*key:\s*"rendezvous"/,
    "Rendezvous expose metadata.key"
  );

  assertRegex(
    content.rendezvous,
    /scheduling:\s*\{[\s\S]*enabled:\s*true/,
    "Rendezvous active scheduling"
  );

  assertIncludes(
    content.rendezvous,
    'dateField: "dateRendezVous"',
    "Rendezvous déclare dateField"
  );

  assertIncludes(
    content.rendezvous,
    'timeField: "heureRendezVous"',
    "Rendezvous déclare timeField"
  );

  assertIncludes(
    content.rendezvous,
    'resourceField: "vehiculeId"',
    "Rendezvous déclare resourceField vehiculeId"
  );

  assertRegex(
    content.rendezvous,
    /blockingStatuses:\s*\[[\s\S]*planifie[\s\S]*confirme[\s\S]*en_cours[\s\S]*\]/,
    "Rendezvous déclare les statuts bloquants"
  );

  console.log("");
  console.log("=== 9. Exports ===");

  assertIncludes(
    content.settingsIndex,
    'export * from "./RuntimeSchedulingSettingsRepository"',
    "settings/index exporte Repository"
  );

  assertIncludes(
    content.settingsIndex,
    'export * from "./RuntimeSchedulingSettingsResolver"',
    "settings/index exporte Resolver"
  );

  assertIncludes(
    content.settingsIndex,
    'export * from "./RuntimeSchedulingSettingsEngine"',
    "settings/index exporte Engine"
  );

  console.log("");
  console.log("[Q22E9J_FINAL_AUDIT_OK]");
  console.log("");
  console.log("Chaîne validée :");
  console.log("- Repository: stockage tenant/workspace/module");
  console.log("- Resolver: orchestration + fallback guard-safe");
  console.log("- Engine: fusion effective");
  console.log("- Planning: config effective locale");
  console.log("- Guards: config effective guard-safe");
  console.log("- Mutation: contexte tenant/workspace/moduleKey enrichi");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  git status --short");
  console.log("  git add .\\scripts\\runtime\\audit-q22e9j-final-scheduling-settings-runtime-chain.cjs");
  console.log('  git commit -m "test(runtime): audit final scheduling settings runtime chain"');
  console.log("  git tag q22e9j-final-scheduling-settings-runtime-chain-audit");
}

try {
  main();
} catch (error) {
  console.error("");
  console.error(error.message || error);
  console.error("");
  process.exit(1);
}
