import { BaseRepository }
from "@/lib/firestore/BaseRepository";

import { Membership }
from "@/features/memberships/types/Membership";

class MembershipsRepositoryClass
extends BaseRepository<Membership> {

  constructor() {

    super("memberships");
  }
}

export const MembershipsRepository =
  new MembershipsRepositoryClass();