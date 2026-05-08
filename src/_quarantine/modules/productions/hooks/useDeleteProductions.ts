"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { ProductionsService } from "../services/ProductionsService";

const service = new ProductionsService();

export function useDeleteProductions() {
  return useMutation({
    mutationFn: (id: string) =>
      service.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productions"],
      });
    },
  });
}
