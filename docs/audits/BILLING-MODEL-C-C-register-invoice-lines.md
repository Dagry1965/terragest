# BILLING-MODEL-C-C — Register invoice lines

## Résultat

- coreModules.ts modifié : oui
- index.ts modifié : oui
- facturesauto.module.ts modifié : oui

## Garantie métier

- `lignesfactureauto` est rattaché à `facturesauto` via `foreignKey: factureId`.
- Le panneau enfant est ajouté avant `Encaissements`.
- Aucun fallback global n'est introduit.
