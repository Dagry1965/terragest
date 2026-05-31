# AMARKHYS-REBUILD-05E-B — Verrouillage champ statut RDV

Date: 2026-05-31T19:49:31.833Z

## Décision ERP

- Le statut RDV est un état de processus.
- Il doit rester visible mais ne doit pas être modifié librement.
- Les changements de statut passent par les actions runtime.

## Correction appliquée

- Ajout de readOnly: true sur le champ statut.
- Ajout de locked: true sur le champ statut.
- Ajout d'un helperText explicite.

## Checks

- OK — champ statut présent
- OK — champ statut en readOnly
- OK — champ statut marqué locked
- OK — helperText statut présent
- OK — statuts conservés
- OK — fichier modifié

## Synthèse

- OK: 6
- FAIL: 0
