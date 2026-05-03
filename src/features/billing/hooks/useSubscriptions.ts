"use client";

import { useCollection }
from "@/hooks/useCollection";

import { Subscription }
from "@/features/billing/types/Subscription";

export function useSubscriptions() {

  return useCollection<Subscription>(
    "subscriptions"
  );
}