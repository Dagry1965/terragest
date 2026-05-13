$ErrorActionPreference = "Stop"

$Root = (Get-Location).Path
$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)

function Ensure-Dir {
  param([string]$Path)

  if (-not (Test-Path $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
    Write-Host "DIR $Path"
  }
}

function Write-Utf8NoBom {
  param(
    [string]$Path,
    [string]$Content
  )

  $dir = Split-Path $Path -Parent
  Ensure-Dir $dir

  [System.IO.File]::WriteAllText($Path, $Content, $Utf8NoBom)
  Write-Host "WRITTEN $Path"
}

$ErpDir = Join-Path $Root "scripts\erp"
$TemplatesDir = Join-Path $ErpDir "templates"
$SharedDir = Join-Path $ErpDir "shared"

Ensure-Dir $TemplatesDir
Ensure-Dir $SharedDir

Write-Utf8NoBom `
  -Path (Join-Path $SharedDir "filesystem.ps1") `
  -Content @'
function Ensure-Dir {
  param([string]$Path)

  if (-not (Test-Path $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Write-Utf8NoBom {
  param(
    [string]$Path,
    [string]$Content
  )

  $dir = Split-Path $Path -Parent

  if ($dir -and -not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}

function Write-GeneratedFile {
  param(
    [string]$Path,
    [string]$Content,
    [switch]$Force
  )

  if ((Test-Path $Path) -and -not $Force) {
    Write-Host "SKIPPED $Path"
    return
  }

  if (Test-Path $Path) {
    Copy-Item $Path "$Path.bak" -Force
    Write-Host "BACKUP $Path.bak"
  }

  Write-Utf8NoBom -Path $Path -Content $Content
  Write-Host "WRITTEN $Path"
}
'@

Write-Utf8NoBom `
  -Path (Join-Path $SharedDir "naming.ps1") `
  -Content @'
function Convert-ToPascalCase {
  param([string]$Value)

  return (($Value -split "[-_\s]") | ForEach-Object {
    if ($_.Length -eq 0) {
      ""
    } else {
      $_.Substring(0, 1).ToUpper() + $_.Substring(1).ToLower()
    }
  }) -join ""
}

function Assert-ModuleKey {
  param([string]$ModuleKey)

  if ([string]::IsNullOrWhiteSpace($ModuleKey)) {
    throw "ModuleKey obligatoire."
  }

  if ($ModuleKey -notmatch "^[a-z0-9-]+$") {
    throw "ModuleKey invalide. Utilise uniquement minuscules, chiffres et tirets. Exemple: contrats-fonciers"
  }
}
'@

Write-Utf8NoBom `
  -Path (Join-Path $SharedDir "template-engine.ps1") `
  -Content @'
function Expand-Template {
  param(
    [string]$TemplatePath,
    [hashtable]$Tokens
  )

  if (-not (Test-Path $TemplatePath)) {
    throw "Template introuvable: $TemplatePath"
  }

  $content = [System.IO.File]::ReadAllText($TemplatePath)

  foreach ($key in $Tokens.Keys) {
    $content = $content.Replace("{{$key}}", [string]$Tokens[$key])
  }

  return $content
}
'@

Write-Utf8NoBom `
  -Path (Join-Path $TemplatesDir "route-list.tsx.tpl") `
  -Content @'
import { GenericListPage } from "@/components/erp/generic/GenericListPage";

export const dynamic = "force-dynamic";

export default function {{PascalName}}Page() {
  return <GenericListPage moduleKey="{{ModuleKey}}" />;
}
'@

Write-Utf8NoBom `
  -Path (Join-Path $TemplatesDir "route-create.tsx.tpl") `
  -Content @'
import { GenericCreatePage } from "@/components/erp/generic/GenericCreatePage";

export const dynamic = "force-dynamic";

export default function New{{PascalName}}Page() {
  return <GenericCreatePage moduleKey="{{ModuleKey}}" />;
}
'@

Write-Utf8NoBom `
  -Path (Join-Path $TemplatesDir "route-detail.tsx.tpl") `
  -Content @'
import { GenericDetailPage } from "@/components/erp/generic/GenericDetailPage";

export const dynamic = "force-dynamic";

export default async function {{PascalName}}DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <GenericDetailPage moduleKey="{{ModuleKey}}" id={id} />;
}
'@

Write-Utf8NoBom `
  -Path (Join-Path $TemplatesDir "route-edit.tsx.tpl") `
  -Content @'
import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";

export const dynamic = "force-dynamic";

export default async function Edit{{PascalName}}Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <GenericEditPage moduleKey="{{ModuleKey}}" id={id} />;
}
'@

Write-Utf8NoBom `
  -Path (Join-Path $TemplatesDir "route-action.tsx.tpl") `
  -Content @'
import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function {{PascalName}}{{ActionPascal}}Page() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="{{ModuleKey}}"
      action="{{ActionKey}}"
    />
  );
}
'@

Write-Utf8NoBom `
  -Path (Join-Path $ErpDir "new-erp-module.ps1") `
  -Content @'
param(
  [Parameter(Mandatory = $true)]
  [string]$ModuleKey,

  [string]$Label = "",

  [switch]$Force
)

$ErrorActionPreference = "Stop"

$Root = (Get-Location).Path
$ScriptDir = Split-Path $MyInvocation.MyCommand.Path -Parent

. (Join-Path $ScriptDir "shared\filesystem.ps1")
. (Join-Path $ScriptDir "shared\naming.ps1")
. (Join-Path $ScriptDir "shared\template-engine.ps1")

Assert-ModuleKey $ModuleKey

$PascalName = Convert-ToPascalCase $ModuleKey
$Base = Join-Path $Root "src\app\(private)\$ModuleKey"
$TemplatesDir = Join-Path $ScriptDir "templates"

$tokens = @{
  ModuleKey = $ModuleKey
  PascalName = $PascalName
  Label = $Label
}

$routes = @(
  @{
    Template = "route-list.tsx.tpl"
    Output = "page.tsx"
  },
  @{
    Template = "route-create.tsx.tpl"
    Output = "nouveau\page.tsx"
  },
  @{
    Template = "route-detail.tsx.tpl"
    Output = "[id]\page.tsx"
  },
  @{
    Template = "route-edit.tsx.tpl"
    Output = "[id]\edit\page.tsx"
  }
)

foreach ($route in $routes) {
  $content = Expand-Template `
    -TemplatePath (Join-Path $TemplatesDir $route.Template) `
    -Tokens $tokens

  Write-GeneratedFile `
    -Path (Join-Path $Base $route.Output) `
    -Content $content `
    -Force:$Force
}

$actions = @(
  "audit",
  "export",
  "import",
  "relations",
  "workflows"
)

foreach ($action in $actions) {
  $actionTokens = @{
    ModuleKey = $ModuleKey
    PascalName = $PascalName
    Label = $Label
    ActionKey = $action
    ActionPascal = Convert-ToPascalCase $action
  }

  $content = Expand-Template `
    -TemplatePath (Join-Path $TemplatesDir "route-action.tsx.tpl") `
    -Tokens $actionTokens

  Write-GeneratedFile `
    -Path (Join-Path $Base "$action\page.tsx") `
    -Content $content `
    -Force:$Force
}

Write-Host ""
Write-Host "OK ERP MODULE ROUTES GENERATED: $ModuleKey"
Write-Host "NEXT: verify module definition exists in coreModules.ts"
'@

Write-Host ""
Write-Host "OK ERP MODULE GENERATOR V1 INSTALLED"
Write-Host "Run:"
Write-Host '.\scripts\erp\new-erp-module.ps1 -ModuleKey "terrains"'
