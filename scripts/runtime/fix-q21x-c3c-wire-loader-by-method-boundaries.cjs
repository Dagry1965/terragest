const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/runtime/modules/lifecycle/ERPRelationDataLoader.ts";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21x-c3c-wire-loader-by-method-boundaries`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${path.relative(ROOT, backup)}`);
}

let content = fs.readFileSync(file, "utf8");

function findMethodRange(source, signature) {
  const start = source.indexOf(signature);

  if (start === -1) {
    throw new Error(`Signature not found: ${signature}`);
  }

  const braceStart = source.indexOf("{", start);

  if (braceStart === -1) {
    throw new Error(`Opening brace not found for: ${signature}`);
  }

  let depth = 0;

  for (let i = braceStart; i < source.length; i += 1) {
    const char = source[i];

    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;

    if (depth === 0) {
      return {
        start,
        end: i + 1,
      };
    }
  }

  throw new Error(`Closing brace not found for: ${signature}`);
}

function replaceMethod(source, signature, replacement) {
  const range = findMethodRange(source, signature);
  return source.slice(0, range.start) + replacement + source.slice(range.end);
}

if (!content.includes(`import { RuntimeRelationLabelEngine } from "@/runtime/relations";`)) {
  content = content.replace(
    `import { allERPModules } from "../definitions/coreModules";`,
    `import { allERPModules } from "../definitions/coreModules";
import { RuntimeRelationLabelEngine } from "@/runtime/relations";`
  );
}

const newLoad = `  static async load(moduleKey: string) {
    const modules =
      ERPRelationDataLoader.resolveModuleCandidates(moduleKey);

    if (modules.length === 0) {
      return [];
    }

    const merged = new Map<
      string,
      {
        id: string;
        label: string;
        record: Record<string, unknown>;
      }
    >();

    for (const module of modules) {
      try {
        const records =
          await RuntimeDataBinding.list(module);

        for (const record of records) {
          const id =
            String(record.id ?? "").trim();

          if (!id || merged.has(id)) {
            continue;
          }

          merged.set(id, {
            id,
            label: await ERPRelationDataLoader.getLabelAsync(
              record as Record<string, unknown>,
              module.metadata.key,
              1
            ),
            record: record as Record<string, unknown>,
          });
        }
      } catch {
        // Ignore missing or unauthorized alias collections.
      }
    }

    return Array.from(merged.values());
  }
`;

const newResolveLabel = `  static async resolveLabel(
    moduleKey: string,
    id: string,
    depth = 1
  ): Promise<string> {
    const relationId =
      String(id ?? "").trim();

    if (!moduleKey || !relationId) {
      return "";
    }

    const modules =
      ERPRelationDataLoader.resolveModuleCandidates(moduleKey);

    if (modules.length === 0) {
      return "";
    }

    for (const module of modules) {
      try {
        const record =
          await RuntimeDataBinding.detail(
            module,
            relationId
          );

        if (!record) {
          continue;
        }

        const label =
          await ERPRelationDataLoader.getLabelAsync(
            record as Record<string, unknown>,
            module.metadata.key,
            depth
          );

        if (label && label !== relationId) {
          return label;
        }
      } catch {
        // Try next alias collection.
      }
    }

    for (const module of modules) {
      try {
        const records =
          await RuntimeDataBinding.list(module);

        const record =
          records.find((item) =>
            String(item.id ?? item._id ?? "") === relationId
          );

        if (!record) {
          continue;
        }

        const label =
          await ERPRelationDataLoader.getLabelAsync(
            record as Record<string, unknown>,
            module.metadata.key,
            depth
          );

        if (label && label !== relationId) {
          return label;
        }
      } catch {
        // Try next alias collection.
      }
    }

    return relationId;
  }
`;

const getLabelAsync = `  // Q21X_C3C_GET_LABEL_ASYNC_FROM_ENGINE
  static async getLabelAsync(
    record: Record<string, unknown>,
    moduleKey = "",
    depth = 1
  ): Promise<string> {
    const engineLabel = await RuntimeRelationLabelEngine.buildLabelAsync({
      moduleKey,
      record,
      modules: allERPModules,
      depth,
      resolveRelationLabel: (targetModuleKey, id, nextDepth) =>
        ERPRelationDataLoader.resolveLabel(targetModuleKey, id, nextDepth),
    });

    if (engineLabel.label) {
      return engineLabel.label;
    }

    return ERPRelationDataLoader.getLabel(record, moduleKey);
  }

`;

try {
  content = replaceMethod(
    content,
    "  static async load(moduleKey: string)",
    newLoad
  );

  content = replaceMethod(
    content,
    "  static async resolveLabel(",
    newResolveLabel
  );

  if (!content.includes("Q21X_C3C_GET_LABEL_ASYNC_FROM_ENGINE")) {
    const getLabelIndex = content.indexOf("  static getLabel(");

    if (getLabelIndex === -1) {
      throw new Error("getLabel method start not found.");
    }

    content =
      content.slice(0, getLabelIndex) +
      getLabelAsync +
      content.slice(getLabelIndex);
  }

  fs.writeFileSync(file, content, "utf8");

  console.log("[Q21X_C3C_WIRED] ERPRelationDataLoader wired by method boundaries.");
  console.log("Next:");
  console.log("  Select-String verification");
  console.log("  pnpm build");
} catch (error) {
  console.error("[ERROR]", error.message);
  process.exit(1);
}