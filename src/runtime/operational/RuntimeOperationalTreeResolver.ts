import type { ERPModule } from "@/runtime/modules/ERPModule";
import {
  RuntimeOperationalChildrenResolver,
  type RuntimeOperationalExpandedGroup,
} from "./RuntimeOperationalChildrenResolver";

type ERPModuleLike = ERPModule & {
  key?: string;
  metadata?: {
    key?: string;
    label?: string;
    title?: string;
  };
  schema?: {
    collection?: string;
  };
};

export type RuntimeOperationalTreeSummaryTone =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info";

export type RuntimeOperationalTreeMetricFormat =
  | "text"
  | "number"
  | "currency"
  | "percent";

export interface RuntimeOperationalTreeSummaryBadge {
  label: string;
  tone?: RuntimeOperationalTreeSummaryTone;
}

export interface RuntimeOperationalTreeSummaryMetric {
  label: string;
  value: unknown;
  format?: RuntimeOperationalTreeMetricFormat;
}

export interface RuntimeOperationalTreeSummary {
  badges?: RuntimeOperationalTreeSummaryBadge[];
  metrics?: RuntimeOperationalTreeSummaryMetric[];
}

export type RuntimeOperationalTreeNodeRole =
  | "root"
  | "child"
  | "source"
  | "document"
  | "line"
  | "payment"
  | "schedule"
  | "reminder";

export type RuntimeOperationalTreeSource = {
  sourceScope?: string;
  sourceType?: string;
  sourceModule?: string;
  sourceRecordId?: string;
  sourceLabel?: string;
};

export type RuntimeOperationalTreeNode = {
  id: string;
  recordId: string;
  moduleKey: string;
  moduleLabel: string;
  record: Record<string, unknown>;
  label: string;
  subtitle?: string;
  openLabel?: string;
  depth: number;
  nodeRole?: RuntimeOperationalTreeNodeRole;
  source?: RuntimeOperationalTreeSource;
  summary?: RuntimeOperationalTreeSummary;
  children: RuntimeOperationalTreeNode[];
};

export type RuntimeOperationalTreeResolverRequest = {
  rootModule: ERPModule;
  rootRecord: Record<string, unknown>;
  maxDepth?: number;
};

function getRecordId(record: Record<string, unknown>): string {
  return String(record.id ?? record._id ?? record.uid ?? "").trim();
}

function stringifyValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (value instanceof Date) return value.toISOString();
  return "";
}

function getFieldValues(
  record: Record<string, unknown>,
  fields: string[] | undefined
): string[] {
  if (!fields || fields.length === 0) return [];

  return fields
    .map((field) => stringifyValue(record[field]))
    .filter(Boolean);
}

function getModuleKey(module: ERPModule): string {
  const moduleLike = module as ERPModuleLike;

  return String(
    moduleLike.key ??
      moduleLike.metadata?.key ??
      moduleLike.schema?.collection ??
      ""
  ).trim();
}

function getModuleLabel(module: ERPModule): string {
  const moduleLike = module as ERPModuleLike;
  const key = getModuleKey(module);

  return String(
    moduleLike.metadata?.label ??
      moduleLike.metadata?.title ??
      key ??
      "Module"
  ).trim();
}

function buildLabel(module: ERPModule, record: Record<string, unknown>): string {
  const compositionLabel = getFieldValues(
    record,
    module.composition?.labelFields
  );

  if (compositionLabel.length > 0) {
    return compositionLabel.join(" · ");
  }

  const fallbackFields = [
    "numeroFacture",
    "numeroIntervention",
    "numeroRendezVous",
    "code",
    "nom",
    "prenom",
    "immatriculation",
    "designation",
    "libelle",
    "label",
  ];

  const fallback = getFieldValues(record, fallbackFields);

  if (fallback.length > 0) {
    return fallback.slice(0, 3).join(" · ");
  }

  const id = getRecordId(record);

  return id ? getModuleLabel(module) + " · " + id : getModuleLabel(module);
}

function buildSubtitle(module: ERPModule, record: Record<string, unknown>): string | undefined {
  const moduleWithOptionalSubtitle = module as ERPModule & {
    composition?: {
      subtitleFields?: string[];
    };
  };

  const compositionSubtitle = getFieldValues(
    record,
    moduleWithOptionalSubtitle.composition?.subtitleFields
  );

  if (compositionSubtitle.length > 0) {
    return compositionSubtitle.join(" · ");
  }

  const fallbackFields = [
    "statut",
    "status",
    "statutPaiement",
    "dateRendezVous",
    "dateIntervention",
    "dateFacture",
    "dateEcheance",
    "montantTTC",
    "resteAPayer",
    "sourceLabel",
  ];

  const fallback = getFieldValues(record, fallbackFields);

  return fallback.length > 0 ? fallback.slice(0, 4).join(" · ") : undefined;
}

function buildSource(record: Record<string, unknown>): RuntimeOperationalTreeSource | undefined {
  const source: RuntimeOperationalTreeSource = {
    sourceScope: stringifyValue(record.sourceScope) || undefined,
    sourceType: stringifyValue(record.sourceType) || undefined,
    sourceModule: stringifyValue(record.sourceModule) || undefined,
    sourceRecordId: stringifyValue(record.sourceRecordId) || undefined,
    sourceLabel: stringifyValue(record.sourceLabel) || undefined,
  };

  if (
    source.sourceScope ||
    source.sourceType ||
    source.sourceModule ||
    source.sourceRecordId ||
    source.sourceLabel
  ) {
    return source;
  }

  return undefined;
}

function inferNodeRole(
  moduleKey: string,
  depth: number,
  source: RuntimeOperationalTreeSource | undefined
): RuntimeOperationalTreeNodeRole {
  if (depth === 0) return "root";

  const key = moduleKey.toLowerCase();

  if (source?.sourceModule || source?.sourceRecordId) return "document";
  if (key.includes("ligne")) return "line";
  if (key.includes("facture") || key.includes("invoice")) return "document";
  if (key.includes("encaissement") || key.includes("paiement") || key.includes("payment")) return "payment";
  if (key.includes("echeance") || key.includes("échéance") || key.includes("schedule")) return "schedule";
  if (key.includes("rappel") || key.includes("relance") || key.includes("reminder")) return "reminder";

  return "child";
}

function buildNode(params: {
  module: ERPModule;
  record: Record<string, unknown>;
  depth: number;
  openLabel?: string;
  children?: RuntimeOperationalTreeNode[];
}): RuntimeOperationalTreeNode {
  const moduleKey = getModuleKey(params.module);
  const source = buildSource(params.record);
  const recordId = getRecordId(params.record);

  return {
    id: moduleKey + ":" + recordId + ":" + params.depth,
    recordId,
    moduleKey,
    moduleLabel: getModuleLabel(params.module),
    record: params.record,
    label: buildLabel(params.module, params.record),
    subtitle: buildSubtitle(params.module, params.record),
    openLabel: params.openLabel,
    depth: params.depth,
    nodeRole: inferNodeRole(moduleKey, params.depth, source),
    source,
    children: params.children ?? [],
  };
}

function buildNodesFromGroup(
  group: RuntimeOperationalExpandedGroup,
  depth: number
): RuntimeOperationalTreeNode[] {
  return group.records.map((record) => {
    const recordId = getRecordId(record);

    const childNodes = group.children
      .filter((childGroup) => childGroup.parentRecordId === recordId)
      .flatMap((childGroup) => buildNodesFromGroup(childGroup, depth + 1));

    return buildNode({
      module: group.module,
      record,
      depth,
      openLabel: group.openLabel,
      children: childNodes,
    });
  });
}

export class RuntimeOperationalTreeResolver {
  static async resolveTree(
    request: RuntimeOperationalTreeResolverRequest
  ): Promise<RuntimeOperationalTreeNode> {
    const maxDepth = Math.max(0, request.maxDepth ?? 5);

    const expandedGroups =
      await RuntimeOperationalChildrenResolver.resolveExpandedChildren({
        parentModule: request.rootModule,
        parentRecord: request.rootRecord,
        maxDepth,
      });

    const children = expandedGroups.flatMap((group) =>
      buildNodesFromGroup(group, 1)
    );

    return buildNode({
      module: request.rootModule,
      record: request.rootRecord,
      depth: 0,
      children,
    });
  }
}
