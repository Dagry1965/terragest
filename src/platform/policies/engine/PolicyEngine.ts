import type {
  Policy,
  RuntimePolicyContext,
}
from "../types/Policy";

export class PolicyEngine {

  private policies:
    Policy[] = [];

  register(
    policy: Policy
  ) {

    this.policies.push(
      policy
    );
  }

  async evaluate(
    context:
      RuntimePolicyContext
  ) {

    for (
      const policy
      of this.policies
    ) {

      if (!policy.enabled) {
        continue;
      }

      const allowed =
        await policy.evaluate(
          context
        );

      if (!allowed) {

        console.log(
          "[POLICY DENIED]",
          policy.name
        );

        return false;
      }
    }

    return true;
  }
}