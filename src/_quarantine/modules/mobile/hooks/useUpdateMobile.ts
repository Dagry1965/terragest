"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { MobileService } from "../services/MobileService";

const service = new MobileService();

export function useUpdateMobile() {
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
        queryKey: ["mobile"],
      });
    },
  });
}
