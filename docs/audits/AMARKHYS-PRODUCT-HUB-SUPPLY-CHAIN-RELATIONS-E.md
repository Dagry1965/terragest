# AMARKHYS-PRODUCT-HUB-SUPPLY-CHAIN-RELATIONS-E

## Objectif

Corriger le loader produit pour alimenter commandes/réceptions via les lignes de commande.

## Correction

- Ajout import lignescommandestockautoModule.
- Chargement de lignescommandestockauto dans le Promise.all.
- Résolution des commandes via lignescommandestockauto.produitId -> commandeId.
- Résolution des réceptions via ligneCommandeId / commandeId / produitId / stockId.
- Enrichissement des commandes et réceptions avec les informations de ligne produit.
- Correction appliquée par script Node.js ligne par ligne.

## Hors périmètre

- Aucun changement de design.
- Aucun changement moteur stock.
- Aucun changement mutation stock.
