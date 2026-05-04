"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { RecoltesService } from "../services/RecoltesService";

const service = new RecoltesService();

export function useDeleteRecoltes() {
  return useMutation({
    mutationFn: (id: string) =>
      service.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recoltes"],
      });
    },
  });
}
