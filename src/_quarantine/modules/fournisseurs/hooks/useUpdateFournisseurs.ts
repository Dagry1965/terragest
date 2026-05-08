"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { FournisseursService } from "../services/FournisseursService";

const service = new FournisseursService();

export function useUpdateFournisseurs() {
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
        queryKey: ["fournisseurs"],
      });
    },
  });
}
