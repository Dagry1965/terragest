"use client";

import { useQuery } from "@tanstack/react-query";

import { TerrainsService } from "../services/TerrainsService";

const service = new TerrainsService();

export function useTerrains() {
  return useQuery({
    queryKey: ["terrains"],
    queryFn: () => service.findAll(),
  });
}
