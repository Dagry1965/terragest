# Q22E-9L-B2-C — RDV consumption validation audit

## Objectif

Identifier les usages restants de `validateRendezvousForIntervention` et `consumedByInterventionId` avant extraction hors `RuntimeSchedulingEngine`.

## Doctrine

Le scheduling engine calcule les slots, disponibilités, conflits, buffers et capacités. Il ne valide pas la création métier d’une intervention depuis un rendez-vous.

## Résumé

- Findings : 13
- HIGH : 0
- REVIEW : 10
- INFO : 3

## Findings HIGH — à sortir du scheduling engine

_Aucun finding._


## Findings REVIEW — à classer

| Sévérité | Couche | Cible | Fichier | Ligne | Extrait | Décision |
|---|---|---|---|---:|---|---|
| REVIEW | BusinessRule | consumedByInterventionId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 342 | `if (effectiveRendezvous.consumedByInterventionId) {` | Acceptable provisoirement si la validation métier est portée par business rule. |
| REVIEW | BusinessRule | consumedByInterventionId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 412 | `consumedByInterventionId:` | Acceptable provisoirement si la validation métier est portée par business rule. |
| REVIEW | BusinessRule | consumedByInterventionId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 503 | `if (effectiveRendezvous.consumedByInterventionId) {` | Acceptable provisoirement si la validation métier est portée par business rule. |
| REVIEW | BusinessRule | consumedByInterventionId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 573 | `consumedByInterventionId:` | Acceptable provisoirement si la validation métier est portée par business rule. |
| REVIEW | BusinessRule | consumedByInterventionId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1824 | `if (businessRuleAsString(rendezvous.consumedByInterventionId)) {` | Acceptable provisoirement si la validation métier est portée par business rule. |
| REVIEW | BusinessRule | Impossible de créer une intervention | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1820 | `reason: "Impossible de créer une intervention depuis un rendez-vous annulé.",` | Acceptable provisoirement si la validation métier est portée par business rule. |
| REVIEW | BusinessRule | Impossible de créer une intervention | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1827 | `reason: "Impossible de créer une intervention : ce rendez-vous a déjà été consommé.",` | Acceptable provisoirement si la validation métier est portée par business rule. |
| REVIEW | BusinessRule | Impossible de créer une intervention | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1834 | `reason: "Impossible de créer une intervention : clientId manquant.",` | Acceptable provisoirement si la validation métier est portée par business rule. |
| REVIEW | BusinessRule | Impossible de créer une intervention | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1841 | `reason: "Impossible de créer une intervention : vehiculeId manquant.",` | Acceptable provisoirement si la validation métier est portée par business rule. |
| REVIEW | BusinessRule | Impossible de créer une intervention | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1848 | `reason: "Impossible de créer une intervention : identifiant rendez-vous manquant.",` | Acceptable provisoirement si la validation métier est portée par business rule. |


## Findings INFO — probablement metadata/UI

| Sévérité | Couche | Cible | Fichier | Ligne | Extrait | Décision |
|---|---|---|---|---:|---|---|
| INFO | Module metadata | already used | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` | 47 | `// Exclude order lines already used in an existing reception.` | Acceptable si c’est une déclaration de champ, relation ou composition. |
| INFO | Module metadata | consumedByInterventionId | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 97 | `key: "consumedByInterventionId",` | Acceptable si c’est une déclaration de champ, relation ou composition. |
| INFO | Other | already used | `src/runtime/modules/schemas/ERPModuleSchema.ts` | 148 | `* Example: receptionsstockauto.ligneCommandeId excludes lines already used by receptionsstockauto.` | À vérifier selon contexte. |


## Décision attendue

- Ce qui reste en BusinessRule.
- Ce qui doit aller en Guard.
- Ce qui doit rester en Metadata.
- Ce qui doit être supprimé du RuntimeSchedulingEngine.
