$ErrorActionPreference = "Stop"

$Root =
"C:\Users\Admin\terragest"

function Ensure-Dir($Path) {

  if (!(Test-Path $Path)) {

    New-Item `
      -ItemType Directory `
      -Path $Path `
      -Force | Out-Null
  }
}

function Write-File(
  $Path,
  $Content
) {

  $Dir =
    Split-Path $Path -Parent

  Ensure-Dir $Dir

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN $Path"
}

Write-Host ""
Write-Host "=== PREPARE BUSINESS MODEL V2 ==="
Write-Host ""

Ensure-Dir `
"$Root\docs\business-model\v2"

Ensure-Dir `
"$Root\src\seeds\v2"

Ensure-Dir `
"$Root\src\runtime\business-rules"

Ensure-Dir `
"$Root\src\runtime\modules\v2"

$Overview = @'
# TERRAGEST BUSINESS MODEL V2

## Vision

Le terrain représente la ressource physique centrale.

Le contrat autorise l’exploitation.

L’exploitation représente l’activité économique.

La campagne représente une période opérationnelle.

Les mouvements alimentent :
- les stocks
- la comptabilité
- la rentabilité

---

## Architecture métier

Utilisateurs
    ↓
Terrains
    ↓
Contrats
    ↓
Exploitations
    ↓
Campagnes
    ↓
Ressources / Actifs / Produits
    ↓
Mouvements
    ↓
Stocks + Comptabilité
    ↓
Rentabilité

---

## Modules

- utilisateurs
- terrains
- contrats
- exploitations
- campagnes
- ressources
- actifs
- produits
- stocks
- mouvements
- comptabilite
- biensImmobiliers
- documents

---

## Chronologie métier

Aucune entité fille
ne peut dépasser
la période de son parent.

Contrat
→ Exploitation
→ Campagne
→ Mouvement

---

## Règles critiques

- exploitation nécessite contrat actif
- campagne doit être comprise dans exploitation
- mouvement interdit hors campagne active
- stock interdit négatif
- vente = revenu
- achat = dépense
- consommation diminue stock
- production augmente stock
- rentabilité = revenus - dépenses
'@

$SeedsReadme = @'
# Seeds Business Model V2

Ce dossier contiendra :
- terrains
- contrats
- exploitations
- campagnes
- ressources
- actifs
- mouvements
- stocks
- comptabilité

Objectif :
alimenter le dashboard runtime ERP
avec de vraies données métier.
'@

$BusinessRulesReadme = @'
# Runtime Business Rules

Les règles métier V2 seront centralisées ici.

Exemples :
- surface disponible terrain
- compatibilité exploitation / terrain
- chronologie contrat / exploitation / campagne
- validation mouvements
- contrôle stock
- calcul rentabilité
'@

$ModulesReadme = @'
# Runtime Modules V2

Les modules métier V2 seront reconstruits ici
avant remplacement progressif
de coreERPModules.ts.
'@

Write-File `
"$Root\docs\business-model\v2\README.md" `
$Overview

Write-File `
"$Root\src\seeds\v2\README.md" `
$SeedsReadme

Write-File `
"$Root\src\runtime\business-rules\README.md" `
$BusinessRulesReadme

Write-File `
"$Root\src\runtime\modules\v2\README.md" `
$ModulesReadme

Write-Host ""
Write-Host "DONE BUSINESS MODEL V2 PREPARATION"
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. préparer modules V2"
Write-Host "2. préparer seeds"
Write-Host "3. préparer règles métier runtime"