Write-Host ""
Write-Host "=== TERRAGEST DATA FOUNDATION SETUP ==="
Write-Host ""

# ============================================
# DIRECTORIES
# ============================================

$directories = @(

    "src/shared/lib",
    "src/shared/hooks",
    "src/shared/types",

    "src/shared/lib/query",
    "src/shared/lib/pagination",
    "src/shared/lib/filters",
    "src/shared/lib/sorting"
)

foreach ($dir in $directories) {

    if (-not (Test-Path $dir)) {

        New-Item -ItemType Directory -Force -Path $dir | Out-Null

        Write-Host "[OK] Created: $dir"
    }
}

# ============================================
# QUERY CLIENT
# ============================================

@'
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
'@ | Out-File -LiteralPath "src/shared/lib/query/query-client.ts" -Encoding utf8

Write-Host "[OK] QueryClient created"

# ============================================
# QUERY KEYS
# ============================================

@'
export const queryKeys = {
  organisations: ["organisations"],
  utilisateurs: ["utilisateurs"],
  exploitations: ["exploitations"],
  produits: ["produits"],
  stocks: ["stocks"],
  contrats: ["contrats"],
};
'@ | Out-File -LiteralPath "src/shared/lib/query/query-keys.ts" -Encoding utf8

Write-Host "[OK] Query keys created"

# ============================================
# PAGINATION TYPES
# ============================================

@'
export interface PaginationParams {
  page: number;
  limit: number;
}
'@ | Out-File -LiteralPath "src/shared/lib/pagination/pagination.types.ts" -Encoding utf8

Write-Host "[OK] Pagination types created"

# ============================================
# FILTER TYPES
# ============================================

@'
export interface FilterParams {
  search?: string;
}
'@ | Out-File -LiteralPath "src/shared/lib/filters/filter.types.ts" -Encoding utf8

Write-Host "[OK] Filter types created"

# ============================================
# SORT TYPES
# ============================================

@'
export interface SortParams {
  field: string;
  direction: "asc" | "desc";
}
'@ | Out-File -LiteralPath "src/shared/lib/sorting/sort.types.ts" -Encoding utf8

Write-Host "[OK] Sort types created"

# ============================================
# API RESPONSE
# ============================================

@'
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
'@ | Out-File -LiteralPath "src/shared/types/api-response.ts" -Encoding utf8

Write-Host "[OK] ApiResponse created"

# ============================================
# USE DEBOUNCE
# ============================================

@'
import { useEffect, useState } from "react";

export function useDebounce<T>(
  value: T,
  delay: number = 300
) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
'@ | Out-File -LiteralPath "src/shared/hooks/useDebounce.ts" -Encoding utf8

Write-Host "[OK] useDebounce created"

# ============================================
# USE PAGINATION
# ============================================

@'
import { useState } from "react";

export function usePagination() {
  const [page, setPage] = useState(1);

  return {
    page,
    setPage,
  };
}
'@ | Out-File -LiteralPath "src/shared/hooks/usePagination.ts" -Encoding utf8

Write-Host "[OK] usePagination created"

Write-Host ""
Write-Host "=== DATA FOUNDATION SETUP COMPLETED ==="
Write-Host ""