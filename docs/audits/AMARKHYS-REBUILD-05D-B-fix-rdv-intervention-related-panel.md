# AMARKHYS-REBUILD-05D-B — Correction panneau RDV intervention

Date: 2026-05-31T17:25:13.790Z

## Décision métier

- Un RDV ne doit pas être l'espace de composition d'une intervention.
- Un RDV peut afficher l'intervention liée en lecture/detail.
- La création d'intervention doit passer par une action runtime contrôlée.
- Une intervention peut porter plusieurs lignes d'intervention.

## Correction appliquée

- displayIn: ["detail", "edit"] -> displayIn: ["detail"]
- allowCreate: true -> allowCreate: false

## Checks

- OK — bloc interventions-rendezvous présent
- OK — panneau affiché uniquement en detail
- OK — création désactivée depuis le panneau
- OK — ancien affichage edit supprimé du bloc
- OK — fichier modifié

## Synthèse

- OK: 5
- FAIL: 0
