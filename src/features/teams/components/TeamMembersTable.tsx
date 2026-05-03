"use client";

import {
  useEffect,
  useState,
} from "react";

import { UserRole }
from "@/features/auth/types/UserRole";

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
    role: UserRole
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
              key={member.id!}
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
                      member.id!,
                      e.target.value as UserRole
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
                      member.id!
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