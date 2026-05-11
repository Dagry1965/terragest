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
