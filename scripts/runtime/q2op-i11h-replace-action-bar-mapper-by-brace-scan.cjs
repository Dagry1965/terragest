const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/runtime/ERPRuntimePage.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-i11h-brace-scan-action-bar-mapper`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

/**
 * 1. Ensure ERPModuleAction import.
 */
source = source.replace(
  /import type \{\s*ERPModule\s*\} from "@\/runtime\/modules\/ERPModule";/,
  `import type { ERPModule, ERPModuleAction } from "@/runtime/modules/ERPModule";`
);

if (!source.includes("ERPModuleAction")) {
  source = source.replace(
    /import type \{([^}]*ERPModule[^}]*)\} from "@\/runtime\/modules\/ERPModule";/,
    (match, inner) => {
      if (inner.includes("ERPModuleAction")) return match;
      return `import type {${inner}, ERPModuleAction } from "@/runtime/modules/ERPModule";`;
    }
  );
}

if (!source.includes("ERPModuleAction")) {
  console.error("[PATCH_FAILED] ERPModuleAction import could not be added.");
  process.exit(1);
}

/**
 * 2. Locate helper function and replace by brace scanning.
 */
const fnName = "function mapRuntimeActionsToActionBarActions";
const start = source.indexOf(fnName);

if (start === -1) {
  console.error("[PATCH_FAILED] Helper function not found:", fnName);
  process.exit(1);
}

const bodyStart = source.indexOf("{", start);
if (bodyStart === -1) {
  console.error("[PATCH_FAILED] Helper body start not found.");
  process.exit(1);
}

let depth = 0;
let inString = false;
let quote = "";
let escaped = false;
let end = -1;

for (let i = bodyStart; i < source.length; i++) {
  const c = source[i];

  if (escaped) {
    escaped = false;
    continue;
  }

  if (c === "\\") {
    escaped = true;
    continue;
  }

  if (inString) {
    if (c === quote) {
      inString = false;
      quote = "";
    }
    continue;
  }

  if (c === '"' || c === "'" || c === "`") {
    inString = true;
    quote = c;
    continue;
  }

  if (c === "{") depth++;
  if (c === "}") depth--;

  if (depth === 0) {
    end = i + 1;
    break;
  }
}

if (end === -1) {
  console.error("[PATCH_FAILED] Helper body end not found.");
  process.exit(1);
}

const helper = `function mapRuntimeActionsToActionBarActions(
  runtimeActions: ERPModuleAction[] = []
): ERPRuntimeActionBarAction[] {
  return runtimeActions
    .map((action) => {
      type RuntimeActionBarSource = ERPModuleAction & {
        href?: string;
        disabled?: boolean;
        variant?: string;
        description?: string;
      };

      const runtimeAction = action as RuntimeActionBarSource;

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
}`;

source = source.slice(0, start) + helper + source.slice(end);

/**
 * 3. Validation strict.
 */
const required = [
  "ERPModuleAction",
  "runtimeActions: ERPModuleAction[] = []",
  "type RuntimeActionBarSource = ERPModuleAction &",
  "const runtimeAction = action as RuntimeActionBarSource",
  "runtimeAction.disabled",
  "runtimeAction.variant",
  "runtimeAction.href",
  "runtimeAction.description",
  "mapRuntimeActionsToActionBarActions(runtimeActions)",
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
  "action.id",
  "action.title",
  "action.tone",
  "Array<Record<string, unknown>>",
  "Array<Record<",
];

for (const marker of forbidden) {
  if (source.includes(marker)) {
    console.error("[PATCH_FAILED] Forbidden marker remains:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OP-I11H] Mapper replaced by brace-scan patch.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");