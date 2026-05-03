import { UserRole }
from "@/features/auth/types/UserRole";

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
    role: UserRole
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