"use client";

import { useQuery } from "@tanstack/react-query";

import { ContratsService } from "../services/ContratsService";

const service = new ContratsService();

export function useContrats() {
  return useQuery({
    queryKey: ["contrats"],
    queryFn: () => service.findAll(),
  });
}
