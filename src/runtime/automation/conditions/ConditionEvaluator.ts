export class ConditionEvaluator {

  evaluate(
    condition: string,
    payload?: unknown
  ): boolean {

    console.log(
      "[Condition]",
      condition,
      payload
    );

    return true;
  }
}
