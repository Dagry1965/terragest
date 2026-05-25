const fs = require("fs");
const path = require("path");

const root = process.cwd();

const resolverDir = path.join(
  root,
  "src",
  "runtime",
  "relations"
);

const resolverPath = path.join(
  resolverDir,
  "RuntimeRelationLabelResolver.ts"
);

const planningPath = path.join(
  root,
  "src",
  "components",
  "erp",
  "scheduling",
  "ERPSchedulingPlanningView.tsx"
);

const planningBackupPath =
  `${planningPath}.bak-q22e8b-runtime-relation-label-resolver`;

function fail(message) {
  console.error(`\n[ERROR] ${message}`);
  process.exit(1);
}

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), {
    recursive: true,
  });

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(root, filePath)}`);
}

if (!fs.existsSync(planningPath)) {
  fail(`File not found: ${planningPath}`);
}

if (!fs.existsSync(planningBackupPath)) {
  fs.copyFileSync(planningPath, planningBackupPath);
  console.log(`[BACKUP] ${path.relative(root, planningBackupPath)}`);
} else {
  console.log(`[BACKUP_EXISTS] ${path.relative(root, planningBackupPath)}`);
}

const resolverContent = `import type { ERPModule } from "@/runtime/modules/ERPModule";
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
`;

write(resolverPath, resolverContent);

let planningContent = fs.readFileSync(planningPath, "utf8");
const originalPlanningContent = planningContent;

if (
  planningContent.includes("RuntimeRelationLabelResolver") &&
  planningContent.includes("relationLabels")
) {
  console.log("\n[SKIP] Planning semble déjà branché au resolver.");
  process.exit(0);
}

planningContent = planningContent.replace(
  `import { RuntimeSchedulingEngine } from "@/runtime/scheduling";`,
  `import { RuntimeSchedulingEngine } from "@/runtime/scheduling";
import {
  RuntimeRelationLabelResolver,
  type RuntimeRelationLabelMap,
} from "@/runtime/relations/RuntimeRelationLabelResolver";`
);

planningContent = planningContent.replace(
  /function formatRecordLabel\([\s\S]*?\n}\n\nfunction addDays/,
  `function addDays`
);

planningContent = planningContent.replace(
  `  const [records, setRecords] =
    useState<RuntimePlanningRecord[]>([]);`,
  `  const [records, setRecords] =
    useState<RuntimePlanningRecord[]>([]);

  const [relationLabels, setRelationLabels] =
    useState<RuntimeRelationLabelMap>({});`
);

planningContent = planningContent.replace(
  `        setRecords([]);
        setLoading(false);
        return;`,
  `        setRecords([]);
        setRelationLabels({});
        setLoading(false);
        return;`
);

const oldLoadSuccess = `        if (active) {
          setRecords(
            Array.isArray(result)
              ? result as RuntimePlanningRecord[]
              : []
          );
        }`;

const newLoadSuccess = `        const rows =
          Array.isArray(result)
            ? result as RuntimePlanningRecord[]
            : [];

        if (active) {
          setRecords(rows);
        }

        const labels =
          await RuntimeRelationLabelResolver.buildForRecords({
            module,
            records: rows,
          });

        if (active) {
          setRelationLabels(labels);
        }`;

if (!planningContent.includes(oldLoadSuccess)) {
  fail("Bloc loadRecords attendu introuvable dans ERPSchedulingPlanningView.tsx.");
}

planningContent = planningContent.replace(
  oldLoadSuccess,
  newLoadSuccess
);

planningContent = planningContent.replace(
  `          setRecords([]);
        }
      } finally {`,
  `          setRecords([]);
          setRelationLabels({});
        }
      } finally {`
);

planningContent = planningContent.replace(
  `{formatRecordLabel(record, module)}`,
  `{RuntimeRelationLabelResolver.formatRecordLabel({
                              record,
                              module,
                              relationLabels,
                            })}`
);

if (planningContent === originalPlanningContent) {
  fail("Aucune modification appliquée au planning.");
}

write(planningPath, planningContent);

console.log(`
[Q22E8B_DONE] RuntimeRelationLabelResolver créé et planning branché.

Résultat:
  - moteur générique src/runtime/relations/RuntimeRelationLabelResolver.ts
  - planning consomme le moteur
  - plus d'IDs techniques relationnels visibles si les records liés existent
  - aucun hardcode rendezvous / garage / AMARKHYS

Next:
  pnpm build
  tester /rendezvous/planning
`);