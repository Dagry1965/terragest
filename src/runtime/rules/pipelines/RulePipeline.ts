import { ContextResolver }
from "../context/ContextResolver";

import { DecisionEngine }
from "../decisions/DecisionEngine";

export class RulePipeline {

  private resolver =
    new ContextResolver();

  private decisionEngine =
    new DecisionEngine();

  execute(
    payload?: unknown
  ) {

    const context =
      this.resolver.resolve(
        payload
      );

    return this.decisionEngine
      .decide(context);
  }
}
