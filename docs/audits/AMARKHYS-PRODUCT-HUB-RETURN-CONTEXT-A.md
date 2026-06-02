# AMARKHYS-PRODUCT-HUB-RETURN-CONTEXT-A

## Objectif

Ajouter la mécanique de retour contexte à la fiche produit / stock opérationnelle.

## Correction

- Ajout queryHref.
- Ajout withReturnTo.
- Création de productHubReturnTo.
- Préservation de productId.
- Préservation de selectedStockId.
- Ajout returnTo sur les liens sortants :
  - fiche produit
  - stock sélectionné
  - mouvement stock
  - commande fournisseur
  - réception stock

## Validation attendue

- Ouvrir produit depuis le hub produit -> bandeau retour.
- Ouvrir stock depuis le hub produit -> bandeau retour.
- Ouvrir mouvement depuis le hub produit -> bandeau retour.
- Ouvrir commande depuis le hub produit -> bandeau retour.
- Ouvrir réception depuis le hub produit -> bandeau retour.
- Retour -> même fiche produit / même stock.