import {
  DynamicField,
  DynamicFormContext,
}
from "@/runtime/forms/DynamicField";

export interface DynamicFormDefinition {

  module: string;

  build: (
    context: DynamicFormContext
  ) => DynamicField[];
}
