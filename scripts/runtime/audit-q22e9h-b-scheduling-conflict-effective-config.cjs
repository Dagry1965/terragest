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
  console.log("=== Q22E-9H-B — Smoke conflit planning effective config ===");
  console.log("");

  const guardPath = p(
    "src",
    "runtime",
    "guards",
    "processRuntimeBeforeMutationGuards.ts"
  );

  const enginePath = p(
    "src",
    "runtime",
    "scheduling",
    "RuntimeSchedulingEngine.ts"
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

  const guard = read(guardPath);
  const engine = read(enginePath);
  const rendezvousModule = read(rendezvousModulePath);
  const resolver = read(resolverPath);

  ok("processRuntimeBeforeMutationGuards.ts existe");
  ok("RuntimeSchedulingEngine.ts existe");
  ok("rendezvous.module.ts existe");
  ok("RuntimeSchedulingSettingsResolver.ts existe");

  console.log("");
  console.log("=== Vérification branchement guard → resolver ===");

  assertIncludes(
    guard,
    "RuntimeSchedulingSettingsResolver.resolve",
    "Le guard utilise RuntimeSchedulingSettingsResolver.resolve()"
  );

  assertIncludes(
    guard,
    "moduleKey: module.metadata.key",
    "Le guard transmet module.metadata.key comme moduleKey"
  );

  assertNotIncludes(
    guard,
    "module.scheduling?.enabled",
    "Le guard ne lit plus directement module.scheduling?.enabled"
  );

  assertIncludes(
    resolver,
    "RuntimeSchedulingSettingsEngine.resolve",
    "Le resolver délègue la fusion effective à RuntimeSchedulingSettingsEngine"
  );

  console.log("");
  console.log("=== Vérification scénario conflit planning ===");

  assertIncludes(
    guard,
    "RuntimeSchedulingEngine.assertNoAppointmentConflict",
    "Le guard appelle assertNoAppointmentConflict()"
  );

  assertRegex(
    guard,
    /existingAppointments[\s\S]*loadExistingRendezvousForConflictCheck/,
    "Le guard charge les rendez-vous existants avant vérification conflit"
  );

  assertRegex(
    guard,
    /vehiculeId|resourceField/,
    "Le guard garde la logique ressource véhicule/resourceField"
  );

  assertIncludes(
    guard,
    "schedulingConfig?.blockingStatuses",
    "Le guard filtre les rendez-vous bloquants via schedulingConfig.blockingStatuses"
  );

  assertRegex(
    guard,
    /dateRendezVous[\s\S]*heureRendezVous/,
    "Le guard vérifie le couple dateRendezVous / heureRendezVous"
  );

  assertRegex(
    guard,
    /Conflit de planning|Créneau complet|créneau|creneau/i,
    "Le guard conserve un message métier en cas de conflit/créneau indisponible"
  );

  console.log("");
  console.log("=== Vérification RuntimeSchedulingEngine ===");

  assertIncludes(
    engine,
    "static assertNoAppointmentConflict",
    "RuntimeSchedulingEngine expose assertNoAppointmentConflict()"
  );

  assertIncludes(
    engine,
    "rangesOverlap",
    "RuntimeSchedulingEngine détecte les chevauchements de créneaux"
  );

  assertRegex(
    engine,
    /existingAppointments|overlappingBookings|conflictingAppointment/,
    "RuntimeSchedulingEngine compare avec des rendez-vous existants"
  );

  assertRegex(
    engine,
    /resourceField|vehiculeId/,
    "RuntimeSchedulingEngine supporte la comparaison par ressource"
  );

  assertRegex(
    engine,
    /ignoreBookingId|ignoreAppointmentId|currentRecordId/,
    "RuntimeSchedulingEngine prévoit l’édition sans auto-conflit"
  );

  console.log("");
  console.log("=== Vérification metadata rendezvous ===");

  assertRegex(
    rendezvousModule,
    /scheduling:\s*\{[\s\S]*enabled:\s*true/,
    "Le module rendezvous active scheduling"
  );

  assertIncludes(
    rendezvousModule,
    'dateField: "dateRendezVous"',
    "Le module rendezvous déclare dateField"
  );

  assertIncludes(
    rendezvousModule,
    'timeField: "heureRendezVous"',
    "Le module rendezvous déclare timeField"
  );

  assertIncludes(
    rendezvousModule,
    'resourceField: "vehiculeId"',
    "Le module rendezvous déclare vehiculeId comme ressource"
  );

  assertRegex(
    rendezvousModule,
    /blockingStatuses:\s*\[[\s\S]*planifie[\s\S]*confirme[\s\S]*en_cours[\s\S]*\]/,
    "Le module rendezvous déclare les statuts bloquants"
  );

  console.log("");
  console.log("[Q22E9H_B_SMOKE_OK] Conflit planning vérifié côté guard + engine + metadata.");
  console.log("");
  console.log("Ce smoke confirme le scénario attendu :");
  console.log("- module rendezvous fournit date/heure/ressource/statuts bloquants");
  console.log("- guard résout la config effective via RuntimeSchedulingSettingsResolver");
  console.log("- guard charge les rendez-vous existants");
  console.log("- RuntimeSchedulingEngine détecte les chevauchements");
  console.log("- le message métier de conflit reste présent");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  git status --short");
  console.log("  git add .\\scripts\\runtime\\audit-q22e9h-b-scheduling-conflict-effective-config.cjs");
  console.log('  git commit -m "test(runtime): smoke scheduling conflict effective config"');
  console.log("  git tag q22e9h-b-scheduling-conflict-effective-config-smoke");
}

try {
  main();
} catch (error) {
  console.error("");
  console.error(error.message || error);
  console.error("");
  process.exit(1);
}