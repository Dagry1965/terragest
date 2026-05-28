const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function writeFile(rel, content) {
  const file = path.join(ROOT, rel);

  if (!fs.existsSync(file)) {
    throw new Error("File not found: " + file);
  }

  fs.writeFileSync(file + ".bak-q2a-e1-polish-amarkhys", fs.readFileSync(file, "utf8"), "utf8");
  fs.writeFileSync(file, content, "utf8");

  console.log("[WRITTEN]", rel);
  console.log("[BACKUP]", rel + ".bak-q2a-e1-polish-amarkhys");
}

writeFile(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  `"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import type { ERPModule } from "@/runtime/modules/ERPModule";
import { ERPOperationalKpiStrip } from "./ERPOperationalKpiStrip";
import { ERPOperationalFilters } from "./ERPOperationalFilters";
import { ERPOperationalTable } from "./ERPOperationalTable";
import { ERPOperationalRightPanel } from "./ERPOperationalRightPanel";

type ERPOperationalModulePageProps = {
  module: ERPModule;
  data: Record<string, unknown>[];
};

function normalize(value: unknown): string {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .trim();
}

function recordMatchesSearch(
  record: Record<string, unknown>,
  search: string
): boolean {
  const query = normalize(search);

  if (!query) {
    return true;
  }

  return Object.values(record).some((value) =>
    normalize(value).includes(query)
  );
}

export function ERPOperationalModulePage({
  module,
  data,
}: ERPOperationalModulePageProps) {
  const config = module.operational;

  const [filters, setFilters] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((record) => {
      const matchesFilters = (config?.filters ?? []).every((filter) => {
        const expected = filters[filter.key];

        if (!expected) {
          return true;
        }

        return String(record[filter.field] ?? "") === expected;
      });

      return matchesFilters && recordMatchesSearch(record, search);
    });
  }, [data, filters, search, config?.filters]);

  const title = config?.title ?? module.metadata.label;
  const subtitle =
    config?.subtitle ??
    module.metadata.description ??
    "Vue opérationnelle générée par le Runtime ERP.";

  const activeFiltersCount =
    Object.values(filters).filter(Boolean).length + (search ? 1 : 0);

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-[#F8FBF8] shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-600 via-teal-400 to-amber-300" />

        <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:p-7">
          <div className="min-w-0">
            <div className="inline-flex rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700 shadow-sm">
              AMARKHYS · Runtime ERP
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <h1 className="text-3xl font-black tracking-tight text-[#10251C] lg:text-[2.65rem]">
                {title}
              </h1>

              <p className="max-w-3xl text-sm font-semibold leading-6 text-slate-600">
                {subtitle}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                {filteredData.length} résultat(s)
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                {activeFiltersCount} filtre(s) actif(s)
              </span>

              {module.scheduling?.enabled ? (
                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-teal-700">
                  Planning runtime actif
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-start justify-start gap-3 lg:justify-end">
            {module.scheduling?.enabled ? (
              <Link
                href={"/" + module.metadata.key + "/planning"}
                className="rounded-2xl border border-emerald-200 bg-white px-5 py-3 text-sm font-black text-emerald-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-md"
              >
                Planning
              </Link>
            ) : null}

            <Link
              href={"/" + module.metadata.key + "/nouveau"}
              className="rounded-2xl bg-[#0F8A5F] px-5 py-3 text-sm font-black text-white shadow-[0_14px_34px_rgba(15,138,95,0.28)] transition hover:-translate-y-0.5 hover:bg-[#0B6F4C]"
            >
              Nouveau
            </Link>

            <button
              type="button"
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
            >
              Exporter
            </button>
          </div>
        </div>
      </section>

      <ERPOperationalKpiStrip
        kpis={config?.kpis}
        data={filteredData}
      />

      <ERPOperationalFilters
        filters={config?.filters}
        values={filters}
        onChange={setFilters}
        search={search}
        onSearchChange={setSearch}
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_380px]">
        <ERPOperationalTable
          module={module}
          data={filteredData}
        />

        <ERPOperationalRightPanel
          module={module}
          data={filteredData}
        />
      </div>
    </div>
  );
}
`
);

writeFile(
  "src/components/erp/operational/ERPOperationalKpiStrip.tsx",
  `"use client";

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

function getDotClass(tone?: string): string {
  switch (tone) {
    case "green":
      return "bg-emerald-500";
    case "orange":
      return "bg-amber-500";
    case "red":
      return "bg-red-500";
    case "purple":
      return "bg-purple-500";
    case "gray":
      return "bg-slate-400";
    case "blue":
    default:
      return "bg-sky-500";
  }
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
            "group relative overflow-hidden rounded-[1.7rem] border p-5 shadow-[0_16px_45px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(15,23,42,0.10)]",
            getToneClass(kpi.tone),
          ].join(" ")}
        >
          <div className={["absolute inset-x-0 top-0 h-1", getDotClass(kpi.tone)].join(" ")} />

          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                {kpi.label}
              </p>
              <p className="mt-3 text-[2.35rem] font-black leading-none tracking-tight">
                {getKpiValue(kpi, data)}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-sm font-black text-slate-600 ring-1 ring-slate-100">
              {kpi.icon ? kpi.icon.slice(0, 1).toUpperCase() : "•"}
            </div>
          </div>

          {kpi.description ? (
            <p className="mt-3 line-clamp-2 text-xs font-semibold leading-5 text-slate-500">
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

writeFile(
  "src/components/erp/operational/ERPOperationalFilters.tsx",
  `"use client";

import type {
  ERPOperationalFilterConfig,
} from "@/runtime/modules/ERPModule";

type FilterValues = Record<string, string>;

type ERPOperationalFiltersProps = {
  filters?: ERPOperationalFilterConfig[];
  values: FilterValues;
  onChange: (values: FilterValues) => void;
  search: string;
  onSearchChange: (value: string) => void;
};

export function ERPOperationalFilters({
  filters = [],
  values,
  onChange,
  search,
  onSearchChange,
}: ERPOperationalFiltersProps) {
  if (filters.length === 0) {
    return null;
  }

  function updateFilter(key: string, value: string) {
    onChange({
      ...values,
      [key]: value,
    });
  }

  function resetFilters() {
    onChange({});
    onSearchChange("");
  }

  return (
    <div className="rounded-[1.7rem] border border-[var(--erp-border)] bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,0.05)]">
      <div className="grid gap-3 lg:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))_auto] lg:items-end">
        <div>
          <label className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
            Recherche rapide
          </label>
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Code, client, véhicule, service..."
            className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-[#10251C] outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        {filters.slice(0, 3).map((filter) => (
          <div key={filter.key}>
            <label className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
              {filter.label}
            </label>

            {filter.type === "select" ? (
              <select
                value={values[filter.key] ?? ""}
                onChange={(event) => updateFilter(filter.key, event.target.value)}
                className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-[#10251C] outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              >
                <option value="">Tous</option>
                {(filter.options ?? []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                value={values[filter.key] ?? ""}
                onChange={(event) => updateFilter(filter.key, event.target.value)}
                placeholder={filter.placeholder ?? filter.label}
                className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-[#10251C] outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={resetFilters}
          className="h-11 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 transition hover:bg-slate-50"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
}
`
);

writeFile(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  `"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import type { ERPModule } from "@/runtime/modules/ERPModule";
import type { ERPModuleField } from "@/runtime/modules/schemas/ERPModuleSchema";
import { ERPRuntimeFieldValue } from "@/components/erp/runtime/ERPRuntimeFieldValue";

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

  const tableConfig = module.operational?.table;
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

  return (
    <div className="overflow-hidden rounded-[1.7rem] border border-[var(--erp-border)] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)]">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-black text-[#10251C]">
            {tableConfig?.title ?? "Liste opérationnelle"}
          </h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            {tableConfig?.description ?? "Données métier du module."}
          </p>
        </div>

        <div className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-700">
          {data.length} ligne(s)
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
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
                  colSpan={columns.length + 1}
                  className="px-5 py-12 text-center text-sm font-semibold text-slate-500"
                >
                  Aucun enregistrement ne correspond aux filtres.
                </td>
              </tr>
            ) : null}

            {data.map((record) => (
              <tr
                key={getRecordId(record)}
                onClick={() => openRecord(record)}
                className="cursor-pointer border-b border-slate-100 transition hover:bg-emerald-50/45"
              >
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`
);

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
    <aside className="rounded-[1.7rem] border border-[#0B2F23] bg-[#061611] p-5 text-white shadow-[0_22px_70px_rgba(2,8,7,0.28)]">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-200/70">
          {panel.type ?? "summary"}
        </p>
        <h2 className="mt-2 text-xl font-black">
          {panel.title ?? "Panneau opérationnel"}
        </h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-emerald-100/70">
          Synthèse runtime liée au module {module.metadata.label}.
        </p>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/8 p-4">
        <p className="text-[11px] font-black uppercase tracking-wide text-emerald-100/60">
          Aujourd’hui
        </p>
        <p className="mt-2 text-4xl font-black text-white">
          {todayRecords.length}
        </p>
        <p className="mt-1 text-sm font-semibold text-emerald-100/70">
          rendez-vous détecté(s)
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {todayRecords.slice(0, 5).map((record) => (
          <div
            key={String(record.id ?? record._id)}
            className="rounded-3xl border border-white/10 bg-white/8 p-4 transition hover:bg-white/12"
          >
            <p className="text-sm font-black text-white">
              {String(record.codeRendezVous ?? record.id ?? "RDV")}
            </p>
            <p className="mt-1 text-xs font-semibold text-emerald-100/70">
              {String(record.heureRendezVous ?? "")} · {String(record.typeService ?? "")}
            </p>
          </div>
        ))}

        {todayRecords.length === 0 ? (
          <p className="rounded-3xl border border-white/10 bg-white/8 p-4 text-sm font-semibold text-emerald-100/70">
            Aucun rendez-vous aujourd’hui.
          </p>
        ) : null}
      </div>
    </aside>
  );
}
`
);

console.log("");
console.log("[DONE] Q2-A-E1 polish visuel AMARKHYS appliqué.");
console.log("");
console.log("Next:");
console.log("pnpm build");
