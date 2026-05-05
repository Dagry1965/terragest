"use client";

import { useQuery } from "@tanstack/react-query";

import { PaiementsService } from "../services/PaiementsService";

const service = new PaiementsService();

export function usePaiements() {
  return useQuery({
    queryKey: ["paiements"],
    queryFn: () => service.findAll(),
  });
}
