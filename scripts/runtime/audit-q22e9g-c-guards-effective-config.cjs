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

function scanTargetBackups() {
  const targets = [
    p("src", "runtime", "guards"),
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
      `Backups/fichiers temporaires détectés dans les zones ciblées :\n${suspicious
        .map((item) => `  - ${item}`)
        .join("\n")}`
    );
  }

  ok("Aucun backup/temporaire détecté dans les zones ciblées Q22E-9G-C");
}

function main() {
  console.log("");
  console.log("=== Q22E-9G-C — Audit guards effective config ===");
  console.log("");

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

  const guard = read(guardPath);
  const resolver = read(resolverPath);

  ok("processRuntimeBeforeMutationGuards.ts existe");
  ok("RuntimeSchedulingSettingsResolver.ts existe");

  console.log("");
  console.log("=== Vérification import / resolver ===");

  assertIncludes(
    guard,
    'RuntimeSchedulingSettingsResolver',
    "Le guard importe/utilise RuntimeSchedulingSettingsResolver"
  );

  assertIncludes(
    guard,
    "RuntimeSchedulingSettingsResolver.resolve",
    "Le guard appelle RuntimeSchedulingSettingsResolver.resolve()"
  );

  assertIncludes(
    guard,
    "moduleKey: module.metadata.key",
    "Le guard transmet module.metadata.key comme moduleKey"
  );

assertIncludes(
  resolver,
  "moduleScheduling: input.module.scheduling",
  "Le resolver continue de transmettre module.scheduling comme moduleScheduling à l’engine"
);

  console.log("");
  console.log("=== Vérification suppression lecture directe ===");

  assertNotIncludes(
    guard,
    "module.scheduling?.enabled",
    "Le guard ne lit plus directement module.scheduling?.enabled"
  );

  assertNotIncludes(
    guard,
    "return module.scheduling?.enabled",
    "getSchedulingConfig ne retourne plus directement module.scheduling"
  );

  assertRegex(
    guard,
    /function\s+getSchedulingConfig\s*\(\s*module\s*:\s*ERPModule\s*\)\s*\{[\s\S]*RuntimeSchedulingSettingsResolver\.resolve[\s\S]*effectiveSchedulingConfig\.enabled[\s\S]*\?\s*effectiveSchedulingConfig[\s\S]*:\s*null[\s\S]*\}/,
    "getSchedulingConfig dépend bien de la config effective"
  );

  console.log("");
  console.log("=== Vérification usages métiers du schedulingConfig ===");

  assertIncludes(
    guard,
    "RuntimeSchedulingEngine.assertWithinOpeningHours",
    "Le guard vérifie les horaires d’ouverture"
  );

  assertIncludes(
    guard,
    "RuntimeSchedulingEngine.assertNoAppointmentConflict",
    "Le guard vérifie les conflits de rendez-vous"
  );

  assertIncludes(
    guard,
    "RuntimeSchedulingEngine.getAvailableSlotsWithBookings",
    "Le guard vérifie la capacité/créneaux disponibles"
  );

  assertIncludes(
    guard,
    "schedulingConfig?.blockingStatuses",
    "Le guard utilise blockingStatuses depuis schedulingConfig"
  );

  assertRegex(
    guard,
    /const\s+schedulingConfig\s*=\s*getSchedulingConfig\s*\(\s*module\s*\)/,
    "guardRendezvousMutation récupère schedulingConfig via getSchedulingConfig(module)"
  );

  console.log("");
  console.log("=== Vérification séparation des rôles ===");

  assertIncludes(
    resolver,
    "RuntimeSchedulingSettingsEngine.resolve",
    "Le resolver délègue la fusion à l’engine"
  );

  assertNotIncludes(
    guard,
    "RuntimeSchedulingSettingsEngine.resolve",
    "Le guard ne parle pas directement à l’engine"
  );

  assertNotIncludes(
    guard,
    "RuntimeSchedulingSettingsRepository",
    "Le guard ne lit pas directement les settings persistés"
  );

  console.log("");
  console.log("=== Vérification backups ciblés ===");

  scanTargetBackups();

  console.log("");
  console.log("[Q22E9G_C_AUDIT_OK] Guards effective config audité.");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  git status --short");
  console.log("  git add .\\scripts\\runtime\\audit-q22e9g-c-guards-effective-config.cjs");
  console.log('  git commit -m "test(runtime): audit guards effective scheduling config"');
  console.log("  git tag q22e9g-c-guards-effective-config-audit");
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