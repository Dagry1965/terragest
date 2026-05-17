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
  "ERPEnterpriseForm.tsx"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");
const before = content;

/**
 * 1) Force import RuntimeUniqueConstraintEngine.
 */
if (!content.includes("@/runtime/validation/RuntimeUniqueConstraintEngine")) {
  const importAnchor = `import {
  RuntimeValidationEngine,
} from "@/runtime/validation/RuntimeValidationEngine";`;

  if (content.includes(importAnchor)) {
    content = content.replace(
      importAnchor,
      `${importAnchor}

import {
  RuntimeUniqueConstraintEngine,
} from "@/runtime/validation/RuntimeUniqueConstraintEngine";`
    );
  } else {
    const firstInterfaceIndex =
      content.indexOf("interface ");

    if (firstInterfaceIndex === -1) {
      console.error("Cannot find import insertion point.");
      process.exit(1);
    }

    content =
      content.slice(0, firstInterfaceIndex) +
      `import {
  RuntimeUniqueConstraintEngine,
} from "@/runtime/validation/RuntimeUniqueConstraintEngine";

` +
      content.slice(firstInterfaceIndex);
  }
}

/**
 * 2) Replace the validation block before business rules.
 */
if (!content.includes("uniqueConstraintErrors")) {
  const validationRegex =
    /const validationErrors\s*=\s*RuntimeValidationEngine\.validate\(\s*module,\s*preparedPayload\s*\);\s*setErrors\(validationErrors\);\s*if\s*\(\s*validationErrors\.length\s*>\s*0\s*\)\s*\{\s*pendingWorkflowActionRef\.current\s*=\s*null;\s*setSaving\(false\);\s*return;\s*\}/m;

  const replacement = `const validationErrors =
      RuntimeValidationEngine.validate(
        module,
        preparedPayload
      );

    const currentRecordId =
      mode === "edit"
        ? String(
            initialData.id ??
              initialData._id ??
              preparedPayload.id ??
              preparedPayload._id ??
              ""
          )
        : "";

    const uniqueConstraintErrors =
      await RuntimeUniqueConstraintEngine.validate(
        module,
        preparedPayload,
        currentRecordId
      );

    const allValidationErrors = [
      ...validationErrors,
      ...uniqueConstraintErrors,
    ];

    setErrors(allValidationErrors);

    if (allValidationErrors.length > 0) {
      pendingWorkflowActionRef.current = null;
      setSaving(false);
      return;
    }`;

  content = content.replace(
    validationRegex,
    replacement
  );
}

content = content.replaceAll(
  "Les rÃ¨gles mÃ©tier ERP bloquent cet enregistrement.",
  "Les règles métier ERP bloquent cet enregistrement."
);

if (content === before) {
  console.log("NO CHANGE");
  console.log("Show validation area:");
  console.log('Get-Content ".\\\\src\\\\components\\\\erp\\\\forms\\\\enterprise\\\\ERPEnterpriseForm.tsx" | Select-Object -Skip 500 -First 90');
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx");
console.log("DONE force wire unique constraint in form");