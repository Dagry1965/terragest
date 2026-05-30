const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/runtime/ERPRuntimePage.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-i12b1-fix-runtime-action-bar-mapper`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

// Replace direct optional property reads inside the mapper.
source = source.replace(
  /const key = String\(action\.key \?\? action\.label \?\? ""\);/,
  `const runtimeAction = action as ERPRuntimePageActionSource;

      const key = String(runtimeAction.key ?? runtimeAction.label ?? "");`
);

source = source.replace(
  /const label = String\(action\.label \?\? key\);/,
  `const label = String(runtimeAction.label ?? key);`
);

source = source
  .replace(/action\.href/g, "runtimeAction.href")
  .replace(/action\.disabled/g, "runtimeAction.disabled")
  .replace(/action\.variant/g, "runtimeAction.variant")
  .replace(/action\.description/g, "runtimeAction.description");

// Validation.
const required = [
  "type ERPRuntimePageActionSource = ERPModuleAction &",
  "const runtimeAction = action as ERPRuntimePageActionSource;",
  "runtimeAction.href",
  "runtimeAction.disabled",
  "runtimeAction.variant",
  "runtimeAction.description",
];

for (const marker of required) {
  if (!source.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

const forbidden = [
  "action.href",
  "action.disabled",
  "action.variant",
  "action.description",
];

for (const marker of forbidden) {
  if (source.includes(marker)) {
    console.error("[PATCH_FAILED] Forbidden marker remains:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OP-I12-B1] Runtime action bar mapper fixed.");
console.log("Next:");
console.log('  Select-String -Path ".\\\\src\\\\components\\\\erp\\\\runtime\\\\ERPRuntimePage.tsx" -Pattern "action.disabled|runtimeAction.disabled|action.href|runtimeAction.href" -Context 2,6');
console.log("  pnpm build");