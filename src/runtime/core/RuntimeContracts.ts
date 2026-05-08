export type RuntimeModuleId = string;

export type RuntimeStatus =
  | "idle"
  | "active"
  | "warning"
  | "error"
  | "disabled";

export type RuntimeCapability =
  | "list"
  | "create"
  | "read"
  | "update"
  | "delete"
  | "export"
  | "import"
  | "audit"
  | "workflow"
  | "automation"
  | "supervision"
  | "realtime"
  | "permissions"
  | "states"
  | "relations"
  | "observability";

export interface RuntimeModuleContract {
  id: RuntimeModuleId;
  label: string;
  domain: string;
  version: string;
  status: RuntimeStatus;
  capabilities: RuntimeCapability[];
  events: string[];
  workflows: string[];
  permissions: string[];
  states: string[];
  relations: string[];
}
