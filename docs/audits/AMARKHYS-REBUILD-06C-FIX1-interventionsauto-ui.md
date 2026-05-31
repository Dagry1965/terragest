# AMARKHYS-REBUILD-06C-FIX1 — Correction UI interventionsauto

Date: 2026-05-31T21:33:50.785Z

## Corrections appliquées

- Verrouillage robuste du statut intervention via readonlyIf notEquals.
- Ajout de mecanicienId aux layouts visibles.
- Ajout de montantHT / montantTTC aux layouts visibles.
- Verrouillage des montants calculés et du contexte hérité.
- Kilométrage explicitement non verrouillé.
- Désactivation de la création facture depuis le panneau enfant facturesauto.

## Règle métier

- Une intervention peut avoir une facture, mais la facture doit être créée par action runtime contrôlée.
- Le panneau facture sert à consulter/ouvrir, pas à créer librement.

## Checks

- OK — statut verrouillé avec readonlyIf notEquals
- OK — mecanicienId présent dans le module
- OK — mecanicienId présent dans les layouts
- OK — montantHT présent dans les layouts
- OK — montantTTC présent dans les layouts
- OK — montants verrouillés
- OK — kilometrage non verrouillé
- OK — panneau factures sans création directe
- FAIL — fichier modifié

## Synthèse

- OK: 8
- FAIL: 1
