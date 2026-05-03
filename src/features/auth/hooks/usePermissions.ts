"use client";

import { UserRole }
from "@/features/auth/types/UserRole";

import { PermissionService }
from "@/features/auth/services/PermissionService";

export function usePermissions(
  role: UserRole = "admin"
) {

  return {

    canViewDashboard:
      PermissionService
        .canViewDashboard(role),

    canManageProducts:
      PermissionService
        .canManageProducts(role),

    canDeleteProducts:
      PermissionService
        .canDeleteProducts(role),

    canViewAnalytics:
      PermissionService
        .canViewAnalytics(role),
  };
}