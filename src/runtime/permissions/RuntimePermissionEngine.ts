export class RuntimePermissionEngine {

  static canAccessField(
    field: {
      permissions?: {
        roles?: string[];
      };
    },
    userRole: string = "admin"
  ) {
    const allowedRoles =
      field.permissions?.roles;

    if (
      !allowedRoles ||
      allowedRoles.length === 0
    ) {
      return true;
    }

    return allowedRoles.includes(userRole);
  }
}