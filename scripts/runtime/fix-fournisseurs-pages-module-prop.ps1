$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

$pages = @(
  "src\app\(private)\fournisseurs\page.tsx",
  "src\app\(private)\fournisseurs\nouveau\page.tsx",
  "src\app\(private)\fournisseurs\[id]\page.tsx",
  "src\app\(private)\fournisseurs\[id]\edit\page.tsx"
)

foreach ($relative in $pages) {
  $file = Join-Path $root $relative

  if (!(Test-Path -LiteralPath $file)) {
    Write-Host "SKIP introuvable: $relative"
    continue
  }

  Copy-Item -LiteralPath $file -Destination "$file.bak" -Force

  $content = Get-Content -LiteralPath $file -Raw

  if ($content -notmatch 'coreERPModules') {
    $content = $content -replace '("use client";\s*)?', '$1'
    $content = @'
import {
  coreERPModules,
} from "@/runtime/modules";

'@ + $content
  }

  if ($content -notmatch 'const module =') {
    $content = $content -replace '\{\s*return\s*\(', @'
{
  const module =
    coreERPModules.find(
      (item) =>
        item.metadata.key === "fournisseurs"
    );

  if (!module) {
    throw new Error(
      "Module fournisseurs introuvable"
    );
  }

  return (
'@
  }

  $content = $content -replace 'module="fournisseurs"', 'module={module}'

  [System.IO.File]::WriteAllText(
    $file,
    $content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "OK - fixed: $relative"
}

Write-Host "Lance maintenant: pnpm build"