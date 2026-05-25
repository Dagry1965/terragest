const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targetPath = path.join(
  root,
  "src",
  "runtime",
  "relations",
  "RuntimeRelationLabelResolver.ts"
);

const backupPath = `${targetPath}.bak-q22e8d-consolidate-resolver`;

function fail(message) {
  console.error(`\n[ERROR] ${message}`);
  process.exit(1);
}

if (!fs.existsSync(targetPath)) {
  fail(`File not found: ${targetPath}`);
}

if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(targetPath, backupPath);
  console.log(`[BACKUP] ${path.relative(root, backupPath)}`);
} else {
  console.log(`[BACKUP_EXISTS] ${path.relative(root, backupPath)}`);
}

const content = `import type { ERPModule } from "@/runtime/modules/ERPModule";
import { allERPModules } from "@/runtime/modules/definitions/coreModules";
import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { RuntimeRelationLabelEngine } from "@/runtime/relations/RuntimeRelationLabelEngine";

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
    // Q22E8D_CONSOLIDATED_RELATION_LABEL_RESOLVER
    // Batch resolver/facade for screens such as planning, tables and panels.
    // Label construction is delegated to RuntimeRelationLabelEngine.
    // This avoids a second parallel label engine.
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
          (item) =>
            item.metadata.key === relationModuleKey ||
            item.schema.collection === relationModuleKey
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

        for (const relatedRecord of relatedRecords) {
          const relatedId =
            getRecordId(relatedRecord);

          if (!wantedIds.has(relatedId)) {
            continue;
          }

          const labelResult =
            await RuntimeRelationLabelEngine.buildLabelAsync({
              moduleKey: relationModule.metadata.key,
              record: relatedRecord,
              modules: allERPModules,
              depth: 1,
              resolveRelationLabel: async (
                targetModuleKey,
                id
              ) => {
                const targetModule =
                  allERPModules.find(
                    (item) =>
                      item.metadata.key === targetModuleKey ||
                      item.schema.collection === targetModuleKey
                  );

                if (!targetModule) {
                  return id;
                }

                const targetRecord =
                  await RuntimeDataBinding.detail(
                    targetModule,
                    id
                  );

                if (!targetRecord) {
                  return id;
                }

                const nestedLabel =
                  await RuntimeRelationLabelEngine.buildLabelAsync({
                    moduleKey: targetModule.metadata.key,
                    record: targetRecord,
                    modules: allERPModules,
                    depth: 0,
                  });

                return nestedLabel.label || id;
              },
            });

          if (labelResult.label) {
            labelMap[
              getRelationLabelKey(field.key, relatedId)
            ] = labelResult.label;
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

    const engineLabel =
      RuntimeRelationLabelEngine.buildLabel({
        moduleKey: module.metadata.key,
        record,
        modules: allERPModules,
      });

    return engineLabel.label || fallbackLabel;
  }
}
`;

fs.writeFileSync(targetPath, content, "utf8");

console.log(`
[Q22E8D_DONE] RuntimeRelationLabelResolver consolidé.

Décision:
  - RuntimeRelationLabelEngine reste le moteur de formatage métier.
  - RuntimeRelationLabelResolver devient une façade batch pour les écrans.
  - Pas de moteur parallèle.
  - Planning reste consommateur du resolver.
  - Préparation pour tables/panels/context sans duplication.

Next:
  pnpm build
  tester /rendezvous/planning
`);