$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
Set-Location -LiteralPath $ProjectRoot

$files = @(
  "src\components\erp\templates\ERPPageTemplateRegistry.tsx"
)

foreach ($file in $files) {
  $path = Join-Path $ProjectRoot $file
  $content = Get-Content -LiteralPath $path -Raw

  $content = $content -replace '\| "detail"', '| "detail"`r`n  | "details"'

  if ($content -notmatch 'details: GenericERPTemplate') {
    $content = $content -replace 'detail: GenericERPTemplate,', "detail: GenericERPTemplate,`r`n  details: GenericERPTemplate,"
  }

  [System.IO.File]::WriteAllText(
    $path,
    $content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "PATCHED: $file" -ForegroundColor Green
}

Write-Host "Relance : pnpm build" -ForegroundColor Yellow