"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { MaterielsService } from "../services/MaterielsService";

const service = new MaterielsService();

export function useDeleteMateriels() {
  return useMutation({
    mutationFn: (id: string) =>
      service.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["materiels"],
      });
    },
  });
}
