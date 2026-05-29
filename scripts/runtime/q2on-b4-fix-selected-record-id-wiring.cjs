const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/hub/ERPRecordHubPage.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2on-b4-selected-record-id-wiring`;

if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let content = fs.readFileSync(fullPath, "utf8");

if (!content.includes("selectedRecordId?: string | null;")) {
  content = content.replace(
    /relatedRecordsBySection\?: Record<string,\s*ERPRecordHubRecord\[\]>;/,
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

const initialSelectedRegex =
  /const initialSelectedId\s*=\s*searchParams\.get\(selectionQueryParam\)\s*\?\?\s*(?:selectedRecordId\s*\?\?\s*)?primaryRecords\[0\]\?\.id\s*\?\?\s*null;/m;

const nextInitialSelected = `const initialSelectedId =
    searchParams.get(selectionQueryParam) ??
    selectedRecordId ??
    primaryRecords[0]?.id ??
    null;`;

if (!initialSelectedRegex.test(content)) {
  console.error("[PATCH_FAILED] initialSelectedId pattern not found.");
  console.error("Please inspect src/components/erp/hub/ERPRecordHubPage.tsx around initialSelectedId.");
  process.exit(1);
}

content = content.replace(initialSelectedRegex, nextInitialSelected);

const required = [
  "selectedRecordId?: string | null;",
  "selectedRecordId = null",
  "selectedRecordId ??",
];

for (const marker of required) {
  if (!content.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, content, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-ON-B4] selectedRecordId wiring fixed.");