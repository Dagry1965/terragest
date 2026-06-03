# AMARKHYS-PRODUCT-HUB-SUPPLY-CARDS-POLISH-A

## Objectif

Améliorer l’affichage des cartes Commandes fournisseurs / Réceptions stock dans la fiche produit opérationnelle.

## Correction

- Suppression de l’affichage direct des IDs techniques fournisseur.
- Ajout d’un libellé fournisseur métier :
  - fournisseurLabel
  - fournisseurNom
  - nomFournisseur
  - supplierName
  - supplierLabel
  - fournisseur
  - fallback : Fournisseur non renseigné
- Ajout d’un affichage date commande.
- Ajout d’un affichage quantité commandée.
- Ajout d’un affichage montant si disponible.
- Préparation d’un affichage réception lisible : date réception + quantité reçue.

## Hors périmètre

- Aucun changement loader.
- Aucun changement moteur stock.
- Aucun changement design global.
- Aucun changement de données.