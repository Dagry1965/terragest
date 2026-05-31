# AMARKHYS-REBUILD-05C-FIX1 — Neutralisation handler businessStatusAction

Date: 2026-05-31T16:41:21.239Z

## Cause

Après neutralisation de getBusinessStatusAction(), TypeScript déduit que l'action est never dans handleBusinessStatusAction().

## Correction

handleBusinessStatusAction() devient un no-op. Les actions métier doivent passer par ERPRuntimePage / ERPRuntimeActionBar.

## Checks

- OK — handleBusinessStatusAction neutralisé
- OK — ancienne référence confirmMessage supprimée du handler
- OK — ancienne mutation nextStatus supprimée du handler
- OK — fichier modifié

## Synthèse

- OK: 4
- FAIL: 0
