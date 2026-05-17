const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPFormField.tsx"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");

if (!content.includes("function compactLockedRelationLabel(")) {
  content = content.replace(
    `function FieldWrapper({`,
    `function compactLockedRelationLabel(
  label: string
): string {
  const value =
    String(label || "").trim();

  if (!value) {
    return "";
  }

  return value
    .split("•")[0]
    .trim();
}

function FieldWrapper({`
  );
}

if (!content.includes("const lockedDisplayLabel =")) {
  content = content.replace(
    `    const filteredOptions =
      relationOptions.filter((option) =>
        option.label
          .toLowerCase()
          .includes(relationSearch.toLowerCase())
      );

    if (isLocked) {`,
    `    const filteredOptions =
      relationOptions.filter((option) =>
        option.label
          .toLowerCase()
          .includes(relationSearch.toLowerCase())
      );

    const lockedDisplayLabel =
      compactLockedRelationLabel(selectedLabel) ||
      selectedLabel;

    if (isLocked) {`
  );
}

content = content.replaceAll(
  `{selectedLabel}`,
  `{lockedDisplayLabel}`
);

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED src/components/erp/forms/enterprise/ERPFormField.tsx");
console.log("DONE locked relation display first label part");