# Q2-L-A — Audit actions workflow / coherence processus / feedback utilisateur

## Statut

Audit sans modification runtime.

## Doctrine MODE ERP

Une action ne doit jamais etre visible uniquement parce qu'elle existe.

Elle doit etre visible parce qu'elle est coherente avec :
- l'etat local du record ;
- le processus general ;
- les permissions ;
- les relations parent/enfant ;
- les effets metier possibles.

Lorsqu'elle est appliquee, elle doit informer clairement l'utilisateur :
- du resultat ;
- des effets produits ;
- des blocages ;
- des prochaines etapes possibles.

## Fichiers inspectes

- src/runtime/actions/ERPAction.ts
- src/runtime/actions/ERPActionExecutor.ts
- src/runtime/actions/ERPActionResolver.ts
- src/runtime/actions/RuntimeActionEngine.ts
- src/runtime/modules/ERPModule.ts
- src/runtime/modules/generated/rendezvous/rendezvous.module.ts
- src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts
- src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts
- src/runtime/modules/generated/facturesauto/facturesauto.module.ts
- src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts
- src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts
- src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts
- src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts

## Constats structurels

| Code | Gravite | Constat | Risque | Couche |
|---|---:|---|---|---|
| Q2-L-A-R1 | HIGH | ERPAction ne porte que visible/disabled | Action visible sans coherence metier | Action UI |
| Q2-L-A-R2 | HIGH | ERPModuleAction ne porte pas visibility/guards/feedback/effects | Gouvernance action insuffisante | Metadata |
| Q2-L-A-R3 | HIGH | getAvailableActions filtre workflow local + permission seulement | Processus general ignore | RuntimeActionEngine |
| Q2-L-A-R4 | HIGH | runtimeOnly contourne le workflow sans gouvernance standard | Actions metier critiques trop libres | RuntimeActionEngine |
| Q2-L-A-R5 | MEDIUM | Resultat action non normalise | Feedback difficile a exploiter generiquement | RuntimeActionResult |
| Q2-L-A-R6 | MEDIUM | ERPActionExecutor affiche des toasts statiques | L'utilisateur n'est pas informe des effets reels | UI generique |

## Constats metier

| Code | Gravite | Module | Constat | Risque |
|---|---:|---|---|---|
| Q2-L-A-R7 | HIGH | rendezvous | Actions workflow non conditionnees par intervention liee | RDV consomme encore manipulable |
| Q2-L-A-R8 | HIGH | interventionsauto | Facturer depend du statut terminee mais pas des lignes/facture existante | Facture incomplete ou doublon |
| Q2-L-A-R9 | HIGH | lignesinterventionauto | retirer-ligne runtimeOnly sans visibilité declarative | Action proposee alors que ligne verrouillee |
| Q2-L-A-R10 | HIGH | facturesauto | Workflow paiement depend de statutPaiement mais pas de statutFacture | Paiement possible sur facture brouillon/annulee |
| Q2-L-A-R11 | HIGH | encaissementsauto | Valider depend localement du statut encaissement mais pas de la facture parent | Encaissement incoherent |
| Q2-L-A-R12 | HIGH | commandesstockauto | envoyer/annuler commande runtimeOnly sans gouvernance visible | Annulation ou envoi incoherent |
| Q2-L-A-R13 | MEDIUM | lignescommandestockauto | Workflows actives mais transitions non visibles dans l'inspection | Cycle ligne commande a clarifier |
| Q2-L-A-R14 | HIGH | receptionsstockauto | valider-reception runtimeOnly critique | Mouvement stock possible dans mauvais contexte |

## Decision

Ne pas corriger module par module.

Ouvrir une passe generique :

Q2-L-B — Runtime Action Governance Foundation

Objectif :
- etendre la metadata action ;
- renforcer RuntimeActionEngine ;
- standardiser RuntimeActionResult ;
- brancher le feedback utilisateur generique ;
- conserver les guards persistence comme protection finale.

## Cible runtime

Une action doit passer par :

1. permission
2. etat local
3. workflow local
4. processus general
5. relations parent/enfant
6. guards metier
7. effets possibles
8. feedback utilisateur

## Conclusion

Q2-L-A confirme que le socle existe mais que la gouvernance action/processus/feedback doit etre formalisee generiquement avant d'ajouter de nouvelles actions metier.