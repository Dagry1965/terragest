import type {
  ERPWorkflowExecution,
} from "../engine/ERPWorkflowTypes";

class ERPWorkflowExecutionStoreClass {
  private executions: ERPWorkflowExecution[] = [];

  add(execution: ERPWorkflowExecution) {
    this.executions.unshift(execution);
    this.executions = this.executions.slice(0, 200);
  }

  update(
    id: string,
    patch: Partial<ERPWorkflowExecution>
  ) {
    this.executions = this.executions.map((execution) =>
      execution.id === id
        ? {
            ...execution,
            ...patch,
            updatedAt: new Date().toISOString(),
          }
        : execution
    );
  }

  all() {
    return this.executions;
  }

  byModule(module: string) {
    return this.executions.filter(
      (execution) => execution.module === module
    );
  }
}

export const ERPWorkflowExecutionStore =
  new ERPWorkflowExecutionStoreClass();