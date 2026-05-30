# Q2-OP-I17-B1 — Checklist test manuel actions runtime UI

Base stable : `d499fc41 test(runtime): audit runtime actions UI readiness`.

Objectif : vérifier manuellement les actions métier rendues par `ERPRuntimeActionBar` sur des fiches réelles.

## Règles de test

- Ne pas modifier le code pendant cette passe.
- Tester d'abord l'affichage, puis seulement ensuite l'exécution.
- Ne pas déclencher une action métier destructive sur des données importantes.
- Utiliser de préférence des fiches de test/démo.
- Vérifier l'absence de doublons : les workflows ne doivent plus apparaître dans `ERPEnterpriseForm`.

## Modules à tester

### Rendez-vous — `rendezvous`

Routes :

- `/rendezvous`
- `/rendezvous/[id]`
- `/rendezvous/[id]/edit`

Actions attendues :

- `reporter-rdv`

Checklist :

- [ ] Ouvrir une fiche rendez-vous existante.
- [ ] Vérifier que la barre Actions métier est visible.
- [ ] Vérifier que l'action Reporter RDV est visible si disponible.
- [ ] Vérifier qu'il n'existe pas un deuxième bloc workflow dans le formulaire.
- [ ] Ne pas exécuter l'action si aucun scénario de report n'est prêt.

### Interventions — `interventionsauto`

Routes :

- `/interventionsauto`
- `/interventionsauto/[id]`
- `/interventionsauto/[id]/edit`

Actions attendues :

- `demarrer-intervention`

Checklist :

- [ ] Ouvrir une fiche intervention existante.
- [ ] Vérifier que la barre Actions métier est visible.
- [ ] Vérifier que l'action Demarrer intervention est visible si disponible.
- [ ] Vérifier qu'il n'y a pas de doublon d'action dans le formulaire.
- [ ] Vérifier que les boutons Enregistrer/Annuler/Supprimer restent dans le formulaire uniquement.

### Factures — `facturesauto`

Routes :

- `/facturesauto`
- `/facturesauto/[id]`
- `/facturesauto/[id]/edit`

Actions attendues :

- `envoyer-facture`
- `annuler-facture`

Checklist :

- [ ] Ouvrir une fiche facture existante.
- [ ] Vérifier que les actions Envoyer facture et Annuler facture sont disponibles selon l'état.
- [ ] Vérifier que l'historique des paiements reste affiché dans la zone facture, pas dans la barre d'actions.
- [ ] Vérifier qu'il n'y a pas de doublon de bouton paiement/action métier.

### Commandes stock — `commandesstockauto`

Routes :

- `/commandesstockauto`
- `/commandesstockauto/[id]`
- `/commandesstockauto/[id]/edit`

Actions attendues :

- `envoyer-commande`
- `annuler-commande`

Checklist :

- [ ] Ouvrir une fiche commande stock existante.
- [ ] Vérifier que Envoyer commande et Annuler commande apparaissent dans Actions métier si disponibles.
- [ ] Vérifier qu'il n'y a pas d'action stock locale dans le formulaire.
- [ ] Ne pas confondre commande avec réception : la commande ne doit pas modifier le stock directement.

### Réceptions stock — `receptionsstockauto`

Routes :

- `/receptionsstockauto`
- `/receptionsstockauto/[id]`
- `/receptionsstockauto/[id]/edit`

Actions attendues :

- `valider-reception`

Checklist :

- [ ] Ouvrir une fiche réception stock existante.
- [ ] Vérifier que Valider reception apparaît dans Actions métier si la réception est en état compatible.
- [ ] Vérifier qu'il n'y a pas de bouton local de validation dans le formulaire.
- [ ] Ne déclencher l'action que sur une réception de test, car elle peut créer un mouvement stock.

## Résultat attendu global

- [ ] `ERPRuntimeActionBar` visible sur les fiches détail/edit quand des actions sont disponibles.
- [ ] Aucun rendu legacy `runtimeActions.map` visible.
- [ ] Aucun bloc workflow dans le formulaire.
- [ ] Les boutons formulaire restent limités aux actions de formulaire : Enregistrer, Annuler, Supprimer si applicable.
- [ ] Les actions métier sont centralisées dans la barre Actions métier.
- [ ] Aucun crash console navigateur lors de l'affichage.
- [ ] Aucun refresh incohérent après action exécutée.

## Routes localhost rapides

- http://localhost:3000/rendezvous
- http://localhost:3000/interventionsauto
- http://localhost:3000/facturesauto
- http://localhost:3000/commandesstockauto
- http://localhost:3000/receptionsstockauto
