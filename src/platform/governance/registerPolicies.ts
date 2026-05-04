// src/platform/governance/registerPolicies.ts

import { PolicyRegistry }
from "@/platform/governance/policies/registry/PolicyRegistry";

import { DefaultRuntimePolicy }
from "@/platform/governance/policies/DefaultRuntimePolicy";

export function registerPolicies() {

  PolicyRegistry.register(
    DefaultRuntimePolicy
  );

  console.log(
    "[POLICIES REGISTERED]"
  );
}
