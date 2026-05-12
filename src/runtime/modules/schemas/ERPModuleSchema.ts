export interface ERPModuleFieldOption {
  label: string;
  value: string;
}

export interface ERPConditionalRule {
  field: string;
  operator: "equals" | "notEquals" | "in" | "notIn";
  value?: unknown;
  values?: unknown[];
}

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

export interface ERPModuleFieldReference {
  module?: string;
  field?: string;
}

export type ERPRelationType =
  | "one-to-one"
  | "one-to-many"
  | "many-to-one"
  | "many-to-many";

export interface ERPFieldValidator {
  type: "min" | "max" | "regex" | "email" | "phone" | "custom";
  value?: unknown;
  message?: string;
}

export interface ERPFieldValidation {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  phone?: boolean;
  regex?: string;
  beforeToday?: boolean;
  afterToday?: boolean;
  message?: string;
}

export interface ERPModuleFieldVisibility {
  field: string;
  equals?: string | number | boolean;
  notEquals?: string | number | boolean;
  in?: Array<string | number | boolean>;
  notIn?: Array<string | number | boolean>;
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

  relation?:
    | string
    | {
        module: string;
        collection?: string;
        labelField?: string;
      };
  options?: ERPModuleFieldOption[];
  defaultValue?: unknown;
  placeholder?: string;
  helperText?: string;

  /*
   * CONDITIONAL LOGIC
   */
  visibleIf?: ERPConditionalRule;
  requiredIf?: ERPConditionalRule;
  readonlyIf?: ERPConditionalRule;

  /*
   * SIMPLE VISIBILITY METADATA
   */
  visibility?: ERPModuleFieldVisibility;

  /*
   * VALIDATION
   */
  validation?: ERPFieldValidation;

  /*
   * VALIDATION RULES
   */
  validators?: ERPFieldValidator[];

  /*
   * RELATIONAL INTELLIGENCE
   */
  primaryKey?: boolean;
  foreignKey?: boolean;
  nullable?: boolean;
  unique?: boolean;
  indexed?: boolean;
  cascadeDelete?: boolean;

  relationType?: ERPRelationType;
  references?: ERPModuleFieldReference;

  /*
   * DYNAMIC OPTIONS
   */
  dependsOn?: string;
  optionsByValue?: Record<string, ERPModuleFieldOption[]>;

  /*
   * DYNAMIC COMPUTING
   */
computed?: {
  formula: string;
  dependsOn: string[];
};
}

export interface ERPModuleSchema {
  module?: string;
  collection: string;
  fields: ERPModuleField[];
  timestamps?: boolean;
  softDelete?: boolean;
  primaryKey?: string;
}