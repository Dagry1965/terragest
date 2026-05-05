import type { BusinessRule }
from "../BusinessRule";

export class RuleEvaluator {

  evaluate(
    rule: BusinessRule,
    context?: unknown
  ): boolean {

    console.log(
      "[RuleEvaluator]",
      rule.name,
      context
    );

    return true;
  }
}
