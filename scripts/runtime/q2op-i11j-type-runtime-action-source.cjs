const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/runtime/ERPRuntimePage.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-i11j-type-runtime-action-source`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

// 1. Ensure ERPModuleAction is imported.
source = source.replace(
  /import type \{\s*ERPModule\s*\} from "@\/runtime\/modules\/ERPModule";/,
  `import type { ERPModule, ERPModuleAction } from "@/runtime/modules/ERPModule";`
);

if (!source.includes("ERPModuleAction")) {
  source = source.replace(
    /import type \{([^}]*ERPModule[^}]*)\} from "@\/runtime\/modules\/ERPModule";/,
    (match, inner) => {
      if (inner.includes("ERPModuleAction")) {
        return match;
      }
      return `import type {${inner}, ERPModuleAction } from "@/runtime/modules/ERPModule";`;
    }
  );
}

// 2. Add a local UI action source type after the ERPRuntimeActionBar import/type area.
if (!source.includes("type ERPRuntimePageActionSource = ERPModuleAction &")) {
  const insertAfter = `} from "@/components/erp/runtime/ERPRuntimeActionBar";`;

  if (!source.includes(insertAfter)) {
    console.error("[PATCH_FAILED] ERPRuntimeActionBar import boundary not found.");
    process.exit(1);
  }

  source = source.replace(
    insertAfter,
    `${insertAfter}

type ERPRuntimePageActionSource = ERPModuleAction & {
  href?: string;
  disabled?: boolean;
  variant?: string;
  description?: string;
};`
  );
}

// 3. Force the mapper signature to accept the extended source.
// This keeps current action.disabled/action.href/action.variant code valid.
const fnStart = source.indexOf("function mapRuntimeActionsToActionBarActions(");
if (fnStart === -1) {
  console.error("[PATCH_FAILED] mapRuntimeActionsToActionBarActions not found.");
  process.exit(1);
}

const returnTypeIndex = source.indexOf("): ERPRuntimeActionBarAction[]", fnStart);
if (returnTypeIndex === -1) {
  console.error("[PATCH_FAILED] mapper return type boundary not found.");
  process.exit(1);
}

const bodyStart = source.indexOf("{", returnTypeIndex);
if (bodyStart === -1) {
  console.error("[PATCH_FAILED] mapper body start not found.");
  process.exit(1);
}

const newSignature = `function mapRuntimeActionsToActionBarActions(
  runtimeActions: ERPRuntimePageActionSource[] = []
): ERPRuntimeActionBarAction[] `;

source = source.slice(0, fnStart) + newSignature + source.slice(bodyStart);

// 4. Passing ERPModuleAction[] into an array with optional extra fields is safe,
// but TS may need an explicit cast at the call site.
source = source.replace(
  /mapRuntimeActionsToActionBarActions\(runtimeActions\)/g,
  `mapRuntimeActionsToActionBarActions(runtimeActions as ERPRuntimePageActionSource[])`
);

// 5. Validation.
const required = [
  "ERPModuleAction",
  "type ERPRuntimePageActionSource = ERPModuleAction &",
  "disabled?: boolean",
  "runtimeActions: ERPRuntimePageActionSource[] = []",
  "mapRuntimeActionsToActionBarActions(runtimeActions as ERPRuntimePageActionSource[])",
];

for (const marker of required) {
  if (!source.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OP-I11J] Runtime action mapper now uses ERPRuntimePageActionSource.");
console.log("Next:");
console.log('  Select-String -Path ".\\\\src\\\\components\\\\erp\\\\runtime\\\\ERPRuntimePage.tsx" -Pattern "ERPRuntimePageActionSource|action.disabled|runtimeActions:" -Context 2,8');
console.log("  pnpm build");