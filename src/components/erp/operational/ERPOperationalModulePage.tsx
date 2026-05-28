"use client";

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
    .replace(/[\u0300-\u036f]/g, "")
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
