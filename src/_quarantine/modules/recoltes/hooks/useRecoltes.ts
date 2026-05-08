"use client";

import { useQuery } from "@tanstack/react-query";

import { RecoltesService } from "../services/RecoltesService";

const service = new RecoltesService();

export function useRecoltes() {
  return useQuery({
    queryKey: ["recoltes"],
    queryFn: () => service.findAll(),
  });
}
