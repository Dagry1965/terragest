"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { MouvementsStockService } from "../services/MouvementsStockService";

const service = new MouvementsStockService();

export function useUpdateMouvementsStock() {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: any;
    }) =>
      service.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mouvementsStock"],
      });
    },
  });
}
