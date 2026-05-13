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