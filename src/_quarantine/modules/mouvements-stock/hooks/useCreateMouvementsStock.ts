"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { MouvementsStockService } from "../services/MouvementsStockService";

const service = new MouvementsStockService();

export function useCreateMouvementsStock() {
  return useMutation({
    mutationFn: (data: any) =>
      service.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mouvementsStock"],
      });
    },
  });
}
