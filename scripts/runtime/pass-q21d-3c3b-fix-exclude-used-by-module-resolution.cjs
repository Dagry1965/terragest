const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const file = "src/components/erp/forms/enterprise/ERPFormField.tsx";
const full = path.join(ROOT, file);
const tag = "q21d3c3b-fix-module-resolution";

const backup = `${full}.bak-${tag}`;

if (!fs.existsSync(backup)) {
  fs.copyFileSync(full, backup);
  console.log(`[BACKUP] ${file}.bak-${tag}`);
}

let content = fs.readFileSync(full, "utf8");

function replaceOrFail(search, replacement, label) {
  if (!content.includes(search)) {
    throw new Error(`[MISSING] ${label}`);
  }

  content = content.replace(search, replacement);
}

if (!content.includes(`getModule`)) {
  replaceOrFail(
    `import type { ERPModuleField } from "@/runtime/modules";`,
    `import type { ERPModuleField } from "@/runtime/modules";
import { getModule } from "@/runtime/modules/definitions/coreModules";`,
    "add getModule import"
  );
}

replaceOrFail(
`      try {
        const usedRecords =
          await RuntimeDataBinding.list(excludeUsedBy.module);

        setRelationUsedRecords(
          Array.isArray(usedRecords)
            ? usedRecords as Record<string, unknown>[]
            : []
        );
      } catch (error) {`,
`      try {
        const excludeUsedByModule =
          getModule(excludeUsedBy.module);

        if (!excludeUsedByModule) {
          setRelationUsedRecords([]);
          return;
        }

        const usedRecords =
          await RuntimeDataBinding.list(excludeUsedByModule);

        setRelationUsedRecords(
          Array.isArray(usedRecords)
            ? usedRecords as Record<string, unknown>[]
            : []
        );
      } catch (error) {`,
  "resolve excludeUsedBy.module before RuntimeDataBinding.list"
);

fs.writeFileSync(full, content, "utf8");

console.log(`[WRITTEN] ${file}`);
console.log("[Q21D_3C3B_FIX] excludeUsedBy.module now resolves to ERPModule before RuntimeDataBinding.list().");