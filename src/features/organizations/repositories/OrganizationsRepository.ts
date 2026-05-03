import { BaseRepository }
from "@/lib/firestore/BaseRepository";

import { Organization }
from "@/features/organizations/types/Organization";

class OrganizationsRepositoryClass
extends BaseRepository<Organization> {

  constructor() {

    super("organizations");
  }
}

export const OrganizationsRepository =
  new OrganizationsRepositoryClass();