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