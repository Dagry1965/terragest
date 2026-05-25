const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22d3b-pass-module-to-form-field";

const formFieldFile =
  "src/components/erp/forms/enterprise/ERPFormField.tsx";

const formTabsFile =
  "src/components/erp/forms/enterprise/ERPFormTabs.tsx";

function full(p) {
  return path.join(ROOT, p);
}

function backup(p) {
  const target = full(p);
  const backupPath = `${target}.bak-${TAG}`;

  if (!fs.existsSync(target)) {
    throw new Error(`[MISSING] ${p}`);
  }

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(target, backupPath);
    console.log(`[BACKUP] ${p}.bak-${TAG}`);
  }
}

function write(p, content) {
  fs.writeFileSync(full(p), content, "utf8");
  console.log(`[WRITTEN] ${p}`);
}

backup(formFieldFile);
backup(formTabsFile);

let formField = fs.readFileSync(full(formFieldFile), "utf8");

if (!formField.includes("import type { ERPModule }")) {
  formField = formField.replace(
    `import type { ERPModuleField } from "@/runtime/modules";`,
    `import type { ERPModule, ERPModuleField } from "@/runtime/modules";`
  );
}

if (!formField.includes("module?: ERPModule;")) {
  formField = formField.replace(
    `interface ERPFormFieldProps {
  field: ERPModuleField;`,
    `interface ERPFormFieldProps {
  module?: ERPModule;
  field: ERPModuleField;`
  );
}

if (!formField.includes("module,")) {
  formField = formField.replace(
    `export function ERPFormField({
  field,`,
    `export function ERPFormField({
  module,
  field,`
  );
}

if (!formField.includes("Q22D3B_MODULE_CONTEXT_READY")) {
  formField = formField.replace(
    `  const currentValue = normalizeFormFieldValue(field, value);`,
    `  // Q22D3B_MODULE_CONTEXT_READY
  // ERPFormField can now receive the module context for generic runtime capabilities.
  // Scheduling UI will consume module.scheduling in the next pass.
  const schedulingConfig = module?.scheduling;

  const currentValue = normalizeFormFieldValue(field, value);`
  );
}

write(formFieldFile, formField);

let formTabs = fs.readFileSync(full(formTabsFile), "utf8");

if (!formTabs.includes("module={module}")) {
  formTabs = formTabs.replaceAll(
    `<ERPFormField
                        key={field.key}`,
    `<ERPFormField
                        key={field.key}
                        module={module}`
  );

  formTabs = formTabs.replaceAll(
    `<ERPFormField
                        key={field.key}`,
    `<ERPFormField
                        key={field.key}
                        module={module}`
  );

  formTabs = formTabs.replaceAll(
    `<ERPFormField
                        key={field.key}`,
    `<ERPFormField
                        key={field.key}
                        module={module}`
  );

  formTabs = formTabs.replaceAll(
    `<ERPFormField
                        key={field.key}`,
    `<ERPFormField
                        key={field.key}
                        module={module}`
  );
}

if (!formTabs.includes("Q22D3B_MODULE_CONTEXT_TO_FIELD")) {
  formTabs = formTabs.replace(
    `interface ERPFormTabsProps {`,
    `// Q22D3B_MODULE_CONTEXT_TO_FIELD
// ERPFormTabs forwards module context to ERPFormField for generic runtime capabilities.
interface ERPFormTabsProps {`
  );
}

write(formTabsFile, formTabs);

console.log("");
console.log("[Q22D3B_DONE] Module context is passed to ERPFormField.");
console.log("");
console.log("Next:");
console.log("  pnpm build");