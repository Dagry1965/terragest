$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"
$outDir = Join-Path $root "docs\audit"
$outFile = Join-Path $outDir "production-hardening-audit.md"

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$patterns = @(
  "retry",
  "queue",
  "dead",
  "dlq",
  "throttle",
  "circuit",
  "tenant",
  "governance",
  "policy",
  "audit",
  "metrics",
  "trace",
  "observability",
  "health",
  "resilience",
  "security",
  "permission",
  "role",
  "feature flag",
  "worker",
  "scheduler",
  "monitoring",
  "alert",
  "log",
  "runtime"
)

$files = Get-ChildItem $root\src -Recurse -Include *.ts,*.tsx

$lines = @()
$lines += "# Terragest_V2 - Production Hardening Audit"
$lines += ""
$lines += "Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$lines += ""
$lines += "## Summary"
$lines += ""
$lines += "- Files scanned: $($files.Count)"
$lines += "- Patterns scanned: $($patterns.Count)"
$lines += ""

foreach ($pattern in $patterns) {
  $matches =
    $files |
    Select-String -SimpleMatch -Pattern $pattern

  $lines += "## Pattern: $pattern"
  $lines += ""
  $lines += "Matches: $($matches.Count)"
  $lines += ""

  foreach ($match in $matches) {
    $relative =
      $match.Path.Replace($root + "\", "")

    $lines += "- `$relative:$($match.LineNumber)` $($match.Line.Trim())"
  }

  $lines += ""
}

[System.IO.File]::WriteAllLines(
  $outFile,
  $lines,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "OK - audit generated:"
Write-Host $outFile