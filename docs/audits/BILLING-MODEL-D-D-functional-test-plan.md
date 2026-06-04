# BILLING-MODEL-D-D — Plan de test fonctionnel

## Précontrôles statiques

- OK — business rule creates invoice header
- OK — business rule creates invoice lines
- OK — strict intervention line filter
- OK — invoice lines module exists
- OK — invoice module has child panel
- OK — invoice line source fields exist

## Scénario fonctionnel recommandé

1. Ouvrir une intervention existante qui possède au moins une ligne intervention active/validée.
2. Vérifier qu'aucune facture active n'est encore liée à cette intervention.
3. Passer l'intervention à `terminee` via l'action/runtime existant.
4. Ouvrir la facture créée.
5. Vérifier le panneau enfant `Lignes facture`.
6. Vérifier que chaque ligne facture possède `factureId`, `interventionId`, `sourceModule = lignesinterventionauto`, `sourceLineId`, `designation`, `quantite`, `montantHT`, `montantTTC`.
7. Vérifier qu'aucune ligne `removedAt`, `annulee` ou `retiree` n'a été reprise.
8. Vérifier qu'un deuxième passage de l'intervention à `terminee` ne recrée pas une deuxième facture grâce à l'anti-doublon existant.

## Décision

- Précontrôles OK. Le test fonctionnel peut être lancé manuellement dans l'application.
