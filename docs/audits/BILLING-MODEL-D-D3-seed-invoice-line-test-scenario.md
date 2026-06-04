# BILLING-MODEL-D-D3 — Seed scénario test facturation

## Résultat

- Intervention test : `billing-dd3-intervention`
- Client utilisé : `demo-client-new-001`
- Véhicule utilisé : `demo-vehicle-new-001`
- Lignes intervention créées : 2
- Factures liées au départ : 0
- Montant HT : 65000
- Montant TVA : 11700
- Montant TTC : 76700

## Garde-fous

- Le scénario porte `billingModelTestScenario = D-D3`.
- L'intervention reste `en_cours` après seed.
- Le script refuse de continuer si une facture existe déjà pour cette intervention.
- La génération facture/lignes facture doit être déclenchée ensuite par le runtime applicatif en passant l'intervention à `terminee`.

## Prochaine étape

BILLING-MODEL-D-D3 : passer l'intervention `billing-dd3-intervention` à `terminee` via l'application, puis vérifier `facturesauto` et `lignesfactureauto`.
