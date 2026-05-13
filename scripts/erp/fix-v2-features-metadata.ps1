$ErrorActionPreference = "Stop"

$Path = "C:\Users\Admin\terragest\src\runtime\modules\v2\terragestBusinessModelV2.ts"

$content = [System.IO.File]::ReadAllText($Path)

$content = $content -replace `
'(?s),\s*features:\s*\{(.*?)\}\s*(?=,\s*\{|\s*\])', `
',
    metadata: {
      features: {
$1
      }
    }'

[System.IO.File]::WriteAllText(
  $Path,
  $content,
  [System.Text.Encoding]::UTF8
)

Write-Host "OK - features deplace dans metadata" -ForegroundColor Green