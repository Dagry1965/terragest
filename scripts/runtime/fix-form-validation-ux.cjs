const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const formFieldPath = path.join(
  ROOT,
  "src/components/erp/forms/enterprise/ERPFormField.tsx"
);

const enterpriseFormPath = path.join(
  ROOT,
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx"
);

const formTabsPath = path.join(
  ROOT,
  "src/components/erp/forms/enterprise/ERPFormTabs.tsx"
);

function read(file) {
  if (!fs.existsSync(file)) {
    throw new Error(`File not found: ${file}`);
  }

  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function patchERPFormField() {
  let content = read(formFieldPath);
  const original = content;

  content = content.replace(
    `  onChange?: (key: string, value: unknown) => void;
}`,
    `  onChange?: (key: string, value: unknown) => void;
  error?: string;
}`
  );

  content = content.replace(
    `function FieldWrapper({
  field,
  children,
}: {
  field: ERPModuleField;
  children: ReactNode;
}) {`,
    `function FieldWrapper({
  field,
  children,
  error,
}: {
  field: ERPModuleField;
  children: ReactNode;
  error?: string;
}) {`
  );

  content = content.replace(
    `<div
      className={\``,
    `<div
      data-field-key={field.key}
      className={\``
  );

  content = content.replace(
    `      {field.helperText ? (
        <p className="text-xs text-slate-500">
          {field.helperText}
        </p>
      ) : null}
    </div>`,
    `      {field.helperText ? (
        <p className="text-xs text-slate-500">
          {field.helperText}
        </p>
      ) : null}

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
          {error}
        </p>
      ) : null}
    </div>`
  );

  content = content.replace(
    `export function ERPFormField({
  field,
  value,
  onChange,
}: ERPFormFieldProps) {`,
    `export function ERPFormField({
  field,
  value,
  onChange,
  error,
}: ERPFormFieldProps) {`
  );

  content = content.split(`<FieldWrapper field={field}>`).join(
    `<FieldWrapper field={field} error={error}>`
  );

  if (content !== original) {
    write(formFieldPath, content);
    console.log("OK ERPFormField : error prop + affichage erreur champ.");
  } else {
    console.log("NO CHANGE ERPFormField.");
  }
}

function patchERPEnterpriseForm() {
  let content = read(enterpriseFormPath);
  const original = content;

  content = content.replace(
    `import { useRef, useState } from "react";`,
    `import { useEffect, useRef, useState } from "react";`
  );

  if (!content.includes("const errorByField")) {
    content = content.replace(
      `  const relationFields =
    visibleFields.filter(
      (field) => field.type === "relation"
    );`,
      `  const relationFields =
    visibleFields.filter(
      (field) => field.type === "relation"
    );

  const errorByField =
    Object.fromEntries(
      errors.map((error) => [
        error.field,
        error.message,
      ])
    ) as Record<string, string>;`
    );
  }

  if (!content.includes("scrollIntoView")) {
    content = content.replace(
      `  function handleFieldChange(
    key: string,
    value: unknown
  ) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
  }`,
      `  function handleFieldChange(
    key: string,
    value: unknown
  ) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
  }

  useEffect(() => {
    if (errors.length === 0) {
      return;
    }

    const firstError =
      errors[0];

    if (!firstError?.field) {
      return;
    }

    const target =
      document.querySelector(
        \`[data-field-key="\${firstError.field}"]\`
      );

    target?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [errors]);`
    );
  }

  content = content.replace(
    `<ERPFormTabs
              module={module}
              initialData={formValues}
              formValues={formValues}
              onFieldChange={handleFieldChange}
            />`,
    `<ERPFormTabs
              module={module}
              initialData={formValues}
              formValues={formValues}
              onFieldChange={handleFieldChange}
              fieldErrors={errorByField}
            />`
  );

  content = content.replace(
    `                    value={formValues[field.key]}
                    onChange={handleFieldChange}
                  />`,
    `                    value={formValues[field.key]}
                    onChange={handleFieldChange}
                    error={errorByField[field.key]}
                  />`
  );

  content = content.replace(
    `                      value={formValues[field.key]}
                      onChange={handleFieldChange}
                    />`,
    `                      value={formValues[field.key]}
                      onChange={handleFieldChange}
                      error={errorByField[field.key]}
                    />`
  );

  content = content.replace(
    `                  Validation mÃ©tier`,
    `                  Validation métier`
  );

  content = content.replace(
    `                      â€¢ {error.field} : {error.message}`,
    `                      • {error.field} : {error.message}`
  );

  content = content.replace(
    `Associe cet Ã©lÃ©ment aux autres objets mÃ©tier.`,
    `Associe cet élément aux autres objets métier.`
  );

  if (content !== original) {
    write(enterpriseFormPath, content);
    console.log("OK ERPEnterpriseForm : errorByField + scroll première erreur.");
  } else {
    console.log("NO CHANGE ERPEnterpriseForm.");
  }
}

function patchERPFormTabs() {
  if (!fs.existsSync(formTabsPath)) {
    console.log("SKIP ERPFormTabs missing.");
    return;
  }

  let content = read(formTabsPath);
  const original = content;

  if (!content.includes("fieldErrors?: Record<string, string>;")) {
    content = content.replace(
      /(interface ERPFormTabsProps\s*{[\s\S]*?onFieldChange:\s*\(key:\s*string,\s*value:\s*unknown\)\s*=>\s*void;\s*)/,
      `$1  fieldErrors?: Record<string, string>;
`
    );
  }

  content = content.replace(
    /(export function ERPFormTabs\s*\(\s*{[\s\S]*?onFieldChange,)(\s*}\s*:\s*ERPFormTabsProps\s*\))/,
    `$1
  fieldErrors = {},$2`
  );

  content = content.replace(
    `                  value={formValues[field.key]}
                  onChange={onFieldChange}
                />`,
    `                  value={formValues[field.key]}
                  onChange={onFieldChange}
                  error={fieldErrors[field.key]}
                />`
  );

  content = content.replace(
    `                    value={formValues[field.key]}
                    onChange={onFieldChange}
                  />`,
    `                    value={formValues[field.key]}
                    onChange={onFieldChange}
                    error={fieldErrors[field.key]}
                  />`
  );

  if (content !== original) {
    write(formTabsPath, content);
    console.log("OK ERPFormTabs : fieldErrors transmis aux champs.");
  } else {
    console.log("NO CHANGE ERPFormTabs.");
  }
}

patchERPFormField();
patchERPEnterpriseForm();
patchERPFormTabs();

console.log("");
console.log("Done.");