$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\Admin\terragest"

function Write-Utf8File {
  param([string]$Path, [string]$Content)

  $fullPath = Join-Path $projectRoot $Path
  $dir = Split-Path $fullPath
  New-Item -ItemType Directory -Force $dir | Out-Null

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($fullPath, $Content, $utf8NoBom)

  Write-Host "OK $fullPath" -ForegroundColor Green
}

Write-Utf8File "src\components\erp\ui\ERPButton.tsx" @'
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ERPButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ERPButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ERPButtonVariant;
}

const variants: Record<ERPButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white border-blue-500 hover:bg-blue-500 shadow-lg shadow-blue-950/40",
  secondary:
    "bg-white text-slate-950 border-white hover:bg-slate-200 shadow-lg shadow-black/20",
  ghost:
    "bg-slate-900 text-slate-100 border-slate-700 hover:bg-slate-800",
  danger:
    "bg-red-600 text-white border-red-500 hover:bg-red-500 shadow-lg shadow-red-950/30",
};

export function ERPButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: ERPButtonProps) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center rounded-2xl border px-5 py-2.5 text-sm font-bold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
'@

Write-Utf8File "src\components\erp\layout\ERPPageHero.tsx" @'
import type { ReactNode } from "react";
import { ERPBadge, ERPButton } from "@/components/erp/ui";

interface ERPPageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  category?: string;
  actions?: ReactNode;
  side?: ReactNode;
}

export function ERPPageHero({
  eyebrow = "Module métier",
  title,
  description,
  category,
  actions,
  side,
}: ERPPageHeroProps) {
  return (
    <section className="mb-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-950 shadow-2xl">
      <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
        <div>
          <div className="flex flex-wrap gap-2">
            <ERPBadge tone="info">{eyebrow}</ERPBadge>
            <ERPBadge tone="success">Opérationnel</ERPBadge>
            {category && <ERPBadge>{category}</ERPBadge>}
          </div>

          <h1 className="mt-6 text-5xl font-black tracking-tight">
            {title}
          </h1>

          {description && (
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {description}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {actions ?? (
              <>
                <ERPButton type="button">Créer un enregistrement</ERPButton>
                <ERPButton variant="secondary" type="button">
                  Exporter
                </ERPButton>
                <ERPButton variant="ghost" type="button">
                  Inspecter
                </ERPButton>
              </>
            )}
          </div>
        </div>

        {side}
      </div>
    </section>
  );
}
'@

Write-Utf8File "src\components\erp\layout\ERPAppShell.tsx" @'
import type { ReactNode } from "react";
import { ERPBadge } from "@/components/erp/ui";
import { coreERPModules } from "@/runtime/modules";

interface ERPAppShellProps {
  children: ReactNode;
  activeModule?: string;
}

export function ERPAppShell({ children, activeModule }: ERPAppShellProps) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <div className="grid min-h-screen grid-cols-1 xl:grid-cols-[300px_1fr]">
        <aside className="hidden border-r border-slate-200 bg-slate-950 p-6 text-white xl:block">
          <div className="mb-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-black">
              TG
            </div>

            <h1 className="mt-5 text-2xl font-black">
              Terragest ERP
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Enterprise Runtime Platform
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            <ERPBadge tone="success">ERP Core</ERPBadge>
            <ERPBadge tone="info">Runtime</ERPBadge>
          </div>

          <nav className="space-y-2">
            {coreERPModules.map((item) => {
              const active = activeModule === item.metadata.key;

              return (
                <a
                  key={item.metadata.key}
                  href={`/${item.metadata.key}`}
                  className={`block rounded-2xl px-4 py-3 text-sm transition ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <div className="font-bold">{item.metadata.label}</div>
                  <div className="mt-1 text-xs opacity-70">
                    {item.metadata.category ?? "Module ERP"}
                  </div>
                </a>
              );
            })}
          </nav>
        </aside>

        <main className="p-6 md:p-8 xl:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
'@

Write-Utf8File "src\components\erp\layout\ERPTopBar.tsx" @'
import type { ReactNode } from "react";
import { ERPBadge, ERPButton } from "@/components/erp/ui";

interface ERPTopBarProps {
  eyebrow?: string;
  title?: string;
  actions?: ReactNode;
}

export function ERPTopBar({
  eyebrow = "Terragest_V2",
  title = "Pilotage ERP centralisé",
  actions,
}: ERPTopBarProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">
          {title}
        </h2>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <ERPBadge tone="success">Build OK</ERPBadge>
        <ERPBadge tone="info">Runtime actif</ERPBadge>
        {actions ?? (
          <ERPButton variant="ghost" type="button">
            Audit
          </ERPButton>
        )}
      </div>
    </header>
  );
}
'@

Write-Utf8File "src\components\erp\runtime\ERPRuntimeTable.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import { ERPRuntimeFieldValue } from "./ERPRuntimeFieldValue";

interface ERPRuntimeTableProps {
  module: ERPModule;
  data?: Record<string, unknown>[];
}

function createDemoRows(module: ERPModule): Record<string, unknown>[] {
  return Array.from({ length: 6 }).map((_, index) => {
    const row: Record<string, unknown> = {};

    module.schema.fields.forEach((field) => {
      if (field.type === "number") row[field.key] = index * 10 + 5;
      else if (field.type === "status") row[field.key] = index % 2 === 0 ? "Actif" : "En suivi";
      else if (field.type === "relation") row[field.key] = "REF-" + String(index + 1).padStart(3, "0");
      else row[field.key] = `${field.label} ${index + 1}`;
    });

    return row;
  });
}

export function ERPRuntimeTable({ module, data }: ERPRuntimeTableProps) {
  const table = ERPModuleBuilder.buildTable(module);
  const rows = data && data.length > 0 ? data : createDemoRows(module);

  const columns = table.columns.map((column) => {
    const field = module.schema.fields.find((item) => item.key === column.key);

    return {
      key: column.key,
      label: column.label,
      render: (row: Record<string, unknown>) =>
        field ? (
          <ERPRuntimeFieldValue field={field} value={row[column.key]} />
        ) : (
          String(row[column.key] ?? "")
        ),
    };
  });

  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
      <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-black text-slate-950">
            Registre opérationnel
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Table générée par le Runtime ERP.
          </p>
        </div>

        <div className="flex gap-2">
          <ERPBadge tone="success">{rows.length} lignes</ERPBadge>
          <ERPBadge tone="info">{columns.length} colonnes</ERPBadge>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="whitespace-nowrap px-6 py-4 text-xs font-black uppercase tracking-wide text-slate-500"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr key={index} className="transition hover:bg-blue-50">
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="whitespace-nowrap px-6 py-4 font-medium text-slate-700"
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
'@

Set-Location $projectRoot
pnpm build