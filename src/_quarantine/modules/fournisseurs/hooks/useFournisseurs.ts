"use client";

import { useQuery } from "@tanstack/react-query";

import { FournisseursService } from "../services/FournisseursService";

const service = new FournisseursService();

export function useFournisseurs() {
  return useQuery({
    queryKey: ["fournisseurs"],
    queryFn: () => service.findAll(),
  });
}
