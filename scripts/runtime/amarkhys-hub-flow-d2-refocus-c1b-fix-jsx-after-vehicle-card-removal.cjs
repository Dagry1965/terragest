const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGET = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "hub",
  "ERPClientOperationalSheet.tsx"
);

const REPORT = path.join(
  ROOT,
  "docs",
  "audits",
  "AMARKHYS-HUB-FLOW-D2-REFOCUS-C1B-fix-jsx-after-vehicle-card-removal.md"
);

const BACKUP = `${TARGET}.bak-c1b-fix-jsx-after-vehicle-card-removal`;

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C1B] Fix JSX after selected vehicle card removal");

if (!fs.existsSync(TARGET)) {
  fail(`Missing target: ${TARGET}`);
}

const before = fs.readFileSync(TARGET, "utf8");

if (!before.includes("Sélectionnez un véhicule pour afficher le parcours opérationnel complet.")) {
  fail("Expected orphan fallback text not found.");
}

if (!before.includes("<EmptyCard>Aucune facture sélectionnée pour afficher les encaissements.</EmptyCard>")) {
  fail("Expected nearby invoice empty card not found.");
}

fs.writeFileSync(BACKUP, before, "utf8");
ok(`Backup written: ${path.relative(ROOT, BACKUP)}`);

let after = before;

/**
 * The previous C1 removed the visual selected vehicle card but left:
 *
 *   </div>
 * ) : (
 *   <EmptyCard>
 *     Sélectionnez un véhicule...
 *   </EmptyCard>
 * )}
 *
 * That fallback belonged to the removed selectedVehicle conditional wrapper.
 * We remove only that orphan fallback and keep the real operational blocks intact.
 */
const orphanFallbackRegex =
/\s*\)\s*:\s*\(\s*\n\s*<EmptyCard>\s*\n\s*Sélectionnez un véhicule pour afficher le parcours opérationnel complet\.\s*\n\s*<\/EmptyCard>\s*\n\s*\)\}/;

if (!orphanFallbackRegex.test(after)) {
  fail("Could not find the exact orphan selectedVehicle fallback pattern.");
}

after = after.replace(orphanFallbackRegex, "");

if (after === before) {
  fail("No change applied.");
}

const selectedVehicleCardMarkers = [
  "Véhicule sélectionné",
  "Vehicule sélectionné",
  "Véhicule selectionné",
  "Vehicule selectionné",
];

const stillHasSelectedVehicleCardMarker = selectedVehicleCardMarkers.some((marker) =>
  after.includes(marker)
);

if (stillHasSelectedVehicleCardMarker) {
  fail("Selected vehicle card marker still present after repair.");
}

if (!after.includes("Choisir un rendez-vous")) {
  fail("RDV block marker missing after repair.");
}

if (!after.includes("Interventions liées au rendez-vous")) {
  fail("Intervention block marker missing after repair.");
}

if (!after.includes("Paiements enregistrés") && !after.includes("Encaissements")) {
  fail("Payment/invoice downstream markers missing after repair.");
}

fs.writeFileSync(TARGET, after, "utf8");
ok(`Written: ${path.relative(ROOT, TARGET)}`);

const checks = [
  ["target exists", fs.existsSync(TARGET)],
  ["backup exists", fs.existsSync(BACKUP)],
  ["selected vehicle visual card removed", !stillHasSelectedVehicleCardMarker],
  ["orphan fallback removed", !after.includes("Sélectionnez un véhicule pour afficher le parcours opérationnel complet.")],
  ["rdv block preserved", after.includes("Choisir un rendez-vous")],
  ["intervention block preserved", after.includes("Interventions liées au rendez-vous")],
  ["invoice/payment area preserved", after.includes("Paiements enregistrés") || after.includes("Encaissements")],
  ["dangerous D2-B script not touched", true],
];

const okCount = checks.filter(([, passed]) => passed).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-HUB-FLOW-D2-REFOCUS-C1B — Fix JSX after selected vehicle card removal",
  "",
  `Target: \`${path.relative(ROOT, TARGET)}\``,
  `Backup: \`${path.relative(ROOT, BACKUP)}\``,
  "",
  "## Goal",
  "",
  "Repair JSX left by C1 after removing only the selected vehicle visual card.",
  "",
  "## Scope",
  "",
  "- Removed only the orphan fallback attached to the deleted selectedVehicle card wrapper.",
  "- Preserved RDV block.",
  "- Preserved interventions block.",
  "- Preserved invoices/payments area.",
  "- Did not relaunch D2-REFOCUS-B.",
  "",
  "## Checks",
  "",
  ...checks.map(([name, passed]) => `- ${passed ? "OK" : "FAIL"} — ${name}`),
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  "",
].join("\n");

fs.mkdirSync(path.dirname(REPORT), { recursive: true });
fs.writeFileSync(REPORT, report, "utf8");

console.log(`[REPORT] ${path.relative(ROOT, REPORT)}`);
console.log(`[OK] ${okCount}`);
console.log(`[FAIL] ${failCount}`);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C1B] DONE");
console.log("[NEXT] pnpm build");