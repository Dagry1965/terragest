"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { PaiementsService } from "../services/PaiementsService";

const service = new PaiementsService();

export function useUpdatePaiements() {
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
        queryKey: ["paiements"],
      });
    },
  });
}
