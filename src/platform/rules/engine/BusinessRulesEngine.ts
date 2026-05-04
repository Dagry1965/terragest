// src/platform/rules/engine/BusinessRulesEngine.ts

import {
  RuleExecutionContext
}
from "@/platform/rules/core/RuleExecutionContext";

import { RuleRegistry }
from "@/platform/rules/registry/RuleRegistry";

export class BusinessRulesEngine {

  static async execute(

    context: RuleExecutionContext
  ) {

    const rules =
      RuleRegistry.getRules(

        context.domain,

        context.action
      );

    console.log(
      "[RULE ENGINE]",
      context.domain,
      context.action,
      rules.length
    );

    for (const rule of rules) {

      await rule.execute(
        context
      );
    }
  }
}