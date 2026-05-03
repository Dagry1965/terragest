"use client";

import { useCollection }
from "@/hooks/useCollection";

import { Organization }
from "@/features/organizations/types/Organization";

export function useOrganizations() {

  return useCollection<Organization>(
    "organizations"
  );
}