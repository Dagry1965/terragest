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