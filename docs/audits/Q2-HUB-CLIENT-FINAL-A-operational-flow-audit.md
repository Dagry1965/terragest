# Q2-HUB-CLIENT-FINAL-A — Audit parcours opérationnel fiche client

Objectif : vérifier les briques existantes avant de finaliser le parcours Client → Véhicule → RDV → Intervention → Lignes → Facture → Encaissements.

## Principe confirmé

- Les “tableaux” attendus sont des listes runtime/opérationnelles.
- Ne pas recréer de tableau local.
- Réutiliser les listes et composants génériques déjà réalisés.
- Affiner progressivement le hub client sans casser la généricité ERP.

## Résumé

- OK : 15
- WARN : 21
- WARN HIGH : 0
- FAIL : 0
- FAIL HIGH : 0

## Checks

| Area | Status | Severity | File | Lines | Message |
|---|---:|---:|---|---|---|
| file | OK | LOW | `src/app/(private)/clientsauto/hub/page.tsx` |  | src/app/(private)/clientsauto/hub/page.tsx found |
| file | WARN | MEDIUM | `src/components/amarkhys/hub/ClientOperationalHubClient.tsx` |  | src/components/amarkhys/hub/ClientOperationalHubClient.tsx missing |
| file | OK | LOW | `src/runtime/hub/RuntimeClientOperationalHubLoader.ts` |  | src/runtime/hub/RuntimeClientOperationalHubLoader.ts found |
| file | OK | LOW | `src/components/erp/hub/ERPRecordHubPage.tsx` |  | src/components/erp/hub/ERPRecordHubPage.tsx found |
| file | WARN | MEDIUM | `src/components/erp/hub/ERPRecordHub.tsx` |  | src/components/erp/hub/ERPRecordHub.tsx missing |
| file | OK | LOW | `src/components/erp/hub/ERPRecordHubSelectedDetails.tsx` |  | src/components/erp/hub/ERPRecordHubSelectedDetails.tsx found |
| file | WARN | MEDIUM | `src/runtime/hub/RuntimeOperationalChildrenResolver.ts` |  | src/runtime/hub/RuntimeOperationalChildrenResolver.ts missing |
| server-client-boundary | WARN | MEDIUM | `src/app/(private)/clientsauto/hub/page.tsx` |  | ClientOperationalHubClient not found |
| server-client-boundary | OK | MEDIUM | `src/app/(private)/clientsauto/hub/page.tsx` | 7, 204, 206, 206 | searchParams found |
| server-client-boundary | OK | MEDIUM | `src/app/(private)/clientsauto/hub/page.tsx` | 8, 9, 18, 46, 49, 76, 88, 99, 109, 119, 128, 131, 138, 147, 157, 166, 176, 185, 195, 207, 207, 208, 208, 210, 251, 251, 291, 291, 292, 292 | id found |
| client-hub-state | WARN | MEDIUM | `src/components/amarkhys/hub/ClientOperationalHubClient.tsx` |  | selectedVehicle not found |
| client-hub-state | WARN | MEDIUM | `src/components/amarkhys/hub/ClientOperationalHubClient.tsx` |  | selectedVehicleId not found |
| client-hub-state | WARN | MEDIUM | `src/components/amarkhys/hub/ClientOperationalHubClient.tsx` |  | selectedRendezVous not found |
| client-hub-state | WARN | MEDIUM | `src/components/amarkhys/hub/ClientOperationalHubClient.tsx` |  | selectedIntervention not found |
| client-hub-state | WARN | MEDIUM | `src/components/amarkhys/hub/ClientOperationalHubClient.tsx` |  | useState not found |
| client-hub-state | WARN | MEDIUM | `src/components/amarkhys/hub/ClientOperationalHubClient.tsx` |  | onClick not found |
| runtime-loader | OK | MEDIUM | `src/runtime/hub/RuntimeClientOperationalHubLoader.ts` | 2, 2, 2, 461, 465 | clientsauto found |
| runtime-loader | OK | MEDIUM | `src/runtime/hub/RuntimeClientOperationalHubLoader.ts` | 3, 3, 3, 397, 398, 486 | vehicules found |
| runtime-loader | OK | MEDIUM | `src/runtime/hub/RuntimeClientOperationalHubLoader.ts` | 4, 4, 4, 184, 290, 419, 425, 443, 487, 608, 637 | rendezvous found |
| runtime-loader | OK | MEDIUM | `src/runtime/hub/RuntimeClientOperationalHubLoader.ts` | 5, 5, 5, 488 | interventionsauto found |
| runtime-loader | OK | MEDIUM | `src/runtime/hub/RuntimeClientOperationalHubLoader.ts` | 6, 6, 6, 489 | lignesinterventionauto found |
| runtime-loader | OK | MEDIUM | `src/runtime/hub/RuntimeClientOperationalHubLoader.ts` | 7, 7, 7, 490 | facturesauto found |
| runtime-loader | OK | MEDIUM | `src/runtime/hub/RuntimeClientOperationalHubLoader.ts` | 8, 8, 8, 491 | encaissementsauto found |
| generic-hub-components | WARN | MEDIUM | `src/components/erp/hub/ERPRecordHub.tsx` |  | children not found |
| generic-hub-components | WARN | MEDIUM | `src/components/erp/hub/ERPRecordHub.tsx` |  | selectedRecord not found |
| generic-hub-components | WARN | MEDIUM | `src/components/erp/hub/ERPRecordHub.tsx` |  | onSelect not found |
| generic-hub-components | WARN | MEDIUM | `src/components/erp/hub/ERPRecordHub.tsx` |  | records not found |
| selected-details | OK | MEDIUM | `src/components/erp/hub/ERPRecordHubSelectedDetails.tsx` | 65, 71, 82, 82, 86 | selectedRecord found |
| selected-details | WARN | MEDIUM | `src/components/erp/hub/ERPRecordHubSelectedDetails.tsx` |  | secondary not found |
| selected-details | OK | MEDIUM | `src/components/erp/hub/ERPRecordHubSelectedDetails.tsx` | 63, 69, 73 | details found |
| selected-details | WARN | MEDIUM | `src/components/erp/hub/ERPRecordHubSelectedDetails.tsx` |  | children not found |
| children-resolver | WARN | MEDIUM | `src/runtime/hub/RuntimeOperationalChildrenResolver.ts` |  | parent not found |
| children-resolver | WARN | MEDIUM | `src/runtime/hub/RuntimeOperationalChildrenResolver.ts` |  | children not found |
| children-resolver | WARN | MEDIUM | `src/runtime/hub/RuntimeOperationalChildrenResolver.ts` |  | moduleKey not found |
| children-resolver | WARN | MEDIUM | `src/runtime/hub/RuntimeOperationalChildrenResolver.ts` |  | foreignKey not found |
| children-resolver | WARN | MEDIUM | `src/runtime/hub/RuntimeOperationalChildrenResolver.ts` |  | recordId not found |

## Décision de suite

La prochaine passe doit brancher ou renforcer le parcours central sans créer de nouveau système local :

1. Agrandir les KPI haut gauche.
2. Stabiliser la sélection véhicule.
3. Afficher la liste RDV filtrée par véhicule.
4. Sélectionner un RDV.
5. Afficher la liste interventions filtrée par RDV.
6. Afficher lignes, facture et encaissements depuis l’intervention sélectionnée.
7. Synchroniser le panneau droit avec la sélection courante.