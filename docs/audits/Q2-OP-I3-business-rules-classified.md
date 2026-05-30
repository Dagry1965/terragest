# Q2-OP-I3 — Règles métier classées et énumérées

Objectif : classer les règles ERP par famille, module concerné, déclencheur et effet attendu.

## Résumé

- Règles recensées : 40
- Catégories : 10

## A. Statuts

### A-01 — Les statuts ne sont pas des commandes libres

- Module : `global`
- Sévérité : HIGH
- Source : Doctrine ERP / RuntimeActionEngine / RuntimeWorkflowEngine
- Règle : Un statut ne doit pas être modifié directement pour déclencher un effet métier. Le changement d’état doit passer par une action runtime contrôlée.

### A-02 — Le rendez-vous porte un statut de planification

- Module : `rendezvous`
- Sévérité : HIGH
- Source : rendezvous.module.ts / runtimeBusinessRules.ts
- Règle : Le statut du rendez-vous décrit l’état de la planification : demandé, confirmé, annulé, réalisé ou équivalent selon le module. La confirmation peut déclencher une intervention.

### A-03 — L’intervention porte un statut d’exécution

- Module : `interventionsauto`
- Sévérité : HIGH
- Source : interventionsauto.module.ts / runtimeBusinessRules.ts
- Règle : Le statut d’intervention décrit l’avancement atelier. Une intervention terminée peut déclencher une facture.

### A-04 — La ligne d’intervention doit rester simple

- Module : `lignesinterventionauto`
- Sévérité : HIGH
- Source : lignesinterventionauto.module.ts / ERPRelatedRecordsPanel.tsx
- Règle : Les états utilisateur attendus sont brouillon et validée. Une ligne brouillon ne compte pas ; une ligne validée compte dans les totaux.

### A-05 — La facture distingue statut facture et statut paiement

- Module : `facturesauto`
- Sévérité : HIGH
- Source : facturesauto.module.ts
- Règle : Le statut facture concerne le cycle commercial. Le statut paiement dépend des encaissements : en attente, partiel, payé ou équivalent.

### A-06 — L’encaissement porte un statut de paiement

- Module : `encaissementsauto`
- Sévérité : HIGH
- Source : encaissementsauto.module.ts / InvoicePaymentsHistory.tsx
- Règle : Un encaissement validé doit être comptabilisé dans le montant payé de la facture.

## B. Workflows / transitions

### B-01 — Les transitions passent par le runtime

- Module : `global`
- Sévérité : HIGH
- Source : ERPRuntimePage.tsx / ERPEnterpriseForm.tsx
- Règle : Les boutons de transition doivent être rendus par la barre d’actions runtime, jamais directement par le formulaire.

### B-02 — RDV confirmé → intervention

- Module : `rendezvous`
- Sévérité : HIGH
- Source : runtimeBusinessRules.ts
- Règle : Quand un rendez-vous passe à confirmé, le runtime peut créer automatiquement une intervention liée, si elle n’existe pas déjà.

### B-03 — Intervention terminée → facture

- Module : `interventionsauto`
- Sévérité : HIGH
- Source : runtimeBusinessRules.ts
- Règle : Quand une intervention est terminée, le runtime peut créer automatiquement une facture liée.

### B-04 — Encaissement → statut paiement facture

- Module : `facturesauto`
- Sévérité : HIGH
- Source : InvoicePaymentsHistory.tsx / runtimeBusinessRules.ts
- Règle : Quand un encaissement est créé ou validé, la facture doit recalculer montant payé, reste à payer et statut paiement.

### B-05 — Ligne validée → comptabilisation

- Module : `lignesinterventionauto`
- Sévérité : HIGH
- Source : ERPRelatedRecordsPanel.tsx / line-items runtime
- Règle : Une ligne validée entre dans les totaux de l’intervention et peut impacter le stock si elle concerne une pièce.

## C. Parent → enfant

### C-01 — Un enfant ERP ne se crée pas seul

- Module : `global`
- Sévérité : HIGH
- Source : processRuntimeBeforeMutationGuards.ts / RuntimeChildCreateHrefBuilder.ts
- Règle : Tout module enfant avec contexte parent obligatoire doit être créé avec parentModuleKey, parentRecordId et parentForeignKey.

### C-02 — Facture → encaissement

- Module : `encaissementsauto`
- Sévérité : HIGH
- Source : RuntimeChildCreateHrefBuilder.ts / facturesauto.module.ts
- Règle : Un encaissement doit être créé depuis sa facture parent avec factureId, parentModuleKey=facturesauto, parentRecordId et parentForeignKey=factureId.

### C-03 — Intervention → ligne d’intervention

- Module : `lignesinterventionauto`
- Sévérité : HIGH
- Source : lignesinterventionauto.module.ts / processRuntimeBeforeMutationGuards.ts
- Règle : Une ligne d’intervention doit être créée depuis une intervention parent avec interventionId comme clé étrangère.

### C-04 — Commande / ligne commande → réception

- Module : `receptionsstockauto`
- Sévérité : HIGH
- Source : receptionsstockauto.module.ts
- Règle : Une réception doit être liée à une commande et à une ligne de commande pour éviter les réceptions incohérentes.

### C-05 — Client → véhicule

- Module : `vehicules`
- Sévérité : HIGH
- Source : clientsauto hub / vehicules.module.ts
- Règle : Un véhicule doit être rattaché à son client/propriétaire. Depuis la fiche client, le formulaire véhicule doit recevoir le client prérempli.

### C-06 — Builder parent/enfant disponible

- Module : `global`
- Sévérité : HIGH
- Source : src/runtime/navigation/RuntimeChildCreateHrefBuilder.ts
- Règle : Le builder central est disponible pour construire des liens enfant avec contexte parent complet.

## D. Créations automatiques

### D-01 — Créer une intervention depuis un RDV confirmé

- Module : `rendezvous`
- Sévérité : HIGH
- Source : runtimeBusinessRules.ts
- Règle : Le runtime doit empêcher la double création : un RDV déjà consommé ne doit pas créer une deuxième intervention.

### D-02 — Créer une facture depuis une intervention terminée

- Module : `interventionsauto`
- Sévérité : HIGH
- Source : runtimeBusinessRules.ts
- Règle : La facture générée doit reprendre le client, le véhicule, l’intervention et les montants calculés.

### D-03 — Créer un mouvement stock depuis une réception validée

- Module : `receptionsstockauto`
- Sévérité : HIGH
- Source : RuntimeStockMovementService / FirestoreRuntimeMutation
- Règle : Une réception validée doit créer un mouvement de stock entrant et mettre à jour le stock.

## E. Verrouillage / héritage

### E-01 — Les champs hérités du parent sont verrouillés

- Module : `global`
- Sévérité : HIGH
- Source : composition.lockFields / processRuntimeBeforeMutationGuards.ts
- Règle : Un enfant ne doit pas modifier les champs de son parent ou grand-parent. Les champs hérités sont affichés comme contexte mais verrouillés.

### E-02 — factureId, clientId, vehiculeId verrouillés

- Module : `encaissementsauto`
- Sévérité : HIGH
- Source : RuntimeChildCreateHrefBuilder.ts
- Règle : Lors de la création d’un paiement depuis une facture, factureId, clientId et vehiculeId doivent être préremplis et verrouillés.

### E-03 — Montants facture verrouillés

- Module : `facturesauto`
- Sévérité : HIGH
- Source : facturesauto.module.ts / runtimeBusinessRules.ts
- Règle : Les montants facture doivent être calculés depuis les lignes/interventions et les encaissements, pas édités librement.

## F. Finance

### F-01 — Montant payé et reste à payer calculés

- Module : `facturesauto`
- Sévérité : HIGH
- Source : InvoicePaymentsHistory.tsx
- Règle : Le montant payé est la somme des encaissements valides. Le reste à payer est Total TTC - montant payé.

### F-02 — Un paiement doit recalculer la facture

- Module : `encaissementsauto`
- Sévérité : HIGH
- Source : runtimeBusinessRules.ts / InvoicePaymentsHistory.tsx
- Règle : Créer ou valider un encaissement doit mettre à jour la facture liée.

### F-03 — Un seul bouton principal de paiement

- Module : `facturesauto`
- Sévérité : HIGH
- Source : ERPRuntimeDetails.tsx / InvoicePaymentsHistory.tsx
- Règle : L’action de création de paiement ne doit pas être dupliquée. Le point officiel est l’historique des encaissements ou une action runtime unique.

## G. Stock

### G-01 — Le stock est un état résultant

- Module : `stocksauto`
- Sévérité : HIGH
- Source : RuntimeStockMovementService
- Règle : Le stock ne doit pas être modifié directement sans mouvement de stock.

### G-02 — Le mouvement stock est la preuve

- Module : `mouvementsstockauto`
- Sévérité : HIGH
- Source : RuntimeStockMovementService
- Règle : Chaque entrée, sortie, correction ou réintégration doit créer un mouvement stock avec source métier et quantités avant/après.

### G-03 — Une pièce validée peut sortir du stock

- Module : `lignesinterventionauto`
- Sévérité : HIGH
- Source : line-items runtime / stock movement runtime
- Règle : Une ligne validée de type pièce peut déclencher une sortie stock selon produit/stock/quantité.

### G-04 — Réception validée → entrée stock

- Module : `receptionsstockauto`
- Sévérité : HIGH
- Source : RuntimeStockMovementService
- Règle : La validation d’une réception doit créer une entrée stock et empêcher le double traitement.

## H. Planning

### H-01 — Un créneau occupé ne doit pas rester disponible

- Module : `rendezvous`
- Sévérité : HIGH
- Source : RuntimeSchedulingEngine
- Règle : Le moteur planning doit exclure ou désactiver les créneaux déjà occupés.

### H-02 — Les créneaux viennent du moteur runtime

- Module : `rendezvous`
- Sévérité : HIGH
- Source : RuntimeSchedulingSettingsEngine / RuntimeSchedulingEngine
- Règle : Les horaires, buffers, pauses et types de service doivent être paramétrés par le moteur planning, pas localement dans l’UI.

### H-03 — Durée service conservée

- Module : `rendezvous`
- Sévérité : HIGH
- Source : createPublicAppointment / rendezvous module
- Règle : Un RDV public ou interne doit conserver typeService et durationMinutes.

## I. Boutons / actions UI

### I-01 — Les boutons workflow ne doivent pas être dans les formulaires

- Module : `global`
- Sévérité : HIGH
- Source : ERPEnterpriseForm.tsx / ERPRuntimePage.tsx
- Règle : Les formulaires ne doivent pas rendre workflowActions. Les actions doivent apparaître dans une barre runtime dédiée.

### I-02 — Une action métier = un bouton principal

- Module : `global`
- Sévérité : HIGH
- Source : ERPRuntimeDetails.tsx / InvoicePaymentsHistory.tsx
- Règle : Il ne doit pas y avoir deux boutons concurrents pour la même action métier, par exemple deux boutons pour enregistrer un paiement.

### I-03 — Les boutons enfant utilisent le builder runtime

- Module : `global`
- Sévérité : HIGH
- Source : RuntimeChildCreateHrefBuilder.ts
- Règle : Tout bouton qui crée un enfant doit utiliser RuntimeChildCreateHrefBuilder ou la composition runtime.

### I-04 — Risque actuel : formulaire porte encore workflowActions

- Module : `global`
- Sévérité : HIGH
- Source : src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx
- Règle : Le code contient encore workflowActions dans ERPEnterpriseForm. À traiter dans une passe suivante : sortir les boutons de workflow du formulaire.

## J. Audit / traçabilité

### J-01 — Les effets métier doivent être auditables

- Module : `global`
- Sévérité : HIGH
- Source : runtime events / audit / business rules
- Règle : Création automatique, transition, retrait de ligne, mouvement stock et paiement doivent laisser une trace exploitable.

### J-02 — Retirer une ligne n’est pas supprimer

- Module : `lignesinterventionauto`
- Sévérité : HIGH
- Source : RuntimeLineRemovalService
- Règle : Une ligne retirée doit conserver removedAt, removedBy, removedReason et ne plus compter dans les totaux.

### J-03 — Le mouvement stock prouve la variation

- Module : `mouvementsstockauto`
- Sévérité : HIGH
- Source : RuntimeStockMovementService
- Règle : Les quantités avant/après et la source métier doivent être conservées.

## Tableau de synthèse

| ID | Catégorie | Module | Règle | Sévérité | Source |
|---|---|---|---|---|---|
| A-01 | A. Statuts | global | Les statuts ne sont pas des commandes libres | HIGH | Doctrine ERP / RuntimeActionEngine / RuntimeWorkflowEngine |
| A-02 | A. Statuts | rendezvous | Le rendez-vous porte un statut de planification | HIGH | rendezvous.module.ts / runtimeBusinessRules.ts |
| A-03 | A. Statuts | interventionsauto | L’intervention porte un statut d’exécution | HIGH | interventionsauto.module.ts / runtimeBusinessRules.ts |
| A-04 | A. Statuts | lignesinterventionauto | La ligne d’intervention doit rester simple | HIGH | lignesinterventionauto.module.ts / ERPRelatedRecordsPanel.tsx |
| A-05 | A. Statuts | facturesauto | La facture distingue statut facture et statut paiement | HIGH | facturesauto.module.ts |
| A-06 | A. Statuts | encaissementsauto | L’encaissement porte un statut de paiement | HIGH | encaissementsauto.module.ts / InvoicePaymentsHistory.tsx |
| B-01 | B. Workflows / transitions | global | Les transitions passent par le runtime | HIGH | ERPRuntimePage.tsx / ERPEnterpriseForm.tsx |
| B-02 | B. Workflows / transitions | rendezvous | RDV confirmé → intervention | HIGH | runtimeBusinessRules.ts |
| B-03 | B. Workflows / transitions | interventionsauto | Intervention terminée → facture | HIGH | runtimeBusinessRules.ts |
| B-04 | B. Workflows / transitions | facturesauto | Encaissement → statut paiement facture | HIGH | InvoicePaymentsHistory.tsx / runtimeBusinessRules.ts |
| B-05 | B. Workflows / transitions | lignesinterventionauto | Ligne validée → comptabilisation | HIGH | ERPRelatedRecordsPanel.tsx / line-items runtime |
| C-01 | C. Parent → enfant | global | Un enfant ERP ne se crée pas seul | HIGH | processRuntimeBeforeMutationGuards.ts / RuntimeChildCreateHrefBuilder.ts |
| C-02 | C. Parent → enfant | encaissementsauto | Facture → encaissement | HIGH | RuntimeChildCreateHrefBuilder.ts / facturesauto.module.ts |
| C-03 | C. Parent → enfant | lignesinterventionauto | Intervention → ligne d’intervention | HIGH | lignesinterventionauto.module.ts / processRuntimeBeforeMutationGuards.ts |
| C-04 | C. Parent → enfant | receptionsstockauto | Commande / ligne commande → réception | HIGH | receptionsstockauto.module.ts |
| C-05 | C. Parent → enfant | vehicules | Client → véhicule | HIGH | clientsauto hub / vehicules.module.ts |
| C-06 | C. Parent → enfant | global | Builder parent/enfant disponible | HIGH | src/runtime/navigation/RuntimeChildCreateHrefBuilder.ts |
| D-01 | D. Créations automatiques | rendezvous | Créer une intervention depuis un RDV confirmé | HIGH | runtimeBusinessRules.ts |
| D-02 | D. Créations automatiques | interventionsauto | Créer une facture depuis une intervention terminée | HIGH | runtimeBusinessRules.ts |
| D-03 | D. Créations automatiques | receptionsstockauto | Créer un mouvement stock depuis une réception validée | HIGH | RuntimeStockMovementService / FirestoreRuntimeMutation |
| E-01 | E. Verrouillage / héritage | global | Les champs hérités du parent sont verrouillés | HIGH | composition.lockFields / processRuntimeBeforeMutationGuards.ts |
| E-02 | E. Verrouillage / héritage | encaissementsauto | factureId, clientId, vehiculeId verrouillés | HIGH | RuntimeChildCreateHrefBuilder.ts |
| E-03 | E. Verrouillage / héritage | facturesauto | Montants facture verrouillés | HIGH | facturesauto.module.ts / runtimeBusinessRules.ts |
| F-01 | F. Finance | facturesauto | Montant payé et reste à payer calculés | HIGH | InvoicePaymentsHistory.tsx |
| F-02 | F. Finance | encaissementsauto | Un paiement doit recalculer la facture | HIGH | runtimeBusinessRules.ts / InvoicePaymentsHistory.tsx |
| F-03 | F. Finance | facturesauto | Un seul bouton principal de paiement | HIGH | ERPRuntimeDetails.tsx / InvoicePaymentsHistory.tsx |
| G-01 | G. Stock | stocksauto | Le stock est un état résultant | HIGH | RuntimeStockMovementService |
| G-02 | G. Stock | mouvementsstockauto | Le mouvement stock est la preuve | HIGH | RuntimeStockMovementService |
| G-03 | G. Stock | lignesinterventionauto | Une pièce validée peut sortir du stock | HIGH | line-items runtime / stock movement runtime |
| G-04 | G. Stock | receptionsstockauto | Réception validée → entrée stock | HIGH | RuntimeStockMovementService |
| H-01 | H. Planning | rendezvous | Un créneau occupé ne doit pas rester disponible | HIGH | RuntimeSchedulingEngine |
| H-02 | H. Planning | rendezvous | Les créneaux viennent du moteur runtime | HIGH | RuntimeSchedulingSettingsEngine / RuntimeSchedulingEngine |
| H-03 | H. Planning | rendezvous | Durée service conservée | HIGH | createPublicAppointment / rendezvous module |
| I-01 | I. Boutons / actions UI | global | Les boutons workflow ne doivent pas être dans les formulaires | HIGH | ERPEnterpriseForm.tsx / ERPRuntimePage.tsx |
| I-02 | I. Boutons / actions UI | global | Une action métier = un bouton principal | HIGH | ERPRuntimeDetails.tsx / InvoicePaymentsHistory.tsx |
| I-03 | I. Boutons / actions UI | global | Les boutons enfant utilisent le builder runtime | HIGH | RuntimeChildCreateHrefBuilder.ts |
| I-04 | I. Boutons / actions UI | global | Risque actuel : formulaire porte encore workflowActions | HIGH | src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx |
| J-01 | J. Audit / traçabilité | global | Les effets métier doivent être auditables | HIGH | runtime events / audit / business rules |
| J-02 | J. Audit / traçabilité | lignesinterventionauto | Retirer une ligne n’est pas supprimer | HIGH | RuntimeLineRemovalService |
| J-03 | J. Audit / traçabilité | mouvementsstockauto | Le mouvement stock prouve la variation | HIGH | RuntimeStockMovementService |

## Prochaine passe recommandée

1. Transformer ce rapport en règles runtime vérifiables.
2. Ajouter des audits bloquants :
   - aucun bouton workflow dans ERPEnterpriseForm ;
   - aucun lien enfant manuel sans parent context ;
   - aucune modification stock sans mouvement ;
   - aucune ligne brouillon comptée dans les totaux ;
   - aucun RDV confirmé ne crée deux interventions.
3. Centraliser l’affichage des actions dans une `ERPRuntimeActionBar`.