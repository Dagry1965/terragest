$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " INVITATIONS CORE SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\features\invitations\types",
  "$ProjectRoot\src\features\invitations\repositories",
  "$ProjectRoot\src\features\invitations\services",
  "$ProjectRoot\src\features\invitations\hooks",
  "$ProjectRoot\src\features\invitations\components"
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
# INVITATION TYPE
# -------------------------------------------------

$invitationType = @'
import {
  BaseAuditEntity,
}
from "@/types/BaseEntity";

import { UserRole }
from "@/features/auth/types/UserRole";

export type InvitationStatus =
  | "pending"
  | "accepted"
  | "revoked"
  | "expired";

export type Invitation =
BaseAuditEntity & {

  email: string;

  organizationId: string;

  tenantId: string;

  role: UserRole;

  token: string;

  status: InvitationStatus;

  expiresAt: string;
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\invitations\types\Invitation.ts",
  $invitationType
)

Write-Host "Created: Invitation.ts"

# -------------------------------------------------
# INVITATIONS REPOSITORY
# -------------------------------------------------

$repository = @'
import { BaseRepository }
from "@/lib/firestore/BaseRepository";

import { Invitation }
from "@/features/invitations/types/Invitation";

class InvitationsRepositoryClass
extends BaseRepository<Invitation> {

  constructor() {

    super("invitations");
  }
}

export const InvitationsRepository =
  new InvitationsRepositoryClass();
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\invitations\repositories\InvitationsRepository.ts",
  $repository
)

Write-Host "Created: InvitationsRepository.ts"

# -------------------------------------------------
# INVITATION SERVICE
# -------------------------------------------------

$service = @'
import { Invitation }
from "@/features/invitations/types/Invitation";

import { InvitationsRepository }
from "@/features/invitations/repositories/InvitationsRepository";

export const InvitationService = {

  async create(
    invitation: Invitation
  ) {

    if (!invitation.email) {

      throw new Error(
        "Email obligatoire"
      );
    }

    return await
      InvitationsRepository.create(
        invitation
      );
  },

  async revoke(
    id: string
  ) {

    return await
      InvitationsRepository.update(
        id,
        {
          status: "revoked",
        }
      );
  },

  async getAll() {

    return await
      InvitationsRepository.getAll();
  },
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\invitations\services\InvitationService.ts",
  $service
)

Write-Host "Created: InvitationService.ts"

# -------------------------------------------------
# USE INVITATIONS
# -------------------------------------------------

$hook = @'
"use client";

import { useCollection }
from "@/hooks/useCollection";

import { Invitation }
from "@/features/invitations/types/Invitation";

export function useInvitations() {

  return useCollection<Invitation>(
    "invitations"
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\invitations\hooks\useInvitations.ts",
  $hook
)

Write-Host "Created: useInvitations.ts"

# -------------------------------------------------
# INVITATION FORM
# -------------------------------------------------

$form = @'
"use client";

import {
  useState,
} from "react";

import { InvitationService }
from "@/features/invitations/services/InvitationService";

export const InvitationForm =
() => {

  const [email, setEmail] =
    useState("");

  const [role, setRole] =
    useState("viewer");

  async function handleSubmit(
    e: any
  ) {

    e.preventDefault();

    await InvitationService.create({
      email,
      role: role as any,
      organizationId: "org-demo",
      tenantId: "tenant-demo",
      token:
        crypto.randomUUID(),
      status: "pending",
      expiresAt:
        new Date(
          Date.now() +
          7 * 24 * 60 * 60 * 1000
        ).toISOString(),
    } as any);

    setEmail("");

    alert(
      "Invitation envoyée"
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white
        border
        rounded-2xl
        p-6
        space-y-4
      "
    >
      <h2
        className="
          text-xl
          font-semibold
        "
      >
        Inviter un membre
      </h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
        className="
          w-full
          border
          rounded-xl
          px-4
          py-3
        "
      />

      <select
        value={role}
        onChange={(e) =>
          setRole(
            e.target.value
          )
        }
        className="
          w-full
          border
          rounded-xl
          px-4
          py-3
        "
      >
        <option value="viewer">
          Lecture
        </option>

        <option value="agent">
          Agent
        </option>

        <option value="manager">
          Manager
        </option>

        <option value="admin">
          Admin
        </option>
      </select>

      <button
        type="submit"
        className="
          bg-black
          text-white
          px-4
          py-3
          rounded-xl
        "
      >
        Envoyer invitation
      </button>
    </form>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\invitations\components\InvitationForm.tsx",
  $form
)

Write-Host "Created: InvitationForm.tsx"

Write-Host ""
Write-Host "======================================="
Write-Host " INVITATIONS CORE COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. git commit"
Write-Host "3. firebase deploy"
Write-Host ""