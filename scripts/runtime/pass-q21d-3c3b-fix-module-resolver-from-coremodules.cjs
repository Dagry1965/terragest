const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const file = "src/components/erp/forms/enterprise/ERPFormField.tsx";
const full = path.join(ROOT, file);
const tag = "q21d3c3b-fix-module-resolver-from-coremodules";

const backup = `${full}.bak-${tag}`;

if (!fs.existsSync(backup)) {
  fs.copyFileSync(full, backup);
  console.log(`[BACKUP] ${file}.bak-${tag}`);
}

let content = fs.readFileSync(full, "utf8");

function replaceAll(search, replacement) {
  content = content.split(search).join(replacement);
}

function replaceOrFail(search, replacement, label) {
  if (!content.includes(search)) {
    throw new Error(`[MISSING] ${label}`);
  }
  content = content.replace(search, replacement);
}

/**
 * 1) Remplacer l'import inexistant getModule par coreERPModules.
 */
replaceAll(
  `import { getModule } from "@/runtime/modules/definitions/coreModules";`,
  `import { coreERPModules } from "@/runtime/modules/definitions/coreModules";`
);

/**
 * 2) Si l'import coreERPModules n'existe toujours pas, l'ajouter.
 */
if (!content.includes(`import { coreERPModules } from "@/runtime/modules/definitions/coreModules";`)) {
  replaceOrFail(
    `import type { ERPModuleField } from "@/runtime/modules";`,
    `import type { ERPModuleField } from "@/runtime/modules";
import { coreERPModules } from "@/runtime/modules/definitions/coreModules";`,
    "add coreERPModules import"
  );
}

/**
 * 3) Ajouter un resolver générique local si absent.
 */
if (!content.includes(`function resolveRuntimeModuleByKey`)) {
  replaceOrFail(
`function getRelationTargetModule(
  field: ERPModuleField
): string {
  return (
    field.references?.module ??
    (typeof field.relation === "string"
      ? field.relation
      : field.relation?.module) ??
    ""
  );
}
`,
`function getRelationTargetModule(
  field: ERPModuleField
): string {
  return (
    field.references?.module ??
    (typeof field.relation === "string"
      ? field.relation
      : field.relation?.module) ??
    ""
  );
}

function resolveRuntimeModuleByKey(moduleKey?: string) {
  if (!moduleKey) {
    return null;
  }

  return (
    coreERPModules.find((runtimeModule) => {
      const moduleRecord =
        runtimeModule as unknown as {
          key?: string;
          collection?: string;
          metadata?: {
            key?: string;
            collection?: string;
          };
        };

      return (
        moduleRecord.key === moduleKey ||
        moduleRecord.collection === moduleKey ||
        moduleRecord.metadata?.key === moduleKey ||
        moduleRecord.metadata?.collection === moduleKey
      );
    }) ?? null
  );
}
`,
    "add resolveRuntimeModuleByKey"
  );
}

/**
 * 4) Remplacer l'appel getModule() par le resolver générique.
 */
replaceAll(
  `getModule(excludeUsedBy.module)`,
  `resolveRuntimeModuleByKey(excludeUsedBy.module)`
);

fs.writeFileSync(full, content, "utf8");

console.log(`[WRITTEN] ${file}`);
console.log("[FIXED] excludeUsedBy.module now resolves from coreERPModules.");