# AMARKHYS-PRODUCT-HUB-FLOW-CASCADE-A

## Objectif

Implémenter la disposition validée “Tableau de bord stock opérationnel”.

## Correction

- Recomposition visuelle de ERPProductStockOperationalSheet.
- KPI haut :
  - Stock actuel
  - Valeur stock
  - Entrées récentes
  - Sorties récentes
  - Commandes en cours
- Ajout d’un flux central Produit -> Entrée / Stock.
- Branches :
  - Entrée -> Commande -> Ligne de commande -> Ligne de réception
  - Stock -> Sortie -> Intervention -> Vente boutique
- Blocs bas en cascade :
  - Mouvements de stock
  - Commandes fournisseurs
  - Réceptions stock
  - Sorties vers interventions / ventes
- Conservation de la mécanique returnTo produit.
- Aucun changement dans les moteurs stock.
- Aucun changement dans RuntimeProductStockOperationalHubLoader.
- Aucun changement dans RuntimeStockMovementService.

## Validation attendue

- Le visuel correspond à la maquette validée.
- La page reste en plein écran opérationnel.
- Les couleurs et la disposition restent cohérentes.
- Les liens sortants conservent le retour contexte.
- Build OK.