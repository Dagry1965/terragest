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

const before = content;

content = content.replace(
  `    function refreshRelationFilterSourceValue() {
      setRelationFilterSourceValue(
        getCurrentFormValue(filterConfig.sourceField ?? "")
      );
    }

    refreshRelationFilterSourceValue();

    const sourceElement =
      typeof document === "undefined"
        ? null
        : document.querySelector(
            \`[name="\${filterConfig.sourceField}"]\`
          );`,
  `    const sourceField =
      filterConfig.sourceField;

    function refreshRelationFilterSourceValue() {
      setRelationFilterSourceValue(
        getCurrentFormValue(sourceField)
      );
    }

    refreshRelationFilterSourceValue();

    const sourceElement =
      typeof document === "undefined"
        ? null
        : document.querySelector(
            \`[name="\${sourceField}"]\`
          );`
);

if (content === before) {
  console.log("NO CHANGE");
  console.log("Inspect the block around line 370:");
  console.log('Get-Content ".\\\\src\\\\components\\\\erp\\\\forms\\\\enterprise\\\\ERPFormField.tsx" | Select-Object -Skip 360 -First 70');
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED src/components/erp/forms/enterprise/ERPFormField.tsx");
console.log("DONE fix dependent relation filter null guard");