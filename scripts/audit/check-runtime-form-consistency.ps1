$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host " ERP FORM CONSISTENCY CHECK"
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

$root =
  "C:\Users\Admin\terragest\src\runtime\modules\definitions\generated"

$files =
  Get-ChildItem $root -Filter *.ts

foreach ($file in $files) {

  Write-Host ""
  Write-Host "MODULE : $($file.Name)" -ForegroundColor Yellow

  $content =
    Get-Content $file.FullName -Raw

  #
  # SCHEMA FIELDS
  #
  $schemaMatches =
    [regex]::Matches(
      $content,
      'key:\s*"([^"]+)"'
    )

  $schemaFields =
    @()

  foreach ($match in $schemaMatches) {

    $value =
      $match.Groups[1].Value

    if (
      $schemaFields -notcontains $value
    ) {
      $schemaFields += $value
    }
  }

  #
  # FORM FIELDS
  #
  $formMatches =
    [regex]::Matches(
      $content,
      '"([^"]+)"'
    )

  $formFields =
    @()

  foreach ($match in $formMatches) {

    $value =
      $match.Groups[1].Value

    if (
      $schemaFields -contains $value
    ) {
      $formFields += $value
    }
  }

  #
  # MISSING
  #
  $missing =
    $schemaFields |
    Where-Object {
      $formFields -notcontains $_
    }

  #
  # DUPLICATES
  #
  $duplicates =
    $formFields |
    Group-Object |
    Where-Object {
      $_.Count -gt 1
    }

  if ($missing.Count -eq 0) {

    Write-Host "OK : Aucun champ manquant" -ForegroundColor Green

  } else {

    Write-Host ""
    Write-Host "CHAMPS ABSENTS DU FORMULAIRE :" -ForegroundColor Red

    foreach ($item in $missing) {
      Write-Host " - $item"
    }
  }

  if ($duplicates.Count -gt 0) {

    Write-Host ""
    Write-Host "DOUBLONS :" -ForegroundColor Magenta

    foreach ($dup in $duplicates) {
      Write-Host " - $($dup.Name) x$($dup.Count)"
    }
  }

  Write-Host ""
}

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host " AUDIT TERMINE"
Write-Host "===================================" -ForegroundColor Cyan