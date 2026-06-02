# AMARKHYS-PRODUCT-HUB-FINAL-POLISH-A

## Objectif

Corriger les finitions visibles de la fiche produit opérationnelle sans modifier le design validé.

## Corrections

- Affichage métier des statuts techniques :
  - stock_faible -> Stock faible
  - actif -> Actif
  - validée / envoyée / partielle / réceptionnée, etc.
- Renforcement du formatage de date :
  - ISO date
  - timestamp secondes
  - timestamp millisecondes
  - tentative Firestore seconds
- Ajout de champs alternatifs pour Dernière MAJ :
  - updatedAt
  - updated_at
  - modifiedAt
  - lastUpdate
  - dateMiseAJour
  - createdAt

## Hors périmètre

- Aucun changement de moteur stock.
- Aucun changement de loader.
- Aucun changement de layout validé.
- Le bandeau retour sur les pages listes sera traité dans une passe runtime séparée.