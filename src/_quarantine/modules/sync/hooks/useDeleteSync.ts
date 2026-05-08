"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { SyncService } from "../services/SyncService";

const service = new SyncService();

export function useDeleteSync() {
  return useMutation({
    mutationFn: (id: string) =>
      service.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sync"],
      });
    },
  });
}
