$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

$outDir =
  Join-Path $root "docs\audit"

$outFile =
  Join-Path $outDir "RUNTIME_RELATIONS_AUDIT.md"

if (!(Test-Path $outDir)) {

  New-Item `
    -ItemType Directory `
    -Path $outDir `
    -Force | Out-Null
}

if (Test-Path $outFile) {
  Remove-Item $outFile -Force
}

function Add-Line {

  param([string]$Text = "")

  [System.IO.File]::AppendAllText(
    $outFile,
    $Text + [Environment]::NewLine,
    [System.Text.UTF8Encoding]::new($false)
  )
}

function Add-File {

  param(
    [string]$Title,
    [string]$Path
  )

  Add-Line ""
  Add-Line "## $Title"
  Add-Line ""

  if (Test-Path $Path) {

    Add-Line '```ts'

    $content =
      [System.IO.File]::ReadAllText($Path)

    Add-Line $content

    Add-Line '```'
  }
  else {

    Add-Line "FILE NOT FOUND : $Path"
  }
}

Add-Line "# TERRAGEST ERP RELATION RUNTIME AUDIT"
Add-Line ""
Add-Line "Date : $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Add-Line ""

# ----------------------------------------------------------
# RELATION FILES
# ----------------------------------------------------------

Add-Line "# 1. RELATION ENGINES"

Add-File `
  "relation-engine.ts" `
  "$root\src\core\relations\relation-engine.ts"

Add-File `
  "ERPRelationField.tsx" `
  "$root\src\components\erp\relations\ERPRelationField.tsx"

Add-File `
  "ERPRelationsGraph.tsx" `
  "$root\src\components\erp\relations\ERPRelationsGraph.tsx"

Add-File `
  "RuntimeDataBinding.ts" `
  "$root\src\runtime\data-binding\RuntimeDataBinding.ts"

Add-File `
  "ERPRuntimeFieldValue.tsx" `
  "$root\src\components\erp\runtime\ERPRuntimeFieldValue.tsx"

# ----------------------------------------------------------
# RELATION SEARCH
# ----------------------------------------------------------

Add-Line ""
Add-Line "# 2. RELATION PATTERNS"

$patterns = @(

  "relation:",
  "labelField",
  "collection:",
  "module:",
  "ERPRelation",
  "Relation",
  "relations",
  "relation-engine",
  "relationField",
  "relation field"

)

foreach ($pattern in $patterns) {

  Add-Line ""
  Add-Line "## SEARCH : $pattern"
  Add-Line ""
  Add-Line '```txt'

  $results =
    Get-ChildItem `
      "$root\src" `
      -Recurse `
      -File |
    Where-Object {
      $_.Extension -in ".ts", ".tsx"
    } |
    Select-String `
      -Pattern $pattern `
      -SimpleMatch

  foreach ($r in $results) {

    Add-Line (
      "$($r.Path):" +
      "$($r.LineNumber) " +
      "$($r.Line.Trim())"
    )
  }

  Add-Line '```'
}

# ----------------------------------------------------------
# DETECT RELATION MODULES
# ----------------------------------------------------------

Add-Line ""
Add-Line "# 3. DETECTED RELATION MODULES"

$coreModulesPath =
  "$root\src\runtime\modules\definitions\coreModules.ts"

if (Test-Path $coreModulesPath) {

  $core =
    [System.IO.File]::ReadAllText($coreModulesPath)

  $matches =
    [regex]::Matches(
      $core,
      'relation:\s*\{[^}]*module:\s*"([^"]+)"'
    )

  $modules =
    $matches |
    ForEach-Object {
      $_.Groups[1].Value
    } |
    Sort-Object -Unique

  Add-Line ""

  foreach ($m in $modules) {

    Add-Line "- $m"
  }
}

# ----------------------------------------------------------
# ANALYSIS
# ----------------------------------------------------------

Add-Line ""
Add-Line "# 4. ANALYSIS"

Add-Line ""
Add-Line "- Existing relation engines :"
Add-Line "- Existing relation loaders :"
Add-Line "- Existing relation graphs :"
Add-Line "- Existing runtime relation components :"
Add-Line "- Relation duplication detected :"
Add-Line "- Missing runtime capabilities :"
Add-Line "- Should RuntimeRelationRegistry be created ?"

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " RELATION AUDIT COMPLETE" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host $outFile -ForegroundColor Yellow
Write-Host ""