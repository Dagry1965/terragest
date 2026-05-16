"use client";

import { ERPMetricCard as KPICard }
from "@/components/erp/ui";

import { useAnalytics }
from "@/features/analytics/hooks/useAnalytics";

export const AnalyticsCards =
() => {

  const {
    analytics,
    loading,
  } = useAnalytics();

  if (loading) {

    return (
      <p>
        Chargement analytics...
      </p>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
      "
    >
      <KPICard
        title="Produits"
       value={analytics.totalProducts}
        subtitle="Produits enregistrés"
      />

      <KPICard
        title="Quantité Totale"
        value={analytics.totalQuantity}
        subtitle="Stock global"
      />

      <KPICard
        title="Valeur Stock"
    value={analytics.totalStockValue}
        subtitle="Valeur totale"
      />

      <KPICard
        title="Produits Actifs"
        value={analytics.totalProducts}
        subtitle="Produits disponibles"
      />
    </div>
  );
};