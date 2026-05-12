$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

$docsDir =
  Join-Path $root "docs\architecture"

$auditDir =
  Join-Path $root "scripts\audit"

New-Item `
  -ItemType Directory `
  -Path $docsDir `
  -Force | Out-Null

New-Item `
  -ItemType Directory `
  -Path $auditDir `
  -Force | Out-Null

$governancePath =
  Join-Path `
    $docsDir `
    "RUNTIME_REPOSITORY_GOVERNANCE.md"

$governance = @"
# TERRAGEST_V2 - Runtime Repository Governance

## Architecture officielle

UI
→ RuntimeDataBinding
→ RuntimeRepository
→ FirestoreRuntimeRepository
→ Firestore

## Interdictions

- Nouveau repository métier spécifique
- Nouveau FirestoreRepository parallèle
- Nouveau BaseRepository parallèle
- Accès direct collection(...)
- Accès direct doc(...)
- CRUD page par page
- Persistence hors runtime

## Obligatoire

- createBusinessModule(...)
- businessFields.ts
- RuntimeDataBinding
- RuntimeRepository
- metadata-driven
- runtime-driven

## Stratégie

- centraliser
- mutualiser
- industrialiser
- réduire duplication
- converger vers le runtime central

## Priorités

1. produits
2. stocks
3. mouvements
4. terrains
5. interventions
6. maintenance
"@

[System.IO.File]::WriteAllText(
  $governancePath,
  $governance,
  [System.Text.UTF8Encoding]::new($false)
)

$auditPath =
  Join-Path `
    $auditDir `
    "audit-repository-governance.ps1"

$audit = @"
`$ErrorActionPreference = "Stop"

`$root = "C:\Users\Admin\terragest"

`$src =
  Join-Path `$root "src"

`$outDir =
  Join-Path `$root "docs\audit"

New-Item `
  -ItemType Directory `
  -Path `$outDir `
  -Force | Out-Null

`$outFile =
  Join-Path `$outDir "REPOSITORY_GOVERNANCE_AUDIT.md"

if (Test-Path `$outFile) {
  Remove-Item `$outFile -Force
}

function Add-Line {

  param([string]`$Text = "")

  [System.IO.File]::AppendAllText(
    `$outFile,
    `$Text + [Environment]::NewLine,
    [System.Text.UTF8Encoding]::new(`$false)
  )
}

Add-Line "# REPOSITORY GOVERNANCE AUDIT"
Add-Line ""
Add-Line "Date : `$(Get-Date)"
Add-Line ""

`$results =
  Get-ChildItem `
    `$src `
    -Recurse `
    -File |
  Where-Object {
    `$_.Extension -in ".ts", ".tsx"
  } |
  Select-String `
    -Pattern "collection(" `
    -SimpleMatch

Add-Line "## collection() usages"
Add-Line ""
Add-Line "Count : `$(`$results.Count)"
Add-Line ""

foreach (`$r in `$results) {

  Add-Line (
    "`$(`$r.Path):" +
    "`$(`$r.LineNumber) " +
    "`$(`$r.Line.Trim())"
  )
}

Write-Host ""
Write-Host "AUDIT COMPLETE" -ForegroundColor Green
Write-Host `$outFile -ForegroundColor Yellow
Write-Host ""
"@

[System.IO.File]::WriteAllText(
  $auditPath,
  $audit,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host ""
Write-Host "RUNTIME GOVERNANCE INSTALLED" -ForegroundColor Green
Write-Host $governancePath -ForegroundColor Yellow
Write-Host $auditPath -ForegroundColor Yellow
Write-Host ""