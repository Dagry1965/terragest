export interface RuntimeRelationOption {
  id: string;
  label: string;
  record?: Record<string, unknown>;
}

export interface RuntimeRelationFilterConfig {
  sourceField?: string;
  targetField?: string;
  includeEmptyTarget?: boolean;
}

export interface RuntimeRelationExcludeUsedByConfig {
  module?: string;
  field?: string;
}

export interface RuntimeRelationFilterContext {
  options: RuntimeRelationOption[];
  filterBy?: RuntimeRelationFilterConfig | null;
  excludeUsedBy?: RuntimeRelationExcludeUsedByConfig | null;
  usedRecords?: Record<string, unknown>[];
  currentValue?: unknown;
  formValues?: Record<string, unknown>;
}

function relationTargetIsEmpty(value: unknown): boolean {
  return value === undefined || value === null || value === "";
}

function normalizeRelationValue(value: unknown): string {
  return value === undefined || value === null ? "" : String(value);
}

export class RuntimeRelationFilterEngine {
  static apply(context: RuntimeRelationFilterContext): RuntimeRelationOption[] {
    const filterBy = context.filterBy;
    const excludeUsedBy = context.excludeUsedBy;

    const currentValue =
      normalizeRelationValue(context.currentValue);

    let options =
      context.options;

    if (filterBy?.sourceField && filterBy?.targetField) {
      const sourceValue =
        context.formValues?.[filterBy.sourceField];

      const sourceText =
        normalizeRelationValue(sourceValue);

      options = options.filter((option) => {
        const targetValue =
          option.record?.[filterBy.targetField as string];

        if (!sourceText) {
          return filterBy.includeEmptyTarget
            ? relationTargetIsEmpty(targetValue)
            : true;
        }

        return normalizeRelationValue(targetValue) === sourceText;
      });
    }

    if (excludeUsedBy?.field) {
      const usedValues =
        new Set(
          (context.usedRecords ?? [])
            .map((record) =>
              normalizeRelationValue(record?.[excludeUsedBy.field as string])
            )
            .filter(Boolean)
        );

      options = options.filter((option) => {
        const optionId =
          normalizeRelationValue(option.id);

        if (currentValue && optionId === currentValue) {
          return true;
        }

        return !usedValues.has(optionId);
      });
    }

    return options;
  }
}
