# AMARKHYS-REBUILD-06C — UI audit interventionsauto

Date: 2026-05-31T22:01:47.437Z

## Synthèse

- OK: 17
- FAIL: 0

## Checks metadata/UI

- OK — interventionsauto.module.ts existe
- OK — champ statut présent
- OK — statut verrouillé par readonlyIf
- OK — mecanicienId présent
- OK — mecanicienId relation employes
- OK — montantHT présent
- OK — montantHT verrouillé dans readOnlyFields
- OK — montantTTC verrouillé dans readOnlyFields
- OK — coutTotal conservé
- OK — coutTotal verrouillé dans readOnlyFields
- OK — clientId verrouillé dans readOnlyFields
- OK — vehiculeId verrouillé dans readOnlyFields
- OK — rendezVousId verrouillé dans readOnlyFields
- OK — panneau lignes intervention déclaré
- OK — ajout ligne depuis intervention autorisé
- OK — panneau factures sans création directe
- OK — ERPEnterpriseForm applique readonlyIf générique

## Contrôle manuel attendu

- /interventionsauto/[id]/edit : statut visible mais non modifiable.
- /interventionsauto/[id]/edit : mecanicienId visible/utilisable.
- /interventionsauto/[id]/edit : clientId, vehiculeId, rendezVousId verrouillés si hérités.
- /interventionsauto/[id]/edit : montantHT, montantTTC, coutTotal non modifiables.
- /interventionsauto/[id]/edit : panneau lignes visible et ajout ligne possible.
- /interventionsauto/[id]/edit : panneau factures consultable mais sans création directe.
