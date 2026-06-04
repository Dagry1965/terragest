# BILLING-MODEL-D-D3-D — Réparation lignes facture manquantes

## Objectif

Créer uniquement les lignes facture manquantes pour les scénarios D-D1 et D-D2, sans recréer les factures existantes.

## Résultat

- billing-dd1-intervention: SKIP_LINES_ALREADY_EXIST / factureId=nn2TuMyENRGsTaSdNetb
- billing-dd2-intervention: SKIP_LINES_ALREADY_EXIST / factureId=44IAN32iggv1kRk61VB4

## Garde-fous

- Aucune facture n'est créée par cette passe.
- Les lignes sont créées uniquement si une facture active unique existe.
- Les lignes existantes ne sont pas dupliquées.
- Chaque ligne facture reçoit le contexte parent `facturesauto`.
