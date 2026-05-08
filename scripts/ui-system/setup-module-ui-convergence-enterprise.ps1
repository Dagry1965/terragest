$ErrorActionPreference = "Stop"

# =========================================================
# TERRAGEST ERP - UI ENTERPRISE CONVERGENCE
# =========================================================

$ProjectRoot = "C:\Users\Admin\terragest"

if (!(Test-Path -LiteralPath $ProjectRoot)) {
  throw "Projet introuvable : $ProjectRoot"
}

Set-Location -LiteralPath $ProjectRoot

Write-Host ""
Write-Host "TERRAGEST ERP - UI ENTERPRISE CONVERGENCE" -ForegroundColor Cyan
Write-Host "ProjectRoot: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""

# =========================================================
# HELPERS
# =========================================================

function Ensure-Dir {
  param([string]$Path)

  if ([string]::IsNullOrWhiteSpace($Path)) {
    return
  }

  $fullPath = Join-Path $ProjectRoot $Path

  if (!(Test-Path -LiteralPath $fullPath)) {
    New-Item `
      -ItemType Directory `
      -Path $fullPath `
      -Force | Out-Null

    Write-Host "DIR: $fullPath" -ForegroundColor DarkGreen
  }
}

function Backup-File {
  param([string]$Path)

  $fullPath = Join-Path $ProjectRoot $Path

  if (Test-Path -LiteralPath $fullPath) {

    $backupDir = Join-Path $ProjectRoot "backup\ui-convergence"

    if (!(Test-Path $backupDir)) {
      New-Item `
        -ItemType Directory `
        -Path $backupDir `
        -Force | Out-Null
    }

    $safeName = $Path

    $safeName = $safeName.Replace("\", "__")
    $safeName = $safeName.Replace("/", "__")
    $safeName = $safeName.Replace(":", "")

    $backupPath =
      Join-Path $backupDir "$safeName.bak"

    Copy-Item `
      -LiteralPath $fullPath `
      -Destination $backupPath `
      -Force

    Write-Host "BACKUP: $Path" -ForegroundColor DarkYellow
  }
}

function Write-ERPFile {
  param(
    [string]$Path,
    [string]$Content
  )

  $fullPath = Join-Path $ProjectRoot $Path

  $dir = Split-Path $fullPath -Parent

  if (!(Test-Path -LiteralPath $dir)) {
    New-Item `
      -ItemType Directory `
      -Path $dir `
      -Force | Out-Null
  }

  Backup-File $Path

  $utf8NoBom = [System.Text.UTF8Encoding]::new($false)

  [System.IO.File]::WriteAllText(
    $fullPath,
    $Content,
    $utf8NoBom
  )

  Write-Host "WRITTEN UTF8: $Path" -ForegroundColor Green
}

function Convert-ToUtf8NoBom {
  param([string]$Path)

  if (!(Test-Path -LiteralPath $Path)) {
    return
  }

  try {

    $content =
      [System.IO.File]::ReadAllText($Path)

    $utf8NoBom =
      [System.Text.UTF8Encoding]::new($false)

    [System.IO.File]::WriteAllText(
      $Path,
      $content,
      $utf8NoBom
    )

    Write-Host "ENCODING OK: $Path" -ForegroundColor DarkCyan

  } catch {

    Write-Host "ENCODING SKIP: $Path" -ForegroundColor DarkGray
  }
}

# =========================================================
# DIRECTORIES
# =========================================================

Ensure-Dir "src\components\erp\modules"
Ensure-Dir "src\components\erp\ui"
Ensure-Dir "src\components\erp\cockpit"
Ensure-Dir "src\components\erp\design-system"
Ensure-Dir "backup\ui-convergence"

# =========================================================
# MODULE SHELL
# =========================================================

Write-ERPFile "src\components\erp\modules\ERPModulePageShell.tsx" @'
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
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="Module ERP"
        title={moduleLabel}
        description={moduleDescription}
      />

      {stats.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
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

# =========================================================
# MODULE PLACEHOLDER
# =========================================================

Write-ERPFile "src\components\erp\modules\ERPModulePlaceholder.tsx" @'
import { ERPEmptyState } from "@/components/erp/ui";

type ERPModulePlaceholderProps = {
  moduleLabel: string;
};

export function ERPModulePlaceholder({
  moduleLabel,
}: ERPModulePlaceholderProps) {
  return (
    <ERPEmptyState
      title={`${moduleLabel} pret`}
      description="Ce module est raccorde au shell ERP enterprise."
    />
  );
}
'@

# =========================================================
# ENTERPRISE PAGE
# =========================================================

Write-ERPFile "src\components\erp\modules\ERPModuleEnterprisePage.tsx" @'
import {
  ERPModulePageShell,
  ERPModulePlaceholder,
} from "@/components/erp/modules";

type ERPModuleEnterprisePageProps = {
  moduleLabel: string;
  moduleDescription?: string;
};

export function ERPModuleEnterprisePage({
  moduleLabel,
  moduleDescription,
}: ERPModuleEnterprisePageProps) {
  return (
    <ERPModulePageShell
      moduleLabel={moduleLabel}
      moduleDescription={moduleDescription}
      stats={[
        {
          label: "Statut",
          value: "Actif",
          helper: "ERP operationnel",
        },
        {
          label: "Runtime",
          value: "Pret",
          helper: "Events et workflows",
        },
        {
          label: "UI",
          value: "Enterprise",
          helper: "Design system central",
        },
        {
          label: "Audit",
          value: "Disponible",
          helper: "Traçabilite active",
        },
      ]}
    >
      <ERPModulePlaceholder moduleLabel={moduleLabel} />
    </ERPModulePageShell>
  );
}
'@

# =========================================================
# INDEX
# =========================================================

Write-ERPFile "src\components\erp\modules\index.ts" @'
export * from "./ERPModulePageShell";
export * from "./ERPModulePlaceholder";
export * from "./ERPModuleEnterprisePage";
'@

# =========================================================
# TOKENS
# =========================================================

Write-ERPFile "src\components\erp\design-system\erp-theme-tokens.ts" @'
export const ERPThemeTokens = {
  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
  },

  spacing: {
    page: "2.5rem",
    section: "2rem",
    card: "1.5rem",
  },

  elevation: {
    card: "shadow-sm",
    panel: "shadow-md",
    floating: "shadow-xl",
  },
} as const;
'@

# =========================================================
# COCKPIT
# =========================================================

Write-ERPFile "src\components\erp\cockpit\ERPRuntimeCockpit.tsx" @'
import {
  ERPPageHeader,
  ERPSection,
  ERPStatCard,
  ERPEmptyState,
} from "@/components/erp/ui";

export function ERPRuntimeCockpit() {
  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="Cockpit ERP"
        title="Supervision runtime"
        description="Monitoring ERP enterprise."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <ERPStatCard label="Events" value="Live" />
        <ERPStatCard label="Workflows" value="Monitoring" />
        <ERPStatCard label="Queues" value="Stable" />
        <ERPStatCard label="Health" value="OK" />
      </div>

      <ERPSection>
        <ERPEmptyState
          title="Cockpit runtime pret"
          description="Connecter les flux runtime reels."
        />
      </ERPSection>
    </div>
  );
}
'@

# =========================================================
# MODULES
# =========================================================

$modules = @(
  @{
    Path = "src\app\(private)\exploitations\page.tsx"
    Label = "Exploitations"
    Description = "Pilotage des exploitations."
  },
  @{
    Path = "src\app\(private)\terrains\page.tsx"
    Label = "Terrains"
    Description = "Gestion des terrains."
  },
  @{
    Path = "src\app\(private)\materiels\page.tsx"
    Label = "Materiels"
    Description = "Gestion du parc materiel."
  },
  @{
    Path = "src\app\(private)\produits\page.tsx"
    Label = "Produits"
    Description = "Catalogue produits ERP."
  },
  @{
    Path = "src\app\(private)\stocks\page.tsx"
    Label = "Stocks"
    Description = "Suivi des stocks."
  },
  @{
    Path = "src\app\(private)\paiements\page.tsx"
    Label = "Paiements"
    Description = "Gestion financiere ERP."
  },
  @{
    Path = "src\app\(private)\interventions\page.tsx"
    Label = "Interventions"
    Description = "Interventions operationnelles."
  },
  @{
    Path = "src\app\(private)\contrats\page.tsx"
    Label = "Contrats"
    Description = "Gestion des contrats."
  }
)

foreach ($module in $modules) {

  $fullPath =
    Join-Path $ProjectRoot $module.Path

  if (Test-Path -LiteralPath $fullPath) {

    Write-ERPFile $module.Path @"
import { ERPModuleEnterprisePage } from "@/components/erp/modules";

export default function Page() {
  return (
    <ERPModuleEnterprisePage
      moduleLabel="$($module.Label)"
      moduleDescription="$($module.Description)"
    />
  );
}
"@

  } else {

    Write-Host "SKIP: $($module.Path)" -ForegroundColor Yellow
  }
}

# =========================================================
# UTF8 NORMALIZATION
# =========================================================

Write-Host ""
Write-Host "UTF8 NORMALIZATION..." -ForegroundColor Cyan
Write-Host ""

$filesToNormalize = Get-ChildItem `
  -Path (Join-Path $ProjectRoot "src") `
  -Recurse `
  -Include *.ts,*.tsx `
  -File `
  -ErrorAction SilentlyContinue

foreach ($file in $filesToNormalize) {
  Convert-ToUtf8NoBom $file.FullName
}

# =========================================================
# DONE
# =========================================================

Write-Host ""
Write-Host "UI ENTERPRISE CONVERGENCE TERMINEE" -ForegroundColor Green
Write-Host ""
Write-Host "COMMANDES :" -ForegroundColor Yellow
Write-Host "cd C:\Users\Admin\terragest"
Write-Host "pnpm build"
Write-Host ""