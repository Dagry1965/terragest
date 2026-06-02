import type { ERPRecordHubConfig } from "@/runtime/hub";
import { ClientOperationalSheetClient } from "./ClientOperationalSheetClient";
import { ClientOperationalSearchBox } from "@/components/erp/hub/ClientOperationalSearchBox";
import { ClientOperationalTodayCards } from "@/components/erp/hub/ClientOperationalTodayCards";

type ClientOperationalHubPageProps = {
  searchParams?: Promise<{
    clientId?: string;
    selectedVehicleId?: string;
    selectedRendezvousId?: string;
    selectedInterventionId?: string;
    selectedFactureId?: string;
  }>;
};

const clientOperationalSheetConfig: ERPRecordHubConfig = {
  enabled: true,
  key: "clientsauto-operational-sheet",
  label: "Fiche Client Opérationnelle",
  rootModule: "clientsauto",
  layout: "wide",
  search: {
    placeholder: "Rechercher un client...",
    filterFields: ["typeClient", "categorieClient", "statut"],
    searchFields: ["nom", "prenom", "raisonSociale", "telephone", "email", "codeClient"],
  },
  header: {
    titleFields: ["displayLabel", "raisonSociale", "nom", "prenom"],
    subtitleFields: ["typeClient", "telephone", "email", "codeClient"],
    badgeFields: ["typeClient", "statut"],
    avatarField: "avatar",
  },
  kpis: [
    {
      key: "vehiclesCount",
      label: "Véhicules",
      source: "computed",
      field: "vehiclesCount",
      format: "number",
    },
    {
      key: "activeInterventionsCount",
      label: "Interventions actives",
      source: "computed",
      field: "activeInterventionsCount",
      format: "number",
    },
    {
      key: "unpaidInvoicesCount",
      label: "Factures impayées",
      source: "computed",
      field: "unpaidInvoicesCount",
      format: "number",
    },
    {
      key: "revenueTotal",
      label: "CA cumulé",
      source: "computed",
      field: "revenueTotal",
      format: "number",
    },
    {
      key: "lastVisit",
      label: "Dernière visite",
      source: "computed",
      field: "lastVisit",
      format: "date",
    },
    {
      key: "nextAppointment",
      label: "Prochain RDV",
      source: "computed",
      field: "nextAppointment",
      format: "date",
    },
  ],
  primaryCollection: {
    moduleKey: "vehicules",
    foreignKey: "clientId",
    label: "Véhicules du client",
    defaultDisplayMode: "cards",
    displayModeSourceField: "clientType",
    displayModes: {
      Particulier: "cards",
      particulier: "cards",
      Flotte: "table",
      flotte: "table",
      Entreprise: "table",
      entreprise: "table",
    },
    selectionQueryParam: "selectedVehicleId",
    labelFields: ["displayLabel", "immatriculation", "marque", "modele"],
    subtitleFields: ["annee", "carburant", "kilometrage", "statut"],
    cardFields: ["displayLabel", "immatriculation", "annee", "carburant", "kilometrage", "statut"],
    tableFields: ["immatriculation", "marque", "modele", "annee", "statut"],
    actions: [
      {
        key: "open-vehicle",
        label: "Fiche véhicule",
        kind: "open-record",
        moduleKey: "vehicules",
        hrefTemplate: "/vehicules/{id}",
        variant: "secondary",
      },
    ],
  },
  selectedRecordDetails: [
    {
      key: "rendezvous",
      label: "Rendez-vous liés",
      moduleKey: "rendezvous",
      foreignKey: "vehiculeId",
      layout: "collapsible-list",
      labelFields: ["displayLabel", "dateRendezVous", "heure", "statut"],
      subtitleFields: ["typeService", "durationMinutes"],
      actions: [
        {
          key: "open-rdv",
          label: "Fiche RDV",
          kind: "open-record",
          moduleKey: "rendezvous",
          hrefTemplate: "/rendezvous/{id}",
          variant: "secondary",
        },
      ],
    },
    {
      key: "interventions",
      label: "Interventions du véhicule",
      moduleKey: "interventionsauto",
      foreignKey: "vehiculeId",
      layout: "collapsible-list",
      labelFields: ["displayLabel", "dateIntervention", "statut", "montantTTC"],
      subtitleFields: ["rendezVousId"],
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
      label: "Factures liées",
      moduleKey: "facturesauto",
      foreignKey: "vehiculeId",
      layout: "collapsible-list",
      labelFields: ["displayLabel", "numero", "statut", "montantTTC"],
      subtitleFields: ["dateFacture"],
      actions: [
        {
          key: "open-facture",
          label: "Facture complète",
          kind: "open-record",
          moduleKey: "facturesauto",
          hrefTemplate: "/facturesauto/{id}",
          variant: "secondary",
        },
      ],
    },
    {
      key: "encaissements",
      label: "Encaissements liés",
      moduleKey: "encaissementsauto",
      foreignKey: "factureId",
      layout: "collapsible-list",
      labelFields: ["displayLabel", "numero", "statut", "montant"],
      subtitleFields: ["dateEncaissement", "modePaiement"],
      actions: [
        {
          key: "open-encaissement",
          label: "Historique encaissements",
          kind: "open-record",
          moduleKey: "encaissementsauto",
          hrefTemplate: "/encaissementsauto/{id}",
          variant: "secondary",
        },
      ],
    },
  ],
};

export default async function ClientOperationalHubPage({
  searchParams,
}: ClientOperationalHubPageProps) {
  const params = searchParams ? await searchParams : {};
  const clientId = params.clientId ?? null;
  const selectedVehicleId = params.selectedVehicleId ?? null;
  const selectedRendezvousId = params.selectedRendezvousId ?? null;
  const selectedInterventionId = params.selectedInterventionId ?? null;
  const selectedFactureId = params.selectedFactureId ?? null;

  if (!clientId) {
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
                Recherchez un client, une voiture, une immatriculation, un téléphone, un email ou un code client.
              </p>
            </div>

            <section className="rounded-[2.25rem] border border-dashed border-slate-300 bg-white p-8 shadow-sm">
              <div className="mx-auto max-w-5xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                  Recherche opérationnelle
                </p>

                <h2 className="mt-3 text-2xl font-extrabold text-slate-950">
                  Rechercher un client ou une voiture
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  La fiche client s’affichera automatiquement après sélection.
                  Si vous choisissez une voiture, le client propriétaire sera ouvert avec cette voiture déjà sélectionnée.
                </p>

                <ClientOperationalSearchBox className="mt-8" />
              </div>
            </section>

            <ClientOperationalTodayCards />

            <section className="grid gap-6 lg:grid-cols-3">
              <article className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-2xl">👤</p>
                <h3 className="mt-3 text-base font-extrabold text-slate-950">
                  Recherche client
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Nom, prénom, raison sociale, téléphone, email ou code client.
                </p>
              </article>

              <article className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-2xl">🚗</p>
                <h3 className="mt-3 text-base font-extrabold text-slate-950">
                  Recherche voiture
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Immatriculation, marque, modèle, numéro de châssis ou véhicule lié au client.
                </p>
              </article>

              <article className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-2xl">🧾</p>
                <h3 className="mt-3 text-base font-extrabold text-slate-950">
                  Parcours opérationnel
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Client → véhicules → rendez-vous → interventions → factures → encaissements.
                </p>
              </article>
            </section>
          </section>
        </div>
      </main>
    );
  }

  return (
    <ClientOperationalSheetClient
      config={clientOperationalSheetConfig}
      clientId={clientId}
      selectedVehicleId={selectedVehicleId}
      selectedRendezvousId={selectedRendezvousId}
      selectedInterventionId={selectedInterventionId}
      selectedFactureId={selectedFactureId}
    />
  );
}
