export type WorkflowExecutionStatus =
  | "PENDING"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "COMPENSATED";

export type WorkflowExecution = {
  workflowId: string;

  status:
    WorkflowExecutionStatus;

  startedAt: number;

  finishedAt?: number;

  currentStep?: string;

  error?: string;
};