$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"
$file = Join-Path $root "src\runtime\generated\GeneratedRuntimeModules.ts"

$content = Get-Content $file -Raw

if ($content -match 'id:\s*"campagnes"') {
  Write-Host "OK - campagnes existe déjà dans GeneratedRuntimeModules"
  exit 0
}

$campagnes = @'

,
{
  id: "campagnes",
  label: "campagnes",
  domain: "campagnes",
  version: "1.0.0",
  status: "active",
  capabilities: [
    "workflow",
    "automation",
    "audit",
    "permissions",
    "states",
    "relations",
    "observability",
    "realtime"
  ],
  events: [],
  workflows: [],
  permissions: [],
  states: [],
  relations: []
}
'@

$content = $content -replace '\n\s*\];\s*$', "$campagnes`r`n`r`n];"

[System.IO.File]::WriteAllText(
  $file,
  $content,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "OK - campagnes ajouté dans GeneratedRuntimeModules"