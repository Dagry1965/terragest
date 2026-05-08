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
    $BackupDir = Join-Path $ProjectRoot "backup\all-subpages-prerender"
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

function Get-LabelFromPath($Path) {
  $parts = $Path -split "[\\/]"
  $module = $parts | Where-Object {
    $_ -notin @("src", "app", "(private)", "page.tsx", "[id]", "edit", "nouveau", "new")
  } | Select-Object -First 1

  if ([string]::IsNullOrWhiteSpace($module)) {
    return "Module ERP"
  }

  return ($module.Substring(0,1).ToUpper() + $module.Substring(1))
}

function Get-ActionFromPath($Path) {
  if ($Path -match "\\nouveau\\page\.tsx$") { return @{ Type = "create"; Action = "Creation" } }
  if ($Path -match "\\new\\page\.tsx$") { return @{ Type = "create"; Action = "Creation" } }
  if ($Path -match "\\edit\\page\.tsx$") { return @{ Type = "edit"; Action = "Edition" } }
  if ($Path -match "\\audit\\page\.tsx$") { return @{ Type = "audit"; Action = "Audit" } }
  if ($Path -match "\\import\\page\.tsx$") { return @{ Type = "import"; Action = "Import" } }
  if ($Path -match "\\export\\page\.tsx$") { return @{ Type = "export"; Action = "Export" } }
  if ($Path -match "\\relations\\page\.tsx$") { return @{ Type = "relations"; Action = "Relations" } }
  if ($Path -match "\\workflows\\page\.tsx$") { return @{ Type = "workflows"; Action = "Workflows" } }
  if ($Path -match "\\\[id\]\\page\.tsx$") { return @{ Type = "details"; Action = "Details" } }

  return @{ Type = "list"; Action = "Page ERP" }
}

$Root = Join-Path $ProjectRoot "src\app\(private)"

$TargetFiles = Get-ChildItem `
  -LiteralPath $Root `
  -Recurse `
  -File `
  -Filter "page.tsx" |
  Where-Object {
    $_.FullName -match "\\(nouveau|new|edit|audit|import|export|relations|workflows|pannes)\\page\.tsx$" `
    -or $_.FullName -match "\\\[id\]\\page\.tsx$"
  }

foreach ($File in $TargetFiles) {
  $Relative = $File.FullName.Replace($ProjectRoot + "\", "")
  $Label = Get-LabelFromPath $Relative
  $Action = Get-ActionFromPath $Relative

  Write-Utf8 $Relative @"
import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function Page() {
  return (
    <ERPModuleActionPageTemplate
      moduleLabel="$Label"
      type="$($Action.Type)"
      actionLabel="$($Action.Action)"
      description="Page legacy stabilisee par le template ERP enterprise centralise."
    />
  );
}
"@
}

Write-Host ""
Write-Host "Sous-pages legacy stabilisees : $($TargetFiles.Count)" -ForegroundColor Green
Write-Host "Relance : pnpm build" -ForegroundColor Yellow