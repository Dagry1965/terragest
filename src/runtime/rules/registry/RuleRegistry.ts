import type { BusinessRule }
from "../BusinessRule";

export class RuleRegistry {

  private rules:
    BusinessRule[] = [];

  register(
    rule: BusinessRule
  ) {

    this.rules.push(rule);
  }

  getAll() {

    return this.rules;
  }
}
