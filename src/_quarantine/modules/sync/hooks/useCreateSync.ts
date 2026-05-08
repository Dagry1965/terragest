"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { SyncService } from "../services/SyncService";

const service = new SyncService();

export function useCreateSync() {
  return useMutation({
    mutationFn: (data: any) =>
      service.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sync"],
      });
    },
  });
}
