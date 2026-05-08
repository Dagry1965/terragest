import type { ERPRoleKey } from "../roles/ERPRole";
import type { ERPPermissionAction } from "../permissions/ERPPermission";

export type ERPPolicy = {
  role: ERPRoleKey;
  module: string;
  actions: ERPPermissionAction[];
};