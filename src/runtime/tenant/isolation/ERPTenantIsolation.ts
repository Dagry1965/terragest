import {
  ERPTenantContext,
} from "../context/ERPTenantContext";

export const ERPTenantIsolation = {

  canAccessModule(
    moduleKey: string
  ) {

    const tenant =
      ERPTenantContext.current();

    return tenant.modules.includes(
      moduleKey
    );
  },

  requireModule(
    moduleKey: string
  ) {

    const allowed =
      this.canAccessModule(
        moduleKey
      );

    if (!allowed) {

      throw new Error(
        `Tenant cannot access module: ${moduleKey}`
      );
    }

    return true;
  },
};