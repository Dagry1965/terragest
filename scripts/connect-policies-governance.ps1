# =========================================================
# TERRAGEST - CONNECT POLICIES GOVERNANCE
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " CONNECT POLICIES GOVERNANCE"
Write-Host "========================================="
Write-Host ""

# =========================================================
# GOVERNANCE RUNTIME
# =========================================================

$governanceRuntime = @'
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
'@

Set-Content `
  ".\src\platform\governance\GovernanceRuntime.ts" `
  $governanceRuntime

Write-Host ""
Write-Host "[UPDATED] GovernanceRuntime.ts"

# =========================================================
# REGISTER DEFAULT POLICY
# =========================================================

$policyBootstrap = @'
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
'@

Set-Content `
  ".\src\platform\governance\registerPolicies.ts" `
  $policyBootstrap

Write-Host "[CREATED] registerPolicies.ts"

# =========================================================
# UPDATE BOOTSTRAP ERP
# =========================================================

$bootstrapERP = @'
// src/platform/bootstrap/bootstrapERP.ts

import { loadDomains }
from "@/platform/bootstrap/loadDomains";

import { registerPolicies }
from "@/platform/governance/registerPolicies";

export async function bootstrapERP() {

  console.log(
    "[BOOTSTRAP ERP]"
  );

  registerPolicies();

  await loadDomains();

  console.log(
    "[BOOTSTRAP ERP READY]"
  );
}
'@

Set-Content `
  ".\src\platform\bootstrap\bootstrapERP.ts" `
  $bootstrapERP

Write-Host "[UPDATED] bootstrapERP.ts"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " POLICIES CONNECTED"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\connect-policies-governance.ps1"
Write-Host "pnpm build"
Write-Host ""