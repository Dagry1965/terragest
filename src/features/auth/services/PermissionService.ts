export const PermissionService = {
  canViewDashboard(role: string) {
    return ["admin", "manager", "user"].includes(role);
  },

  canViewModules(role: string) {
    return ["admin", "manager"].includes(role);
  },

  canManageUsers(role: string) {
    return role === "admin";
  },
};

export default PermissionService;
