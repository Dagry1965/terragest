import { BaseRepository }
from "@/lib/firestore/BaseRepository";

import { Subscription }
from "@/features/billing/types/Subscription";

class BillingRepositoryClass
extends BaseRepository<Subscription> {

  constructor() {

    super("subscriptions");
  }
}

export const BillingRepository =
  new BillingRepositoryClass();