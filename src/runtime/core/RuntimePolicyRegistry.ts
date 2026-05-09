export interface RuntimePolicy {

  id: string;

  moduleId: string;

  name: string;

  enabled: boolean;

  rules: string[];
}

export class RuntimePolicyRegistry {

  private policies:
    RuntimePolicy[] = [];

  registerPolicy(
    policy: RuntimePolicy
  ) {

    this.policies.push(policy);
  }

  getPolicies() {

    return this.policies;
  }

  getModulePolicies(
    moduleId: string
  ) {

    return this.policies.filter(
      policy =>
        policy.moduleId === moduleId
    );
  }

  getEnabledPolicies() {

    return this.policies.filter(
      policy =>
        policy.enabled
    );
  }
}

export const runtimePolicyRegistry =
  new RuntimePolicyRegistry();