# AMARKHYS-PRODUCT-HUB-OPERATIONAL-SHEET-A

## Objectif

Mettre la fiche produit / stock au niveau UX de la fiche client opérationnelle, sans modifier les moteurs stock.

## Correction

- Création de ERPProductStockOperationalSheet.
- Remplacement de ERPRecordHubPage par une fiche produit opérationnelle enrichie.
- Réutilisation des données existantes :
  - rootRecord
  - primaryRecords
  - relatedRecordsBySection.mouvements
  - relatedRecordsBySection.commandes
  - relatedRecordsBySection.receptions
- Aucun changement dans RuntimeStockMovementService.
- Aucun changement dans RuntimeProductStockOperationalHubLoader.

## Lecture métier obtenue

Produit
→ Stock sélectionné
→ Mouvements
→ Commandes fournisseur
→ Réceptions stock
→ Entrées / sorties stock
→ Stock final

## Validation attendue

- Header produit lisible.
- KPI lisibles.
- Stock sélectionné visible.
- Mouvements distingués entrée / sortie.
- Commandes et réceptions visibles.
- Panneau droit présent.
- Build OK.