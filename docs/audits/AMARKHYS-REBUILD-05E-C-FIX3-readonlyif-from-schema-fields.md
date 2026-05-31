# AMARKHYS-REBUILD-05E-C-FIX3 — readonlyIf depuis module.schema.fields

Date: 2026-05-31T20:12:59.711Z

## Cause

readOnlyFields est déclaré avant visibleFields dans ERPEnterpriseForm. readonlyIfFields ne doit donc pas dépendre de visibleFields.

## Correction

- readonlyIfFields est calculé depuis module.schema.fields.
- readonlyIfFields est placé avant readOnlyFields.
- Injection dans readOnlyFields conservée.

## Checks

- OK — readonlyIfFields présent
- OK — readOnlyFields présent
- OK — readonlyIfFields placé avant readOnlyFields
- OK — readonlyIfFields utilise module.schema.fields
- OK — readonlyIfFields injecté dans readOnlyFields
- FAIL — readonlyIfFields ne dépend plus de visibleFields
- OK — fichier modifié

## Synthèse

- OK: 6
- FAIL: 1
