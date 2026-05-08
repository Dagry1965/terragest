export type ERPFieldType =
  | "text"
  | "number"
  | "date"
  | "boolean"
  | "status"
  | "currency";

export type ERPField = {
  key: string;
  label: string;
  type: ERPFieldType;
  required?: boolean;
  searchable?: boolean;
  sortable?: boolean;
  list?: boolean;
};

export type ERPStatus = {
  value: string;
  label: string;
  color:
    | "gray"
    | "blue"
    | "green"
    | "yellow"
    | "red";
};

export type ERPModuleSchema = {
  module: string;

  title: string;

  description?: string;

  fields: ERPField[];

  statuses?: ERPStatus[];

  features?: {
    audit?: boolean;
    workflow?: boolean;
    supervision?: boolean;
  };
};
