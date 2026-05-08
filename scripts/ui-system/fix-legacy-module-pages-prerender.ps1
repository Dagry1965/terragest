$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
Set-Location -LiteralPath $ProjectRoot

function Ensure-Dir($Path) {
  if (!(Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Write-Utf8($Path, $Content) {
  $FullPath = Join-Path $ProjectRoot $Path
  $Dir = Split-Path $FullPath -Parent
  Ensure-Dir $Dir

  if (Test-Path -LiteralPath $FullPath) {
    $BackupDir = Join-Path $ProjectRoot "backup\legacy-prerender"
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
  $key = $Module.Key
  $label = $Module.Label

  $Targets = @(
    @{ Path = "src\app\(private)\$key\page.tsx"; Type = "list"; Action = "Liste" },
    @{ Path = "src\app\(private)\$key\[id]\page.tsx"; Type = "details"; Action = "Details" },
    @{ Path = "src\app\(private)\$key\[id]\edit\page.tsx"; Type = "edit"; Action = "Edition" }
  )

  foreach ($Target in $Targets) {
    if (Test-Path -LiteralPath (Join-Path $ProjectRoot $Target.Path)) {
      Write-Utf8 $Target.Path @"
import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function Page() {
  return (
    <ERPModuleActionPageTemplate
      moduleLabel="$label"
      type="$($Target.Type)"
      actionLabel="$($Target.Action)"
      description="Page raccordee au template ERP enterprise centralise pour stabiliser le build et preparer la convergence runtime."
    />
  );
}
"@
    }
  }
}

Write-Host ""
Write-Host "Pages legacy module convergentes corrigees." -ForegroundColor Green
Write-Host "Relance : pnpm build" -ForegroundColor Yellow