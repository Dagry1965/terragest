const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/runtime/relations/RuntimeRelationLabelEngine.ts";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21x-c3c-nested-labels`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21x-c3c-nested-labels`);
}

let content = fs.readFileSync(file, "utf8");

if (content.includes("Q21X_C3C_NESTED_RELATION_LABELS")) {
  console.log("[SKIP] Q21X-C3C already installed.");
  process.exit(0);
}

// 1) Add optional resolver contract to context.
content = content.replace(
  `export interface RuntimeRelationLabelContext {
  moduleKey: string;
  record: Record<string, unknown>;
  modules: ERPModule[];
}`,
  `export interface RuntimeRelationLabelContext {
  moduleKey: string;
  record: Record<string, unknown>;
  modules: ERPModule[];

  /**
   * Q21X_C3C_NESTED_RELATION_LABELS
   * Optional resolver injected by the caller.
   * This keeps the label engine generic and avoids importing the data loader here.
   */
  resolveRelationLabel?: (
    moduleKey: string,
    id: string,
    depth: number
  ) => Promise<string>;

  depth?: number;
}`
);

// 2) Replace buildLabel signature and relation-aware loop.
content = content.replace(
  `export class RuntimeRelationLabelEngine {
  static buildLabel(context: RuntimeRelationLabelContext): RuntimeRelationLabelResult {`,
  `export class RuntimeRelationLabelEngine {
  static buildLabel(context: RuntimeRelationLabelContext): RuntimeRelationLabelResult {
    return RuntimeRelationLabelEngine.buildLabelSync(context);
  }

  static buildLabelSync(context: RuntimeRelationLabelContext): RuntimeRelationLabelResult {`
);

// 3) Insert async method before fallback method.
const fallbackMarker = `  static buildFallbackLabel(record: Record<string, unknown>): string {`;

if (!content.includes(fallbackMarker)) {
  console.error("[ERROR] Cannot locate buildFallbackLabel marker.");
  process.exit(1);
}

const asyncMethod = `  static async buildLabelAsync(
    context: RuntimeRelationLabelContext
  ): Promise<RuntimeRelationLabelResult> {
    const module = findModule(context.modules, context.moduleKey);
    const labelFields =
      (module?.composition as { labelFields?: string[] } | undefined)
        ?.labelFields ?? [];

    if (labelFields.length === 0) {
      return {
        label: RuntimeRelationLabelEngine.buildFallbackLabel(context.record),
        source: "fallback",
      };
    }

    const depth = context.depth ?? 1;
    const parts: string[] = [];

    for (const fieldKey of labelFields) {
      const raw = context.record[fieldKey];

      if (raw === null || raw === undefined || raw === "") {
        continue;
      }

      const fieldDefinition = module?.schema?.fields?.find(
        (field) => field.key === fieldKey
      ) as
        | {
            key: string;
            type?: string;
            relation?: string | { module?: string };
            references?: { module?: string };
          }
        | undefined;

      const targetModule =
        fieldDefinition?.references?.module ??
        (typeof fieldDefinition?.relation === "string"
          ? fieldDefinition.relation
          : fieldDefinition?.relation?.module) ??
        "";

      if (
        depth > 0 &&
        fieldDefinition?.type === "relation" &&
        targetModule &&
        context.resolveRelationLabel
      ) {
        try {
          const resolved = await context.resolveRelationLabel(
            targetModule,
            String(raw),
            depth - 1
          );

          if (resolved && resolved !== String(raw)) {
            parts.push(resolved);
            continue;
          }
        } catch {
          // Never break relation option loading because a nested label failed.
        }
      }

      if (isStatusField(fieldKey)) {
        parts.push(formatStatus(raw));
        continue;
      }

      if (isMoneyField(fieldKey)) {
        parts.push(formatMoney(raw));
        continue;
      }

      parts.push(String(raw).trim());
    }

    const label = compact(...parts);

    if (label) {
      return {
        label,
        source: "metadata",
      };
    }

    return {
      label: RuntimeRelationLabelEngine.buildFallbackLabel(context.record),
      source: "fallback",
    };
  }

`;

content = content.replace(fallbackMarker, asyncMethod + fallbackMarker);

fs.writeFileSync(file, content, "utf8");

console.log("[Q21X_C3C_STEP1_DONE] RuntimeRelationLabelEngine now supports async nested labels.");
console.log("Next: wire ERPRelationDataLoader to buildLabelAsync.");