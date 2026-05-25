\# Terragest\_V2 / AMARKHYS — Generic Runtime Rules



\## Règle immuable



On construit un ERP enterprise runtime-driven.



Aucune fonctionnalité métier ne doit être développée comme une logique locale dans une page, un formulaire ou un composant générique.



\## Cycle obligatoire



Avant toute correction ou fonctionnalité :



1\. Inspecter l’existant.

2\. Identifier si le besoin est générique.

3\. Renforcer un moteur existant si possible.

4\. Créer un moteur générique si nécessaire.

5\. Déclarer le comportement par metadata/schema.

6\. Build.

7\. Tester.

8\. Auditer les logiques locales.

9\. Commit.



\## Interdictions



\- Pas de logique page par page.

\- Pas de condition métier locale dans `ERPEnterpriseForm`.

\- Pas de condition métier locale dans `ERPFormField`.

\- Pas de patch spécifique module si un moteur générique peut exister.

\- Pas de duplication de calculs, statuts, labels, relations ou verrous.



\## Moteurs cibles



\- RuntimeRelationLabelEngine / ERPRelationDataLoader

\- RuntimeRelationFilterEngine

\- RuntimeAutoFillEngine

\- RuntimeComputedFieldsEngine

\- RuntimeFieldLockingEngine

\- RuntimeStatusGovernanceEngine

\- RuntimeActionEngine

\- RuntimeBusinessRules

\- RuntimeStockMovementService



\## Principe



Le module déclare.

Le runtime exécute.

L’interface assiste.

La base conserve la preuve.

