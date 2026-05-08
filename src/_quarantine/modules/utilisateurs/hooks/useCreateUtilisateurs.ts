"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { UtilisateursService } from "../services/UtilisateursService";

const service = new UtilisateursService();

export function useCreateUtilisateurs() {
  return useMutation({
    mutationFn: (data: any) =>
      service.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["utilisateurs"],
      });
    },
  });
}
