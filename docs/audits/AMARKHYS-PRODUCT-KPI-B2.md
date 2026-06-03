# AMARKHYS-PRODUCT-KPI-B2

## Objectif

Brancher la fiche produit opérationnelle sur RuntimeProductKpiEngine sans changer le rendu visuel.

## Correction

- Import de RuntimeProductKpiEngine.
- productOperationalSummary délègue maintenant à RuntimeProductKpiEngine.compute().
- Les cartes existantes restent inchangées : Approvisionnement, Stock, Atelier, Performance.
- La recherche produit en en-tête reste inchangée.

## Hors périmètre

- Aucun changement loader.
- Aucun changement moteur stock.
- Aucun changement mutation stock.
- Aucun dashboard global produits.
