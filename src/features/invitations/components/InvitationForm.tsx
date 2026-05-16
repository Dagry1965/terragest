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