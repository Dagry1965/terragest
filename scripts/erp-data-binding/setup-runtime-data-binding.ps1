$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\Admin\terragest"

function WriteFile {
  param([string]$Path, [string]$Content)

  $fullPath = Join-Path $projectRoot $Path
  $dir = Split-Path $fullPath

  New-Item -ItemType Directory -Force $dir | Out-Null

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($fullPath, $Content, $utf8NoBom)

  Write-Host "OK $fullPath" -ForegroundColor Green
}

Write-Host "=== RUNTIME DATA BINDING SYSTEM ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "$projectRoot\src\runtime\data-binding" | Out-Null
New-Item -ItemType Directory -Force "$projectRoot\src\runtime\repositories" | Out-Null
New-Item -ItemType Directory -Force "$projectRoot\src\runtime\query" | Out-Null
New-Item -ItemType Directory -Force "$projectRoot\src\runtime\mutations" | Out-Null

WriteFile "src\runtime\data-binding\RuntimeRecord.ts" @'
export interface RuntimeRecord {
  id: string;
  [key: string]: unknown;
}
'@

WriteFile "src\runtime\repositories\RuntimeRepository.ts" @'
import type { ERPModule } from "@/runtime/modules";
import type { RuntimeRecord } from "@/runtime/data-binding/RuntimeRecord";

const memoryStore = new Map<string, RuntimeRecord[]>();

function getStore(module: ERPModule): RuntimeRecord[] {
  const collection = module.schema.collection;

  if (!memoryStore.has(collection)) {
    memoryStore.set(collection, []);
  }

  return memoryStore.get(collection) ?? [];
}

export class RuntimeRepository {
  static async findMany(module: ERPModule): Promise<RuntimeRecord[]> {
    const rows = getStore(module);

    if (rows.length > 0) {
      return rows;
    }

    return RuntimeRepository.seed(module);
  }

  static async findById(
    module: ERPModule,
    id: string
  ): Promise<RuntimeRecord | null> {
    const rows = await RuntimeRepository.findMany(module);

    return rows.find((row) => row.id === id) ?? null;
  }

  static async create(
    module: ERPModule,
    data: Record<string, unknown>
  ): Promise<RuntimeRecord> {
    const rows = getStore(module);

    const record: RuntimeRecord = {
      id: `${module.metadata.key}-${Date.now()}`,
      ...data,
    };

    rows.unshift(record);

    return record;
  }

  static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>
  ): Promise<RuntimeRecord> {
    const rows = getStore(module);
    const index = rows.findIndex((row) => row.id === id);

    if (index === -1) {
      const created = {
        id,
        ...data,
      };

      rows.unshift(created);

      return created;
    }

    rows[index] = {
      ...rows[index],
      ...data,
    };

    return rows[index];
  }

  static async seed(module: ERPModule): Promise<RuntimeRecord[]> {
    const rows = Array.from({ length: 8 }).map((_, index) => {
      const row: RuntimeRecord = {
        id: `${module.metadata.key}-${index + 1}`,
      };

      module.schema.fields.forEach((field) => {
        if (field.type === "number") {
          row[field.key] = index * 10 + 5;
        } else if (field.type === "status") {
          row[field.key] =
            index % 3 === 0
              ? "Actif"
              : index % 3 === 1
                ? "En suivi"
                : "A controler";
        } else if (field.type === "relation") {
          row[field.key] = "REF-" + String(index + 1).padStart(3, "0");
        } else {
          row[field.key] = `${field.label} ${index + 1}`;
        }
      });

      return row;
    });

    memoryStore.set(module.schema.collection, rows);

    return rows;
  }
}
'@

WriteFile "src\runtime\query\RuntimeQueryEngine.ts" @'
import type { ERPModule } from "@/runtime/modules";
import { RuntimeRepository } from "@/runtime/repositories/RuntimeRepository";

export class RuntimeQueryEngine {
  static async list(module: ERPModule) {
    return RuntimeRepository.findMany(module);
  }

  static async detail(module: ERPModule, id: string) {
    return RuntimeRepository.findById(module, id);
  }
}
'@

WriteFile "src\runtime\mutations\RuntimeMutationEngine.ts" @'
import type { ERPModule } from "@/runtime/modules";
import { RuntimeRepository } from "@/runtime/repositories/RuntimeRepository";

export class RuntimeMutationEngine {
  static async create(
    module: ERPModule,
    data: Record<string, unknown>
  ) {
    return RuntimeRepository.create(module, data);
  }

  static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>
  ) {
    return RuntimeRepository.update(module, id, data);
  }
}
'@

WriteFile "src\runtime\data-binding\RuntimeDataBinding.ts" @'
import type { ERPModule } from "@/runtime/modules";
import { RuntimeQueryEngine } from "@/runtime/query/RuntimeQueryEngine";
import { RuntimeMutationEngine } from "@/runtime/mutations/RuntimeMutationEngine";

export class RuntimeDataBinding {
  static async list(module: ERPModule) {
    return RuntimeQueryEngine.list(module);
  }

  static async detail(module: ERPModule, id: string) {
    return RuntimeQueryEngine.detail(module, id);
  }

  static async create(
    module: ERPModule,
    data: Record<string, unknown>
  ) {
    return RuntimeMutationEngine.create(module, data);
  }

  static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>
  ) {
    return RuntimeMutationEngine.update(module, id, data);
  }
}
'@

WriteFile "src\runtime\data-binding\index.ts" @'
export type { RuntimeRecord } from "./RuntimeRecord";
export { RuntimeDataBinding } from "./RuntimeDataBinding";
'@

WriteFile "src\runtime\repositories\index.ts" @'
export { RuntimeRepository } from "./RuntimeRepository";
'@

WriteFile "src\runtime\query\index.ts" @'
export { RuntimeQueryEngine } from "./RuntimeQueryEngine";
'@

WriteFile "src\runtime\mutations\index.ts" @'
export { RuntimeMutationEngine } from "./RuntimeMutationEngine";
'@

WriteFile "src\components\erp\datatable\ERPEnterpriseDataTable.tsx" @'
"use client";

import { useEffect, useState } from "react";
import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import { RuntimeDataBinding, type RuntimeRecord } from "@/runtime/data-binding";
import { ERPRuntimeFieldValue } from "@/components/erp/runtime/ERPRuntimeFieldValue";
import { ERPRowActions } from "@/components/erp/actions";

interface ERPEnterpriseDataTableProps {
  module: ERPModule;
  data?: RuntimeRecord[];
}

export function ERPEnterpriseDataTable({
  module,
  data,
}: ERPEnterpriseDataTableProps) {
  const [rows, setRows] = useState<RuntimeRecord[]>(data ?? []);
  const [loading, setLoading] = useState(data ? false : true);

  useEffect(() => {
    if (data && data.length > 0) {
      setRows(data);
      setLoading(false);
      return;
    }

    RuntimeDataBinding.list(module).then((records) => {
      setRows(records);
      setLoading(false);
    });
  }, [module, data]);

  const table = ERPModuleBuilder.buildTable(module);

  const columns = table.columns.map((column) => {
    const field = module.schema.fields.find((item) => item.key === column.key);

    return {
      key: column.key,
      label: column.label,
      render: (row: RuntimeRecord) =>
        field ? (
          <ERPRuntimeFieldValue field={field} value={row[column.key]} />
        ) : (
          String(row[column.key] ?? "")
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
            Donnees chargees via le binding runtime du module {module.metadata.label}.
          </p>
        </div>

        <div className="flex gap-2">
          <ERPBadge tone="success">
            {loading ? "Chargement" : `${rows.length} lignes`}
          </ERPBadge>

          <ERPBadge tone="info">
            Data binding
          </ERPBadge>
        </div>
      </div>

      <div className="grid gap-3 border-b border-slate-200 bg-slate-50 p-4 md:grid-cols-3">
        <input
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          placeholder="Recherche metier..."
        />

        <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500">
          <option>Tous les statuts</option>
          <option>Actif</option>
          <option>En suivi</option>
          <option>A controler</option>
        </select>

        <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500">
          <option>Tri recent</option>
          <option>Tri alphabetique</option>
          <option>Priorite</option>
        </select>
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
                  Chargement des donnees...
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="transition hover:bg-blue-50/70">
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className="whitespace-nowrap px-6 py-4 font-medium text-slate-700"
                    >
                      {column.render(row)}
                    </td>
                  ))}

                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <ERPRowActions module={module} id={row.id} />
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
'@

WriteFile "src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx" @'
"use client";

import { useState } from "react";
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import { RuntimeDataBinding } from "@/runtime/data-binding";
import { ERPButton } from "@/components/erp/ui";
import { ERPFormField } from "./ERPFormField";
import { ERPFormSection } from "./ERPFormSection";
import { ERPFormSummaryPanel } from "./ERPFormSummaryPanel";

interface ERPEnterpriseFormProps {
  module: ERPModule;
  mode?: "create" | "edit";
}

export function ERPEnterpriseForm({
  module,
  mode = "create",
}: ERPEnterpriseFormProps) {
  const [saving, setSaving] = useState(false);
  const form = ERPModuleBuilder.buildForm(module);

  const mainFields = form.fields.filter(
    (field) => field.type !== "relation"
  );

  const relationFields = form.fields.filter(
    (field) => field.type === "relation"
  );

  async function handleSave() {
    setSaving(true);

    const payload: Record<string, unknown> = {};

    form.fields.forEach((field) => {
      payload[field.key] = field.defaultValue ?? "";
    });

    if (mode === "create") {
      await RuntimeDataBinding.create(module, payload);
    }

    setSaving(false);
  }

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-8 py-8 text-white">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-200">
            {mode === "create" ? "Creation" : "Modification"}
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight">
            {module.metadata.label}
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
            Formulaire metier connecte au binding runtime.
          </p>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <ERPFormSection
            title="Informations principales"
            description="Renseigne les champs principaux du module."
          >
            {mainFields.map((field) => (
              <ERPFormField key={field.key} field={field} />
            ))}
          </ERPFormSection>

          {relationFields.length > 0 && (
            <ERPFormSection
              title="Relations"
              description="Associe cet element aux autres objets metier."
            >
              {relationFields.map((field) => (
                <ERPFormField key={field.key} field={field} />
              ))}
            </ERPFormSection>
          )}

          <div className="flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <ERPButton
              type="button"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Enregistrement..." : "Enregistrer"}
            </ERPButton>

            <ERPButton variant="secondary" type="button">
              Enregistrer et continuer
            </ERPButton>

            <ERPButton variant="ghost" type="button">
              Annuler
            </ERPButton>
          </div>
        </div>

        <ERPFormSummaryPanel module={module} />
      </section>
    </div>
  );
}
'@

Set-Location $projectRoot
pnpm build

Write-Host ""
Write-Host "=== RUNTIME DATA BINDING SYSTEM TERMINE ===" -ForegroundColor Green