# AMARKHYS-REBUILD-07C-B — Apply generic relation filters

Date: 2026-05-31T23:06:33.695Z

## Correction

- produitId utilise relation.filterBy typeArticle -> typeArticle.
- stockId utilise relation.filterBy produitId -> produitId.
- dependsOn est conservé pour déclencher le reset/refresh générique.

## Règle générique

- typeArticle sélectionné filtre les produits.
- produit sélectionné filtre les stocks.
- Le moteur générique RuntimeRelationFilterEngine applique les critères.

## Checks

- OK — produitId relation produitsauto conservée
- OK — produitId filtré par typeArticle
- OK — produitId dependsOn typeArticle
- OK — stockId relation stocksauto conservée
- OK — stockId filtré par produitId
- OK — stockId dependsOn produitId
- OK — fichier modifié

## Synthèse

- OK: 7
- FAIL: 0
