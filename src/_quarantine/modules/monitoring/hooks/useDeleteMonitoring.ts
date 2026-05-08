"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { MonitoringService } from "../services/MonitoringService";

const service = new MonitoringService();

export function useDeleteMonitoring() {
  return useMutation({
    mutationFn: (id: string) =>
      service.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["monitoring"],
      });
    },
  });
}
