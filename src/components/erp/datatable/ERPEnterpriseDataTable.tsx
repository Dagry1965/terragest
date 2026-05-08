"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ERPBadge,
} from "@/components/erp/ui";

import type {
  ERPModule,
} from "@/runtime/modules";

import {
  ERPModuleBuilder,
} from "@/runtime/modules";

import {
  RuntimeDataBinding,
  type RuntimeRecord,
} from "@/runtime/data-binding";

import {
  ERPRuntimeFieldValue,
} from "@/components/erp/runtime/ERPRuntimeFieldValue";

import {
  ERPRowActions,
} from "@/components/erp/actions";

import {
  ERPRealtimeSyncBadge,
} from "@/components/erp/realtime";

interface ERPEnterpriseDataTableProps {
  module: ERPModule;
}

export function ERPEnterpriseDataTable({
  module,
}: ERPEnterpriseDataTableProps) {

  const [rows, setRows] =
    useState<RuntimeRecord[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    RuntimeDataBinding.list(
      module
    ).then((records) => {

      setRows(records);

      setLoading(false);
    });

  }, [module]);

  const table =
    ERPModuleBuilder.buildTable(
      module
    );

  const columns =
    table.columns.map((column) => {

      const field =
        module.schema.fields.find(
          (item) =>
            item.key === column.key
        );

      return {
        key: column.key,
        label: column.label,

        render: (
          row: RuntimeRecord
        ) =>
          field ? (
            <ERPRuntimeFieldValue
              field={field}
              value={row[column.key]}
            />
          ) : (
            String(
              row[column.key] ?? ""
            )
          ),
      };
    });

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="flex flex-col gap-4 border-b border-slate-200 bg-white px-6 py-5 md:flex-row md:items-center md:justify-between">

        <div>

          <h3 className="text-xl font-black text-slate-950">
            Registre operationnel
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Donnees synchronisees avec Firestore runtime.
          </p>

        </div>

        <div className="flex gap-2">

          <ERPBadge tone="success">
            {loading
              ? "Chargement"
              : `${rows.length} lignes`}
          </ERPBadge>

          <ERPRealtimeSyncBadge
            module={module}
          />

        </div>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full border-collapse text-left text-sm">

          <thead>

            <tr className="border-b border-slate-200 bg-white">

              {columns.map((column) => (

                <th
                  key={String(column.key)}
                  className="whitespace-nowrap px-6 py-4 text-xs font-black uppercase tracking-wide text-slate-500"
                >
                  {column.label}
                </th>

              ))}

              <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wide text-slate-500">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100">

            {loading ? (

              <tr>

                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-10 text-center text-sm font-medium text-slate-500"
                >
                  Chargement Firestore...
                </td>

              </tr>

            ) : (

              rows.map((row) => (

                <tr
                  key={row.id}
                  className="transition hover:bg-blue-50/70"
                >

                  {columns.map((column) => (

                    <td
                      key={String(column.key)}
                      className="whitespace-nowrap px-6 py-4 font-medium text-slate-700"
                    >
                      {column.render(row)}
                    </td>

                  ))}

                  <td className="whitespace-nowrap px-6 py-4 text-right">

                    <ERPRowActions
                      module={module}
                      id={row.id}
                    />

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}