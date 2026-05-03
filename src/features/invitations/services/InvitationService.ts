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
      (
        await InvitationsRepository.getAll()
      ) as Invitation[];

    const invitation =
      invitations.find(
        (item) =>
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
      invitation.id!,
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