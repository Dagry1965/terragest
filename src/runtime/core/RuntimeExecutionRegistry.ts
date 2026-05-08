export interface RuntimeExecution {

  executionId: string;

  moduleId: string;

  workflow: string;

  status:
    | "pending"
    | "running"
    | "completed"
    | "failed";

  startedAt: string;

  finishedAt?: string;
}

export class RuntimeExecutionRegistry {

  private executions:
    RuntimeExecution[] = [];

  startExecution(
    execution: RuntimeExecution
  ) {

    this.executions.push(
      execution
    );
  }

  getExecutions() {

    return this.executions;
  }

  getModuleExecutions(
    moduleId: string
  ) {

    return this.executions.filter(
      execution =>
        execution.moduleId === moduleId
    );
  }

  getFailedExecutions() {

    return this.executions.filter(
      execution =>
        execution.status === "failed"
    );
  }
}

export const runtimeExecutionRegistry =
  new RuntimeExecutionRegistry();