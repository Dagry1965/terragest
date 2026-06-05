"use client";

import { useMemo, useState } from "react";

import type {
  RuntimeOperationalTreeNode,
  RuntimeOperationalTreeNodeRole,
} from "@/runtime/operational";

import { operationalUiTokens } from "./operationalUiTokens";
import { appendRuntimeReturnContext } from "@/runtime/navigation/RuntimeReturnContextBuilder";

type ERPOperationalTreeViewProps = {
  tree: RuntimeOperationalTreeNode | null;
  title?: string;
  emptyLabel?: string;
  defaultExpandedDepth?: number;
  currentReturnTo?: string;
  currentReturnLabel?: string;
};

type ERPOperationalTreeNodeProps = {
  node: RuntimeOperationalTreeNode;
  defaultExpandedDepth: number;
  currentReturnTo?: string;
  currentReturnLabel?: string;
};

function getNodeKey(node: RuntimeOperationalTreeNode): string {
  return [node.moduleKey, node.recordId, node.depth].join(":");
}

function getNodeHref(node: RuntimeOperationalTreeNode): string | null {
  if (!node.recordId || !node.moduleKey) {
    return null;
  }

  return "/" + node.moduleKey + "/" + node.recordId + "/edit";
}

function getRoleLabel(role?: RuntimeOperationalTreeNodeRole): string {
  switch (role) {
    case "root":
      return "Racine";
    case "source":
      return "Source";
    case "document":
      return "Document";
    case "line":
      return "Ligne";
    case "payment":
      return "Paiement";
    case "schedule":
      return "Échéance";
    case "reminder":
      return "Relance";
    case "child":
    default:
      return "Élément";
  }
}

function getSummaryToneClassName(tone?: string): string {
  switch (tone) {
    case "success":
      return "border-emerald-200 bg-emerald-50 text-emerald-800";
    case "warning":
      return "border-amber-200 bg-amber-50 text-amber-800";
    case "danger":
      return "border-rose-200 bg-rose-50 text-rose-800";
    case "info":
      return "border-cyan-200 bg-cyan-50 text-cyan-800";
    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
  }
}

function formatSummaryMetricValue(value: unknown, format?: string): string {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (format === "currency") {
    const numberValue = Number(value);

    if (!Number.isFinite(numberValue)) {
      return String(value);
    }

    return new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 0,
    }).format(numberValue);
  }

  if (format === "number") {
    const numberValue = Number(value);

    if (!Number.isFinite(numberValue)) {
      return String(value);
    }

    return new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 2,
    }).format(numberValue);
  }

  if (format === "percent") {
    const numberValue = Number(value);

    if (!Number.isFinite(numberValue)) {
      return String(value);
    }

    return new Intl.NumberFormat("fr-FR", {
      style: "percent",
      maximumFractionDigits: 1,
    }).format(numberValue);
  }

  return String(value);
}

function getRoleClassName(role?: RuntimeOperationalTreeNodeRole): string {
  switch (role) {
    case "root":
      return "border-slate-300 bg-slate-50 text-slate-700";
    case "document":
      return "border-blue-200 bg-blue-50 text-blue-700";
    case "line":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "payment":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "schedule":
      return "border-violet-200 bg-violet-50 text-violet-700";
    case "reminder":
      return "border-rose-200 bg-rose-50 text-rose-700";
    case "source":
      return "border-cyan-200 bg-cyan-50 text-cyan-700";
    case "child":
    default:
      return "border-slate-200 bg-white text-slate-600";
  }
}

function getSourceSummary(node: RuntimeOperationalTreeNode): string | null {
  const source = node.source;

  if (!source) {
    return null;
  }

  const parts = [
    source.sourceScope,
    source.sourceType,
    source.sourceLabel,
    source.sourceModule && source.sourceRecordId
      ? source.sourceModule + " · " + source.sourceRecordId
      : source.sourceModule ?? source.sourceRecordId,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(" · ") : null;
}

function buildOpenHref(
  node: RuntimeOperationalTreeNode,
  currentReturnTo?: string,
  currentReturnLabel?: string
): string | null {
  const href = getNodeHref(node);

  if (!href) {
    return null;
  }

  if (!currentReturnTo && !currentReturnLabel) {
    return href;
  }

  return appendRuntimeReturnContext({
    destinationHref: href,
    returnTo: currentReturnTo,
    returnLabel: currentReturnLabel,
    sourceModule: node.moduleKey,
    sourceRecordId: node.recordId,
    expandedRecordId: node.recordId,
    scrollTargetId: node.recordId,
  });
}

function ERPOperationalTreeNode({
  node,
  defaultExpandedDepth,
  currentReturnTo,
  currentReturnLabel,
}: ERPOperationalTreeNodeProps) {
  const hasChildren = node.children.length > 0;
  const [expanded, setExpanded] = useState(node.depth < defaultExpandedDepth);

  const roleLabel = getRoleLabel(node.nodeRole);
  const sourceSummary = getSourceSummary(node);
  const openHref = buildOpenHref(node, currentReturnTo, currentReturnLabel);
  const childCountLabel =
    node.children.length > 0
      ? node.children.length + " enfant" + (node.children.length > 1 ? "s" : "")
      : null;

  return (
    <div className="relative">
      <div className="relative flex gap-3">
        {node.depth > 0 ? (
          <div className="relative flex w-6 shrink-0 justify-center">
            <div className="absolute bottom-0 top-0 w-px bg-slate-200" />
            <div className="absolute top-5 h-px w-6 translate-x-3 bg-slate-200" />
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          <div className="group relative rounded-2xl border border-slate-200 bg-white/95 px-3 py-2.5 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-md">
            <div className="flex min-w-0 items-start gap-3">
              <button
                type="button"
                disabled={!hasChildren}
                onClick={() => setExpanded((value) => !value)}
                className={[
                  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-black transition",
                  hasChildren
                    ? "border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50"
                    : "border-slate-200 bg-slate-50 text-slate-300",
                ].join(" ")}
                aria-label={expanded ? "Reduire" : "Developper"}
              >
                {hasChildren ? (expanded ? "−" : "+") : "•"}
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={[
                      "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.16em]",
                      getRoleClassName(node.nodeRole),
                    ].join(" ")}
                  >
                    {roleLabel}
                  </span>

                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    {node.moduleLabel}
                  </span>

                  {childCountLabel ? (
                    <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500 ring-1 ring-slate-200">
                      {childCountLabel}
                    </span>
                  ) : null}
                </div>

                <div className="mt-1 truncate text-sm font-black text-slate-950">
                  {node.label}
                </div>

                {node.subtitle ? (
                  <div className="mt-0.5 truncate text-xs font-semibold text-slate-500">
                    {node.subtitle}
                  </div>
                ) : null}

                {sourceSummary ? (
                  <div className="mt-2 inline-flex max-w-full rounded-xl border border-cyan-100 bg-cyan-50 px-2.5 py-1 text-[11px] font-semibold text-cyan-800">
                    <span className="mr-1 font-black uppercase tracking-wide">
                      Source
                    </span>
                    <span className="truncate">{sourceSummary}</span>
                  </div>
                ) : null}

                {node.summary?.badges?.length || node.summary?.metrics?.length ? (
                  <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-2">
                    {node.summary?.badges?.length ? (
                      <div className="flex flex-wrap gap-1.5">
                        {node.summary.badges.map((badge, index) => (
                          <span
                            key={badge.label + "-" + index}
                            className={[
                              "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.14em]",
                              getSummaryToneClassName(badge.tone),
                            ].join(" ")}
                          >
                            {badge.label}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {node.summary?.metrics?.length ? (
                      <div className="mt-2 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-5">
                        {node.summary.metrics.map((metric, index) => (
                          <div
                            key={metric.label + "-" + index}
                            className="rounded-xl border border-white bg-white px-2.5 py-1.5 shadow-sm"
                          >
                            <div className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                              {metric.label}
                            </div>
                            <div className="mt-0.5 truncate text-xs font-black text-slate-900">
                              {formatSummaryMetricValue(metric.value, metric.format)}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}

              </div>

              {openHref ? (
                <a
                  href={openHref}
                  className="mt-0.5 shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  {node.openLabel ?? "Ouvrir"}
                </a>
              ) : null}
            </div>
          </div>

          {hasChildren && expanded ? (
            <div className="relative ml-3 mt-2 space-y-2 border-l border-slate-200 pl-4">
              {node.children.map((child) => (
                <ERPOperationalTreeNode
                  key={getNodeKey(child)}
                  node={child}
                  defaultExpandedDepth={defaultExpandedDepth}
                  currentReturnTo={currentReturnTo}
                  currentReturnLabel={currentReturnLabel}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ERPOperationalTreeView({
  tree,
  title = "Arbre opérationnel",
  emptyLabel = "Aucun arbre opérationnel disponible.",
  defaultExpandedDepth = 2,
  currentReturnTo,
  currentReturnLabel,
}: ERPOperationalTreeViewProps) {
  const totalNodes = useMemo(() => {
    function count(node: RuntimeOperationalTreeNode | null): number {
      if (!node) {
        return 0;
      }

      return 1 + node.children.reduce((sum, child) => sum + count(child), 0);
    }

    return count(tree);
  }, [tree]);

  if (!tree) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="text-sm font-bold text-slate-500">{emptyLabel}</div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
            Runtime tree
          </div>
          <h2 className="mt-1 text-lg font-black text-slate-950">{title}</h2>
        </div>

        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
          {totalNodes} nœud{totalNodes > 1 ? "s" : ""}
        </div>
      </div>

      <div className="space-y-2">
        <ERPOperationalTreeNode
          node={tree}
          defaultExpandedDepth={defaultExpandedDepth}
          currentReturnTo={currentReturnTo}
          currentReturnLabel={currentReturnLabel}
        />
      </div>
    </section>
  );
}
