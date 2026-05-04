// src/platform/governance/policies/types/RuntimePolicy.ts

import {
  GovernanceContext
}
from "@/platform/governance/GovernanceContext";

export interface RuntimePolicy {

  name: string;

  priority?: number;

  execute(
    context: GovernanceContext
  ): boolean;
}
