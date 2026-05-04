// src/platform/rules/core/RuleExecutionContext.ts

export interface RuleExecutionContext {

  domain: string;

  entity?: string;

  action: string;

  pipeline?: string;

  user?: string;

  tenant?: string;

  payload?: unknown;

  previousState?: unknown;

  metadata?: Record<
    string,
    unknown
  >;
}