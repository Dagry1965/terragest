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

  /*
   * BASE
   */
  required?: boolean;
  searchable?: boolean;
  sortable?: boolean;
  filterable?: boolean;

  visibleInList?: boolean;
  visibleInForm?: boolean;
  visibleInDetails?: boolean;

visibility?: {
  field: string;
  equals?: unknown;
  notEquals?: unknown;
  in?: unknown[];
  notIn?: unknown[];
};

ui?: {
  placeholder?: string;
  icon?: string;
  variant?: string;
  help?: string;
};

/*
   * PERMISSION
   */

   permissions?: {
     roles?: string[];
   };

  /*
   * RELATION
   */
  relation?:
    | string
    | {
        module: string;
        collection?: string;
        labelField?: string;
      };

  relationType?: ERPRelationType;
  references?: ERPModuleFieldReference;

relationDisplay?: {
  title?: string;
  subtitle?: string;
  badge?: string;
};

  /*
   * OPTIONS
   */
  options?: ERPModuleFieldOption[];
  dependsOn?: string;
  optionsByValue?: Record<string, ERPModuleFieldOption[]>;

  /*
   * DEFAULTS & UI
   */
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
   * VALIDATION
   */
  validation?: ERPFieldValidation;
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

  /*
   * COMPUTED FIELDS
   */
  computed?: {
    formula: string;
    dependsOn: string[];
  };

  /*
   * GRID LAYOUT (FormEngine)
   */
  grid?: {
    cols?: number;
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
