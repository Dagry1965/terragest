import type {
  WorkflowExecution
}
from "@/runtime/workflows/types/WorkflowExecution";

class WorkflowExecutionStore {

  private executions:
    WorkflowExecution[] = [];

  private listeners =
    new Set<
      () => void
    >();

  push(
    execution:
      WorkflowExecution
  ) {

    this.executions.unshift(
      execution
    );

    this.emit();
  }

  replaceAll(
    executions:
      WorkflowExecution[]
  ) {

    this.executions =
      executions;

    this.emit();
  }

  getAll() {

    return this.executions;
  }

  subscribe(
    listener:
      () => void
  ) {

    this.listeners.add(
      listener
    );

    return () => {

      this.listeners.delete(
        listener
      );
    };
  }

  private emit() {

    for (const listener of this.listeners) {
      listener();
    }
  }
}

export const
workflowExecutionStore =
  new WorkflowExecutionStore();