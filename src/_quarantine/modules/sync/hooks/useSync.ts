"use client";

import { useQuery } from "@tanstack/react-query";

import { SyncService } from "../services/SyncService";

const service = new SyncService();

export function useSync() {
  return useQuery({
    queryKey: ["sync"],
    queryFn: () => service.findAll(),
  });
}
