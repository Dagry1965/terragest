"use client";

import {
  RBACEngine,
} from "@/features/auth/services/RBACEngine";

export const usePermissions =
(
  permissions: string[]
) => {

  return {

    canAccess:
      (
        permission: string
      ) =>

        RBACEngine.canAccess(
          permissions,
          permission
        ),
  };
}
