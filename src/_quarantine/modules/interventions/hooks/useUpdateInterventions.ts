"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { InterventionsService } from "../services/InterventionsService";

const service = new InterventionsService();

export function useUpdateInterventions() {
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
        queryKey: ["interventions"],
      });
    },
  });
}
