import type {
  WorkflowDefinition
}
from "../types/WorkflowDefinition";

export class
SagaCoordinator {

  async compensate(
    workflow:
      WorkflowDefinition,

    payload?: unknown
  ) {

    const reversedSteps =
      [
        ...workflow.steps
      ].reverse();

    for (const step of reversedSteps) {

      if (
        step.compensate
      ) {

        await step.compensate(
          payload
        );
      }
    }
  }
}