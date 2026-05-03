"use client";

import { useQuery } from "@tanstack/react-query";

import { FacturesService } from "../services/FacturesService";

const service = new FacturesService();

export function useFactures() {
  return useQuery({
    queryKey: ["factures"],
    queryFn: () => service.findAll(),
  });
}
