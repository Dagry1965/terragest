export interface ERPPolicy {

  id: string;

  module: string;

  action: string;

  evaluate: (
    context: Record<string, unknown>
  ) => boolean;
}

export class ERPPolicyEngine {

  private policies:
    ERPPolicy[] = [];

  registerPolicy(
    policy: ERPPolicy
  ) {

    this.policies.push(
      policy
    );
  }

  getPolicies(
    module: string
  ) {

    return this.policies.filter(
      policy =>
        policy.module === module
    );
  }

  authorize(
    module: string,
    action: string,
    context: Record<string, unknown>
  ) {

    const policies =
      this.getPolicies(module)
        .filter(
          policy =>
            policy.action === action
        );

    if (
      policies.length === 0
    ) {

      return true;
    }

    return policies.every(
      policy =>
        policy.evaluate(
          context
        )
    );
  }
}

export const erpPolicyEngine =
  new ERPPolicyEngine();