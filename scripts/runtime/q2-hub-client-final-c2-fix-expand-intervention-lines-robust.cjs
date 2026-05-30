const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/components/erp/hub/ERPClientOperationalSheet.tsx";
const fullPath = path.join(root, file);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", file);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2-hub-client-final-c2-fix-expand-intervention-lines-robust`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

if (source.includes("Q2_HUB_CLIENT_FINAL_C2_EXPAND_INTERVENTION_LINES")) {
  console.log("[SKIP] Expandable intervention lines already patched.");
  process.exit(0);
}

function indexOrFail(marker, fromIndex = 0) {
  const index = source.indexOf(marker, fromIndex);

  if (index === -1) {
    console.error("[PATCH_FAILED] Marker not found:", marker);
    process.exit(1);
  }

  return index;
}

const mapMarker = "{interventionsForSelectedRendezvous.map((intervention) => {";
const mapIndex = indexOrFail(mapMarker);

const returnMarker = "return (";
const returnIndex = indexOrFail(returnMarker, mapIndex);

const buttonStartMarker = "<button";
const buttonStartIndex = indexOrFail(buttonStartMarker, returnIndex);

const returnEndMarker = "                            );";
const returnEndIndex = indexOrFail(returnEndMarker, buttonStartIndex);
const returnEndExclusive = returnEndIndex + returnEndMarker.length;

const oldReturnBlock = source.slice(returnIndex, returnEndExclusive);

if (!oldReturnBlock.includes("setSelectedInterventionId(recordId(intervention))")) {
  console.error("[PATCH_FAILED] Located intervention return does not contain setSelectedInterventionId.");
  process.exit(1);
}

if (!oldReturnBlock.includes("recordId(intervention)")) {
  console.error("[PATCH_FAILED] Located intervention return does not contain intervention record id.");
  process.exit(1);
}

const newReturnBlock = `return (
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
                                </button>

                                {isSelected ? (
                                  <div className="border-t border-emerald-100 bg-white/80 p-4">
                                    <ERPRelatedRecordsPanel
                                      parentModule={interventionsautoModule}
                                      parentRecord={intervention}
                                      child={lignesInterventionChild}
                                      mode="detail"
                                    />
                                  </div>
                                ) : null}
                              </div>
                            );`;

source = source.slice(0, returnIndex) + newReturnBlock + source.slice(returnEndExclusive);

const globalPanelStartMarker = "                    {selectedIntervention ? (\n                      <ERPRelatedRecordsPanel\n                        parentModule={interventionsautoModule}\n                        parentRecord={selectedIntervention}\n                        child={lignesInterventionChild}";
const globalPanelStart = source.indexOf(globalPanelStartMarker);

if (globalPanelStart === -1) {
  console.error("[PATCH_FAILED] Global selectedIntervention lines panel start not found.");
  process.exit(1);
}

const globalPanelEndMarker = "                    ) : null}\n\n";
const globalPanelEnd = source.indexOf(globalPanelEndMarker, globalPanelStart);

if (globalPanelEnd === -1) {
  console.error("[PATCH_FAILED] Global selectedIntervention lines panel end not found.");
  process.exit(1);
}

source =
  source.slice(0, globalPanelStart) +
  source.slice(globalPanelEnd + globalPanelEndMarker.length);

const required = [
  "Q2_HUB_CLIENT_FINAL_C2_EXPAND_INTERVENTION_LINES",
  "Voir les lignes",
  "Masquer les lignes",
  "parentRecord={intervention}",
  "child={lignesInterventionChild}",
];

for (const marker of required) {
  if (!source.includes(marker)) {
    console.error("[PATCH_FAILED] Required marker missing:", marker);
    process.exit(1);
  }
}

if (source.includes("parentRecord={selectedIntervention}\n                        child={lignesInterventionChild}")) {
  console.error("[PATCH_FAILED] Old global selectedIntervention lines panel still present.");
  process.exit(1);
}

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", file);
console.log("[Q2-HUB-CLIENT-FINAL-C2-FIX] Intervention expandable lines integrated.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");