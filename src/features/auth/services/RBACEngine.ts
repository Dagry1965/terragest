export const RBACEngine = {

  hasRole(
    role: string,
    allowedRoles: string[]
  ) {

    return allowedRoles.includes(
      role
    );
  },

  canAccess(
    permissions: string[],
    permission: string
  ) {

    return permissions.includes(
      permission
    );
  },
};
