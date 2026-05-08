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

  $FullPath = Join-Path $ProjectRoot $Path
  $Dir = Split-Path $FullPath -Parent

  Ensure-Dir $Dir

  if (Test-Path -LiteralPath $FullPath) {
    $BackupDir = Join-Path $ProjectRoot "backup\create-pages-prerender"
    Ensure-Dir $BackupDir

    $SafeName = $Path.Replace("\", "__").Replace("/", "__").Replace(":", "")
    Copy-Item -LiteralPath $FullPath -Destination (Join-Path $BackupDir "$SafeName.bak") -Force
  }

  [System.IO.File]::WriteAllText(
    $FullPath,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN: $Path" -ForegroundColor Green
}

$Modules = @(
  @{ Key = "exploitations"; Label = "Exploitations" },
  @{ Key = "terrains"; Label = "Terrains" },
  @{ Key = "materiels"; Label = "Materiels" },
  @{ Key = "produits"; Label = "Produits" },
  @{ Key = "stocks"; Label = "Stocks" },
  @{ Key = "paiements"; Label = "Paiements" },
  @{ Key = "interventions"; Label = "Interventions" },
  @{ Key = "contrats"; Label = "Contrats" },
  @{ Key = "maintenance"; Label = "Maintenance" }
)

foreach ($Module in $Modules) {
  $Paths = @(
    "src\app\(private)\$($Module.Key)\nouveau\page.tsx",
    "src\app\(private)\$($Module.Key)\new\page.tsx"
  )

  foreach ($Path in $Paths) {
    $FullPath = Join-Path $ProjectRoot $Path

    if (Test-Path -LiteralPath $FullPath) {
      Write-Utf8 $Path @"
import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function Page() {
  return (
    <ERPModuleActionPageTemplate
      moduleLabel="$($Module.Label)"
      type="create"
      actionLabel="Creation"
      description="Page de creation raccordee au template ERP enterprise centralise."
    />
  );
}
"@
    }
  }
}

Write-Host ""
Write-Host "Pages de creation convergentes corrigees." -ForegroundColor Green
Write-Host "Relance : pnpm build" -ForegroundColor Yellow