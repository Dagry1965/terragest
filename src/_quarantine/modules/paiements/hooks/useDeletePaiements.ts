"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { PaiementsService } from "../services/PaiementsService";

const service = new PaiementsService();

export function useDeletePaiements() {
  return useMutation({
    mutationFn: (id: string) =>
      service.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["paiements"],
      });
    },
  });
}
