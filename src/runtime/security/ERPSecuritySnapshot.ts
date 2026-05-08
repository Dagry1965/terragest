import { ERPRoleRegistry } from "./roles/ERPRoleRegistry";
import { ERPPermissionRegistry } from "./permissions/ERPPermissionRegistry";
import { ERPPolicyRegistry } from "./policies/ERPPolicyRegistry";
import { ERPSecurityAuditStore } from "./audit/ERPSecurityAuditStore";
import { ERPSessionContext } from "./sessions/ERPSessionContext";

export function getERPSecuritySnapshot() {
  const audit = ERPSecurityAuditStore.all();

  return {
    session: ERPSessionContext.current(),
    roles: ERPRoleRegistry,
    permissions: ERPPermissionRegistry,
    policies: ERPPolicyRegistry,
    audit,
    denied: ERPSecurityAuditStore.denied(),
    rolesCount: ERPRoleRegistry.length,
    permissionsCount: ERPPermissionRegistry.length,
    policiesCount: ERPPolicyRegistry.length,
    auditCount: audit.length,
    deniedCount: ERPSecurityAuditStore.denied().length,
  };
}