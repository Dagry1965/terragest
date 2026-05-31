# AMARKHYS-REBUILD-05E-C-FIX1 — Déplacement readonlyIfFields

Date: 2026-05-31T20:09:23.520Z

## Cause

readonlyIfFields était calculé avant la déclaration de visibleFields.

## Correction

- Déplacement de readonlyIfFields juste après visibleFields.
- Conservation de l'injection dans readOnlyFields.

## Checks

- OK — readonlyIfFields présent
- OK — visibleFields présent
- OK — readonlyIfFields placé après visibleFields
- OK — readonlyIfFields placé avant lockedFields si lockedFields existe après
- OK — readonlyIfFields injecté dans readOnlyFields
- OK — fichier modifié

## Synthèse

- OK: 6
- FAIL: 0
