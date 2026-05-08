export type AutomationRuntimeTriggerType =
  | "threshold"
  | "workflow_blocked"
  | "maintenance_overdue"
  | "manual"
  | "event";

export type AutomationRuntimeJobStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "dead_letter";

export interface AutomationRuntimeTrigger {
  type: AutomationRuntimeTriggerType;
  field?: string;
  operator?: "<" | ">" | "=" | "!=";
  value?: unknown;
}

export interface AutomationRuntimeAction {
  type:
    | "notify"
    | "workflow"
    | "audit"
    | "task"
    | "alert";

  label: string;
  payload?: Record<string, unknown>;
}

export interface AutomationRuntimeRule {
  key: string;
  moduleKey: string;
  label: string;
  description?: string;
  trigger: AutomationRuntimeTrigger;
  actions: AutomationRuntimeAction[];
  enabled: boolean;
}

export interface AutomationRuntimeJob {
  id: string;
  ruleKey: string;
  moduleKey: string;
  status: AutomationRuntimeJobStatus;
  attempts: number;
  maxAttempts: number;
  createdAt: string;
  updatedAt: string;
  error?: string;
  actions: AutomationRuntimeAction[];
}