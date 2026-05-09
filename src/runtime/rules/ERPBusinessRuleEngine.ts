export interface ERPBusinessRule {

  id: string;

  module: string;

  description: string;

  validate: (
    data: Record<string, unknown>
  ) => boolean;
}

export class ERPBusinessRuleEngine {

  private rules:
    ERPBusinessRule[] = [];

  registerRule(
    rule: ERPBusinessRule
  ) {

    this.rules.push(rule);
  }

  getRules(
    module: string
  ) {

    return this.rules.filter(
      rule =>
        rule.module === module
    );
  }

  validate(
    module: string,
    data: Record<string, unknown>
  ) {

    return this.getRules(
      module
    ).every(
      rule =>
        rule.validate(data)
    );
  }
}

export const erpBusinessRuleEngine =
  new ERPBusinessRuleEngine();