# AMARKHYS-REBUILD-07B — Fix lignesinterventionauto FAILs

Date: 2026-05-31T22:43:38.779Z

## Corrections

- Ajout de dependsOn: produitId sur stockId.
- Ajout des champs techniques removedAt / removedBy / removedReason.
- Verrouillage des champs techniques de retrait.
- Conservation des statuts utilisateur brouillon / validée uniquement.

## Checks

- OK — stockId dépend de produitId
- OK — stockId conserve relation stocksauto
- OK — removedAt présent
- OK — removedBy présent
- OK — removedReason présent
- OK — champs techniques retrait verrouillés
- OK — statuts utilisateur restent brouillon / validee
- OK — fichier modifié

## Synthèse

- OK: 8
- FAIL: 0
