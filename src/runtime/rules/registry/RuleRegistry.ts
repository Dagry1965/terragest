import type {
  Rule
}
from "../types/Rule";

export class RuleRegistry {

  private rules:
    Rule[] = [];

  register(
    rule: Rule
  ) {

    this.rules.push(
      rule
    );
  }

  getAll() {

    return this.rules;
  }

  getByModule(
    module: string
  ) {

    return this.rules.filter(
      rule =>
        rule.id.startsWith(
          module.toUpperCase()
        )
    );
  }
}