import type { RuntimePermission } from "./RuntimePermission";
import type { RuntimeUser } from "./RuntimeRole";
import { runtimeRolePermissions } from "./RuntimePolicyRegistry";

export class RuntimePolicyEngine {
  static can(
    user: RuntimeUser,
    permission: RuntimePermission
  ): boolean {
    return runtimeRolePermissions[user.role].includes(permission);
  }

  static filterByPermission<T extends { permission?: RuntimePermission }>(
    user: RuntimeUser,
    items: T[]
  ): T[] {
    return items.filter((item) => {
      if (!item.permission) {
        return true;
      }

      return RuntimePolicyEngine.can(user, item.permission);
    });
  }
}