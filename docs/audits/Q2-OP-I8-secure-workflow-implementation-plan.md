# Q2-OP-I8 — Plan d’implémentation sécurisé des workflows runtime

Objectif : transformer les workflows cibles Q2-OP-I6 et les écarts Q2-OP-I7 en plan d’implémentation progressif, sans injecter brutalement des workflows dans tous les modules.

## Diagnostic issu de Q2-OP-I7

- Les transitions réelles déclarées sont à `0` sur les modules prioritaires.
- Les statuts existent déjà pour la plupart des modules métier.
- Certaines actions existent déjà dans les fichiers `.actions.ts`, mais ne sont pas encore structurées comme transitions runtime complètes.
- Plusieurs états doivent rester calculés et ne pas devenir des boutons utilisateur.

## Doctrine de décision

- Un statut visible n’est pas forcément une action utilisateur.
- Un état calculé ne doit pas devenir un bouton manuel.
- Une transition utilisateur doit passer par RuntimeActionEngine / RuntimeWorkflowEngine.
- Les effets métier passent par Business Rules / guards / services runtime.
- Les boutons workflow doivent apparaître dans ERPRuntimeActionBar, jamais dans ERPEnterpriseForm.

## Phase 1 — Socle runtime UI

- Priorité : P0
- Modules : `global`
- Objectif : Sortir définitivement les boutons workflow des formulaires et créer un point d’affichage unique.
- Risque : Faible si on ne change pas encore les règles métier.

### Actions à faire

- Créer ERPRuntimeActionBar.
- Afficher les actions runtime autour du formulaire/détail.
- Retirer workflowActions de ERPEnterpriseForm.
- Ajouter audit bloquant : aucun bouton workflow dans ERPEnterpriseForm.

## Phase 2 — Workflows atelier prioritaires

- Priorité : P1
- Modules : `rendezvous`, `interventionsauto`, `lignesinterventionauto`
- Objectif : Formaliser les transitions métier qui pilotent le cycle atelier.
- Risque : Moyen : impact direct sur RDV → intervention → facture.

### Actions à faire

- rendezvous : planifie → confirme → en_cours → termine / annule.
- rendezvous : confirmation RDV déclenche intervention unique si applicable.
- interventionsauto : ouverte → diagnostic → en_cours → terminee → facturee / annulee.
- interventionsauto : terminee/facturee déclenche ou sécurise la facture.
- lignesinterventionauto : brouillon → validee ; retirer ligne via action runtimeOnly.

### États calculés à ne pas transformer en bouton manuel

- rendezvous.termine peut être système/consommation.
- interventionsauto.facturee doit venir de la génération facture.
- lignesinterventionauto.retiree est technique/audit, pas un simple statut utilisateur libre.

## Phase 3 — Finance

- Priorité : P1
- Modules : `facturesauto`, `encaissementsauto`, `echeancespaiementauto`
- Objectif : Sécuriser les paiements, les statuts financiers et les actions de facture.
- Risque : Moyen/élevé : impact financier et cohérence encaissements.

### Actions à faire

- facturesauto : statutFacture peut avoir workflow commercial : brouillon → emise → annulee.
- facturesauto : statutPaiement ne doit pas être actionné manuellement.
- encaissementsauto : en_attente → valide / rejete / annule.
- encaissementsauto : validation met à jour facture parent.
- echeancespaiementauto : a_venir/en_retard/payee/annulee avec relance auditée.

### États calculés à ne pas transformer en bouton manuel

- facturesauto.statutPaiement = calculé depuis encaissements.
- facturesauto.montantPaye = somme des encaissements valides.
- facturesauto.resteAPayer = montantTTC - montantPaye.
- echeancespaiementauto.en_retard peut être calculé par job runtime.

## Phase 4 — Stock / achats

- Priorité : P2
- Modules : `produitsauto`, `stocksauto`, `mouvementsstockauto`, `fournisseursauto`, `commandesstockauto`, `lignescommandestockauto`, `receptionsstockauto`
- Objectif : Formaliser les workflows achats et stock sans casser le principe mouvement = preuve.
- Risque : Élevé si on touche au stock sans audit : toujours passer par mouvements.

### Actions à faire

- produitsauto : actif / rupture / inactif / archive.
- stocksauto : statuts calculés depuis quantité et seuils.
- mouvementsstockauto : brouillon → valide ; annulation par mouvement inverse.
- commandesstockauto : brouillon → envoyee / annulee.
- lignescommandestockauto : brouillon → validee.
- receptionsstockauto : brouillon → validee déclenche mouvement stock entrée.

### États calculés à ne pas transformer en bouton manuel

- stocksauto.stock_faible, rupture, disponible doivent être calculés.
- commandesstockauto.partiellement_recue et recue doivent être calculés depuis réceptions.
- receptionsstockauto.validee ne doit pas être rejouable si mouvementStockId existe.

## Phase 5 — Référentiels secondaires

- Priorité : P3
- Modules : `clientsauto`, `vehicules`, `fournisseursauto`, `produitsauto`
- Objectif : Mettre des workflows légers uniquement si utile.
- Risque : Faible à moyen : référentiels, mais attention aux effets de filtre dans l’UI.

### Actions à faire

- clientsauto : prospect → actif → inactif / archive.
- vehicules : actif → entretien → immobilise → actif / archive.
- fournisseursauto : actif → suspendu → archive.
- produitsauto : actif → rupture/inactif/archive.

### États calculés à ne pas transformer en bouton manuel

- vehicules.entretien peut être manuel ou calculé selon rappels futurs.
- produitsauto.rupture peut être calculé depuis stock.

## Ordre d’exécution recommandé

1. Q2-OP-I9 — Audit formulaire : confirmer tous les points où ERPEnterpriseForm reçoit/rend workflowActions.
2. Q2-OP-I10 — Créer ERPRuntimeActionBar générique sans changer les workflows.
3. Q2-OP-I11 — Déplacer l’affichage des boutons workflow/action hors formulaire.
4. Q2-OP-I12 — Ajouter un audit bloquant : aucun bouton workflow dans ERPEnterpriseForm.
5. Q2-OP-I13 — Déclarer les workflows runtime seulement pour rendezvous/interventions/lignesintervention.
6. Q2-OP-I14 — Brancher les effets RDV → intervention et intervention → facture via règles déjà existantes.
7. Q2-OP-I15 — Finance : sécuriser facture/encaissement/statutPaiement calculé.
8. Q2-OP-I16 — Stock : sécuriser réception/mouvement/stock calculé.

## Décisions à valider avant codage workflow

- `facturesauto.statutPaiement` doit rester calculé depuis encaissements.
- `stocksauto.statut` doit être calculé depuis quantités/seuils.
- `commandesstockauto.partiellement_recue` et `recue` doivent être calculés depuis réceptions.
- `lignesinterventionauto.retiree` doit rester une trace audit/retrait, pas un bouton statut libre.
- Le bouton paiement doit être unique et passer par RuntimeChildCreateHrefBuilder.
- Les formulaires ne doivent plus porter workflowActions.

## Résultat cible

ERPRuntimePage
→ ERPRuntimeActionBar
→ RuntimeActionEngine
→ RuntimeWorkflowEngine
→ Business Rules / guards / services runtime

ERPEnterpriseForm
→ champs uniquement
→ aucun bouton workflow
→ aucun effet métier direct