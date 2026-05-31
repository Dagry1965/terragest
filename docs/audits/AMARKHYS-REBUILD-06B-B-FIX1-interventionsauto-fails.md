# AMARKHYS-REBUILD-06B-B-FIX1 — Fix interventionsauto FAILs

Date: 2026-05-31T20:59:09.912Z

## Corrections appliquées

- Verrouillage du statut intervention via readonlyIf.
- Ajout du champ mecanicienId comme mécanicien responsable réel.
- Ajout du champ montantHT après coutTotal.
- Conservation de coutTotal comme legacy/fallback existant.
- Verrouillage des champs hérités et calculés via readOnlyFields.

## Checks

- OK — statut verrouillé avec readonlyIf
- OK — mecanicienId ajouté
- OK — montantHT ajouté
- OK — coutTotal conservé comme legacy
- OK — montantHT ajouté aux layouts
- OK — montantHT verrouillé dans readOnlyFields
- OK — contexte hérité verrouillé
- OK — fichier modifié

## Synthèse

- OK: 8
- FAIL: 0
