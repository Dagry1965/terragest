const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPEnterpriseForm.tsx"
);

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function backup(file, suffix) {
  const backupPath = `${file}.bak-${suffix}`;

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(file, backupPath);
    console.log(`[BACKUP] ${path.relative(root, backupPath)}`);
  }
}

if (!fs.existsSync(target)) {
  throw new Error(`Fichier introuvable: ${target}`);
}

backup(target, "q20h4b-filter-status-options-v2");

let content = read(target);

if (content.includes("Q20H4B_STATUS_GOVERNANCE_FIELD_OPTIONS")) {
  console.log("[SKIP] Q20H4B v2 semble déjà appliqué.");
  process.exit(0);
}

const importAnchor = `import { RuntimeDataBinding } from "@/runtime/data-binding";`;

if (!content.includes(importAnchor)) {
  throw new Error("Import RuntimeDataBinding réel introuvable.");
}

if (!content.includes(`@/runtime/status`)) {
  content = content.replace(
    importAnchor,
    `${importAnchor}
import { RuntimeStatusGovernanceEngine } from "@/runtime/status";`
  );
}

const helperAnchor = `interface ERPEnterpriseFormProps`;

const helper = `function applyRuntimeStatusGovernanceToField(
  moduleKey: string,
  field: ERPModule["schema"]["fields"][number]
): ERPModule["schema"]["fields"][number] {
  // Q20H4B_STATUS_GOVERNANCE_FIELD_OPTIONS
  // La policy runtime filtre les statuts visibles sans changer la sauvegarde.
  if (field.key !== "statut" && field.key !== "status") {
    return field;
  }

  const visibleStatusKeys =
    RuntimeStatusGovernanceEngine.getVisibleStatusKeys(moduleKey);

  if (visibleStatusKeys.length === 0 || !Array.isArray(field.options)) {
    return field;
  }

  return {
    ...field,
    options: field.options.filter((option) =>
      visibleStatusKeys.includes(String(option.value))
    ),
  };
}

`;

if (!content.includes(helperAnchor)) {
  throw new Error("Point d'insertion interface ERPEnterpriseFormProps introuvable.");
}

content = content.replace(helperAnchor, helper + helperAnchor);

const visibleFieldsBlock = `  const visibleFields =
    form.fields.filter(
      (field) =>
        RuntimeVisibilityEngine.isVisible(
          field,
          formValues
        ) &&
        RuntimePermissionEngine.canAccessField(
          field,
          currentUserRole
        )
    );`;

if (!content.includes(visibleFieldsBlock)) {
  throw new Error("Bloc visibleFields avec permissions introuvable. Inspection manuelle nécessaire.");
}

const governedBlock = `  const visibleFields =
    form.fields
      .filter(
        (field) =>
          RuntimeVisibilityEngine.isVisible(
            field,
            formValues
          ) &&
          RuntimePermissionEngine.canAccessField(
            field,
            currentUserRole
          )
      )
      .map((field) =>
        applyRuntimeStatusGovernanceToField(
          module.metadata.key,
          field
        )
      );`;

content = content.replace(visibleFieldsBlock, governedBlock);

write(target, content);

console.log("");
console.log("[Q20H4B_V2_DONE] Options statut filtrées au niveau des fields visibles.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  tester /lignesinterventionauto/DEMO-LIGNE-001/edit");