import { ERPRecordHubPage } from "@/components/erp/hub";
import type { ERPRecordHubConfig } from "@/runtime/hub";
import { RuntimeProductStockOperationalHubLoader } from "@/runtime/hub/RuntimeProductStockOperationalHubLoader";

type ProductStockOperationalHubPageProps = {
  searchParams?: Promise<{
    productId?: string;
    selectedStockId?: string;
  }>;
};

const productStockOperationalHubConfig: ERPRecordHubConfig = {
  enabled: true,
  key: "produitsauto-stock-operational-hub",
  label: "Fiche Produit / Stock Opérationnelle",
  rootModule: "produitsauto",
  layout: "wide",
  search: {
    placeholder: "Rechercher un produit...",
    filterFields: ["typeArticle", "famille", "statut"],
    searchFields: ["nom", "designation", "code", "reference"],
  },
  header: {
    titleFields: ["nom", "designation", "code"],
    subtitleFields: ["famille", "typeArticle", "statut"],
    badgeFields: ["typeArticle", "statut"],
  },
  kpis: [
    {
      key: "stockTotal",
      label: "Stock total",
      source: "computed",
      format: "number",
    },
    {
      key: "stocksCount",
      label: "Stocks",
      source: "computed",
      format: "number",
    },
    {
      key: "openOrdersCount",
      label: "Commandes ouvertes",
      source: "computed",
      format: "number",
    },
    {
      key: "recentMovementsCount",
      label: "Mouvements récents",
      source: "computed",
      format: "number",
    },
  ],
  primaryCollection: {
    moduleKey: "stocksauto",
    foreignKey: "produitId",
    label: "Stocks / emplacements",
    defaultDisplayMode: "table",
    selectionQueryParam: "selectedStockId",
    labelFields: ["nom", "emplacement", "code"],
    subtitleFields: ["quantite", "seuilAlerte", "statut"],
    cardFields: ["nom", "emplacement", "quantite", "statut"],
    tableFields: ["nom", "emplacement", "quantite", "seuilAlerte", "statut"],
    actions: [
      {
        key: "open-stock",
        label: "Fiche stock",
        kind: "open-record",
        moduleKey: "stocksauto",
        hrefTemplate: "/stocksauto/{id}",
        variant: "secondary",
      },
    ],
  },
  selectedRecordDetails: [
    {
      key: "mouvements",
      label: "Mouvements du stock",
      moduleKey: "mouvementsstockauto",
      foreignKey: "stockId",
      layout: "collapsible-list",
      labelFields: ["typeMouvement", "quantite", "motif"],
      subtitleFields: ["createdAt", "sourceType", "sourceId"],
      actions: [
        {
          key: "open-mouvement",
          label: "Fiche mouvement",
          kind: "open-record",
          moduleKey: "mouvementsstockauto",
          hrefTemplate: "/mouvementsstockauto/{id}",
          variant: "secondary",
        },
      ],
    },
    {
      key: "commandes",
      label: "Commandes liées au produit",
      moduleKey: "commandesstockauto",
      foreignKey: "produitId",
      layout: "collapsible-list",
      labelFields: ["numero", "statut", "montantTTC"],
      subtitleFields: ["dateCommande", "fournisseurId"],
      actions: [
        {
          key: "open-commande",
          label: "Fiche commande",
          kind: "open-record",
          moduleKey: "commandesstockauto",
          hrefTemplate: "/commandesstockauto/{id}",
          variant: "secondary",
        },
      ],
    },
    {
      key: "receptions",
      label: "Réceptions liées",
      moduleKey: "receptionsstockauto",
      foreignKey: "stockId",
      layout: "collapsible-list",
      labelFields: ["numero", "statut", "quantiteRecue"],
      subtitleFields: ["dateReception", "commandeId"],
      actions: [
        {
          key: "open-reception",
          label: "Fiche réception",
          kind: "open-record",
          moduleKey: "receptionsstockauto",
          hrefTemplate: "/receptionsstockauto/{id}",
          variant: "secondary",
        },
      ],
    },
  ],
};

export default async function ProductStockOperationalHubPage({
  searchParams,
}: ProductStockOperationalHubPageProps) {
  const resolvedSearchParams = await searchParams;

  const data = await RuntimeProductStockOperationalHubLoader.load({
    config: productStockOperationalHubConfig,
    productId: resolvedSearchParams?.productId ?? null,
    selectedStockId: resolvedSearchParams?.selectedStockId ?? null,
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
