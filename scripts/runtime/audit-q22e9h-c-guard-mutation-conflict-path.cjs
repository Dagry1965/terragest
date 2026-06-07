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
  console.log("=== Q22E-9H-C — Smoke guard mutation conflict path ===");
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

  const resolverPath = p(
    "src",
    "runtime",
    "scheduling",
    "settings",
    "RuntimeSchedulingSettingsResolver.ts"
  );

  const rendezvousModulePath = p(
    "src",
    "runtime",
    "modules",
    "generated",
    "rendezvous",
    "rendezvous.module.ts"
  );

  const guard = read(guardPath);
  const engine = read(enginePath);
  const resolver = read(resolverPath);
  const rendezvousModule = read(rendezvousModulePath);

  ok("processRuntimeBeforeMutationGuards.ts existe");
  ok("RuntimeSchedulingEngine.ts existe");
  ok("RuntimeSchedulingSettingsResolver.ts existe");
  ok("rendezvous.module.ts existe");

  console.log("");
  console.log("=== Vérification signature guard mutation ===");

  assertRegex(
    guard,
    /export\s+async\s+function\s+processRuntimeBeforeMutationGuards\s*\(\s*module\s*:\s*ERPModule\s*,\s*data\s*:\s*Record<string,\s*unknown>\s*,\s*context\s*:\s*RuntimeBeforeMutationGuardContext\s*\)\s*:\s*Promise<Record<string,\s*unknown>>/,
    "processRuntimeBeforeMutationGuards expose la signature attendue"
  );

  assertRegex(
    guard,
    /context\.operation\s*!==\s*"create"[\s\S]*context\.operation\s*!==\s*"update"/,
    "Le guard ne s'applique qu'aux mutations create/update"
  );

  assertRegex(
    guard,
    /if\s*\(\s*isRendezvousModule\(module\)\s*\)[\s\S]*guardRendezvousMutation/,
    "Les mutations rendezvous passent par guardRendezvousMutation()"
  );

  console.log("");
  console.log("=== Vérification chemin config effective ===");

  assertIncludes(
    guard,
    "RuntimeSchedulingSettingsResolver.resolve",
    "Le guard résout la config via RuntimeSchedulingSettingsResolver.resolve()"
  );

  assertIncludes(
    guard,
    "moduleKey: module.metadata.key",
    "Le guard transmet module.metadata.key au resolver"
  );

  assertRegex(
    resolver,
    /moduleScheduling\s*:\s*input\.module\.scheduling/,
    "Le resolver transmet module.scheduling au moteur comme moduleScheduling"
  );

  assertIncludes(
    resolver,
    "RuntimeSchedulingSettingsEngine.resolve",
    "Le resolver délègue la fusion effective à RuntimeSchedulingSettingsEngine"
  );

  assertNotIncludes(
    guard,
    "module.scheduling?.enabled",
    "Le guard ne lit plus directement module.scheduling?.enabled"
  );

  console.log("");
  console.log("=== Vérification chemin conflit planning ===");

  assertIncludes(
    guard,
    "loadExistingRendezvousForConflictCheck",
    "Le guard charge les rendez-vous existants pour vérifier les conflits"
  );

  assertIncludes(
    guard,
    "RuntimeSchedulingEngine.assertNoAppointmentConflict",
    "Le guard appelle RuntimeSchedulingEngine.assertNoAppointmentConflict()"
  );

  assertRegex(
    guard,
    /const\s+existingAppointments\s*=[\s\S]*loadExistingRendezvousForConflictCheck[\s\S]*RuntimeSchedulingEngine\.assertNoAppointmentConflict\s*\([\s\S]*existingAppointments[\s\S]*ignoreAppointmentId/,
    "Le guard transmet existingAppointments et ignoreAppointmentId à assertNoAppointmentConflict()"
  );

  assertRegex(
    guard,
    /ignoreAppointmentId|ignoreBookingId|context\.id|context\.recordId|mergedRecord\.id/,
    "Le guard prévoit l'édition sans auto-conflit"
  );

  assertRegex(
    guard,
    /schedulingConfig\?\.blockingStatuses\s*\?\?/,
    "Le guard utilise blockingStatuses depuis la config effective"
  );

  assertRegex(
    guard,
    /dateRendezVous[\s\S]*heureRendezVous/,
    "Le guard vérifie dateRendezVous et heureRendezVous"
  );

  assertRegex(
    guard,
    /vehiculeId|resourceField/,
    "Le guard conserve la logique ressource véhicule/resourceField"
  );

  assertRegex(
    guard,
    /Conflit de planning|Créneau complet|Créneau complet|cr[eé]neau|creneau/i,
    "Le guard conserve un message métier de conflit/créneau"
  );

  console.log("");
  console.log("=== Vérification moteur conflit ===");

  assertIncludes(
    engine,
    "static assertNoAppointmentConflict",
    "RuntimeSchedulingEngine expose assertNoAppointmentConflict()"
  );

  assertIncludes(
    engine,
    "rangesOverlap",
    "RuntimeSchedulingEngine utilise rangesOverlap()"
  );

  assertRegex(
    engine,
    /conflictingAppointment|overlappingBookings|existingAppointments/,
    "RuntimeSchedulingEngine compare contre les rendez-vous existants"
  );

  assertRegex(
    engine,
    /resourceField|vehiculeId/,
    "RuntimeSchedulingEngine tient compte de la ressource"
  );

  console.log("");
  console.log("=== Vérification metadata rendezvous ===");

  assertRegex(
    rendezvousModule,
    /metadata:\s*\{[\s\S]*key:\s*"rendezvous"/,
    "Le module rendezvous expose metadata.key"
  );

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
  console.log("[Q22E9H_C_GUARD_MUTATION_CONFLICT_PATH_OK]");
  console.log("");
  console.log("Chemin validé :");
  console.log("- processRuntimeBeforeMutationGuards()");
  console.log("- guardRendezvousMutation()");
  console.log("- RuntimeSchedulingSettingsResolver.resolve()");
  console.log("- RuntimeSchedulingEngine.assertNoAppointmentConflict()");
  console.log("- metadata rendezvous scheduling");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  git status --short");
  console.log("  git add .\\scripts\\runtime\\audit-q22e9h-c-guard-mutation-conflict-path.cjs");
  console.log('  git commit -m "test(runtime): smoke guard mutation conflict path"');
  console.log("  git tag q22e9h-c-guard-mutation-conflict-path-smoke");
}

try {
  main();
} catch (error) {
  console.error("");
  console.error(error.message || error);
  console.error("");
  process.exit(1);
}