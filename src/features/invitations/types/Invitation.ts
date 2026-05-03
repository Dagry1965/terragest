import {
  BaseAuditEntity,
}
from "@/types/BaseEntity";

import { UserRole }
from "@/features/auth/types/UserRole";

export type InvitationStatus =
  | "pending"
  | "accepted"
  | "revoked"
  | "expired";

export type Invitation =
BaseAuditEntity & {

  email: string;

  organizationId: string;

  tenantId: string;

  role: UserRole;

  token: string;

  status: InvitationStatus;

  expiresAt: string;
};