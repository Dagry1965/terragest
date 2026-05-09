export interface ERPFormField {

  key: string;

  label: string;

  type:
    | "text"
    | "number"
    | "date"
   | "select"
| "boolean";
}

export interface ERPGeneratedForm {

  module: string;

  fields:
    ERPFormField[];
}

export class ERPFormGenerationEngine {

  generateForm(
    module: string,
    fields: ERPFormField[]
  ): ERPGeneratedForm {

    return {
      module,
      fields,
    };
  }
}

export const erpFormGenerationEngine =
  new ERPFormGenerationEngine();