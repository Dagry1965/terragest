$ErrorActionPreference = "Stop"

$Path = "C:\Users\Admin\terragest\src\runtime\modules\v2\terragestBusinessModelV2.ts"

$content = [System.IO.File]::ReadAllText($Path)

$content = $content.Replace(
'options: ["Propriétaire", "Responsable", "Gestionnaire", "Technicien", "Comptable"]',
'options: [
        { label: "Propriétaire", value: "proprietaire" },
        { label: "Responsable", value: "responsable" },
        { label: "Gestionnaire", value: "gestionnaire" },
        { label: "Technicien", value: "technicien" },
        { label: "Comptable", value: "comptable" },
      ]'
)

$content = $content.Replace(
'options: ["PropriÃ©taire", "Responsable", "Gestionnaire", "Technicien", "Comptable"]',
'options: [
        { label: "Propriétaire", value: "proprietaire" },
        { label: "Responsable", value: "responsable" },
        { label: "Gestionnaire", value: "gestionnaire" },
        { label: "Technicien", value: "technicien" },
        { label: "Comptable", value: "comptable" },
      ]'
)

[System.IO.File]::WriteAllText(
  $Path,
  $content,
  [System.Text.Encoding]::UTF8
)

Write-Host "OK - Options V2 corrigees" -ForegroundColor Green