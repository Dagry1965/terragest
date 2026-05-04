"use client";

import { useQuery } from "@tanstack/react-query";

import { MouvementsStockService } from "../services/MouvementsStockService";

const service = new MouvementsStockService();

export function useMouvementsStock() {
  return useQuery({
    queryKey: ["mouvementsStock"],
    queryFn: () => service.findAll(),
  });
}
