"use client";

import { useQuery } from "@tanstack/react-query";

import { ClientsService } from "../services/ClientsService";

const service = new ClientsService();

export function useClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => service.findAll(),
  });
}
