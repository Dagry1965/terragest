$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
Set-Location -LiteralPath $ProjectRoot

function Ensure-Dir {
  param([string]$Path)

  if (!(Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Write-Utf8 {
  param(
    [string]$Path,
    [string]$Content
  )

  $dir = Split-Path $Path -Parent
  Ensure-Dir $dir

  if (Test-Path -LiteralPath $Path) {
    $backupDir = "backup\ui-fix"
    Ensure-Dir $backupDir

    $safeName = $Path.Replace("\", "__").Replace("/", "__").Replace(":", "")
    Copy-Item -LiteralPath $Path -Destination "$backupDir\$safeName.bak" -Force
  }

  $utf8 = [System.Text.UTF8Encoding]::new($false)
  [System.IO.File]::WriteAllText(
    (Join-Path $ProjectRoot $Path),
    $Content,
    $utf8
  )

  Write-Host "WRITTEN: $Path" -ForegroundColor Green
}

Write-Host ""
Write-Host "FIX ENTERPRISE UI EXPORTS" -ForegroundColor Cyan
Write-Host ""

Ensure-Dir "src\components\erp\templates"
Ensure-Dir "src\components\erp\ui"

Write-Utf8 "src\components\erp\ui\ERPPageHeader.tsx" @'
type ERPPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function ERPPageHeader({
  eyebrow,
  title,
  description,
}: ERPPageHeaderProps) {
  return (
    <div className="space-y-2">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
          {eyebrow}
        </p>
      )}

      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
'@

Write-Utf8 "src\components\erp\ui\ERPSection.tsx" @'
import type { ReactNode } from "react";

type ERPSectionProps = {
  children: ReactNode;
  className?: string;
};

export function ERPSection({
  children,
  className = "",
}: ERPSectionProps) {
  return (
    <section
      className={[
        "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}
'@

Write-Utf8 "src\components\erp\ui\ERPStatCard.tsx" @'
type ERPStatCardProps = {
  label: string;
  value: string | number;
  helper?: string;
};

export function ERPStatCard({
  label,
  value,
  helper,
}: ERPStatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold text-slate-950">
        {value}
      </p>

      {helper && (
        <p className="mt-1 text-sm text-slate-500">
          {helper}
        </p>
      )}
    </div>
  );
}
'@

Write-Utf8 "src\components\erp\ui\ERPEmptyState.tsx" @'
type ERPEmptyStateProps = {
  title: string;
  description?: string;
};

export function ERPEmptyState({
  title,
  description,
}: ERPEmptyStateProps) {
  return (
    <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <div className="max-w-xl">
        <h2 className="text-lg font-semibold text-slate-950">
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-sm text-slate-600">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
'@

Write-Utf8 "src\components\erp\templates\ERPModuleActionPageTemplate.tsx" @'
import {
  ERPPageHeader,
  ERPSection,
  ERPEmptyState,
} from "@/components/erp/ui";

type ERPModuleActionPageTemplateProps = {
  moduleLabel?: string;
  moduleName?: string;
  actionLabel?: string;
  title?: string;
  description?: string;
};

export function ERPModuleActionPageTemplate({
  moduleLabel,
  moduleName,
  actionLabel,
  title,
  description,
}: ERPModuleActionPageTemplateProps) {
  const resolvedModule =
    moduleLabel ?? moduleName ?? "Module ERP";

  const resolvedAction =
    actionLabel ?? title ?? "Action ERP";

  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow={resolvedModule}
        title={resolvedAction}
        description={
          description ??
          "Page action raccordee au template ERP enterprise centralise."
        }
      />

      <ERPSection>
        <ERPEmptyState
          title={`${resolvedAction} pret`}
          description="Cette page utilise maintenant le template ERP central. La prochaine etape consiste a connecter les donnees runtime reelles."
        />
      </ERPSection>
    </div>
  );
}
'@

Write-Utf8 "src\components\erp\templates\index.ts" @'
export * from "./ERPModuleActionPageTemplate";
'@

$uiIndex = "src\components\erp\ui\index.ts"

if (Test-Path -LiteralPath $uiIndex) {
  $content = Get-Content -LiteralPath $uiIndex -Raw

  $exports = @(
    'export * from "./ERPPageHeader";',
    'export * from "./ERPSection";',
    'export * from "./ERPStatCard";',
    'export * from "./ERPEmptyState";'
  )

  foreach ($export in $exports) {
    if ($content -notmatch [regex]::Escape($export)) {
      $content = $content.TrimEnd() + "`r`n" + $export + "`r`n"
    }
  }

  Write-Utf8 $uiIndex $content
}
else {
  Write-Utf8 $uiIndex @'
export * from "./ERPPageHeader";
export * from "./ERPSection";
export * from "./ERPStatCard";
export * from "./ERPEmptyState";
'@
}

Write-Host ""
Write-Host "FIX TERMINE" -ForegroundColor Green
Write-Host "Lance maintenant : pnpm build" -ForegroundColor Yellow