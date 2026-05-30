const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/runtime/ERPRuntimePage.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-i11e-force-fix-action-bar-types`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

/**
 * 1. Ensure ERPModuleAction is imported with ERPModule.
 */
source = source.replace(
  /import type \{\s*ERPModule\s*\} from "@\/runtime\/modules\/ERPModule";/,
  `import type { ERPModule, ERPModuleAction } from "@/runtime/modules/ERPModule";`
);

/**
 * If ERPModuleAction is still not imported because the import is formatted differently,
 * patch the import more generally.
 */
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

/**
 * 2. Replace the mapper signature whatever its formatting is.
 */
const signatureRegex =
  /function\s+mapRuntimeActionsToActionBarActions\s*\(\s*runtimeActions\s*:\s*Array<\s*Record\s*<\s*string\s*,\s*unknown\s*>\s*>\s*=\s*\[\]\s*\)\s*:\s*ERPRuntimeActionBarAction\[\]\s*\{/m;

if (!signatureRegex.test(source)) {
  console.error("[PATCH_FAILED] Old mapper signature not found.");
  console.error("Inspect with:");
  console.error('Select-String -Path ".\\\\src\\\\components\\\\erp\\\\runtime\\\\ERPRuntimePage.tsx" -Pattern "function mapRuntimeActionsToActionBarActions|Array<Record|ERPModuleAction" -Context 2,8');
  process.exit(1);
}

source = source.replace(
  signatureRegex,
  `function mapRuntimeActionsToActionBarActions(
  runtimeActions: ERPModuleAction[] = []
): ERPRuntimeActionBarAction[] {`
);

/**
 * 3. Remove accesses that may not exist on ERPModuleAction.
 */
source = source.replace(
  /const key = String\(action\.key \?\? action\.id \?\? action\.label \?\? ""\);/,
  `const key = String(action.key ?? action.label ?? "");`
);

source = source.replace(
  /const label = String\(action\.label \?\?\s*action\.title \?\? key\);/,
  `const label = String(action.label ?? key);`
);

source = source.replace(
  /action\.variant === "danger" \|\| action\.tone === "danger"\s*\?\s*"danger"\s*:\s*action\.variant === "success" \|\| action\.tone === "success"\s*\?\s*"success"\s*:\s*action\.variant === "warning" \|\| action\.tone === "warning"\s*\?\s*"warning"\s*:\s*action\.variant === "primary" \|\| action\.tone === "primary"\s*\?\s*"primary"\s*:\s*"default";/m,
  `action.variant === "danger"
          ? "danger"
          : action.variant === "success"
            ? "success"
            : action.variant === "warning"
              ? "warning"
              : action.variant === "primary"
                ? "primary"
                : "default";`
);

/**
 * 4. Validation.
 */
const required = [
  "ERPModuleAction",
  "runtimeActions: ERPModuleAction[] = []",
  "mapRuntimeActionsToActionBarActions(runtimeActions)",
  "ERPRuntimeActionBarAction[]",
];

for (const marker of required) {
  if (!source.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

const forbidden = [
  "Array<Record<string, unknown>>",
  "Array<Record< string, unknown >>",
  "action.id",
  "action.title",
  "action.tone",
];

for (const marker of forbidden) {
  if (source.includes(marker)) {
    console.error("[PATCH_FAILED] Forbidden marker remains:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OP-I11E] Runtime action bar mapper type fixed robustly.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");