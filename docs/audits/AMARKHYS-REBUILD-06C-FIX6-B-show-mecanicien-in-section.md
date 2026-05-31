# AMARKHYS-REBUILD-06C-FIX6-B — Afficher mecanicienId dans section réelle

Date: 2026-05-31T22:07:04.725Z

## Cause

mecanicienId existait dans schema.fields et dans tab.fields, mais pas dans la section infos.fields rendue par ERPEnterpriseForm.

## Correction

- Ajout de mecanicienId dans la section infos après rendezVousId.
- Alignement éventuel de la section contexte si présente.

## Checks

- OK — mecanicienId existe dans schema.fields
- OK — mecanicienId ajouté dans section infos
- OK — mecanicienId placé après rendezVousId dans infos
- OK — fichier modifié

## Synthèse

- OK: 4
- FAIL: 0
