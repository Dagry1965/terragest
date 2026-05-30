const fs = require("fs");
const path = require("path");

const root = process.cwd();

function full(relativePath) {
  return path.join(root, relativePath);
}

function backup(relativePath, suffix) {
  const source = full(relativePath);
  if (!fs.existsSync(source)) return;
  const target = `${source}.${suffix}`;
  if (!fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log("[BACKUP]", path.relative(root, target));
  }
}

function write(relativePath, content) {
  fs.writeFileSync(full(relativePath), content, "utf8");
  console.log("[WRITTEN]", relativePath);
}

const filePath = "src/components/erp/hub/ERPClientOperationalSheet.tsx";

if (!fs.existsSync(full(filePath))) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

backup(filePath, "bak-q2op-b3-remove-sidebar-and-widen");

const component = `"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "@/runtime/hub";

type ERPClientOperationalSheetProps = {
  config: ERPRecordHubConfig;
  rootRecord: ERPRecordHubRecord | null;
  vehicles: ERPRecordHubRecord[];
  relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
  selectedVehicleId?: string | null;
};

function text(
  record: ERPRecordHubRecord | null | undefined,
  fields: string[],
  fallback = "-"
): string {
  if (!record) return fallback;

  for (const field of fields) {
    const value = record[field];

    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }

    if (typeof value === "number" && Number.isFinite(value)) {
      return String(value);
    }
  }

  return fallback;
}

function numberValue(
  record: ERPRecordHubRecord | null | undefined,
  fields: string[]
): number {
  if (!record) return 0;

  for (const field of fields) {
    const value = record[field];

    if (typeof value === "number" && Number.isFinite(value)) return value;

    if (typeof value === "string") {
      const parsed = Number(value.replace(",", "."));
      if (Number.isFinite(parsed)) return parsed;
    }
  }

  return 0;
}

function money(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(value);
}

function recordId(record: ERPRecordHubRecord | null | undefined): string {
  return String(record?.id ?? "");
}

function href(modulePath: string, record: ERPRecordHubRecord | null | undefined): string {
  const id = recordId(record);
  return id ? \`\${modulePath}/\${id}\` : modulePath;
}

function badgeTone(value: string): string {
  const normalized = value.toLowerCase();

  if (
    normalized.includes("pay") ||
    normalized.includes("actif") ||
    normalized.includes("termin") ||
    normalized.includes("valid")
  ) {
    return "bg-emerald-100 text-emerald-800 ring-emerald-200";
  }

  if (
    normalized.includes("impay") ||
    normalized.includes("retard") ||
    normalized.includes("annul")
  ) {
    return "bg-rose-100 text-rose-800 ring-rose-200";
  }

  if (normalized.includes("cours") || normalized.includes("brouillon")) {
    return "bg-amber-100 text-amber-800 ring-amber-200";
  }

  return "bg-slate-100 text-slate-700 ring-slate-200";
}

function SectionTitle({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <h2 className="text-sm font-extrabold uppercase tracking-[0.18em] text-slate-950">
        {title}
      </h2>
      {action}
    </div>
  );
}

function EmptyCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[1.5rem] bg-slate-50 px-5 py-4 text-sm text-slate-500 ring-1 ring-slate-100">
      {children}
    </div>
  );
}

export function ERPClientOperationalSheet({
  config: _config,
  rootRecord,
  vehicles,
  relatedRecordsBySection,
  selectedVehicleId = null,
}: ERPClientOperationalSheetProps) {
  const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
    selectedVehicleId ?? recordId(vehicles[0]) ?? null
  );

  const selectedVehicle = useMemo(() => {
    return (
      vehicles.find((vehicle) => recordId(vehicle) === localSelectedVehicleId) ??
      vehicles[0] ??
      null
    );
  }, [vehicles, localSelectedVehicleId]);

  const clientName = text(
    rootRecord,
    ["displayLabel", "raisonSociale", "nomComplet", "nom", "prenom"],
    "Client"
  );

  const clientType = text(
    rootRecord,
    ["clientType", "typeClient", "categorieClient", "type"],
    "Particulier"
  );

  const unpaidAmount = numberValue(rootRecord, [
    "unpaidInvoicesAmount",
    "montantImpayees",
  ]);

  const revenueTotal = numberValue(rootRecord, [
    "revenueTotal",
    "chiffreAffaires",
    "caCumule",
  ]);

  const interventions = relatedRecordsBySection.interventions ?? [];
  const rendezvous = relatedRecordsBySection.rendezvous ?? [];
  const lignes = relatedRecordsBySection.lignes ?? [];
  const factures = relatedRecordsBySection.factures ?? [];
  const encaissements = relatedRecordsBySection.encaissements ?? [];
  const recentActivity = relatedRecordsBySection.recentActivity ?? [];
  const upcomingAppointments = relatedRecordsBySection.upcomingAppointments ?? [];

  const isCardMode = !["flotte", "entreprise"].includes(clientType.toLowerCase());

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-[1880px] px-6 py-8 xl:px-10 2xl:px-12">
        <section className="space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Clients / Fiche client
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 xl:text-5xl">
              FICHE CLIENT OPÉRATIONNELLE
            </h1>

            <p className="mt-3 max-w-5xl text-base leading-7 text-slate-600">
              Vue 360° du client depuis ses véhicules jusqu’aux factures et encaissements.
              Une interface adaptative selon le type de client (Particulier, Flotte, Entreprise).
            </p>
          </div>

          <div className="grid gap-8 2xl:grid-cols-[minmax(0,1fr)_420px]">
            <div className="space-y-8">
              <section className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <div className="flex flex-col gap-6 xl:flex-row xl:items-center">
                  <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-emerald-100 text-4xl font-black text-emerald-800">
                    {clientName.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-3xl font-black text-slate-950">{clientName}</h2>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 ring-1 ring-emerald-200">
                        {clientType}
                      </span>
                    </div>

                    <div className="mt-5 grid gap-x-8 gap-y-3 text-sm text-slate-600 md:grid-cols-2 xl:grid-cols-4">
                      <p><span className="font-semibold text-slate-900">Code client :</span> {text(rootRecord, ["codeClient", "code"])}</p>
                      <p><span className="font-semibold text-slate-900">Téléphone :</span> {text(rootRecord, ["telephone", "téléphone"])}</p>
                      <p><span className="font-semibold text-slate-900">Email :</span> {text(rootRecord, ["email"])}</p>
                      <p><span className="font-semibold text-slate-900">Adresse :</span> {text(rootRecord, ["adresse"])}</p>
                      <p><span className="font-semibold text-slate-900">Création :</span> {text(rootRecord, ["dateCreation", "createdAt"])}</p>
                      <p><span className="font-semibold text-slate-900">Dernière visite :</span> {text(rootRecord, ["lastVisit", "derniereVisite"])}</p>
                      <p><span className="font-semibold text-slate-900">Prochain RDV :</span> {text(rootRecord, ["nextAppointment", "prochainRendezVous"])}</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
                {[
                  ["Véhicules", text(rootRecord, ["vehiclesCount", "vehiculesCount", "nombreVehicules"], "0")],
                  ["Interventions actives", text(rootRecord, ["activeInterventionsCount", "interventionsActives"], "0")],
                  ["Factures impayées", \`\${text(rootRecord, ["unpaidInvoicesCount", "facturesImpayees"], "0")} · \${money(unpaidAmount)}\`],
                  ["CA cumulé", money(revenueTotal)],
                  ["Dernière visite", text(rootRecord, ["lastVisit", "derniereVisite"])],
                  ["Prochain RDV", text(rootRecord, ["nextAppointment", "prochainRendezVous"])],
                ].map(([label, value]) => (
                  <article
                    key={label}
                    className="rounded-[1.75rem] bg-white px-5 py-5 shadow-sm ring-1 ring-slate-200"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                    <p className="mt-3 text-3xl font-black leading-tight text-slate-950">{value}</p>
                  </article>
                ))}
              </section>

              <section className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <SectionTitle
                  title="VÉHICULES DU CLIENT"
                  action={
                    <Link
                      href="/vehicules/nouveau"
                      className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white"
                    >
                      Ajouter un véhicule
                    </Link>
                  }
                />

                {vehicles.length === 0 ? (
                  <EmptyCard>Aucun véhicule lié à ce client.</EmptyCard>
                ) : isCardMode ? (
                  <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
                    {vehicles.map((vehicle) => (
                      <button
                        key={recordId(vehicle)}
                        type="button"
                        onClick={() => setLocalSelectedVehicleId(recordId(vehicle))}
                        className={[
                          "rounded-[1.75rem] border p-5 text-left shadow-sm transition",
                          recordId(vehicle) === recordId(selectedVehicle)
                            ? "border-emerald-400 bg-emerald-50"
                            : "border-slate-200 bg-white hover:border-emerald-200",
                        ].join(" ")}
                      >
                        <div className="mb-5 h-36 rounded-[1.5rem] bg-gradient-to-br from-slate-200 to-slate-100" />

                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xl font-black text-slate-950">
                              {text(vehicle, ["displayLabel", "immatriculation", "marque"])}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                              {text(vehicle, ["marque"])} · {text(vehicle, ["modele", "modèle"])}
                            </p>
                          </div>

                          <span
                            className={[
                              "rounded-full px-2 py-1 text-[10px] font-bold ring-1",
                              badgeTone(text(vehicle, ["statut"], "actif")),
                            ].join(" ")}
                          >
                            {text(vehicle, ["statut"], "actif")}
                          </span>
                        </div>

                        <div className="mt-5 grid gap-2 text-sm text-slate-600">
                          <p><span className="font-medium text-slate-900">Immatriculation :</span> {text(vehicle, ["immatriculation"])}</p>
                          <p><span className="font-medium text-slate-900">Année :</span> {text(vehicle, ["annee", "année"])}</p>
                          <p><span className="font-medium text-slate-900">Carburant :</span> {text(vehicle, ["carburant"])}</p>
                          <p><span className="font-medium text-slate-900">Kilométrage :</span> {text(vehicle, ["kilometrage", "kilométrage"])}</p>
                        </div>

                        <span className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900 ring-1 ring-slate-200">
                          Voir la fiche véhicule
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-[1.75rem] border border-slate-200">
                    <table className="min-w-full text-left text-sm">
                      <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                        <tr>
                          <th className="px-5 py-4">Véhicule</th>
                          <th className="px-5 py-4">Immatriculation</th>
                          <th className="px-5 py-4">Statut</th>
                          <th className="px-5 py-4">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {vehicles.map((vehicle) => (
                          <tr key={recordId(vehicle)}>
                            <td className="px-5 py-4 font-semibold text-slate-900">
                              {text(vehicle, ["displayLabel", "marque"])}
                            </td>
                            <td className="px-5 py-4 text-slate-600">
                              {text(vehicle, ["immatriculation"])}
                            </td>
                            <td className="px-5 py-4 text-slate-600">
                              {text(vehicle, ["statut"], "actif")}
                            </td>
                            <td className="px-5 py-4">
                              <button
                                type="button"
                                onClick={() => setLocalSelectedVehicleId(recordId(vehicle))}
                                className="rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white"
                              >
                                Sélectionner
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              <section className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
                  <SectionTitle title="ACTIVITÉ RÉCENTE" />
                  <div className="space-y-4">
                    {recentActivity.length > 0 ? (
                      recentActivity.slice(0, 5).map((activity) => (
                        <article
                          key={recordId(activity) || text(activity, ["displayLabel"])}
                          className="rounded-[1.5rem] bg-slate-50 p-5"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-lg font-bold text-slate-950">
                                {text(activity, ["displayLabel"])}
                              </p>
                              <p className="mt-1 text-sm text-slate-500">
                                {text(activity, ["activityDate"])} · {text(activity, ["activityType"])}
                              </p>
                            </div>
                            <span
                              className={[
                                "rounded-full px-2 py-1 text-[10px] font-bold ring-1",
                                badgeTone(text(activity, ["statut"], "")),
                              ].join(" ")}
                            >
                              {text(activity, ["statut"], "suivi")}
                            </span>
                          </div>
                        </article>
                      ))
                    ) : (
                      <EmptyCard>Aucune activité récente.</EmptyCard>
                    )}
                  </div>

                  <Link href="/clientsauto" className="mt-5 inline-flex text-sm font-bold text-emerald-700">
                    Voir toute l'activité
                  </Link>
                </div>

                <div className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
                  <SectionTitle title="À VENIR" />
                  <div className="space-y-4">
                    {upcomingAppointments.length > 0 ? (
                      upcomingAppointments.map((appointment) => (
                        <article
                          key={recordId(appointment) || text(appointment, ["displayLabel"])}
                          className="rounded-[1.5rem] bg-emerald-50 p-5"
                        >
                          <p className="text-lg font-bold text-slate-950">
                            {text(appointment, ["displayLabel", "typeService"])}
                          </p>
                          <p className="mt-1 text-sm text-slate-600">
                            {text(appointment, ["dateRendezVous", "activityDate"])} · {text(appointment, ["heure"])}
                          </p>
                        </article>
                      ))
                    ) : (
                      <EmptyCard>Aucun rendez-vous à venir.</EmptyCard>
                    )}
                  </div>

                  <Link href="/rendezvous" className="mt-5 inline-flex text-sm font-bold text-emerald-700">
                    Voir tous les rendez-vous
                  </Link>
                </div>
              </section>

              <section className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <SectionTitle title="PARCOURS DÉTAILLÉ : DU VÉHICULE À LA FACTURE" />

                <div className="grid gap-4 xl:grid-cols-5">
                  {[
                    [
                      "1. Sélection du véhicule",
                      selectedVehicle
                        ? text(selectedVehicle, ["displayLabel", "immatriculation"])
                        : "Aucun véhicule",
                    ],
                    ["2. Interventions du véhicule", \`\${interventions.length} intervention(s)\`],
                    ["3. Détail intervention", \`\${lignes.length} ligne(s)\`],
                    ["4. Facture liée", \`\${factures.length} facture(s)\`],
                    ["5. Encaissements", \`\${encaissements.length} encaissement(s)\`],
                  ].map(([title, value]) => (
                    <article key={title} className="rounded-[1.5rem] bg-slate-50 p-5">
                      <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                        {title}
                      </p>
                      <p className="mt-3 text-base font-bold text-slate-950">{value}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <SectionTitle title="ADAPTATION SELON LE TYPE DE CLIENT" />
                <div className="space-y-4 text-sm">
                  <div className="rounded-[1.5rem] bg-emerald-50 p-4">
                    <p className="font-black text-emerald-900">Particulier</p>
                    <p className="mt-1 text-emerald-800">
                      Véhicules en cartes, max 4 par ligne, lecture visuelle rapide.
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] bg-slate-50 p-4">
                    <p className="font-black text-slate-950">Flotte</p>
                    <p className="mt-1 text-slate-600">
                      Véhicules en tableau compact, volume important, comparaison facilitée.
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] bg-slate-50 p-4">
                    <p className="font-black text-slate-950">Entreprise</p>
                    <p className="mt-1 text-slate-600">
                      Tableau administratif avec affectation, contrat et statut.
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <SectionTitle title="NAVIGATION RAPIDE" />
                <div className="grid gap-3">
                  <Link
                    href={href("/vehicules", selectedVehicle)}
                    className="rounded-[1.25rem] bg-slate-950 px-4 py-3 text-sm font-bold text-white"
                  >
                    Fiche véhicule complète
                  </Link>

                  <Link
                    href="/interventionsauto"
                    className="rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900"
                  >
                    Fiche intervention
                  </Link>

                  <Link
                    href="/facturesauto"
                    className="rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900"
                  >
                    Facture complète
                  </Link>

                  <Link
                    href="/encaissementsauto"
                    className="rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900"
                  >
                    Historique encaissements
                  </Link>
                </div>
              </section>

              <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <SectionTitle title="BÉNÉFICES MÉTIER" />
                <ul className="space-y-3 text-sm text-slate-700">
                  {[
                    "Vue 360° du client en un coup d’œil",
                    "Meilleure relation client et réactivité",
                    "Suivi clair des impayés et du CA",
                    "Gain de temps pour vos équipes",
                    "Décisions basées sur des données réelles",
                  ].map((benefit) => (
                    <li key={benefit} className="rounded-[1.25rem] bg-slate-50 p-4 font-medium">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <SectionTitle title="DOSSIER VÉHICULE SÉLECTIONNÉ" />

                {selectedVehicle ? (
                  <div className="space-y-4">
                    <div className="rounded-[1.5rem] bg-emerald-50 p-4">
                      <p className="text-lg font-black text-slate-950">
                        {text(selectedVehicle, ["displayLabel", "immatriculation", "marque"])}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {text(selectedVehicle, ["marque"])} · {text(selectedVehicle, ["modele", "modèle"])}
                      </p>
                    </div>

                    <div className="grid gap-3">
                      <EmptyCard>Rendez-vous liés : {rendezvous.length}</EmptyCard>
                      <EmptyCard>Interventions liées : {interventions.length}</EmptyCard>
                      <EmptyCard>Factures liées : {factures.length}</EmptyCard>
                      <EmptyCard>Encaissements liés : {encaissements.length}</EmptyCard>
                    </div>
                  </div>
                ) : (
                  <EmptyCard>Aucun véhicule sélectionné.</EmptyCard>
                )}
              </section>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
`;

write(filePath, component);

console.log("[Q2-OP-B3] Client operational sheet widened and sidebar removed.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");