param(
  [Parameter(Mandatory = $true)]
  [string]$Module
)

$ErrorActionPreference = "Stop"

$RootPath =
  Split-Path -Parent $PSScriptRoot |
  Split-Path -Parent

function Ensure-DirectoryExists {
  param(
    [string]$Path
  )

  if (-not (Test-Path $Path)) {
    New-Item `
      -ItemType Directory `
      -Path $Path `
      -Force | Out-Null

    Write-Host "CREATED DIR $Path"
  }
}

function Write-Utf8File {
  param(
    [string]$Path,
    [string]$Content
  )

  $Dir = Split-Path $Path -Parent

  Ensure-DirectoryExists $Dir

  $Utf8NoBom =
    New-Object System.Text.UTF8Encoding($false)

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    $Utf8NoBom
  )

  Write-Host "GENERATED $Path"
}

function To-PascalCase {
  param([string]$Text)

  return (
    $Text.Substring(0,1).ToUpper() +
    $Text.Substring(1).ToLower()
  )
}

$ModuleLower =
  $Module.ToLower()

$ModulePascal =
  To-PascalCase $Module

Write-Host ""
Write-Host "================================="
Write-Host " TERRAGEST ERP GENERATOR"
Write-Host "================================="
Write-Host ""
Write-Host "MODULE : $ModuleLower"
Write-Host ""

$TemplatesPath =
  Join-Path $RootPath "templates\erp"

$AppPath =
  Join-Path `
    $RootPath `
    "src\app\(private)\$ModuleLower"

$RuntimeModulePath =
  Join-Path `
    $RootPath `
    "src\runtime\modules\generated\$ModuleLower"

Ensure-DirectoryExists $AppPath

Ensure-DirectoryExists `
  "$AppPath\nouveau"

Ensure-DirectoryExists `
  "$AppPath\[id]"

Ensure-DirectoryExists `
  "$AppPath\[id]\edit"

Ensure-DirectoryExists `
  $RuntimeModulePath

Write-Host ""
Write-Host "DIRECTORIES GENERATED"
Write-Host ""

function Load-Template {
  param(
    [string]$Path
  )

  return [System.IO.File]::ReadAllText($Path)
}

function Apply-Template {
  param(
    [string]$Template
  )

  $Result = $Template

  $Result =
    $Result.Replace(
      "__module__",
      $ModuleLower
    )

  $Result =
    $Result.Replace(
      "__PascalModule__",
      $ModulePascal
    )

  $Result =
    $Result.Replace(
      "__camelModule__",
$ModuleLower
    )

  $Result =
    $Result.Replace(
      "__LabelModule__",
      $ModulePascal
    )

  return $Result
}

Write-Host ""
Write-Host "GENERATING FILES"
Write-Host ""

$ListTemplate =
  Load-Template `
    "$TemplatesPath\routes\list.page.template.tsx"

$CreateTemplate =
  Load-Template `
    "$TemplatesPath\routes\create.page.template.tsx"

$DetailTemplate =
  Load-Template `
    "$TemplatesPath\routes\detail.page.template.tsx"

$EditTemplate =
  Load-Template `
    "$TemplatesPath\routes\edit.page.template.tsx"

$ModuleTemplate =
  Load-Template `
    "$TemplatesPath\module\module.definition.template.ts"

Write-Utf8File `
  "$AppPath\page.tsx" `
  (Apply-Template $ListTemplate)

Write-Utf8File `
  "$AppPath\nouveau\page.tsx" `
  (Apply-Template $CreateTemplate)

Write-Utf8File `
  "$AppPath\[id]\page.tsx" `
  (Apply-Template $DetailTemplate)

Write-Utf8File `
  "$AppPath\[id]\edit\page.tsx" `
  (Apply-Template $EditTemplate)

Write-Utf8File `
  "$RuntimeModulePath\$ModuleLower.module.ts" `
  (Apply-Template $ModuleTemplate)

$SecondaryRoutes = @(
  "audit",
  "export",
  "import",
  "relations",
  "workflows",
  "dashboard",
  "analytics"
)

foreach ($Route in $SecondaryRoutes) {
  $RoutePascal =
    To-PascalCase $Route

  $RoutePath =
    Join-Path $AppPath $Route

  Ensure-DirectoryExists $RoutePath

  $PageContent = @"
import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function ${ModulePascal}${RoutePascal}Page() {
  return (
    <ERPModuleActionPageTemplate
      module="$ModuleLower"
      type="$Route"
      actionLabel="$RoutePascal"
    />
  );
}
"@

  Write-Utf8File `
    (Join-Path $RoutePath "page.tsx") `
    $PageContent
}


Write-Host ""
Write-Host "================================="
Write-Host " ERP MODULE GENERATED"
Write-Host "================================="
Write-Host ""
Write-Host "MODULE : $ModuleLower"
Write-Host ""
$coreModulesPath =
  Join-Path $RootPath `
  "src\runtime\modules\definitions\coreModules.ts"

$coreModulesContent =
  [System.IO.File]::ReadAllText(
    $coreModulesPath
  )

$importLine =
  "import { ${ModuleLower}Module } from `"@/runtime/modules/generated/$ModuleLower/$ModuleLower.module`";"

if ($coreModulesContent -notmatch [regex]::Escape($importLine)) {
  $coreModulesContent =
    $importLine +
    "`r`n" +
    $coreModulesContent
}

$coreModulesContent =
  $coreModulesContent.Replace(
    "export const coreERPModules: ERPModule[] = [",
    "export const coreERPModules: ERPModule[] = [`r`n  ${ModuleLower}Module,"
  )

[System.IO.File]::WriteAllText(
  $coreModulesPath,
  $coreModulesContent,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host ""
Write-Host "MODULE REGISTERED IN CORE MODULES"
Write-Host ""