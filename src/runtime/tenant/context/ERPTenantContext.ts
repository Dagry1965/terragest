import type { ERPTenant } from "../registry/ERPTenant";

import {
  ERPTenantRegistry,
} from "../registry/ERPTenantRegistry";

let currentTenant =
  ERPTenantRegistry[0];

export const ERPTenantContext = {

  current(): ERPTenant {

    return currentTenant;
  },

  setTenant(
    tenantId: string
  ) {

    const tenant =
      ERPTenantRegistry.find(
        (item) =>
          item.id === tenantId
      );

    if (!tenant) {
      return;
    }

    currentTenant = tenant;
  },
};