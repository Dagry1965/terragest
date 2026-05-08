$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\Admin\terragest"

$replacements = @(
  @("MÃ©tier", "Métier"),
  @("MÃƒÂ©tier", "Métier"),
  @("OpÃ©rations", "Opérations"),
  @("OpÃƒÂ©rations", "Opérations"),
  @("SystÃ¨me", "Système"),
  @("SystÃƒÂ¨me", "Système"),
  @("RÃ©fÃ©rentiel", "Référentiel"),
  @("MatÃ©riels", "Matériels"),
  @("opÃ©rationnel", "opérationnel"),
  @("OpÃ©rationnel", "Opérationnel"),
  @("centralisÃ©", "centralisé"),
  @("pilotÃ©e", "pilotée"),
  @("CrÃ©er", "Créer"),
  @("DonnÃ©es", "Données"),
  @("ActivitÃ©", "Activité"),
  @("QuantitÃ©", "Quantité"),
  @("UnitÃ©", "Unité"),
  @("CatÃ©gorie", "Catégorie"),
  @("Ã‰tat", "État"),
  @("Ã©", "é"),
  @("Ã¨", "è"),
  @("Ãª", "ê"),
  @("Ã¢", "â"),
  @("Ã´", "ô"),
  @("Ã»", "û"),
  @("Ã§", "ç"),
  @("â€™", "'")
)

$files = Get-ChildItem -Path "$projectRoot\src" -Recurse -Include *.ts,*.tsx,*.css,*.json

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$count = 0

foreach ($file in $files) {
  $text = [System.IO.File]::ReadAllText($file.FullName)
  $original = $text

  foreach ($pair in $replacements) {
    $text = $text.Replace($pair[0], $pair[1])
  }

  if ($text -ne $original) {
    [System.IO.File]::WriteAllText($file.FullName, $text, $utf8NoBom)
    Write-Host "Corrige $($file.FullName)" -ForegroundColor Green
    $count++
  }
}

Write-Host ""
Write-Host "Fichiers corriges : $count" -ForegroundColor Cyan

Set-Location $projectRoot
pnpm build