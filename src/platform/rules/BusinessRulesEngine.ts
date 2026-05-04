// src/platform/rules/BusinessRulesEngine.ts

import { DomainEvents }
from "@/platform/events/DomainEvents";

export interface BusinessRule {

  name: string;

  event: string;

  execute(payload?: unknown): void;
}

class BusinessRulesEngineManager {

  private rules: BusinessRule[] = [];

  register(rule: BusinessRule) {

    console.log(
      `[RULE REGISTERED]
       ${rule.name}`
    );

    this.rules.push(rule);

    DomainEvents.subscribe(
      rule.event,
      rule.execute
    );
  }

  getRules() {

    return this.rules;
  }
}

export const BusinessRulesEngine =
  new BusinessRulesEngineManager();