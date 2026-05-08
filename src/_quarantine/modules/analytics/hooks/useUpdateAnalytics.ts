"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { AnalyticsService } from "../services/AnalyticsService";

const service = new AnalyticsService();

export function useUpdateAnalytics() {
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
        queryKey: ["analytics"],
      });
    },
  });
}
