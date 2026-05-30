const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/runtime/ERPRuntimePage.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-i11c-fix-create-action-bar-fragment`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

/**
 * 1. Ensure ERPRuntimeActionBar import exists.
 */
if (!source.includes('from "@/components/erp/runtime/ERPRuntimeActionBar"')) {
  source = source.replace(
    `import { ERPRuntimeDetails } from "./ERPRuntimeDetails";`,
    `import { ERPRuntimeDetails } from "./ERPRuntimeDetails";
import {
  ERPRuntimeActionBar,
  type ERPRuntimeActionBarAction,
} from "@/components/erp/runtime/ERPRuntimeActionBar";`
  );
}

/**
 * 2. Fix the create-mode JSX block by wrapping action bar + form in a fragment.
 */
const pattern = /\{type === "create" && module && \(\s*<div\s+data-runtime-action-bar-placement="runtime-page">[\s\S]*?<ERPEnterpriseForm\s*module=\{module\}\s*mode="create"\s*\/>\s*\)\}/m;

const replacement = `{type === "create" && module && (
          <>
            <div data-runtime-action-bar-placement="runtime-page">
              <ERPRuntimeActionBar
                title="Actions métier"
                description="Actions runtime disponibles pour cet enregistrement. Les formulaires resteront progressivement limités aux champs."
                actions={runtimeActionBarActions}
                compact
              />
            </div>

            <ERPEnterpriseForm
              module={module}
              mode="create"
            />
          </>
        )}`;

if (!pattern.test(source)) {
  console.error("[PATCH_FAILED] Create mode action bar/form block not found.");
  console.error("Inspect with:");
  console.error('Select-String -Path ".\\\\src\\\\components\\\\erp\\\\runtime\\\\ERPRuntimePage.tsx" -Pattern "type === \\"create\\"|data-runtime-action-bar-placement|ERPEnterpriseForm|mode=\\"create\\"" -Context 8,14');
  process.exit(1);
}

source = source.replace(pattern, replacement);

const required = [
  "ERPRuntimeActionBar",
  "ERPRuntimeActionBarAction",
  'from "@/components/erp/runtime/ERPRuntimeActionBar"',
  '{type === "create" && module && (',
  "<>",
  'data-runtime-action-bar-placement="runtime-page"',
  'mode="create"',
  "</>",
];

for (const marker of required) {
  if (!source.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OP-I11C] Create mode action bar JSX fragment fixed.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");