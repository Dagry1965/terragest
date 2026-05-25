import type { ERPModule } from "@/runtime/modules/ERPModule";
import { allERPModules } from "@/runtime/modules/definitions/coreModules";
import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";

export type RuntimeRelationLabelMap = Record<string, string>;

type RuntimeRecord = Record<string, unknown>;

function asString(value: unknown) {
  return String(value ?? "").trim();
}

function getRecordId(record: RuntimeRecord) {
  return asString(
    record.id ??
      record._id ??
      record.recordId
  );
}

function isLikelyTechnicalId(value: string) {
  return /^[A-Za-z0-9_-]{12,}$/.test(value);
}

function getRelationLabelKey(
  fieldKey: string,
  value: string
) {
  return fieldKey + "::" + value;
}

function getRelationModuleKey(
  field: ERPModule["schema"]["fields"][number]
) {
  const relation =
    field.relation as
      | string
      | {
          module?: string;
          moduleKey?: string;
          collection?: string;
        }
      | undefined;

  if (!relation) {
    return "";
  }

  if (typeof relation === "string") {
    return relation;
  }

  return (
    relation.module ??
    relation.moduleKey ??
    relation.collection ??
    ""
  );
}

function getContextRelationLabelFields(
  module: ERPModule,
  fieldKey: string
): string[] | null {
  const contextBanner =
    module.composition?.contextBanner as
      | {
          items?: Array<{
            relationField?: string;
            labelFields?: string[];
          }>;
        }
      | undefined;

  const item =
    contextBanner?.items?.find(
      (entry) => entry.relationField === fieldKey
    );

  return Array.isArray(item?.labelFields)
    ? item.labelFields
    : null;
}

function formatRelationRecordLabel(
  record: RuntimeRecord,
  labelFields?: string[]
) {
  const fields =
    labelFields && labelFields.length > 0
      ? labelFields
      : [
          "nom",
          "prenom",
          "label",
          "name",
          "code",
          "telephone",
          "immatriculation",
          "marque",
          "modele",
          "email",
        ];

  const parts =
    fields
      .map((field) => asString(record[field]))
      .filter(Boolean);

  return parts.join(" · ");
}

export class RuntimeRelationLabelResolver {
  static getRelationLabelKey(
    fieldKey: string,
    value: string
  ) {
    return getRelationLabelKey(fieldKey, value);
  }

  static async buildForRecords(params: {
    module: ERPModule;
    records: RuntimeRecord[];
  }): Promise<RuntimeRelationLabelMap> {
    // Q22E8B_RUNTIME_RELATION_LABEL_RESOLVER
    // Generic runtime relation label resolver.
    // It resolves raw relation IDs into business labels based on metadata.
    const { module, records } = params;

    const relationFields =
      module.schema.fields.filter((field) =>
        Boolean(field.relation)
      );

    const labelMap: RuntimeRelationLabelMap = {};

    for (const field of relationFields) {
      const relationModuleKey =
        getRelationModuleKey(field);

      if (!relationModuleKey) {
        continue;
      }

      const relationModule =
        allERPModules.find(
          (item) => item.metadata.key === relationModuleKey
        );

      if (!relationModule) {
        continue;
      }

      const ids =
        Array.from(
          new Set(
            records
              .map((record) => asString(record[field.key]))
              .filter(Boolean)
          )
        );

      if (ids.length === 0) {
        continue;
      }

      try {
        const relatedRecords =
          await RuntimeDataBinding.list(relationModule);

        const wantedIds =
          new Set(ids);

        const labelFields =
          getContextRelationLabelFields(module, field.key) ??
          relationModule.composition?.labelFields;

        for (const relatedRecord of relatedRecords) {
          const relatedId =
            getRecordId(relatedRecord);

          if (!wantedIds.has(relatedId)) {
            continue;
          }

          const label =
            formatRelationRecordLabel(
              relatedRecord,
              labelFields
            );

          if (label) {
            labelMap[
              getRelationLabelKey(field.key, relatedId)
            ] = label;
          }
        }
      } catch (error) {
        console.error(
          "[RUNTIME_RELATION_LABEL_RESOLVER_ERROR]",
          module.metadata.key,
          field.key,
          relationModuleKey,
          error
        );
      }
    }

    return labelMap;
  }

  static formatRecordLabel(params: {
    record: RuntimeRecord;
    module: ERPModule;
    relationLabels?: RuntimeRelationLabelMap;
    fallbackLabel?: string;
  }) {
    const {
      record,
      module,
      relationLabels = {},
      fallbackLabel = "Réservation",
    } = params;

    const labelFields =
      module.composition?.labelFields ?? [
        "nom",
        "titre",
        "code",
        "clientNom",
        "vehiculeImmatriculation",
        "statut",
      ];

    const parts =
      labelFields
        .map((field) => {
          const rawValue =
            asString(record[field]);

          if (!rawValue) {
            return "";
          }

          const relationLabel =
            relationLabels[
              getRelationLabelKey(field, rawValue)
            ];

          if (relationLabel) {
            return relationLabel;
          }

          return isLikelyTechnicalId(rawValue)
            ? ""
            : rawValue;
        })
        .filter(Boolean);

    if (parts.length > 0) {
      return parts.join(" · ");
    }

    return fallbackLabel;
  }
}
