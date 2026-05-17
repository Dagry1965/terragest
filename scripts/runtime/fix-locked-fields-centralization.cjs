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

function patchFormField() {
  let content = read(formFieldPath);
  const original = content;

  if (!content.includes("lockedFields?: string[];")) {
    content = content.replace(
      `  error?: string;
}`,
      `  error?: string;
  lockedFields?: string[];
}`
    );
  }

  content = content.replace(
    `export function ERPFormField({
  field,
  value,
  onChange,
  error,
}: ERPFormFieldProps) {`,
    `export function ERPFormField({
  field,
  value,
  onChange,
  error,
  lockedFields = [],
}: ERPFormFieldProps) {`
  );

  const oldLockBlock = `  const lockedFields =
    typeof window === "undefined"
      ? []
      : new URLSearchParams(window.location.search)
          .get("lockFields")
          ?.split(",")
          .map((item) => item.trim())
          .filter(Boolean) ?? [];

  const isLocked =
    lockedFields.includes(field.key);`;

  const newLockBlock = `  const isLocked =
    lockedFields.includes(field.key);`;

  if (content.includes(oldLockBlock)) {
    content = content.replace(oldLockBlock, newLockBlock);
  }

  if (content !== original) {
    write(formFieldPath, content);
    console.log("OK ERPFormField : lockedFields centralisé via props.");
  } else {
    console.log("NO CHANGE ERPFormField.");
  }
}

function patchEnterpriseForm() {
  let content = read(enterpriseFormPath);
  const original = content;

  if (!content.includes("const lockedFields =")) {
    content = content.replace(
      `  const queryValues =
    Object.fromEntries(
      Array.from(searchParams.entries()).filter(
        ([key]) =>
          key !== "returnTo" &&
          key !== "lockFields"
      )
    );`,
      `  const queryValues =
    Object.fromEntries(
      Array.from(searchParams.entries()).filter(
        ([key]) =>
          key !== "returnTo" &&
          key !== "lockFields"
      )
    );

  const lockedFields =
    searchParams
      .get("lockFields")
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) ?? [];`
    );
  }

  content = content.replace(
    `              fieldErrors={errorByField}
            />`,
    `              fieldErrors={errorByField}
              lockedFields={lockedFields}
            />`
  );

  content = content.replace(
    `                    error={errorByField[field.key]}
                  />`,
    `                    error={errorByField[field.key]}
                    lockedFields={lockedFields}
                  />`
  );

  content = content.replace(
    `                      error={errorByField[field.key]}
                    />`,
    `                      error={errorByField[field.key]}
                      lockedFields={lockedFields}
                    />`
  );

  if (content !== original) {
    write(enterpriseFormPath, content);
    console.log("OK ERPEnterpriseForm : lockedFields lu une fois et transmis.");
  } else {
    console.log("NO CHANGE ERPEnterpriseForm.");
  }
}

function patchFormTabs() {
  let content = read(formTabsPath);
  const original = content;

  if (!content.includes("lockedFields?: string[];")) {
    content = content.replace(
      `  fieldErrors?: Record<string, string>;
}`,
      `  fieldErrors?: Record<string, string>;
  lockedFields?: string[];
}`
    );
  }

  if (!content.includes("lockedFields = []")) {
    content = content.replace(
      `  fieldErrors = {},
}: ERPFormTabsProps) {`,
      `  fieldErrors = {},
  lockedFields = [],
}: ERPFormTabsProps) {`
    );
  }

  content = content.replace(
    `                        error={fieldErrors[field.key]}
                      />`,
    `                        error={fieldErrors[field.key]}
                        lockedFields={lockedFields}
                      />`
  );

  content = content.replace(
    `                  error={fieldErrors[field.key]}
                />`,
    `                  error={fieldErrors[field.key]}
                  lockedFields={lockedFields}
                />`
  );

  if (content !== original) {
    write(formTabsPath, content);
    console.log("OK ERPFormTabs : lockedFields transmis aux champs.");
  } else {
    console.log("NO CHANGE ERPFormTabs.");
  }
}

patchFormField();
patchEnterpriseForm();
patchFormTabs();

console.log("");
console.log("Done.");