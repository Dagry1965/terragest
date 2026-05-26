export type RuntimeMappingSourceRecord = Record<string, unknown>;
export type RuntimeMappingTargetRecord = Record<string, unknown>;

export type RuntimeRecordMappingRule =
  | string
  | {
      from?: string;
      value?: unknown;
      fallback?: unknown;
      transform?: (value: unknown, source: RuntimeMappingSourceRecord) => unknown;
    };

export type RuntimeRecordMappingDefinition = Record<string, RuntimeRecordMappingRule>;

function getSourceValue(
  source: RuntimeMappingSourceRecord,
  fieldName?: string
): unknown {
  if (!fieldName) return undefined;
  return source[fieldName];
}

function hasValue(value: unknown): boolean {
  return value !== undefined && value !== null && value !== "";
}

export class RuntimeRecordMappingEngine {
  static mapRecord(
    source: RuntimeMappingSourceRecord,
    mapping: RuntimeRecordMappingDefinition
  ): RuntimeMappingTargetRecord {
    const target: RuntimeMappingTargetRecord = {};

    for (const [targetField, rule] of Object.entries(mapping)) {
      if (typeof rule === "string") {
        target[targetField] = getSourceValue(source, rule);
        continue;
      }

      if ("value" in rule) {
        target[targetField] = rule.value;
        continue;
      }

      const sourceValue = getSourceValue(source, rule.from);
      const mappedValue = hasValue(sourceValue) ? sourceValue : rule.fallback;

      target[targetField] = rule.transform
        ? rule.transform(mappedValue, source)
        : mappedValue;
    }

    return target;
  }
}
