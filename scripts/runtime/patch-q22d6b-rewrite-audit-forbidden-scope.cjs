const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22d6b-rewrite-audit-forbidden-scope";

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

if (content.includes("Q22D6B_RUNTIME_FORBIDDEN_SCOPE")) {
  console.log("[SKIP] audit scope already rewritten.");
  process.exit(0);
}

const start =
  content.indexOf("for (const [file, content] of Object.entries(contents)) {");

if (start === -1) {
  throw new Error("[MISSING] forbidden Object.entries loop start");
}

const endMarker = `
const report = {`;

const end = content.indexOf(endMarker, start);

if (end === -1) {
  throw new Error("[MISSING] report marker after forbidden loop");
}

const replacement = `const runtimeGenericFiles = [
  // Q22D6B_RUNTIME_FORBIDDEN_SCOPE
  // Business consumer modules may contain their business identity.
  // Only the generic runtime layer must stay free of local AMARKHYS/garage naming.
  "src/runtime/scheduling/RuntimeSchedulingEngine.ts",
  "src/runtime/scheduling/RuntimeOpeningHours.ts",
  "src/runtime/scheduling/RuntimeSchedulingTypes.ts",
  "src/runtime/modules/ERPModule.ts",
  "src/runtime/guards/processRuntimeBeforeMutationGuards.ts",
  "src/components/erp/forms/enterprise/ERPFormField.tsx",
  "src/components/erp/forms/enterprise/ERPFormTabs.tsx",
];

for (const file of runtimeGenericFiles) {
  const fileContent = contents[file];

  for (const term of forbiddenTerms) {
    assert(
      !fileContent.includes(term),
      \`\${file} does not contain forbidden local term: \${term}\`
    );
  }
}

`;

content =
  content.slice(0, start) +
  replacement +
  content.slice(end);

fs.writeFileSync(target, content, "utf8");

console.log(`[WRITTEN] ${targetFile}`);
console.log("[Q22D6B_DONE] Audit forbidden scope rewritten.");
console.log("");
console.log("Next:");
console.log("  node .\\scripts\\runtime\\audit-q22d6-scheduling-runtime-final.cjs");
console.log("  pnpm build");