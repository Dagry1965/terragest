# Q22E-9L-B2-C — RDV consumption validation audit

## Objectif

Identifier les usages restants de `validateRendezvousForIntervention` et `consumedByInterventionId` avant extraction hors `RuntimeSchedulingEngine`.

## Doctrine

Le scheduling engine calcule les slots, disponibilités, conflits, buffers et capacités. Il ne valide pas la création métier d’une intervention depuis un rendez-vous.

## Résumé

- Findings : 17
- HIGH : 10
- REVIEW : 4
- INFO : 3

## Findings HIGH — à sortir du scheduling engine

| Sévérité | Couche | Cible | Fichier | Ligne | Extrait | Décision |
|---|---|---|---|---:|---|---|
| HIGH | Engine violation | consumedByInterventionId | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 746 | `if (asString(rendezvous.consumedByInterventionId)) {` | À sortir du scheduling engine : validation métier RDV/intervention. |
| HIGH | Engine violation | isCancelledAppointment | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 249 | `function isCancelledAppointment(record: RuntimeRecord): boolean {` | À sortir du scheduling engine : validation métier RDV/intervention. |
| HIGH | Engine violation | isCancelledAppointment | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 670 | `if (isCancelledAppointment(record)) {` | À sortir du scheduling engine : validation métier RDV/intervention. |
| HIGH | Engine violation | isCancelledAppointment | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 687 | `if (!existing \|\| isCancelledAppointment(existing)) return false;` | À sortir du scheduling engine : validation métier RDV/intervention. |
| HIGH | Engine violation | isCancelledAppointment | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 739 | `if (isCancelledAppointment(rendezvous)) {` | À sortir du scheduling engine : validation métier RDV/intervention. |
| HIGH | Engine violation | Impossible de créer une intervention | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 742 | `reason: "Impossible de créer une intervention depuis un rendez-vous annulé.",` | À sortir du scheduling engine : validation métier RDV/intervention. |
| HIGH | Engine violation | Impossible de créer une intervention | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 750 | `"Impossible de créer une intervention : ce rendez-vous a déjà été consommé.",` | À sortir du scheduling engine : validation métier RDV/intervention. |
| HIGH | Engine violation | Impossible de créer une intervention | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 757 | `reason: "Impossible de créer une intervention : clientId manquant.",` | À sortir du scheduling engine : validation métier RDV/intervention. |
| HIGH | Engine violation | Impossible de créer une intervention | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 764 | `reason: "Impossible de créer une intervention : vehiculeId manquant.",` | À sortir du scheduling engine : validation métier RDV/intervention. |
| HIGH | Engine violation | Impossible de créer une intervention | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 771 | `reason: "Impossible de créer une intervention : identifiant rendez-vous manquant.",` | À sortir du scheduling engine : validation métier RDV/intervention. |


## Findings REVIEW — à classer

| Sévérité | Couche | Cible | Fichier | Ligne | Extrait | Décision |
|---|---|---|---|---:|---|---|
| REVIEW | BusinessRule | consumedByInterventionId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 343 | `if (effectiveRendezvous.consumedByInterventionId) {` | Acceptable provisoirement si la validation métier est portée par business rule. |
| REVIEW | BusinessRule | consumedByInterventionId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 413 | `consumedByInterventionId:` | Acceptable provisoirement si la validation métier est portée par business rule. |
| REVIEW | BusinessRule | consumedByInterventionId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 505 | `if (effectiveRendezvous.consumedByInterventionId) {` | Acceptable provisoirement si la validation métier est portée par business rule. |
| REVIEW | BusinessRule | consumedByInterventionId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 575 | `consumedByInterventionId:` | Acceptable provisoirement si la validation métier est portée par business rule. |


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
