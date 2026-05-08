import { ERPBadge } from "@/components/erp/ui";
import { RuntimeSecurityContext } from "@/runtime/security-runtime";

export function ERPRuntimeSecurityBadge() {
  const user = RuntimeSecurityContext.currentUser();

  return (
    <ERPBadge tone="success">
      Role {user.role}
    </ERPBadge>
  );
}