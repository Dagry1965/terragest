"use client";

import { useMemo, useState } from "react";

import type {
  RuntimeOperationalTreeNode,
  RuntimeOperationalTreeNodeRole,
} from "@/runtime/operational";

import { operationalUiTokens } from "./operationalUiTokens";

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

  void currentReturnTo;
  void currentReturnLabel;

  return href;
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
  const indentStyle = {
    paddingLeft: Math.min(node.depth, 8) * 18,
  };

  return (
    <div className="relative">
      <div
        className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-slate-300 hover:shadow-md"
        style={indentStyle}
      >
        <button
          type="button"
          disabled={!hasChildren}
          onClick={() => setExpanded((value) => !value)}
          className={[
            "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-black transition",
            hasChildren
              ? "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              : "border-slate-100 bg-slate-50 text-slate-300",
          ].join(" ")}
          aria-label={expanded ? "Réduire" : "Développer"}
        >
          {hasChildren ? (expanded ? "−" : "+") : "•"}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={[
                "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.18em]",
                getRoleClassName(node.nodeRole),
              ].join(" ")}
            >
              {roleLabel}
            </span>

            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
              {node.moduleLabel}
            </span>

            {node.children.length > 0 ? (
              <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500 ring-1 ring-slate-200">
                {node.children.length} enfant{node.children.length > 1 ? "s" : ""}
              </span>
            ) : null}
          </div>

          <div className="mt-1 truncate text-sm font-black text-slate-900">
            {node.label}
          </div>

          {node.subtitle ? (
            <div className="mt-0.5 truncate text-xs font-medium text-slate-500">
              {node.subtitle}
            </div>
          ) : null}

          {sourceSummary ? (
            <div className="mt-2 rounded-xl border border-cyan-100 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-800">
              Source · {sourceSummary}
            </div>
          ) : null}
        </div>

        {openHref ? (
          <a
            href={openHref}
            className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            {node.openLabel ?? "Ouvrir"}
          </a>
        ) : null}
      </div>

      {hasChildren && expanded ? (
        <div className="mt-2 space-y-2">
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
