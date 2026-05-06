import type {
  RuleCondition,
  RuleContext,
}
from "../types/Rule";

export class
ConditionEvaluator {

  async evaluate(

    condition:
      RuleCondition,

    context:
      RuleContext
  ) {

    return await condition(
      context
    );
  }
}