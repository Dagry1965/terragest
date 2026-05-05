"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { AnalyticsService } from "../services/AnalyticsService";

const service = new AnalyticsService();

export function useDeleteAnalytics() {
  return useMutation({
    mutationFn: (id: string) =>
      service.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["analytics"],
      });
    },
  });
}
