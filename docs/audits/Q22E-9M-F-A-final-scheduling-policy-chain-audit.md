# Q22E-9M-F-A — Final scheduling policy chain audit

## Objectif

Vérifier la chaîne finale settings → policy → engine → guard → vue avant tests fonctionnels du planning.

## Doctrine

Les settings/résolveurs fournissent la configuration effective. La policy résout duration, buffer, capacity et status policy. Le moteur calcule. Les guards protègent. La vue affiche.

## Résumé

- Checks : 14
- OK : 14
- FAIL : 0
- FAIL HIGH : 0
- FAIL REVIEW : 0
- FAIL INFO : 0

## FAIL HIGH — à corriger avant tests fonctionnels

_Aucun élément._


## FAIL REVIEW — à classer

_Aucun élément._


## FAIL INFO — informatif

_Aucun élément._


## Tous les checks

| Statut | Sévérité | Check | Fichier | Message |
|---|---|---|---|---|
| OK | HIGH | POLICY_FILE_EXISTS | `src/runtime/scheduling/SchedulingSlotPolicy.ts` | SchedulingSlotPolicyResolver existe. |
| OK | HIGH | POLICY_EXPORTED | `src/runtime/scheduling/index.ts` | SchedulingSlotPolicy est exportée par le barrel scheduling. |
| OK | HIGH | ENGINE_CONSUMES_POLICY | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | RuntimeSchedulingEngine consomme SchedulingSlotPolicyResolver. |
| OK | HIGH | GUARD_CONSUMES_POLICY | `src/runtime/guards/processRuntimeBeforeMutationGuards.ts` | processRuntimeBeforeMutationGuards consomme SchedulingSlotPolicyResolver. |
| OK | HIGH | VIEW_NO_DURATION_HELPER | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | La vue ne contient plus getVisibleSchedulingDurationMinutes. |
| OK | HIGH | VIEW_NO_ENGINE_DEFAULT_DURATION | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | La vue ne dépend plus de RuntimeSchedulingEngine.defaultDurationMinutes. |
| OK | HIGH | VIEW_NO_DIRECT_BUFFER | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | La vue ne transmet plus bufferMinutes directement. |
| OK | REVIEW | ENGINE_NO_LOCAL_NON_BLOCKING_CONSTANT | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | Le moteur ne porte plus la constante locale non-blocking statuses. |
| OK | HIGH | ENGINE_USES_POLICY_NON_BLOCKING | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | Le moteur utilise la policy pour les statuts non bloquants. |
| OK | HIGH | GUARD_NO_LOCAL_CAPACITY_CALC | `src/runtime/guards/processRuntimeBeforeMutationGuards.ts` | Le guard ne recalcule plus localement capacity. |
| OK | HIGH | GUARD_NO_LOCAL_NORMALIZED_DURATION_CALC | `src/runtime/guards/processRuntimeBeforeMutationGuards.ts` | Le guard ne recalcule plus localement normalizedRecord.durationMinutes. |
| OK | HIGH | GUARD_USES_POLICY_BUFFER | `src/runtime/guards/processRuntimeBeforeMutationGuards.ts` | Le guard transmet slotPolicy.bufferMinutes au moteur. |
| OK | REVIEW | SETTINGS_ENGINE_HAS_EFFECTIVE_CONFIG | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | Settings engine couvre duration, buffer, capacity et openingHoursProfile. |
| OK | INFO | RENDEZVOUS_MODULE_METADATA_CONSUMER | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | rendezvous.module.ts reste consommateur metadata scheduling. |


## Décision attendue

- Si FAIL HIGH = 0 : chaîne scheduling policy acceptable pour tests fonctionnels.
- Si FAIL HIGH > 0 : corriger avant tests UI.
- Les REVIEW peuvent devenir des passes ultérieures si non bloquantes.
