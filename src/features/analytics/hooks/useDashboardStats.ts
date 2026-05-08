"use client";

import { useEffect, useState } from "react";

export type DashboardStats = {
  produits: number;
  stocks: number;
  materiels: number;
  exploitations: number;
};

export function useDashboardStats() {
  const [stats, setStats] =
    useState<DashboardStats>({
      produits: 0,
      stocks: 0,
      materiels: 0,
      exploitations: 0,
    });

  useEffect(() => {
    setStats({
      produits: 0,
      stocks: 0,
      materiels: 0,
      exploitations: 0,
    });
  }, []);

  return stats;
}

export default useDashboardStats;
