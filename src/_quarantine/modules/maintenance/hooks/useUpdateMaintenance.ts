"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { MaintenanceService } from "../services/MaintenanceService";

const service = new MaintenanceService();

export function useUpdateMaintenance() {
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
        queryKey: ["maintenance"],
      });
    },
  });
}
