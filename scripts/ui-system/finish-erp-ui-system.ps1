$ErrorActionPreference = "Stop"

Write-Host "=== TERRAGEST ERP UI SYSTEM ENTERPRISE FINALIZATION ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src\components\erp\ui\table" | Out-Null
New-Item -ItemType Directory -Force "scripts\reports" | Out-Null

function Write-ERPFile {
  param(
    [string]$Path,
    [string]$Content
  )

  $dir = Split-Path $Path
  New-Item -ItemType Directory -Force $dir | Out-Null
  Set-Content -Path $Path -Value $Content -Encoding UTF8
  Write-Host "OK $Path" -ForegroundColor Green
}

Write-ERPFile "src\components\erp\ui\ERPButton.tsx" @'
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ERPButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ERPButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ERPButtonVariant;
}

const variants: Record<ERPButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
  secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700",
  ghost: "bg-transparent text-slate-300 hover:bg-slate-800",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

export function ERPButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: ERPButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
'@

Write-ERPFile "src\components\erp\ui\ERPCard.tsx" @'
import type { ReactNode } from "react";

interface ERPCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}

export function ERPCard({
  title,
  description,
  children,
  className = "",
  actions,
}: ERPCardProps) {
  return (
    <section
      className={`rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-sm backdrop-blur ${className}`}
    >
      {(title || description || actions) && (
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-slate-100">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-1 text-sm text-slate-400">
                {description}
              </p>
            )}
          </div>

          {actions && <div>{actions}</div>}
        </div>
      )}

      {children}
    </section>
  );
}
'@

Write-ERPFile "src\components\erp\ui\ERPBadge.tsx" @'
import type { ReactNode } from "react";

type ERPBadgeTone = "default" | "success" | "warning" | "danger" | "info";

interface ERPBadgeProps {
  children: ReactNode;
  tone?: ERPBadgeTone;
  className?: string;
}

const tones: Record<ERPBadgeTone, string> = {
  default: "bg-slate-800 text-slate-200 border-slate-700",
  success: "bg-emerald-950 text-emerald-300 border-emerald-800",
  warning: "bg-amber-950 text-amber-300 border-amber-800",
  danger: "bg-red-950 text-red-300 border-red-800",
  info: "bg-sky-950 text-sky-300 border-sky-800",
};

export function ERPBadge({
  children,
  tone = "default",
  className = "",
}: ERPBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
'@

Write-ERPFile "src\components\erp\ui\ERPInput.tsx" @'
import type { InputHTMLAttributes } from "react";

interface ERPInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function ERPInput({
  label,
  error,
  className = "",
  ...props
}: ERPInputProps) {
  return (
    <label className="block space-y-2">
      {label && (
        <span className="text-sm font-medium text-slate-300">
          {label}
        </span>
      )}

      <input
        className={`w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${className}`}
        {...props}
      />

      {error && (
        <span className="text-xs text-red-400">
          {error}
        </span>
      )}
    </label>
  );
}
'@

Write-ERPFile "src\components\erp\ui\ERPSelect.tsx" @'
import type { SelectHTMLAttributes } from "react";

interface ERPSelectOption {
  label: string;
  value: string;
}

interface ERPSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: ERPSelectOption[];
  error?: string;
}

export function ERPSelect({
  label,
  options = [],
  error,
  className = "",
  children,
  ...props
}: ERPSelectProps) {
  return (
    <label className="block space-y-2">
      {label && (
        <span className="text-sm font-medium text-slate-300">
          {label}
        </span>
      )}

      <select
        className={`w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${className}`}
        {...props}
      >
        {children ??
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>

      {error && (
        <span className="text-xs text-red-400">
          {error}
        </span>
      )}
    </label>
  );
}
'@

Write-ERPFile "src\components\erp\ui\ERPEmptyState.tsx" @'
import type { ReactNode } from "react";

interface ERPEmptyStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
}

export function ERPEmptyState({
  title = "Aucune donnée",
  description = "Aucun élément disponible pour le moment.",
  action,
}: ERPEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/60 p-10 text-center">
      <h3 className="text-base font-semibold text-slate-100">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
        {description}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
'@

Write-ERPFile "src\components\erp\ui\ERPSkeleton.tsx" @'
interface ERPSkeletonProps {
  className?: string;
}

export function ERPSkeleton({ className = "" }: ERPSkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-800/80 ${className}`}
    />
  );
}
'@

Write-ERPFile "src\components\erp\ui\ERPModal.tsx" @'
import type { ReactNode } from "react";

interface ERPModalProps {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose?: () => void;
}

export function ERPModal({
  open,
  title,
  children,
  onClose,
}: ERPModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          {title && (
            <h2 className="text-lg font-semibold text-slate-100">
              {title}
            </h2>
          )}

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-2 py-1 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            >
              Fermer
            </button>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
'@

Write-ERPFile "src\components\erp\ui\ERPDrawer.tsx" @'
import type { ReactNode } from "react";

interface ERPDrawerProps {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose?: () => void;
}

export function ERPDrawer({
  open,
  title,
  children,
  onClose,
}: ERPDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <aside className="ml-auto h-full w-full max-w-md border-l border-slate-800 bg-slate-950 p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          {title && (
            <h2 className="text-lg font-semibold text-slate-100">
              {title}
            </h2>
          )}

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-2 py-1 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            >
              Fermer
            </button>
          )}
        </div>

        {children}
      </aside>
    </div>
  );
}
'@

Write-ERPFile "src\components\erp\ui\ERPTabs.tsx" @'
import type { ReactNode } from "react";

interface ERPTabItem {
  key: string;
  label: string;
  content: ReactNode;
}

interface ERPTabsProps {
  items: ERPTabItem[];
  activeKey?: string;
}

export function ERPTabs({ items, activeKey }: ERPTabsProps) {
  const active = items.find((item) => item.key === activeKey) ?? items[0];

  return (
    <div>
      <div className="mb-4 flex gap-2 border-b border-slate-800">
        {items.map((item) => (
          <div
            key={item.key}
            className={`border-b-2 px-3 py-2 text-sm ${
              item.key === active.key
                ? "border-blue-500 text-blue-300"
                : "border-transparent text-slate-400"
            }`}
          >
            {item.label}
          </div>
        ))}
      </div>

      <div>{active?.content}</div>
    </div>
  );
}
'@

Write-ERPFile "src\components\erp\ui\ERPToast.tsx" @'
interface ERPToastProps {
  title: string;
  message?: string;
  tone?: "success" | "warning" | "danger" | "info";
}

export function ERPToast({
  title,
  message,
  tone = "info",
}: ERPToastProps) {
  const toneClass = {
    success: "border-emerald-800 bg-emerald-950 text-emerald-200",
    warning: "border-amber-800 bg-amber-950 text-amber-200",
    danger: "border-red-800 bg-red-950 text-red-200",
    info: "border-sky-800 bg-sky-950 text-sky-200",
  }[tone];

  return (
    <div className={`rounded-xl border p-4 shadow-lg ${toneClass}`}>
      <strong className="block text-sm">{title}</strong>
      {message && <p className="mt-1 text-sm opacity-80">{message}</p>}
    </div>
  );
}
'@

Write-ERPFile "src\components\erp\ui\ERPChartCard.tsx" @'
import type { ReactNode } from "react";
import { ERPCard } from "./ERPCard";

interface ERPChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ERPChartCard({
  title,
  description,
  children,
}: ERPChartCardProps) {
  return (
    <ERPCard title={title} description={description}>
      <div className="min-h-64">{children}</div>
    </ERPCard>
  );
}
'@

Write-ERPFile "src\components\erp\ui\table\ERPTable.tsx" @'
import type { ReactNode } from "react";

export interface ERPTableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => ReactNode;
}

interface ERPTableProps<T> {
  columns: ERPTableColumn<T>[];
  data: T[];
  emptyLabel?: string;
}

export function ERPTable<T extends Record<string, unknown>>({
  columns,
  data,
  emptyLabel = "Aucune donnée disponible",
}: ERPTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-slate-900 text-slate-300">
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)} className="px-4 py-3 font-medium">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800 bg-slate-950">
          {data.length === 0 ? (
            <tr>
              <td
                className="px-4 py-8 text-center text-slate-400"
                colSpan={columns.length}
              >
                {emptyLabel}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index} className="hover:bg-slate-900/60">
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-4 py-3 text-slate-200">
                    {column.render
                      ? column.render(row)
                      : String(row[column.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
'@

Write-ERPFile "src\components\erp\ui\table\index.ts" @'
export { ERPTable } from "./ERPTable";
export type { ERPTableColumn } from "./ERPTable";
'@

Write-ERPFile "src\components\erp\ui\index.ts" @'
export { ERPBadge } from "./ERPBadge";
export { ERPButton } from "./ERPButton";
export { ERPCard } from "./ERPCard";
export { ERPChartCard } from "./ERPChartCard";
export { ERPDrawer } from "./ERPDrawer";
export { ERPEmptyState } from "./ERPEmptyState";
export { ERPInput } from "./ERPInput";
export { ERPModal } from "./ERPModal";
export { ERPSelect } from "./ERPSelect";
export { ERPSkeleton } from "./ERPSkeleton";
export { ERPTabs } from "./ERPTabs";
export { ERPToast } from "./ERPToast";

export { ERPTable } from "./table";
export type { ERPTableColumn } from "./table";
'@

Write-Host ""
Write-Host "=== Compatibilité ancienne structure vers UI centrale ===" -ForegroundColor Cyan

Write-ERPFile "src\components\erp\forms\ERPButton.tsx" @'
export { ERPButton } from "@/components/erp/ui";
'@

Write-ERPFile "src\components\erp\forms\ERPInput.tsx" @'
export { ERPInput } from "@/components/erp/ui";
'@

Write-ERPFile "src\components\erp\theme\ERPCard.tsx" @'
export { ERPCard } from "@/components/erp/ui";
'@

Write-ERPFile "src\components\erp\theme\ERPTable.tsx" @'
export { ERPTable } from "@/components/erp/ui";
export type { ERPTableColumn } from "@/components/erp/ui";
'@

Write-ERPFile "src\components\erp\page\ERPEmptyState.tsx" @'
export { ERPEmptyState } from "@/components/erp/ui";
'@

Write-Host ""
Write-Host "=== Rapport imports UI non conformes ===" -ForegroundColor Cyan

$patterns = @(
  "@/components/erp/theme/ERPCard",
  "@/components/erp/theme/ERPTable",
  "@/components/erp/forms/ERPButton",
  "@/components/erp/forms/ERPInput",
  "@/components/erp/page/ERPEmptyState",
  "@/components/erp/page/ERPStatusBadge",
  "@/components/erp/datatable/ERPTable"
)

$files = Get-ChildItem -Path "src" -Recurse -Include *.ts,*.tsx
$results = @()

foreach ($file in $files) {
  $content = [System.IO.File]::ReadAllText($file.FullName)

  foreach ($pattern in $patterns) {
    if ($content.Contains($pattern)) {
      $results += [PSCustomObject]@{
        File = $file.FullName
        Import = $pattern
      }
    }
  }
}

$reportPath = "scripts\reports\ui-imports-report.txt"

if ($results.Count -eq 0) {
  "Aucun import UI non conforme trouvé." | Set-Content -Path $reportPath -Encoding UTF8
  Write-Host "Aucun import UI non conforme trouvé." -ForegroundColor Green
} else {
  $results | Format-Table -AutoSize | Out-String | Set-Content -Path $reportPath -Encoding UTF8
  Write-Host "Rapport généré : $reportPath" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Build Terragest ===" -ForegroundColor Cyan

pnpm build

Write-Host ""
Write-Host "=== UI SYSTEM ENTERPRISE FINALISÉ ===" -ForegroundColor Green