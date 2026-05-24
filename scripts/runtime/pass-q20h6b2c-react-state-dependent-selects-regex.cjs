const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  field: "src/components/erp/forms/enterprise/ERPFormField.tsx",
  form: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  tabs: "src/components/erp/forms/enterprise/ERPFormTabs.tsx",
};

const suffix = "q20h6b2c-react-state-dependent-selects-regex";

function full(rel) {
  return path.join(ROOT, rel);
}

function backup(rel) {
  const source = full(rel);
  const target = full(`${rel}.bak-${suffix}`);

  if (!fs.existsSync(source)) {
    console.error(`[ERROR] Missing ${rel}`);
    process.exit(1);
  }

  if (!fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log(`[BACKUP] ${rel}.bak-${suffix}`);
  }
}

function readLf(rel) {
  return fs.readFileSync(full(rel), "utf8").replace(/\r\n/g, "\n");
}

function writeLf(rel, content) {
  fs.writeFileSync(full(rel), content, "utf8");
  console.log(`[WRITTEN] ${rel}`);
}

function replaceRequired(content, pattern, replacement, label) {
  if (!pattern.test(content)) {
    console.error(`[ERROR] Missing pattern: ${label}`);
    process.exit(1);
  }

  return content.replace(pattern, replacement);
}

// -----------------------------------------------------------------------------
// ERPFormField.tsx
// -----------------------------------------------------------------------------
backup(files.field);

let field = readLf(files.field);

// Add formValues prop.
if (!field.includes("formValues?: Record<string, unknown>;")) {
  field = replaceRequired(
    field,
    /(\s+value\?: unknown;\n)(\s+onChange\?: \()/,
    `$1  formValues?: Record<string, unknown>;\n$2`,
    "ERPFormFieldProps formValues"
  );
}

// Destructure formValues.
if (!field.includes("formValues = {},")) {
  field = replaceRequired(
    field,
    /(export function ERPFormField\(\{\n\s+field,\n\s+value,\n)(\s+onChange,)/,
    `$1  formValues = {},\n$2`,
    "ERPFormField destructure formValues"
  );
}

// Replace DOM-driven filter effect.
// This finds the useEffect that contains getRelationFilterConfig(field)
// and ends before const label = (
field = replaceRequired(
  field,
  /  useEffect\(\(\) => \{\n\s+const filterConfig =\n\s+getRelationFilterConfig\(field\);[\s\S]*?\n  \}, \[field\]\);\n\n(?=  const label = \()/,
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
  "relation filter useEffect"
);

// Replace safeFilteredOptions block.
// For filtered relations, never re-inject current value if it is outside filter.
if (!field.includes("const hasActiveRelationFilter =")) {
  field = replaceRequired(
    field,
    /      const currentOptionInFilteredList =[\s\S]*?\n\n(?=    const lockedDisplayLabel =)/,
    `      const hasActiveRelationFilter =
        Boolean(
          filterConfig?.sourceField &&
          filterConfig?.targetField
        );

      const currentOptionInFilteredList =
        filteredOptions.some((option) =>
          String(option.id) === String(currentValue)
        );

      const safeFilteredOptions =
        hasActiveRelationFilter
          ? filteredOptions
          : currentValue && !currentOptionInFilteredList
            ? [
                {
                  id: String(currentValue),
                  label:
                    selectedOption?.label &&
                    true
                      ? selectedOption.label
                      : "Relation actuelle conservee",
                  record:
                    selectedOption?.record,
                },
                ...filteredOptions,
              ]
            : filteredOptions;


`,
    "safeFilteredOptions"
  );
}

writeLf(files.field, field);

// -----------------------------------------------------------------------------
// ERPEnterpriseForm.tsx
// -----------------------------------------------------------------------------
backup(files.form);

let form = readLf(files.form);

// Add helper.
if (!form.includes("function getDependentRelationFieldKeys(")) {
  form = replaceRequired(
    form,
    /  function handleFieldChange\(\n\s+key: string,\n\s+value: unknown,\n\s+context\?: ERPFormRelationChangeContext\n\s+\) \{/,
    `  function getDependentRelationFieldKeys(
    changedFieldKey: string
  ): string[] {
    const dependentKeys = new Set<string>();

    for (const field of module.schema.fields) {
      if (
        !field.relation ||
        typeof field.relation === "string"
      ) {
        continue;
      }

      const relationConfig = field.relation as {
        filterBy?: {
          sourceField?: string;
        };
      };

      if (relationConfig.filterBy?.sourceField === changedFieldKey) {
        dependentKeys.add(field.key);
      }
    }

    return Array.from(dependentKeys);
  }

  function handleFieldChange(
    key: string,
    value: unknown,
    context?: ERPFormRelationChangeContext
  ) {`,
    "insert getDependentRelationFieldKeys"
  );
}

// Reset dependent values on parent change.
if (!form.includes("getDependentRelationFieldKeys(key)")) {
  form = replaceRequired(
    form,
    /(  function handleFieldChange\(\n\s+key: string,\n\s+value: unknown,\n\s+context\?: ERPFormRelationChangeContext\n\s+\) \{\n\s+setFormValues\(\(currentValues\) => \{\n\s+const nextValues = \{\n\s+\.\.\.currentValues,\n\s+\[key\]: value,\n\s+\};)/,
    `$1

      const dependentRelationKeys =
        getDependentRelationFieldKeys(key);

      for (const dependentKey of dependentRelationKeys) {
        if (dependentKey !== key) {
          nextValues[dependentKey] = "";
        }
      }`,
    "reset dependent relations"
  );
}

// Pass formValues to direct ERPFormField instances.
form = form.replace(
  /(value=\{formValues\[field\.key\]\}\n\s+)(onChange=\{handleFieldChange\})/g,
  `$1formValues={formValues}\n                    $2`
);

writeLf(files.form, form);

// -----------------------------------------------------------------------------
// ERPFormTabs.tsx
// -----------------------------------------------------------------------------
if (fs.existsSync(full(files.tabs))) {
  backup(files.tabs);

  let tabs = readLf(files.tabs);

  tabs = tabs.replace(
    /(value=\{formValues\[field\.key\]\}\n\s+)(onChange=\{onFieldChange\})/g,
    `$1formValues={formValues}\n                    $2`
  );

  writeLf(files.tabs, tabs);
}

console.log("");
console.log("[Q20H6B2C_DONE] Dependent relation selects use React form state.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  Test /rendezvous/nouveau");