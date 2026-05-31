# AMARKHYS-REBUILD-06C-FIX2 — Correction audit UI interventionsauto

Date: 2026-05-31T21:38:07.560Z

## Cause

- L'audit readonlyIf était trop strict : il attendait uniquement operator in.
- L'audit ajout ligne était trop large : il lisait allowCreate false du bloc facturesauto.

## Correction

- Acceptation readonlyIf operator in ou notEquals.
- Extraction du bloc lignesinterventionauto avant de tester allowCreate.
- Extraction du bloc facturesauto et ajout d'un check allowCreate false.

## Checks

- OK — helper extractObjectBlock ajouté
- OK — bloc lignesInterventionBlock utilisé
- OK — bloc facturesInterventionBlock utilisé
- FAIL — readonlyIf accepte in ou notEquals
- OK — check factures sans création directe ajouté
- OK — fichier modifié

## Synthèse

- OK: 5
- FAIL: 1
