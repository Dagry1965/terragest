"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { ContratsService } from "../services/ContratsService";

const service = new ContratsService();

export function useCreateContrats() {
  return useMutation({
    mutationFn: (data: any) =>
      service.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contrats"],
      });
    },
  });
}
