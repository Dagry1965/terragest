$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"
Set-Location $root

$mdPath = Join-Path $root "docs\audits\AMARKHYS-MAP-A-audit-conformite-cartographie-metier.md"
$outDir = Join-Path $root "docs\audits"

if (!(Test-Path $mdPath)) {
  throw "[MISSING] $mdPath"
}

[System.IO.Directory]::CreateDirectory($outDir) | Out-Null

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$baseName = "AMARKHYS-MAP-A-audit-conformite-cartographie-metier-$stamp"
$htmlPath = Join-Path $outDir "$baseName.word.html"
$docPath = Join-Path $outDir "$baseName.doc"

$md = [System.IO.File]::ReadAllText($mdPath, [System.Text.Encoding]::UTF8)

function HtmlEncode([string]$value) {
  return [System.Net.WebUtility]::HtmlEncode($value)
}

$lines = $md -split "`r?`n"
$htmlLines = New-Object System.Collections.Generic.List[string]
$inTable = $false

foreach ($line in $lines) {
  if ($line.Trim() -eq "") {
    if ($inTable) {
      $htmlLines.Add("</table>")
      $inTable = $false
    }
    $htmlLines.Add("<p></p>")
    continue
  }

  if ($line.StartsWith("# ")) {
    if ($inTable) { $htmlLines.Add("</table>"); $inTable = $false }
    $htmlLines.Add("<h1>" + (HtmlEncode $line.Substring(2)) + "</h1>")
    continue
  }

  if ($line.StartsWith("## ")) {
    if ($inTable) { $htmlLines.Add("</table>"); $inTable = $false }
    $htmlLines.Add("<h2>" + (HtmlEncode $line.Substring(3)) + "</h2>")
    continue
  }

  if ($line.StartsWith("### ")) {
    if ($inTable) { $htmlLines.Add("</table>"); $inTable = $false }
    $htmlLines.Add("<h3>" + (HtmlEncode $line.Substring(4)) + "</h3>")
    continue
  }

  if ($line.Trim().StartsWith("|") -and $line.Trim().EndsWith("|")) {
    if ($line -match "^\|\s*---") {
      continue
    }

    if (!$inTable) {
      $htmlLines.Add("<table>")
      $inTable = $true
    }

    $cells = $line.Trim().Trim("|") -split "\|"
    $row = "<tr>"
    foreach ($cell in $cells) {
      $row += "<td>" + (HtmlEncode $cell.Trim()) + "</td>"
    }
    $row += "</tr>"
    $htmlLines.Add($row)
    continue
  }

  if ($inTable) {
    $htmlLines.Add("</table>")
    $inTable = $false
  }

  if ($line.StartsWith("- ")) {
    $htmlLines.Add("<p class='bullet'>• " + (HtmlEncode $line.Substring(2)) + "</p>")
    continue
  }

  $htmlLines.Add("<p>" + (HtmlEncode $line) + "</p>")
}

if ($inTable) {
  $htmlLines.Add("</table>")
}

$html = @"
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Audit conformité runtime — Cartographie métier AMARKHYS</title>
<style>
  body {
    font-family: Calibri, Arial, sans-serif;
    color: #111827;
    line-height: 1.35;
    margin: 42px;
  }
  h1 {
    color: #064e3b;
    font-size: 26px;
    border-bottom: 3px solid #10b981;
    padding-bottom: 8px;
    margin-top: 0;
  }
  h2 {
    color: #065f46;
    font-size: 20px;
    margin-top: 26px;
    border-bottom: 1px solid #d1fae5;
    padding-bottom: 4px;
  }
  h3 {
    color: #111827;
    font-size: 16px;
    margin-top: 18px;
  }
  p {
    font-size: 11.5pt;
    margin: 5px 0;
  }
  .bullet {
    margin-left: 18px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 10px 0 18px 0;
    font-size: 10.5pt;
  }
  td {
    border: 1px solid #d1d5db;
    padding: 6px 8px;
    vertical-align: top;
  }
  tr:first-child td {
    background: #ecfdf5;
    font-weight: bold;
    color: #064e3b;
  }
</style>
</head>
<body>
$($htmlLines -join "`n")
</body>
</html>
"@

[System.IO.File]::WriteAllText($htmlPath, $html, [System.Text.UTF8Encoding]::new($false))
Copy-Item $htmlPath $docPath -Force

Write-Host "[WRITTEN] $htmlPath"
Write-Host "[WRITTEN] $docPath"
Write-Host "[OK] Word-compatible .doc generated without COM."
Write-Host "[AMARKHYS-MAP-B3] Completed."