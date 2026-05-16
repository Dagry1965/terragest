$ErrorActionPreference = "Stop"

$path =
"C:\Users\Admin\terragest\src\runtime\modules\generated\clientsauto\clientsauto.module.ts"

$content =
[System.IO.File]::ReadAllText($path)

$content =
$content -replace '
key:"identite",\s*
\s*label:"Identité",\s*
',
@'
key:"identite",

label:"Identité",

fields:[
  "codeClient",
  "nom",
  "prenom",
  "telephone",
  "email",
  "typeClient",
  "dateInscription",
  "statut"
],

'@

$content =
$content -replace '
key:"adresse",\s*
\s*label:"Adresse",\s*
',
@'
key:"adresse",

label:"Adresse",

fields:[
  "adresse",
  "ville",
  "pays"
],

'@

$content =
$content -replace '
key:"vehicules",\s*
\s*label:"Véhicules",\s*
',
@'
key:"vehicules",

label:"Véhicules",

fields:[
  "vehicules"
],

'@

$content =
$content -replace '
key:"notes",\s*
\s*label:"Notes",\s*
',
@'
key:"notes",

label:"Notes",

fields:[
  "observations"
],

'@

[System.IO.File]::WriteAllText(
  $path,
  $content,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host ""
Write-Host "CLIENTSAUTO TABS FIXED"
Write-Host ""