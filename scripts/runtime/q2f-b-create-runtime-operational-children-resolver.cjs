const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const targetPath = path.join(
  ROOT,
  "src",
  "runtime",
  "operational",
  "RuntimeOperationalChildrenResolver.ts"
);

const indexPath = path.join(
  ROOT,
  "src",
  "runtime",
  "operational",
  "index.ts"
);

const existingResolverPath = path.join(
  ROOT,
  "src",
  "runtime",
  "operational",
  "RuntimeOperationalDataResolver.ts"
);

function readIfExists(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeUtf8(filePath, content) {
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
}

function extractImportSource(content, importedName) {
  const escaped = importedName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(
    `import\\s+(?:type\\s+)?(?:\\{[^}]*\\b${escaped}\\b[^}]*\\}|${escaped})\\s+from\\s+["']([^"']+)["']`,
    "m"
  );
  const match = content.match(regex);
  return match ? match[1] : null;
}

const existingResolver = readIfExists(existingResolverPath);

const runtimeDataBindingImport =
  extractImportSource(existingResolver, "RuntimeDataBinding") ||
  "@/runtime/modules/binding/RuntimeDataBinding";

const allERPModulesImport =
  extractImportSource(existingResolver, "allERPModules") ||
  "@/runtime/modules";

const erpModuleImport =
  extractImportSource(existingResolver, "ERPModule") ||
  "@/runtime/modules/ERPModule";

const content = `import type { ERPModule } from "${erpModuleImport}";
import { RuntimeDataBinding } from "${runtimeDataBindingImport}";
import { allERPModules } from "${allERPModulesImport}";

export type RuntimeOperationalRecord = Record<string, any>;

export type RuntimeOperationalExpandedGroup = {
  moduleKey: string;
  moduleLabel: string;
  parentModuleKey: string;
  parentRecordId: string;
  foreignKey: string;
  openLabel?: string;
  records: RuntimeOperationalRecord[];
  children: RuntimeOperationalExpandedGroup[];
};

export type RuntimeOperationalChildrenResolverRequest = {
  module: ERPModule;
  record: RuntimeOperationalRecord;
  maxDepth?: number;
};

type RuntimeOperationalCompositionChild = {
  moduleKey?: string;
  module?: string;
  foreignKey?: string;
  parentKey?: string;
  label?: string;
  openLabel?: string;
};

function normalizeRecordId(record: RuntimeOperationalRecord): string {
  return String(record?.id ?? record?.uid ?? record?.key ?? "");
}

function getModuleKey(module: ERPModule): string {
  return String((module as any).key ?? (module as any).id ?? "");
}

function getModuleLabel(module: ERPModule): string {
  return String((module as any).label ?? (module as any).name ?? getModuleKey(module));
}

function getCompositionChildren(module: ERPModule): RuntimeOperationalCompositionChild[] {
  const composition = (module as any).composition;
  const children = composition?.children;

  if (!Array.isArray(children)) {
    return [];
  }

  return children.filter(Boolean);
}

function resolveChildModule(child: RuntimeOperationalCompositionChild): ERPModule | null {
  const moduleKey = child.moduleKey ?? child.module;

  if (!moduleKey) {
    return null;
  }

  return (
    (allERPModules as ERPModule[]).find((candidate) => {
      const candidateKey = getModuleKey(candidate);
      return candidateKey === moduleKey;
    }) ?? null
  );
}

function resolveForeignKey(child: RuntimeOperationalCompositionChild, parentModule: ERPModule): string | null {
  if (child.foreignKey) {
    return child.foreignKey;
  }

  if (child.parentKey) {
    return child.parentKey;
  }

  const parentKey = getModuleKey(parentModule);

  if (!parentKey) {
    return null;
  }

  return \`\${parentKey}Id\`;
}

function isVisibleOperationalRecord(record: RuntimeOperationalRecord): boolean {
  if (!record) {
    return false;
  }

  if (record.removedAt) {
    return false;
  }

  const status = String(
    record.statut ??
      record.status ??
      record.etat ??
      ""
  ).toLowerCase();

  if (status === "retiree" || status === "retirée") {
    return false;
  }

  return true;
}

function recordMatchesParent(
  record: RuntimeOperationalRecord,
  foreignKey: string,
  parentRecordId: string
): boolean {
  return String(record?.[foreignKey] ?? "") === String(parentRecordId);
}

async function resolveGroups(params: {
  parentModule: ERPModule;
  parentRecord: RuntimeOperationalRecord;
  depth: number;
  maxDepth: number;
}): Promise<RuntimeOperationalExpandedGroup[]> {
  const { parentModule, parentRecord, depth, maxDepth } = params;

  if (depth >= maxDepth) {
    return [];
  }

  const parentRecordId = normalizeRecordId(parentRecord);

  if (!parentRecordId) {
    return [];
  }

  const children = getCompositionChildren(parentModule);

  if (children.length === 0) {
    return [];
  }

  const groups: RuntimeOperationalExpandedGroup[] = [];

  for (const child of children) {
    const childModule = resolveChildModule(child);
    const foreignKey = childModule ? resolveForeignKey(child, parentModule) : null;

    if (!childModule || !foreignKey) {
      continue;
    }

    const records = await RuntimeDataBinding.list(childModule);

    const filteredRecords = records
      .filter(isVisibleOperationalRecord)
      .filter((record: RuntimeOperationalRecord) =>
        recordMatchesParent(record, foreignKey, parentRecordId)
      );

    const nestedGroupsByRecord = await Promise.all(
      filteredRecords.map((record: RuntimeOperationalRecord) =>
        resolveGroups({
          parentModule: childModule,
          parentRecord: record,
          depth: depth + 1,
          maxDepth,
        })
      )
    );

    groups.push({
      moduleKey: getModuleKey(childModule),
      moduleLabel: getModuleLabel(childModule),
      parentModuleKey: getModuleKey(parentModule),
      parentRecordId,
      foreignKey,
      openLabel: child.openLabel,
      records: filteredRecords,
      children: nestedGroupsByRecord.flat(),
    });
  }

  return groups;
}

export class RuntimeOperationalChildrenResolver {
  static async resolveExpandedChildren(
    request: RuntimeOperationalChildrenResolverRequest
  ): Promise<RuntimeOperationalExpandedGroup[]> {
    const maxDepth = request.maxDepth ?? 2;

    return resolveGroups({
      parentModule: request.module,
      parentRecord: request.record,
      depth: 0,
      maxDepth,
    });
  }
}
`;

ensureDir(path.dirname(targetPath));
writeUtf8(targetPath, content);

let indexContent = readIfExists(indexPath);

if (!indexContent.includes("RuntimeOperationalChildrenResolver")) {
  const exportLine = `export * from "./RuntimeOperationalChildrenResolver";\n`;
  indexContent = indexContent.trimEnd() + "\n" + exportLine;
  writeUtf8(indexPath, indexContent);
}

const checks = [
  {
    label: "RuntimeOperationalChildrenResolver file created",
    ok: fs.existsSync(targetPath),
  },
  {
    label: "resolveExpandedChildren present",
    ok: readIfExists(targetPath).includes("resolveExpandedChildren"),
  },
  {
    label: "RuntimeOperationalExpandedGroup type present",
    ok: readIfExists(targetPath).includes("RuntimeOperationalExpandedGroup"),
  },
  {
    label: "RuntimeOperationalChildrenResolverRequest type present",
    ok: readIfExists(targetPath).includes("RuntimeOperationalChildrenResolverRequest"),
  },
  {
    label: "uses RuntimeDataBinding.list",
    ok: readIfExists(targetPath).includes("RuntimeDataBinding.list"),
  },
  {
    label: "uses allERPModules",
    ok: readIfExists(targetPath).includes("allERPModules"),
  },
  {
    label: "filters removedAt",
    ok: readIfExists(targetPath).includes("removedAt"),
  },
  {
    label: "filters retiree status",
    ok: readIfExists(targetPath).includes("retiree"),
  },
  {
    label: "exported from operational index",
    ok: readIfExists(indexPath).includes('export * from "./RuntimeOperationalChildrenResolver";'),
  },
];

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-F-B] RuntimeOperationalChildrenResolver foundation");
console.log("");

for (const check of checks) {
  console.log(`${check.ok ? "[OK]" : "[FAIL]"} ${check.label}`);
}

console.log("");
console.log(`[SUMMARY] OK: ${checks.length - failed.length} FAIL: ${failed.length}`);

if (failed.length > 0) {
  process.exit(1);
}

console.log("");
console.log("[DONE] Q2-F-B foundation created.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
