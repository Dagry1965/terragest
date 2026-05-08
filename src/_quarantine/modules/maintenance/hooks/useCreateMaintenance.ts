"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { MaintenanceService } from "../services/MaintenanceService";

const service = new MaintenanceService();

export function useCreateMaintenance() {
  return useMutation({
    mutationFn: (data: any) =>
      service.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["maintenance"],
      });
    },
  });
}
