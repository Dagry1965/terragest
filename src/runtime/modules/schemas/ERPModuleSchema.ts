export type ERPModuleFieldType =
  | "text"
  | "number"
  | "date"
  | "datetime"
  | "boolean"
  | "select"
  | "relation"
  | "status"
  | "currency"
  | "textarea"
  | "email"
  | "phone";

export interface ERPModuleFieldOption {
  label: string;
  value: string;
}

export interface ERPModuleField {
  key: string;
  label: string;
  type: ERPModuleFieldType | string;
  required?: boolean;
  searchable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  visibleInList?: boolean;
  visibleInForm?: boolean;
  visibleInDetails?: boolean;
  relation?: string;
  options?: ERPModuleFieldOption[];
  defaultValue?: unknown;
}

export interface ERPModuleSchema {
  module: string;
  collection: string;
  fields: ERPModuleField[];
  timestamps?: boolean;
  softDelete?: boolean;
}
