import type {
  RuntimeFieldValidation,
  RuntimeValidationError,
} from "./RuntimeValidationTypes";

export class RuntimeFieldValidator {
  static validate(
    fieldKey: string,
    value: unknown,
    validation?: RuntimeFieldValidation
  ): RuntimeValidationError[] {
    if (!validation) {
      return [];
    }

    const errors: RuntimeValidationError[] = [];

    const stringValue =
      String(value ?? "").trim();

    /*
     * REQUIRED
     */

    if (
      validation.required &&
      !stringValue
    ) {
      errors.push({
        field: fieldKey,
        message: "Champ obligatoire",
      });
    }

    /*
     * MIN LENGTH
     */

    if (
      validation.minLength &&
      stringValue.length <
        validation.minLength
    ) {
      errors.push({
        field: fieldKey,
        message:
          `Minimum ${validation.minLength} caractères`,
      });
    }

    /*
     * MAX LENGTH
     */

    if (
      validation.maxLength &&
      stringValue.length >
        validation.maxLength
    ) {
      errors.push({
        field: fieldKey,
        message:
          `Maximum ${validation.maxLength} caractères`,
      });
    }

    /*
     * EMAIL
     */

    if (
      validation.email &&
      stringValue
    ) {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(stringValue)) {
        errors.push({
          field: fieldKey,
          message: "Email invalide",
        });
      }
    }

    /*
     * NUMBER
     */

    if (
      stringValue &&
      (
        validation.min !== undefined ||
        validation.max !== undefined
      )
    ) {
      const numberValue =
        Number(stringValue);

      if (
        validation.min !== undefined &&
        numberValue < validation.min
      ) {
        errors.push({
          field: fieldKey,
          message:
            `Minimum ${validation.min}`,
        });
      }

      if (
        validation.max !== undefined &&
        numberValue > validation.max
      ) {
        errors.push({
          field: fieldKey,
          message:
            `Maximum ${validation.max}`,
        });
      }
    }

    /*
     * DATE
     */

    if (
      validation.beforeToday &&
      stringValue
    ) {
      const today =
        new Date();

      const date =
        new Date(stringValue);

      if (date > today) {
        errors.push({
          field: fieldKey,
          message:
            "La date doit être antérieure à aujourd’hui",
        });
      }
    }

    return errors;
  }
}