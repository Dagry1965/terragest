"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { AlertesService } from "../services/AlertesService";

const service = new AlertesService();

export function useDeleteAlertes() {
  return useMutation({
    mutationFn: (id: string) =>
      service.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["alertes"],
      });
    },
  });
}
