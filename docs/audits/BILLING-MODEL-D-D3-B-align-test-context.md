# BILLING-MODEL-D-D3-B — Alignement contexte scénario test

## Résultat

- Intervention : `billing-dd3-intervention`
- tenantId : `ORG_AMARKHYS_001`
- workspace : `amarkhys`
- userId : `RGHcNSezlSbFQDUJQBUBfy0vMo13`
- Statut remis à `en_cours` pour permettre le test UI.
- Les 2 lignes intervention D-D3 sont alignées sur le même contexte.

## Cause

- Le scénario D-D3 avait été créé avec `tenantId = demo-tenant` et `userId = seed-billing-dd3`.
- Le runtime détail filtrait donc le record hors contexte, provoquant un 404.
