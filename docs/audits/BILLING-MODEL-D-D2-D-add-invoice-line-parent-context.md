# BILLING-MODEL-D-D2-D — Ajout contexte parent aux lignes facture

## Résultat

- Ajout de `parentModuleKey = facturesauto` dans le payload de création `lignesfactureauto`.
- Ajout de `parentRecordId = factureIdForLines`.
- Ajout de `parentForeignKey = factureId`.
- Le guard `requiresParentContext` peut maintenant valider la création enfant.
- Le filtrage strict par `interventionId` reste inchangé.

## Cause diagnostiquée

- `lignesfactureauto` déclare `requiresParentContext: true`.
- Le payload précédent contenait `factureId`, mais pas les champs `parentModuleKey`, `parentRecordId`, `parentForeignKey` attendus par le guard parent/enfant.
- Résultat : la facture entête était créée, mais les lignes facture étaient bloquées.

## Prochaine étape

Build, commit, puis nouveau scénario D-D3 ou réparation contrôlée D-D2-E pour générer les lignes manquantes.
