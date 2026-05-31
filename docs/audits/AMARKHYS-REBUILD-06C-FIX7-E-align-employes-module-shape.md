# AMARKHYS-REBUILD-06C-FIX7-E — Align employes module shape

Date: 2026-05-31T22:18:47.086Z

## Correction

- Suppression de key/label/collection au niveau racine.
- Déplacement de key/label dans metadata.
- Conservation de schema.collection.
- Conservation des champs employés.

## Checks

- OK — pas de key racine
- FAIL — metadata.key présent
- FAIL — metadata.label présent
- FAIL — schema.collection présent
- OK — fields présents
- OK — satisfies ERPModule conservé

## Synthèse

- OK: 3
- FAIL: 3
