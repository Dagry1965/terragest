const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function writeFile(rel, content) {
  const file = path.join(ROOT, rel);

  if (fs.existsSync(file)) {
    fs.writeFileSync(file + ".bak-q2a-e2-operational-polish-expand", fs.readFileSync(file, "utf8"), "utf8");
  }

  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("[WRITTEN]", rel);
}

/**
 * 1. KPI avec vrais pictos lucide
 */
writeFile(
  "src/components/erp/operational/ERPOperationalKpiStrip.tsx",
  `"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
  Activity,
  BarChart3,
} from "lucide-react";

import type {
  ERPOperationalKpiConfig,
} from "@/runtime/modules/ERPModule";

type ERPOperationalKpiStripProps = {
  kpis?: ERPOperationalKpiConfig[];
  data: Record<string, unknown>[];
};

function getKpiValue(
  kpi: ERPOperationalKpiConfig,
  data: Record<string, unknown>[]
): number {
  if (kpi.count || !kpi.field) {
    return data.length;
  }

  return data.filter((record) => record[kpi.field ?? ""] === kpi.equals).length;
}

function getToneClass(tone?: string): string {
  switch (tone) {
    case "green":
      return "border-emerald-100 bg-white text-emerald-700";
    case "orange":
      return "border-amber-100 bg-white text-amber-700";
    case "red":
      return "border-red-100 bg-white text-red-700";
    case "purple":
      return "border-purple-100 bg-white text-purple-700";
    case "gray":
      return "border-slate-100 bg-white text-slate-600";
    case "blue":
    default:
      return "border-sky-100 bg-white text-sky-700";
  }
}

function getIconToneClass(tone?: string): string {
  switch (tone) {
    case "green":
      return "bg-emerald-50 text-emerald-700 ring-emerald-100";
    case "orange":
      return "bg-amber-50 text-amber-700 ring-amber-100";
    case "red":
      return "bg-red-50 text-red-700 ring-red-100";
    case "purple":
      return "bg-purple-50 text-purple-700 ring-purple-100";
    case "gray":
      return "bg-slate-50 text-slate-600 ring-slate-100";
    case "blue":
    default:
      return "bg-sky-50 text-sky-700 ring-sky-100";
  }
}

function renderKpiIcon(icon?: string) {
  const key = String(icon ?? "").toLowerCase();

  if (key.includes("calendar")) return <CalendarDays className="h-5 w-5" />;
  if (key.includes("check")) return <CheckCircle2 className="h-5 w-5" />;
  if (key.includes("clock")) return <Clock3 className="h-5 w-5" />;
  if (key.includes("x")) return <XCircle className="h-5 w-5" />;
  if (key.includes("bar")) return <BarChart3 className="h-5 w-5" />;

  return <Activity className="h-5 w-5" />;
}

export function ERPOperationalKpiStrip({
  kpis = [],
  data,
}: ERPOperationalKpiStripProps) {
  if (kpis.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <div
          key={kpi.key}
          className={[
            "group relative overflow-hidden rounded-[1.45rem] border p-4 shadow-[0_12px_35px_rgba(15,23,42,0.055)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(15,23,42,0.09)]",
            getToneClass(kpi.tone),
          ].join(" ")}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
                {kpi.label}
              </p>
              <p className="mt-2 text-[2.15rem] font-black leading-none tracking-tight">
                {getKpiValue(kpi, data)}
              </p>
            </div>

            <div
              className={[
                "flex h-11 w-11 items-center justify-center rounded-2xl ring-1",
                getIconToneClass(kpi.tone),
              ].join(" ")}
            >
              {renderKpiIcon(kpi.icon)}
            </div>
          </div>

          {kpi.description ? (
            <p className="mt-2 line-clamp-2 text-xs font-semibold leading-5 text-slate-500">
              {kpi.description}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
`
);

/**
 * 2. Expand générique enfants / petits-enfants
 */
writeFile(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  `"use client";

import { useEffect, useMemo, useState } from "react";

import type {
  ERPCompositionChild,
  ERPModule,
} from "@/runtime/modules/ERPModule";
import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { allERPModules } from "@/runtime/modules/definitions/coreModules";
import { ERPRuntimeFieldValue } from "@/components/erp/runtime/ERPRuntimeFieldValue";

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

function isVisibleRuntimeRecord(record: Record<string, unknown>): boolean {
  if (record.removedAt) return false;

  const status = String(record.statut ?? record.status ?? "").toLowerCase();

  return status !== "retiree";
}

function getModule(moduleKey: string): ERPModule | undefined {
  return allERPModules.find((module) => module.metadata.key === moduleKey);
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

async function loadChildGroup(
  parentRecordId: string,
  child: ERPCompositionChild
): Promise<ExpandedGroup | null> {
  const module = getModule(child.moduleKey);

  if (!module) {
    return null;
  }

  const records = (await RuntimeDataBinding.list(module)).filter(
    (record) =>
      String(record[child.foreignKey] ?? "").trim() === parentRecordId &&
      isVisibleRuntimeRecord(record)
  );

  const grandchildrenByParentId: Record<string, ExpandedGroup[]> = {};

  for (const record of records) {
    const recordId = getRecordId(record);

    if (!recordId) continue;

    const grandchildren = module.composition?.children ?? [];
    const groups: ExpandedGroup[] = [];

    for (const grandchild of grandchildren) {
      const group = await loadChildGroup(recordId, grandchild);

      if (group && group.records.length > 0) {
        groups.push(group);
      }
    }

    grandchildrenByParentId[recordId] = groups;
  }

  return {
    child,
    module,
    records,
    grandchildrenByParentId,
  };
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
        const loadedGroups = await Promise.all(
          children.map((child) => loadChildGroup(parentRecordId, child))
        );

        if (mounted) {
          setGroups(
            loadedGroups.filter(
              (group): group is ExpandedGroup =>
                Boolean(group) && (group?.records.length ?? 0) > 0
            )
          );
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
  }, [parentRecordId, children]);

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
              <div className="mb-3 flex items-center justify-between gap-3">
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
                  const grandchildGroups = group.grandchildrenByParentId[recordId] ?? [];

                  return (
                    <div
                      key={recordId}
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-3"
                    >
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
`
);

/**
 * 3. Table polish + expanded
 */
writeFile(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  `"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { ERPModule } from "@/runtime/modules/ERPModule";
import type { ERPModuleField } from "@/runtime/modules/schemas/ERPModuleSchema";
import { ERPRuntimeFieldValue } from "@/components/erp/runtime/ERPRuntimeFieldValue";
import { ERPOperationalExpandedChildren } from "./ERPOperationalExpandedChildren";

type OperationalColumn = {
  key: string;
  field: ERPModuleField;
};

function hasOperationalField(
  column: {
    key: string;
    field: ERPModuleField | undefined;
  }
): column is OperationalColumn {
  return Boolean(column.field);
}

type ERPOperationalTableProps = {
  module: ERPModule;
  data: Record<string, unknown>[];
};

function getRecordId(record: Record<string, unknown>): string {
  return String(record.id ?? record._id ?? record.uid ?? "");
}

function getField(module: ERPModule, key: string): ERPModuleField | undefined {
  return module.schema.fields.find((field) => field.key === key);
}

function getStatusBadgeClass(value: unknown): string {
  const status = String(value ?? "").toLowerCase();

  if (["confirme", "validee", "payee"].includes(status)) {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }

  if (["en_cours", "diagnostic", "partiel"].includes(status)) {
    return "border-amber-200 bg-amber-50 text-amber-800";
  }

  if (["annule", "annulee", "retard"].includes(status)) {
    return "border-red-200 bg-red-50 text-red-800";
  }

  if (["termine", "terminee"].includes(status)) {
    return "border-slate-200 bg-slate-50 text-slate-700";
  }

  return "border-sky-200 bg-sky-50 text-sky-800";
}

export function ERPOperationalTable({
  module,
  data,
}: ERPOperationalTableProps) {
  const router = useRouter();
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const tableConfig = module.operational?.table;
  const hasExpandableChildren = Boolean(module.composition?.children?.length);

  const fieldKeys = tableConfig?.fields?.length
    ? tableConfig.fields
    : module.schema.fields
        .filter((field) => field.list?.visible)
        .sort((a, b) => Number(a.list?.order ?? 999) - Number(b.list?.order ?? 999))
        .map((field) => field.key);

  const columns = useMemo(
    () =>
      fieldKeys
        .map((key) => ({
          key,
          field: getField(module, key),
        }))
        .filter(hasOperationalField),
    [fieldKeys.join("|"), module]
  );

  function openRecord(record: Record<string, unknown>) {
    const id = getRecordId(record);

    if (!id) {
      return;
    }

    router.push("/" + module.metadata.key + "/" + id + "/edit");
  }

  function toggleExpanded(record: Record<string, unknown>) {
    const id = getRecordId(record);

    if (!id) return;

    setExpandedRows((current) => ({
      ...current,
      [id]: !current[id],
    }));
  }

  return (
    <div className="overflow-hidden rounded-[1.7rem] border border-slate-200 bg-slate-50 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
      <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-black text-[#10251C]">
            {tableConfig?.title ?? "Liste opérationnelle"}
          </h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            {tableConfig?.description ?? "Données métier du module."}
          </p>
        </div>

        <div className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-slate-600 ring-1 ring-slate-200">
          {data.length} ligne(s)
        </div>
      </div>

      <div className="overflow-x-auto bg-white">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100/80">
              {hasExpandableChildren ? (
                <th className="w-12 px-4 py-3.5" />
              ) : null}

              {columns.map((column) => (
                <th
                  key={column.key}
                  className="whitespace-nowrap px-5 py-3.5 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500"
                >
                  {column.field.label ?? column.key}
                </th>
              ))}

              <th className="whitespace-nowrap px-5 py-3.5 text-right text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="px-5 py-12 text-center text-sm font-semibold text-slate-500"
                >
                  Aucun enregistrement ne correspond aux filtres.
                </td>
              </tr>
            ) : null}

            {data.map((record) => {
              const recordId = getRecordId(record);
              const expanded = Boolean(expandedRows[recordId]);

              return (
                <>
                  <tr
                    key={recordId}
                    onClick={() => openRecord(record)}
                    className="cursor-pointer border-b border-slate-100 transition hover:bg-emerald-50/45"
                  >
                    {hasExpandableChildren ? (
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleExpanded(record);
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-black text-slate-600 transition hover:bg-slate-50"
                          aria-label={expanded ? "Replier" : "Déplier"}
                        >
                          {expanded ? "−" : "+"}
                        </button>
                      </td>
                    ) : null}

                    {columns.map((column) => {
                      const value = record[column.key];
                      const isStatus = column.key === "statut" || column.key === "status";

                      return (
                        <td
                          key={column.key}
                          className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-[#10251C]"
                        >
                          {isStatus ? (
                            <span
                              className={[
                                "inline-flex rounded-full border px-3 py-1 text-xs font-black",
                                getStatusBadgeClass(value),
                              ].join(" ")}
                            >
                              <ERPRuntimeFieldValue
                                field={column.field}
                                value={value}
                              />
                            </span>
                          ) : (
                            <ERPRuntimeFieldValue
                              field={column.field}
                              value={value}
                            />
                          )}
                        </td>
                      );
                    })}

                    <td className="whitespace-nowrap px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          openRecord(record);
                        }}
                        className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-700 transition hover:bg-slate-50"
                      >
                        Ouvrir
                      </button>
                    </td>
                  </tr>

                  {expanded ? (
                    <tr key={recordId + "-expanded"} className="border-b border-slate-100">
                      <td
                        colSpan={columns.length + (hasExpandableChildren ? 2 : 1)}
                        className="bg-slate-50 px-5 py-4"
                      >
                        <ERPOperationalExpandedChildren
                          parentModule={module}
                          parentRecord={record}
                        />
                      </td>
                    </tr>
                  ) : null}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`
);

/**
 * 4. Panneau droit couleur claire différente
 */
writeFile(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  `"use client";

import type { ERPModule } from "@/runtime/modules/ERPModule";

type ERPOperationalRightPanelProps = {
  module: ERPModule;
  data: Record<string, unknown>[];
};

export function ERPOperationalRightPanel({
  module,
  data,
}: ERPOperationalRightPanelProps) {
  const panel = module.operational?.rightPanel;

  if (!panel?.enabled) {
    return null;
  }

  const today = new Date().toISOString().slice(0, 10);

  const todayRecords = data.filter((record) => {
    const dateValue = String(
      record.dateRendezVous ??
        record.date ??
        record.createdAt ??
        ""
    );

    return dateValue.startsWith(today);
  });

  return (
    <aside className="rounded-[1.7rem] border border-amber-100 bg-[#FFF9EA] p-5 text-[#10251C] shadow-[0_18px_55px_rgba(146,99,12,0.10)]">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-amber-700">
          {panel.type ?? "summary"}
        </p>
        <h2 className="mt-2 text-xl font-black">
          {panel.title ?? "Panneau opérationnel"}
        </h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
          Synthèse runtime liée au module {module.metadata.label}.
        </p>
      </div>

      <div className="mt-6 rounded-3xl border border-amber-100 bg-white p-4">
        <p className="text-[11px] font-black uppercase tracking-wide text-amber-700">
          Aujourd’hui
        </p>
        <p className="mt-2 text-4xl font-black text-[#10251C]">
          {todayRecords.length}
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-600">
          rendez-vous détecté(s)
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {todayRecords.slice(0, 5).map((record) => (
          <div
            key={String(record.id ?? record._id)}
            className="rounded-3xl border border-amber-100 bg-white p-4 transition hover:bg-amber-50"
          >
            <p className="text-sm font-black text-[#10251C]">
              {String(record.codeRendezVous ?? record.id ?? "RDV")}
            </p>
            <p className="mt-1 text-xs font-semibold text-slate-600">
              {String(record.heureRendezVous ?? "")} · {String(record.typeService ?? "")}
            </p>
          </div>
        ))}

        {todayRecords.length === 0 ? (
          <p className="rounded-3xl border border-amber-100 bg-white p-4 text-sm font-semibold text-slate-600">
            Aucun rendez-vous aujourd’hui.
          </p>
        ) : null}
      </div>
    </aside>
  );
}
`
);

/**
 * 5. Remonter l’ensemble légèrement
 */
const modulePageRel = "src/components/erp/operational/ERPOperationalModulePage.tsx";
const modulePageFile = path.join(ROOT, modulePageRel);
let modulePage = fs.readFileSync(modulePageFile, "utf8");

modulePage = modulePage
  .replace('className="space-y-5"', 'className="-mt-3 space-y-4"')
  .replace("p-5 lg:p-7", "p-4 lg:p-5")
  .replace("mt-4 flex flex-col gap-2", "mt-3 flex flex-col gap-2")
  .replace("mt-5 flex flex-wrap gap-2", "mt-4 flex flex-wrap gap-2");

fs.writeFileSync(modulePageFile, modulePage, "utf8");
console.log("[PATCHED]", modulePageRel);

/**
 * 6. Retirer codeRendezVous des colonnes opérationnelles RDV uniquement par metadata.
 */
const rdvRel = "src/runtime/modules/generated/rendezvous/rendezvous.module.ts";
const rdvFile = path.join(ROOT, rdvRel);
let rdv = fs.readFileSync(rdvFile, "utf8");

if (rdv.includes('"codeRendezVous",')) {
  fs.writeFileSync(rdvFile + ".bak-q2a-e2-remove-code-rdv-operational-column", rdv, "utf8");
  rdv = rdv.replace(/\\s*"codeRendezVous",\\r?\\n/, "");
  fs.writeFileSync(rdvFile, rdv, "utf8");
  console.log("[PATCHED]", rdvRel);
}

console.log("");
console.log("[DONE] Q2-A-E2 polish + expanded générique appliqué.");
console.log("");
console.log("Next:");
console.log("pnpm build");
