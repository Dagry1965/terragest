"use client";

const getOperationalToken = (path: string, fallback: string): string => {
  const value = path
    .split(".")
    .reduce<unknown>((acc, key) => {
      if (!acc || typeof acc !== "object") {
        return undefined;
      }

      return (acc as Record<string, unknown>)[key];
    }, operationalUiTokens);

  return typeof value === "string" ? value : fallback;
};

const expandedChildrenTokens = {
  wrapper: getOperationalToken(
    "expandedChildren.wrapper",
    "rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm"
  ),
  section: getOperationalToken(
    "expandedChildren.section",
    "rounded-xl border border-slate-100 bg-slate-50/70 p-3"
  ),
  header: getOperationalToken(
    "expandedChildren.header",
    "mb-3 flex items-center justify-between gap-3"
  ),
  title: getOperationalToken(
    "expandedChildren.title",
    "text-sm font-semibold text-slate-900"
  ),
  subtitle: getOperationalToken(
    "expandedChildren.subtitle",
    "text-xs text-slate-500"
  ),
  list: getOperationalToken(
    "expandedChildren.list",
    "space-y-2"
  ),
  item: getOperationalToken(
    "expandedChildren.item",
    "rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/40"
  ),
  itemTitle: getOperationalToken(
    "expandedChildren.itemTitle",
    "text-sm font-medium text-slate-900"
  ),
  itemMeta: getOperationalToken(
    "expandedChildren.itemMeta",
    "text-xs text-slate-500"
  ),
  empty: getOperationalToken(
    "expandedChildren.empty",
    "rounded-xl border border-dashed border-slate-200 bg-white/70 px-3 py-4 text-sm text-slate-500"
  ),
  action: getOperationalToken(
    "expandedChildren.action",
    "inline-flex items-center rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"
  ),
};
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import type {
  ERPCompositionChild,
  ERPModule,
} from "@/runtime/modules/ERPModule";
import { RuntimeOperationalChildrenResolver } from "@/runtime/operational";
import { ERPRuntimeFieldValue } from "@/components/erp/runtime/ERPRuntimeFieldValue";

import { operationalUiTokens } from "./operationalUiTokens";
type ExpandedGroup = {
  child: ERPCompositionChild;
  module: ERPModule;
  records: Record<string, unknown>[];
  grandchildrenByParentId: Record<string, ExpandedGroup[]>;
};

type ERPOperationalExpandedChildrenProps = {
  parentModule: ERPModule;
  parentRecord: Record<string, unknown>;
};

function getRecordId(record: Record<string, unknown>): string {
  return String(record.id ?? record._id ?? record.uid ?? "").trim();
}

function buildRecordHref(moduleKey: string, record: Record<string, unknown>): string {
  const id = getRecordId(record);

  if (!id) {
    return "#";
  }

  return "/" + moduleKey + "/" + id + "/edit";
}

function getOpenLabel(child: ERPCompositionChild): string {
  return child.openLabel ?? "Ouvrir";
}

function isVisibleRuntimeRecord(record: Record<string, unknown>): boolean {
  if (record.removedAt) return false;

  const status = String(record.statut ?? record.status ?? "").toLowerCase();

  return status !== "retiree";
}

function getDisplayFields(
  module: ERPModule,
  child?: ERPCompositionChild
): string[] {
  const preferred = [
    ...(child?.labelFields ?? []),
    ...(child?.subtitleFields ?? []),
  ];

  if (preferred.length > 0) {
    return Array.from(new Set(preferred)).slice(0, 5);
  }

  return module.schema.fields
    .filter((field) => field.list?.visible || field.list?.order !== undefined)
    .sort((a, b) => Number(a.list?.order ?? 999) - Number(b.list?.order ?? 999))
    .map((field) => field.key)
    .slice(0, 5);
}

function getField(module: ERPModule, key: string) {
  return module.schema.fields.find((field) => field.key === key);
}

async function loadExpandedGroups(
  parentModule: ERPModule,
  parentRecord: Record<string, unknown>
): Promise<ExpandedGroup[]> {
  const resolvedGroups = await RuntimeOperationalChildrenResolver.resolveExpandedChildren({
    module: parentModule,
    record: parentRecord,
    maxDepth: 2,
  });

  const rootChildren = parentModule.composition?.children ?? [];

  return resolvedGroups
    .map((group) => {
      const child = rootChildren.find(
        (candidate) => candidate.moduleKey === group.moduleKey
      );

      if (!child) {
        return null;
      }

      const module = group.module;

      const grandchildrenByParentId: Record<string, ExpandedGroup[]> = {};

      for (const record of group.records) {
        const recordId = getRecordId(record);

        if (!recordId) {
          continue;
        }

        grandchildrenByParentId[recordId] = group.children
          .filter((childGroup) => childGroup.parentRecordId === recordId)
          .map((childGroup) => {
            const nestedChild: ERPCompositionChild = {
              key: childGroup.moduleKey,
              title: childGroup.moduleLabel,
              moduleKey: childGroup.moduleKey,
              foreignKey: childGroup.foreignKey,
              openLabel: childGroup.openLabel,
            };

            const nestedModule = childGroup.module;

            return {
              child: nestedChild,
              module: nestedModule,
              records: childGroup.records,
              grandchildrenByParentId: {},
            };
          })
          .filter((nestedGroup) => nestedGroup.records.length > 0);
      }

      return {
        child,
        module,
        records: group.records,
        grandchildrenByParentId,
      };
    })
    .filter((group): group is ExpandedGroup => Boolean(group));
}

export function ERPOperationalExpandedChildren({
  parentModule,
  parentRecord,
}: ERPOperationalExpandedChildrenProps) {
  const parentRecordId = getRecordId(parentRecord);
  const children = useMemo(
    () => parentModule.composition?.children ?? [],
    [parentModule]
  );

  const [groups, setGroups] = useState<ExpandedGroup[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!parentRecordId || children.length === 0) {
        setGroups([]);
        return;
      }

      setLoading(true);

      try {
        const loadedGroups = await loadExpandedGroups(parentModule, parentRecord);

        if (mounted) {
          setGroups(loadedGroups.filter((group) => group.records.length > 0));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [parentModule, parentRecord, parentRecordId, children]);

  if (children.length === 0) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
      {loading ? (
        <p className="text-sm font-semibold text-slate-500">
          Chargement des éléments liés...
        </p>
      ) : null}

      {!loading && groups.length === 0 ? (
        <p className="text-sm font-semibold text-slate-500">
          Aucun élément lié à afficher.
        </p>
      ) : null}

      <div className="space-y-4">
        {groups.map((group) => {
          const fields = getDisplayFields(group.module, group.child);

          return (
            <section
              key={group.child.key}
              className="rounded-3xl border border-slate-200 bg-white p-4"
            >
              <div className={expandedChildrenTokens.header}>
                <div>
                  <h3 className="text-sm font-black text-[#10251C]">
                    {group.child.title ?? group.module.metadata.label}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500">
                    {group.records.length} enregistrement(s) lié(s)
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {group.records.map((record) => {
                  const recordId = getRecordId(record);
                  const grandchildGroups =
                    group.grandchildrenByParentId[recordId] ?? [];

                  return (
                    <div
                      key={recordId}
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-3"
                    >
                      <div className="mb-3 flex justify-end">
                        <Link
                          href={buildRecordHref(group.module.metadata.key, record)}
                          className="rounded-2xl border border-emerald-200 bg-white px-3 py-2 text-xs font-black text-emerald-700 transition hover:bg-emerald-50"
                        >
                          {getOpenLabel(group.child)}
                        </Link>
                      </div>

                      <div className="grid gap-2 md:grid-cols-4">
                        {fields.map((fieldKey) => {
                          const field = getField(group.module, fieldKey);

                          if (!field) return null;

                          return (
                            <div key={fieldKey}>
                              <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                                {field.label}
                              </p>
                              <p className="mt-1 text-xs font-bold text-slate-700">
                                <ERPRuntimeFieldValue
                                  field={field}
                                  value={record[fieldKey]}
                                />
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      {grandchildGroups.length > 0 ? (
                        <div className="mt-3 space-y-2 border-t border-slate-200 pt-3">
                          {grandchildGroups.map((grandchildGroup) => {
                            const grandchildFields = getDisplayFields(
                              grandchildGroup.module,
                              grandchildGroup.child
                            );

                            return (
                              <div key={grandchildGroup.child.key}>
                                <p className="mb-2 text-xs font-black uppercase tracking-wide text-emerald-700">
                                  {grandchildGroup.child.title ??
                                    grandchildGroup.module.metadata.label}
                                </p>

                                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                                  <table className="w-full text-left text-xs">
                                    <thead className="bg-slate-50">
                                      <tr>
                                        {grandchildFields.map((fieldKey) => {
                                          const field = getField(
                                            grandchildGroup.module,
                                            fieldKey
                                          );

                                          return (
                                            <th
                                              key={fieldKey}
                                              className="px-3 py-2 font-black uppercase tracking-wide text-slate-400"
                                            >
                                              {field?.label ?? fieldKey}
                                            </th>
                                          );
                                        })}

                                        <th className="px-3 py-2 text-right font-black uppercase tracking-wide text-slate-400">
                                          Action
                                        </th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {grandchildGroup.records.map((line) => (
                                        <tr
                                          key={getRecordId(line)}
                                          className="border-t border-slate-100"
                                        >
                                          {grandchildFields.map((fieldKey) => {
                                            const field = getField(
                                              grandchildGroup.module,
                                              fieldKey
                                            );

                                            if (!field) return null;

                                            return (
                                              <td
                                                key={fieldKey}
                                                className="px-3 py-2 font-semibold text-slate-700"
                                              >
                                                <ERPRuntimeFieldValue
                                                  field={field}
                                                  value={line[fieldKey]}
                                                />
                                              </td>
                                            );
                                          })}

                                          <td className="px-3 py-2 text-right">
                                            <Link
                                              href={buildRecordHref(
                                                grandchildGroup.module.metadata.key,
                                                line
                                              )}
                                              className="rounded-xl border border-emerald-200 bg-white px-2.5 py-1.5 text-[11px] font-black text-emerald-700 transition hover:bg-emerald-50"
                                            >
                                              {getOpenLabel(grandchildGroup.child)}
                                            </Link>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
