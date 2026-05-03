"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { PaiementsService } from "../services/PaiementsService";

const service = new PaiementsService();

export function useCreatePaiements() {
  return useMutation({
    mutationFn: (data: any) =>
      service.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["paiements"],
      });
    },
  });
}
