# AMARKHYS-REBUILD-05E-B-FIX1 — Statut RDV readonlyIf

Date: 2026-05-31T19:52:16.329Z

## Cause

ERPModuleField n'accepte pas readOnly/locked. Le contrat expose readonlyIf.

## Correction

- Suppression de readOnly: true.
- Suppression de locked: true.
- Ajout de readonlyIf sur le champ statut.

## Checks

- OK — champ statut présent
- OK — readOnly supprimé
- OK — locked supprimé
- OK — readonlyIf présent
- OK — readonlyIf couvre tous les statuts RDV
- OK — helperText conservé
- OK — fichier modifié

## Synthèse

- OK: 7
- FAIL: 0
