"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { InterventionsService } from "../services/InterventionsService";

const service = new InterventionsService();

export function useDeleteInterventions() {
  return useMutation({
    mutationFn: (id: string) =>
      service.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["interventions"],
      });
    },
  });
}
