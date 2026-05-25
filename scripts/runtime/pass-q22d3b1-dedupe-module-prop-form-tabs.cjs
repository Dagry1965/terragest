const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22d3b1-dedupe-module-prop-form-tabs";

const targetFile =
  "src/components/erp/forms/enterprise/ERPFormTabs.tsx";

const target = path.join(ROOT, targetFile);

if (!fs.existsSync(target)) {
  throw new Error(`[MISSING] ${targetFile}`);
}

const backup = `${target}.bak-${TAG}`;

if (!fs.existsSync(backup)) {
  fs.copyFileSync(target, backup);
  console.log(`[BACKUP] ${targetFile}.bak-${TAG}`);
}

let content = fs.readFileSync(target, "utf8");

// Collapse repeated module={module} lines inside ERPFormField blocks.
content = content.replace(
  /(\n\s*module=\{module\}){2,}/g,
  "\n                        module={module}"
);

// Safety: normalize indentation for all module props.
content = content.replace(
  /\n\s*module=\{module\}/g,
  "\n                        module={module}"
);

fs.writeFileSync(target, content, "utf8");

console.log(`[WRITTEN] ${targetFile}`);
console.log("[Q22D3B1_DONE] Duplicate module props removed from ERPFormTabs.");
console.log("");
console.log("Next:");
console.log("  pnpm build");