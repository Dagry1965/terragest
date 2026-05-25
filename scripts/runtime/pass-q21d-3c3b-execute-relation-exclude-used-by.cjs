const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q21d3c3b-exclude-used-by-v2";

function abs(file) {
  return path.join(ROOT, file);
}

function read(file) {
  return fs.readFileSync(abs(file), "utf8");
}

function write(file, content) {
  fs.writeFileSync(abs(file), content, "utf8");
  console.log(`[WRITTEN] ${file}`);
}

function backup(file) {
  const src = abs(file);
  const dest = abs(`${file}.bak-${TAG}`);
  if (!fs.existsSync(dest)) {
    fs.copyFileSync(src, dest);
    console.log(`[BACKUP] ${file}.bak-${TAG}`);
  }
}

function replaceOrFail(content, search, replacement, label) {
  if (!content.includes(search)) {
    throw new Error(`[MISSING] ${label}`);
  }
  return content.replace(search, replacement);
}

const relationEngineFile = "src/runtime/relations/RuntimeRelationFilterEngine.ts";
const formFieldFile = "src/components/erp/forms/enterprise/ERPFormField.tsx";

backup(relationEngineFile);
backup(formFieldFile);

/**
 * 1) Réécriture complète du moteur générique.
 * On évite le replace exact fragile.
 */
const engineContent = `export interface RuntimeRelationOption {
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
`;

write(relationEngineFile, engineContent);

/**
 * 2) Patch ERPFormField.
 */
let form = read(formFieldFile);

if (!form.includes(`RuntimeDataBinding`)) {
  form = replaceOrFail(
    form,
    `import { RuntimeRelationFilterEngine } from "@/runtime/relations";`,
    `import { RuntimeRelationFilterEngine } from "@/runtime/relations";
import { RuntimeDataBinding } from "@/runtime/data/RuntimeDataBinding";`,
    "import RuntimeDataBinding"
  );
}

if (!form.includes(`function getRelationExcludeUsedByConfig`)) {
  form = replaceOrFail(
    form,
`function getCurrentFormValue(
  fieldKey: string
): string {`,
`function getRelationExcludeUsedByConfig(
  field: ERPModuleField
): {
  module?: string;
  field?: string;
} | null {
  if (
    !field.relation ||
    typeof field.relation === "string"
  ) {
    return null;
  }

  const relationWithExcludeUsedBy =
    field.relation as {
      excludeUsedBy?: {
        module?: string;
        field?: string;
      };
    };

  return relationWithExcludeUsedBy.excludeUsedBy ?? null;
}

function getCurrentFormValue(
  fieldKey: string
): string {`,
    "add getRelationExcludeUsedByConfig"
  );
}

if (!form.includes(`relationUsedRecords`)) {
  form = replaceOrFail(
    form,
`  const [relationOptions, setRelationOptions] = useState<RelationOption[]>([]);
  const [relationSearch, setRelationSearch] = useState("");
  const [lockedRelationLabel, setLockedRelationLabel] = useState("");
  const [relationFilterSourceValue, setRelationFilterSourceValue] = useState("");
`,
`  const [relationOptions, setRelationOptions] = useState<RelationOption[]>([]);
  const [relationUsedRecords, setRelationUsedRecords] = useState<Record<string, unknown>[]>([]);
  const [relationSearch, setRelationSearch] = useState("");
  const [lockedRelationLabel, setLockedRelationLabel] = useState("");
  const [relationFilterSourceValue, setRelationFilterSourceValue] = useState("");
`,
    "add relationUsedRecords state"
  );
}

if (!form.includes(`loadRelationUsedRecords`)) {
  form = replaceOrFail(
    form,
`  useEffect(() => {
    const filterConfig =
      getRelationFilterConfig(field);

    if (
      field.type !== "relation" ||
      !filterConfig?.sourceField
    ) {
      setRelationFilterSourceValue("");
      return;
    }

    const sourceValue =
      formValues[filterConfig.sourceField];

    setRelationFilterSourceValue(
      sourceValue === undefined || sourceValue === null
        ? ""
        : String(sourceValue)
    );
  }, [field, formValues]);
`,
`  useEffect(() => {
    const filterConfig =
      getRelationFilterConfig(field);

    if (
      field.type !== "relation" ||
      !filterConfig?.sourceField
    ) {
      setRelationFilterSourceValue("");
      return;
    }

    const sourceValue =
      formValues[filterConfig.sourceField];

    setRelationFilterSourceValue(
      sourceValue === undefined || sourceValue === null
        ? ""
        : String(sourceValue)
    );
  }, [field, formValues]);

  useEffect(() => {
    async function loadRelationUsedRecords() {
      if (field.type !== "relation") {
        setRelationUsedRecords([]);
        return;
      }

      if (authLoading) {
        return;
      }

      const excludeUsedBy =
        getRelationExcludeUsedByConfig(field);

      if (!excludeUsedBy?.module || !excludeUsedBy?.field) {
        setRelationUsedRecords([]);
        return;
      }

      try {
        const usedRecords =
          await RuntimeDataBinding.list(excludeUsedBy.module);

        setRelationUsedRecords(
          Array.isArray(usedRecords)
            ? usedRecords as Record<string, unknown>[]
            : []
        );
      } catch (error) {
        console.error("ERP RELATION USED RECORDS LOAD ERROR", error);
        setRelationUsedRecords([]);
      }
    }

    loadRelationUsedRecords();
  }, [
    field,
    authLoading,
    authUser?.uid,
  ]);
`,
    "add loadRelationUsedRecords effect"
  );
}

if (!form.includes(`Q21D3C3B_RELATION_EXCLUDE_USED_BY`)) {
  form = replaceOrFail(
    form,
`    // Q21D3C2_RELATION_FILTER_ENGINE
    // Generic metadata-driven relation filtering.
    // ERPFormField provides UI context; RuntimeRelationFilterEngine applies filterBy.
    const filteredByContext =
      RuntimeRelationFilterEngine.apply({
        options: relationOptions,
        filterBy: filterConfig,
        formValues,
      });
`,
`    const excludeUsedByConfig =
      getRelationExcludeUsedByConfig(field);

    // Q21D3C3B_RELATION_EXCLUDE_USED_BY
    // Generic metadata-driven relation filtering.
    // ERPFormField provides UI context; RuntimeRelationFilterEngine applies filterBy/excludeUsedBy.
    const filteredByContext =
      RuntimeRelationFilterEngine.apply({
        options: relationOptions,
        filterBy: filterConfig,
        excludeUsedBy: excludeUsedByConfig,
        usedRecords: relationUsedRecords,
        currentValue,
        formValues,
      });
`,
    "wire RuntimeRelationFilterEngine excludeUsedBy"
  );
}

write(formFieldFile, form);

console.log("");
console.log("[Q21D_3C3B_DONE] relation.excludeUsedBy execution wired generically.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm audit:local");
console.log("  test UI: /receptionsstockauto/nouveau");