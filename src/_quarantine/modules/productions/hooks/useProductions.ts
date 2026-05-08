"use client";

import { useQuery } from "@tanstack/react-query";

import { ProductionsService } from "../services/ProductionsService";

const service = new ProductionsService();

export function useProductions() {
  return useQuery({
    queryKey: ["productions"],
    queryFn: () => service.findAll(),
  });
}
