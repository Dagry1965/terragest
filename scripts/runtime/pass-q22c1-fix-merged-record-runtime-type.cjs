const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22c1-fix-merged-record-runtime-type";

const targetFile = "src/runtime/guards/processRuntimeBeforeMutationGuards.ts";
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

if (content.includes("const mergedRecord: RuntimeRecord =")) {
  console.log("[SKIP] mergedRecord already typed as RuntimeRecord.");
  process.exit(0);
}

const before = `  const mergedRecord = {
    ...currentRecord,
    ...data,
    id:
      context.id ??
      data.id ??
      currentRecord.id,
  };`;

const after = `  const mergedRecord: RuntimeRecord = {
    ...currentRecord,
    ...data,
    id:
      context.id ??
      data.id ??
      currentRecord.id,
  };`;

if (!content.includes(before)) {
  throw new Error("[MISSING] mergedRecord block");
}

content = content.replace(before, after);

fs.writeFileSync(target, content, "utf8");

console.log(`[WRITTEN] ${targetFile}`);
console.log("[Q22C1_DONE] mergedRecord typed as RuntimeRecord.");
console.log("");
console.log("Next:");
console.log("  pnpm build");