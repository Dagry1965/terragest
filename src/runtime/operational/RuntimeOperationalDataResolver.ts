import type {
  ERPModule,
  ERPOperationalChildTotalConfig,
} from "@/runtime/modules/ERPModule";

import type {
  ERPModuleField,
} from "@/runtime/modules/schemas/ERPModuleSchema";

import {
  RuntimeDataBinding,
} from "@/runtime/data-binding/RuntimeDataBinding";

import {
  allERPModules,
} from "@/runtime/modules/definitions/coreModules";

export type OperationalRelationLabelsMap = Record<
  string,
  Record<string, string>
>;

export type OperationalChildTotalsMap = Record<
  string,
  Record<string, number>
>;

export type RuntimeOperationalRelationLabelRequest = {
  module: ERPModule;
  fieldKeys: string[];
};

export type RuntimeOperationalChildTotalsRequest = {
  parentModule: ERPModule;
  totals: ERPOperationalChildTotalConfig[];
};

function getRecordId(record: Record<string, unknown>): string {
  return String(record.id ?? record._id ?? record.uid ?? "").trim();
}

function getModule(moduleKey: string): ERPModule | undefined {
  return allERPModules.find((module) => module.metadata.key === moduleKey);
}

function getField(module: ERPModule, key: string): ERPModuleField | undefined {
  return module.schema.fields.find((field) => field.key === key);
}

function getRelationModuleKey(field: ERPModuleField): string {
  const relation = field.relation;

  if (!relation) {
    return "";
  }

  if (typeof relation === "string") {
    return relation;
  }

  return relation.module ?? "";
}

function buildRelationLabel(
  record: Record<string, unknown>,
  fields: string[]
): string {
  return fields
    .map((field) => record[field])
    .filter((value) => value !== undefined && value !== null && String(value).trim())
    .map((value) => String(value).trim())
    .join(" · ");
}

function getRelationLabelFields(
  module: ERPModule,
  fieldKey: string,
  targetModule?: ERPModule
): string[] {
  const tableConfig = module.operational?.table as
    | {
        relationLabelFields?: Record<string, string[]>;
      }
    | undefined;

  const configured = tableConfig?.relationLabelFields?.[fieldKey];

  if (configured?.length) {
    return configured;
  }

  const composition = targetModule?.composition as
    | {
        labelFields?: string[];
      }
    | undefined;

  if (composition?.labelFields?.length) {
    return composition.labelFields;
  }

  return (
    targetModule?.schema.fields
      .filter((field) => field.list?.visible || field.list?.order !== undefined)
      .slice(0, 3)
      .map((field) => field.key) ?? []
  );
}

function isVisibleRuntimeRecord(record: Record<string, unknown>): boolean {
  if (record.removedAt) return false;

  const status = String(record.statut ?? record.status ?? "").toLowerCase();

  return status !== "retiree";
}

export class RuntimeOperationalDataResolver {
  static async resolveRelationLabels(
    request: RuntimeOperationalRelationLabelRequest
  ): Promise<OperationalRelationLabelsMap> {
    const { module, fieldKeys } = request;

    const relationFields = fieldKeys
      .map((fieldKey) => ({
        key: fieldKey,
        field: getField(module, fieldKey),
      }))
      .filter(
        (
          column
        ): column is {
          key: string;
          field: ERPModuleField;
        } => Boolean(column.field)
      )
      .filter((column) => Boolean(getRelationModuleKey(column.field)));

    if (relationFields.length === 0) {
      return {};
    }

    const next: OperationalRelationLabelsMap = {};

    await Promise.all(
      relationFields.map(async (column) => {
        const targetModuleKey = getRelationModuleKey(column.field);

        if (!targetModuleKey) return;

        const targetModule = getModule(targetModuleKey);

        if (!targetModule) return;

        const records = await RuntimeDataBinding.list(targetModule);
        const fields = getRelationLabelFields(module, column.key, targetModule);
        const labels: Record<string, string> = {};

        records.forEach((record) => {
          const id = getRecordId(record);

          if (!id) return;

          labels[id] =
            buildRelationLabel(record, fields) ||
            String(record.nom ?? record.label ?? id);
        });

        next[column.key] = labels;
      })
    );

    return next;
  }

  static async resolveChildTotals(
    request: RuntimeOperationalChildTotalsRequest
  ): Promise<OperationalChildTotalsMap> {
    const { totals } = request;

    if (!totals.length) {
      return {};
    }

    const next: OperationalChildTotalsMap = {};

    await Promise.all(
      totals.map(async (config) => {
        const childModule = getModule(config.moduleKey);

        if (!childModule) return;

        const children = await RuntimeDataBinding.list(childModule);
        const totalsByParent: Record<string, number> = {};

        children
          .filter(isVisibleRuntimeRecord)
          .forEach((child) => {
            const parentId = String(child[config.foreignKey] ?? "").trim();

            if (!parentId) return;

            totalsByParent[parentId] =
              (totalsByParent[parentId] ?? 0) +
              Number(child[config.totalField] ?? 0);
          });

        next[config.key] = totalsByParent;
      })
    );

    return next;
  }
}
