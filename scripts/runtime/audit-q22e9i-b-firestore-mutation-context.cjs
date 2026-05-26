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
  console.log("=== Q22E-9I-B — Audit Firestore mutation guard context ===");
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

  const resolverPath = p(
    "src",
    "runtime",
    "scheduling",
    "settings",
    "RuntimeSchedulingSettingsResolver.ts"
  );

  const mutation = read(mutationPath);
  const guard = read(guardPath);
  const resolver = read(resolverPath);

  ok("FirestoreRuntimeMutation.ts existe");
  ok("processRuntimeBeforeMutationGuards.ts existe");
  ok("RuntimeSchedulingSettingsResolver.ts existe");

  console.log("");
  console.log("=== Vérification appels guards depuis FirestoreRuntimeMutation ===");

  assertIncludes(
    mutation,
    "processRuntimeBeforeMutationGuards",
    "FirestoreRuntimeMutation appelle processRuntimeBeforeMutationGuards()"
  );

  assertRegex(
    mutation,
    /processRuntimeBeforeMutationGuards\s*\([\s\S]*module[\s\S]*data|processRuntimeBeforeMutationGuards\s*\([\s\S]*module[\s\S]*payload|processRuntimeBeforeMutationGuards\s*\([\s\S]*module[\s\S]*record/,
    "FirestoreRuntimeMutation transmet module + data/payload/record aux guards"
  );

  assertRegex(
    mutation,
    /operation\s*:\s*"create"|operation\s*:\s*"update"/,
    "FirestoreRuntimeMutation transmet operation create/update"
  );

  printMatches("Indices contexte dans FirestoreRuntimeMutation", mutation, [
    { label: "tenant", regex: /tenantId|tenant/i },
    { label: "workspace", regex: /workspaceId|workspace/i },
    { label: "moduleKey", regex: /moduleKey|metadata\.key|module\.metadata\.key/i },
    { label: "operation", regex: /operation\s*:/ },
    { label: "id", regex: /\bid\s*:|recordId|documentId|docId/i },
    { label: "guards", regex: /processRuntimeBeforeMutationGuards/ },
  ]);

  console.log("");
  console.log("=== Vérification contrat guard context ===");

  assertRegex(
    guard,
    /interface\s+RuntimeBeforeMutationGuardContext|type\s+RuntimeBeforeMutationGuardContext/,
    "RuntimeBeforeMutationGuardContext est déclaré"
  );

  printMatches("Champs du contexte guard", guard, [
    { label: "operation", regex: /operation/ },
    { label: "id", regex: /\bid\b|recordId/ },
    { label: "tenant", regex: /tenantId|tenant/i },
    { label: "workspace", regex: /workspaceId|workspace/i },
    { label: "moduleKey", regex: /moduleKey/i },
  ]);

  console.log("");
  console.log("=== Vérification resolver persisted disponible ===");

  assertIncludes(
    resolver,
    "loadAndResolve",
    "RuntimeSchedulingSettingsResolver expose loadAndResolve()"
  );

  assertIncludes(
    resolver,
    "RuntimeSchedulingSettingsRepository.resolveStoredSettings",
    "loadAndResolve() passe par RuntimeSchedulingSettingsRepository"
  );

  console.log("");
  console.log("=== Synthèse Q22E-9I-B ===");

  const hasTenant =
    /tenantId|tenant/i.test(mutation) &&
    /tenantId|tenant/i.test(guard);

  const hasWorkspace =
    /workspaceId|workspace/i.test(mutation) &&
    /workspaceId|workspace/i.test(guard);

  const hasModuleKey =
    /moduleKey|metadata\.key|module\.metadata\.key/i.test(mutation) ||
    /moduleKey/i.test(guard);

  if (hasTenant) {
    ok("Contexte tenant détecté");
  } else {
    warn("Contexte tenant non confirmé");
  }

  if (hasWorkspace) {
    ok("Contexte workspace détecté");
  } else {
    warn("Contexte workspace non confirmé");
  }

  if (hasModuleKey) {
    ok("Contexte moduleKey détecté ou dérivable");
  } else {
    warn("Contexte moduleKey non confirmé");
  }

  console.log("");
  if (hasTenant && hasWorkspace && hasModuleKey) {
    console.log("[RECOMMENDATION] Q22E-9I-C peut tenter loadAndResolve() côté guard/runtime.");
  } else {
    console.log("[RECOMMENDATION] Ne pas brancher loadAndResolve() tout de suite.");
    console.log("Il faut d'abord enrichir RuntimeBeforeMutationGuardContext avec tenantId/workspaceId/moduleKey fiables.");
  }

  console.log("");
  console.log("[Q22E9I_B_AUDIT_OK] Audit contexte mutation Firestore terminé.");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  git status --short");
  console.log("  git add .\\scripts\\runtime\\audit-q22e9i-b-firestore-mutation-context.cjs");
  console.log('  git commit -m "test(runtime): audit firestore mutation guard context"');
  console.log("  git tag q22e9i-b-firestore-mutation-context-audit");
}

try {
  main();
} catch (error) {
  console.error("");
  console.error(error.message || error);
  console.error("");
  process.exit(1);
}