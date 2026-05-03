import { Organization }
from "@/features/organizations/types/Organization";

import { OrganizationsRepository }
from "@/features/organizations/repositories/OrganizationsRepository";

export const OrganizationService = {

  async create(
    organization: Organization
  ) {

    if (!organization.name) {

      throw new Error(
        "Nom organisation obligatoire"
      );
    }

    return await
      OrganizationsRepository.create(
        organization
      );
  },

  async getAll() {

    return await
      OrganizationsRepository.getAll();
  },
};