export type ERPFieldType =
  | "text"
  | "number"
  | "date"
  | "boolean"
  | "select"
  | "relation"
  | "textarea"
  | "currency"
  | "status";

export type ERPModuleField = {
  name: string;
  label: string;
  type: ERPFieldType;
  required?: boolean;
  readonly?: boolean;
  relationModule?: string;
  options?: string[];
};

export type ERPModuleAction = {
  name: string;
  label: string;
  type:
    | "create"
    | "update"
    | "delete"
    | "transition"
    | "workflow"
    | "custom";
  event?: string;
  workflow?: string;
  permission?: string;
};

export type ERPModuleRoute = {
  list: string;
  create: string;
  detail: string;
  edit: string;
};

export type ERPModuleDefinition = {
  key: string;
  label: string;
  description?: string;
  collection: string;
  icon?: string;
  routes: ERPModuleRoute;
  fields: ERPModuleField[];
  actions: ERPModuleAction[];
  workflows?: string[];
  rules?: string[];
  events?: string[];
  automations?: string[];
  auditEnabled?: boolean;
  supervisionEnabled?: boolean;
  observabilityEnabled?: boolean;
  realtimeEnabled?: boolean;
};