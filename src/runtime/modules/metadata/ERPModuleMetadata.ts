import type { ERPModuleField } from "../schemas/ERPModuleSchema";

export interface ERPModuleMetadata {
  key: string;
  label: string;
  description?: string;
  icon?: string;
  color?: string;
  category?: string;
  version?: string;
  enabled?: boolean;
  visible?: boolean;
  order?: number;
  tags?: string[];
  permissions?: string[];
  dependencies?: string[];
dashboard?: boolean;

  dashboardConfig?: {
    widgets?: string[];
    realtime?: boolean;
    analytics?: boolean;
    layout?: "grid" | "timeline" | "cockpit";
  };

  analyticsConfig?: {
    enabled?: boolean;
    kpis?: string[];
    charts?: string[];
    dimensions?: string[];
  };

  workflowConfig?: {
    enabled?: boolean;
    workflows?: string[];
    defaultWorkflow?: string;
  };

  automationConfig?: {
    enabled?: boolean;
    rules?: string[];
    triggers?: string[];
  };

  observabilityConfig?: {
    enabled?: boolean;
    traces?: boolean;
    logs?: boolean;
    metrics?: boolean;
    alerts?: boolean;
  };

  routes?: {
    list?: string;
    details?: string;
    create?: string;
    edit?: string;
  };

  features?: {
    dashboard?: boolean;
    analytics?: boolean;
    workflows?: boolean;
    automation?: boolean;
    notifications?: boolean;
    observability?: boolean;
    audit?: boolean;
    realtime?: boolean;
  };
}
export type ERPModuleSchema = {
  module?: string;
  collection: string;
  timestamps?: boolean;
  softDelete?: boolean;
  fields: ERPModuleField[];
};
