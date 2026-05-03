"use client";

import { useQuery } from "@tanstack/react-query";

import { InterventionsService } from "../services/InterventionsService";

const service = new InterventionsService();

export function useInterventions() {
  return useQuery({
    queryKey: ["interventions"],
    queryFn: () => service.findAll(),
  });
}
