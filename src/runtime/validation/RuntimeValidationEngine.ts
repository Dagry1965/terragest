import type {
  ERPModule,
  ERPModuleField,
} from "@/runtime/modules";

import {
  RuntimeFieldValidator,
} from "./RuntimeFieldValidator";

import type {
  RuntimeValidationError,
} from "./RuntimeValidationTypes";

export class RuntimeValidationEngine {
  static validate(
    module: ERPModule,
    payload: Record<string, unknown>
  ): RuntimeValidationError[] {

    const errors: RuntimeValidationError[] = [];

    module.schema.fields.forEach(
      (field: ERPModuleField) => {

        const fieldErrors =
          RuntimeFieldValidator.validate(
            field.key,
            payload[field.key],
            field.validation
          );

        errors.push(...fieldErrors);
      }
    );

    return errors;
  }
}