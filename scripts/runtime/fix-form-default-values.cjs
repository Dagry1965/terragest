const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const target = path.join(
  ROOT,
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx"
);

if (!fs.existsSync(target)) {
  throw new Error(`File not found: ${target}`);
}

let content = fs.readFileSync(target, "utf8");
const original = content;

const oldBlock = `  const [saving, setSaving] = useState(false);

  const [errors, setErrors] =
    useState<RuntimeValidationError[]>([]);

  const [formValues, setFormValues] =
    useState<Record<string, unknown>>({
      ...initialData,
      ...queryValues,
    });

  const form =
    ERPModuleBuilder.buildForm(module);`;

const newBlock = `  const [saving, setSaving] = useState(false);

  const [errors, setErrors] =
    useState<RuntimeValidationError[]>([]);

  const form =
    ERPModuleBuilder.buildForm(module);

  function resolveInitialFormValues() {
    const defaultValues =
      Object.fromEntries(
        form.fields
          .filter(
            (field) =>
              field.defaultValue !== undefined
          )
          .map((field) => [
            field.key,
            field.defaultValue,
          ])
      );

    if (mode === "create") {
      return {
        ...defaultValues,
        ...initialData,
        ...queryValues,
      };
    }

    return {
      ...initialData,
      ...queryValues,
    };
  }

  const [formValues, setFormValues] =
    useState<Record<string, unknown>>(
      () => resolveInitialFormValues()
    );`;

if (!content.includes(oldBlock)) {
  throw new Error("Bloc initialisation formValues non trouvé.");
}

content = content.replace(oldBlock, newBlock);

if (content === original) {
  throw new Error("Aucune modification appliquée.");
}

fs.writeFileSync(target, content, "utf8");

console.log("OK defaultValue appliqué en mode create dans ERPEnterpriseForm.");
console.log("Fichier modifié :", path.relative(ROOT, target));