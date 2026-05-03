import {
  BaseAuditEntity,
}
from "@/types/BaseEntity";

import { UserRole }
from "@/features/auth/types/UserRole";

export type Membership =
BaseAuditEntity & {

  userId: string;

  organizationId: string;

  tenantId: string;

  role: UserRole;

  active: boolean;
};