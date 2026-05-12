$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"
$corePath = Join-Path $root "src\runtime\modules\definitions\coreModules.ts"
$core = [System.IO.File]::ReadAllText($corePath)

function Write-Utf8File {
  param(
    [string]$Path,
    [string]$Content
  )

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )
}

$missingModules = @(
  @{
    Key = "intrants"
    Label = "Intrants"
    Fields = "intrantFields"
  },
  @{
    Key = "incidents"
    Label = "Incidents"
    Fields = "incidentFields"
  }
)

foreach ($module in $missingModules) {
  $key = $module.Key
  $label = $module.Label
  $fields = $module.Fields

  if ($core -match "key:\s*`"$key`"") {
    Write-Host "SKIP already exists : $key" -ForegroundColor Yellow
    continue
  }

  $block = @"
  createBusinessModule({
    key: "$key",
    label: "$label",
    fields: $fields,
  }),

"@

  $core = $core -replace "\];\s*$", "$block];"

  Write-Host "ADDED : $key" -ForegroundColor Green
}

Write-Utf8File -Path $corePath -Content $core

Write-Host ""
Write-Host "Missing modules fixed" -ForegroundColor Green
Write-Host "Next: pnpm build" -ForegroundColor Cyan