"use client";

import { useQuery } from "@tanstack/react-query";

import { AnalyticsService } from "../services/AnalyticsService";

const service = new AnalyticsService();

export function useAnalytics() {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: () => service.findAll(),
  });
}
