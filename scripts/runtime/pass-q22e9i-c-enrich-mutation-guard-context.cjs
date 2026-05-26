/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const guardPath = path.join(
  ROOT,
  "src",
  "runtime",
  "guards",
  "processRuntimeBeforeMutationGuards.ts"
);

const mutationPath = path.join(
  ROOT,
  "src",
  "runtime",
  "firestore",
  "FirestoreRuntimeMutation.ts"
);

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    fail(`${path.relative(ROOT, filePath)} introuvable`);
  }

  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(ROOT, filePath)}`);
}

let guard = read(guardPath);
let mutation = read(mutationPath);

if (!guard.includes("interface RuntimeBeforeMutationGuardContext")) {
  fail("RuntimeBeforeMutationGuardContext introuvable");
}

if (!mutation.includes("processRuntimeBeforeMutationGuards")) {
  fail("processRuntimeBeforeMutationGuards introuvable dans FirestoreRuntimeMutation");
}

/**
 * 1) Enrichir le contrat RuntimeBeforeMutationGuardContext.
 */
if (!guard.includes("tenantId?: string;")) {
  guard = guard.replace(
    /interface\s+RuntimeBeforeMutationGuardContext\s*\{\s*operation:\s*"create"\s*\|\s*"update";\s*id\?:\s*string;/,
    `interface RuntimeBeforeMutationGuardContext {
  operation: "create" | "update";
  id?: string;
  tenantId?: string;
  workspaceId?: string;
  moduleKey?: string;`
  );

  if (!guard.includes("tenantId?: string;")) {
    fail("Impossible d'ajouter tenantId/workspaceId/moduleKey dans RuntimeBeforeMutationGuardContext");
  }

  ok("RuntimeBeforeMutationGuardContext enrichi");
} else {
  ok("RuntimeBeforeMutationGuardContext déjà enrichi");
}

/**
 * 2) Remplacer les fallbacks hardcodés dans getSchedulingConfig.
 *    On ne branche pas loadAndResolve() ici.
 *    On prépare seulement le contexte fiable pour la suite.
 */
guard = guard.replace(
  /tenantId:\s*"runtime",\s*moduleKey:\s*module\.metadata\.key,/g,
  `tenantId: "runtime",
        moduleKey: module.metadata.key,`
);

/**
 * 3) Ajouter moduleKey dans l'appel CREATE guard.
 */
if (!mutation.includes('moduleKey: module.metadata.key')) {
  mutation = mutation.replace(
    /operation:\s*"create",\s*systemMutation:\s*options\.systemMutation,\s*mutationSource:\s*options\.mutationSource,/,
    `operation: "create",
          tenantId: asRuntimeTenantId(computedData),
          workspaceId: asRuntimeWorkspaceId(computedData),
          moduleKey: module.metadata.key,
          systemMutation: options.systemMutation,
          mutationSource: options.mutationSource,`
  );

  mutation = mutation.replace(
    /operation:\s*"update",\s*id,\s*systemMutation:\s*options\.systemMutation,\s*mutationSource:\s*options\.mutationSource,/,
    `operation: "update",
          id,
          tenantId: asRuntimeTenantId(computedData),
          workspaceId: asRuntimeWorkspaceId(computedData),
          moduleKey: module.metadata.key,
          systemMutation: options.systemMutation,
          mutationSource: options.mutationSource,`
  );

  ok("Context guard enrichi dans les appels create/update");
} else {
  ok("moduleKey déjà transmis dans FirestoreRuntimeMutation");
}

/**
 * 4) Ajouter helpers asRuntimeTenantId/asRuntimeWorkspaceId si absents.
 */
if (!mutation.includes("function asRuntimeTenantId")) {
  const helper = `
function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asRuntimeTenantId(record: Record<string, unknown>): string | undefined {
  const tenantId =
    asString(record.tenantId) ||
    asString(record.tenant) ||
    asString(record.runtimeTenantId);

  return tenantId || undefined;
}

function asRuntimeWorkspaceId(record: Record<string, unknown>): string | undefined {
  const workspaceId =
    asString(record.workspaceId) ||
    asString(record.workspace) ||
    asString(record.runtimeWorkspaceId);

  return workspaceId || undefined;
}
`;

  const firstExportIndex = mutation.indexOf("export class");
  if (firstExportIndex < 0) {
    fail("Impossible de trouver export class pour insérer les helpers");
  }

  mutation =
    mutation.slice(0, firstExportIndex) +
    helper +
    "\n" +
    mutation.slice(firstExportIndex);

  ok("Helpers tenant/workspace ajoutés dans FirestoreRuntimeMutation");
} else {
  ok("Helpers tenant/workspace déjà présents dans FirestoreRuntimeMutation");
}

write(guardPath, guard);
write(mutationPath, mutation);

console.log("");
console.log("[Q22E9I_C_DONE] RuntimeBeforeMutationGuardContext enrichi.");
console.log("");
console.log("Important:");
console.log("  loadAndResolve() n'est pas encore branché.");
console.log("  Cette passe prépare seulement tenantId/workspaceId/moduleKey.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");
console.log("  git add .");
console.log('  git commit -m "feat(runtime): enrich mutation guard context"');
console.log("  git tag q22e9i-c-enrich-mutation-guard-context");