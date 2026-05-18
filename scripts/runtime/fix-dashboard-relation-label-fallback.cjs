const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(
  root,
  "src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts"
);

let content = fs.readFileSync(target, "utf8");

if (!content.includes("const relationOptionsCache")) {
  content = content.replace(
`const relationLabelCache = new Map<string, string>();`,
`const relationLabelCache = new Map<string, string>();
const relationOptionsCache = new Map<string, Array<{ id: string; label: string }>>();`
  );
}

const oldFunction = `async function resolveRelationLabel(
  moduleKey: string,
  id: unknown
): Promise<string> {
  const relationId = String(id ?? "").trim();

  if (!moduleKey || !relationId) {
    return "";
  }

  const cacheKey = moduleKey + ":" + relationId;
  const cached = relationLabelCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const label = await ERPRelationDataLoader.resolveLabel(
    moduleKey,
    relationId
  );

  const resolved = label || relationId;
  relationLabelCache.set(cacheKey, resolved);

  return resolved;
}`;

const newFunction = `async function resolveRelationLabel(
  moduleKey: string,
  id: unknown
): Promise<string> {
  const relationId = String(id ?? "").trim();

  if (!moduleKey || !relationId) {
    return "";
  }

  const cacheKey = moduleKey + ":" + relationId;
  const cached = relationLabelCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  let resolved = "";

  try {
    const directLabel = await ERPRelationDataLoader.resolveLabel(
      moduleKey,
      relationId
    );

    if (directLabel && directLabel !== relationId) {
      resolved = directLabel;
    }
  } catch {
    resolved = "";
  }

  if (!resolved) {
    try {
      let options = relationOptionsCache.get(moduleKey);

      if (!options) {
        options = await ERPRelationDataLoader.load(moduleKey);
        relationOptionsCache.set(moduleKey, options);
      }

      const match = options.find(
        (option) => String(option.id) === relationId
      );

      if (match?.label && match.label !== relationId) {
        resolved = match.label;
      }
    } catch {
      resolved = "";
    }
  }

  if (!resolved) {
    resolved = relationId;
  }

  relationLabelCache.set(cacheKey, resolved);

  return resolved;
}`;

if (!content.includes(oldFunction)) {
  console.error("FAILED: resolveRelationLabel function pattern not found.");
  process.exit(1);
}

content = content.replace(oldFunction, newFunction);

fs.writeFileSync(target, content, "utf8");

console.log("OK: dashboard relation label fallback strengthened.");