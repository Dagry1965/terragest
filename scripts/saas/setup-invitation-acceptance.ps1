$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " INVITATION ACCEPTANCE SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\app\invitations\accept\[token]"
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
# INVITATION SERVICE UPDATE
# -------------------------------------------------

$service = @'
import { Invitation }
from "@/features/invitations/types/Invitation";

import { InvitationsRepository }
from "@/features/invitations/repositories/InvitationsRepository";

import { MembershipsRepository }
from "@/features/memberships/repositories/MembershipsRepository";

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

  async accept(
    token: string,
    userId: string
  ) {

    const invitations =
      await InvitationsRepository.getAll();

    const invitation =
      invitations.find(
        (item: any) =>
          item.token === token
      );

    if (!invitation) {

      throw new Error(
        "Invitation introuvable"
      );
    }

    if (
      invitation.status !==
      "pending"
    ) {

      throw new Error(
        "Invitation invalide"
      );
    }

    if (
      new Date(
        invitation.expiresAt
      ) < new Date()
    ) {

      throw new Error(
        "Invitation expirée"
      );
    }

    await MembershipsRepository.create({
      userId,
      organizationId:
        invitation.organizationId,
      tenantId:
        invitation.tenantId,
      role:
        invitation.role,
      active: true,
    } as any);

    await InvitationsRepository.update(
      invitation.id,
      {
        status: "accepted",
      }
    );

    return invitation;
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

Write-Host "Updated: InvitationService.ts"

# -------------------------------------------------
# ACCEPT PAGE
# -------------------------------------------------

$page = @'
"use client";

import {
  useState,
} from "react";

import { InvitationService }
from "@/features/invitations/services/InvitationService";

type Props = {

  params: Promise<{
    token: string;
  }>;
};

export default async function
AcceptInvitationPage({
  params,
}: Props) {

  const { token } =
    await params;

  return (
    <AcceptInvitationClient
      token={token}
    />
  );
}

function AcceptInvitationClient({
  token,
}: {
  token: string;
}) {

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    success,
    setSuccess,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  async function handleAccept() {

    try {

      setLoading(true);

      await InvitationService.accept(
        token,
        "demo-user"
      );

      setSuccess(true);

    } catch (e: any) {

      setError(
        e.message
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-50
        p-6
      "
    >
      <div
        className="
          bg-white
          rounded-2xl
          border
          p-8
          w-full
          max-w-md
          space-y-6
        "
      >
        <div>

          <h1
            className="
              text-2xl
              font-bold
            "
          >
            Invitation
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Rejoindre organisation
          </p>
        </div>

        {success ? (

          <div
            className="
              bg-green-50
              border
              border-green-200
              rounded-xl
              p-4
            "
          >
            Invitation acceptée
          </div>

        ) : (

          <>
            {error && (

              <div
                className="
                  bg-red-50
                  border
                  border-red-200
                  rounded-xl
                  p-4
                  text-red-700
                "
              >
                {error}
              </div>
            )}

            <button
              onClick={handleAccept}
              disabled={loading}
              className="
                w-full
                bg-black
                text-white
                rounded-xl
                py-3
              "
            >
              {
                loading
                  ? "Chargement..."
                  : "Accepter invitation"
              }
            </button>
          </>
        )}
      </div>
    </div>
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\invitations\accept\[token]\page.tsx",
  $page
)

Write-Host "Created: invitation accept page"

Write-Host ""
Write-Host "======================================="
Write-Host " INVITATION ACCEPTANCE COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. git commit"
Write-Host "3. firebase deploy"
Write-Host ""