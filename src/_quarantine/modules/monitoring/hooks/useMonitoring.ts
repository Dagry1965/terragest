"use client";

import { useQuery } from "@tanstack/react-query";

import { MonitoringService } from "../services/MonitoringService";

const service = new MonitoringService();

export function useMonitoring() {
  return useQuery({
    queryKey: ["monitoring"],
    queryFn: () => service.findAll(),
  });
}
