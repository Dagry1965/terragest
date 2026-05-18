const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(
  root,
  "src/components/erp/forms/enterprise/ERPFormField.tsx"
);

let content = fs.readFileSync(target, "utf8");

if (!content.includes("const safeFilteredOptions =")) {
  content = content.replace(
`      const lockedDisplayLabel =
        compactLockedRelationLabel(selectedLabel) ||
        selectedLabel;

      if (isLocked) {`,
`      const currentOptionInFilteredList =
        filteredOptions.some((option) =>
          String(option.id) === String(currentValue)
        );

      const safeFilteredOptions =
        currentValue && !currentOptionInFilteredList
          ? [
              {
                id: String(currentValue),
                label:
                  selectedOption?.label &&
                  !isLikelyTechnicalId(selectedOption.label)
                    ? selectedOption.label
                    : "Relation actuelle conservée",
                record: selectedOption?.record,
              },
              ...filteredOptions,
            ]
          : filteredOptions;

      const lockedDisplayLabel =
        compactLockedRelationLabel(selectedLabel) ||
        selectedLabel;

      if (isLocked) {`
  );
}

if (!content.includes("function isLikelyTechnicalId(")) {
  content = content.replace(
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

content = content.replaceAll("Relation mÃ©tier sÃ©lectionnÃ©e", "Relation métier sélectionnée");
content = content.replaceAll("Aucune relation renseignÃ©e", "Aucune relation renseignée");
content = content.replaceAll("Relation mÃ©tier verrouillÃ©e", "Relation métier verrouillée");
content = content.replaceAll("SÃ©lectionner", "Sélectionner");
content = content.replaceAll("â€¢", "•");
content = content.replaceAll("dâ€™origine", "d’origine");
content = content.replaceAll("Ãªtre", "être");

fs.writeFileSync(target, content, "utf8");

console.log("OK: safeFilteredOptions fallback inserted.");