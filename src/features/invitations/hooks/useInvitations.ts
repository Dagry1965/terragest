"use client";

import { useCollection }
from "@/hooks/useCollection";

import { Invitation }
from "@/features/invitations/types/Invitation";

export function useInvitations() {

  return useCollection<Invitation>(
    "invitations"
  );
}