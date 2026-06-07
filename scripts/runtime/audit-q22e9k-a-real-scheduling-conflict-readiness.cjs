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
  console.log("=== Q22E-9K-A — Real scheduling conflict readiness audit ===");
  console.log("");

  const files = {
    planning: p("src", "components", "erp", "scheduling", "ERPSchedulingPlanningView.tsx"),
    guards: p("src", "runtime", "guards", "processRuntimeBeforeMutationGuards.ts"),
    engine: p("src", "runtime", "scheduling", "RuntimeSchedulingEngine.ts"),
    resolver: p("src", "runtime", "scheduling", "settings", "RuntimeSchedulingSettingsResolver.ts"),
    mutation: p("src", "runtime", "firestore", "FirestoreRuntimeMutation.ts"),
    rendezvous: p("src", "runtime", "modules", "generated", "rendezvous", "rendezvous.module.ts"),
  };

  const content = Object.fromEntries(
    Object.entries(files).map(([key, file]) => [key, read(file)])
  );

  for (const [key, file] of Object.entries(files)) {
    ok(`${key} existe : ${path.relative(ROOT, file)}`);
  }

  console.log("");
  console.log("=== Planning ===");

  assertIncludes(
    content.planning,
    "RuntimeSchedulingSettingsResolver.resolve",
    "Planning utilise RuntimeSchedulingSettingsResolver.resolve()"
  );

  assertIncludes(
    content.planning,
    "moduleKey: module.metadata.key",
    "Planning utilise module.metadata.key comme moduleKey"
  );

  assertNotIncludes(
    content.planning,
    "module.scheduling?.enabled",
    "Planning ne lit plus directement module.scheduling?.enabled"
  );

  assertIncludes(
    content.planning,
    "RuntimeSchedulingEngine.getAvailableSlotsWithBookings",
    "Planning utilise getAvailableSlotsWithBookings()"
  );

  assertIncludes(
    content.planning,
    "capacity: schedulingConfig.capacity",
    "Planning transmet capacity à l’engine"
  );

  console.log("");
  console.log("=== Guards ===");

  assertIncludes(
    content.guards,
    "RuntimeSchedulingSettingsResolver.resolveForRuntimeGuard",
    "Guard utilise resolveForRuntimeGuard()"
  );

  assertIncludes(
    content.guards,
    "RuntimeSchedulingEngine.assertNoAppointmentConflict",
    "Guard vérifie les conflits de RDV"
  );

  assertIncludes(
    content.guards,
    "RuntimeSchedulingEngine.getAvailableSlotsWithBookings",
    "Guard vérifie la capacité via getAvailableSlotsWithBookings()"
  );

  assertIncludes(
    content.guards,
    "existingAppointments",
    "Guard charge/transmet les rendez-vous existants"
  );

  assertIncludes(
    content.guards,
    "ignoreAppointmentId",
    "Guard évite l’auto-conflit en édition"
  );

  assertIncludes(
    content.guards,
    "schedulingConfig?.blockingStatuses",
    "Guard filtre selon les statuts bloquants"
  );

  assertRegex(
    content.guards,
    /Créneau complet|Créneau complet|Conflit de planning|cr[eé]neau|creneau/i,
    "Guard conserve un message métier conflit/capacité"
  );

  console.log("");
  console.log("=== Engine ===");

  assertIncludes(
    content.engine,
    "static assertNoAppointmentConflict",
    "Engine expose assertNoAppointmentConflict()"
  );

  assertIncludes(
    content.engine,
    "rangesOverlap",
    "Engine détecte les chevauchements"
  );

  assertIncludes(
    content.engine,
    "usedCapacity = overlappingBookings.length",
    "Engine calcule la capacité utilisée"
  );

  assertIncludes(
    content.engine,
    "remainingCapacity",
    "Engine calcule la capacité restante"
  );

  console.log("");
  console.log("=== Mutation context ===");

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
  console.log("=== Rendezvous metadata ===");

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
    "Rendezvous utilise vehiculeId comme ressource"
  );

  assertIncludes(
    content.rendezvous,
    "capacity: 1",
    "Rendezvous déclare capacity 1"
  );

  assertRegex(
    content.rendezvous,
    /blockingStatuses:\s*\[[\s\S]*planifie[\s\S]*confirme[\s\S]*en_cours[\s\S]*\]/,
    "Rendezvous déclare les statuts bloquants"
  );

  console.log("");
  console.log("[Q22E9K_A_REAL_CONFLICT_READINESS_OK]");
  console.log("");
  console.log("Test manuel recommandé ensuite :");
  console.log("1. Créer un RDV véhicule A à une date/heure donnée.");
  console.log("2. Créer un deuxième RDV même véhicule, même date, même heure.");
  console.log("3. Attendu : blocage conflit planning ou créneau complet.");
  console.log("4. Créer un RDV autre véhicule même créneau.");
  console.log("5. Attendu : accepté si la logique resourceField le permet.");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  git status --short");
  console.log("  git add .\\scripts\\runtime\\audit-q22e9k-a-real-scheduling-conflict-readiness.cjs");
  console.log('  git commit -m "test(runtime): audit real scheduling conflict readiness"');
  console.log("  git tag q22e9k-a-real-scheduling-conflict-readiness-audit");
}

try {
  main();
} catch (error) {
  console.error("");
  console.error(error.message || error);
  console.error("");
  process.exit(1);
}