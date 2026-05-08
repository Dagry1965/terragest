$ErrorActionPreference = "Stop"

$projectRoot = "C:\Users\Admin\terragest"

function Write-Utf8File {
  param(
    [string]$Path,
    [string]$Content
  )

  $fullPath = Join-Path $projectRoot $Path
  $dir = Split-Path $fullPath

  New-Item -ItemType Directory -Force $dir | Out-Null

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($fullPath, $Content, $utf8NoBom)

  Write-Host "OK $fullPath" -ForegroundColor Green
}

$modules = @(
  "materiels",
  "exploitations",
  "terrains",
  "stocks",
  "produits"
)

foreach ($module in $modules) {

  $pagePath = "src\app\(private)\$module\page.tsx"

  $content = @"
import { ERPRuntimePage } from "@/components/erp/runtime";
import { coreERPModules } from "@/runtime/modules";

export default function Page() {
  const runtimeModule = coreERPModules.find(
    (module) => module.metadata.key === "$module"
  );

  return <ERPRuntimePage module={runtimeModule} />;
}
"@

  Write-Utf8File $pagePath $content
}

Set-Location $projectRoot

pnpm build

Write-Host ""
Write-Host "=== VRAIES PAGES MÉTIER CONNECTÉES AU LAYOUT ERP CENTRAL ===" -ForegroundColor Green