const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/runtime/ERPRuntimePage.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-i12b3-fix-runtime-action-href-outside-mapper`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

const mapperStart = source.indexOf("function mapRuntimeActionsToActionBarActions(");
const mapperEnd = source.indexOf("function buildInvoicePaymentHref(", mapperStart);

if (mapperStart === -1 || mapperEnd === -1 || mapperEnd <= mapperStart) {
  console.error("[PATCH_FAILED] Mapper boundaries not found.");
  process.exit(1);
}

const beforeMapper = source.slice(0, mapperStart);
const mapperBlock = source.slice(mapperStart, mapperEnd);
let afterMapper = source.slice(mapperEnd);

// Only outside mapper: restore local callback variable name.
afterMapper = afterMapper.replace(/runtimeAction\.href/g, "action.href");

source = beforeMapper + mapperBlock + afterMapper;

// Validation.
if (!mapperBlock.includes("runtimeAction.href")) {
  console.error("[PATCH_FAILED] Mapper lost runtimeAction.href.");
  process.exit(1);
}

const outsideMapper = beforeMapper + afterMapper;

if (outsideMapper.includes("runtimeAction.href")) {
  console.error("[PATCH_FAILED] runtimeAction.href still exists outside mapper.");
  process.exit(1);
}

const required = [
  "String(action.href ?? \"\").includes(\"/planning\")",
  "Boolean(action.href)",
  "runtimeAction.href",
];

for (const marker of required) {
  if (!source.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OP-I12-B3] runtimeAction.href outside mapper fixed.");
console.log("Next:");
console.log('  Select-String -Path ".\\\\src\\\\components\\\\erp\\\\runtime\\\\ERPRuntimePage.tsx" -Pattern "runtimeAction.href|String\\\\(action.href|Boolean\\\\(action.href" -Context 3,8');
console.log("  pnpm build");