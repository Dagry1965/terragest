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
  "AMARKHYS-HUB-FLOW-D2-REFOCUS-C2B-interventions-table-real-names.md"
);

const BACKUP = `${TARGET}.bak-c2b-interventions-table-real-names`;

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

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C2B] Convert interventions cards to compact table");

if (!fs.existsSync(TARGET)) {
  fail(`Missing target: ${TARGET}`);
}

const before = fs.readFileSync(TARGET, "utf8");

writeUtf8NoBom(BACKUP, before);
ok(`Backup written: ${path.relative(ROOT, BACKUP)}`);

const requiredMarkers = [
  "Interventions liées au rendez-vous",
  "selectedRendezvous",
  "interventionsForSelectedRendezvous",
  "selectedInterventionId",
  "setSelectedInterventionId",
  "Q2_HUB_CLIENT_FINAL_C2_EXPAND_INTERVENTION_LINES",
];

for (const marker of requiredMarkers) {
  if (!before.includes(marker)) {
    fail(`Missing required marker before patch: ${marker}`);
  }
}

let after = before;

const oldBlock = `                      {interventionsForSelectedRendezvous.length > 0 ? (
                        <div className="mt-4 grid gap-3">
                          {interventionsForSelectedRendezvous.map((intervention) => {
                            const isSelected =
                              recordId(intervention) === recordId(selectedIntervention);

                            return (
                              <div
                                key={recordId(intervention)}
                                data-q2-hub-client-final-c2="Q2_HUB_CLIENT_FINAL_C2_EXPAND_INTERVENTION_LINES"
                                className={[
                                  "rounded-[1.5rem] border transition",
                                  isSelected
                                    ? "border-emerald-400 bg-emerald-50"
                                    : "border-slate-200 bg-slate-50",
                                ].join(" ")}
                              >
                                <button
                                  type="button"
                                  onClick={() => setSelectedInterventionId(recordId(intervention))}
                                  className="w-full cursor-pointer p-4 text-left focus:outline-none focus:ring-4 focus:ring-emerald-100"
                                >
                                  <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                      <p className="font-extrabold text-slate-950">
                                        {text(intervention, ["displayLabel", "dateIntervention", "titre", "numeroIntervention"])}
                                      </p>
                                      <p className="mt-1 text-sm text-slate-500">
                                        {text(intervention, ["statut", "status"], "suivi")} · {text(intervention, ["montantTTC", "montantHT"], "0")}
                                      </p>
                                    </div>

                                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-900 ring-1 ring-slate-200">
                                      {isSelected ? "Masquer les lignes" : "Voir les lignes"}
                                    </span>
                                  </div>
                                </button>`;

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
                                    data-amarkhys-hub-flow-d2-refocus-c2b="INTERVENTION_COMPACT_ROW"
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
                          </table>`;

if (!after.includes(oldBlock)) {
  fail("Exact intervention card opening block not found. Stop: manual inspection required.");
}

after = after.replace(oldBlock, newBlock);

const forbiddenAfter = [
  "Q2_HUB_CLIENT_FINAL_C2_EXPAND_INTERVENTION_LINES",
  "Masquer les lignes",
  "Voir les lignes",
  "rounded-[1.5rem] border transition",
];

const checks = [
  ["component changed", after !== before],
  ["compact row marker added", after.includes("INTERVENTION_COMPACT_ROW")],
  ["selectedRendezvous preserved", after.includes("selectedRendezvous")],
  ["interventionsForSelectedRendezvous preserved", after.includes("interventionsForSelectedRendezvous")],
  ["selected intervention state preserved", after.includes("selectedInterventionId") && after.includes("setSelectedInterventionId")],
  ["rdv block preserved", after.includes("1. Choisir un rendez-vous")],
  ["intervention block preserved", after.includes("2. Interventions liées au rendez-vous")],
  ["selected vehicle card not reintroduced", !after.includes("Véhicule sélectionné") && !after.includes("Vehicule sélectionné")],
  ["old card expand labels removed", forbiddenAfter.every((marker) => !after.includes(marker))],
  ["no detail row added in C2B", !after.includes("Détail de l’intervention") && !after.includes("Detail de l’intervention")],
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
  "# AMARKHYS-HUB-FLOW-D2-REFOCUS-C2B — Interventions compact table",
  "",
  `Target: \`${path.relative(ROOT, TARGET)}\``,
  `Backup: \`${path.relative(ROOT, BACKUP)}\``,
  "",
  "## Goal",
  "",
  "Convert interventions linked to the selected rendez-vous from cards to a compact table without adding detail rows yet.",
  "",
  "## Scope",
  "",
  "- Preserved selected rendez-vous filtering.",
  "- Preserved selected intervention state.",
  "- Preserved RDV block.",
  "- Preserved invoice/payment downstream logic.",
  "- Removed only the card-style intervention opening block.",
  "- Did not add intervention line details yet.",
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

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C2B] DONE");
console.log("[NEXT] pnpm build");