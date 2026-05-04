// src/platform/governance/policies/engine/RuntimePoliciesEngine.ts

import {
  GovernanceContext
}
from "@/platform/governance/GovernanceContext";

import { PolicyRegistry }
from "@/platform/governance/policies/registry/PolicyRegistry";

export class RuntimePoliciesEngine {

  static validate(
    context: GovernanceContext
  ) {

    const policies =
      PolicyRegistry
        .getPolicies();

    for (const policy of policies) {

      const allowed =
        policy.execute(
          context
        );

      if (!allowed) {

        throw new Error(
          `Policy denied: ${policy.name}`
        );
      }
    }

    console.log(
      "[POLICIES OK]",
      context.domain,
      context.action
    );
  }
}
