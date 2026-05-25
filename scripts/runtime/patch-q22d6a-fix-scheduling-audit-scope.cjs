const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22d6a-fix-scheduling-audit-scope";

const targetFile =
  "scripts/runtime/audit-q22d6-scheduling-runtime-final.cjs";

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

if (content.includes("Q22D6A_RUNTIME_ONLY_FORBIDDEN_TERMS_SCOPE")) {
  console.log("[SKIP] audit scope already fixed.");
  process.exit(0);
}

const oldBlock = `for (const [file, content] of Object.entries(contents)) {
  for (const term of forbiddenTerms) {
    assert(
      !content.includes(term),
      \`\${file} does not contain forbidden local term: \${term}\`
    );
  }
}`;

const newBlock = `const runtimeGenericFiles = [
  // Q22D6A_RUNTIME_ONLY_FORBIDDEN_TERMS_SCOPE
  // Business consumer modules may contain their business label/category.
  // The generic runtime must not contain local AMARKHYS/garage naming.
  "src/runtime/scheduling/RuntimeSchedulingEngine.ts",
  "src/runtime/scheduling/RuntimeOpeningHours.ts",
  "src/runtime/scheduling/RuntimeSchedulingTypes.ts",
  "src/runtime/modules/ERPModule.ts",
  "src/runtime/guards/processRuntimeBeforeMutationGuards.ts",
  "src/components/erp/forms/enterprise/ERPFormField.tsx",
  "src/components/erp/forms/enterprise/ERPFormTabs.tsx",
];

for (const file of runtimeGenericFiles) {
  const content = contents[file];

  for (const term of forbiddenTerms) {
    assert(
      !content.includes(term),
      \`\${file} does not contain forbidden local term: \${term}\`
    );
  }
}`;

if (!content.includes(oldBlock)) {
  throw new Error("[MISSING] forbidden terms loop block");
}

content = content.replace(oldBlock, newBlock);

fs.writeFileSync(target, content, "utf8");

console.log(`[WRITTEN] ${targetFile}`);
console.log("[Q22D6A_DONE] Scheduling audit scope fixed.");
console.log("");
console.log("Next:");
console.log("  node .\\scripts\\runtime\\audit-q22d6-scheduling-runtime-final.cjs");
console.log("  pnpm build");