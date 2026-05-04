// src/platform/governance/policies/registry/PolicyRegistry.ts

import {
  RuntimePolicy
}
from "@/platform/governance/policies/types/RuntimePolicy";

class PolicyRegistryManager {

  private policies:
    RuntimePolicy[] = [];

  register(
    policy: RuntimePolicy
  ) {

    console.log(
      "[POLICY REGISTERED]",
      policy.name
    );

    this.policies.push(
      policy
    );

    this.policies.sort(
      (a, b) =>
        (b.priority || 0)
        - (a.priority || 0)
    );
  }

  getPolicies() {

    return this.policies;
  }
}

export const PolicyRegistry =
  new PolicyRegistryManager();
