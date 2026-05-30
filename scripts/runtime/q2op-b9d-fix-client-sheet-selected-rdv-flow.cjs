const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/hub/ERPClientOperationalSheet.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-b9d-selected-rdv-flow`;

if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let content = fs.readFileSync(fullPath, "utf8");

/**
 * 1. Imports.
 */
if (!content.includes('rendezvousModule')) {
  content = content.replace(
    `import { ERPRelatedRecordsPanel } from "@/components/erp/runtime/ERPRelatedRecordsPanel";`,
    `import { ERPRelatedRecordsPanel } from "@/components/erp/runtime/ERPRelatedRecordsPanel";
import { InvoicePaymentsHistory } from "@/components/erp/billing/InvoicePaymentsHistory";
import { rendezvousModule } from "@/runtime/modules/generated/rendezvous/rendezvous.module";`
  );
} else if (!content.includes('InvoicePaymentsHistory')) {
  content = content.replace(
    `import { ERPRelatedRecordsPanel } from "@/components/erp/runtime/ERPRelatedRecordsPanel";`,
    `import { ERPRelatedRecordsPanel } from "@/components/erp/runtime/ERPRelatedRecordsPanel";
import { InvoicePaymentsHistory } from "@/components/erp/billing/InvoicePaymentsHistory";`
  );
}

/**
 * 2. Add local selection states after selected vehicle state.
 */
if (!content.includes("const [selectedRendezvousId")) {
  content = content.replace(
    `const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
    selectedVehicleId ?? recordId(vehicles[0]) ?? null
  );`,
    `const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
    selectedVehicleId ?? recordId(vehicles[0]) ?? null
  );

  const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
  const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);`
  );
}

/**
 * 3. Replace previous automatic selected intervention/invoice with selected flow.
 */
const oldSelectionBlock = `const selectedIntervention = interventions[0] ?? null;
  const selectedInvoice = factures[0] ?? null;

  const isCardMode = !["flotte", "entreprise"].includes(clientType.toLowerCase());`;

const newSelectionBlock = `const selectedRendezvous = useMemo(() => {
    return (
      rendezvous.find((item) => recordId(item) === selectedRendezvousId) ??
      rendezvous[0] ??
      null
    );
  }, [rendezvous, selectedRendezvousId]);

  const interventionsForSelectedRendezvous = useMemo(() => {
    if (!selectedRendezvous) {
      return interventions;
    }

    const rendezvousId = recordId(selectedRendezvous);

    const filtered = interventions.filter((intervention) => {
      return [
        "rendezVousId",
        "rendezvousId",
        "rdvId",
      ].some((field) => String(intervention[field] ?? "") === rendezvousId);
    });

    return filtered.length > 0 ? filtered : interventions;
  }, [interventions, selectedRendezvous]);

  const selectedIntervention = useMemo(() => {
    return (
      interventionsForSelectedRendezvous.find(
        (item) => recordId(item) === selectedInterventionId
      ) ??
      interventionsForSelectedRendezvous[0] ??
      null
    );
  }, [interventionsForSelectedRendezvous, selectedInterventionId]);

  const facturesForSelectedIntervention = useMemo(() => {
    if (!selectedIntervention) {
      return [];
    }

    const interventionId = recordId(selectedIntervention);

    const filtered = factures.filter((facture) => {
      return String(facture.interventionId ?? "") === interventionId;
    });

    return filtered.length > 0 ? filtered : factures;
  }, [factures, selectedIntervention]);

  const selectedInvoice = facturesForSelectedIntervention[0] ?? null;

  const isCardMode = !["flotte", "entreprise"].includes(clientType.toLowerCase());`;

if (content.includes(oldSelectionBlock)) {
  content = content.replace(oldSelectionBlock, newSelectionBlock);
} else if (!content.includes("const selectedRendezvous = useMemo")) {
  console.error("[PATCH_FAILED] Could not find selectedIntervention block.");
  process.exit(1);
}

/**
 * 4. Replace central operational block from B9-C with the requested flow.
 */
const blockRegex = /<section\s+id="parcours-operationnel"[\s\S]*?<\/section>\s*\n\s*<section id="parcours-detaille"/m;

const newCentralBlock = `<section
                id="parcours-operationnel"
                className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200"
              >
                <SectionTitle title="PARCOURS OPÉRATIONNEL : CLIENT → VÉHICULE → RENDEZ-VOUS → INTERVENTION → FACTURE" />

                {selectedVehicle ? (
                  <div className="space-y-6">
                    <div className="rounded-[1.5rem] bg-emerald-50 p-5 ring-1 ring-emerald-100">
                      <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                        Véhicule sélectionné
                      </p>
                      <p className="mt-2 text-lg font-extrabold text-slate-950">
                        {text(selectedVehicle, ["displayLabel", "immatriculation", "marque"])}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {text(selectedVehicle, ["marque"])} · {text(selectedVehicle, ["modele", "modèle"])}
                      </p>
                    </div>

                    <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white">
                      <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                          1. Rendez-vous du véhicule
                        </p>
                        <h3 className="mt-1 text-lg font-extrabold text-slate-950">
                          Sélectionnez un rendez-vous
                        </h3>
                      </div>

                      {rendezvous.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="min-w-full text-left text-sm">
                            <thead className="bg-slate-950 text-xs uppercase tracking-wide text-white">
                              <tr>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Heure</th>
                                <th className="px-4 py-3">Service</th>
                                <th className="px-4 py-3">Statut</th>
                                <th className="px-4 py-3">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                              {rendezvous.map((appointment) => {
                                const isSelected =
                                  recordId(appointment) === recordId(selectedRendezvous);

                                return (
                                  <tr
                                    key={recordId(appointment)}
                                    className={isSelected ? "bg-emerald-50" : "hover:bg-slate-50"}
                                  >
                                    <td className="px-4 py-3 font-semibold text-slate-950">
                                      {text(appointment, ["dateRendezVous", "date", "activityDate"])}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">
                                      {text(appointment, ["heureRendezVous", "heure", "startAt"])}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">
                                      {text(appointment, ["typeService", "service", "displayLabel"])}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">
                                      {text(appointment, ["statut", "status"], "suivi")}
                                    </td>
                                    <td className="px-4 py-3">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setSelectedRendezvousId(recordId(appointment));
                                          setSelectedInterventionId(null);
                                        }}
                                        className={[
                                          "rounded-full px-3 py-1.5 text-xs font-bold",
                                          isSelected
                                            ? "bg-emerald-700 text-white"
                                            : "bg-slate-100 text-slate-900",
                                        ].join(" ")}
                                      >
                                        {isSelected ? "Sélectionné" : "Sélectionner"}
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <EmptyCard>Aucun rendez-vous lié au véhicule sélectionné.</EmptyCard>
                      )}
                    </section>

                    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        2. Interventions du rendez-vous sélectionné
                      </p>

                      {selectedRendezvous ? (
                        <p className="mt-1 text-sm text-slate-500">
                          Rendez-vous sélectionné : {text(selectedRendezvous, ["dateRendezVous", "date"])} · {text(selectedRendezvous, ["typeService", "service"])}
                        </p>
                      ) : null}

                      {interventionsForSelectedRendezvous.length > 0 ? (
                        <div className="mt-4 grid gap-3">
                          {interventionsForSelectedRendezvous.map((intervention) => {
                            const isSelected =
                              recordId(intervention) === recordId(selectedIntervention);

                            return (
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
                            );
                          })}
                        </div>
                      ) : (
                        <EmptyCard>Aucune intervention liée au rendez-vous sélectionné.</EmptyCard>
                      )}
                    </section>

                    {selectedIntervention ? (
                      <ERPRelatedRecordsPanel
                        parentModule={interventionsautoModule}
                        parentRecord={selectedIntervention}
                        child={lignesInterventionChild}
                        mode="detail"
                      />
                    ) : null}

                    {selectedIntervention ? (
                      <ERPRelatedRecordsPanel
                        parentModule={interventionsautoModule}
                        parentRecord={selectedIntervention}
                        child={facturesChild}
                        mode="detail"
                      />
                    ) : null}

                    {selectedInvoice ? (
                      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                          5. Encaissements de la facture sélectionnée
                        </p>

                        <InvoicePaymentsHistory
                          factureId={recordId(selectedInvoice)}
                          montantTTC={numberValue(selectedInvoice, ["montantTTC", "totalTTC", "montantTotal", "total", "montant"])}
                          clientId={clientId}
                          vehiculeId={selectedVehicleRecordId}
                        />
                      </section>
                    ) : (
                      <EmptyCard>Aucune facture sélectionnée pour afficher les encaissements.</EmptyCard>
                    )}
                  </div>
                ) : (
                  <EmptyCard>
                    Sélectionnez un véhicule pour afficher le parcours opérationnel complet.
                  </EmptyCard>
                )}
              </section>

              <section id="parcours-detaille"`;

if (!blockRegex.test(content)) {
  console.error("[PATCH_FAILED] Current operational path block not found.");
  process.exit(1);
}

content = content.replace(blockRegex, newCentralBlock);

const required = [
  "Sélectionnez un rendez-vous",
  "setSelectedRendezvousId",
  "interventionsForSelectedRendezvous",
  "InvoicePaymentsHistory",
  "ERPRelatedRecordsPanel",
  "Lignes d’intervention",
  "Encaissements de la facture sélectionnée",
];

for (const marker of required) {
  if (!content.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, content, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OP-B9-D] Client sheet flow corrected: vehicle -> rendezvous table -> interventions -> lines/invoices/payments.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");