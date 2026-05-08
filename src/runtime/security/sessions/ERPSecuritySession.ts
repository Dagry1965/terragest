import type { ERPRoleKey } from "../roles/ERPRole";

export type ERPSecuritySession = {
  userId: string;
  displayName: string;
  role: ERPRoleKey;
  tenantId?: string;
};