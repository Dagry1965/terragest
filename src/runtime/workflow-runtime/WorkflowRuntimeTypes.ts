export type WorkflowRuntimeStatus =
  | "draft"
  | "active"
  | "waiting"
  | "completed"
  | "cancelled"
  | "error";

export interface WorkflowRuntimeStep {
  key: string;
  label: string;
  description?: string;
  status?: WorkflowRuntimeStatus;
}

export interface WorkflowRuntimeTransition {
  from: string;
  to: string;
  label: string;
  requiresValidation?: boolean;
}

export interface WorkflowRuntimeDefinition {
  key: string;
  moduleKey: string;
  label: string;
  initialStep: string;
  steps: WorkflowRuntimeStep[];
  transitions: WorkflowRuntimeTransition[];
}

export interface WorkflowRuntimeInstance {
  id: string;
  moduleKey: string;
  workflowKey: string;
  recordId: string;
  currentStep: string;
  status: WorkflowRuntimeStatus;
  history: WorkflowRuntimeHistoryEntry[];
}

export interface WorkflowRuntimeHistoryEntry {
  id: string;
  from?: string;
  to: string;
  label: string;
  date: string;
}