$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"
$src = Join-Path $root "src"
$outDir = Join-Path $root "docs\audit"
$outFile = Join-Path $outDir "REPOSITORY_GOVERNANCE_AUDIT.md"

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

Add-Line "# REPOSITORY GOVERNANCE AUDIT"
Add-Line ""
Add-Line "Date : $(Get-Date)"
Add-Line ""

$results = Get-ChildItem $src -Recurse -File |
  Where-Object { $_.Extension -in ".ts", ".tsx" } |
  Select-String -Pattern "collection(" -SimpleMatch

Add-Line "## collection() usages"
Add-Line ""
Add-Line "Count : $($results.Count)"
Add-Line ""

foreach ($r in $results) {
  Add-Line "$($r.Path):$($r.LineNumber) $($r.Line.Trim())"
}

Write-Host ""
Write-Host "AUDIT COMPLETE" -ForegroundColor Green
Write-Host $outFile -ForegroundColor Yellow
Write-Host ""