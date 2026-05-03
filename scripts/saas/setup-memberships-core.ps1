$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " MEMBERSHIPS CORE SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\features\memberships\types",
  "$ProjectRoot\src\features\memberships\repositories",
  "$ProjectRoot\src\features\memberships\services",
  "$ProjectRoot\src\features\memberships\hooks"
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
# MEMBERSHIP TYPE
# -------------------------------------------------

$membershipType = @'
import {
  BaseAuditEntity,
}
from "@/types/BaseEntity";

import { UserRole }
from "@/features/auth/types/UserRole";

export type Membership =
BaseAuditEntity & {

  userId: string;

  organizationId: string;

  tenantId: string;

  role: UserRole;

  active: boolean;
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\memberships\types\Membership.ts",
  $membershipType
)

Write-Host "Created: Membership.ts"

# -------------------------------------------------
# MEMBERSHIPS REPOSITORY
# -------------------------------------------------

$repository = @'
import { BaseRepository }
from "@/lib/firestore/BaseRepository";

import { Membership }
from "@/features/memberships/types/Membership";

class MembershipsRepositoryClass
extends BaseRepository<Membership> {

  constructor() {

    super("memberships");
  }
}

export const MembershipsRepository =
  new MembershipsRepositoryClass();
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\memberships\repositories\MembershipsRepository.ts",
  $repository
)

Write-Host "Created: MembershipsRepository.ts"

# -------------------------------------------------
# MEMBERSHIP SERVICE
# -------------------------------------------------

$service = @'
import { Membership }
from "@/features/memberships/types/Membership";

import { MembershipsRepository }
from "@/features/memberships/repositories/MembershipsRepository";

export const MembershipService = {

  async create(
    membership: Membership
  ) {

    if (!membership.userId) {

      throw new Error(
        "Utilisateur obligatoire"
      );
    }

    if (!membership.organizationId) {

      throw new Error(
        "Organisation obligatoire"
      );
    }

    return await
      MembershipsRepository.create(
        membership
      );
  },

  async getAll() {

    return await
      MembershipsRepository.getAll();
  },
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\memberships\services\MembershipService.ts",
  $service
)

Write-Host "Created: MembershipService.ts"

# -------------------------------------------------
# USE MEMBERSHIPS
# -------------------------------------------------

$hook = @'
"use client";

import { useCollection }
from "@/hooks/useCollection";

import { Membership }
from "@/features/memberships/types/Membership";

export function useMemberships() {

  return useCollection<Membership>(
    "memberships"
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\memberships\hooks\useMemberships.ts",
  $hook
)

Write-Host "Created: useMemberships.ts"

Write-Host ""
Write-Host "======================================="
Write-Host " MEMBERSHIPS CORE COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. git commit"
Write-Host "3. firebase deploy"
Write-Host ""