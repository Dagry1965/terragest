import type { ERPModuleMetadata } from "./metadata/ERPModuleMetadata";
import type { ERPModuleSchema } from "./schemas/ERPModuleSchema";

export interface ERPModuleAction {
  key: string;
  label: string;
  type?: "primary" | "secondary" | "danger" | "ghost";
  permission?: string;
  event?: string;
  href?: string;
}

export interface ERPModuleRelation {
  key: string;
  label: string;
  targetModule?: string;
  targetmodule?: string; // doublon conservé comme demandé
  type: "one-to-one" | "one-to-many" | "many-to-one" | "many-to-many";
}

export interface ERPWorkflowTransition {
  from: string;
  to: string;

  action: string;

  permissions?: string[];
}

export interface ERPWorkflowState {
  key: string;
  label: string;

  color?: string;

  terminal?: boolean;
}

export interface ERPModuleWorkflow {
  key: string;
  label: string;

  initialState?: string;

  stateField?: string;

  states?: Array<string | ERPWorkflowState>;

  transitions?: ERPWorkflowTransition[];
}

export interface ERPModuleVisibility {
  field: string;
  equals?: string | number | boolean;
  notEquals?: string | number | boolean;
  in?: Array<string | number | boolean>;
}

export interface ERPModulePersistence {
  firestore?: boolean;
  timestamps?: boolean;
  softDelete?: boolean;
}

export interface ERPModulePermissions {
  create?: boolean;
  read?: boolean;
  update?: boolean;
  delete?: boolean;
  import?: boolean;
  export?: boolean;
}
export interface ERPModuleFormSection {
  key: string;
  title: string;
  description?: string;
  fields: string[];

 visibility?: {
    field: string;
    equals?: string | number | boolean;
    notEquals?: string | number | boolean;
  };

}
export interface ERPModuleFormTab {
  key: string;
  label: string;
  fields: string[];
sections?: ERPModuleFormSection[];
}

export interface ERPModuleFormConfig {
  layout?: "sections" | "tabs" | "stepper";
  tabs?: ERPModuleFormTab[];
}

export interface ERPModule {
  metadata: ERPModuleMetadata;
  schema: ERPModuleSchema;

  permissions?: ERPModulePermissions;

  persistence?: ERPModulePersistence;

  visibility?: ERPModuleVisibility;

  form?: ERPModuleFormConfig;

  actions?: ERPModuleAction[];

  relations?: ERPModuleRelation[];

  workflows?: ERPModuleWorkflow[];
}
