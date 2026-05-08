export type ERPWorkflowState =
  | "draft"
  | "pending"
  | "running"
  | "waiting_approval"
  | "completed"
  | "failed"
  | "cancelled"
  | "compensating"
  | "compensated";

export type ERPWorkflowStepType =
  | "task"
  | "approval"
  | "automation"
  | "event"
  | "notification"
  | "compensation";

export type ERPWorkflowStep = {
  key: string;
  label: string;
  type: ERPWorkflowStepType;
  next?: string;
  onFailure?: string;
};

export type ERPWorkflowDefinition = {
  key: string;
  module: string;
  label: string;
  description?: string;
  initialState: ERPWorkflowState;
  steps: ERPWorkflowStep[];
};

export type ERPWorkflowExecution = {
  id: string;
  workflowKey: string;
  module: string;
  state: ERPWorkflowState;
  currentStep?: string;
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
  metadata?: Record<string, unknown>;
};