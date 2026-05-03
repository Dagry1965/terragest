Write-Host ""
Write-Host "=== TERRAGEST RUNTIME FOUNDATION SETUP ==="
Write-Host ""

# ============================================
# DIRECTORIES
# ============================================

$directories = @(

    "src/shared/lib/query",
    "src/shared/lib/validation",

    "src/shared/forms",

    "src/shared/hooks",

    "src/shared/types"
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
# QUERY PROVIDER
# ============================================

@'
"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query-client";

interface Props {
  children: React.ReactNode;
}

export function AppQueryProvider({
  children,
}: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
'@ | Out-File -LiteralPath "src/shared/lib/query/AppQueryProvider.tsx" -Encoding utf8

Write-Host "[OK] AppQueryProvider created"

# ============================================
# BASE PAGINATION
# ============================================

@'
export interface PaginationParams {
  page?: number;
  limit?: number;
}
'@ | Out-File -LiteralPath "src/shared/types/pagination.ts" -Encoding utf8

Write-Host "[OK] Pagination types created"

# ============================================
# BASE FILTERS
# ============================================

@'
export interface FilterParams {
  search?: string;
}
'@ | Out-File -LiteralPath "src/shared/types/filters.ts" -Encoding utf8

Write-Host "[OK] Filter types created"

# ============================================
# ZOD HELPER
# ============================================

@'
import { z } from "zod";

export const baseEntitySchema = z.object({
  id: z.string().optional(),
  organizationId: z.string().optional(),
});
'@ | Out-File -LiteralPath "src/shared/lib/validation/base-schema.ts" -Encoding utf8

Write-Host "[OK] Base schema created"

# ============================================
# USE FILTERS
# ============================================

@'
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
'@ | Out-File -LiteralPath "src/shared/hooks/useFilters.ts" -Encoding utf8

Write-Host "[OK] useFilters created"

Write-Host ""
Write-Host "=== RUNTIME FOUNDATION COMPLETED ==="
Write-Host ""
