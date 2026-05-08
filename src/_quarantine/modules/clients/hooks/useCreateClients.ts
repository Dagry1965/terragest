"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { ClientsService } from "../services/ClientsService";

const service = new ClientsService();

export function useCreateClients() {
  return useMutation({
    mutationFn: (data: any) =>
      service.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
    },
  });
}
