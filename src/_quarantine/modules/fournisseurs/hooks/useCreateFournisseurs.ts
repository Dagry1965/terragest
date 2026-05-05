"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { FournisseursService } from "../services/FournisseursService";

const service = new FournisseursService();

export function useCreateFournisseurs() {
  return useMutation({
    mutationFn: (data: any) =>
      service.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fournisseurs"],
      });
    },
  });
}
