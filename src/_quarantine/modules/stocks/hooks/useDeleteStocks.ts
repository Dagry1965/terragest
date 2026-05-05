"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { StocksService } from "../services/StocksService";

const service = new StocksService();

export function useDeleteStocks() {
  return useMutation({
    mutationFn: (id: string) =>
      service.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stocks"],
      });
    },
  });
}
