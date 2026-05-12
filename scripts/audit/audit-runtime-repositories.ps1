$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

$src =
  Join-Path $root "src"

$outDir =
  Join-Path $root "docs\audit"

$outFile =
  Join-Path $outDir "RUNTIME_REPOSITORY_AUDIT.md"

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

function Scan-Pattern {

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

Add-Line "# TERRAGEST ERP REPOSITORY CONSOLIDATION AUDIT"
Add-Line ""
Add-Line "Date : $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

# ----------------------------------------------------------
# CORE RUNTIME
# ----------------------------------------------------------

Add-Section "CORE RUNTIME REPOSITORIES"

Scan-Pattern `
  -Title "RuntimeRepository" `
  -Pattern "RuntimeRepository"

Scan-Pattern `
  -Title "FirestoreRuntimeRepository" `
  -Pattern "FirestoreRuntimeRepository"

Scan-Pattern `
  -Title "RuntimeDataBinding" `
  -Pattern "RuntimeDataBinding"

# ----------------------------------------------------------
# LEGACY REPOSITORIES
# ----------------------------------------------------------

Add-Section "LEGACY REPOSITORIES"

Scan-Pattern `
  -Title "Repository.ts files" `
  -Pattern "Repository"

Scan-Pattern `
  -Title "Firestore repositories" `
  -Pattern "Firestore"

Scan-Pattern `
  -Title "BaseRepository" `
  -Pattern "BaseRepository"

# ----------------------------------------------------------
# DIRECT FIRESTORE ACCESS
# ----------------------------------------------------------

Add-Section "DIRECT FIRESTORE ACCESS"

Scan-Pattern `
  -Title "collection(" `
  -Pattern "collection("

Scan-Pattern `
  -Title "doc(" `
  -Pattern "doc("

Scan-Pattern `
  -Title "query(" `
  -Pattern "query("

Scan-Pattern `
  -Title "onSnapshot(" `
  -Pattern "onSnapshot("

# ----------------------------------------------------------
# FEATURE ARCHITECTURE
# ----------------------------------------------------------

Add-Section "FEATURE PERSISTENCE"

Scan-Pattern `
  -Title "services/" `
  -Pattern "Service"

Scan-Pattern `
  -Title "repositories/" `
  -Pattern "repositories"

Scan-Pattern `
  -Title "hooks/" `
  -Pattern "use"

# ----------------------------------------------------------
# QUARANTINE
# ----------------------------------------------------------

Add-Section "QUARANTINE"

Scan-Pattern `
  -Title "_quarantine" `
  -Pattern "_quarantine"

# ----------------------------------------------------------
# TARGET CONSOLIDATION
# ----------------------------------------------------------

Add-Section "TARGET ARCHITECTURE"

Add-Line '```txt'
Add-Line 'UI'
Add-Line '→ RuntimeDataBinding'
Add-Line '→ RuntimeRepository'
Add-Line '→ FirestoreRuntimeRepository'
Add-Line '→ Firestore'
Add-Line '```'

# ----------------------------------------------------------
# FINAL ANALYSIS
# ----------------------------------------------------------

Add-Section "FINAL ANALYSIS"

Add-Line "- Runtime repository maturity :"
Add-Line "- Repository duplication level :"
Add-Line "- Firestore fragmentation level :"
Add-Line "- Legacy persistence risk :"
Add-Line "- Recommended consolidation priority :"
Add-Line "- Runtime repository convergence readiness :"

# ----------------------------------------------------------
# DONE
# ----------------------------------------------------------

Write-Host ""
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host " ERP REPOSITORY AUDIT COMPLETE" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host $outFile -ForegroundColor Yellow
Write-Host ""

Write-Host "COMMANDES :" -ForegroundColor Cyan
Write-Host ""
Write-Host "notepad .\docs\audit\RUNTIME_REPOSITORY_AUDIT.md"
Write-Host ""