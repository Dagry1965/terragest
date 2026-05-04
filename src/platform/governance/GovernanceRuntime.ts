// src/platform/governance/GovernanceRuntime.ts

import {
  GovernanceContext
}
from "@/platform/governance/GovernanceContext";

import { FeatureFlags }
from "@/platform/governance/features/FeatureFlags";

import { DomainPermissions }
from "@/platform/governance/permissions/DomainPermissions";

import { RuntimePoliciesEngine }
from "@/platform/governance/policies/engine/RuntimePoliciesEngine";

export class GovernanceRuntime {

  static validate(
    context: GovernanceContext
  ) {

    const enabled =
      FeatureFlags.isEnabled(
        context.domain
      );

    if (!enabled) {

      throw new Error(
        `Feature disabled: ${context.domain}`
      );
    }

    const allowed =
      DomainPermissions
        .canExecute(
          context
        );

    if (!allowed) {

      throw new Error(
        `Permission denied: ${context.domain}`
      );
    }

    RuntimePoliciesEngine.validate(
      context
    );

    console.log(
      "[GOVERNANCE OK]",
      context.domain,
      context.action
    );
  }
}
