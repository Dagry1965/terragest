const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2ok-c3-primary-label-fallback`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let content = fs.readFileSync(fullPath, "utf8");

const start = content.indexOf("function readRecordLabel(");
if (start === -1) {
  console.error("[PATCH_FAILED] readRecordLabel function not found.");
  process.exit(1);
}

const endMarker = "\n\nexport type ERPRecordHubPrimaryCollectionProps";
const end = content.indexOf(endMarker, start);

if (end === -1) {
  console.error("[PATCH_FAILED] End marker not found.");
  process.exit(1);
}

const nextFunction = `function readRecordLabel(
  record: ERPRecordHubRecord,
  fields: string[] | undefined
): string {
  const requestedFields = fields ?? [];

  const fallbackFields =
    requestedFields.length > 0
      ? requestedFields
      : [
          "displayLabel",
          "label",
          "libelle",
          "nom",
          "name",
          "designation",
          "titre",
          "emplacement",
          "code",
          "reference",
          "numero",
          "immatriculation",
        ];

  const values = fallbackFields
    .map((field) => record[field])
    .filter((value) => typeof value === "string" || typeof value === "number")
    .map((value) => String(value).trim())
    .filter((value) => value.length > 0);

  if (values.length > 0) {
    return values.join(" · ");
  }

  return "\\u00c9l\\u00e9ment";
}`;

content = content.slice(0, start) + nextFunction + content.slice(end);

fs.writeFileSync(fullPath, content, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OK-C3] Primary collection label fallback fixed.");
console.log("Next:");
console.log("  node .\\\\scripts\\\\runtime\\\\q2ok-c2-audit-product-stock-hub-polish.cjs");
console.log("  pnpm build");