const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/runtime/ERPRuntimePage.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-i11f-fix-action-bar-optional-fields`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

const helperRegex =
  /function mapRuntimeActionsToActionBarActions\([\s\S]*?\n\}\n\nfunction buildInvoicePaymentHref/m;

const replacement = `function mapRuntimeActionsToActionBarActions(
  runtimeActions: ERPModuleAction[] = []
): ERPRuntimeActionBarAction[] {
  return runtimeActions
    .map((action) => {
      const runtimeAction = action as ERPModuleAction & {
        href?: string;
        disabled?: boolean;
        variant?: string;
        description?: string;
      };

      const key = String(runtimeAction.key ?? runtimeAction.label ?? "");
      const label = String(runtimeAction.label ?? key);

      if (!key || !label) {
        return null;
      }

      const href =
        typeof runtimeAction.href === "string"
          ? runtimeAction.href
          : undefined;

      const disabled =
        typeof runtimeAction.disabled === "boolean"
          ? runtimeAction.disabled
          : false;

      const tone =
        runtimeAction.variant === "danger"
          ? "danger"
          : runtimeAction.variant === "success"
            ? "success"
            : runtimeAction.variant === "warning"
              ? "warning"
              : runtimeAction.variant === "primary"
                ? "primary"
                : "default";

      return {
        key,
        label,
        href,
        disabled,
        tone,
        description:
          typeof runtimeAction.description === "string"
            ? runtimeAction.description
            : undefined,
      };
    })
    .filter(Boolean) as ERPRuntimeActionBarAction[];
}

function buildInvoicePaymentHref`;

if (!helperRegex.test(source)) {
  console.error("[PATCH_FAILED] mapRuntimeActionsToActionBarActions block not found.");
  console.error("Inspect with:");
  console.error('Select-String -Path ".\\\\src\\\\components\\\\erp\\\\runtime\\\\ERPRuntimePage.tsx" -Pattern "function mapRuntimeActionsToActionBarActions|function buildInvoicePaymentHref|action.disabled|runtimeAction" -Context 3,20');
  process.exit(1);
}

source = source.replace(helperRegex, replacement);

const required = [
  "runtimeActions: ERPModuleAction[] = []",
  "const runtimeAction = action as ERPModuleAction &",
  "disabled?: boolean",
  "variant?: string",
  "runtimeAction.disabled",
  "runtimeAction.variant",
  "function buildInvoicePaymentHref",
];

for (const marker of required) {
  if (!source.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

const forbidden = [
  "action.disabled",
  "action.variant",
  "action.href",
  "action.description",
  "Array<Record<string, unknown>>",
];

for (const marker of forbidden) {
  if (source.includes(marker)) {
    console.error("[PATCH_FAILED] Forbidden marker remains:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OP-I11F] Runtime action bar mapper now safely reads optional action fields.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");