const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/runtime/ERPRuntimePage.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-i11b-fix-action-bar-jsx-wrapper`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

const broken = `<div data-runtime-action-bar-placement="runtime-page">
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
          />`;

const fixed = `<>
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
          </>`;

if (!source.includes(broken)) {
  console.error("[PATCH_FAILED] Exact broken create JSX block not found.");
  console.error("Run this to inspect:");
  console.error('Select-String -Path ".\\\\src\\\\components\\\\erp\\\\runtime\\\\ERPRuntimePage.tsx" -Pattern "data-runtime-action-bar-placement|ERPEnterpriseForm|mode=\\\\\\"create\\\\\\"" -Context 8,12');
  process.exit(1);
}

source = source.replace(broken, fixed);

const required = [
  '<>',
  'data-runtime-action-bar-placement="runtime-page"',
  '<ERPRuntimeActionBar',
  '<ERPEnterpriseForm',
  'mode="create"',
  '</>',
];

for (const marker of required) {
  if (!source.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OP-I11B] Runtime action bar JSX wrapper fixed for create mode.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");