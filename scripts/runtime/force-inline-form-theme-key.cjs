const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx"
);

let content = fs.readFileSync(target, "utf8");

/**
 * 1. Importer getWorkspaceThemeStyle si absent.
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
 * 2. Ajouter le helper si absent.
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
 * 3. Supprimer toutes les déclarations locales formThemeKey éventuelles.
 */
content = content.replace(
/\s+const formThemeKey\s*=\s*getERPEnterpriseFormThemeKey\(module\);/g,
""
);

/**
 * 4. Remplacer l’usage cassé par un appel inline.
 */
content = content.replaceAll(
  "style={getWorkspaceThemeStyle(formThemeKey)}",
  "style={getWorkspaceThemeStyle(getERPEnterpriseFormThemeKey(module))}"
);

content = content.replaceAll(
  'data-erp-form-theme={formThemeKey}',
  'data-erp-form-theme={getERPEnterpriseFormThemeKey(module)}'
);

/**
 * 5. Nettoyage mojibake léger.
 */
content = content
  .replaceAll("Validation métier", "Validation métier")
  .replaceAll("règles métier", "règles métier")
  .replaceAll("Action métier", "Action métier")
  .replaceAll("Suppression masquée", "Suppression masquée")
  .replaceAll("l'action métier", "l’action métier")
  .replaceAll("d'archivage", "d’archivage")
  .replaceAll("d'annulation", "d’annulation")
  .replaceAll("l'historique", "l’historique")
  .replaceAll(""¢", "•");

fs.writeFileSync(target, content, "utf8");

console.log("OK: form theme key inlined in ERPEnterpriseForm.tsx.");