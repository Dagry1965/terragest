// src/platform/rules/registry/RuleRegistry.ts

import {
  BusinessRule
}
from "@/platform/rules/types/BusinessRule";

class RuleRegistryManager {

  private rules:
    BusinessRule[] = [];

  register(
    rule: BusinessRule
  ) {

    console.log(
      "[RULE REGISTERED]",
      rule.name
    );

    this.rules.push(rule);

    this.rules.sort(
      (a, b) =>
        (b.priority || 0)
        - (a.priority || 0)
    );
  }

  getRules(

    domain: string,

    action: string
  ) {

    return this.rules.filter(
      rule =>

        rule.domain === domain
        &&

        rule.action === action
    );
  }

  getAllRules() {

    return this.rules;
  }
}

export const RuleRegistry =
  new RuleRegistryManager();