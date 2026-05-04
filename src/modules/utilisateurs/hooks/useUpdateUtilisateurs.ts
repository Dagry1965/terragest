"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { UtilisateursService } from "../services/UtilisateursService";

const service = new UtilisateursService();

export function useUpdateUtilisateurs() {
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
        queryKey: ["utilisateurs"],
      });
    },
  });
}
