"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { FacturesService } from "../services/FacturesService";

const service = new FacturesService();

export function useDeleteFactures() {
  return useMutation({
    mutationFn: (id: string) =>
      service.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["factures"],
      });
    },
  });
}
