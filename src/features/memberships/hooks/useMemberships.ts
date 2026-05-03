"use client";

import { useCollection }
from "@/hooks/useCollection";

import { Membership }
from "@/features/memberships/types/Membership";

export function useMemberships() {

  return useCollection<Membership>(
    "memberships"
  );
}