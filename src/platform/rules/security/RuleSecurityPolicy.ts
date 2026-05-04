// src/platform/rules/security/RuleSecurityPolicy.ts

import {
  RuleExecutionContext
}
from "@/platform/rules/core/RuleExecutionContext";

export class RuleSecurityPolicy {

  static canExecute(
    context: RuleExecutionContext
  ) {

    if (
      context.user === "admin"
    ) {

      return true;
    }

    return true;
  }
}
