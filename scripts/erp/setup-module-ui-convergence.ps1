$ErrorActionPreference = "Stop"

function Ensure-Dir {
  param([string]$Path)

  if (!(Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Write-ERPFile {
  param(
    [string]$Path,
    [string]$Content
  )

  $dir = Split-Path $Path -Parent

  if ([string]::IsNullOrWhiteSpace($dir)) {
    $dir = "."
  }

  Ensure-Dir $dir

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN: $Path" -ForegroundColor Green
}

Write-Host "SETUP MODULE UI CONVERGENCE" -ForegroundColor Cyan

Ensure-Dir "src/components/erp/modules"

Write-ERPFile "src/components/erp/modules/ERPModulePageShell.tsx" @'
import type { ReactNode } from "react";
import {
  ERPPageHeader,
  ERPSection,
  ERPStatCard,
} from "@/components/erp/ui";

type ERPModulePageShellProps = {
  moduleLabel: string;
  moduleDescription?: string;
  children: ReactNode;
  stats?: {
    label: string;
    value: string | number;
    helper?: string;
  }[];
};

export function ERPModulePageShell({
  moduleLabel,
  moduleDescription,
  children,
  stats = [],
}: ERPModulePageShellProps) {
  return (
    <div className="p-10 space-y-8">
      <ERPPageHeader
        eyebrow="Module ERP"
        title={moduleLabel}
        description={moduleDescription}
      />

      {stats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <ERPStatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              helper={stat.helper}
            />
          ))}
        </div>
      )}

      <ERPSection>
        {children}
      </ERPSection>
    </div>
  );
}
'@

Write-ERPFile "src/components/erp/modules/ERPModulePlaceholder.tsx" @'
import { ERPEmptyState } from "@/components/erp/ui";

type ERPModulePlaceholderProps = {
  moduleLabel: string;
};

export function ERPModulePlaceholder({
  moduleLabel,
}: ERPModulePlaceholderProps) {
  return (
    <ERPEmptyState
      title={`${moduleLabel} prêt`}
      description="Ce module est raccordé au shell ERP enterprise. La prochaine étape consiste à brancher les données runtime réelles."
    />
  );
}
'@

Write-ERPFile "src/components/erp/modules/index.ts" @'
export * from "./ERPModulePageShell";
export * from "./ERPModulePlaceholder";
'@

Write-Host ""
Write-Host "MODULE UI CONVERGENCE INSTALLEE" -ForegroundColor Green
Write-Host "Relance : pnpm build" -ForegroundColor Yellow
