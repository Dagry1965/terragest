"use client";

import { useEffect, useMemo, useState } from "react";

import type { ERPModuleField } from "@/runtime/modules";

import { ERPRelationDataLoader }
from "@/runtime/modules/lifecycle/ERPRelationDataLoader";

type RelationOption = {
  id: string;
  label: string;
};

type ERPRelationFieldProps = {
  field: ERPModuleField;
  initialValue?: unknown;
  className?: string;
};

export function ERPRelationField({
  field,
  initialValue,
  className,
}: ERPRelationFieldProps) {

  const [options, setOptions] =
    useState<RelationOption[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const targetModule =
    field.references?.module ??
    (
      typeof field.relation === "string"
        ? field.relation
        : field.relation?.module
    );

  useEffect(() => {

    async function loadOptions() {

      if (!targetModule) {
        return;
      }

      setLoading(true);

      try {

        const result =
          await ERPRelationDataLoader.load(
            targetModule
          );

        setOptions(result);

      } catch (error) {

        console.error(
          "ERP RELATION FIELD LOAD ERROR",
          error
        );

        setOptions([]);

      } finally {

        setLoading(false);

      }
    }

    loadOptions();

  }, [targetModule]);

  const filteredOptions =
    useMemo(() => {

      const value =
        search.trim().toLowerCase();

      if (!value) {
        return options;
      }

      return options.filter((option) =>
        option.label
          .toLowerCase()
          .includes(value)
      );

    }, [options, search]);

  return (

    <div className="space-y-2">

      <input
        type="search"
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
        placeholder="Rechercher..."
        className={className}
      />

      <select
        key={`${field.key}-${String(initialValue ?? "")}-${options.length}`}
        name={field.key}
        required={field.required}
        defaultValue={String(initialValue ?? "")}
        className={className}
      >

        <option value="">
          {loading
            ? "Chargement..."
            : "Sélectionner"}
        </option>

        {filteredOptions.map((option) => (

          <option
            key={option.id}
            value={option.id}
          >
            {option.label}
          </option>

        ))}

      </select>

      {!loading &&
      options.length === 0 ? (

        <p
          className="
            text-xs
            text-slate-500
          "
        >
          Aucune donnée liée disponible.
        </p>

      ) : null}

    </div>

  );
}