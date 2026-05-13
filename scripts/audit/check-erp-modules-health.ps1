$ErrorActionPreference = "Stop"

$Root = (Get-Location).Path
$OutDir = Join-Path $Root "docs\audit"
$OutFile = Join-Path $OutDir "ERP_MODULES_HEALTH.md"
$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)

if (-not (Test-Path $OutDir)) {
  New-Item -ItemType Directory -Path $OutDir -Force | Out-Null
}

$lines = @()

function Add-Line {
  param([string]$Text = "")
  $script:lines += $Text
}

function Test-FileContains {
  param(
    [string]$Path,
    [string]$Pattern
  )

  if (-not (Test-Path $Path)) {
    return $false
  }

  $content = [System.IO.File]::ReadAllText($Path)
  return $content.Contains($Pattern)
}

$coreModulesPath = Join-Path $Root "src\runtime\modules\definitions\coreModules.ts"
$appPrivatePath = Join-Path $Root "src\app\(private)"

$businessModulesFile = Join-Path $Root "scripts\erp\erp-business-modules.json"

if (-not (Test-Path $businessModulesFile)) {
  throw "erp-business-modules.json introuvable"
}

$modules = Get-Content $businessModulesFile |
  ConvertFrom-Json |
  Sort-Object

Add-Line "# TERRAGEST_V2 - CONTROLE SANTE MODULES ERP"
Add-Line ""
Add-Line "Date: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Add-Line ""
Add-Line "Modules detectes dans src/app/(private): $($modules.Count)"
Add-Line ""

foreach ($module in $modules) {
  Add-Line "## $module"
  Add-Line ""

  $base = Join-Path $appPrivatePath $module

  $checks = @(
    @{
      Name = "Route liste"
      Path = Join-Path $base "page.tsx"
      Token = "moduleKey=`"$module`""
    },
    @{
      Name = "Route creation"
      Path = Join-Path $base "nouveau\page.tsx"
      Token = "moduleKey=`"$module`""
    },
    @{
      Name = "Route detail"
      Path = Join-Path $base "[id]\page.tsx"
      Token = "moduleKey=`"$module`""
    },
    @{
      Name = "Route edition"
      Path = Join-Path $base "[id]\edit\page.tsx"
      Token = "moduleKey=`"$module`""
    },
    @{
      Name = "Route audit"
      Path = Join-Path $base "audit\page.tsx"
      Token = "ERPModuleActionPageTemplate"
    },
    @{
      Name = "Route export"
      Path = Join-Path $base "export\page.tsx"
      Token = "ERPModuleActionPageTemplate"
    },
    @{
      Name = "Route import"
      Path = Join-Path $base "import\page.tsx"
      Token = "ERPModuleActionPageTemplate"
    },
    @{
      Name = "Route relations"
      Path = Join-Path $base "relations\page.tsx"
      Token = "ERPModuleActionPageTemplate"
    },
    @{
      Name = "Route workflows"
      Path = Join-Path $base "workflows\page.tsx"
      Token = "ERPModuleActionPageTemplate"
    }
  )

  foreach ($check in $checks) {
    $exists = Test-Path $check.Path
    $contains = Test-FileContains -Path $check.Path -Pattern $check.Token

    if ($exists -and $contains) {
      Add-Line "- OK - $($check.Name)"
    } elseif ($exists) {
      Add-Line "- WARN - $($check.Name) existe mais contenu non conforme"
    } else {
      Add-Line "- MISSING - $($check.Name)"
    }
  }

  $declared = Test-FileContains -Path $coreModulesPath -Pattern "key: `"$module`""

  if ($declared) {
    Add-Line "- OK - module declare dans coreModules.ts"
  } else {
    Add-Line "- WARN - module absent de coreModules.ts"
  }

  Add-Line ""
}

Add-Line "## Recherche anciens patterns interdits"
Add-Line ""

$tsxFiles = Get-ChildItem $appPrivatePath -Recurse -File -Filter "*.tsx" -ErrorAction SilentlyContinue

$legacyPatterns = @(
  "coreERPModules.find",
  "module={module}",
  "module={erpModule}",
  "module={"
)

foreach ($pattern in $legacyPatterns) {
  $matches = $tsxFiles | Select-String `
    -Pattern $pattern `
    -SimpleMatch `
    -ErrorAction SilentlyContinue

  if ($matches.Count -eq 0) {
    Add-Line "- OK - aucun pattern interdit: $pattern"
  } else {
    Add-Line "- WARN - pattern trouve: $pattern - $($matches.Count)"
    foreach ($m in $matches) {
      $rel = $m.Path.Replace($Root, ".")
      Add-Line ("  - {0}:{1} - {2}" -f $rel, $m.LineNumber, $m.Line.Trim())
    }
  }
}

[System.IO.File]::WriteAllText(
  $OutFile,
  ($lines -join [Environment]::NewLine),
  $Utf8NoBom
)

Write-Host "AUDIT GENERATED: $OutFile"