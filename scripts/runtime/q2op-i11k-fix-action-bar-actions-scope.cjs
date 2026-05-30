const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/runtime/ERPRuntimePage.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-i11k-fix-action-bar-actions-scope`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

/**
 * 1. Replace out-of-scope variable usage with inline mapping.
 */
source = source.replace(
  /actions=\{runtimeActionBarActions\}/g,
  `actions={mapRuntimeActionsToActionBarActions(runtimeActions as ERPRuntimePageActionSource[])}`
);

/**
 * 2. Remove previously inserted const if present in the wrong scope.
 */
source = source.replace(
  /\n\s*const runtimeActionBarActions = mapRuntimeActionsToActionBarActions\(runtimeActions(?: as ERPRuntimePageActionSource\[\])?\);\n/g,
  "\n"
);

/**
 * 3. Validate required markers.
 */
const required = [
  "ERPRuntimeActionBar",
  "mapRuntimeActionsToActionBarActions(runtimeActions as ERPRuntimePageActionSource[])",
  "type ERPRuntimePageActionSource = ERPModuleAction &",
  'data-runtime-action-bar-placement="runtime-page"',
];

for (const marker of required) {
  if (!source.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

const forbidden = [
  "actions={runtimeActionBarActions}",
  "const runtimeActionBarActions =",
];

for (const marker of forbidden) {
  if (source.includes(marker)) {
    console.error("[PATCH_FAILED] Forbidden marker remains:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OP-I11K] Runtime action bar actions scope fixed.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");