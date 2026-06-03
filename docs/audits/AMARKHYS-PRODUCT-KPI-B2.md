# AMARKHYS-PRODUCT-KPI-B2

## Objectif

Brancher la fiche produit opérationnelle sur RuntimeProductKpiEngine sans changer le rendu visuel.

## Correction

* Import de RuntimeProductKpiEngine.
* productOperationalSummary délègue maintenant à RuntimeProductKpiEngine.compute().
* Les cartes existantes restent inchangées : Approvisionnement, Stock, Atelier, Performance.
* La recherche produit en en-tête reste inchangée.

## Hors périmètre

* Aucun changement loader.
* Aucun changement moteur stock.
* Aucun changement mutation stock.
* Aucun dashboard global produits.



\## Validation



\- `pnpm build` : OK

\- Controle visuel `/produitsauto/hub` : OK

\- Fiche produit visible : OK

\- Synthese operationnelle visible : OK

\- Cartes Approvisionnement / Stock / Atelier / Performance inchangees : OK

\- Valeurs commande / livre / reste / stock / atelier coherentes : OK

\- Recherche produit : OK

\- Lignes de commande expandable : OK

\- `git status --short` apres push : clean

