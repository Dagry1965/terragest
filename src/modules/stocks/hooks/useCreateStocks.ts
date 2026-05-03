"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { StocksService } from "../services/StocksService";

const service = new StocksService();

export function useCreateStocks() {
  return useMutation({
    mutationFn: (data: any) =>
      service.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stocks"],
      });
    },
  });
}
