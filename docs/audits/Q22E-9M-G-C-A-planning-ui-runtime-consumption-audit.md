# Q22E-9M-G-C-A — Planning UI runtime consumption audit

## Objectif

Vérifier que `ERPSchedulingPlanningView` consomme les slots calculés par le runtime/policy sans recalculer duration, buffer ou capacity.

## Doctrine

La vue affiche. Le runtime calcule. La policy résout. Les metadata déclarent.

## Résumé

- Checks : 7
- OK : 7
- FAIL : 0
- FAIL_HIGH : 0
- FAIL_INFO : 0

## FAIL HIGH — à corriger avant test UI manuel

_Aucun élément._


## FAIL INFO — non bloquant

_Aucun élément._


## Tous les checks

| Statut | Sévérité | Check | Message |
|---|---|---|---|
| OK | HIGH | VIEW_CALLS_RUNTIME_SLOTS | La vue consomme le runtime pour les slots. |
| OK | HIGH | VIEW_NO_VISIBLE_DURATION_HELPER | La vue ne contient plus de helper local de résolution de durée. |
| OK | HIGH | VIEW_NO_ENGINE_DURATION_FALLBACK | La vue ne dépend plus du fallback RuntimeSchedulingEngine.defaultDurationMinutes. |
| OK | HIGH | VIEW_NO_DIRECT_BUFFER_CONFIG | La vue ne transmet plus directement bufferMinutes. |
| OK | HIGH | VIEW_NO_DIRECT_DURATION_CONFIG | La vue ne lit plus directement duration/defaultDuration/slotDuration depuis schedulingConfig. |
| OK | INFO | VIEW_CAPACITY_DISPLAY_ALLOWED | La vue affiche capacity/remainingCapacity comme information UI. |
| OK | HIGH | VIEW_NO_AMARKHYS_HARDCODE | La vue ne contient pas de hardcode AMARKHYS/garage. |


## Décision attendue

- Si FAIL_HIGH = 0 : la vue planning est acceptable pour test manuel.
- Si FAIL_HIGH > 0 : corriger avant test manuel.
