# Q22E-9M-G-A — Scheduling policy slots smoke test

## Objectif

Valider que la règle métier attendue 60 minutes + 15 minutes de buffer produit des slots bloqués de 75 minutes.

## Résultat

- Policy présente : OK
- Engine branché sur policy : OK
- Durée visible : 60 minutes
- Buffer : 15 minutes
- Durée bloquée : 75 minutes

## Plages attendues

- 08:00 - 09:15
- 09:15 - 10:30
- 10:30 - 11:45
- 11:45 - 13:00

## Décision

Le comportement attendu doit être porté par SchedulingSlotPolicy + RuntimeSchedulingEngine, pas par ERPSchedulingPlanningView.
