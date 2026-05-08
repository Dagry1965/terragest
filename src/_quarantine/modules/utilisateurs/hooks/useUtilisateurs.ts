"use client";

import { useQuery } from "@tanstack/react-query";

import { UtilisateursService } from "../services/UtilisateursService";

const service = new UtilisateursService();

export function useUtilisateurs() {
  return useQuery({
    queryKey: ["utilisateurs"],
    queryFn: () => service.findAll(),
  });
}
