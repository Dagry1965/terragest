"use client";

import { useMemo }
from "react";

import { useProducts }
from "@/features/produits/hooks/useProducts";

export function useAnalytics() {

  const {
    data: products,
    loading,
  } = useProducts();

  const analytics =
    useMemo(() => {

      const totalProducts =
        products.length;

      const totalQuantity =
        products.reduce(
          (
            acc: number,
            item: any
          ) =>
            acc +
            Number(
              item.quantite || 0
            ),
          0
        );

      const totalStockValue =
        products.reduce(
          (
            acc: number,
            item: any
          ) =>
            acc +
            (
              Number(item.prix || 0) *
              Number(
                item.quantite || 0
              )
            ),
          0
        );

      const activeProducts =
        products.filter(
          (item: any) =>
            item.actif
        ).length;

      return {
        totalProducts,
        totalQuantity,
        totalStockValue,
        activeProducts,
      };

    }, [products]);

  return {
    loading,
    analytics,
  };
}