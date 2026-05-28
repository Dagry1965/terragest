# Q2-N — Operational Product Review

- Date: 2026-05-28T23:33:10.212Z
- Root: `C:\Users\Admin\terragest`

## Objectif

Revue produit finale de la chaîne opérationnelle après Q2-M :

`Clients → Véhicules → Rendez-vous → Interventions → Factures`

Cette passe ne modifie pas le runtime. Elle vérifie la présence du socle opérationnel, des modules, des metadata opérationnelles et l’absence de backups Q2-M/Q2-N.

## Résumé

- OK: 49
- WARN: 3
- FAIL: 0
- HIGH FAIL: 0

## Checklist produit manuelle à exécuter

### /clientsauto
- [ ] KPI visibles et lisibles
- [ ] Recherche visible et fonctionnelle
- [ ] Colonnes lisibles
- [ ] Expand véhicule présent si données liées
- [ ] Panneau droit cohérent

### /vehicules
- [ ] Client affiché lisiblement
- [ ] Recherche véhicule/client fonctionnelle
- [ ] Expand rendez-vous/interventions cohérent
- [ ] Navigation vers fiche véhicule OK

### /rendezvous
- [ ] Client lisible
- [ ] Véhicule lisible
- [ ] Date/heure/statut lisibles
- [ ] Expand intervention cohérent

### /interventionsauto
- [ ] Client lisible
- [ ] Véhicule lisible
- [ ] Rendez-vous lisible
- [ ] Lignes intervention visibles au bon endroit
- [ ] Total lisible
- [ ] Expand lignes intervention OK

### /facturesauto
- [ ] Client lisible
- [ ] Véhicule lisible
- [ ] Intervention lisible
- [ ] Montants HT/TTC lisibles
- [ ] Statut facture lisible

## Checks techniques

| Scope | Status | Severity | Message |
|---|---:|---:|---|
| runtime-page | OK | HIGH | File found: src/components/erp/runtime/ERPRuntimePage.tsx |
| runtime-page | OK | MEDIUM | Expected reference found: ERPOperationalModulePage |
| operational-index | OK | HIGH | File found: src/components/erp/operational/index.ts |
| operational-index | OK | MEDIUM | Expected reference found: ERPOperationalModulePage |
| operational-index | OK | MEDIUM | Expected reference found: ERPOperationalTable |
| operational-index | OK | MEDIUM | Expected reference found: ERPOperationalFilters |
| operational-index | OK | MEDIUM | Expected reference found: ERPOperationalRightPanel |
| operational-index | WARN | LOW | Expected reference not found or renamed: ERPOperationalExpandedChildren |
| module-page | OK | HIGH | File found: src/components/erp/operational/ERPOperationalModulePage.tsx |
| module-page | OK | MEDIUM | Expected reference found: ERPOperationalKpiStrip |
| module-page | OK | MEDIUM | Expected reference found: ERPOperationalFilters |
| module-page | OK | MEDIUM | Expected reference found: ERPOperationalTable |
| module-page | OK | MEDIUM | Expected reference found: ERPOperationalRightPanel |
| module-page | OK | MEDIUM | Expected reference found: operationalUiTokens |
| kpi-strip | OK | HIGH | File found: src/components/erp/operational/ERPOperationalKpiStrip.tsx |
| kpi-strip | WARN | LOW | Expected reference not found or renamed: operational |
| filters | OK | HIGH | File found: src/components/erp/operational/ERPOperationalFilters.tsx |
| filters | OK | MEDIUM | Expected reference found: operationalUiTokens |
| table | OK | HIGH | File found: src/components/erp/operational/ERPOperationalTable.tsx |
| table | OK | MEDIUM | Expected reference found: ERPOperationalExpandedChildren |
| table | OK | MEDIUM | Expected reference found: operationalUiTokens |
| expanded-children | OK | HIGH | File found: src/components/erp/operational/ERPOperationalExpandedChildren.tsx |
| expanded-children | OK | MEDIUM | Expected reference found: operationalUiTokens |
| expanded-children | OK | MEDIUM | Expected reference found: RuntimeOperationalChildrenResolver |
| right-panel | OK | HIGH | File found: src/components/erp/operational/ERPOperationalRightPanel.tsx |
| right-panel | OK | MEDIUM | Expected reference found: operational |
| children-resolver | OK | HIGH | File found: src/runtime/operational/RuntimeOperationalChildrenResolver.ts |
| children-resolver | WARN | LOW | Expected reference not found or renamed: metadata.key |
| tokens | OK | HIGH | File found: src/components/erp/operational/operationalUiTokens.ts |
| tokens | OK | MEDIUM | Expected reference found: operationalUiTokens |
| modules | OK | HIGH | Operational module detected: clientsauto in src/runtime/modules/definitions/coreModules.ts, src/runtime/modules/generated/clientsauto/clientsauto.actions.ts, src/runtime/modules/generated/clientsauto/clientsauto.automation.ts, src/runtime/modules/generated/clientsauto/clientsauto.dashboard.ts, src/runtime/modules/generated/clientsauto/clientsauto.module.ts, src/runtime/modules/generated/clientsauto/clientsauto.permissions.ts, src/runtime/modules/generated/clientsauto/clientsauto.workflows.ts, src/runtime/modules/generated/clientsauto/index.ts, src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts, src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts, src/runtime/modules/generated/facturesauto/facturesauto.module.ts, src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts, src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts, src/runtime/modules/generated/rendezvous/rendezvous.module.ts, src/runtime/modules/generated/vehicules/vehicules.module.ts, src/runtime/modules/lifecycle/ERPRelationDataLoader.ts |
| modules | OK | HIGH | clientsauto has operational metadata reference |
| modules | OK | MEDIUM | clientsauto has table metadata reference |
| modules | OK | MEDIUM | clientsauto relation label metadata detected |
| modules | OK | HIGH | Operational module detected: vehicules in src/runtime/modules/definitions/coreModules.ts, src/runtime/modules/generated/clientsauto/clientsauto.module.ts, src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts, src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts, src/runtime/modules/generated/facturesauto/facturesauto.module.ts, src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts, src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts, src/runtime/modules/generated/rendezvous/rendezvous.module.ts, src/runtime/modules/generated/vehicules/index.ts, src/runtime/modules/generated/vehicules/vehicules.actions.ts, src/runtime/modules/generated/vehicules/vehicules.automation.ts, src/runtime/modules/generated/vehicules/vehicules.dashboard.ts, src/runtime/modules/generated/vehicules/vehicules.module.ts, src/runtime/modules/generated/vehicules/vehicules.permissions.ts, src/runtime/modules/generated/vehicules/vehicules.workflows.ts, src/runtime/modules/lifecycle/ERPRelationDataLoader.ts |
| modules | OK | HIGH | vehicules has operational metadata reference |
| modules | OK | MEDIUM | vehicules has table metadata reference |
| modules | OK | MEDIUM | vehicules relation label metadata detected |
| modules | OK | HIGH | Operational module detected: rendezvous in src/runtime/modules/definitions/coreModules.ts, src/runtime/modules/generated/clientsauto/clientsauto.module.ts, src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts, src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts, src/runtime/modules/generated/rendezvous/index.ts, src/runtime/modules/generated/rendezvous/rendezvous.actions.ts, src/runtime/modules/generated/rendezvous/rendezvous.automation.ts, src/runtime/modules/generated/rendezvous/rendezvous.dashboard.ts, src/runtime/modules/generated/rendezvous/rendezvous.module.ts, src/runtime/modules/generated/rendezvous/rendezvous.permissions.ts, src/runtime/modules/generated/rendezvous/rendezvous.workflows.ts, src/runtime/modules/generated/vehicules/vehicules.module.ts, src/runtime/modules/lifecycle/ERPRelationDataLoader.ts |
| modules | OK | HIGH | rendezvous has operational metadata reference |
| modules | OK | MEDIUM | rendezvous has table metadata reference |
| modules | OK | MEDIUM | rendezvous relation label metadata detected |
| modules | OK | HIGH | Operational module detected: interventionsauto in src/runtime/modules/definitions/coreModules.ts, src/runtime/modules/ERPModule.ts, src/runtime/modules/generated/clientsauto/clientsauto.module.ts, src/runtime/modules/generated/facturesauto/facturesauto.module.ts, src/runtime/modules/generated/interventionsauto/index.ts, src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts, src/runtime/modules/generated/interventionsauto/interventionsauto.automation.ts, src/runtime/modules/generated/interventionsauto/interventionsauto.dashboard.ts, src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts, src/runtime/modules/generated/interventionsauto/interventionsauto.permissions.ts, src/runtime/modules/generated/interventionsauto/interventionsauto.workflows.ts, src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts, src/runtime/modules/generated/mouvementsstockauto/mouvementsstockauto.module.ts, src/runtime/modules/generated/rendezvous/rendezvous.module.ts, src/runtime/modules/generated/vehicules/vehicules.module.ts, src/runtime/modules/lifecycle/ERPRelationDataLoader.ts |
| modules | OK | HIGH | interventionsauto has operational metadata reference |
| modules | OK | MEDIUM | interventionsauto has table metadata reference |
| modules | OK | MEDIUM | interventionsauto relation label metadata detected |
| modules | OK | HIGH | Operational module detected: facturesauto in src/runtime/modules/definitions/coreModules.ts, src/runtime/modules/generated/clientsauto/clientsauto.module.ts, src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts, src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts, src/runtime/modules/generated/facturesauto/facturesauto.actions.ts, src/runtime/modules/generated/facturesauto/facturesauto.automation.ts, src/runtime/modules/generated/facturesauto/facturesauto.dashboard.ts, src/runtime/modules/generated/facturesauto/facturesauto.module.ts, src/runtime/modules/generated/facturesauto/facturesauto.permissions.ts, src/runtime/modules/generated/facturesauto/facturesauto.workflows.ts, src/runtime/modules/generated/facturesauto/index.ts, src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts, src/runtime/modules/generated/vehicules/vehicules.module.ts, src/runtime/modules/lifecycle/ERPRelationDataLoader.ts |
| modules | OK | HIGH | facturesauto has operational metadata reference |
| modules | OK | MEDIUM | facturesauto has table metadata reference |
| modules | OK | MEDIUM | facturesauto relation label metadata detected |
| cleanup | OK | HIGH | No Q2-N backup file detected |
| cleanup | OK | HIGH | No Q2-M backup file detected |

## Décision

Q2-N est **validé techniquement**. Passer à la revue visuelle manuelle sur les 5 routes opérationnelles.
