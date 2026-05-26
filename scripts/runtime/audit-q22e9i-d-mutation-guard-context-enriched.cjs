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
  console.log("=== Q22E-9I-D — Audit mutation guard context enrichi ===");
  console.log("");

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

  const resolverPath = p(
    "src",
    "runtime",
    "scheduling",
    "settings",
    "RuntimeSchedulingSettingsResolver.ts"
  );

  const guard = read(guardPath);
  const mutation = read(mutationPath);
  const resolver = read(resolverPath);

  ok("processRuntimeBeforeMutationGuards.ts existe");
  ok("FirestoreRuntimeMutation.ts existe");
  ok("RuntimeSchedulingSettingsResolver.ts existe");

  console.log("");
  console.log("=== Vérification RuntimeBeforeMutationGuardContext ===");

  assertRegex(
    guard,
    /interface\s+RuntimeBeforeMutationGuardContext\s*\{[\s\S]*operation:\s*"create"\s*\|\s*"update";/,
    "RuntimeBeforeMutationGuardContext déclare operation create/update"
  );

  assertIncludes(
    guard,
    "tenantId?: string;",
    "RuntimeBeforeMutationGuardContext contient tenantId optionnel"
  );

  assertIncludes(
    guard,
    "workspaceId?: string;",
    "RuntimeBeforeMutationGuardContext contient workspaceId optionnel"
  );

  assertIncludes(
    guard,
    "moduleKey?: string;",
    "RuntimeBeforeMutationGuardContext contient moduleKey optionnel"
  );

  console.log("");
  console.log("=== Vérification FirestoreRuntimeMutation helpers ===");

  assertIncludes(
    mutation,
    "function asRuntimeTenantId",
    "FirestoreRuntimeMutation contient asRuntimeTenantId()"
  );

  assertIncludes(
    mutation,
    "function asRuntimeWorkspaceId",
    "FirestoreRuntimeMutation contient asRuntimeWorkspaceId()"
  );

  assertRegex(
    mutation,
    /asString\(record\.tenantId\)[\s\S]*asString\(record\.tenant\)[\s\S]*asString\(record\.runtimeTenantId\)/,
    "asRuntimeTenantId lit tenantId/tenant/runtimeTenantId"
  );

  assertRegex(
    mutation,
    /asString\(record\.workspaceId\)[\s\S]*asString\(record\.workspace\)[\s\S]*asString\(record\.runtimeWorkspaceId\)/,
    "asRuntimeWorkspaceId lit workspaceId/workspace/runtimeWorkspaceId"
  );

  console.log("");
  console.log("=== Vérification appel CREATE guard ===");

  assertRegex(
    mutation,
    /processRuntimeBeforeMutationGuards\s*\([\s\S]*operation:\s*"create"[\s\S]*tenantId:\s*asRuntimeTenantId\(computedData\)[\s\S]*workspaceId:\s*asRuntimeWorkspaceId\(computedData\)[\s\S]*moduleKey:\s*module\.metadata\.key[\s\S]*systemMutation:\s*options\.systemMutation[\s\S]*mutationSource:\s*options\.mutationSource/,
    "CREATE transmet tenantId/workspaceId/moduleKey/systemMutation/mutationSource"
  );

  console.log("");
  console.log("=== Vérification appel UPDATE guard ===");

  assertRegex(
    mutation,
    /processRuntimeBeforeMutationGuards\s*\([\s\S]*operation:\s*"update"[\s\S]*id,[\s\S]*tenantId:\s*asRuntimeTenantId\(computedData\)[\s\S]*workspaceId:\s*asRuntimeWorkspaceId\(computedData\)[\s\S]*moduleKey:\s*module\.metadata\.key[\s\S]*systemMutation:\s*options\.systemMutation[\s\S]*mutationSource:\s*options\.mutationSource/,
    "UPDATE transmet id/tenantId/workspaceId/moduleKey/systemMutation/mutationSource"
  );

  console.log("");
  console.log("=== Vérification scheduling guard inchangé côté résolution ===");

  assertIncludes(
    guard,
    "RuntimeSchedulingSettingsResolver.resolve",
    "Le guard utilise encore resolve()"
  );

  assertNotIncludes(
    guard,
    "RuntimeSchedulingSettingsResolver.loadAndResolve",
    "Le guard n'utilise pas encore loadAndResolve()"
  );

  assertIncludes(
    resolver,
    "loadAndResolve",
    "loadAndResolve() reste disponible dans le resolver"
  );

  assertIncludes(
    resolver,
    "RuntimeSchedulingSettingsRepository.resolveStoredSettings",
    "loadAndResolve() sait charger les settings persistés"
  );

  console.log("");
  console.log("[Q22E9I_D_AUDIT_OK] Mutation guard context enrichi audité.");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  git status --short");
  console.log("  git add .\\scripts\\runtime\\audit-q22e9i-d-mutation-guard-context-enriched.cjs");
  console.log('  git commit -m "test(runtime): audit enriched mutation guard context"');
  console.log("  git tag q22e9i-d-mutation-guard-context-enriched-audit");
}

try {
  main();
} catch (error) {
  console.error("");
  console.error(error.message || error);
  console.error("");
  process.exit(1);
}