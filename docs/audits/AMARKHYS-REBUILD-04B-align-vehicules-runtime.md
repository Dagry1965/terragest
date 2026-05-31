# AMARKHYS-REBUILD-04B — Alignement runtime vehicules

Date: 2026-05-31T15:33:09.426Z

## Corrections appliquées

- Création / remplissage de vehicules.actions.ts.
- Branchement de vehiculesActions dans vehicules.module.ts.
- Ajout des champs energie et dateFinGarantie si absents.
- Retrait de l'action Archiver vehicule hardcodée dans ERPEnterpriseForm.

## Checks

- OK — vehicules.actions.ts contient 7 actions
- OK — vehicules.module.ts importe vehiculesActions
- OK — vehicules.module.ts référence actions: vehiculesActions
- OK — champ energie présent
- OK — champ dateFinGarantie présent
- OK — action véhicule retirée de ERPEnterpriseForm
- OK — actions véhicule restent hors ERPEnterpriseForm

## Synthèse

- OK: 7
- FAIL: 0
