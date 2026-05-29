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
  label: "Fiche Produit / Stock Op\u00e9rationnelle",
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
      field: "stockTotal",
      format: "number",
    },
    {
      key: "stocksCount",
      label: "Stocks",
      source: "computed",
      field: "stockCount",
      format: "number",
    },
    {
      key: "openOrdersCount",
      label: "Commandes ouvertes",
      source: "computed",
      field: "openOrders",
      format: "number",
    },
    {
      key: "recentMovementsCount",
      label: "Mouvements r\u00e9cents",
      source: "computed",
      field: "recentMovements",
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
      subtitleFields: ["createdAt", "sourceType"],
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
      label: "Commandes li\u00e9es au produit",
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
      label: "R\u00e9ceptions li\u00e9es",
      moduleKey: "receptionsstockauto",
      foreignKey: "stockId",
      layout: "collapsible-list",
      labelFields: ["numero", "statut", "quantiteRecue"],
      subtitleFields: ["dateReception", "commandeId"],
      actions: [
        {
          key: "open-reception",
          label: "Fiche r\u00e9ception",
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
            {"Fiche Produit / Stock Op\u00e9rationnelle"}
          </h1>

          <p className="mt-2 max-w-3xl text-sm text-slate-500">
            {"S\u00e9lectionnez un produit pour afficher ses stocks, mouvements, commandes et r\u00e9ceptions. Cette page n\u2019effectue aucun chargement runtime tant qu\u2019aucun produit n\u2019est s\u00e9lectionn\u00e9."}
          </p>
        </header>

        <section className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500">
          <p className="font-semibold text-slate-800">
            {"Aucun produit s\u00e9lectionn\u00e9."}
          </p>
          <p className="mt-1">
            {"Ouvrez cette page avec un param\u00e8tre du type "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-700">
              ?productId=&lt;id-produit&gt;
            </code>{" "}
            {"pour charger le hub op\u00e9rationnel."}
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