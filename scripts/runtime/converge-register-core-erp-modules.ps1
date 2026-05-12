$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

$file =
  Join-Path $root `
  "src\runtime\modules\registerCoreERPModules.ts"

if (!(Test-Path $file)) {
  throw "Fichier introuvable: $file"
}

Copy-Item `
  $file `
  "$file.bak" `
  -Force

$content = @'
import {
  coreERPModules,
} from "./definitions/coreModules";

import {
  ERPModuleRegistry,
} from "./ERPModuleRegistry";

export function registerCoreERPModules() {
  ERPModuleRegistry.clear();

  ERPModuleRegistry.registerMany(
    coreERPModules
  );

  return ERPModuleRegistry.all();
}
'@

[System.IO.File]::WriteAllText(
  $file,
  $content,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "OK - registerCoreERPModules converge vers coreERPModules"
Write-Host "Backup créé: $file.bak"
Write-Host ""
Write-Host "Lance maintenant: pnpm build"