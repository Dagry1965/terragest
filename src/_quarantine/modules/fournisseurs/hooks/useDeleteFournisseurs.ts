"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { FournisseursService } from "../services/FournisseursService";

const service = new FournisseursService();

export function useDeleteFournisseurs() {
  return useMutation({
    mutationFn: (id: string) =>
      service.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fournisseurs"],
      });
    },
  });
}
