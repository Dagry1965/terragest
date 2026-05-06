import type {
  WorkflowExecution
}
from "../types/WorkflowExecution";

export class
WorkflowStateStore {

  private executions:
    WorkflowExecution[] = [];

  add(
    execution: WorkflowExecution
  ) {

    this.executions.push(
      execution
    );
  }

  update(
    workflowId: string,
    partial: Partial<WorkflowExecution>
  ) {

    const execution =
      this.executions.find(
        item =>
          item.workflowId === workflowId
      );

    if (!execution) {
      return;
    }

    Object.assign(
      execution,
      partial
    );
  }

  getAll() {

    return this.executions;
  }
}