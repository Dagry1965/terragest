"use client";

import {
  useTenantContext,
} from "@/features/tenancy/context/TenantProvider";

export function useTenant() {

  return useTenantContext();
}