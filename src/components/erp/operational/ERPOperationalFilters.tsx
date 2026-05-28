"use client";

import type {
  ERPOperationalFilterConfig,
} from "@/runtime/modules/ERPModule";
import { operationalUiTokens } from "./operationalUiTokens";

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
    <div className={operationalUiTokens.cards.soft + " p-4"}>
      <div className="grid gap-3 lg:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))_auto] lg:items-end">
        <div>
          <label className={operationalUiTokens.typography.label}>
            Recherche rapide
          </label>
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Code, client, véhicule, service..."
            className={"mt-2 " + operationalUiTokens.controls.input}
          />
        </div>

        {filters.slice(0, 3).map((filter) => (
          <div key={filter.key}>
            <label className={operationalUiTokens.typography.label}>
              {filter.label}
            </label>

            {filter.type === "select" ? (
              <select
                value={values[filter.key] ?? ""}
                onChange={(event) => updateFilter(filter.key, event.target.value)}
                className={"mt-2 " + operationalUiTokens.controls.input + " font-bold"}
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
                className={"mt-2 " + operationalUiTokens.controls.input + " font-bold"}
              />
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={resetFilters}
          className={operationalUiTokens.controls.secondaryButton}
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
}
