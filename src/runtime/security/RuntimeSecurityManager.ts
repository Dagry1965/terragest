import {
  PolicyEngine
}
from "@/platform/policies/engine/PolicyEngine";

import {
  MaintenancePolicy
}
from "@/platform/policies/rules/MaintenancePolicy";

import {
  FeatureGuard
}
from "@/platform/security/guards/FeatureGuard";

import type {
  ERPUserRole
}
from "@/platform/security/roles/RoleDefinition";

import {
  FeatureRegistry
}
from "@/platform/registry/FeatureRegistry";

export class
RuntimeSecurityManager {

  private policies =
    new PolicyEngine();

  private guard =
    new FeatureGuard();

  constructor() {

    this.policies.register(
      MaintenancePolicy
    );
  }

  async authorize(
    role: ERPUserRole,
    featureName: string,
    action: string,
    payload?: unknown
  ) {

    const feature =
      FeatureRegistry.findByName(
        featureName
      );

    if (!feature) {

      console.log(
        "[SECURITY] Feature not found"
      );

      return false;
    }

    const allowedByRole =
      this.guard.canAccess(
        role,
        feature
      );

    if (!allowedByRole) {

      console.log(
        "[SECURITY] Permission denied"
      );

      return false;
    }

    const allowedByPolicies =
      await this.policies.evaluate({

        module:
          featureName,

        action,

        role,

        payload,
      });

    if (!allowedByPolicies) {

      console.log(
        "[SECURITY] Policy denied"
      );

      return false;
    }

    return true;
  }
}