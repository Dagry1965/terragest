"use client";

import { ERPProductStockOperationalSheet } from "@/components/erp/hub/ERPProductStockOperationalSheet";
import { useEffect, useState } from "react";
import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "@/runtime/hub";

type ProductStockOperationalHubClientProps = {
  config: ERPRecordHubConfig;
  productId: string;
  selectedStockId?: string | null;
};

type ProductStockHubState = {
  rootRecord: ERPRecordHubRecord | null;
  primaryRecords: ERPRecordHubRecord[];
  relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
};

export function ProductStockOperationalHubClient({
  config,
  productId,
  selectedStockId = null,
}: ProductStockOperationalHubClientProps) {
  const [data, setData] = useState<ProductStockHubState>({
    rootRecord: null,
    primaryRecords: [],
    relatedRecordsBySection: {
      mouvements: [],
      commandes: [],
      receptions: [],
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadHubData() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const { RuntimeProductStockOperationalHubLoader } = await import(
          "@/runtime/hub/RuntimeProductStockOperationalHubLoader"
        );

        const result = await RuntimeProductStockOperationalHubLoader.load({
          config,
          productId,
          selectedStockId,
        });

        if (cancelled) {
          return;
        }

        setData({
          rootRecord: result.rootRecord,
          primaryRecords: result.primaryRecords,
          relatedRecordsBySection: result.relatedRecordsBySection,
        });
      } catch (error) {
        console.error("[ProductStockOperationalHubClient] failed to load hub data", error);

        if (!cancelled) {
          setLoadError(
            "Impossible de charger les données produit / stock pour le moment."
          );
          setData({
            rootRecord: null,
            primaryRecords: [],
            relatedRecordsBySection: {
              mouvements: [],
              commandes: [],
              receptions: [],
            },
          });
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadHubData();

    return () => {
      cancelled = true;
    };
  }, [config, productId, selectedStockId]);

  if (isLoading) {
    return (
      <section className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1600px] rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Product / Stock Operational Hub
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-950">
            Chargement du produit…
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Les stocks, mouvements, commandes et réceptions sont en cours de chargement.
          </p>
        </div>
      </section>
    );
  }

  if (loadError) {
    return (
      <section className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1600px] rounded-3xl border border-red-100 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-700">
            Product / Stock Operational Hub
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-950">
            Données indisponibles
          </h1>
          <p className="mt-2 text-sm text-slate-500">{loadError}</p>
        </div>
      </section>
    );
  }

  return (
    <ERPProductStockOperationalSheet
      config={config}
      rootRecord={data.rootRecord}
      primaryRecords={data.primaryRecords}
      relatedRecordsBySection={data.relatedRecordsBySection}
    />
  );
}