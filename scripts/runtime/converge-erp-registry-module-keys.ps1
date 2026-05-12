$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

$file =
  Join-Path $root `
  "src\runtime\registry\modules\ERPRegistryModules.ts"

if (!(Test-Path $file)) {
  throw "Fichier introuvable: $file"
}

Copy-Item `
  $file `
  "$file.bak" `
  -Force

$content = Get-Content $file -Raw

$pattern = 'const ModuleKeys = \[[\s\S]*?\];'

$replacement = @'
const ModuleKeys =
  CoreModuleRuntimeAdapter
    .toRuntimeModules()
    .map((module) => module.id);
'@

$content = [regex]::Replace(
  $content,
  $pattern,
  $replacement
)

[System.IO.File]::WriteAllText(
  $file,
  $content,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "OK - ERPRegistryModules ModuleKeys généré depuis coreERPModules"
Write-Host "Backup créé: $file.bak"
Write-Host ""
Write-Host "Lance maintenant: pnpm build"