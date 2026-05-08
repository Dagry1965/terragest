import {
  WorkflowRepository
}
from "../persistence/workflows/WorkflowRepository";

export class
PersistentWorkflowExecutor {

  private repository =
    new WorkflowRepository();

  async execute(
    workflow: string,
    payload?: unknown
  ) {

    await this.repository.save({
      workflow,
      payload,
    });

    console.log(
      "[PersistentWorkflow]",
      workflow
    );
  }
}
