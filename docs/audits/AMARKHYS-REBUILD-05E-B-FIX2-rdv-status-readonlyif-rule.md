# AMARKHYS-REBUILD-05E-B-FIX2 — Correction readonlyIf statut RDV

Date: 2026-05-31T19:57:35.877Z

## Cause

ERPConditionalRule utilise operator + value/values. La clé directe in n'est pas valide.

## Correction

- readonlyIf.field = statut
- readonlyIf.operator = in
- readonlyIf.values = tous les statuts RDV

## Checks

- OK — champ statut présent
- OK — readonlyIf utilise operator in
- OK — readonlyIf utilise values
- OK — ancienne clé in supprimée
- OK — readOnly/locked invalides supprimés
- OK — helperText conservé
- OK — fichier modifié

## Synthèse

- OK: 7
- FAIL: 0
