const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/components/erp/hub/ERPClientOperationalSheet.tsx";
const fullPath = path.join(root, file);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", file);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2-hub-client-final-c2-expand-intervention-lines`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

if (source.includes("Q2_HUB_CLIENT_FINAL_C2_EXPAND_INTERVENTION_LINES")) {
  console.log("[SKIP] Expandable intervention lines already patched.");
  process.exit(0);
}

const oldInterventionReturn = `                            return (
                              <button
                                key={recordId(intervention)}
                                type="button"
                                onClick={() => setSelectedInterventionId(recordId(intervention))}
                                className={[
                                  "rounded-[1.5rem] border p-4 text-left transition",
                                  isSelected
                                    ? "border-emerald-400 bg-emerald-50"
                                    : "border-slate-200 bg-slate-50 hover:border-emerald-200",
                                ].join(" ")}
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
                                    {isSelected ? "Ouverte" : "Ouvrir"}
                                  </span>
                                </div>
                              </button>
                            );`;

const newInterventionReturn = `                            return (
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

if (!source.includes(oldInterventionReturn)) {
  console.error("[PATCH_FAILED] Intervention return block not found.");
  process.exit(1);
}

source = source.replace(oldInterventionReturn, newInterventionReturn);

const oldGlobalLinesPanel = `
                    {selectedIntervention ? (
                      <ERPRelatedRecordsPanel
                        parentModule={interventionsautoModule}
                        parentRecord={selectedIntervention}
                        child={lignesInterventionChild}
                        mode="detail"
                      />
                    ) : null}

`;

if (!source.includes(oldGlobalLinesPanel)) {
  console.error("[PATCH_FAILED] Global lines panel block not found.");
  process.exit(1);
}

source = source.replace(oldGlobalLinesPanel, "");

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
console.log("[Q2-HUB-CLIENT-FINAL-C2] Intervention expandable lines integrated.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");