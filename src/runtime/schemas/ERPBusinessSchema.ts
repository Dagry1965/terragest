export interface ERPBusinessField {

  key: string;

  label: string;

  type:
    | "text"
    | "number"
    | "date"
    | "boolean"
    | "select";

  required?: boolean;
}

export interface ERPBusinessSchema {

  module: string;

  label: string;

  fields:
    ERPBusinessField[];
}