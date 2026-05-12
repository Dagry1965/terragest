$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"
$src = Join-Path $root "src"
$outDir = Join-Path $root "docs\audit"
$outFile = Join-Path $outDir "RUNTIME_REALTIME_AUDIT.md"

New-Item -ItemType Directory -Path $outDir -Force | Out-Null

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

function Add-Search {
  param(
    [string]$Title,
    [string]$Pattern
  )

  Add-Line ""
  Add-Line "## $Title"
  Add-Line ""
  Add-Line '```txt'

  $results = Get-ChildItem $src -Recurse -File |
    Where-Object { $_.Extension -in ".ts", ".tsx" } |
    Select-String -Pattern $Pattern -SimpleMatch

  foreach ($r in $results) {
    Add-Line "$($r.Path):$($r.LineNumber) $($r.Line.Trim())"
  }

  Add-Line '```'
  return $results.Count
}

Add-Line "# TERRAGEST ERP RUNTIME REALTIME AUDIT"
Add-Line ""
Add-Line "Date : $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Add-Line ""

$countSnapshot = Add-Search "onSnapshot usages" "onSnapshot"
$countSubscribe = Add-Search "subscribeTo usages" "subscribeTo"
$countRealtimeCollection = Add-Search "useRealtimeCollection usages" "useRealtimeCollection"
$countRealtime = Add-Search "Realtime references" "Realtime"
$countFirestoreRealtime = Add-Search "FirestoreRuntimeRealtime" "FirestoreRuntimeRealtime"
$countRuntimeRealtime = Add-Search "Runtime realtime components" "RuntimeRealtime"

Add-Line ""
Add-Line "# Résumé"
Add-Line ""
Add-Line "- onSnapshot : $countSnapshot"
Add-Line "- subscribeTo : $countSubscribe"
Add-Line "- useRealtimeCollection : $countRealtimeCollection"
Add-Line "- Realtime references : $countRealtime"
Add-Line "- FirestoreRuntimeRealtime : $countFirestoreRealtime"
Add-Line "- RuntimeRealtime : $countRuntimeRealtime"
Add-Line ""

Add-Line "# Cible"
Add-Line ""
Add-Line '```txt'
Add-Line "UI"
Add-Line "→ RuntimeRealtimeEngine"
Add-Line "→ FirestoreRuntimeRealtime"
Add-Line "→ Firestore onSnapshot"
Add-Line '```'

Write-Host ""
Write-Host "RUNTIME REALTIME AUDIT COMPLETE" -ForegroundColor Green
Write-Host $outFile -ForegroundColor Yellow
Write-Host ""