import type { ERPRecordHubConfig } from "@/runtime/hub";
import { ProductStockOperationalHubClient } from "./ProductStockOperationalHubClient";

type ProductStockOperationalHubPageProps = {
  searchParams?: Promise<{
    productId?: string;
    selectedStockId?: string;
  }>;
};

const productStockOperationalHubConfig: ERPRecordHubConfig = {
  enabled: true,
  key: "produitsauto-stock-operational-hub",
  label: "Fiche Produit / Stock OpÃƒÂ©rationnelle",
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
      label: "Mouvements rÃƒÂ©cents",
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
      label: "Commandes liÃƒÂ©es au produit",
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
      label: "RÃƒÂ©ceptions liÃƒÂ©es",
      moduleKey: "receptionsstockauto",
      foreignKey: "stockId",
      layout: "collapsible-list",
      labelFields: ["numero", "statut", "quantiteRecue"],
      subtitleFields: ["dateReception", "commandeId"],
      actions: [
        {
          key: "open-reception",
          label: "Fiche rÃƒÂ©ception",
          kind: "open-record",
          moduleKey: "receptionsstockauto",
          hrefTemplate: "/receptionsstockauto/{id}",
          variant: "secondary",
        },
      ],
    },
  ],
};

function ProductStockHubEmptyState() {
  return (
    <section className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Product / Stock Operational Hub
          </p>

          <h1 className="mt-2 text-2xl font-semibold text-slate-950">
            Fiche Produit / Stock OpÃƒÂ©rationnelle
          </h1>

          <p className="mt-2 max-w-3xl text-sm text-slate-500">
            SÃƒÂ©lectionnez un produit pour afficher ses stocks, mouvements, commandes et rÃƒÂ©ceptions.
            Cette page nÃ¢â‚¬â„¢effectue aucun chargement runtime tant quÃ¢â‚¬â„¢aucun produit nÃ¢â‚¬â„¢est sÃƒÂ©lectionnÃƒÂ©.
          </p>
        </header>

        <section className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500">
          <p className="font-semibold text-slate-800">Aucun produit sÃƒÂ©lectionnÃƒÂ©.</p>
          <p className="mt-1">
            Ouvrez cette page avec un paramÃƒÂ¨tre du type{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-700">
              ?productId=&lt;id-produit&gt;
            </code>{" "}
            pour charger le hub opÃƒÂ©rationnel.
          </p>
        </section>
      </div>
    </section>
  );
}

export default async function ProductStockOperationalHubPage({
  searchParams,
}: ProductStockOperationalHubPageProps) {
  const resolvedSearchParams = await searchParams;
  const productId = resolvedSearchParams?.productId ?? null;
  const selectedStockId = resolvedSearchParams?.selectedStockId ?? null;

  if (!productId) {
    console.info(
      "[ProductStockOperationalHubPage] no productId: rendering isolated empty page without hub/runtime imports"
    );

    return <ProductStockHubEmptyState />;
  }

  console.info("[ProductStockOperationalHubPage] productId detected: rendering client runtime hub", {
    productId,
    selectedStockId,
  });

  return (
    <ProductStockOperationalHubClient
      config={productStockOperationalHubConfig}
      productId={productId}
      selectedStockId={selectedStockId}
    />
  );
}