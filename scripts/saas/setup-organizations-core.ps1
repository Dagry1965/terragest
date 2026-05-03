$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " ORGANIZATIONS CORE SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\features\organizations\types",
  "$ProjectRoot\src\features\organizations\repositories",
  "$ProjectRoot\src\features\organizations\services",
  "$ProjectRoot\src\features\organizations\hooks"
)

foreach ($dir in $dirs) {

  if (!(Test-Path $dir)) {

    New-Item `
      -ItemType Directory `
      -Path $dir `
      -Force | Out-Null

    Write-Host "Created: $dir"
  }
}

# -------------------------------------------------
# ORGANIZATION TYPE
# -------------------------------------------------

$organizationType = @'
import {
  BaseAuditEntity,
}
from "@/types/BaseEntity";

export type OrganizationPlan =
  | "free"
  | "pro"
  | "enterprise";

export type Organization =
BaseAuditEntity & {

  name: string;

  ownerId: string;

  tenantId: string;

  plan: OrganizationPlan;

  active: boolean;
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\organizations\types\Organization.ts",
  $organizationType
)

Write-Host "Created: Organization.ts"

# -------------------------------------------------
# ORGANIZATION REPOSITORY
# -------------------------------------------------

$repository = @'
import { BaseRepository }
from "@/lib/firestore/BaseRepository";

import { Organization }
from "@/features/organizations/types/Organization";

class OrganizationsRepositoryClass
extends BaseRepository<Organization> {

  constructor() {

    super("organizations");
  }
}

export const OrganizationsRepository =
  new OrganizationsRepositoryClass();
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\organizations\repositories\OrganizationsRepository.ts",
  $repository
)

Write-Host "Created: OrganizationsRepository.ts"

# -------------------------------------------------
# ORGANIZATION SERVICE
# -------------------------------------------------

$service = @'
import { Organization }
from "@/features/organizations/types/Organization";

import { OrganizationsRepository }
from "@/features/organizations/repositories/OrganizationsRepository";

export const OrganizationService = {

  async create(
    organization: Organization
  ) {

    if (!organization.name) {

      throw new Error(
        "Nom organisation obligatoire"
      );
    }

    return await
      OrganizationsRepository.create(
        organization
      );
  },

  async getAll() {

    return await
      OrganizationsRepository.getAll();
  },
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\organizations\services\OrganizationService.ts",
  $service
)

Write-Host "Created: OrganizationService.ts"

# -------------------------------------------------
# USE ORGANIZATIONS
# -------------------------------------------------

$hook = @'
"use client";

import { useCollection }
from "@/hooks/useCollection";

import { Organization }
from "@/features/organizations/types/Organization";

export function useOrganizations() {

  return useCollection<Organization>(
    "organizations"
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\organizations\hooks\useOrganizations.ts",
  $hook
)

Write-Host "Created: useOrganizations.ts"

Write-Host ""
Write-Host "======================================="
Write-Host " ORGANIZATIONS CORE COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. git commit"
Write-Host "3. firebase deploy"
Write-Host ""