$ErrorActionPreference = "Stop"

$Root = (Get-Location).Path
$GeneratedDir = Join-Path $Root "src\runtime\modules\definitions\generated"
$OutFile = Join-Path $GeneratedDir "generatedModules.ts"
$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)

if (-not (Test-Path $GeneratedDir)) {
  throw "Dossier introuvable: $GeneratedDir"
}

$files = Get-ChildItem $GeneratedDir -File -Filter "*.module.ts" |
  Sort-Object Name

$lines = @()

$lines += 'import type { ERPModule } from "../../ERPModule";'
$lines += ""

foreach ($file in $files) {
  $base = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
  $moduleKey = $base.Replace(".module", "")
  $pascal = (($moduleKey -split "[-_]") | ForEach-Object {
    $_.Substring(0,1).ToUpper() + $_.Substring(1).ToLower()
  }) -join ""
  $camel = $pascal.Substring(0,1).ToLower() + $pascal.Substring(1)

  $lines += "import { $camel`Module } from `"./$base`";"
}

$lines += ""
$lines += "export const generatedERPModules: ERPModule[] = ["

foreach ($file in $files) {
  $base = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
  $moduleKey = $base.Replace(".module", "")
  $pascal = (($moduleKey -split "[-_]") | ForEach-Object {
    $_.Substring(0,1).ToUpper() + $_.Substring(1).ToLower()
  }) -join ""
  $camel = $pascal.Substring(0,1).ToLower() + $pascal.Substring(1)

  $lines += "  $camel`Module,"
}

$lines += "];"

[System.IO.File]::WriteAllText(
  $OutFile,
  ($lines -join [Environment]::NewLine),
  $Utf8NoBom
)

Write-Host "WRITTEN $OutFile"