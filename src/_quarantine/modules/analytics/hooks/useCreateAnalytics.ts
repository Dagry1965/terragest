"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/query/query-client";

import { AnalyticsService } from "../services/AnalyticsService";

const service = new AnalyticsService();

export function useCreateAnalytics() {
  return useMutation({
    mutationFn: (data: any) =>
      service.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["analytics"],
      });
    },
  });
}
