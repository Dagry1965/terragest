// src/platform/governance/GovernanceContext.ts

export interface GovernanceContext {

  tenant?: string;

  user?: string;

  domain: string;

  action: string;
}
