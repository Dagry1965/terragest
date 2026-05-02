export const TenantService = {

  resolveTenant(
    tenantId: string
  ) {

    return {

      id: tenantId,

      name:
        "Tenant Enterprise",

      plan:
        "PRO",
    };
  },
};
