$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " TEAM MANAGEMENT SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\features\teams\components",
  "$ProjectRoot\src\features\teams\services"
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
# TEAM SERVICE
# -------------------------------------------------

$service = @'
import { Membership }
from "@/features/memberships/types/Membership";

import { MembershipsRepository }
from "@/features/memberships/repositories/MembershipsRepository";

export const TeamService = {

  async getMembers() {

    return await
      MembershipsRepository.getAll();
  },

  async removeMember(
    id: string
  ) {

    return await
      MembershipsRepository.delete(
        id
      );
  },

  async updateRole(
    id: string,
    role: string
  ) {

    return await
      MembershipsRepository.update(
        id,
        {
          role,
        }
      );
  },
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\teams\services\TeamService.ts",
  $service
)

Write-Host "Created: TeamService.ts"

# -------------------------------------------------
# TEAM MEMBERS TABLE
# -------------------------------------------------

$table = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import { TeamService }
from "@/features/teams/services/TeamService";

export const TeamMembersTable =
() => {

  const [members, setMembers] =
    useState<any[]>([]);

  async function loadData() {

    const data =
      await TeamService.getMembers();

    setMembers(data as any[]);
  }

  useEffect(() => {

    loadData();

  }, []);

  async function handleDelete(
    id: string
  ) {

    await TeamService.removeMember(
      id
    );

    loadData();
  }

  async function handleRoleChange(
    id: string,
    role: string
  ) {

    await TeamService.updateRole(
      id,
      role
    );

    loadData();
  }

  return (
    <div
      className="
        bg-white
        border
        rounded-2xl
        overflow-hidden
      "
    >
      <div
        className="
          p-6
          border-b
        "
      >
        <h2
          className="
            text-xl
            font-semibold
          "
        >
          Équipe
        </h2>
      </div>

      <table className="w-full">

        <thead
          className="
            bg-gray-50
          "
        >
          <tr>

            <th
              className="
                text-left
                p-4
              "
            >
              Utilisateur
            </th>

            <th
              className="
                text-left
                p-4
              "
            >
              Rôle
            </th>

            <th
              className="
                text-right
                p-4
              "
            >
              Actions
            </th>

          </tr>
        </thead>

        <tbody>

          {members.map(
            (member) => (

            <tr
              key={member.id}
              className="
                border-t
              "
            >
              <td className="p-4">
                {member.userId}
              </td>

              <td className="p-4">

                <select
                  value={member.role}
                  onChange={(e) =>
                    handleRoleChange(
                      member.id,
                      e.target.value
                    )
                  }
                  className="
                    border
                    rounded-lg
                    px-3
                    py-2
                  "
                >
                  <option value="viewer">
                    Viewer
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

              </td>

              <td
                className="
                  p-4
                  text-right
                "
              >
                <button
                  onClick={() =>
                    handleDelete(
                      member.id
                    )
                  }
                  className="
                    text-red-600
                  "
                >
                  Supprimer
                </button>
              </td>

            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\teams\components\TeamMembersTable.tsx",
  $table
)

Write-Host "Created: TeamMembersTable.tsx"

# -------------------------------------------------
# TEAM PAGE
# -------------------------------------------------

$pageDir =
"$ProjectRoot\src\app\(private)\team"

if (!(Test-Path $pageDir)) {

  New-Item `
    -ItemType Directory `
    -Path $pageDir `
    -Force | Out-Null

  Write-Host "Created: team page dir"
}

$page = @'
import { InvitationForm }
from "@/features/invitations/components/InvitationForm";

import { TeamMembersTable }
from "@/features/teams/components/TeamMembersTable";

export default function TeamPage() {

  return (
    <div
      className="
        p-6
        space-y-6
      "
    >
      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Team Management
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Gestion organisation
        </p>
      </div>

      <InvitationForm />

      <TeamMembersTable />
    </div>
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\(private)\team\page.tsx",
  $page
)

Write-Host "Created: team page"

Write-Host ""
Write-Host "======================================="
Write-Host " TEAM MANAGEMENT COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. git commit"
Write-Host "3. firebase deploy"
Write-Host ""