"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { MaterielsService } from "../services/MaterielsService";

const service = new MaterielsService();

export function useCreateMateriels() {
  return useMutation({
    mutationFn: (data: any) =>
      service.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["materiels"],
      });
    },
  });
}
