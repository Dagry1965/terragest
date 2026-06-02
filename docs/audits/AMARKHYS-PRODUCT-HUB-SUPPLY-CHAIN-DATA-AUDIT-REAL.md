# AMARKHYS-PRODUCT-HUB-SUPPLY-CHAIN-DATA-AUDIT-REAL

## Objectif

Audit lecture seule de la chaîne produit -> lignes commande -> commandes -> réceptions.

## Résultat

- OK: 11
- KO: 1

## Checks

- OK — Loader exists
- KO — Loader imports lignescommandestockautoModule
- OK — Loader still uses direct productOrders filter — If true, commandes are not resolved via lines yet.
- OK — Loader still uses direct productReceptions filter — If true, receptions are not resolved via lines yet.
- OK — Lignes commande module has produitId
- OK — Lignes commande module has commandeId
- OK — Lignes commande module has quantiteCommandee
- OK — Receptions module has ligneCommandeId
- OK — Receptions module has commandeId
- OK — Receptions module has produitId
- OK — Receptions module has stockId
- OK — Receptions module has quantiteRecue

## Conclusion attendue

Si le loader utilise encore productOrders/productReceptions par filtre direct, il faut corriger le loader.
Si les modules portent bien produitId / commandeId / ligneCommandeId, la correction doit se faire via lignescommandestockauto.
