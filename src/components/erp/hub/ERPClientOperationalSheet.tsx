"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "@/runtime/hub";
import { ClientOperationalSearchBox } from "./ClientOperationalSearchBox";
import { ERPRelatedRecordsPanel } from "@/components/erp/runtime/ERPRelatedRecordsPanel";
import { InvoicePaymentsHistory } from "@/components/erp/billing/InvoicePaymentsHistory";
import { rendezvousModule } from "@/runtime/modules/generated/rendezvous/rendezvous.module";
import { vehiculesModule } from "@/runtime/modules/generated/vehicules/vehicules.module";
import { interventionsautoModule } from "@/runtime/modules/generated/interventionsauto/interventionsauto.module";
import type { ERPCompositionChild } from "@/runtime/modules/ERPModule";

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
  return id ? `${modulePath}/${id}` : modulePath;
}

function queryHref(
  pathname: string,
  params: Record<string, string | null | undefined>
): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string" && value.trim().length > 0) {
      searchParams.set(key, value);
    }
  }

  const query = searchParams.toString();
  return query ? `${pathname}?${query}` : pathname;
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
      <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-900">
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
});

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

  const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
  const [expandedInterventionId, setExpandedInterventionId] = useState<string | null>(null);
  const [expandedFactureId, setExpandedFactureId] = useState<string | null>(null);
  const [expandedEncaissementId, setExpandedEncaissementId] = useState<string | null>(null);
  const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);

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

  const clientId = recordId(rootRecord);
  const selectedVehicleRecordId = recordId(selectedVehicle);

  const clientReturnTo = queryHref("/clientsauto/hub", {
    clientId,
    selectedVehicleId: selectedVehicleRecordId,
  });

  const addVehicleHref = queryHref("/vehicules/nouveau", {
    clientId,
    returnTo: clientReturnTo,
  });

  const fullActivityHref = queryHref("/clientsauto/hub", {
    clientId,
    selectedVehicleId: selectedVehicleRecordId,
    view: "activity",
  }) + "#activite-recente";

  const allAppointmentsHref = queryHref("/rendezvous", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });

  const interventionsHref = queryHref("/interventionsauto", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });

  const invoicesHref = queryHref("/facturesauto", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });

  const paymentsHref = queryHref("/encaissementsauto", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });

  const vehicleDetailHref = queryHref(href("/vehicules", selectedVehicle), {
    clientId,
    returnTo: clientReturnTo,
  });

  const interventionDetailHref = queryHref("/interventionsauto", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });

  const invoiceDetailHref = queryHref("/facturesauto", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });

  const paymentDetailHref = queryHref("/encaissementsauto", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });

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

  const toggleExpandedIntervention = (id: string) => {
    setExpandedInterventionId((current) => (current === id ? null : id));
  };

  const toggleExpandedFacture = (id: string) => {
    setExpandedFactureId((current) => (current === id ? null : id));
  };

  const toggleExpandedEncaissement = (id: string) => {
    setExpandedEncaissementId((current) => (current === id ? null : id));
  };

  const selectedRendezvous = useMemo(() => {
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

  const isCardMode = !["flotte", "entreprise"].includes(clientType.toLowerCase());

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-[2040px] px-8 py-10 xl:px-12 2xl:px-16">
        <section className="space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Clients / Fiche client
            </p>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 xl:text-4xl">
              FICHE CLIENT OPÉRATIONNELLE
            </h1>

            <p className="mt-3 max-w-5xl text-base leading-7 text-slate-600">
              Vue 360° du client depuis ses véhicules jusqu’aux factures et encaissements.
              Une interface adaptative selon le type de client (Particulier, Flotte, Entreprise).
            </p>

            <ClientOperationalSearchBox className="mt-6 max-w-5xl" />
          </div>

          <div className="grid gap-8 2xl:grid-cols-[minmax(0,1fr)_460px]">
            <div className="space-y-8">
              <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8">
                <div className="flex flex-col gap-6 xl:flex-row xl:items-center">
                  <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-emerald-100 text-4xl font-black text-emerald-800">
                    {clientName.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-extrabold text-slate-950">{clientName}</h2>
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

              <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
                {[
                  ["Interventions actives", text(rootRecord, ["activeInterventionsCount", "interventionsActives"], "0")],
                  ["Factures impayées", `${text(rootRecord, ["unpaidInvoicesCount", "facturesImpayees"], "0")} impayée(s) · ${money(unpaidAmount)}`],
                  ["CA cumulé", money(revenueTotal)],
                  ["Dernière visite", text(rootRecord, ["lastVisit", "derniereVisite"])],
                  ["Prochain RDV", text(rootRecord, ["nextAppointment", "prochainRendezVous"])],
                ].map(([label, value]) => (
                  <article
                    key={label}
                    className="min-h-[128px] rounded-[1.75rem] bg-white px-6 py-6 shadow-sm ring-1 ring-slate-200"
                  >
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">{label}</p>
                    <p className="mt-3 text-2xl font-black leading-tight text-slate-950 md:text-3xl">{value}</p>
                  </article>
                ))}
              </section>

              <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8">
                <SectionTitle
                  title="🚗 VÉHICULES DU CLIENT"
                  action={
                    <Link
                      href={addVehicleHref}
                      className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white"
                    >
                      Ajouter un véhicule
                    </Link>
                  }
                />

                <p className="mb-5 text-sm font-medium text-slate-500">
                  Selectionnez un vehicule pour afficher ses rendez-vous, interventions, lignes, factures et encaissements.
                </p>

                {vehicles.length === 0 ? (
                  <EmptyCard>Aucun véhicule lié à ce client.</EmptyCard>
                ) : isCardMode ? (
                  <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
                    {vehicles.map((vehicle) => (
                      <button
                        key={recordId(vehicle)}
                        type="button"
                        onClick={() => setLocalSelectedVehicleId(recordId(vehicle))}
                        className={[
                          "cursor-pointer rounded-[1.75rem] border p-5 text-left shadow-sm transition focus:outline-none focus:ring-4 focus:ring-emerald-100",
                          recordId(vehicle) === recordId(selectedVehicle)
                            ? "border-emerald-400 bg-emerald-50"
                            : "border-slate-200 bg-white hover:border-emerald-200",
                        ].join(" ")}
                      >

                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-lg font-extrabold text-slate-950">
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

                        <div className="mt-4 grid gap-2 text-sm text-slate-600">
                          <p>🚘 <span className="font-medium text-slate-900">Immatriculation :</span> {text(vehicle, ["immatriculation"])}</p>
                          <p>🛞 <span className="font-medium text-slate-900">Kilométrage :</span> {text(vehicle, ["kilometrage", "kilométrage"])}</p>
                        </div>

                        <span className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900 ring-1 ring-slate-200">
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

              <section
                id="parcours-operationnel"
                className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200"
              >
                <SectionTitle title="PARCOURS OPÉRATIONNEL : CLIENT → VÉHICULE → RENDEZ-VOUS → INTERVENTION → FACTURE" />

                <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white">
                      <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                          1. Choisir un rendez-vous
                        </p>
                        <h3 className="mt-1 text-lg font-extrabold text-slate-950">
                          Rendez-vous du véhicule
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
                                    onClick={() => {
                                      setSelectedRendezvousId(recordId(appointment));
                                      setSelectedInterventionId(null);
                                    }}
                                    className={[
                                      "cursor-pointer transition",
                                      isSelected ? "bg-emerald-50" : "hover:bg-slate-50",
                                    ].join(" ")}
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
                        <EmptyCard>Aucun rendez-vous trouvé pour ce véhicule.</EmptyCard>
                      )}
                    </section>

                    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        2. Interventions liées au rendez-vous
                      </p>
                      <p className="mt-1 text-xs font-medium text-slate-500">
                        Les interventions ci-dessous sont filtrées par le rendez-vous sélectionné.
                      </p>

                      {selectedRendezvous ? (
                        <p className="mt-1 text-sm text-slate-500">
                          Filtre actif : {text(selectedRendezvous, ["dateRendezVous", "date"])} · {text(selectedRendezvous, ["typeService", "service"])}
                        </p>
                      ) : null}

                      {interventionsForSelectedRendezvous.length > 0 ? (
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
                                  <>
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
                                );
                              })}
                            </tbody>
                          </table>

                        </div>
                      ) : (
                        <EmptyCard>Aucune intervention n’est encore liée à ce rendez-vous. Sélectionnez un autre rendez-vous ou créez une intervention depuis le parcours atelier.</EmptyCard>
                      )}
                    </section>

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
              </section>

              <section id="parcours-detaille" className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <SectionTitle title="SYNTHÈSE DU PARCOURS" />

                <div className="grid gap-4 xl:grid-cols-5">
                  {[
                    [
                      "1. Sélection du véhicule",
                      selectedVehicle
                        ? text(selectedVehicle, ["displayLabel", "immatriculation"])
                        : "Aucun véhicule",
                    ],
                    ["2. Interventions du véhicule", `${interventions.length} intervention(s)`],
                    ["3. Détail intervention", `${lignes.length} ligne(s)`],
                    ["4. Facture liée", `${factures.length} facture(s)`],
                    ["5. Encaissements", `${encaissements.length} encaissement(s)`],
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
                    href={vehicleDetailHref}
                    className="rounded-[1.25rem] bg-slate-950 px-4 py-3 text-sm font-bold text-white"
                  >
                    🚗 Fiche véhicule complète
                  </Link>

                  <Link
                    href={interventionDetailHref}
                    className="rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900"
                  >
                    🔧 Fiche intervention
                  </Link>

                  <Link
                    href={invoiceDetailHref}
                    className="rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900"
                  >
                    🧾 Facture complète
                  </Link>

                  <Link
                    href={paymentDetailHref}
                    className="rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900"
                  >
                    💳 Historique encaissements
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
