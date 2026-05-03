"use client";

import { useQuery } from "@tanstack/react-query";

import { AlertesService } from "../services/AlertesService";

const service = new AlertesService();

export function useAlertes() {
  return useQuery({
    queryKey: ["alertes"],
    queryFn: () => service.findAll(),
  });
}
