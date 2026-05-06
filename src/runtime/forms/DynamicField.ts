export interface DynamicField {
  name: string;

  label: string;

  type:
    | "text"
    | "number"
    | "select"
    | "textarea";

  visible?: boolean;

  required?: boolean;

  options?: {
    label: string;
    value: string;
  }[];
}

export interface DynamicFormContext {
  role?: string;

  module?: string;

  entityType?: string;

  criticite?: string;

  exploitationType?: string;

  materielType?: string;
}
