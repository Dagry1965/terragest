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

export interface RuntimeRelationFilterContext {
  options: RuntimeRelationOption[];
  filterBy?: RuntimeRelationFilterConfig | null;
  formValues?: Record<string, unknown>;
}

function relationTargetIsEmpty(value: unknown): boolean {
  return value === undefined || value === null || value === "";
}

export class RuntimeRelationFilterEngine {
  static apply(context: RuntimeRelationFilterContext): RuntimeRelationOption[] {
    const filterBy = context.filterBy;

    if (!filterBy?.sourceField || !filterBy?.targetField) {
      return context.options;
    }

    const sourceValue =
      context.formValues?.[filterBy.sourceField];

    const sourceText =
      sourceValue === undefined || sourceValue === null
        ? ""
        : String(sourceValue);

    return context.options.filter((option) => {
      const targetValue =
        option.record?.[filterBy.targetField as string];

      if (!sourceText) {
        return filterBy.includeEmptyTarget
          ? relationTargetIsEmpty(targetValue)
          : true;
      }

      return String(targetValue ?? "") === sourceText;
    });
  }
}