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
  "AMARKHYS-HUB-FLOW-D2-REFOCUS-C4B-remove-standalone-invoices-block.md"
);

const BACKUP = `${TARGET}.bak-c4b-remove-standalone-invoices-block`;

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

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C4B] Remove standalone invoice block after intervention detail");

if (!fs.existsSync(TARGET)) {
  fail(`Missing target: ${TARGET}`);
}

const before = fs.readFileSync(TARGET, "utf8");

writeUtf8NoBom(BACKUP, before);
ok(`Backup written: ${path.relative(ROOT, BACKUP)}`);

const requiredMarkers = [
  "INTERVENTION_LINES_DETAIL_ROW",
  "INTERVENTION_INVOICES_DETAIL_BLOCK",
  "child={facturesChild}",
  "InvoicePaymentsHistory",
  "INTERVENTION_COMPACT_ROW",
];

for (const marker of requiredMarkers) {
  if (!before.includes(marker)) {
    fail(`Missing required marker before patch: ${marker}`);
  }
}

/**
 * C4 added factures inside the selected intervention detail row.
 * The old standalone factures block is the downstream block:
 *
 *   {selectedIntervention ? (
 *     <ERPRelatedRecordsPanel
 *       parentModule={interventionsautoModule}
 *       parentRecord={selectedIntervention}
 *       child={facturesChild}
 *       mode="detail"
 *     />
 *   ) : null}
 *
 * It must be removed to match target hub_interv_3.
 * The nested C4 invoice block uses parentRecord={intervention}; keep it.
 */
const standaloneBlock = `                    {selectedIntervention ? (
                      <ERPRelatedRecordsPanel
                        parentModule={interventionsautoModule}
                        parentRecord={selectedIntervention}
                        child={facturesChild}
                        mode="detail"
                      />
                    ) : null}

`;

let after = before;

if (!after.includes(standaloneBlock)) {
  fail("Standalone selectedIntervention factures block not found. Manual inspection required.");
}

after = after.replace(standaloneBlock, "");

const checks = [
  ["component changed", after !== before],
  ["compact intervention table preserved", after.includes("INTERVENTION_COMPACT_ROW")],
  ["intervention lines detail preserved", after.includes("INTERVENTION_LINES_DETAIL_ROW")],
  ["nested intervention invoices preserved", after.includes("INTERVENTION_INVOICES_DETAIL_BLOCK")],
  ["nested invoices still scoped to row intervention", after.includes("parentRecord={intervention}") && after.includes("child={facturesChild}")],
  ["standalone selectedIntervention invoice block removed", !after.includes("parentRecord={selectedIntervention}\n                        child={facturesChild}")],
  ["encaissements section preserved for C5", after.includes("InvoicePaymentsHistory")],
  ["selected invoice logic preserved for now", after.includes("selectedInvoice")],
  ["rdv filter preserved", after.includes("interventionsForSelectedRendezvous")],
  ["selected vehicle card not reintroduced", !after.includes("Véhicule sélectionné") && !after.includes("Vehicule sélectionné")],
  ["old expand labels not reintroduced", !after.includes("Voir les lignes") && !after.includes("Masquer les lignes")],
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
  "# AMARKHYS-HUB-FLOW-D2-REFOCUS-C4B — Remove standalone invoices block",
  "",
  `Target: \`${path.relative(ROOT, TARGET)}\``,
  `Backup: \`${path.relative(ROOT, BACKUP)}\``,
  "",
  "## Goal",
  "",
  "Remove the standalone `Factures liées` block after the intervention section because invoices are now displayed inside the selected intervention detail row.",
  "",
  "## Scope",
  "",
  "- Preserved compact intervention table.",
  "- Preserved intervention lines in detail row.",
  "- Preserved invoices inside intervention detail row.",
  "- Removed only the old standalone selectedIntervention invoice panel.",
  "- Preserved encaissements section for C5.",
  "- Did not move payments yet.",
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

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C4B] DONE");
console.log("[NEXT] pnpm build");