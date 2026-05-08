"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { ContratsService } from "../services/ContratsService";

const service = new ContratsService();

export function useDeleteContrats() {
  return useMutation({
    mutationFn: (id: string) =>
      service.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contrats"],
      });
    },
  });
}
