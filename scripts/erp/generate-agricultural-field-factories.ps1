$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

$fieldsPath =
  Join-Path $root "src\runtime\modules\factory\businessFields.ts"

$fields =
  [System.IO.File]::ReadAllText($fieldsPath)

Write-Host ""
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host " TERRAGEST AGRICULTURAL FIELD FACTORY ENGINE" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

function Write-Utf8File {

  param(
    [string]$Path,
    [string]$Content
  )

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )
}

$definitions = @(

@"
export const produitFields = [
  {
    key: "nom",
    label: "Nom",
    type: "text",
    required: true,
  },
  {
    key: "categorie",
    label: "Catégorie",
    type: "select",
    required: true,
    options: [
      "Agricole",
      "Animal",
      "Piscicole",
      "Immobilier",
    ],
  },
  {
    key: "modeStock",
    label: "Mode de stock",
    type: "select",
    options: [
      "Stockable",
      "Non stockable",
    ],
  },
  {
    key: "prixAchat",
    label: "Prix achat",
    type: "number",
  },
  {
    key: "prixVente",
    label: "Prix vente",
    type: "number",
  },
];
"@,

@"
export const stockFields = [
  {
    key: "produitId",
    label: "Produit",
    type: "relation",
    required: true,
    relation: {
      module: "produits",
      collection: "produits",
      labelField: "nom",
    },
  },
  {
    key: "quantite",
    label: "Quantité",
    type: "number",
    required: true,
  },
  {
    key: "unite",
    label: "Unité",
    type: "text",
  },
  {
    key: "seuilAlerte",
    label: "Seuil alerte",
    type: "number",
  },
];
"@,

@"
export const mouvementFields = [
  {
    key: "stockId",
    label: "Stock",
    type: "relation",
    required: true,
    relation: {
      module: "stocks",
      collection: "stocks",
      labelField: "id",
    },
  },
  {
    key: "type",
    label: "Type",
    type: "select",
    options: [
      "Entrée",
      "Sortie",
      "Correction",
      "Transfert",
    ],
  },
  {
    key: "quantite",
    label: "Quantité",
    type: "number",
  },
];
"@,

@"
export const terrainFields = [
  {
    key: "nom",
    label: "Nom",
    type: "text",
    required: true,
  },
  {
    key: "proprietaireId",
    label: "Propriétaire",
    type: "relation",
    relation: {
      module: "utilisateurs",
      collection: "utilisateurs",
      labelField: "nom",
    },
  },
  {
    key: "surfaceTotale",
    label: "Surface totale",
    type: "number",
  },
  {
    key: "vocation",
    label: "Vocation",
    type: "select",
    options: [
      "Agricole",
      "Habitation",
      "Piscicole",
      "Commercial",
    ],
  },
];
"@,

@"
export const parcelleFields = [
  {
    key: "terrainId",
    label: "Terrain",
    type: "relation",
    relation: {
      module: "terrains",
      collection: "terrains",
      labelField: "nom",
    },
  },
  {
    key: "superficie",
    label: "Superficie",
    type: "number",
  },
  {
    key: "culture",
    label: "Culture",
    type: "text",
  },
];
"@,

@"
export const recolteFields = [
  {
    key: "parcelleId",
    label: "Parcelle",
    type: "relation",
    relation: {
      module: "parcelles",
      collection: "parcelles",
      labelField: "id",
    },
  },
  {
    key: "dateRecolte",
    label: "Date récolte",
    type: "date",
  },
  {
    key: "quantite",
    label: "Quantité",
    type: "number",
  },
];
"@,

@"
export const intrantFields = [
  {
    key: "nom",
    label: "Nom",
    type: "text",
  },
  {
    key: "categorie",
    label: "Catégorie",
    type: "select",
    options: [
      "Semence",
      "Engrais",
      "Traitement",
      "Alimentation",
    ],
  },
  {
    key: "stockActuel",
    label: "Stock actuel",
    type: "number",
  },
];
"@

)

foreach ($definition in $definitions) {

  $firstLine =
    ($definition -split "`n")[0]

  if ($fields -notmatch [regex]::Escape($firstLine.Trim())) {

    Write-Host "Ajout factory..." -ForegroundColor Green

    $fields += "`n`n"
    $fields += $definition
  }
  else {

    Write-Host "Factory déjà présente." -ForegroundColor DarkYellow
  }
}

Write-Utf8File `
  -Path $fieldsPath `
  -Content $fields

Write-Host ""
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host " FIELD FACTORIES GENERATED" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""