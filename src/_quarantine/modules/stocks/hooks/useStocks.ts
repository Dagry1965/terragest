"use client";

import { useQuery } from "@tanstack/react-query";

import { StocksService } from "../services/StocksService";

const service = new StocksService();

export function useStocks() {
  return useQuery({
    queryKey: ["stocks"],
    queryFn: () => service.findAll(),
  });
}
