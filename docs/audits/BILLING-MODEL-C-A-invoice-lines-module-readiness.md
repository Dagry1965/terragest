# BILLING-MODEL-C-A — Audit readiness lignesfactureauto

## Objectif

Préparer la création du module générique `lignesfactureauto` sans inventer de conventions locales.

Le module cible doit devenir l'enfant financier de `facturesauto`, équivalent conceptuel des lignes d'intervention ou lignes de commande, mais pour la facturation commune.

## Modules inspectés

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts

- Statut : présent
- Signaux trouvés : export const, ERPModule, collection, schema, fields, form, tabs, sections, composition, labelFields, readOnlyFields, lockedFields, children, relations, factureId, interventionId, clientId, vehiculeId, montantHT, montantTTC, statut

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts

- Statut : présent
- Signaux trouvés : export const, ERPModule, collection, schema, fields, form, tabs, sections, composition, labelFields, readOnlyFields, lockedFields, relations, requiresParentContext, allowedParents, factureId, clientId, vehiculeId, statut

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts

- Statut : présent
- Signaux trouvés : export const, ERPModule, collection, schema, fields, form, tabs, sections, composition, labelFields, readOnlyFields, lockedFields, relations, requiresParentContext, allowedParents, interventionId, clientId, vehiculeId, produitId, montantHT, montantTTC, statut

### src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts

- Statut : présent
- Signaux trouvés : export const, ERPModule, collection, schema, fields, form, tabs, sections, composition, labelFields, readOnlyFields, lockedFields, children, relations, requiresParentContext, allowedParents, produitId, montantHT, montantTTC, statut

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts

- Statut : présent
- Signaux trouvés : export const, ERPModule, collection, schema, fields, form, tabs, sections, composition, labelFields, lockedFields, children, relations, requiresParentContext, allowedParents, produitId, statut

### src/runtime/modules/definitions/coreModules.ts

- Statut : présent
- Signaux trouvés : export const, ERPModule, collection, schema, fields

### src/runtime/modules/index.ts

- Statut : présent
- Signaux trouvés : ERPModule, schema

### src/runtime/modules.ts

- Statut : ABSENT

## Décision cible proposée

- `facturesauto` reste l'entête financier commun.
- `lignesfactureauto` doit être créé comme module enfant de `facturesauto`.
- `factureId` doit être obligatoire.
- `clientId`, `vehiculeId`, `interventionId` doivent être des snapshots/contextes verrouillés si présents.
- `sourceType`, `sourceModule`, `sourceRecordId`, `sourceLineId` doivent porter l'origine métier de la ligne.
- Les montants doivent être portés par la ligne, mais leur calcul sera ensuite confié à un moteur runtime, pas à une logique locale formulaire.
- Aucun fallback dangereux ne doit afficher toutes les lignes si aucune ligne strictement liée n'existe.

## Champs minimum recommandés pour lignesfactureauto

- factureId
- designation
- description
- quantite
- prixUnitaireHT
- montantHT
- tauxTVA
- montantTVA
- montantTTC
- sourceType
- sourceModule
- sourceRecordId
- sourceLineId
- clientId
- vehiculeId
- interventionId
- venteId
- produitId
- statutLigne

## Prochaine passe

BILLING-MODEL-C-B : générer `src/runtime/modules/generated/lignesfactureauto/lignesfactureauto.module.ts` et l'enregistrer dans le registry runtime selon les conventions réellement détectées.
