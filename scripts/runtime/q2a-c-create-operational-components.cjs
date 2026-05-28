const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function writeFile(rel, content) {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("[WRITTEN]", rel);
}

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
      return "border-emerald-200 bg-emerald-50 text-emerald-800";
    case "orange":
      return "border-amber-200 bg-amber-50 text-amber-800";
    case "red":
      return "border-red-200 bg-red-50 text-red-800";
    case "purple":
      return "border-purple-200 bg-purple-50 text-purple-800";
    case "gray":
      return "border-slate-200 bg-slate-50 text-slate-700";
    case "blue":
    default:
      return "border-sky-200 bg-sky-50 text-sky-800";
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
            "rounded-3xl border p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)]",
            getToneClass(kpi.tone),
          ].join(" ")}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] opacity-70">
                {kpi.label}
              </p>
              <p className="mt-3 text-4xl font-black tracking-tight">
                {getKpiValue(kpi, data)}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70 text-lg font-black shadow-sm">
              {kpi.icon ? kpi.icon.slice(0, 1).toUpperCase() : "•"}
            </div>
          </div>

          {kpi.description ? (
            <p className="mt-3 text-xs font-semibold opacity-70">
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
  const hasFilters = filters.length > 0;

  if (!hasFilters) {
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
    <div className="rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-4 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
      <div className="grid gap-3 lg:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))_auto] lg:items-end">
        <div>
          <label className="text-xs font-black uppercase tracking-wide text-[var(--erp-text-muted)]">
            Recherche
          </label>
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Rechercher dans les rendez-vous..."
            className="mt-2 w-full rounded-2xl border border-[var(--erp-border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--erp-text)] outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        {filters.slice(0, 3).map((filter) => (
          <div key={filter.key}>
            <label className="text-xs font-black uppercase tracking-wide text-[var(--erp-text-muted)]">
              {filter.label}
            </label>

            {filter.type === "select" ? (
              <select
                value={values[filter.key] ?? ""}
                onChange={(event) => updateFilter(filter.key, event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[var(--erp-border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--erp-text)] outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
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
                className="mt-2 w-full rounded-2xl border border-[var(--erp-border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--erp-text)] outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              />
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={resetFilters}
          className="rounded-2xl border border-[var(--erp-border)] bg-white px-5 py-3 text-sm font-black text-[var(--erp-text)] transition hover:bg-slate-50"
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
        .filter((column) => Boolean(column.field)),
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
    <div className="overflow-hidden rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)] shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-3 border-b border-[var(--erp-border)] px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-black text-[var(--erp-text)]">
            {tableConfig?.title ?? "Liste opérationnelle"}
          </h2>
          <p className="mt-1 text-sm font-semibold text-[var(--erp-text-muted)]">
            {tableConfig?.description ?? "Données métier du module."}
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700">
          {data.length} enregistrement(s)
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--erp-border)] bg-slate-50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="whitespace-nowrap px-5 py-4 text-xs font-black uppercase tracking-wide text-slate-500"
                >
                  {column.field?.label ?? column.key}
                </th>
              ))}

              <th className="whitespace-nowrap px-5 py-4 text-right text-xs font-black uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-5 py-12 text-center text-sm font-semibold text-[var(--erp-text-muted)]"
                >
                  Aucun enregistrement ne correspond aux filtres.
                </td>
              </tr>
            ) : null}

            {data.map((record) => (
              <tr
                key={getRecordId(record)}
                onClick={() => openRecord(record)}
                className="cursor-pointer border-b border-slate-100 transition hover:bg-emerald-50/40"
              >
                {columns.map((column) => {
                  const value = record[column.key];
                  const isStatus = column.key === "statut" || column.key === "status";

                  return (
                    <td
                      key={column.key}
                      className="whitespace-nowrap px-5 py-4 font-semibold text-[var(--erp-text)]"
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
                    className="rounded-2xl border border-[var(--erp-border)] bg-white px-3 py-2 text-xs font-black text-[var(--erp-text)] transition hover:bg-slate-50"
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
    <aside className="rounded-3xl border border-[var(--erp-border)] bg-[#061611] p-5 text-white shadow-[0_22px_70px_rgba(2,8,7,0.30)]">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-200/70">
          {panel.type ?? "summary"}
        </p>
        <h2 className="mt-2 text-xl font-black">
          {panel.title ?? "Panneau opérationnel"}
        </h2>
        <p className="mt-2 text-sm font-semibold text-emerald-100/70">
          Synthèse runtime liée au module {module.metadata.label}.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/8 p-4">
        <p className="text-xs font-black uppercase tracking-wide text-emerald-100/60">
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
            className="rounded-2xl border border-white/10 bg-white/8 p-4"
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
          <p className="rounded-2xl border border-white/10 bg-white/8 p-4 text-sm font-semibold text-emerald-100/70">
            Aucun rendez-vous aujourd’hui.
          </p>
        ) : null}
      </div>
    </aside>
  );
}
`
);

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

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-[#F8FFFB] via-white to-[#ECFDF5] p-5 shadow-[0_22px_70px_rgba(15,23,42,0.08)] lg:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-700">
              AMARKHYS · Vue opérationnelle
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight text-[#10251C] lg:text-4xl">
              {title}
            </h1>

            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-600">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {module.scheduling?.enabled ? (
              <Link
                href={"/" + module.metadata.key + "/planning"}
                className="rounded-2xl border border-emerald-200 bg-white px-5 py-3 text-sm font-black text-emerald-800 shadow-sm transition hover:bg-emerald-50"
              >
                Planning
              </Link>
            ) : null}

            <Link
              href={"/" + module.metadata.key + "/nouveau"}
              className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-[0_12px_30px_rgba(16,185,129,0.28)] transition hover:bg-emerald-700"
            >
              Nouveau
            </Link>

            <button
              type="button"
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50"
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

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
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
  "src/components/erp/operational/index.ts",
  `export { ERPOperationalModulePage } from "./ERPOperationalModulePage";
export { ERPOperationalKpiStrip } from "./ERPOperationalKpiStrip";
export { ERPOperationalFilters } from "./ERPOperationalFilters";
export { ERPOperationalTable } from "./ERPOperationalTable";
export { ERPOperationalRightPanel } from "./ERPOperationalRightPanel";
`
);

console.log("");
console.log("[DONE] Q2-A-C composants operational créés.");
console.log("");
console.log("Next:");
console.log("pnpm build");
