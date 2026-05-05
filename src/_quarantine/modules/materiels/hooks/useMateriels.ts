"use client";

import { useQuery } from "@tanstack/react-query";

import { MaterielsService } from "../services/MaterielsService";

const service = new MaterielsService();

export function useMateriels() {
  return useQuery({
    queryKey: ["materiels"],
    queryFn: () => service.findAll(),
  });
}
