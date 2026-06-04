# BILLING-MODEL-D-D2-B — Diagnostic module runtime lignes facture

## Résultats

- OK — lignesfactureauto module file exists: Le fichier module lignesfactureauto existe.
- OK — coreModules imports lignesfactureautoModule: coreModules.ts doit importer et enregistrer lignesfactureautoModule.
- OK — coreModules contains metadata key lignesfactureauto through import registration: Le module doit être présent dans le tableau runtime.
- OK — index exports lignesfactureautoModule: index.ts doit exporter le module.
- OK — lignesfactureauto collection is correct: Le schema doit cibler la collection lignesfactureauto.
- OK — lignesfactureauto requires factureId: Le champ factureId doit exister et être obligatoire.
- OK — business rule searches lignesfactureauto: La règle intervention terminée doit chercher lignesfactureauto dans coreERPModules.
- OK — business rule creates lignesFactureModule: La règle doit créer les lignes via RuntimeDataBinding.create(lignesFactureModule, ...).

## Interprétation

- Les déclarations statiques semblent OK.
- Si aucune ligne facture n'est créée en exécution, le problème est probablement dans l'exécution runtime : module non chargé par le serveur en cours, contrainte create, ou erreur silencieuse pendant RuntimeDataBinding.create(lignesFactureModule, ...).
- Prochaine correction recommandée : ajouter une journalisation/notification contrôlée autour de la création des lignes facture, ou créer un script de réparation D-D2-C pour générer les lignes manquantes et valider le modèle de données.

## Fichiers inspectés

- coreModules: `src\runtime\modules\definitions\coreModules.ts`
- index: `src\runtime\modules\index.ts`
- lignesFactureModule: `src\runtime\modules\generated\lignesfactureauto\lignesfactureauto.module.ts`
- businessRules: `src\runtime\business-rules\runtimeBusinessRules.ts`
