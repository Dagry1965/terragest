import { PermissionService } from "@/features/auth/services/PermissionService";

export function usePermissions(role: string) {
  return {
    canViewDashboard:
      PermissionService.canViewDashboard(role),

    canViewModules:
      PermissionService.canViewModules(role),

    canManageUsers:
      PermissionService.canManageUsers(role),
  };
}

export default usePermissions;
