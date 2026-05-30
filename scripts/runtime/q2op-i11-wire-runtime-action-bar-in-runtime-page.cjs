const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/runtime/ERPRuntimePage.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-i11-wire-runtime-action-bar`;

if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

/**
 * 1. Import ERPRuntimeActionBar.
 */
if (!source.includes("ERPRuntimeActionBar")) {
  source = source.replace(
    `import { ERPRuntimeDetails } from "@/components/erp/runtime/ERPRuntimeDetails";`,
    `import { ERPRuntimeDetails } from "@/components/erp/runtime/ERPRuntimeDetails";
import {
  ERPRuntimeActionBar,
  type ERPRuntimeActionBarAction,
} from "@/components/erp/runtime/ERPRuntimeActionBar";`
  );
}

/**
 * 2. Add mapper helper from existing runtime actions to action bar actions.
 * This is intentionally light and defensive.
 */
if (!source.includes("function mapRuntimeActionsToActionBarActions(")) {
  const helper = `
function mapRuntimeActionsToActionBarActions(
  runtimeActions: Array<Record<string, unknown>> = []
): ERPRuntimeActionBarAction[] {
  return runtimeActions
    .map((action) => {
      const key = String(action.key ?? action.id ?? action.label ?? "");
      const label = String(action.label ?? action.title ?? key);

      if (!key || !label) {
        return null;
      }

      const href =
        typeof action.href === "string"
          ? action.href
          : undefined;

      const disabled =
        typeof action.disabled === "boolean"
          ? action.disabled
          : false;

      const tone =
        action.variant === "danger" || action.tone === "danger"
          ? "danger"
          : action.variant === "success" || action.tone === "success"
            ? "success"
            : action.variant === "warning" || action.tone === "warning"
              ? "warning"
              : action.variant === "primary" || action.tone === "primary"
                ? "primary"
                : "default";

      return {
        key,
        label,
        href,
        disabled,
        tone,
        description:
          typeof action.description === "string"
            ? action.description
            : undefined,
      };
    })
    .filter(Boolean) as ERPRuntimeActionBarAction[];
}

`;

  const marker = "function buildInvoicePaymentHref(";
  const index = source.indexOf(marker);

  if (index === -1) {
    console.error("[PATCH_FAILED] buildInvoicePaymentHref boundary not found.");
    process.exit(1);
  }

  source = source.slice(0, index) + helper + source.slice(index);
}

/**
 * 3. Create action bar actions near runtimeActions usage.
 */
if (!source.includes("const runtimeActionBarActions = mapRuntimeActionsToActionBarActions(runtimeActions);")) {
  source = source.replace(
    /const runtimeActions\s*=\s*[\s\S]*?;\n/,
    (match) => `${match}
  const runtimeActionBarActions = mapRuntimeActionsToActionBarActions(runtimeActions);
`
  );
}

/**
 * 4. Render action bar before the form/details without removing old workflowActions yet.
 * We search for ERPEnterpriseForm and insert just before it.
 */
if (!source.includes('data-runtime-action-bar-placement="runtime-page"')) {
  const formMarker = `<ERPEnterpriseForm`;
  const formIndex = source.indexOf(formMarker);

  if (formIndex === -1) {
    console.error("[PATCH_FAILED] ERPEnterpriseForm marker not found.");
    process.exit(1);
  }

  const insertion = `<div data-runtime-action-bar-placement="runtime-page">
              <ERPRuntimeActionBar
                title="Actions métier"
                description="Actions runtime disponibles pour cet enregistrement. Les formulaires resteront progressivement limités aux champs."
                actions={runtimeActionBarActions}
                compact
              />
            </div>

            `;

  source = source.slice(0, formIndex) + insertion + source.slice(formIndex);
}

const required = [
  "ERPRuntimeActionBar",
  "ERPRuntimeActionBarAction",
  "mapRuntimeActionsToActionBarActions",
  "runtimeActionBarActions",
  'data-runtime-action-bar-placement="runtime-page"',
];

for (const marker of required) {
  if (!source.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OP-I11] ERPRuntimeActionBar wired into ERPRuntimePage without removing form workflowActions.");
console.log("Next:");
console.log("  pnpm build");
console.log("  node .\\\\scripts\\\\runtime\\\\q2op-i9-audit-workflow-buttons-in-enterprise-form.cjs");
console.log("  git status --short");