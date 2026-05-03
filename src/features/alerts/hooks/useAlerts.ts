"use client";

import { useMemo }
from "react";

import { useProducts }
from "@/features/produits/hooks/useProducts";

import { AlertService }
from "@/features/alerts/services/AlertService";

export function useAlerts() {

  const {
    data: products,
    loading,
  } = useProducts();

  const alerts =
    useMemo(() => {

      return AlertService
        .generateProductsAlerts(
          products
        );

    }, [products]);

  return {
    loading,
    alerts,
  };
}