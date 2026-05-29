const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/hub/ERPRecordHubPage.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2on-b1-selected-record-id`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let content = fs.readFileSync(fullPath, "utf8");

if (!content.includes("selectedRecordId?: string | null;")) {
  content = content.replace(
    /relatedRecordsBySection\?: Record<string, ERPRecordHubRecord\[\]>;/,
    `relatedRecordsBySection?: Record<string, ERPRecordHubRecord[]>;
  selectedRecordId?: string | null;`
  );
}

if (!content.includes("selectedRecordId = null")) {
  content = content.replace(
    /relatedRecordsBySection = {},/,
    `relatedRecordsBySection = {},
  selectedRecordId = null,`
  );
}

if (!content.includes("selectedRecordId ??")) {
  content = content.replace(
    /primaryRecords\[0\]\?\.[iI]d ?? null/g,
    `selectedRecordId ?? primaryRecords[0]?.id ?? null`
  );
}

if (!content.includes("selectedRecordId?: string | null;")) {
  console.error("[PATCH_FAILED] Prop type was not added.");
  process.exit(1);
}

if (!content.includes("selectedRecordId = null")) {
  console.error("[PATCH_FAILED] Prop default was not added.");
  process.exit(1);
}

fs.writeFileSync(fullPath, content, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-ON-B1] ERPRecordHubPage now accepts selectedRecordId.");
console.log("Next:");
console.log("  pnpm build");