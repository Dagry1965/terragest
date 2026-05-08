"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { FacturesService } from "../services/FacturesService";

const service = new FacturesService();

export function useCreateFactures() {
  return useMutation({
    mutationFn: (data: any) =>
      service.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["factures"],
      });
    },
  });
}
