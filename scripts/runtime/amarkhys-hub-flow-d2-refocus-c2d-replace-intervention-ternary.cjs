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
  "AMARKHYS-HUB-FLOW-D2-REFOCUS-C2D-replace-intervention-ternary.md"
);

const BACKUP = `${TARGET}.bak-c2d-replace-intervention-ternary`;

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

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C2D] Replace whole intervention ternary with compact table");

if (!fs.existsSync(TARGET)) {
  fail(`Missing target: ${TARGET}`);
}

const before = fs.readFileSync(TARGET, "utf8");

writeUtf8NoBom(BACKUP, before);
ok(`Backup written: ${path.relative(ROOT, BACKUP)}`);

const startMarker = "                      {interventionsForSelectedRendezvous.length > 0 ? (";
const endMarker = `                      ) : (
                        <EmptyCard>Aucune intervention liée à ce rendez-vous.</EmptyCard>
                      )}`;

const startIndex = before.indexOf(startMarker);
if (startIndex === -1) {
  fail("Start marker not found: interventionsForSelectedRendezvous ternary.");
}

const endIndex = before.indexOf(endMarker, startIndex);
if (endIndex === -1) {
  fail("End marker not found: intervention empty fallback.");
}

const replaceEndIndex = endIndex + endMarker.length;

const oldBlock = before.slice(startIndex, replaceEndIndex);

if (!oldBlock.includes("interventionsForSelectedRendezvous")) {
  fail("Safety check failed: old block does not contain interventionsForSelectedRendezvous.");
}

if (!before.includes("2. Interventions liées au rendez-vous")) {
  fail("Intervention section title missing before patch.");
}

const newBlock = `                      {interventionsForSelectedRendezvous.length > 0 ? (
                        <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
                          <table className="min-w-full text-left text-sm">
                            <thead className="bg-slate-950 text-xs uppercase tracking-wide text-white">
                              <tr>
                                <th className="w-12 px-4 py-3">#</th>
                                <th className="px-4 py-3">Intervention</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Statut</th>
                                <th className="px-4 py-3 text-right">Montant</th>
                                <th className="px-4 py-3">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                              {interventionsForSelectedRendezvous.map((intervention, index) => {
                                const isSelected =
                                  recordId(intervention) === recordId(selectedIntervention);

                                return (
                                  <tr
                                    key={recordId(intervention)}
                                    data-amarkhys-hub-flow-d2-refocus-c2d="INTERVENTION_COMPACT_ROW"
                                    onClick={() => setSelectedInterventionId(recordId(intervention))}
                                    className={[
                                      "cursor-pointer transition",
                                      isSelected ? "bg-emerald-50" : "hover:bg-slate-50",
                                    ].join(" ")}
                                  >
                                    <td className="px-4 py-3 text-slate-400">
                                      {index + 1}
                                    </td>
                                    <td className="px-4 py-3">
                                      <p className="font-extrabold text-slate-950">
                                        {text(intervention, ["displayLabel", "numeroIntervention", "titre", "dateIntervention"])}
                                      </p>
                                      <p className="mt-1 text-xs text-slate-500">
                                        {text(intervention, ["typeIntervention", "natureIntervention", "description"], "Intervention atelier")}
                                      </p>
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">
                                      {text(intervention, ["dateIntervention", "dateDebut", "createdAt"])}
                                    </td>
                                    <td className="px-4 py-3">
                                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                                        {text(intervention, ["statut", "status"], "suivi")}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3 text-right font-bold text-slate-950">
                                      {text(intervention, ["montantTTC", "totalTTC", "montantHT", "montantTotal"], "0")}
                                    </td>
                                    <td className="px-4 py-3">
                                      <button
                                        type="button"
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          setSelectedInterventionId(recordId(intervention));
                                        }}
                                        className={[
                                          "rounded-full px-3 py-1.5 text-xs font-bold",
                                          isSelected
                                            ? "bg-emerald-700 text-white"
                                            : "bg-slate-100 text-slate-900",
                                        ].join(" ")}
                                      >
                                        {isSelected ? "Sélectionnée" : "Sélectionner"}
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <EmptyCard>Aucune intervention liée à ce rendez-vous.</EmptyCard>
                      )}`;

const after = before.slice(0, startIndex) + newBlock + before.slice(replaceEndIndex);

const forbiddenMarkers = [
  "Q2_HUB_CLIENT_FINAL_C2_EXPAND_INTERVENTION_LINES",
  "Masquer les lignes",
  "Voir les lignes",
  "data-q2-hub-client-final-c2",
];

const checks = [
  ["component changed", after !== before],
  ["compact table marker added", after.includes("INTERVENTION_COMPACT_ROW")],
  ["old expand card markers removed", forbiddenMarkers.every((marker) => !after.includes(marker))],
  ["rdv block preserved", after.includes("1. Choisir un rendez-vous")],
  ["intervention block preserved", after.includes("2. Interventions liées au rendez-vous")],
  ["selectedRendezvous preserved", after.includes("selectedRendezvous")],
  ["interventionsForSelectedRendezvous preserved", after.includes("interventionsForSelectedRendezvous")],
  ["selectedIntervention state preserved", after.includes("selectedIntervention") && after.includes("setSelectedInterventionId")],
  ["empty intervention fallback preserved", after.includes("Aucune intervention liée à ce rendez-vous.")],
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
  "# AMARKHYS-HUB-FLOW-D2-REFOCUS-C2D — Replace intervention ternary",
  "",
  `Target: \`${path.relative(ROOT, TARGET)}\``,
  `Backup: \`${path.relative(ROOT, BACKUP)}\``,
  "",
  "## Goal",
  "",
  "Replace the whole intervention rendering ternary with a compact table, removing broken leftover JSX from the previous C2B attempt.",
  "",
  "## Scope",
  "",
  "- Replaced only the intervention list ternary.",
  "- Preserved selected rendez-vous filtering.",
  "- Preserved selected intervention behavior.",
  "- Preserved RDV block.",
  "- Preserved invoice/payment downstream logic.",
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

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C2D] DONE");
console.log("[NEXT] pnpm build");