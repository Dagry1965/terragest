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

function warn(message) {
  console.warn(`[WARN] ${message}`);
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

function printMatches(title, content, patterns) {
  console.log("");
  console.log(`=== ${title} ===`);

  const lines = content.split(/\r?\n/);
  let found = false;

  lines.forEach((line, index) => {
    for (const pattern of patterns) {
      if (pattern.regex.test(line)) {
        found = true;
        console.log(
          `[FOUND] L${index + 1} [${pattern.label}] ${line.trim()}`
        );
      }
    }
  });

  if (!found) {
    console.log("[NONE]");
  }
}

function main() {
  console.log("");
  console.log("=== Q22E-9I-E1 — Audit rendezvous tenant/workspace context ===");
  console.log("");

  const mutationPath = p(
    "src",
    "runtime",
    "firestore",
    "FirestoreRuntimeMutation.ts"
  );

  const guardPath = p(
    "src",
    "runtime",
    "guards",
    "processRuntimeBeforeMutationGuards.ts"
  );

  const rendezvousModulePath = p(
    "src",
    "runtime",
    "modules",
    "generated",
    "rendezvous",
    "rendezvous.module.ts"
  );

  const resolverPath = p(
    "src",
    "runtime",
    "scheduling",
    "settings",
    "RuntimeSchedulingSettingsResolver.ts"
  );

  const mutation = read(mutationPath);
  const guard = read(guardPath);
  const rendezvousModule = read(rendezvousModulePath);
  const resolver = read(resolverPath);

  ok("FirestoreRuntimeMutation.ts existe");
  ok("processRuntimeBeforeMutationGuards.ts existe");
  ok("rendezvous.module.ts existe");
  ok("RuntimeSchedulingSettingsResolver.ts existe");

  console.log("");
  console.log("=== Vérification contexte enrichi déjà en place ===");

  assertIncludes(
    mutation,
    "tenantId: asRuntimeTenantId(computedData)",
    "CREATE/UPDATE prépare tenantId depuis computedData"
  );

  assertIncludes(
    mutation,
    "workspaceId: asRuntimeWorkspaceId(computedData)",
    "CREATE/UPDATE prépare workspaceId depuis computedData"
  );

  assertIncludes(
    mutation,
    "moduleKey: module.metadata.key",
    "CREATE/UPDATE transmet moduleKey"
  );

  assertIncludes(
    guard,
    "tenantId?: string;",
    "Guard context accepte tenantId"
  );

  assertIncludes(
    guard,
    "workspaceId?: string;",
    "Guard context accepte workspaceId"
  );

  assertIncludes(
    guard,
    "moduleKey?: string;",
    "Guard context accepte moduleKey"
  );

  console.log("");
  console.log("=== Indices tenant/workspace dans module rendezvous ===");

  printMatches("rendezvous.module.ts", rendezvousModule, [
    { label: "tenantId", regex: /tenantId|tenant/i },
    { label: "workspaceId", regex: /workspaceId|workspace/i },
    { label: "runtimeTenantId", regex: /runtimeTenantId/i },
    { label: "runtimeWorkspaceId", regex: /runtimeWorkspaceId/i },
    { label: "schema field", regex: /fields\s*:|name\s*:|key\s*:/ },
  ]);

  console.log("");
  console.log("=== Indices tenant/workspace dans mutation/guard ===");

  printMatches("FirestoreRuntimeMutation.ts", mutation, [
    { label: "tenant helper", regex: /asRuntimeTenantId|tenantId|runtimeTenantId|tenant/i },
    { label: "workspace helper", regex: /asRuntimeWorkspaceId|workspaceId|runtimeWorkspaceId|workspace/i },
    { label: "computedData", regex: /computedData/ },
    { label: "isolatedData", regex: /isolatedData/ },
    { label: "applyRuntimeIsolation", regex: /applyRuntimeIsolation/ },
  ]);

  printMatches("processRuntimeBeforeMutationGuards.ts", guard, [
    { label: "tenant", regex: /tenantId|tenant/i },
    { label: "workspace", regex: /workspaceId|workspace/i },
    { label: "moduleKey", regex: /moduleKey|metadata\.key/i },
    { label: "resolve", regex: /RuntimeSchedulingSettingsResolver\.resolve/ },
    { label: "loadAndResolve", regex: /RuntimeSchedulingSettingsResolver\.loadAndResolve/ },
  ]);

  console.log("");
  console.log("=== Vérification resolver persisted ===");

  assertIncludes(
    resolver,
    "loadAndResolve",
    "Resolver expose loadAndResolve()"
  );

  assertIncludes(
    resolver,
    "RuntimeSchedulingSettingsRepository.resolveStoredSettings",
    "loadAndResolve() charge les settings persistés"
  );

  console.log("");
  console.log("=== Synthèse Q22E-9I-E1 ===");

  const moduleHasTenant =
    /tenantId|tenant|runtimeTenantId/i.test(rendezvousModule);

  const moduleHasWorkspace =
    /workspaceId|workspace|runtimeWorkspaceId/i.test(rendezvousModule);

  const mutationHasTenantHelpers =
    /asRuntimeTenantId\(computedData\)/.test(mutation);

  const mutationHasWorkspaceHelpers =
    /asRuntimeWorkspaceId\(computedData\)/.test(mutation);

  if (moduleHasTenant) {
    ok("Le module rendezvous semble déclarer ou porter un champ tenant");
  } else {
    warn("Le module rendezvous ne semble pas déclarer explicitement de champ tenant");
  }

  if (moduleHasWorkspace) {
    ok("Le module rendezvous semble déclarer ou porter un champ workspace");
  } else {
    warn("Le module rendezvous ne semble pas déclarer explicitement de champ workspace");
  }

  if (mutationHasTenantHelpers && mutationHasWorkspaceHelpers) {
    ok("La mutation sait extraire tenant/workspace si les records les portent");
  } else {
    warn("La mutation ne sait pas encore extraire tenant/workspace correctement");
  }

  console.log("");

  if (moduleHasTenant && moduleHasWorkspace) {
    console.log("[RECOMMENDATION] Q22E-9I-E2 peut tester loadAndResolve() côté guard avec fallback prudent.");
  } else {
    console.log("[RECOMMENDATION] Ne pas brancher loadAndResolve() directement.");
    console.log("Prévoir une politique fallback : resolve() si tenantId/workspaceId absents, loadAndResolve() seulement si contexte complet.");
  }

  console.log("");
  console.log("[Q22E9I_E1_AUDIT_OK] Audit tenant/workspace rendezvous terminé.");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  git status --short");
  console.log("  git add .\\scripts\\runtime\\audit-q22e9i-e1-rendezvous-tenant-workspace-context.cjs");
  console.log('  git commit -m "test(runtime): audit rendezvous tenant workspace context"');
  console.log("  git tag q22e9i-e1-rendezvous-tenant-workspace-context-audit");
}

try {
  main();
} catch (error) {
  console.error("");
  console.error(error.message || error);
  console.error("");
  process.exit(1);
}