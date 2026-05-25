/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function rel(p) {
  return path.join(ROOT, p);
}

function read(p) {
  const full = rel(p);
  if (!fs.existsSync(full)) {
    throw new Error(`[MISSING] ${p}`);
  }
  return fs.readFileSync(full, "utf8");
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

function indexOfAny(content, patterns) {
  const indexes = patterns
    .map((pattern) => {
      const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern);
      const match = regex.exec(content);
      return match ? match.index : -1;
    })
    .filter((index) => index >= 0);

  return indexes.length ? Math.min(...indexes) : -1;
}

function assertOrder(content, orderedSteps, message) {
  let previousIndex = -1;

  for (const step of orderedSteps) {
    const index = indexOfAny(content, step.patterns);
    if (index < 0) {
      fail(`${message} — étape introuvable : ${step.label}`);
    }

    if (index < previousIndex) {
      fail(`${message} — ordre incorrect autour de : ${step.label}`);
    }

    previousIndex = index;
  }

  ok(message);
}

function scanBackups() {
  const suspicious = [];

  function walk(dir) {
    if (!fs.existsSync(dir)) return;

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (
          entry.name === "node_modules" ||
          entry.name === ".next" ||
          entry.name === ".git"
        ) {
          continue;
        }
        walk(full);
        continue;
      }

      if (
        entry.name.includes(".bak") ||
        entry.name.endsWith("~") ||
        entry.name.endsWith(".tmp")
      ) {
        suspicious.push(path.relative(ROOT, full));
      }
    }
  }

  walk(rel("src/runtime/scheduling/settings"));
  walk(rel("scripts/runtime"));

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
  console.log("=== Q22E-9C2 — Audit RuntimeSchedulingSettingsEngine ===");
  console.log("");

  const typesPath =
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts";
  const enginePath =
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts";
  const indexPath = "src/runtime/scheduling/settings/index.ts";
  const schedulingTypesPath = "src/runtime/scheduling/RuntimeSchedulingTypes.ts";

  const types = read(typesPath);
  const engine = read(enginePath);
  const index = read(indexPath);
  const schedulingTypes = read(schedulingTypesPath);

  ok(`${typesPath} existe`);
  ok(`${enginePath} existe`);
  ok(`${indexPath} existe`);
  ok(`${schedulingTypesPath} existe`);

  console.log("");
  console.log("=== Vérification exports ===");

  assertRegex(
    index,
    /RuntimeSchedulingSettingsTypes|RuntimeSchedulingSettings/,
    "index.ts exporte les types scheduling settings"
  );

  assertIncludes(
    index,
    "RuntimeSchedulingSettingsEngine",
    "index.ts exporte RuntimeSchedulingSettingsEngine"
  );

  console.log("");
  console.log("=== Vérification types ===");

  assertRegex(
    types,
    /export\s+interface\s+RuntimeSchedulingSettings/,
    "RuntimeSchedulingSettings est déclaré"
  );

  assertRegex(
    types,
    /defaultDurationMinutes/,
    "defaultDurationMinutes est présent dans les settings"
  );

  assertRegex(types, /bufferMinutes/, "bufferMinutes est présent dans les settings");

  assertRegex(types, /capacity/, "capacity est présent dans les settings");

  assertRegex(
    types,
    /blockingStatuses/,
    "blockingStatuses est présent dans les settings"
  );

  assertRegex(
    types,
    /openingHoursProfile/,
    "openingHoursProfile est présent dans les settings"
  );

  assertRegex(
    types,
    /calendarExceptions/,
    "calendarExceptions est présent dans les settings"
  );

  console.log("");
  console.log("=== Vérification opening hours profile ===");

  assertRegex(
    schedulingTypes,
    /export\s+interface\s+RuntimeOpeningHoursProfile/,
    "RuntimeOpeningHoursProfile est déclaré"
  );

  assertRegex(
    schedulingTypes,
    /\bkey\s*:/,
    "RuntimeOpeningHoursProfile contient key"
  );

  assertRegex(
    schedulingTypes,
    /\blabel\s*:/,
    "RuntimeOpeningHoursProfile contient label"
  );

  assertRegex(
    engine,
    /DEFAULT_WORKSPACE_OPENING_HOURS/,
    "RuntimeSchedulingSettingsEngine réutilise DEFAULT_WORKSPACE_OPENING_HOURS"
  );

  assertRegex(
    engine,
    /openingHoursProfile/,
    "RuntimeSchedulingSettingsEngine résout openingHoursProfile"
  );

  console.log("");
  console.log("=== Vérification moteur ===");

  assertRegex(
    engine,
    /RuntimeSchedulingSettingsEngine/,
    "RuntimeSchedulingSettingsEngine est déclaré"
  );

  assertRegex(
    engine,
    /\bresolve\s*\(/,
    "RuntimeSchedulingSettingsEngine expose resolve()"
  );

  assertRegex(
    engine,
    /\bvalidate\s*\(/,
    "RuntimeSchedulingSettingsEngine expose validate()"
  );

  assertOrder(
    engine,
    [
      {
        label: "engine defaults",
        patterns: [
          /DEFAULT_RUNTIME_SCHEDULING_SETTINGS/,
          /engineDefaults/,
          /defaultSettings/,
          /defaults/,
        ],
      },
      {
        label: "module.scheduling",
        patterns: [/module\.scheduling/, /moduleScheduling/, /moduleSettingsFromMetadata/],
      },
      {
        label: "tenantSettings",
        patterns: [/tenantSettings/, /tenant.*settings/i],
      },
      {
        label: "workspaceSettings",
        patterns: [/workspaceSettings/, /workspace.*settings/i],
      },
      {
        label: "moduleSettings",
        patterns: [/moduleSettings/, /module.*settings/i],
      },
    ],
    "Ordre de fusion détecté : defaults → module.scheduling → tenant → workspace → module"
  );

  console.log("");
  console.log("=== Vérification validation métier ===");

  assertRegex(
    engine,
    /defaultDurationMinutes/,
    "validate() contrôle defaultDurationMinutes"
  );

  assertRegex(engine, /bufferMinutes/, "validate() contrôle bufferMinutes");

  assertRegex(engine, /capacity/, "validate() contrôle capacity");

  assertRegex(
    engine,
    /(throw new Error|errors\.push|return\s+\{[^}]*valid)/s,
    "validate() retourne ou lève des erreurs de validation"
  );

  console.log("");
  console.log("=== Vérification backups ===");

  scanBackups();

  console.log("");
  console.log("[Q22E9C2_AUDIT_OK] RuntimeSchedulingSettingsEngine audité.");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  git status --short");
  console.log(
    "  git add .\\scripts\\runtime\\audit-q22e9c2-scheduling-settings-engine.cjs"
  );
  console.log(
    '  git commit -m "test(runtime): audit scheduling settings engine"'
  );
  console.log("  git tag q22e9c2-scheduling-settings-engine-audit");
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