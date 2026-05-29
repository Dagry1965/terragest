import { ERPRecordHubPage } from "@/components/erp/hub";
import type { ERPRecordHubConfig } from "@/runtime/hub";
import { RuntimeClientOperationalHubLoader } from "@/runtime/hub/RuntimeClientOperationalHubLoader";

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
    },
    {
      key: "factures",
      label: "Factures associées",
      moduleKey: "facturesauto",
      foreignKey: "vehiculeId",
      layout: "collapsible-list",
      labelFields: ["numero", "statut", "montantTTC"],
      subtitleFields: ["dateFacture", "dateEcheance"],
    },
  ],
};

export default async function ClientOperationalHubPage() {
  const data = await RuntimeClientOperationalHubLoader.load({
    config: clientOperationalHubConfig,
    clientId: null,
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