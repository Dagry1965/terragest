import { RuntimeSecurityContext } from "./RuntimeSecurityContext";
import { RuntimePolicyEngine } from "./RuntimePolicyEngine";

export class RuntimeWorkflowGuard {
  static canStart(): boolean {
    const user = RuntimeSecurityContext.currentUser();

    return RuntimePolicyEngine.can(user, "workflow.start");
  }

  static canTransition(): boolean {
    const user = RuntimeSecurityContext.currentUser();

    return RuntimePolicyEngine.can(user, "workflow.transition");
  }

  static canValidate(): boolean {
    const user = RuntimeSecurityContext.currentUser();

    return RuntimePolicyEngine.can(user, "workflow.validate");
  }
}