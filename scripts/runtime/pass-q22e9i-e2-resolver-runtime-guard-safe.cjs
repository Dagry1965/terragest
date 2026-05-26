/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const resolverPath = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "settings",
  "RuntimeSchedulingSettingsResolver.ts"
);

const guardPath = path.join(
  ROOT,
  "src",
  "runtime",
  "guards",
  "processRuntimeBeforeMutationGuards.ts"
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

let resolver = read(resolverPath);
let guard = read(guardPath);

if (!resolver.includes("class RuntimeSchedulingSettingsResolver")) {
  fail("RuntimeSchedulingSettingsResolver introuvable");
}

if (!resolver.includes("static async loadAndResolve")) {
  fail("loadAndResolve() introuvable dans RuntimeSchedulingSettingsResolver");
}

if (!resolver.includes("static resolve(")) {
  fail("resolve() introuvable dans RuntimeSchedulingSettingsResolver");
}

if (!guard.includes("RuntimeSchedulingSettingsResolver.resolve")) {
  fail("Le guard n'appelle pas RuntimeSchedulingSettingsResolver.resolve()");
}

/**
 * 1) Ajouter resolveForRuntimeGuard() dans le resolver.
 */
if (!resolver.includes("resolveForRuntimeGuard")) {
  resolver = resolver.replace(
    /  static async loadAndResolve\(input: RuntimeSchedulingSettingsResolverLoadInput\) \{[\s\S]*?\n  \}\n\}/,
    `  static async loadAndResolve(input: RuntimeSchedulingSettingsResolverLoadInput) {
    const storedSettings =
      await RuntimeSchedulingSettingsRepository.resolveStoredSettings(
        input.context
      );

    return this.resolve({
      module: input.module,
      context: input.context,
      tenantSettings: storedSettings.tenantSettings,
      workspaceSettings: storedSettings.workspaceSettings,
      moduleSettings: storedSettings.moduleSettings,
    });
  }

  static async resolveForRuntimeGuard(input: RuntimeSchedulingSettingsResolverLoadInput) {
    const hasPersistedSettingsContext =
      Boolean(input.context.tenantId?.trim()) &&
      Boolean(input.context.workspaceId?.trim()) &&
      Boolean(input.context.moduleKey?.trim());

    if (!hasPersistedSettingsContext) {
      return this.resolve({
        module: input.module,
        context: input.context,
      });
    }

    try {
      return await this.loadAndResolve(input);
    } catch {
      return this.resolve({
        module: input.module,
        context: input.context,
      });
    }
  }
}
`
  );

  if (!resolver.includes("resolveForRuntimeGuard")) {
    fail("Impossible d'ajouter resolveForRuntimeGuard()");
  }

  ok("resolveForRuntimeGuard() ajouté dans RuntimeSchedulingSettingsResolver");
} else {
  ok("resolveForRuntimeGuard() existe déjà");
}

/**
 * 2) Rendre getSchedulingConfig async et brancher resolveForRuntimeGuard().
 */
guard = guard.replace(
  /function\s+getSchedulingConfig\s*\(\s*module\s*:\s*ERPModule\s*\)\s*\{\s*const\s+effectiveSchedulingConfig\s*=\s*RuntimeSchedulingSettingsResolver\.resolve\s*\(\{\s*module,\s*context:\s*\{\s*tenantId:\s*"runtime",\s*moduleKey:\s*module\.metadata\.key,\s*\},\s*\}\s*\);\s*return\s+effectiveSchedulingConfig\.enabled\s*\?\s*effectiveSchedulingConfig\s*:\s*null;\s*\}/m,
  `async function getSchedulingConfig(
  module: ERPModule,
  context: RuntimeBeforeMutationGuardContext
) {
  const effectiveSchedulingConfig =
    await RuntimeSchedulingSettingsResolver.resolveForRuntimeGuard({
      module,
      context: {
        tenantId: context.tenantId,
        workspaceId: context.workspaceId,
        moduleKey: context.moduleKey ?? module.metadata.key,
      },
    });

  return effectiveSchedulingConfig.enabled
    ? effectiveSchedulingConfig
    : null;
}`
);

if (!guard.includes("resolveForRuntimeGuard")) {
  fail("Impossible de brancher resolveForRuntimeGuard() dans le guard");
}

guard = guard.replace(
  /const\s+schedulingConfig\s*=\s*getSchedulingConfig\s*\(\s*module\s*\);/g,
  "const schedulingConfig =\n    await getSchedulingConfig(module, context);"
);

if (guard.includes("RuntimeSchedulingSettingsResolver.resolve({")) {
  fail("Le guard appelle encore RuntimeSchedulingSettingsResolver.resolve() directement");
}

write(resolverPath, resolver);
write(guardPath, guard);

ok("Guard branché sur resolveForRuntimeGuard()");
console.log("");
console.log("[Q22E9I_E2_DONE] Resolver guard-safe ajouté et branché.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");
console.log("  git add .");
console.log('  git commit -m "feat(runtime): resolve scheduling settings safely for guards"');
console.log("  git tag q22e9i-e2-runtime-guard-safe-settings-resolver");