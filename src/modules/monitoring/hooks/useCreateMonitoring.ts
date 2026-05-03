"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { MonitoringService } from "../services/MonitoringService";

const service = new MonitoringService();

export function useCreateMonitoring() {
  return useMutation({
    mutationFn: (data: any) =>
      service.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["monitoring"],
      });
    },
  });
}
