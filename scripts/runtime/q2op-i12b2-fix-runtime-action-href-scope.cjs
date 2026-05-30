const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/runtime/ERPRuntimePage.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-i12b2-fix-runtime-action-href-scope`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

/**
 * Fix only the list-page href filter that was accidentally changed.
 */
source = source.replace(
  /Boolean\(runtimeAction\.href\)/g,
  "Boolean(action.href)"
);

/**
 * Validate:
 * - runtimeAction.href must still exist inside mapper.
 * - action.href must exist in moduleHrefActions list filter.
 * - no runtimeAction.href should exist near moduleHrefActions filter.
 */
const required = [
  "runtimeAction.href",
  "Boolean(action.href)",
  "moduleHrefActions",
  "mapRuntimeActionsToActionBarActions",
];

for (const marker of required) {
  if (!source.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

const moduleHrefIndex = source.indexOf("const moduleHrefActions");
const nextBlockIndex = source.indexOf("const hasPlanningAction", moduleHrefIndex);

if (moduleHrefIndex === -1 || nextBlockIndex === -1) {
  console.error("[PATCH_FAILED] Could not locate moduleHrefActions block.");
  process.exit(1);
}

const moduleHrefBlock = source.slice(moduleHrefIndex, nextBlockIndex);

if (moduleHrefBlock.includes("runtimeAction.href")) {
  console.error("[PATCH_FAILED] runtimeAction.href still exists in moduleHrefActions block.");
  process.exit(1);
}

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OP-I12-B2] runtimeAction.href scope fixed.");
console.log("Next:");
console.log('  Select-String -Path ".\\\\src\\\\components\\\\erp\\\\runtime\\\\ERPRuntimePage.tsx" -Pattern "runtimeAction.href|Boolean\\\\(action.href\\\\)|moduleHrefActions" -Context 3,8');
console.log("  pnpm build");