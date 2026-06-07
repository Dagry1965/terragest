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
  "AMARKHYS-HUB-FLOW-D2-REFOCUS-C2E-remove-orphan-intervention-tail.md"
);

const BACKUP = `${TARGET}.bak-c2e-remove-orphan-intervention-tail`;

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

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C2E] Remove orphan intervention tail after compact table");

if (!fs.existsSync(TARGET)) {
  fail(`Missing target: ${TARGET}`);
}

const before = fs.readFileSync(TARGET, "utf8");

writeUtf8NoBom(BACKUP, before);
ok(`Backup written: ${path.relative(ROOT, BACKUP)}`);

const tableClose = "                          </table>";
const fallbackStart = "                      ) : (";

const tableIndex = before.indexOf(tableClose);
if (tableIndex === -1) {
  fail("Could not find compact table closing marker.");
}

const fallbackIndex = before.indexOf(fallbackStart, tableIndex);
if (fallbackIndex === -1) {
  fail("Could not find fallback marker after intervention table.");
}

const between = before.slice(tableIndex + tableClose.length, fallbackIndex);

const requiredResidueMarkers = [
  "ERPRelatedRecordsPanel",
  "lignesInterventionChild",
  "parentRecord={intervention}",
  "isSelected ?",
];

for (const marker of requiredResidueMarkers) {
  if (!between.includes(marker)) {
    fail(`Expected orphan residue marker not found between table and fallback: ${marker}`);
  }
}

const after =
  before.slice(0, tableIndex + tableClose.length) +
  "\n                        </div>\n" +
  before.slice(fallbackIndex);

const forbiddenMarkers = [
  "parentRecord={intervention}",
  "child={lignesInterventionChild}",
  "Q2_HUB_CLIENT_FINAL_C2_EXPAND_INTERVENTION_LINES",
  "Masquer les lignes",
  "Voir les lignes",
];

const checks = [
  ["component changed", after !== before],
  ["compact table marker preserved", after.includes("INTERVENTION_COMPACT_ROW")],
  ["old orphan intervention detail removed", !after.includes("parentRecord={intervention}")],
  ["old line child detail removed from intervention section", !after.includes("child={lignesInterventionChild}")],
  ["old expand labels removed", forbiddenMarkers.every((marker) => !after.includes(marker))],
  ["fallback preserved", after.includes("Aucune intervention")],
  ["rdv block preserved", after.includes("1. Choisir un rendez-vous") || after.includes("1. Choisir un rendez-vous".replace("é", "é"))],
  ["intervention block preserved", after.includes("2. Interventions")],
  ["factures downstream preserved", after.includes("child={facturesChild}")],
  ["encaissements downstream preserved", after.includes("InvoicePaymentsHistory")],
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
  "# AMARKHYS-HUB-FLOW-D2-REFOCUS-C2E — Remove orphan intervention tail",
  "",
  `Target: \`${path.relative(ROOT, TARGET)}\``,
  `Backup: \`${path.relative(ROOT, BACKUP)}\``,
  "",
  "## Goal",
  "",
  "Remove the orphan JSX residue left after the compact intervention table.",
  "",
  "## Scope",
  "",
  "- Removed only the old intervention detail residue between `</table>` and the fallback.",
  "- Preserved compact intervention table.",
  "- Preserved selected rendez-vous filtering.",
  "- Preserved selected intervention state.",
  "- Preserved factures and encaissements downstream sections.",
  "- Did not add detail rows yet.",
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

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C2E] DONE");
console.log("[NEXT] pnpm build");