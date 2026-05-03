import { UserRole }
from "@/features/auth/types/UserRole";

export const PermissionService = {

  canViewDashboard(
    role: UserRole
  ) {

    return [
      "admin",
      "manager",
      "agent",
      "viewer",
    ].includes(role);
  },

  canManageProducts(
    role: UserRole
  ) {

    return [
      "admin",
      "manager",
    ].includes(role);
  },

  canDeleteProducts(
    role: UserRole
  ) {

    return role === "admin";
  },

  canViewAnalytics(
    role: UserRole
  ) {

    return [
      "admin",
      "manager",
    ].includes(role);
  },
};