// src/platform/rules/types/BusinessRule.ts

import {
  RuleExecutionContext
}
from "@/platform/rules/core/RuleExecutionContext";

export interface BusinessRule {

  name: string;

  domain: string;

  action: string;

  priority?: number;

  execute(
    context: RuleExecutionContext
  ): Promise<void> | void;
}