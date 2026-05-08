import type { ERPAction } from "@/runtime/actions";
import { RuntimeSecurityContext } from "./RuntimeSecurityContext";
import { RuntimePolicyEngine } from "./RuntimePolicyEngine";
import { RuntimeActionPermissionMapper } from "./RuntimeActionPermissionMapper";

export class RuntimeActionGuard {
  static canExecute(action: ERPAction): boolean {
    const user = RuntimeSecurityContext.currentUser();
    const permission = RuntimeActionPermissionMapper.permissionFor(action);

    if (!permission) {
      return true;
    }

    return RuntimePolicyEngine.can(user, permission);
  }

  static filter(actions: ERPAction[]): ERPAction[] {
    return actions.filter((action) =>
      RuntimeActionGuard.canExecute(action)
    );
  }
}