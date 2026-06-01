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
  "AMARKHYS-HUB-FLOW-D2-REFOCUS-C3-intervention-detail-row-lines.md"
);

const BACKUP = `${TARGET}.bak-c3-intervention-detail-row-lines`;

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

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C3] Add full-width detail row with intervention lines");

if (!fs.existsSync(TARGET)) {
  fail(`Missing target: ${TARGET}`);
}

const before = fs.readFileSync(TARGET, "utf8");

writeUtf8NoBom(BACKUP, before);
ok(`Backup written: ${path.relative(ROOT, BACKUP)}`);

const requiredMarkers = [
  "INTERVENTION_COMPACT_ROW",
  "interventionsForSelectedRendezvous.map",
  "selectedIntervention",
  "setSelectedInterventionId",
  "lignesInterventionChild",
  "ERPRelatedRecordsPanel",
];

for (const marker of requiredMarkers) {
  if (!before.includes(marker)) {
    fail(`Missing required marker before patch: ${marker}`);
  }
}

if (before.includes("INTERVENTION_LINES_DETAIL_ROW")) {
  fail("C3 detail row already appears to be installed. Stop to avoid duplicate patch.");
}

let after = before;

const rowMarker = 'data-amarkhys-hub-flow-d2-refocus-c2b="INTERVENTION_COMPACT_ROW"';
const rowMarkerIndex = after.indexOf(rowMarker);

if (rowMarkerIndex === -1) {
  fail("Could not find compact intervention row marker from C2.");
}

const returnStart = after.lastIndexOf("return (", rowMarkerIndex);
if (returnStart === -1) {
  fail("Could not find return block start before compact row marker.");
}

const returnEnd = after.indexOf("                                );", rowMarkerIndex);
if (returnEnd === -1) {
  fail("Could not find return block end after compact row marker.");
}

const returnBlock = after.slice(returnStart, returnEnd + "                                );".length);

if (!returnBlock.includes("<tr") || !returnBlock.includes("</tr>")) {
  fail("Safety check failed: compact return block does not contain a table row.");
}

if (returnBlock.includes("<>") || returnBlock.includes("</>")) {
  fail("Return block already uses a fragment. Manual inspection required.");
}

const openReturn = "return (\n                                  <tr";
const patchedOpenReturn = "return (\n                                  <>\n                                  <tr";

if (!returnBlock.includes(openReturn)) {
  fail("Could not find exact return row opening.");
}

let patchedReturnBlock = returnBlock.replace(openReturn, patchedOpenReturn);

const closeRow = `                                  </tr>
                                );`;

const detailRow = `                                  </tr>
                                  {isSelected ? (
                                    <tr data-amarkhys-hub-flow-d2-refocus-c3="INTERVENTION_LINES_DETAIL_ROW">
                                      <td colSpan={6} className="bg-emerald-50/40 px-4 py-4">
                                        <div className="rounded-[1.5rem] border border-emerald-100 bg-white p-4 shadow-sm">
                                          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                                            <div>
                                              <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                                                Lignes de l'intervention sélectionnée
                                              </p>
                                              <p className="mt-1 text-sm text-slate-500">
                                                Détail opérationnel rattaché uniquement à cette intervention.
                                              </p>
                                            </div>
                                          </div>

                                          <ERPRelatedRecordsPanel
                                            parentModule={interventionsautoModule}
                                            parentRecord={intervention}
                                            child={lignesInterventionChild}
                                            mode="detail"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                  ) : null}
                                  </>
                                );`;

if (!patchedReturnBlock.includes(closeRow)) {
  fail("Could not find exact closing row pattern inside compact return block.");
}

patchedReturnBlock = patchedReturnBlock.replace(closeRow, detailRow);

after =
  after.slice(0, returnStart) +
  patchedReturnBlock +
  after.slice(returnEnd + "                                );".length);

const checks = [
  ["component changed", after !== before],
  ["compact table still present", after.includes("INTERVENTION_COMPACT_ROW")],
  ["detail row marker added", after.includes("INTERVENTION_LINES_DETAIL_ROW")],
  ["detail row uses full table width", after.includes("colSpan={6}")],
  ["line child panel added under intervention row", after.includes("child={lignesInterventionChild}")],
  ["detail row scoped to selected intervention", after.includes("{isSelected ? (")],
  ["selected intervention behavior preserved", after.includes("setSelectedInterventionId")],
  ["selected rendezvous filtering preserved", after.includes("interventionsForSelectedRendezvous")],
  ["factures downstream preserved", after.includes("child={facturesChild}")],
  ["encaissements downstream preserved", after.includes("InvoicePaymentsHistory")],
  ["old expand labels not reintroduced", !after.includes("Voir les lignes") && !after.includes("Masquer les lignes")],
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
  "# AMARKHYS-HUB-FLOW-D2-REFOCUS-C3 — Intervention detail row with lines",
  "",
  `Target: \`${path.relative(ROOT, TARGET)}\``,
  `Backup: \`${path.relative(ROOT, BACKUP)}\``,
  "",
  "## Goal",
  "",
  "Add a full-width detail row under the selected intervention row, showing only the intervention lines.",
  "",
  "## Scope",
  "",
  "- Added a detail `<tr>` under the selected intervention.",
  "- Detail row spans the full compact table width.",
  "- Detail content uses the existing generic `ERPRelatedRecordsPanel`.",
  "- Detail content is scoped to `parentRecord={intervention}`.",
  "- Preserved selected rendez-vous filtering.",
  "- Preserved compact intervention table.",
  "- Did not move factures or encaissements yet.",
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

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C3] DONE");
console.log("[NEXT] pnpm build");