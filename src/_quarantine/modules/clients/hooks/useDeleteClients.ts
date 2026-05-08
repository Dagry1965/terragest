"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { ClientsService } from "../services/ClientsService";

const service = new ClientsService();

export function useDeleteClients() {
  return useMutation({
    mutationFn: (id: string) =>
      service.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
    },
  });
}
