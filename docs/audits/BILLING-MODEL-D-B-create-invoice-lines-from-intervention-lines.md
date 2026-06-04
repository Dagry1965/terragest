# BILLING-MODEL-D-B — Création des lignes facture depuis lignes intervention

## Résultat

- Le flux `intervention terminée → facture` dans `runtimeBusinessRules.ts` est renforcé.
- Après création de `facturesauto`, le runtime tente de récupérer l'identifiant de la facture créée.
- Les lignes `lignesinterventionauto` sont filtrées strictement par `interventionId`.
- Une ligne `lignesfactureauto` est créée par ligne intervention facturable.
- Aucun fallback global n'est introduit.

## Garde-fous

- Si `factureIdForLines` est introuvable, aucune ligne facture n'est créée.
- Si `lignesinterventionauto` ou `lignesfactureauto` est absent du registry, aucune ligne facture n'est créée.
- Les lignes retirées ou annulées sont ignorées.
- L'anti-doublon facture existant reste conservé.

## Prochaine étape

BILLING-MODEL-D-C : build, audit statique ciblé, puis test fonctionnel sur intervention terminée.
