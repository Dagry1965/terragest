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
  "AMARKHYS-HUB-FLOW-D2-REFOCUS-C2C-fix-leftover-card-tail.md"
);

const BACKUP = `${TARGET}.bak-c2c-fix-leftover-card-tail`;

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

function writeUtf8NoBom(filePath, content) {
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
}

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C2C] Fix leftover card tail after compact table");

if (!fs.existsSync(TARGET)) {
  fail(`Missing target: ${TARGET}`);
}

const before = fs.readFileSync(TARGET, "utf8");

writeUtf8NoBom(BACKUP, before);
ok(`Backup written: ${path.relative(ROOT, BACKUP)}`);

const requiredMarkers = [
  "INTERVENTION_COMPACT_ROW",
  "Interventions liées au rendez-vous",
  "interventionsForSelectedRendezvous",
  "selectedRendezvous",
];

for (const marker of requiredMarkers) {
  if (!before.includes(marker)) {
    fail(`Missing required marker before repair: ${marker}`);
  }
}

let after = before;

/**
 * C2B replaced the old intervention card opening with a table,
 * but the old card detail tail remained after </table>.
 *
 * We remove only the orphan tail between:
 *   </table>
 * and the real ternary fallback:
 *   ) : (
 *     <EmptyCard>Aucune intervention liée à ce rendez-vous.</EmptyCard>
 */
const tableMarker = "                          </table>";
const fallbackMarker = `                      ) : (
                        <EmptyCard>Aucune intervention liée à ce rendez-vous.</EmptyCard>
                      )}`;

const tableIndex = after.indexOf(tableMarker);
if (tableIndex === -1) {
  fail("Could not find compact table closing marker.");
}

const fallbackIndex = after.indexOf(fallbackMarker, tableIndex);
if (fallbackIndex === -1) {
  fail("Could not find intervention empty fallback after compact table.");
}

const between = after.slice(tableIndex + tableMarker.length, fallbackIndex);

const hasOldTail =
  between.includes("isSelected ?") ||
  between.includes("Masquer les lignes") ||
  between.includes("Voir les lignes") ||
  between.includes("ERPRelatedRecordsPanel") ||
  between.includes("toggleExpandedIntervention") ||
  between.includes("data-q2-hub-client-final-c2");

if (!hasOldTail) {
  fail("No obvious leftover old card tail detected between table and fallback.");
}

const replacementBetween = "\n                        </div>\n";

after =
  after.slice(0, tableIndex + tableMarker.length) +
  replacementBetween +
  after.slice(fallbackIndex);

const forbiddenMarkers = [
  "Masquer les lignes",
  "Voir les lignes",
  "Q2_HUB_CLIENT_FINAL_C2_EXPAND_INTERVENTION_LINES",
];

const checks = [
  ["component changed", after !== before],
  ["compact table still present", after.includes("INTERVENTION_COMPACT_ROW")],
  ["old expand labels removed", forbiddenMarkers.every((marker) => !after.includes(marker))],
  ["intervention fallback preserved", after.includes("Aucune intervention liée à ce rendez-vous.")],
  ["rdv block preserved", after.includes("1. Choisir un rendez-vous")],
  ["intervention block preserved", after.includes("2. Interventions liées au rendez-vous")],
  ["selected rendezvous preserved", after.includes("selectedRendezvous")],
  ["selected intervention setter preserved", after.includes("setSelectedInterventionId")],
  ["selected vehicle card not reintroduced", !after.includes("Véhicule sélectionné") && !after.includes("Vehicule sélectionné")],
];

const okCount = checks.filter(([, passed]) => passed).length;
const failCount = checks.length - okCount;

if (failCount > 0) {
  const failed = checks
    .filter(([, passed]) => !passed)
    .map(([name]) => name)
    .join(", ");
  fail(`Checks failed before write: ${failed}`);
}

writeUtf8NoBom(TARGET, after);
ok(`Written: ${path.relative(ROOT, TARGET)}`);

const report = [
  "# AMARKHYS-HUB-FLOW-D2-REFOCUS-C2C — Fix leftover card tail",
  "",
  `Target: \`${path.relative(ROOT, TARGET)}\``,
  `Backup: \`${path.relative(ROOT, BACKUP)}\``,
  "",
  "## Goal",
  "",
  "Remove the orphan JSX tail left after converting intervention cards to a compact table.",
  "",
  "## Scope",
  "",
  "- Removed only the leftover card/detail tail after the new compact intervention table.",
  "- Preserved the compact table.",
  "- Preserved selected rendez-vous filtering.",
  "- Preserved selected intervention behavior.",
  "- Preserved invoice/payment downstream logic.",
  "- Did not add intervention details yet.",
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
writeUtf8NoBom(REPORT, report);

console.log(`[REPORT] ${path.relative(ROOT, REPORT)}`);
console.log(`[OK] ${okCount}`);
console.log(`[FAIL] ${failCount}`);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C2C] DONE");
console.log("[NEXT] pnpm build");