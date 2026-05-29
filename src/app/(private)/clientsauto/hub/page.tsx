import { ERPRecordHubPage } from "@/components/erp/hub";
import type { ERPRecordHubConfig } from "@/runtime/hub";
import { RuntimeClientOperationalHubLoader } from "@/runtime/hub/RuntimeClientOperationalHubLoader";

type ClientOperationalHubPageProps = {
  searchParams?: Promise<{
    clientId?: string;
    selectedVehicleId?: string;
  }>;
};

const clientOperationalHubConfig: ERPRecordHubConfig = {
  enabled: true,
  key: "clientsauto-operational-hub",
  label: "Fiche Client Opérationnelle",
  rootModule: "clientsauto",
  layout: "wide",
  search: {
    placeholder: "Rechercher un client...",
    filterFields: ["typeClient"],
    searchFields: ["nom", "prenom", "telephone", "email", "code"],
  },
  header: {
    titleFields: ["nom", "prenom", "raisonSociale"],
    subtitleFields: ["telephone", "email", "code"],
    badgeFields: ["typeClient", "statut"],
  },
  kpis: [
    {
      key: "vehiculesCount",
      label: "Véhicules",
      source: "computed",
      format: "number",
    },
    {
      key: "activeInterventionsCount",
      label: "Interventions actives",
      source: "computed",
      format: "number",
    },
    {
      key: "unpaidInvoicesCount",
      label: "Factures impayées",
      source: "computed",
      format: "number",
    },
    {
      key: "totalBilledAmount",
      label: "Total facturé",
      source: "computed",
      format: "currency",
    },
  ],
  primaryCollection: {
    moduleKey: "vehicules",
    foreignKey: "clientId",
    label: "Véhicules",
    defaultDisplayMode: "table",
    displayModeSourceField: "typeClient",
    selectionQueryParam: "selectedVehicleId",
    displayModes: {
      Particulier: "cards",
      particulier: "cards",
      Flotte: "table",
      flotte: "table",
      Entreprise: "table",
      entreprise: "table",
    },
    labelFields: ["immatriculation", "marque", "modele"],
    subtitleFields: ["annee", "statut"],
    cardFields: ["immatriculation", "marque", "modele", "statut"],
    tableFields: ["immatriculation", "marque", "modele", "statut"],
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
      key: "interventions",
      label: "Interventions du véhicule",
      moduleKey: "interventionsauto",
      foreignKey: "vehiculeId",
      layout: "collapsible-list",
      labelFields: ["numero", "titre", "statut"],
      subtitleFields: ["dateIntervention", "montantTTC"],
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
      key: "factures",
      label: "Factures associées",
      moduleKey: "facturesauto",
      foreignKey: "vehiculeId",
      layout: "collapsible-list",
      labelFields: ["numero", "statut", "montantTTC"],
      subtitleFields: ["dateFacture", "dateEcheance"],
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
  ],
};

export default async function ClientOperationalHubPage({
  searchParams,
}: ClientOperationalHubPageProps) {
  const resolvedSearchParams = await searchParams;

  const data = await RuntimeClientOperationalHubLoader.load({
    config: clientOperationalHubConfig,
    clientId: resolvedSearchParams?.clientId ?? null,
    selectedVehicleId: resolvedSearchParams?.selectedVehicleId ?? null,
  });

  return (
    <ERPRecordHubPage
      config={data.config}
      rootRecord={data.rootRecord}
      primaryRecords={data.primaryRecords}
      relatedRecordsBySection={data.relatedRecordsBySection}
    />
  );
}
