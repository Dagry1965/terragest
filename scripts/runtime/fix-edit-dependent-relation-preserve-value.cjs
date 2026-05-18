const fs = require("fs");
const path = require("path");

const root = process.cwd();

function read(filePath) {
  return fs.readFileSync(path.join(root, filePath), "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(path.join(root, filePath), content, "utf8");
  console.log("WRITTEN", filePath);
}

const formPath =
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";

const fieldPath =
  "src/components/erp/forms/enterprise/ERPFormField.tsx";

let form = read(formPath);

/**
 * Safety: when a relation select is visually empty because its async options
 * are not loaded or filtered yet, never overwrite an existing relation value
 * with "" during submit.
 */
form = form.replace(
`        let value: unknown =
        formData.get(field.key) ??
          formValues[field.key];

        if (
          field.type === "number" &&
          value !== null
        ) {`,
`        let value: unknown =
          formData.get(field.key) ??
          formValues[field.key];

        if (
          field.type === "relation" &&
          (value === "" || value === null || value === undefined) &&
          formValues[field.key] !== undefined &&
          formValues[field.key] !== null &&
          String(formValues[field.key]).trim() !== ""
        ) {
          value = formValues[field.key];
        }

        if (
          field.type === "number" &&
          value !== null
        ) {`
);

write(formPath, form);

let field = read(fieldPath);

/**
 * Add a safe technical-id detector.
 */
if (!field.includes("function isLikelyTechnicalId(")) {
  field = field.replace(
`function compactLockedRelationLabel(
  label: string
): string {`,
`function isLikelyTechnicalId(value: unknown): boolean {
  const text =
    String(value ?? "").trim();

  return /^[A-Za-z0-9_-]{16,}$/.test(text);
}

function compactLockedRelationLabel(
  label: string
): string {`
  );
}

/**
 * Ensure missing current relation option is still rendered in the select.
 */
field = field.replace(
`      const filteredOptions =
        filteredByContext.filter((option) =>
          option.label
            .toLowerCase()
            .includes(relationSearch.toLowerCase())
        );

      const lockedDisplayLabel =
        compactLockedRelationLabel(selectedLabel) ||
        selectedLabel;`,
`      const filteredOptions =
        filteredByContext.filter((option) =>
          option.label
            .toLowerCase()
            .includes(relationSearch.toLowerCase())
        );

      const currentOptionInFilteredList =
        filteredOptions.some((option) =>
          String(option.id) === String(currentValue)
        );

      const safeFilteredOptions =
        currentValue && !currentOptionInFilteredList
          ? [
              {
                id: String(currentValue),
                label:
                  selectedOption?.label && !isLikelyTechnicalId(selectedOption.label)
                    ? selectedOption.label
                    : "Relation actuelle conservée",
                record: selectedOption?.record,
              },
              ...filteredOptions,
            ]
          : filteredOptions;

      const lockedDisplayLabel =
        compactLockedRelationLabel(selectedLabel) ||
        selectedLabel;`
);

/**
 * Render safeFilteredOptions instead of filteredOptions.
 */
field = field.replace(
`            {filteredOptions.map((option) => (`,
`            {safeFilteredOptions.map((option) => (`
);

field = field.replaceAll(
  "Relation mÃ©tier sÃ©lectionnÃ©e",
  "Relation métier sélectionnée"
);
field = field.replaceAll(
  "Aucune relation renseignÃ©e",
  "Aucune relation renseignée"
);
field = field.replaceAll(
  "Relation mÃ©tier verrouillÃ©e",
  "Relation métier verrouillée"
);
field = field.replaceAll("SÃ©lectionner", "Sélectionner");
field = field.replaceAll("â€¢", "•");
field = field.replaceAll("dâ€™origine", "d’origine");
field = field.replaceAll("Ãªtre", "être");

write(fieldPath, field);

console.log("PASS 2N-K2 OK: edit dependent relation current value is preserved.");