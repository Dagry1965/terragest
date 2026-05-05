"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { UtilisateursService } from "../services/UtilisateursService";

const service = new UtilisateursService();

export function useDeleteUtilisateurs() {
  return useMutation({
    mutationFn: (id: string) =>
      service.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["utilisateurs"],
      });
    },
  });
}
