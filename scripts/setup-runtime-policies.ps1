# =========================================================
# TERRAGEST - RUNTIME POLICIES ENGINE
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " RUNTIME POLICIES ENGINE"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\platform\governance\policies\engine",

  ".\src\platform\governance\policies\registry",

  ".\src\platform\governance\policies\types"
)

foreach ($directory in $directories) {

  if (!(Test-Path $directory)) {

    New-Item `
      -ItemType Directory `
      -Path $directory `
      | Out-Null

    Write-Host "[CREATED] $directory"

  } else {

    Write-Host "[EXISTS]  $directory"
  }
}

# =========================================================
# POLICY TYPE
# =========================================================

$policyType = @'
// src/platform/governance/policies/types/RuntimePolicy.ts

import {
  GovernanceContext
}
from "@/platform/governance/GovernanceContext";

export interface RuntimePolicy {

  name: string;

  priority?: number;

  execute(
    context: GovernanceContext
  ): boolean;
}
'@

Set-Content `
  ".\src\platform\governance\policies\types\RuntimePolicy.ts" `
  $policyType

Write-Host ""
Write-Host "[CREATED] RuntimePolicy.ts"

# =========================================================
# POLICY REGISTRY
# =========================================================

$policyRegistry = @'
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
'@

Set-Content `
  ".\src\platform\governance\policies\registry\PolicyRegistry.ts" `
  $policyRegistry

Write-Host "[CREATED] PolicyRegistry.ts"

# =========================================================
# POLICY ENGINE
# =========================================================

$policyEngine = @'
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
'@

Set-Content `
  ".\src\platform\governance\policies\engine\RuntimePoliciesEngine.ts" `
  $policyEngine

Write-Host "[CREATED] RuntimePoliciesEngine.ts"

# =========================================================
# DEFAULT POLICY
# =========================================================

$defaultPolicy = @'
// src/platform/governance/policies/DefaultRuntimePolicy.ts

import {
  RuntimePolicy
}
from "@/platform/governance/policies/types/RuntimePolicy";

export const DefaultRuntimePolicy:
  RuntimePolicy = {

  name:
    "default-runtime-policy",

  priority:
    1,

  execute(
    context
  ) {

    console.log(
      "[POLICY]",
      context.domain
    );

    return true;
  }
};
'@

Set-Content `
  ".\src\platform\governance\policies\DefaultRuntimePolicy.ts" `
  $defaultPolicy

Write-Host "[CREATED] DefaultRuntimePolicy.ts"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " POLICIES ENGINE READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-runtime-policies.ps1"
Write-Host "pnpm build"
Write-Host ""