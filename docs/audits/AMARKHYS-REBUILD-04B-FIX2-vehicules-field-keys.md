# AMARKHYS-REBUILD-04B-FIX2 — Alignement clés champs vehicules

Date: 2026-05-31T15:39:01.413Z

## Cause

ERPModuleField n'accepte pas la propriété name. Les champs ajoutés doivent utiliser key.

## Correction

- name: energie -> key: energie
- name: dateFinGarantie -> key: dateFinGarantie

## Checks

- OK — champ energie utilise key
- OK — champ dateFinGarantie utilise key
- OK — fichier modifié

## Synthèse

- OK: 3
- FAIL: 0
