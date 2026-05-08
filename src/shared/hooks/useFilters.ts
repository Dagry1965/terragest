import { useState } from "react";

export function useFilters<T>(
  initialFilters: T
) {
  const [filters, setFilters] =
    useState(initialFilters);

  return {
    filters,
    setFilters,
  };
}
