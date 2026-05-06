import {
  ConditionEvaluator
}
from "../evaluators/ConditionEvaluator";

import type {
  Rule,
  RuleContext,
}
from "../types/Rule";

export class
RuleExecutor {

  private evaluator =
    new ConditionEvaluator();

  async execute(

    rules: Rule[],

    context: RuleContext
  ) {

    for (const rule of rules) {

      const matches =
        await this.evaluator.evaluate(

          rule.condition,

          context
        );

      if (!matches) {
        continue;
      }

      console.log(
        `[Rule Triggered] ${rule.name}`
      );

      await rule.action(
        context
      );
    }
  }
}