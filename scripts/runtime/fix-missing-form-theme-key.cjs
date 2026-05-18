const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx"
);

let content = fs.readFileSync(target, "utf8");

/**
 * 1. Vérifier import getWorkspaceThemeStyle.
 */
if (!content.includes("getWorkspaceThemeStyle")) {
  content = content.replace(
`import type {
  ERPModuleAction,
} from "@/runtime/modules/ERPModule";`,
`import type {
  ERPModuleAction,
} from "@/runtime/modules/ERPModule";

import {
  getWorkspaceThemeStyle,
} from "@/runtime/theme";`
  );
}

/**
 * 2. Ajouter helper de résolution thème si absent.
 */
if (!content.includes("function getERPEnterpriseFormThemeKey(")) {
  content = content.replace(
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

/**
 * 3. Ajouter formThemeKey dans le composant.
 */
if (!content.includes("const formThemeKey =")) {
  const marker = `    const form =
      ERPModuleBuilder.buildForm(module);`;

  if (!content.includes(marker)) {
    console.error("FAILED: form marker not found.");
    process.exit(1);
  }

  content = content.replace(
    marker,
`    const form =
      ERPModuleBuilder.buildForm(module);

    const formThemeKey =
      getERPEnterpriseFormThemeKey(module);`
  );
}

/**
 * 4. Nettoyer doubles insertions éventuelles.
 */
content = content.replaceAll(
`    const form =
      ERPModuleBuilder.buildForm(module);

    const formThemeKey =
      getERPEnterpriseFormThemeKey(module);

    const formThemeKey =
      getERPEnterpriseFormThemeKey(module);`,
`    const form =
      ERPModuleBuilder.buildForm(module);

    const formThemeKey =
      getERPEnterpriseFormThemeKey(module);`
);

fs.writeFileSync(target, content, "utf8");

console.log("OK: formThemeKey fixed in ERPEnterpriseForm.tsx.");