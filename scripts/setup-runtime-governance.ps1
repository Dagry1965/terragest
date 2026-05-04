# =========================================================
# TERRAGEST - RUNTIME GOVERNANCE
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " RUNTIME GOVERNANCE SETUP"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\platform\governance",

  ".\src\platform\governance\policies",

  ".\src\platform\governance\permissions",

  ".\src\platform\governance\tenants",

  ".\src\platform\governance\features"
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
# GOVERNANCE CONTEXT
# =========================================================

$governanceContext = @'
// src/platform/governance/GovernanceContext.ts

export interface GovernanceContext {

  tenant?: string;

  user?: string;

  domain: string;

  action: string;
}
'@

Set-Content `
  ".\src\platform\governance\GovernanceContext.ts" `
  $governanceContext

Write-Host ""
Write-Host "[CREATED] GovernanceContext.ts"

# =========================================================
# FEATURE FLAGS
# =========================================================

$featureFlags = @'
// src/platform/governance/features/FeatureFlags.ts

class FeatureFlagsManager {

  private flags:
    Record<string, boolean>
    = {};

  enable(
    feature: string
  ) {

    this.flags[
      feature
    ] = true;
  }

  disable(
    feature: string
  ) {

    this.flags[
      feature
    ] = false;
  }

  isEnabled(
    feature: string
  ) {

    return (
      this.flags[
        feature
      ] ?? false
    );
  }
}

export const FeatureFlags =
  new FeatureFlagsManager();
'@

Set-Content `
  ".\src\platform\governance\features\FeatureFlags.ts" `
  $featureFlags

Write-Host "[CREATED] FeatureFlags.ts"

# =========================================================
# TENANT REGISTRY
# =========================================================

$tenantRegistry = @'
// src/platform/governance/tenants/TenantRegistry.ts

class TenantRegistryManager {

  private tenants:
    string[] = [];

  register(
    tenant: string
  ) {

    if (
      !this.tenants.includes(
        tenant
      )
    ) {

      this.tenants.push(
        tenant
      );
    }
  }

  exists(
    tenant: string
  ) {

    return this.tenants.includes(
      tenant
    );
  }
}

export const TenantRegistry =
  new TenantRegistryManager();
'@

Set-Content `
  ".\src\platform\governance\tenants\TenantRegistry.ts" `
  $tenantRegistry

Write-Host "[CREATED] TenantRegistry.ts"

# =========================================================
# DOMAIN PERMISSIONS
# =========================================================

$domainPermissions = @'
// src/platform/governance/permissions/DomainPermissions.ts

import {
  GovernanceContext
}
from "@/platform/governance/GovernanceContext";

class DomainPermissionsManager {

  canExecute(
    context: GovernanceContext
  ) {

    console.log(
      "[PERMISSION CHECK]",
      context.domain,
      context.action
    );

    return true;
  }
}

export const DomainPermissions =
  new DomainPermissionsManager();
'@

Set-Content `
  ".\src\platform\governance\permissions\DomainPermissions.ts" `
  $domainPermissions

Write-Host "[CREATED] DomainPermissions.ts"

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

Write-Host "[CREATED] GovernanceRuntime.ts"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " GOVERNANCE RUNTIME READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-runtime-governance.ps1"
Write-Host "pnpm build"
Write-Host ""