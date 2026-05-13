$ErrorActionPreference = "Stop"

$Root = (Get-Location).Path
$CorePath = Join-Path $Root "src\runtime\modules\definitions\coreModules.ts"
$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)

if (-not (Test-Path $CorePath)) {
  throw "Fichier introuvable: $CorePath"
}

$content = [System.IO.File]::ReadAllText($CorePath)

if ($content -notmatch 'generatedERPModules') {
  $content = $content.Replace(
    'import type { ERPModule } from "../ERPModule";',
    "import type { ERPModule } from `"../ERPModule`";`r`nimport { generatedERPModules } from `"./generated/generatedModules`";"
  )
}

if ($content -notmatch 'mergeERPModules') {
  $append = @'

function mergeERPModules(
  coreModules: ERPModule[],
  generatedModules: ERPModule[]
): ERPModule[] {
  const map = new Map<string, ERPModule>();

  for (const module of generatedModules) {
    map.set(module.metadata.key, module);
  }

  for (const module of coreModules) {
    map.set(module.metadata.key, module);
  }

  return Array.from(map.values());
}

export const allERPModules: ERPModule[] = mergeERPModules(
  coreERPModules,
  generatedERPModules
);
'@

  $content = $content.TrimEnd() + "`r`n" + $append
}

[System.IO.File]::WriteAllText($CorePath, $content, $Utf8NoBom)

Write-Host "UPDATED $CorePath"