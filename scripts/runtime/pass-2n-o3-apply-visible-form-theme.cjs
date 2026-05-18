const fs = require("fs");
const path = require("path");

const root = process.cwd();

function file(filePath) {
  return path.join(root, filePath);
}

function read(filePath) {
  return fs.readFileSync(file(filePath), "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(file(filePath), content, "utf8");
  console.log("UPDATED", filePath);
}

function ensureImport(content, importLine) {
  if (content.includes(importLine)) {
    return content;
  }

  const firstImportEnd =
    content.lastIndexOf("import ");

  if (firstImportEnd === -1) {
    return importLine + "\n\n" + content;
  }

  const lines =
    content.split("\n");

  let lastImportLineIndex = 0;

  for (let index = 0; index < lines.length; index += 1) {
    if (
      lines[index].startsWith("import ") ||
      lines[index].startsWith("} from ") ||
      lines[index].startsWith("} from")
    ) {
      lastImportLineIndex = index;
    }
  }

  lines.splice(lastImportLineIndex + 1, 0, importLine);

  return lines.join("\n");
}

/**
 * 1. ERPEnterpriseForm : applique les variables CSS du thème au formulaire.
 */
const enterpriseFormPath =
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";

let enterpriseForm = read(enterpriseFormPath);

enterpriseForm = ensureImport(
  enterpriseForm,
  `import {
  getWorkspaceThemeStyle,
} from "@/runtime/theme";`
);

if (!enterpriseForm.includes("function getERPEnterpriseFormThemeKey(")) {
  enterpriseForm = enterpriseForm.replace(
`interface ERPEnterpriseFormProps {
  module: ERPModule;
  mode?: "create" | "edit";
  initialData?: Record<string, unknown>;
  workflowActions?: ERPModuleAction[];
}`,
`interface ERPEnterpriseFormProps {
  module: ERPModule;
  mode?: "create" | "edit";
  initialData?: Record<string, unknown>;
  workflowActions?: ERPModuleAction[];
}

function getERPEnterpriseFormThemeKey(
  module: ERPModule
): string {
  if (
    module.metadata.category === "amarkhys" ||
    module.metadata.key.endsWith("auto")
  ) {
    return "amarkhys-petronas";
  }

  if (
    module.metadata.category === "production" ||
    module.metadata.category === "agri"
  ) {
    return "agri-enterprise";
  }

  return "default-enterprise";
}`
  );
}

if (!enterpriseForm.includes("const formThemeKey =")) {
  enterpriseForm = enterpriseForm.replace(
`    const form =
      ERPModuleBuilder.buildForm(module);`,
`    const form =
      ERPModuleBuilder.buildForm(module);

    const formThemeKey =
      getERPEnterpriseFormThemeKey(module);`
  );
}

enterpriseForm = enterpriseForm.replace(
`      <form
        ref={formRef}
        className="space-y-8"
        onSubmit={handleSubmit}
      >`,
`      <form
        ref={formRef}
        style={getWorkspaceThemeStyle(formThemeKey)}
        className="
          space-y-8
          rounded-[2rem]
          border
          border-[var(--erp-border)]
          bg-[var(--erp-bg-soft)]
          p-4
          shadow-[0_24px_70px_rgba(15,23,42,0.10)]
          md:p-6
        "
        data-erp-form-theme={formThemeKey}
        onSubmit={handleSubmit}
      >`
);

enterpriseForm = enterpriseForm
  .replaceAll("border-slate-200 bg-white", "border-[var(--erp-border)] bg-[var(--erp-surface)]")
  .replaceAll("border-slate-200 bg-slate-50", "border-[var(--erp-border)] bg-[var(--erp-surface-muted)]")
  .replaceAll("text-slate-950", "text-[var(--erp-text)]")
  .replaceAll("text-slate-600", "text-[var(--erp-text-muted)]")
  .replaceAll("bg-emerald-600", "bg-[var(--erp-primary)]")
  .replaceAll("hover:bg-emerald-500", "hover:brightness-110")
  .replaceAll("border-emerald-300/30", "border-[var(--erp-border-strong)]")
  .replaceAll("bg-emerald-500/10", "bg-[var(--erp-primary-soft)]")
  .replaceAll("text-emerald-300", "text-[var(--erp-secondary)]")
  .replaceAll("text-emerald-700", "text-[var(--erp-primary)]");

enterpriseForm = enterpriseForm
  .replaceAll("Validation mÃ©tier", "Validation métier")
  .replaceAll("rÃ¨gles mÃ©tier", "règles métier")
  .replaceAll("Action mÃ©tier", "Action métier")
  .replaceAll("Suppression masquÃ©e", "Suppression masquée")
  .replaceAll("lâ€™action mÃ©tier", "l’action métier")
  .replaceAll("dâ€™archivage", "d’archivage")
  .replaceAll("dâ€™annulation", "d’annulation")
  .replaceAll("lâ€™historique", "l’historique")
  .replaceAll("â€¢", "•");

write(enterpriseFormPath, enterpriseForm);

/**
 * 2. ERPFormField : champs avec focus PETRONAS via variables CSS.
 */
const formFieldPath =
  "src/components/erp/forms/enterprise/ERPFormField.tsx";

let formField = read(formFieldPath);

formField = formField
  .replaceAll("border-slate-300", "border-[var(--erp-border)]")
  .replaceAll("focus:border-emerald-500", "focus:border-[var(--erp-primary)]")
  .replaceAll("focus:ring-emerald-500", "focus:ring-[var(--erp-primary)]")
  .replaceAll("bg-white", "bg-[var(--erp-surface)]")
  .replaceAll("text-slate-950", "text-[var(--erp-text)]")
  .replaceAll("text-slate-700", "text-[var(--erp-text)]")
  .replaceAll("text-slate-500", "text-[var(--erp-text-muted)]")
  .replaceAll("border-emerald-200 bg-emerald-50", "border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)]")
  .replaceAll("text-emerald-700", "text-[var(--erp-primary)]")
  .replaceAll("rounded-2xl", "rounded-[1.35rem]");

if (!formField.includes("shadow-[0_10px_30px_rgba(15,23,42,0.06)]")) {
  formField = formField.replaceAll(
    "px-4\n                py-3",
    "px-4\n                py-3\n                shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
  );

  formField = formField.replaceAll(
    "px-4\n            py-3",
    "px-4\n            py-3\n            shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
  );
}

formField = formField
  .replaceAll("Relation mÃ©tier sÃ©lectionnÃ©e", "Relation métier sélectionnée")
  .replaceAll("Aucune relation renseignÃ©e", "Aucune relation renseignée")
  .replaceAll("Relation mÃ©tier verrouillÃ©e", "Relation métier verrouillée")
  .replaceAll("SÃ©lectionner", "Sélectionner")
  .replaceAll("dâ€™origine", "d’origine")
  .replaceAll("Ãªtre", "être")
  .replaceAll("â€¢", "•");

write(formFieldPath, formField);

/**
 * 3. ERPFormSection : cartes de sections plus premium si le fichier existe.
 */
const formSectionPath =
  "src/components/erp/forms/enterprise/ERPFormSection.tsx";

if (fs.existsSync(file(formSectionPath))) {
  let formSection = read(formSectionPath);

  formSection = formSection
    .replaceAll("border-slate-200 bg-white", "border-[var(--erp-border)] bg-[var(--erp-surface)]")
    .replaceAll("border-slate-200 bg-slate-50", "border-[var(--erp-border)] bg-[var(--erp-surface-muted)]")
    .replaceAll("text-slate-950", "text-[var(--erp-text)]")
    .replaceAll("text-slate-600", "text-[var(--erp-text-muted)]")
    .replaceAll("rounded-3xl", "rounded-[2rem]")
    .replaceAll("shadow-sm", "shadow-[0_22px_55px_rgba(15,23,42,0.08)]");

  write(formSectionPath, formSection);
}

/**
 * 4. ERPFormTabs : tabs actives avec gradient PETRONAS si le fichier existe.
 */
const formTabsPath =
  "src/components/erp/forms/enterprise/ERPFormTabs.tsx";

if (fs.existsSync(file(formTabsPath))) {
  let formTabs = read(formTabsPath);

  formTabs = formTabs
    .replaceAll("border-slate-200 bg-white", "border-[var(--erp-border)] bg-[var(--erp-surface)]")
    .replaceAll("bg-emerald-600", "bg-[var(--erp-primary)]")
    .replaceAll("text-emerald-700", "text-[var(--erp-primary)]")
    .replaceAll("border-emerald-200", "border-[var(--erp-border-strong)]")
    .replaceAll("bg-emerald-50", "bg-[var(--erp-primary-soft)]")
    .replaceAll("text-slate-950", "text-[var(--erp-text)]")
    .replaceAll("text-slate-600", "text-[var(--erp-text-muted)]")
    .replaceAll("rounded-2xl", "rounded-[1.35rem]")
    .replaceAll("rounded-3xl", "rounded-[2rem]");

  write(formTabsPath, formTabs);
}

console.log("PASS 2N-O3 OK: visible workspace form theme applied.");