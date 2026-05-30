# Q2-OP-I17-C1 — Préparation test d’exécution actions runtime

Objectif : choisir une action runtime à exécuter sur fiche de test, en limitant les risques métier.

## Résumé

- OK : 28
- WARN : 0
- WARN HIGH : 0
- FAIL : 0
- FAIL HIGH : 0

## Actions candidates

| Module | Action | Risque | Recommandation |
|---|---|---:|---|
| rendezvous | reporter-rdv | MEDIUM | Ne pas exécuter sans scénario de report préparé. |
| interventionsauto | demarrer-intervention | LOW | Action candidate pour premier test si l'intervention est une fiche de test. |
| facturesauto | envoyer-facture | LOW | Action candidate si la facture est une fiche de test. |
| facturesauto | annuler-facture | HIGH | Ne pas exécuter sur une facture réelle. |
| commandesstockauto | envoyer-commande | LOW | Action candidate si commande de test. |
| commandesstockauto | annuler-commande | HIGH | Ne pas exécuter sur une commande réelle. |
| receptionsstockauto | valider-reception | HIGH | Ne pas exécuter sauf réception de test, car peut créer mouvement stock. |

## Premier test recommandé

1. `interventionsauto.demarrer-intervention` sur une intervention de test, si disponible.
2. Sinon `facturesauto.envoyer-facture` sur une facture de test.
3. Sinon `commandesstockauto.envoyer-commande` sur une commande de test.

Ne pas commencer par `receptionsstockauto.valider-reception`, car cette action peut impacter le stock.

## Checks

| Area | Status | Severity | File | Lines | Message |
|---|---:|---:|---|---|---|
| file | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | src/components/erp/runtime/ERPRuntimePage.tsx found |
| file | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` |  | src/components/erp/runtime/ERPRuntimeActionBar.tsx found |
| file | OK | HIGH | `src/runtime/actions/RuntimeActionEngine.ts` |  | src/runtime/actions/RuntimeActionEngine.ts found |
| execution-chain | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 214 | RuntimeActionEngine.execute found |
| execution-chain | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 208, 457 | handleRuntimeAction found |
| execution-chain | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 457 | void handleRuntimeAction found |
| execution-chain | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 230 | RuntimeDataBinding.detail found |
| execution-chain | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 236 | setCurrentRecord(freshRecord) found |
| actionbar-capability | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` | 95 | action.onClick found |
| actionbar-capability | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` | 81, 83 | action.href found |
| actionbar-capability | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` | 19, 37, 57, 78, 81, 93, 93 | disabled found |
| engine-capability | OK | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` | 43 | getAvailableActions found |
| engine-capability | OK | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` | 103, 232 | execute found |
| engine-capability | OK | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` | 82, 87 | runtimeOnly found |
| candidate-action | OK | LOW | `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts` |  | rendezvous.reporter-rdv found risk=MEDIUM |
| candidate-runtime-contract | OK | MEDIUM | `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts` |  | rendezvous.reporter-rdv runtimeOnly available in action source |
| candidate-action | OK | LOW | `src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts` |  | interventionsauto.demarrer-intervention found risk=LOW |
| candidate-runtime-contract | OK | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts` |  | interventionsauto.demarrer-intervention runtimeOnly available in action source |
| candidate-action | OK | LOW | `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` |  | facturesauto.envoyer-facture found risk=LOW |
| candidate-runtime-contract | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` |  | facturesauto.envoyer-facture runtimeOnly available in action source |
| candidate-action | OK | LOW | `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` |  | facturesauto.annuler-facture found risk=HIGH |
| candidate-runtime-contract | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` |  | facturesauto.annuler-facture runtimeOnly available in action source |
| candidate-action | OK | LOW | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` |  | commandesstockauto.envoyer-commande found risk=LOW |
| candidate-runtime-contract | OK | MEDIUM | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` |  | commandesstockauto.envoyer-commande runtimeOnly available in action source |
| candidate-action | OK | LOW | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` |  | commandesstockauto.annuler-commande found risk=HIGH |
| candidate-runtime-contract | OK | MEDIUM | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` |  | commandesstockauto.annuler-commande runtimeOnly available in action source |
| candidate-action | OK | LOW | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` |  | receptionsstockauto.valider-reception found risk=HIGH |
| candidate-runtime-contract | OK | MEDIUM | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` |  | receptionsstockauto.valider-reception runtimeOnly available in action source |