const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const targetFile = "src/components/erp/runtime/ERPRuntimeFieldValue.tsx";
const tag = "q21f-a3b-format-select-labels";
const target = path.join(ROOT, targetFile);
const backup = `${target}.bak-${tag}`;

if (!fs.existsSync(target)) {
  throw new Error(`[MISSING] ${targetFile}`);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(target, backup);
  console.log(`[BACKUP] ${targetFile}.bak-${tag}`);
}

let content = fs.readFileSync(target, "utf8");

if (content.includes("Q21F_A3B_FORMAT_SELECT_LABELS")) {
  console.log("[SKIP] Q21F-A3B already installed.");
  process.exit(0);
}

const insertBefore = `  if (field.type === "boolean") {`;

const selectBlock = `  if (field.type === "select") {
    // Q21F_A3B_FORMAT_SELECT_LABELS
    // Display business labels in runtime lists/details instead of technical values.
    const option = Array.isArray(field.options)
      ? field.options.find((item) => item?.value === value)
      : undefined;

    return (
      <span>
        {String(option?.label ?? value)}
      </span>
    );
  }

`;

if (!content.includes(insertBefore)) {
  throw new Error("[MISSING] boolean block insertion point");
}

content = content.replace(insertBefore, selectBlock + insertBefore);

fs.writeFileSync(target, content, "utf8");

console.log(`[WRITTEN] ${targetFile}`);
console.log("[Q21F_A3B_DONE] Select option values now render as business labels.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  test /rendezvous");