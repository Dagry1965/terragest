$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

$files = @(
  "src\runtime\core\RuntimeBindings.ts",
  "src\runtime\core\RuntimePermissionRegistry.ts",
  "src\runtime\core\RuntimeStateRegistry.ts"
)

foreach ($relativePath in $files) {
  $file = Join-Path $root $relativePath

  if (!(Test-Path $file)) {
    throw "Fichier introuvable: $file"
  }

  Copy-Item $file "$file.bak" -Force

  $content = Get-Content $file -Raw

  $content = $content -replace 'import\s*\{\s*GeneratedRuntimeBindings,\s*\}\s*from\s*"\.\./generated/GeneratedRuntimeBindings";', @'
import {
  CoreModuleRuntimeAdapter,
} from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";
'@

  $content = $content -replace 'GeneratedRuntimeBindings', 'CoreModuleRuntimeAdapter.toRuntimeBindings()'

  [System.IO.File]::WriteAllText(
    $file,
    $content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "OK - converged:" $relativePath
}

Write-Host ""
Write-Host "Convergence RuntimeBindings / Permissions / States terminée."
Write-Host "Lance maintenant: pnpm build"