const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(
  root,
  "src/components/erp/forms/enterprise/ERPFormField.tsx"
);

let content = fs.readFileSync(target, "utf8");

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

if (!content.includes("const safeFilteredOptions =")) {
  const marker = "const filteredOptions =";
  const start = content.indexOf(marker);

  if (start === -1) {
    console.error("FAILED: const filteredOptions not found.");
    process.exit(1);
  }

  const afterStart = content.indexOf(");", start);

  if (afterStart === -1) {
    console.error("FAILED: end of filteredOptions declaration not found.");
    process.exit(1);
  }

  const insertAt = afterStart + 2;

  const insertion = `

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
                  selectedOption?.label &&
                  !isLikelyTechnicalId(selectedOption.label)
                    ? selectedOption.label
                    : "Relation actuelle conservée",
                record: selectedOption?.record,
              },
              ...filteredOptions,
            ]
          : filteredOptions;
`;

  content =
    content.slice(0, insertAt) +
    insertion +
    content.slice(insertAt);
}

content = content.replaceAll("Relation métier sélectionnée", "Relation métier sélectionnée");
content = content.replaceAll("Aucune relation renseignée", "Aucune relation renseignée");
content = content.replaceAll("Relation métier verrouillée", "Relation métier verrouillée");
content = content.replaceAll("Sélectionner", "Sélectionner");
content = content.replaceAll(""¢", "•");
content = content.replaceAll("d'origine", "d’origine");
content = content.replaceAll("être", "être");

fs.writeFileSync(target, content, "utf8");

console.log("OK: safeFilteredOptions inserted after filteredOptions.");