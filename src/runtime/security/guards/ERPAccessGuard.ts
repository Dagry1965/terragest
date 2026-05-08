import type { ERPPermissionAction } from "../permissions/ERPPermission";
import type { ERPSecuritySession } from "../sessions/ERPSecuritySession";

import { ERPPolicyRegistry } from "../policies/ERPPolicyRegistry";
import { ERPSessionContext } from "../sessions/ERPSessionContext";
import { ERPSecurityAuditStore } from "../audit/ERPSecurityAuditStore";

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export const ERPAccessGuard = {
  can(
    module: string,
    action: ERPPermissionAction,
    session: ERPSecuritySession = ERPSessionContext.current()
  ) {
    const policy =
      ERPPolicyRegistry.find(
        (item) =>
          item.role === session.role &&
          item.module === module
      );

    const allowed =
      Boolean(policy?.actions.includes(action));

    ERPSecurityAuditStore.add({
      id: createId("sec_audit"),
      userId: session.userId,
      role: session.role,
      module,
      action,
      allowed,
      level: allowed ? "info" : "denied",
      timestamp: new Date().toISOString(),
    });

    return allowed;
  },

  require(
    module: string,
    action: ERPPermissionAction,
    session?: ERPSecuritySession
  ) {
    const allowed =
      this.can(module, action, session);

    if (!allowed) {
      throw new Error(
        `Access denied: ${module}:${action}`
      );
    }

    return true;
  },
};