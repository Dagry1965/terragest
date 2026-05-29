import type { ERPRecordHubConfig } from "@/runtime/hub";
import { VehicleOperationalHubClient } from "./VehicleOperationalHubClient";

type VehicleOperationalHubPageProps = {
  searchParams?: Promise<{
    vehicleId?: string;
    selectedInterventionId?: string;
  }>;
};

const vehicleOperationalHubConfig: ERPRecordHubConfig = {
  enabled: true,
  key: "vehicules-operational-hub",
  label: "Fiche V\u00e9hicule Op\u00e9rationnelle",
  rootModule: "vehicules",
  layout: "wide",
  search: {
    placeholder: "Rechercher un v\u00e9hicule...",
    filterFields: ["marque", "modele", "mod\u00e8le", "statut"],
    searchFields: ["immatriculation", "marque", "modele", "mod\u00e8le", "vin", "numeroChassis"],
  },
  header: {
    titleFields: ["immatriculation", "marque", "modele", "mod\u00e8le"],
    subtitleFields: ["clientLabel", "vin", "numeroChassis", "statut"],
    badgeFields: ["statut", "marque"],
  },
  kpis: [
    {
      key: "appointmentsCount",
      label: "Rendez-vous",
      source: "computed",
      field: "appointmentsCount",
      format: "number",
    },
    {
      key: "interventionsCount",
      label: "Interventions",
      source: "computed",
      field: "interventionsCount",
      format: "number",
    },
    {
      key: "invoicesCount",
      label: "Factures",
      source: "computed",
      field: "invoicesCount",
      format: "number",
    },
    {
      key: "revenueTotal",
      label: "CA v\u00e9hicule",
      source: "computed",
      field: "revenueTotal",
      format: "number",
    },
  ],
  primaryCollection: {
    moduleKey: "interventionsauto",
    foreignKey: "vehiculeId",
    label: "Interventions du v\u00e9hicule",
    defaultDisplayMode: "table",
    selectionQueryParam: "selectedInterventionId",
    labelFields: ["displayLabel", "titre", "numero", "dateIntervention", "statut"],
    subtitleFields: ["montantTTC", "rendezVousId"],
    cardFields: ["displayLabel", "dateIntervention", "montantTTC", "statut"],
    tableFields: ["dateIntervention", "statut", "montantTTC", "rendezVousId"],
    actions: [
      {
        key: "open-intervention",
        label: "Fiche intervention",
        kind: "open-record",
        moduleKey: "interventionsauto",
        hrefTemplate: "/interventionsauto/{id}",
        variant: "secondary",
      },
    ],
  },
  selectedRecordDetails: [
    {
      key: "rendezvous",
      label: "Rendez-vous li\u00e9",
      moduleKey: "rendezvous",
      foreignKey: "vehiculeId",
      layout: "collapsible-list",
      labelFields: ["displayLabel", "dateRendezVous", "heure", "statut"],
      subtitleFields: ["typeService", "durationMinutes"],
      actions: [
        {
          key: "open-rendezvous",
          label: "Fiche RDV",
          kind: "open-record",
          moduleKey: "rendezvous",
          hrefTemplate: "/rendezvous/{id}",
          variant: "secondary",
        },
      ],
    },
    {
      key: "lignes",
      label: "Lignes d'intervention",
      moduleKey: "lignesinterventionauto",
      foreignKey: "interventionId",
      layout: "collapsible-list",
      labelFields: ["displayLabel", "designation", "typeLigne", "quantite"],
      subtitleFields: ["montantTTC", "statut"],
      actions: [
        {
          key: "open-ligne",
          label: "Fiche ligne",
          kind: "open-record",
          moduleKey: "lignesinterventionauto",
          hrefTemplate: "/lignesinterventionauto/{id}",
          variant: "secondary",
        },
      ],
    },
    {
      key: "factures",
      label: "Factures li\u00e9es",
      moduleKey: "facturesauto",
      foreignKey: "interventionId",
      layout: "collapsible-list",
      labelFields: ["displayLabel", "numero", "statut", "montantTTC"],
      subtitleFields: ["dateFacture"],
      actions: [
        {
          key: "open-facture",
          label: "Fiche facture",
          kind: "open-record",
          moduleKey: "facturesauto",
          hrefTemplate: "/facturesauto/{id}",
          variant: "secondary",
        },
      ],
    },
    {
      key: "encaissements",
      label: "Encaissements li\u00e9s",
      moduleKey: "encaissementsauto",
      foreignKey: "factureId",
      layout: "collapsible-list",
      labelFields: ["displayLabel", "numero", "statut", "montant"],
      subtitleFields: ["dateEncaissement", "modePaiement"],
      actions: [
        {
          key: "open-encaissement",
          label: "Fiche encaissement",
          kind: "open-record",
          moduleKey: "encaissementsauto",
          hrefTemplate: "/encaissementsauto/{id}",
          variant: "secondary",
        },
      ],
    }
  ],
};

export default async function VehicleOperationalHubPage({
  searchParams,
}: VehicleOperationalHubPageProps) {
  const params = searchParams ? await searchParams : {};
  const vehicleId = params.vehicleId ?? null;
  const selectedInterventionId = params.selectedInterventionId ?? null;

  if (!vehicleId) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl rounded-3xl border border-dashed border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
            Hub op\u00e9rationnel
          </p>

          <h1 className="mt-3 text-2xl font-semibold text-slate-950">
            Aucun v\u00e9hicule s\u00e9lectionn\u00e9
          </h1>

          <p className="mt-2 max-w-3xl text-sm text-slate-500">
            {"S\u00e9lectionnez un v\u00e9hicule pour afficher ses rendez-vous, interventions, lignes, factures et encaissements. Cette page n\u2019effectue aucun chargement runtime tant qu\u2019aucun v\u00e9hicule n\u2019est s\u00e9lectionn\u00e9."}
          </p>
        </section>
      </main>
    );
  }

  return (
    <VehicleOperationalHubClient
      config={vehicleOperationalHubConfig}
      vehicleId={vehicleId}
      selectedInterventionId={selectedInterventionId}
    />
  );
}
