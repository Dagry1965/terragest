import type { ERPModule } from "@/runtime/modules/ERPModule";

export type RuntimeComputedFormula =
  | "multiply"
  | "taxIncluded"
  | "taxAmount"
  | "add"
  | "subtract";

export interface RuntimeComputedFieldDefinition {
  target: string;
  formula: RuntimeComputedFormula;
  sources: string[];
  round?: number;
  defaultValue?: number;
}

export interface RuntimeComputedFieldsContext {
  module: ERPModule;
  values: Record<string, unknown>;
}

export interface RuntimeComputedFieldsResult {
  values: Record<string, unknown>;
  computedKeys: string[];
}

function toRuntimeNumber(value: unknown, fallback = 0): number {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  const normalized =
    typeof value === "string"
      ? value.replace(/\s/g, "").replace(",", ".")
      : value;

  const number = Number(normalized);

  return Number.isFinite(number) ? number : fallback;
}

function roundAmount(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function getComputedFields(module: ERPModule): RuntimeComputedFieldDefinition[] {
  const composition = module.composition as
    | {
        computedFields?: RuntimeComputedFieldDefinition[];
      }
    | undefined;

  const runtime = module.metadata as
    | {
        computedFields?: RuntimeComputedFieldDefinition[];
      }
    | undefined;

  return [
    ...(composition?.computedFields ?? []),
    ...(runtime?.computedFields ?? []),
  ];
}

function applyFormula(
  definition: RuntimeComputedFieldDefinition,
  values: Record<string, unknown>
): number {
  const sources = definition.sources.map((source) =>
    toRuntimeNumber(values[source], definition.defaultValue ?? 0)
  );

  switch (definition.formula) {
    case "multiply": {
      return sources.reduce((total, value) => total * value, 1);
    }

    case "taxAmount": {
      const base = sources[0] ?? 0;
      const taxRate = sources[1] ?? 0;

      return base * taxRate / 100;
    }

    case "taxIncluded": {
      const base = sources[0] ?? 0;
      const taxRate = sources[1] ?? 0;

      return base * (1 + taxRate / 100);
    }

    case "add": {
      return sources.reduce((total, value) => total + value, 0);
    }

    case "subtract": {
      const [first = 0, ...rest] = sources;

      return rest.reduce((total, value) => total - value, first);
    }

    default:
      return 0;
  }
}

export class RuntimeComputedFieldsEngine {
  static apply(
    context: RuntimeComputedFieldsContext
  ): RuntimeComputedFieldsResult {
    const definitions = getComputedFields(context.module);

    if (definitions.length === 0) {
      return {
        values: context.values,
        computedKeys: [],
      };
    }

    const nextValues: Record<string, unknown> = {
      ...context.values,
    };

    const computedKeys: string[] = [];

    for (const definition of definitions) {
      const rawValue = applyFormula(definition, nextValues);
      const value = roundAmount(rawValue, definition.round ?? 2);

      nextValues[definition.target] = value;
      computedKeys.push(definition.target);
    }

    return {
      values: nextValues,
      computedKeys,
    };
  }

  static getComputedKeys(module: ERPModule): string[] {
    return getComputedFields(module).map((definition) => definition.target);
  }
}