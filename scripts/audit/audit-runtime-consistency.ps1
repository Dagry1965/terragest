$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

$src =
  Join-Path $root "src"

$outDir =
  Join-Path $root "docs\audit"

$outFile =
  Join-Path $outDir "RUNTIME_CONSISTENCY_AUDIT.md"

if (!(Test-Path $outDir)) {

  New-Item `
    -ItemType Directory `
    -Path $outDir `
    -Force | Out-Null
}

if (Test-Path $outFile) {
  Remove-Item $outFile -Force
}

# ----------------------------------------------------------
# HELPERS
# ----------------------------------------------------------

function Add-Line {

  param([string]$Text = "")

  [System.IO.File]::AppendAllText(
    $outFile,
    $Text + [Environment]::NewLine,
    [System.Text.UTF8Encoding]::new($false)
  )
}

function Add-Section {

  param([string]$Title)

  Add-Line ""
  Add-Line "# $Title"
  Add-Line ""
}

function Add-SearchResults {

  param(
    [string]$Title,
    [string]$Pattern
  )

  Add-Line ""
  Add-Line "## $Title"
  Add-Line ""
  Add-Line '```txt'

  $results =
    Get-ChildItem `
      $src `
      -Recurse `
      -File |
    Where-Object {
      $_.Extension -in ".ts", ".tsx"
    } |
    Select-String `
      -Pattern $Pattern `
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
# HEADER
# ----------------------------------------------------------

Add-Line "# TERRAGEST ERP RUNTIME CONSISTENCY AUDIT"
Add-Line ""
Add-Line "Date : $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

# ----------------------------------------------------------
# MODULE NORMALIZATION
# ----------------------------------------------------------

Add-Section "MODULE NORMALIZATION"

$coreModules =
  Join-Path `
    $src `
    "runtime\modules\definitions\coreModules.ts"

if (Test-Path $coreModules) {

  $core =
    [System.IO.File]::ReadAllText($coreModules)

  $normalized =
    ([regex]::Matches(
      $core,
      'createBusinessModule'
    )).Count

  $legacy =
    ([regex]::Matches(
      $core,
      'metadata:\s*\{'
    )).Count

  Add-Line "- Normalized modules : $normalized"
  Add-Line "- Legacy modules : $legacy"
}

# ----------------------------------------------------------
# RELATION SYSTEM
# ----------------------------------------------------------

Add-Section "RELATION SYSTEM"

$structuredRelations =
  Get-ChildItem `
    $src `
    -Recurse `
    -File |
  Where-Object {
    $_.Extension -in ".ts", ".tsx"
  } |
  Select-String `
    -Pattern 'relation: {' `
    -SimpleMatch

$legacyRelations =
  Get-ChildItem `
    $src `
    -Recurse `
    -File |
  Where-Object {
    $_.Extension -in ".ts", ".tsx"
  } |
  Select-String `
    -Pattern 'relation: "' `
    -SimpleMatch

Add-Line "- Structured relations : $($structuredRelations.Count)"
Add-Line "- Legacy relations : $($legacyRelations.Count)"

# ----------------------------------------------------------
# DUPLICATION
# ----------------------------------------------------------

Add-Section "DUPLICATION"

Add-SearchResults `
  -Title "Old CRUD patterns" `
  -Pattern "useState([])"

Add-SearchResults `
  -Title "Manual fetch logic" `
  -Pattern "collection("

Add-SearchResults `
  -Title "Legacy forms" `
  -Pattern "<form"

Add-SearchResults `
  -Title "Legacy relation format" `
  -Pattern 'relation: "'

# ----------------------------------------------------------
# RUNTIME ENGINES
# ----------------------------------------------------------

Add-Section "RUNTIME ENGINES"

Add-SearchResults `
  -Title "ERP runtime engines" `
  -Pattern "Runtime"

Add-SearchResults `
  -Title "Workflow engines" `
  -Pattern "Workflow"

Add-SearchResults `
  -Title "Automation engines" `
  -Pattern "Automation"

Add-SearchResults `
  -Title "Observability engines" `
  -Pattern "Observability"

Add-SearchResults `
  -Title "AI engines" `
  -Pattern "AI"

# ----------------------------------------------------------
# MODULE FACTORIES
# ----------------------------------------------------------

Add-Section "MODULE FACTORIES"

Add-SearchResults `
  -Title "createBusinessModule usages" `
  -Pattern "createBusinessModule"

Add-SearchResults `
  -Title "businessFields usages" `
  -Pattern "Fields"

# ----------------------------------------------------------
# ARCHITECTURE RISKS
# ----------------------------------------------------------

Add-Section "ARCHITECTURE RISKS"

Add-SearchResults `
  -Title "Potential legacy module pages" `
  -Pattern "export default function"

Add-SearchResults `
  -Title "Potential duplicated loaders" `
  -Pattern "load("

Add-SearchResults `
  -Title "Potential duplicated repositories" `
  -Pattern "Repository"

# ----------------------------------------------------------
# FINAL ANALYSIS
# ----------------------------------------------------------

Add-Section "FINAL ANALYSIS"

Add-Line "- Runtime normalization status :"
Add-Line "- Runtime consistency status :"
Add-Line "- Remaining legacy patterns :"
Add-Line "- Remaining architectural risks :"
Add-Line "- Priority consolidations :"
Add-Line "- Runtime industrialization maturity :"

# ----------------------------------------------------------
# DONE
# ----------------------------------------------------------

Write-Host ""
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host " RUNTIME CONSISTENCY AUDIT COMPLETE" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host $outFile -ForegroundColor Yellow
Write-Host ""

Write-Host "Ouvrir :" -ForegroundColor Cyan
Write-Host "notepad .\docs\audit\RUNTIME_CONSISTENCY_AUDIT.md"
Write-Host ""