import { BaseRepository }
from "@/lib/firestore/BaseRepository";

import { Invitation }
from "@/features/invitations/types/Invitation";

class InvitationsRepositoryClass
extends BaseRepository<Invitation> {

  constructor() {

    super("invitations");
  }
}

export const InvitationsRepository =
  new InvitationsRepositoryClass();