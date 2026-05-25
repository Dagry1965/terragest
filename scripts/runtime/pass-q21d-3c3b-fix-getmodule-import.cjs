const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const file = "src/components/erp/forms/enterprise/ERPFormField.tsx";
const full = path.join(ROOT, file);
const tag = "q21d3c3b-fix-getmodule-import";

const backup = `${full}.bak-${tag}`;

if (!fs.existsSync(backup)) {
  fs.copyFileSync(full, backup);
  console.log(`[BACKUP] ${file}.bak-${tag}`);
}

let content = fs.readFileSync(full, "utf8");

const importLine =
  `import { getModule } from "@/runtime/modules/definitions/coreModules";`;

if (content.includes(importLine)) {
  console.log("[SKIP] getModule import already present.");
} else {
  const anchor =
    `import type { ERPModuleField } from "@/runtime/modules";`;

  if (!content.includes(anchor)) {
    throw new Error("[MISSING] ERPModuleField import anchor");
  }

  content = content.replace(
    anchor,
    `${anchor}
${importLine}`
  );

  fs.writeFileSync(full, content, "utf8");
  console.log(`[WRITTEN] ${file}`);
  console.log("[FIXED] getModule import added.");
}