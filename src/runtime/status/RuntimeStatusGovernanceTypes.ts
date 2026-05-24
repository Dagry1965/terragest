export type RuntimeStatusVisibility =
  | "visible"
  | "technical"
  | "hidden";

export type RuntimeStatusEditMode =
  | "manual"
  | "readonly"
  | "action_only";

export interface RuntimeStatusDefinition {
  key: string;
  label: string;
  description?: string;
  visibility: RuntimeStatusVisibility;
  tone?: "default" | "success" | "warning" | "danger" | "info";
}

export interface RuntimeStatusActionDefinition {
  key: string;
  label: string;
  from: string[];
  to?: string;
  description?: string;
  requiresConfirmation?: boolean;
  recommended?: boolean;
}

export interface RuntimeStatusGuidanceDefinition {
  status: string;
  title: string;
  message: string;
  tone?: "default" | "success" | "warning" | "danger" | "info";
}

export interface RuntimeStatusGovernancePolicy {
  moduleKey: string;
  statusField?: string;
  editMode: RuntimeStatusEditMode;
  statuses: RuntimeStatusDefinition[];
  actions?: RuntimeStatusActionDefinition[];
  guidance?: RuntimeStatusGuidanceDefinition[];
  technicalFields?: string[];
}

export interface RuntimeStatusGovernanceContext {
  moduleKey: string;
  record?: Record<string, unknown> | null;
}

export interface RuntimeStatusGovernanceResult {
  moduleKey: string;
  statusField: string;
  editMode: RuntimeStatusEditMode;
  visibleStatuses: RuntimeStatusDefinition[];
  technicalStatuses: RuntimeStatusDefinition[];
  hiddenStatuses: RuntimeStatusDefinition[];
  actions: RuntimeStatusActionDefinition[];
  guidance: RuntimeStatusGuidanceDefinition[];
  technicalFields: string[];
}
