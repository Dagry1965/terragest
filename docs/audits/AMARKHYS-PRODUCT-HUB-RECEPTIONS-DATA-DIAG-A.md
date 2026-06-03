# AMARKHYS-PRODUCT-HUB-RECEPTIONS-DATA-DIAG-A

## Objectif

Diagnostiquer pourquoi le bloc Réceptions stock reste vide dans la fiche produit opérationnelle.

## Résultat

- OK: 18
- KO: 0

## Checks

- OK — Loader imports lignescommandestockautoModule
- OK — Loader loads lignesCommande in Promise.all
- OK — Loader computes productOrderLines
- OK — Loader computes productReceptionsFromLines
- OK — Loader matches reception.ligneCommandeId
- OK — Loader matches reception.commandeId
- OK — Loader includes productReceptionsByStock
- OK — Loader assigns relatedRecordsBySection.receptions = productReceptions
- OK — Receptions module has ligneCommandeId
- OK — Receptions module has commandeId
- OK — Receptions module has produitId
- OK — Receptions module has stockId
- OK — Receptions module has quantiteRecue
- OK — Receptions module has dateReception
- OK — Lignes commande module has produitId
- OK — Lignes commande module has commandeId
- OK — Commandes module has fournisseurId
- OK — Commandes module has dateCommande

## Lecture

- Si tous les checks loader/module sont OK mais que la fiche reste vide, le problème est probablement dans les données Firestore réelles.
- Si les réceptions existent en base mais ne remontent pas, il faudra inspecter les valeurs réelles de ligneCommandeId / commandeId / produitId / stockId.
- Si aucune réception réelle n’existe pour la ligne commande du produit, le bloc vide est cohérent et il faudra créer ou réparer les données de démo.
