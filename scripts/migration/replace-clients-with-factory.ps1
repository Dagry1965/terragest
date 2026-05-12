$ErrorActionPreference = "Stop"

$path = "C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts"

$content = [System.IO.File]::ReadAllText($path)

# 1. Ajouter l'import factory si absent
$import = @'
import {
  createBusinessModule,
  clientFields,
} from "../factory";

'@

if (-not $content.Contains('from "../factory"')) {
  $content = $content.Replace(
    'import type { ERPModule } from "../ERPModule";

',
    'import type { ERPModule } from "../ERPModule";

' + $import
  )
}

# 2. Remplacer le bloc clients complet
$pattern = '(?s)\s*\{\s*metadata:\s*\{\s*key:\s*"clients".*?\n\s*\},\s*\n\s*\{'

$replacement = @'

  createBusinessModule({
    key: "clients",
    label: "Clients",
    fields: clientFields,
  }),

  {
'@

$content = [regex]::Replace(
  $content,
  $pattern,
  $replacement,
  1
)

[System.IO.File]::WriteAllText(
  $path,
  $content,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "Module clients remplace par createBusinessModule."