param(
  [string]$Module
)

Write-Host ""
Write-Host "==============================="
Write-Host " DISABLE ERP MODULE"
Write-Host "==============================="
Write-Host ""

Write-Host "Module :" $Module
Write-Host ""

$path = "src/runtime/modules/definitions/coreModules.ts"

$content = Get-Content $path -Raw

$content = $content -replace 'enabled: true', 'enabled: false'
$content = $content -replace 'visible: true', 'visible: false'

Set-Content $path $content

Write-Host ""
Write-Host "Module disabled."
Write-Host ""