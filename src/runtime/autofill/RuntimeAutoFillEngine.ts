export interface RuntimeAutoFillConfig {
  map?: Record<string, string[] | string>;
  recalculate?: boolean;
}

export interface RuntimeAutoFillContext {
  values: Record<string, unknown>;
  selectedRecord?: Record<string, unknown>;
  autoFill?: RuntimeAutoFillConfig | null;
}

export interface RuntimeAutoFillResult {
  values: Record<string, unknown>;
  appliedFields: string[];
}

function resolveValue(
  record: Record<string, unknown> | undefined,
  candidates: string[] | string
): unknown {
  if (!record) {
    return undefined;
  }

  const keys =
    Array.isArray(candidates)
      ? candidates
      : [candidates];

  for (const key of keys) {
    const value = record[key];

    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return undefined;
}

export class RuntimeAutoFillEngine {
  static apply(context: RuntimeAutoFillContext): RuntimeAutoFillResult {
    const autoFill =
      context.autoFill;

    if (!autoFill?.map || !context.selectedRecord) {
      return {
        values: context.values,
        appliedFields: [],
      };
    }

    const nextValues: Record<string, unknown> = {
      ...context.values,
    };

    const appliedFields: string[] = [];

    for (const [targetField, sourceFields] of Object.entries(autoFill.map)) {
      const value =
        resolveValue(
          context.selectedRecord,
          sourceFields
        );

      if (value !== undefined && value !== null && value !== "") {
        nextValues[targetField] =
          value;

        appliedFields.push(targetField);
      }
    }

    return {
      values: nextValues,
      appliedFields,
    };
  }
}