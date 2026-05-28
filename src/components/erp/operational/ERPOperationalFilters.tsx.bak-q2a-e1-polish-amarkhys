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
