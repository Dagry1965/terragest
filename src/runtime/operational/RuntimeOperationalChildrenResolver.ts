import type { ERPModule } from "@/runtime/modules/ERPModule";
import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { allERPModules } from "@/runtime/modules/definitions/coreModules";

export type RuntimeOperationalRecord = Record<string, any>;

export type RuntimeOperationalExpandedGroup = {
  moduleKey: string;
  moduleLabel: string;
  module: ERPModule;
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

  return `${parentKey}Id`;
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
      module: childModule,
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
