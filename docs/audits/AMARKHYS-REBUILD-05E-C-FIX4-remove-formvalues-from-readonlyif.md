# AMARKHYS-REBUILD-05E-C-FIX4 — Retrait formValues de readonlyIfFields

Date: 2026-05-31T20:17:41.572Z

## Cause

readonlyIfFields était calculé avant l'initialisation de formValues.

## Correction

- readonlyIfFields utilise initialData uniquement.
- Cela suffit pour verrouiller les champs en edit selon l'état courant du record.
- Pas de patch local rendezvous.

## Checks

- OK — readonlyIfFields présent
- FAIL — readonlyIfFields n'utilise plus formValues
- OK — readonlyIfFields utilise initialData
- OK — evaluateERPConditionalRule conservé
- OK — fichier modifié

## Synthèse

- OK: 4
- FAIL: 1
