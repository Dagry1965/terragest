"use client";

import { KPICard }
from "@/components/dashboard/KPICard";

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
        value={
          String(
            analytics.totalProducts
          )
        }
        subtitle="Produits enregistrÃ©s"
      />

      <KPICard
        title="QuantitÃ© Totale"
        value={
          String(
            analytics.totalQuantity
          )
        }
        subtitle="Stock global"
      />

      <KPICard
        title="Valeur Stock"
        value={
          `${analytics.totalStockValue} â‚¬`
        }
        subtitle="Valeur totale"
      />

      <KPICard
        title="Produits Actifs"
        value={
          String(
            analytics.activeProducts
          )
        }
        subtitle="Produits disponibles"
      />
    </div>
  );
};