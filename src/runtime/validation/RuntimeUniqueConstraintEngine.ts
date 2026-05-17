import type { ERPModule } from "@/runtime/modules/ERPModule";

import {
  RuntimeDataBinding,
} from "@/runtime/data-binding";

export interface RuntimeUniqueConstraintViolation {
  field: string;
  message: string;
}

function normalizeUniqueValue(
  value: unknown
): string {
  return String(value ?? "")
    .trim()
    .toUpperCase();
}

function getRecordId(
  record: Record<string, unknown>
): string {
  return String(
    record.id ??
      record._id ??
      ""
  );
}

export class RuntimeUniqueConstraintEngine {
  static async validate(
    module: ERPModule,
    payload: Record<string, unknown>,
    currentRecordId?: string
  ): Promise<RuntimeUniqueConstraintViolation[]> {
    const uniqueFields =
      module.schema.fields.filter((field) => {
        return Boolean(field.unique);
      });

    if (uniqueFields.length === 0) {
      return [];
    }

    const records =
      await RuntimeDataBinding.list(module);

    const violations: RuntimeUniqueConstraintViolation[] = [];

    for (const field of uniqueFields) {
      const value =
        normalizeUniqueValue(payload[field.key]);

      if (!value) {
        continue;
      }

      const duplicate =
        records.find((record) => {
          const recordId =
            getRecordId(record as Record<string, unknown>);

          if (
            currentRecordId &&
            recordId &&
            recordId === currentRecordId
          ) {
            return false;
          }

          const existingValue =
            normalizeUniqueValue(
              (record as Record<string, unknown>)[field.key]
            );

          return existingValue === value;
        });

      if (duplicate) {
        violations.push({
          field: field.key,
          message:
            field.label +
            " existe déjà. Cette valeur doit être unique.",
        });
      }
    }

    return violations;
  }
}
