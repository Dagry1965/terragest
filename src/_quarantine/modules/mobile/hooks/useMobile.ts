"use client";

import { useQuery } from "@tanstack/react-query";

import { MobileService } from "../services/MobileService";

const service = new MobileService();

export function useMobile() {
  return useQuery({
    queryKey: ["mobile"],
    queryFn: () => service.findAll(),
  });
}
