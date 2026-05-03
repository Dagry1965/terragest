import { Organization }
from "@/features/organizations/types/Organization";

import { Membership }
from "@/features/memberships/types/Membership";

export type TenantContextType = {

  organization:
    Organization | null;

  membership:
    Membership | null;

  tenantId:
    string | null;

  organizationId:
    string | null;

  role:
    string | null;
};

export const TenantService = {

  buildContext(
    organization: Organization | null,
    membership: Membership | null
  ): TenantContextType {

    return {

      organization,

      membership,

      tenantId:
        organization?.tenantId || null,

      organizationId:
        organization?.id || null,

      role:
        membership?.role || null,
    };
  },
};