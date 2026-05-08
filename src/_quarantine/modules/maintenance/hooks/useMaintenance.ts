"use client";

import { useQuery } from "@tanstack/react-query";

import { MaintenanceService } from "../services/MaintenanceService";

const service = new MaintenanceService();

export function useMaintenance() {
  return useQuery({
    queryKey: ["maintenance"],
    queryFn: () => service.findAll(),
  });
}
