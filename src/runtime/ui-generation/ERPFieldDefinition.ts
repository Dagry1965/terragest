export type ERPFieldType =
  | "text"
  | "number"
  | "date"
  | "select"
  | "textarea"
  | "boolean"
  | "currency"
  | "status";

export type ERPFieldDefinition = {
  key: string;
  label: string;
  type?: ERPFieldType;
  required?: boolean;
  placeholder?: string;
  options?: {
    label: string;
    value: string;
  }[];
};