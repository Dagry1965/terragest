# AMARKHYS-REBUILD-06C-FIX5 — Gouvernance générique des children readonly

Date: 2026-05-31T22:01:47.280Z

## Règle générique appliquée

- Un child readonly / document généré par action runtime contrôlée ne s'affiche pas en edit.
- Il peut rester consultable en detail.
- Il ne doit pas afficher de création libre.

## Application interventionsauto

- lignesinterventionauto reste visible en detail/edit avec ajout de ligne.
- facturesauto reste consultable en detail uniquement.
- facturesauto est readonly et sans création libre.
- dateIntervention et kilometrage sont modifiables.
- mecanicienId est renforcé dans les metadata formulaire.

## Checks

- OK — dateIntervention non verrouillée
- OK — kilometrage non verrouillé
- OK — mecanicienId existe
- OK — mecanicienId dans metadata form
- OK — facturesauto reste relation consultable
- OK — facturesauto absent du edit via displayIn detail only
- OK — facturesauto readonly
- OK — facturesauto sans création libre
- OK — lignesinterventionauto visible detail/edit
- OK — lignesinterventionauto conserve Ajouter une ligne
- OK — montants restent verrouillés
- OK — contexte hérité reste verrouillé
- OK — fichier modifié

## Synthèse

- OK: 13
- FAIL: 0
