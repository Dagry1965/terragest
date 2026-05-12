$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"
$fieldsPath = Join-Path $root "src\runtime\modules\factory\businessFields.ts"

$fields = [System.IO.File]::ReadAllText($fieldsPath)

Write-Host ""
Write-Host "BUSINESS FIELDS QUALITY AUDIT" -ForegroundColor Cyan
Write-Host ""

$matches = [regex]::Matches(
  $fields,
  'export const\s+([a-zA-Z0-9_]+Fields)\s*=\s*\[(.*?)\];',
  [System.Text.RegularExpressions.RegexOptions]::Singleline
)

foreach ($m in $matches) {
  $name = $m.Groups[1].Value
  $body = $m.Groups[2].Value
  $fieldCount = ([regex]::Matches($body, 'key:\s*"')).Count

  if ($fieldCount -le 3) {
    Write-Host "FAIBLE : $name => $fieldCount champs" -ForegroundColor Yellow
  } else {
    Write-Host "OK : $name => $fieldCount champs" -ForegroundColor Green
  }
}