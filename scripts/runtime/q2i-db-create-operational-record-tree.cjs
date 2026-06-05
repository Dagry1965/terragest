const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rel = "src/components/erp/operational/ERPOperationalRecordTree.tsx";
const file = path.join(ROOT, rel);

if (fs.existsSync(file)) {
  fs.writeFileSync(
    file + ".bak-q2i-db-create-operational-record-tree",
    fs.readFileSync(file, "utf8"),
    "utf8"
  );
}

const content = `"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import type { ERPModule } from "@/runtime/modules/ERPModule";
import {
  RuntimeOperationalTreeResolver,
  type RuntimeOperationalTreeNode,
} from "@/runtime/operational";
import {
  buildRuntimeCurrentReturnTo,
  buildRuntimeReturnLabel,
} from "@/runtime/navigation/RuntimeReturnContextBuilder";

import { ERPOperationalTreeView } from "./ERPOperationalTreeView";

type ERPOperationalRecordTreeProps = {
  parentModule: ERPModule;
  parentRecord: Record<string, unknown>;
  title?: string;
  emptyLabel?: string;
  defaultExpandedDepth?: number;
};

function getRecordId(record: Record<string, unknown>): string {
  return String(record.id ?? record._id ?? record.uid ?? "").trim();
}

export function ERPOperationalRecordTree({
  parentModule,
  parentRecord,
  title,
  emptyLabel,
  defaultExpandedDepth = 2,
}: ERPOperationalRecordTreeProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const parentRecordId = getRecordId(parentRecord);

  const currentReturnTo = useMemo(
    () =>
      buildRuntimeCurrentReturnTo({
        currentPath: pathname,
        currentQuery: searchParams,
        expandedRecordId: parentRecordId,
        scrollTargetId: parentRecordId,
      }),
    [pathname, searchParams, parentRecordId]
  );

  const currentReturnLabel = useMemo(
    () =>
      buildRuntimeReturnLabel(
        null,
        parentModule.metadata.label,
        parentModule.metadata.key
      ),
    [parentModule]
  );

  const [tree, setTree] = useState<RuntimeOperationalTreeNode | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadTree() {
      if (!parentRecordId) {
        setTree(null);
        return;
      }

      setLoading(true);

      try {
        const resolvedTree = await RuntimeOperationalTreeResolver.resolveTree({
          rootModule: parentModule,
          rootRecord: parentRecord,
          maxDepth: 3,
        });

        if (mounted) {
          setTree(resolvedTree);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadTree();

    return () => {
      mounted = false;
    };
  }, [parentModule, parentRecord, parentRecordId]);

  if (loading) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-bold text-slate-500">
          Chargement de l'arbre operationnel...
        </p>
      </section>
    );
  }

  return (
    <ERPOperationalTreeView
      tree={tree}
      title={title ?? "Arbre operationnel"}
      emptyLabel={emptyLabel ?? "Aucun arbre operationnel disponible."}
      defaultExpandedDepth={defaultExpandedDepth}
      currentReturnTo={currentReturnTo}
      currentReturnLabel={currentReturnLabel}
    />
  );
}
`;

fs.mkdirSync(path.dirname(file), { recursive: true });
fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q2-I-D-B operational record tree component created.");
console.log("[WRITTEN]", rel);
