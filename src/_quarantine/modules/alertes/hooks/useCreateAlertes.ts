"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { AlertesService } from "../services/AlertesService";

const service = new AlertesService();

export function useCreateAlertes() {
  return useMutation({
    mutationFn: (data: any) =>
      service.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["alertes"],
      });
    },
  });
}
