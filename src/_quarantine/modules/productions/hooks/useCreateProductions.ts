"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { ProductionsService } from "../services/ProductionsService";

const service = new ProductionsService();

export function useCreateProductions() {
  return useMutation({
    mutationFn: (data: any) =>
      service.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productions"],
      });
    },
  });
}
