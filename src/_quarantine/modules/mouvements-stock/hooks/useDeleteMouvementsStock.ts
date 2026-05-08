"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { MouvementsStockService } from "../services/MouvementsStockService";

const service = new MouvementsStockService();

export function useDeleteMouvementsStock() {
  return useMutation({
    mutationFn: (id: string) =>
      service.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mouvementsStock"],
      });
    },
  });
}
