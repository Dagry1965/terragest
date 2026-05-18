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

function addFormValuesPropToERPFormFieldCalls(filePath) {
  if (!fs.existsSync(path.join(root, filePath))) {
    return;
  }

  let content = read(filePath);

  content = content.replace(
    /<ERPFormField\n([\s\S]*?)\/>/g,
    (match, body) => {
      if (body.includes("formValues={formValues}")) {
        return match;
      }

      return `<ERPFormField\n                  formValues={formValues}\n${body}/>`;
    }
  );

  write(filePath, content);
}

const fieldPath =
  "src/components/erp/forms/enterprise/ERPFormField.tsx";

let field = read(fieldPath);

field = field.replace(
`  lockedFields?: string[];
}`,
`  lockedFields?: string[];
  formValues?: Record<string, unknown>;
}`
);

field = field.replace(
`  lockedFields = [],
}: ERPFormFieldProps) {`,
`  lockedFields = [],
  formValues = {},
}: ERPFormFieldProps) {`
);

const oldEffect = `  useEffect(() => {
    const filterConfig =
      getRelationFilterConfig(field);

    if (
      field.type !== "relation" ||
      !filterConfig?.sourceField
    ) {
      setRelationFilterSourceValue("");
      return;
    }

    const sourceField =
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
            );

      sourceElement?.addEventListener(
        "change",
      refreshRelationFilterSourceValue
      );

      sourceElement?.addEventListener(
        "input",
      refreshRelationFilterSourceValue
      );

      return () => {
        sourceElement?.removeEventListener(
          "change",
        refreshRelationFilterSourceValue
        );

        sourceElement?.removeEventListener(
          "input",
        refreshRelationFilterSourceValue
        );
      };
    }, [field]);`;

const newEffect = `  useEffect(() => {
    const filterConfig =
      getRelationFilterConfig(field);

    if (
      field.type !== "relation" ||
      !filterConfig?.sourceField
    ) {
      setRelationFilterSourceValue("");
      return;
    }

    const sourceField =
      filterConfig.sourceField;

    const sourceValue =
      formValues[sourceField] ??
      getCurrentFormValue(sourceField);

    setRelationFilterSourceValue(
      String(sourceValue ?? "")
    );
  }, [field, formValues]);`;

if (!field.includes(oldEffect)) {
  console.error("FAILED: dependent relation effect pattern not found in ERPFormField.tsx");
  process.exit(1);
}

field = field.replace(oldEffect, newEffect);

field = field.replaceAll("Relation mÃ©tier sÃ©lectionnÃ©e", "Relation métier sélectionnée");
field = field.replaceAll("Aucune relation renseignÃ©e", "Aucune relation renseignée");
field = field.replaceAll("Relation mÃ©tier verrouillÃ©e", "Relation métier verrouillée");
field = field.replaceAll("dâ€™origine", "d’origine");
field = field.replaceAll("Ãªtre", "être");
field = field.replaceAll("SÃ©lectionner", "Sélectionner");
field = field.replaceAll("â€¢", "•");

write(fieldPath, field);

addFormValuesPropToERPFormFieldCalls(
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx"
);

addFormValuesPropToERPFormFieldCalls(
  "src/components/erp/forms/enterprise/ERPFormTabs.tsx"
);

addFormValuesPropToERPFormFieldCalls(
  "src/components/erp/forms/enterprise/ERPFormSection.tsx"
);

console.log("PASS 2N-K OK: dependent relation fields now use React formValues state.");