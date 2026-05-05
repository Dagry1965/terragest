"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { TerrainsService } from "../services/TerrainsService";

const service = new TerrainsService();

export function useDeleteTerrains() {
  return useMutation({
    mutationFn: (id: string) =>
      service.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["terrains"],
      });
    },
  });
}
