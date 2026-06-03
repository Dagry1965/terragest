# AMARKHYS-PRODUCT-HUB-SUPPLIER-SUPPLY-LAYER-B

## Objectif

Ajouter la lecture Fournisseurs / Approvisionnement dans la fiche produit opérationnelle.

## Correction

- Chargement de fournisseursauto dans RuntimeProductStockOperationalHubLoader.
- Résolution fournisseurId des commandes vers fournisseurLabel / fournisseurNom / fournisseurCode / téléphone.
- Ajout d’un bloc Approvisionnement dans l’aside de la fiche produit.
- Affichage fournisseur principal, dernière commande, dernière réception, quantité commandée, quantité reçue.

## Hors périmètre

- Aucun changement moteur stock.
- Aucun changement mutation stock.
- Aucun changement du layout principal validé.
