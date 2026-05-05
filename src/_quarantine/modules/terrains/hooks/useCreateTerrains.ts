"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { TerrainsService } from "../services/TerrainsService";

const service = new TerrainsService();

export function useCreateTerrains() {
  return useMutation({
    mutationFn: (data: any) =>
      service.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["terrains"],
      });
    },
  });
}
