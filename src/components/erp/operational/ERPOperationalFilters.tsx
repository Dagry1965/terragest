"use client";

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
