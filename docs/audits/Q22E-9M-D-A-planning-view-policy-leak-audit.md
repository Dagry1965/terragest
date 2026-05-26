# Q22E-9M-D-A — Planning view policy leak audit

## Objectif

Identifier précisément ce que `ERPSchedulingPlanningView` calcule encore alors que cela devrait venir du runtime ou de `SchedulingSlotPolicy`.

## Doctrine

La vue affiche. Elle ne résout pas duration, buffer, capacity, policy ni fallback engine.

## Résumé

- Findings : 8
- HIGH : 0
- REVIEW : 6
- INFO : 2

## Findings HIGH — à sortir de la vue

_Aucun finding._


## Findings REVIEW — affichage ou logique à classer

| Sévérité | Cible | Ligne | Extrait | Décision |
|---|---|---:|---|---|
| REVIEW | capacity | 561 | `capacity: schedulingConfig.capacity,` | Acceptable si affichage de slot.capacity, suspect si calcul/config. |
| REVIEW | capacity | 561 | `capacity: schedulingConfig.capacity,` | Acceptable si affichage de slot.capacity, suspect si calcul/config. |
| REVIEW | capacity | 793 | `? slot.remainingCapacity !== undefined && slot.capacity && slot.capacity > 1` | Acceptable si affichage de slot.capacity, suspect si calcul/config. |
| REVIEW | capacity | 793 | `? slot.remainingCapacity !== undefined && slot.capacity && slot.capacity > 1` | Acceptable si affichage de slot.capacity, suspect si calcul/config. |
| REVIEW | capacity | 793 | `? slot.remainingCapacity !== undefined && slot.capacity && slot.capacity > 1` | Acceptable si affichage de slot.capacity, suspect si calcul/config. |
| REVIEW | capacity | 794 | `? slot.remainingCapacity + " place(s) restante(s)"` | Acceptable si affichage de slot.capacity, suspect si calcul/config. |


## Findings INFO — affichage probablement acceptable

| Sévérité | Cible | Ligne | Extrait | Décision |
|---|---|---:|---|---|
| INFO | remainingCapacity | 793 | `? slot.remainingCapacity !== undefined && slot.capacity && slot.capacity > 1` | Affichage UI acceptable si déjà calculé par runtime. |
| INFO | remainingCapacity | 794 | `? slot.remainingCapacity + " place(s) restante(s)"` | Affichage UI acceptable si déjà calculé par runtime. |


## Décision attendue

- Supprimer les helpers de résolution runtime dans la vue.
- Garder les affichages de valeurs déjà résolues.
- Remplacer les dépendances directes au fallback engine.
- Ne pas déplacer de logique vers AMARKHYS.
