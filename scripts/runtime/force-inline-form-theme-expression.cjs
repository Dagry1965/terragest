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
if (!content.includes('from "@/runtime/theme"')) {
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
 * 2. Supprimer helper incomplet éventuel.
 */
content = content.replace(
/function getERPEnterpriseFormThemeKey\([\s\S]*?\n\}/g,
""
);

/**
 * 3. Supprimer variable locale éventuelle.
 */
content = content.replace(
/\s+const formThemeKey\s*=\s*getERPEnterpriseFormThemeKey\(module\);/g,
""
);

/**
 * 4. Remplacer tous les usages par une expression inline autonome.
 */
const themeExpression =
`module.metadata.category === "amarkhys" ||
          module.metadata.key.endsWith("auto")
            ? "amarkhys-petronas"
            : module.metadata.category === "production" ||
                module.metadata.category === "agri"
              ? "agri-enterprise"
              : "default-enterprise"`;

content = content.replaceAll(
  "style={getWorkspaceThemeStyle(getERPEnterpriseFormThemeKey(module))}",
  `style={getWorkspaceThemeStyle(
          ${themeExpression}
        )}`
);

content = content.replaceAll(
  "style={getWorkspaceThemeStyle(formThemeKey)}",
  `style={getWorkspaceThemeStyle(
          ${themeExpression}
        )}`
);

content = content.replaceAll(
  "data-erp-form-theme={getERPEnterpriseFormThemeKey(module)}",
  `data-erp-form-theme={
          ${themeExpression}
        }`
);

content = content.replaceAll(
  "data-erp-form-theme={formThemeKey}",
  `data-erp-form-theme={
          ${themeExpression}
        }`
);

/**
 * 5. Vérification bloquante.
 */
if (
  content.includes("formThemeKey") ||
  content.includes("getERPEnterpriseFormThemeKey")
) {
  console.error("FAILED: stale form theme references still found.");
  process.exit(1);
}

fs.writeFileSync(target, content, "utf8");

console.log("OK: form theme expression inlined without helper.");