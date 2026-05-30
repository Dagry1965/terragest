const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/hub/ERPClientOperationalSheet.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-b9c-related-panel`;

if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let content = fs.readFileSync(fullPath, "utf8");

/**
 * 1. Add imports for existing generic panel and modules.
 */
if (!content.includes('ERPRelatedRecordsPanel')) {
  content = content.replace(
    `import { ClientOperationalSearchBox } from "./ClientOperationalSearchBox";`,
    `import { ClientOperationalSearchBox } from "./ClientOperationalSearchBox";
import { ERPRelatedRecordsPanel } from "@/components/erp/runtime/ERPRelatedRecordsPanel";
import { vehiculesModule } from "@/runtime/modules/generated/vehicules/vehicules.module";
import { interventionsautoModule } from "@/runtime/modules/generated/interventionsauto/interventionsauto.module";
import type { ERPCompositionChild } from "@/runtime/modules/ERPModule";`
  );
}

/**
 * 2. Add generic child descriptors.
 */
if (!content.includes("function buildOperationalChild(")) {
  content = content.replace(
    `function EmptyCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[1.5rem] bg-slate-50 px-5 py-4 text-sm text-slate-500 ring-1 ring-slate-100">
      {children}
    </div>
  );
}`,
    `function EmptyCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[1.5rem] bg-slate-50 px-5 py-4 text-sm text-slate-500 ring-1 ring-slate-100">
      {children}
    </div>
  );
}

function buildOperationalChild(
  child: ERPCompositionChild
): ERPCompositionChild {
  return {
    ...child,
    mode: child.mode ?? "readonly",
    allowCreate: child.allowCreate ?? false,
  };
}

const rendezvousChild = buildOperationalChild({
  key: "client-sheet-rendezvous",
  title: "Rendez-vous du véhicule sélectionné",
  description: "Les rendez-vous rattachés au véhicule sélectionné dans la fiche client.",
  moduleKey: "rendezvous",
  foreignKey: "vehiculeId",
  badgeLabel: "rendez-vous",
  mode: "readonly",
  allowCreate: false,
  labelFields: ["dateRendezVous", "heureRendezVous", "heure", "typeService", "statut"],
  subtitleFields: ["service", "durationMinutes", "clientLabel"],
  relations: [],
});

const interventionsChild = buildOperationalChild({
  key: "client-sheet-interventions",
  title: "Interventions du véhicule",
  description: "Les interventions rattachées au véhicule sélectionné.",
  moduleKey: "interventionsauto",
  foreignKey: "vehiculeId",
  badgeLabel: "intervention(s)",
  mode: "readonly",
  allowCreate: false,
  labelFields: ["dateIntervention", "titre", "numeroIntervention", "statut"],
  subtitleFields: ["montantTTC", "montantHT", "rendezVousId"],
  relations: [],
});

const lignesInterventionChild = buildOperationalChild({
  key: "client-sheet-lignes-intervention",
  title: "Lignes d’intervention",
  description: "Lignes liées à l’intervention sélectionnée. Le total ne compte que les lignes validées.",
  moduleKey: "lignesinterventionauto",
  foreignKey: "interventionId",
  badgeLabel: "ligne(s)",
  mode: "readonly",
  allowCreate: false,
  totalField: "montantTotal",
  labelFields: ["designation", "typeLigne", "produitLabel", "statut"],
  subtitleFields: ["quantite", "prixUnitaire", "montantTotal"],
  relations: [],
});

const facturesChild = buildOperationalChild({
  key: "client-sheet-factures",
  title: "Factures liées",
  description: "Factures liées à l’intervention sélectionnée.",
  moduleKey: "facturesauto",
  foreignKey: "interventionId",
  badgeLabel: "facture(s)",
  mode: "readonly",
  allowCreate: false,
  totalField: "montantTTC",
  labelFields: ["numero", "numeroFacture", "statut", "montantTTC"],
  subtitleFields: ["dateFacture", "montantHT", "tva", "resteAPayer"],
  relations: [],
});`
  );
}

/**
 * 3. Add selected intervention / selected invoice helper values.
 */
if (!content.includes("const selectedIntervention =")) {
  content = content.replace(
    `const recentActivity = relatedRecordsBySection.recentActivity ?? [];
  const upcomingAppointments = relatedRecordsBySection.upcomingAppointments ?? [];

  const isCardMode = !["flotte", "entreprise"].includes(clientType.toLowerCase());`,
    `const recentActivity = relatedRecordsBySection.recentActivity ?? [];
  const upcomingAppointments = relatedRecordsBySection.upcomingAppointments ?? [];

  const selectedIntervention = interventions[0] ?? null;
  const selectedInvoice = factures[0] ?? null;

  const isCardMode = !["flotte", "entreprise"].includes(clientType.toLowerCase());`
  );
}

/**
 * 4. Replace activity/upcoming section with operational path section.
 */
const oldBlockRegex = /<section className="grid gap-6 xl:grid-cols-2">[\s\S]*?<\/section>\s*<section id="parcours-detaille"/m;

const newBlock = `<section
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

                    <ERPRelatedRecordsPanel
                      parentModule={vehiculesModule}
                      parentRecord={selectedVehicle}
                      child={rendezvousChild}
                      mode="detail"
                    />

                    <ERPRelatedRecordsPanel
                      parentModule={vehiculesModule}
                      parentRecord={selectedVehicle}
                      child={interventionsChild}
                      mode="detail"
                    />

                    {selectedIntervention ? (
                      <ERPRelatedRecordsPanel
                        parentModule={interventionsautoModule}
                        parentRecord={selectedIntervention}
                        child={lignesInterventionChild}
                        mode="detail"
                      />
                    ) : (
                      <EmptyCard>
                        Aucune intervention sélectionnée pour afficher les lignes.
                      </EmptyCard>
                    )}

                    {selectedIntervention ? (
                      <ERPRelatedRecordsPanel
                        parentModule={interventionsautoModule}
                        parentRecord={selectedIntervention}
                        child={facturesChild}
                        mode="detail"
                      />
                    ) : null}

                    {selectedInvoice ? (
                      <div className="rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-100">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                          Encaissements
                        </p>
                        <p className="mt-2 text-sm text-slate-600">
                          Les encaissements restent gérés par le composant facture existant. Ouvrez la facture complète pour consulter l’historique des paiements et les montants encaissés.
                        </p>
                        <Link
                          href={queryHref(href("/facturesauto", selectedInvoice), {
                            clientId,
                            vehiculeId: selectedVehicleRecordId,
                            returnTo: clientReturnTo,
                          })}
                          className="mt-4 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white"
                        >
                          🧾 Voir la facture complète
                        </Link>
                      </div>
                    ) : (
                      <EmptyCard>
                        Aucune facture liée à l’intervention sélectionnée.
                      </EmptyCard>
                    )}
                  </div>
                ) : (
                  <EmptyCard>
                    Sélectionnez un véhicule pour afficher le parcours opérationnel complet.
                  </EmptyCard>
                )}
              </section>

              <section id="parcours-detaille"`;

if (!oldBlockRegex.test(content)) {
  console.error("[PATCH_FAILED] Old activity/upcoming block not found.");
  console.error("Inspect around ACTIVITY / A VENIR in:", filePath);
  process.exit(1);
}

content = content.replace(oldBlockRegex, newBlock);

/**
 * 5. Rename old summary block.
 */
content = content.replace(
  `PARCOURS DÉTAILLÉ : DU VÉHICULE À LA FACTURE`,
  `SYNTHÈSE DU PARCOURS`
);

const required = [
  "ERPRelatedRecordsPanel",
  "rendezvousChild",
  "interventionsChild",
  "lignesInterventionChild",
  "facturesChild",
  "PARCOURS OPÉRATIONNEL",
  "parentModule={vehiculesModule}",
  "parentModule={interventionsautoModule}",
];

for (const marker of required) {
  if (!content.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, content, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OP-B9-C] Client sheet central path wired to ERPRelatedRecordsPanel.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");