$ErrorActionPreference = "Stop"

$Root = (Get-Location).Path
$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)

function Ensure-Dir {
  param([string]$Path)

  if ($Path -and -not (Test-Path $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Write-Utf8NoBom {
  param(
    [string]$Path,
    [string]$Content
  )

  Ensure-Dir (Split-Path $Path -Parent)
  [System.IO.File]::WriteAllText($Path, $Content, $Utf8NoBom)
  Write-Host "WRITTEN $Path"
}

$ErpDir = Join-Path $Root "scripts\erp"
$TemplatesDir = Join-Path $ErpDir "templates"

Ensure-Dir $TemplatesDir

Write-Utf8NoBom `
  -Path (Join-Path $TemplatesDir "module-definition.ts.tpl") `
  -Content @'
import type { ERPModule } from "../ERPModule";

export const {{CamelName}}Module: ERPModule = {
  metadata: {
    key: "{{ModuleKey}}",
    label: "{{Label}}",
    description: "{{Description}}",
    icon: "{{Icon}}",
    category: "{{Category}}",
    routes: {
      index: "/{{ModuleKey}}",
      create: "/{{ModuleKey}}/nouveau",
      detail: "/{{ModuleKey}}/[id]",
      edit: "/{{ModuleKey}}/[id]/edit",
      audit: "/{{ModuleKey}}/audit",
      import: "/{{ModuleKey}}/import",
      export: "/{{ModuleKey}}/export",
      relations: "/{{ModuleKey}}/relations",
      workflows: "/{{ModuleKey}}/workflows",
    },
  },

  schema: {
    collection: "{{Collection}}",
    fields: [
      {
        key: "nom",
        label: "Nom",
        type: "text",
        required: true,
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        options: [
          { label: "Actif", value: "actif" },
          { label: "Inactif", value: "inactif" },
        ],
        required: true,
      },
    ],
  },

  features: {
    dashboard: true,
    analytics: true,
    workflows: true,
    audit: true,
    realtime: true,
    automation: true,
    notifications: true,
  },
};
'@

$NewGenerator = Join-Path $ErpDir "new-erp-module.ps1"

$content = [System.IO.File]::ReadAllText($NewGenerator)

$content = $content.Replace(
'  [string]$Label = "",

  [switch]$Force',
'  [string]$Label = "",

  [string]$Description = "",

  [string]$Category = "Métier",

  [string]$Collection = "",

  [string]$Icon = "database",

  [switch]$GenerateDefinition,

  [switch]$Force'
)

$content = $content.Replace(
'$PascalName = Convert-ToPascalCase $ModuleKey
$Base = Join-Path $Root "src\app\(private)\$ModuleKey"',
'$PascalName = Convert-ToPascalCase $ModuleKey
$CamelName = $PascalName.Substring(0, 1).ToLower() + $PascalName.Substring(1)

if ([string]::IsNullOrWhiteSpace($Label)) {
  $Label = $PascalName
}

if ([string]::IsNullOrWhiteSpace($Description)) {
  $Description = "Module ERP généré pour $Label."
}

if ([string]::IsNullOrWhiteSpace($Collection)) {
  $Collection = $ModuleKey
}

$Base = Join-Path $Root "src\app\(private)\$ModuleKey"'
)

$content = $content.Replace(
'$tokens = @{
  ModuleKey = $ModuleKey
  PascalName = $PascalName
  Label = $Label
}',
'$tokens = @{
  ModuleKey = $ModuleKey
  PascalName = $PascalName
  CamelName = $CamelName
  Label = $Label
  Description = $Description
  Category = $Category
  Collection = $Collection
  Icon = $Icon
}'
)

$content = $content.Replace(
'Write-Host ""
Write-Host "OK ERP MODULE ROUTES GENERATED: $ModuleKey"
Write-Host "NEXT: verify module definition exists in coreModules.ts"',
'if ($GenerateDefinition) {
  $definitionOutputDir = Join-Path $Root "src\runtime\modules\definitions\generated"
  $definitionOutput = Join-Path $definitionOutputDir "$ModuleKey.module.ts"

  $definitionContent = Expand-Template `
    -TemplatePath (Join-Path $TemplatesDir "module-definition.ts.tpl") `
    -Tokens $tokens

  Write-GeneratedFile `
    -Path $definitionOutput `
    -Content $definitionContent `
    -Force:$Force
}

Write-Host ""
Write-Host "OK ERP MODULE GENERATED: $ModuleKey"
Write-Host "NEXT: manually review generated definition before registering it in coreModules.ts"'
)

Write-Utf8NoBom -Path $NewGenerator -Content $content

Write-Host ""
Write-Host "OK ERP MODULE GENERATOR V2 INSTALLED"