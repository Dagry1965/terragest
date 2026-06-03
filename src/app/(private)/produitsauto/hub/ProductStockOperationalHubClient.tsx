"use client";

import { ERPProductStockOperationalSheet } from "@/components/erp/hub/ERPProductStockOperationalSheet";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { produitsautoModule } from "@/runtime/modules/generated/produitsauto/produitsauto.module";
import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "@/runtime/hub";

type ProductStockOperationalHubClientProps = {
  config: ERPRecordHubConfig;
  productId: string;
  selectedStockId?: string | null;
};

function productSearchRecordId(record: ERPRecordHubRecord | null | undefined): string {
  return String(record?.id ?? record?._id ?? "");
}

function productSearchText(record: ERPRecordHubRecord, keys: string[]): string {
  return keys
    .map((key) => String((record as Record<string, unknown>)[key] ?? "").trim())
    .filter(Boolean)
    .join(" ");
}

function productSearchLabel(record: ERPRecordHubRecord): string {
  return (
    productSearchText(record, [
      "displayLabel",
      "label",
      "nom",
      "designation",
      "libelle",
      "reference",
      "code",
      "sku",
    ]) || "Produit"
  );
}

function productSearchCode(record: ERPRecordHubRecord): string {
  return productSearchText(record, ["reference", "code", "sku"]) || "-";
}

function normalizeProductSearch(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

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
  const router = useRouter();
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
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [productSearchRecords, setProductSearchRecords] = useState<ERPRecordHubRecord[]>([]);
  const [isProductSearchLoading, setIsProductSearchLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadProductSearchRecords() {
      setIsProductSearchLoading(true);

      try {
        const records = await RuntimeDataBinding.list(produitsautoModule);

        if (!cancelled) {
          setProductSearchRecords(records as ERPRecordHubRecord[]);
        }
      } catch (error) {
        console.warn("[ProductStockOperationalHubClient] product search list failed", error);

        if (!cancelled) {
          setProductSearchRecords([]);
        }
      } finally {
        if (!cancelled) {
          setIsProductSearchLoading(false);
        }
      }
    }

    void loadProductSearchRecords();

    return () => {
      cancelled = true;
    };
  }, []);

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

  const productSearchSuggestions = useMemo(() => {
    const query = normalizeProductSearch(productSearchQuery);

    if (query.length < 2) {
      return [];
    }

    return productSearchRecords
      .filter((record) => productSearchRecordId(record) !== productId)
      .filter((record) => {
        const haystack = normalizeProductSearch(
          productSearchText(record, [
            "displayLabel",
            "label",
            "nom",
            "designation",
            "libelle",
            "reference",
            "code",
            "sku",
            "typeArticle",
            "typeProduit",
            "categorie",
          ])
        );

        return haystack.includes(query);
      })
      .slice(0, 8)
      .map((record) => ({
        id: productSearchRecordId(record),
        label: productSearchLabel(record),
        code: productSearchCode(record),
        type: productSearchText(record, ["typeArticle", "typeProduit", "categorie"]) || "Article",
      }))
      .filter((item) => item.id);
  }, [productId, productSearchQuery, productSearchRecords]);

  function selectProductFromSearch(nextProductId: string) {
    if (!nextProductId) {
      return;
    }

    setProductSearchQuery("");
    router.push("/produitsauto/hub?productId=" + encodeURIComponent(nextProductId));
  }

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
      productSearch={{
        query: productSearchQuery,
        suggestions: productSearchSuggestions,
        isLoading: isProductSearchLoading,
        onQueryChange: setProductSearchQuery,
        onSelectProduct: selectProductFromSearch,
      }}
    />
  );
}