const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rel = "src/runtime/operational/RuntimeOperationalChildrenResolver.ts";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + rel);
}

const original = fs.readFileSync(file, "utf8");

fs.writeFileSync(
  file + ".bak-q2f-b4-compatible-expanded-group-shape",
  original,
  "utf8"
);

const content = `import type {
  ERPCompositionChild,
  ERPModule,
} from "@/runtime/modules/ERPModule";

import {
  RuntimeDataBinding,
} from "@/runtime/data-binding/RuntimeDataBinding";

import {
  allERPModules,
} from "@/runtime/modules/definitions/coreModules";

export type RuntimeOperationalExpandedGroup = {
  child: ERPCompositionChild;
  moduleKey: string;
  moduleLabel: string;
  foreignKey: string;
  openLabel?: string;
  parentRecordId?: string;
  module: ERPModule;
  records: Record<string, unknown>[];
  children: RuntimeOperationalExpandedGroup[];
  grandchildrenByParentId: Record<string, RuntimeOperationalExpandedGroup[]>;
};

export type RuntimeOperationalChildrenResolverRequest = {
  parentModule?: ERPModule;
  parentRecord?: Record<string, unknown>;

  module?: ERPModule;
  record?: Record<string, unknown>;

  maxDepth?: number;
};

function getRecordId(record: Record<string, unknown>): string {
  return String(record.id ?? record._id ?? record.uid ?? "").trim();
}

function getModule(moduleKey: string): ERPModule | undefined {
  return allERPModules.find((module) => module.metadata.key === moduleKey);
}

function isVisibleRuntimeRecord(record: Record<string, unknown>): boolean {
  if (record.removedAt) return false;

  const status = String(record.statut ?? record.status ?? "").toLowerCase();

  return status !== "retiree";
}

async function resolveChildGroup(
  child: ERPCompositionChild,
  parentRecordId: string,
  depth: number,
  maxDepth: number
): Promise<RuntimeOperationalExpandedGroup | null> {
  const module = getModule(child.moduleKey);

  if (!module) {
    return null;
  }

  const records = (await RuntimeDataBinding.list(module)).filter(
    (record) =>
      String(record[child.foreignKey] ?? "").trim() === parentRecordId &&
      isVisibleRuntimeRecord(record)
  );

  const children: RuntimeOperationalExpandedGroup[] = [];
  const grandchildrenByParentId: Record<string, RuntimeOperationalExpandedGroup[]> = {};

  if (depth < maxDepth) {
    for (const record of records) {
      const recordId = getRecordId(record);

      if (!recordId) continue;

      const grandchildConfigs = module.composition?.children ?? [];

      const groups = (
        await Promise.all(
          grandchildConfigs.map((grandchild) =>
            resolveChildGroup(grandchild, recordId, depth + 1, maxDepth)
          )
        )
      ).filter(Boolean) as RuntimeOperationalExpandedGroup[];

      const groupsWithParent = groups.map((group) => ({
        ...group,
        parentRecordId: recordId,
      }));

      if (groupsWithParent.length > 0) {
        grandchildrenByParentId[recordId] = groupsWithParent;
        children.push(...groupsWithParent);
      }
    }
  }

  return {
    child,
    moduleKey: child.moduleKey,
    moduleLabel: module.metadata.label,
    foreignKey: child.foreignKey,
    openLabel: child.openLabel,
    parentRecordId,
    module,
    records,
    children,
    grandchildrenByParentId,
  };
}

export class RuntimeOperationalChildrenResolver {
  static async resolveExpandedChildren(
    request: RuntimeOperationalChildrenResolverRequest
  ): Promise<RuntimeOperationalExpandedGroup[]> {
    const parentModule = request.parentModule ?? request.module;
    const parentRecord = request.parentRecord ?? request.record;
    const maxDepth = Math.max(1, request.maxDepth ?? 2);

    if (!parentModule || !parentRecord) {
      return [];
    }

    const parentRecordId = getRecordId(parentRecord);

    if (!parentRecordId) {
      return [];
    }

    const children = parentModule.composition?.children ?? [];

    if (children.length === 0) {
      return [];
    }

    return (
      await Promise.all(
        children.map((child) =>
          resolveChildGroup(child, parentRecordId, 1, maxDepth)
        )
      )
    ).filter(Boolean) as RuntimeOperationalExpandedGroup[];
  }
}
`;

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q2-F-B4 RuntimeOperationalChildrenResolver compatible avec ERPOperationalExpandedChildren.");
console.log("[WRITTEN]", rel);
console.log("");
console.log("Next:");
console.log("pnpm build");
