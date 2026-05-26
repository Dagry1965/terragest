/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

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

if (!fs.existsSync(mutationPath)) {
  fail("FirestoreRuntimeMutation.ts introuvable");
}

let content = fs.readFileSync(mutationPath, "utf8");

if (!content.includes("processRuntimeBeforeMutationGuards")) {
  fail("processRuntimeBeforeMutationGuards introuvable");
}

if (!content.includes("function asRuntimeTenantId")) {
  fail("asRuntimeTenantId() absent : relance d'abord Q22E-9I-C");
}

if (!content.includes("function asRuntimeWorkspaceId")) {
  fail("asRuntimeWorkspaceId() absent : relance d'abord Q22E-9I-C");
}

const createRegex =
  /await\s+processRuntimeBeforeMutationGuards\s*\(\s*module\s*,\s*computedData\s*,\s*\{\s*operation:\s*"create"\s*,[\s\S]*?\}\s*\)/m;

const updateRegex =
  /await\s+processRuntimeBeforeMutationGuards\s*\(\s*module\s*,\s*computedData\s*,\s*\{\s*operation:\s*"update"\s*,\s*id\s*,[\s\S]*?\}\s*\)/m;

if (!createRegex.test(content)) {
  fail("Bloc CREATE processRuntimeBeforeMutationGuards introuvable");
}

if (!updateRegex.test(content)) {
  fail("Bloc UPDATE processRuntimeBeforeMutationGuards introuvable");
}

content = content.replace(
  createRegex,
  `await processRuntimeBeforeMutationGuards(
        module,
        computedData,
        {
          operation: "create",
          tenantId: asRuntimeTenantId(computedData),
          workspaceId: asRuntimeWorkspaceId(computedData),
          moduleKey: module.metadata.key,
          systemMutation: options.systemMutation,
          mutationSource: options.mutationSource,
        }
      )`
);

content = content.replace(
  updateRegex,
  `await processRuntimeBeforeMutationGuards(
        module,
        computedData,
        {
          operation: "update",
          id,
          tenantId: asRuntimeTenantId(computedData),
          workspaceId: asRuntimeWorkspaceId(computedData),
          moduleKey: module.metadata.key,
          systemMutation: options.systemMutation,
          mutationSource: options.mutationSource,
        }
      )`
);

fs.writeFileSync(mutationPath, content, "utf8");

ok("CREATE transmet tenantId/workspaceId/moduleKey");
ok("UPDATE transmet tenantId/workspaceId/moduleKey");
console.log("");
console.log("[Q22E9I_D_FIX_DONE] FirestoreRuntimeMutation guard context corrigé.");
console.log("");
console.log("Next:");
console.log("  node .\\scripts\\runtime\\audit-q22e9i-d-mutation-guard-context-enriched.cjs");
console.log("  pnpm build");
console.log("  git status --short");