import type { BusinessRule }
from "../BusinessRule";

import { RuleEvaluator }
from "../evaluators/RuleEvaluator";

export class PolicyEngine {

  private evaluator =
    new RuleEvaluator();

  execute(
    rules: BusinessRule[],
    context?: unknown
  ) {

    return rules.filter(rule =>
      this.evaluator.evaluate(
        rule,
        context
      )
    );
  }
}
