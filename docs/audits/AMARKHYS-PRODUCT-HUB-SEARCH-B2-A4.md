# AMARKHYS-PRODUCT-HUB-SEARCH-B2-A4

## Objectif

Ajouter une recherche produit dans l’en-tête de la fiche produit opérationnelle.

## Correction

- ProductStockOperationalHubClient charge la liste produits.
- Suggestions filtrées par nom, désignation, référence, code, catégorie.
- ERPProductStockOperationalSheet reçoit une prop productSearch.
- Le champ est inséré avant les boutons Ouvrir fiche / Éditer.
- Clic suggestion ouvre /produitsauto/hub?productId=<id>.

## Hors périmètre

- Aucun changement moteur stock.
- Aucun changement mutation stock.
- Aucun changement workflow.
- Aucun changement données.
