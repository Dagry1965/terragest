# Q2-OP-I7 — Audit d’écart workflows cibles vs workflows réels

Objectif : comparer les workflows runtime cibles Q2-OP-I6 avec les modules réellement déclarés.

## Résumé

- OK : 12
- INFO : 8
- WARN : 33
- WARN HIGH : 18
- FAIL : 0
- FAIL HIGH : 0

## Lecture rapide

- Les statuts existants sont comparés aux états cibles.
- Les transitions cibles sont comparées aux workflows réellement déclarés.
- Les actions cibles sont comparées aux fichiers `.actions.ts`.
- Certains états sont marqués calculés : ils doivent parfois être produits par moteur/règles plutôt qu’actionnés manuellement.

## Tableau d’écart par module

| Module | États cible | États réels | États manquants | Transitions cible | Transitions réelles | Transitions manquantes | Actions manquantes | États calculés |
|---|---:|---:|---|---:|---:|---|---|---|
| clientsauto | 4 | 0 | prospect, actif, inactif, archive | 4 | 0 | prospect -- Activer client --> actif<br/>actif -- Désactiver client --> inactif<br/>inactif -- Réactiver client --> actif<br/>actif|inactif|prospect -- Archiver client --> archive | Activer client, Désactiver client, Réactiver client, Archiver client | - |
| vehicules | 4 | 0 | actif, entretien, immobilise, archive | 4 | 0 | actif -- Marquer entretien requis --> entretien<br/>entretien -- Immobiliser véhicule --> immobilise<br/>immobilise|entretien -- Remettre en service --> actif<br/>actif|entretien|immobilise -- Archiver véhicule --> archive | Marquer entretien requis, Immobiliser véhicule, Remettre en service, Archiver véhicule | - |
| rendezvous | 5 | 5 | - | 5 | 0 | planifie -- Confirmer RDV --> confirme<br/>confirme -- Démarrer RDV --> en_cours<br/>en_cours -- Terminer RDV --> termine<br/>planifie|confirme|en_cours -- Annuler RDV --> annule<br/>planifie|confirme -- Reporter RDV --> planifie | Reporter RDV | termine |
| interventionsauto | 6 | 6 | - | 5 | 0 | ouverte -- Passer en diagnostic --> diagnostic<br/>diagnostic|ouverte -- Démarrer intervention --> en_cours<br/>en_cours|diagnostic -- Terminer intervention --> terminee<br/>terminee -- Générer facture --> facturee<br/>ouverte|diagnostic|en_cours -- Annuler intervention --> annulee | Passer en diagnostic, Démarrer intervention, Terminer intervention | facturee |
| lignesinterventionauto | 3 | 2 | retiree | 2 | 0 | brouillon -- Valider la ligne --> validee<br/>brouillon|validee -- Retirer la ligne --> retiree | Valider la ligne, Retirer la ligne | retiree |
| facturesauto | 9 | 9 | - | 4 | 0 | brouillon -- Valider facture --> emise<br/>emise -- Annuler facture --> annulee<br/>non_envoyee|echec -- Marquer comme envoyée --> envoyee<br/>en_attente|partiel -- Ajouter paiement --> partiel|paye | Ajouter paiement | en_attente, partiel, paye |
| encaissementsauto | 7 | 7 | - | 4 | 0 | en_attente -- Valider encaissement --> valide<br/>en_attente -- Rejeter encaissement --> rejete<br/>valide|en_attente -- Annuler encaissement --> annule<br/>non_envoye|echec -- Envoyer reçu --> envoye | Envoyer reçu | - |
| echeancespaiementauto | 5 | 5 | - | 4 | 0 | a_venir -- Marquer en retard --> en_retard<br/>a_venir|en_retard|partiellement_payee -- Marquer payée --> payee<br/>a_venir|en_retard|partiellement_payee -- Annuler échéance --> annulee<br/>en_retard -- Relancer client --> en_retard | Marquer en retard | en_retard |
| produitsauto | 4 | 4 | - | 3 | 0 | actif -- Marquer rupture --> rupture<br/>rupture|inactif -- Réactiver produit --> actif<br/>actif|rupture|inactif -- Archiver produit --> archive | Marquer rupture, Réactiver produit, Archiver produit | rupture |
| stocksauto | 4 | 4 | - | 3 | 0 | disponible -- Détecter stock faible --> stock_faible<br/>stock_faible -- Détecter rupture --> rupture<br/>stock_faible|rupture -- Réapprovisionner --> disponible | Détecter stock faible, Détecter rupture, Réapprovisionner | stock_faible, rupture, disponible |
| mouvementsstockauto | 3 | 3 | - | 2 | 0 | brouillon -- Valider mouvement --> valide<br/>valide -- Annuler mouvement --> annule | Valider mouvement, Annuler mouvement | - |
| fournisseursauto | 3 | 3 | - | 3 | 0 | actif -- Suspendre fournisseur --> suspendu<br/>suspendu -- Réactiver fournisseur --> actif<br/>actif|suspendu -- Archiver fournisseur --> archive | Suspendre fournisseur, Réactiver fournisseur, Archiver fournisseur | - |
| commandesstockauto | 5 | 5 | - | 4 | 0 | brouillon -- Envoyer commande --> envoyee<br/>envoyee -- Réception partielle détectée --> partiellement_recue<br/>envoyee|partiellement_recue -- Réception complète détectée --> recue<br/>brouillon|envoyee -- Annuler commande --> annulee | Envoyer commande, Réception partielle détectée, Réception complète détectée, Annuler commande | partiellement_recue, recue |
| lignescommandestockauto | 2 | 2 | - | 1 | 0 | brouillon -- Valider ligne commande --> validee | Valider ligne commande | - |
| receptionsstockauto | 2 | 2 | - | 1 | 0 | brouillon -- Valider réception --> validee | Valider réception | - |

## Détail des alertes

| Module | Area | Status | Severity | Message |
|---|---|---:|---:|---|
| clientsauto | states | WARN | HIGH | Missing target states in status options: prospect, actif, inactif, archive |
| clientsauto | workflow | WARN | HIGH | No real workflow transitions declared. |
| clientsauto | actions | WARN | MEDIUM | Missing or unmatched target actions: Activer client, Désactiver client, Réactiver client, Archiver client |
| vehicules | states | WARN | HIGH | Missing target states in status options: actif, entretien, immobilise, archive |
| vehicules | workflow | WARN | HIGH | No real workflow transitions declared. |
| vehicules | actions | WARN | MEDIUM | Missing or unmatched target actions: Marquer entretien requis, Immobiliser véhicule, Remettre en service, Archiver véhicule |
| rendezvous | states | OK | HIGH | All target states exist as status options. |
| rendezvous | workflow | WARN | HIGH | No real workflow transitions declared. |
| rendezvous | actions | WARN | MEDIUM | Missing or unmatched target actions: Reporter RDV |
| rendezvous | calculated-states | INFO | MEDIUM | Calculated/system states that should not necessarily be manual buttons: termine |
| interventionsauto | states | OK | HIGH | All target states exist as status options. |
| interventionsauto | workflow | WARN | HIGH | No real workflow transitions declared. |
| interventionsauto | actions | WARN | MEDIUM | Missing or unmatched target actions: Passer en diagnostic, Démarrer intervention, Terminer intervention |
| interventionsauto | calculated-states | INFO | MEDIUM | Calculated/system states that should not necessarily be manual buttons: facturee |
| lignesinterventionauto | states | WARN | HIGH | Missing target states in status options: retiree |
| lignesinterventionauto | workflow | WARN | HIGH | No real workflow transitions declared. |
| lignesinterventionauto | actions | WARN | MEDIUM | Missing or unmatched target actions: Valider la ligne, Retirer la ligne |
| lignesinterventionauto | calculated-states | INFO | MEDIUM | Calculated/system states that should not necessarily be manual buttons: retiree |
| facturesauto | states | OK | HIGH | All target states exist as status options. |
| facturesauto | workflow | WARN | HIGH | No real workflow transitions declared. |
| facturesauto | actions | WARN | MEDIUM | Missing or unmatched target actions: Ajouter paiement |
| facturesauto | calculated-states | INFO | MEDIUM | Calculated/system states that should not necessarily be manual buttons: en_attente, partiel, paye |
| encaissementsauto | states | OK | HIGH | All target states exist as status options. |
| encaissementsauto | workflow | WARN | HIGH | No real workflow transitions declared. |
| encaissementsauto | actions | WARN | MEDIUM | Missing or unmatched target actions: Envoyer reçu |
| echeancespaiementauto | states | OK | HIGH | All target states exist as status options. |
| echeancespaiementauto | workflow | WARN | HIGH | No real workflow transitions declared. |
| echeancespaiementauto | actions | WARN | MEDIUM | Missing or unmatched target actions: Marquer en retard |
| echeancespaiementauto | calculated-states | INFO | MEDIUM | Calculated/system states that should not necessarily be manual buttons: en_retard |
| produitsauto | states | OK | HIGH | All target states exist as status options. |
| produitsauto | workflow | WARN | HIGH | No real workflow transitions declared. |
| produitsauto | actions | WARN | MEDIUM | Missing or unmatched target actions: Marquer rupture, Réactiver produit, Archiver produit |
| produitsauto | calculated-states | INFO | MEDIUM | Calculated/system states that should not necessarily be manual buttons: rupture |
| stocksauto | states | OK | HIGH | All target states exist as status options. |
| stocksauto | workflow | WARN | HIGH | No real workflow transitions declared. |
| stocksauto | actions | WARN | MEDIUM | Missing or unmatched target actions: Détecter stock faible, Détecter rupture, Réapprovisionner |
| stocksauto | calculated-states | INFO | MEDIUM | Calculated/system states that should not necessarily be manual buttons: stock_faible, rupture, disponible |
| mouvementsstockauto | states | OK | HIGH | All target states exist as status options. |
| mouvementsstockauto | workflow | WARN | HIGH | No real workflow transitions declared. |
| mouvementsstockauto | actions | WARN | MEDIUM | Missing or unmatched target actions: Valider mouvement, Annuler mouvement |
| fournisseursauto | states | OK | HIGH | All target states exist as status options. |
| fournisseursauto | workflow | WARN | HIGH | No real workflow transitions declared. |
| fournisseursauto | actions | WARN | MEDIUM | Missing or unmatched target actions: Suspendre fournisseur, Réactiver fournisseur, Archiver fournisseur |
| commandesstockauto | states | OK | HIGH | All target states exist as status options. |
| commandesstockauto | workflow | WARN | HIGH | No real workflow transitions declared. |
| commandesstockauto | actions | WARN | MEDIUM | Missing or unmatched target actions: Envoyer commande, Réception partielle détectée, Réception complète détectée, Annuler commande |
| commandesstockauto | calculated-states | INFO | MEDIUM | Calculated/system states that should not necessarily be manual buttons: partiellement_recue, recue |
| lignescommandestockauto | states | OK | HIGH | All target states exist as status options. |
| lignescommandestockauto | workflow | WARN | HIGH | No real workflow transitions declared. |
| lignescommandestockauto | actions | WARN | MEDIUM | Missing or unmatched target actions: Valider ligne commande |
| receptionsstockauto | states | OK | HIGH | All target states exist as status options. |
| receptionsstockauto | workflow | WARN | HIGH | No real workflow transitions declared. |
| receptionsstockauto | actions | WARN | MEDIUM | Missing or unmatched target actions: Valider réception |

## Décisions importantes avant implémentation

### 1. États calculés

Certains états ne doivent probablement pas devenir des boutons utilisateur :

- `facturesauto.statutPaiement` : `en_attente`, `partiel`, `paye` doivent venir des encaissements.
- `stocksauto.statut` : `stock_faible`, `rupture`, `disponible` doivent venir des quantités et seuils.
- `commandesstockauto.statut` : `partiellement_recue`, `recue` doivent venir des réceptions.
- `receptionsstockauto.validee` déclenche un mouvement stock, mais ne doit pas être rejouable.
- `rendezvous.termine` peut être un état de consommation, mais ne doit pas recréer l’intervention.

### 2. Boutons runtime hors formulaire

Toutes les transitions utilisateur doivent être rendues dans une future `ERPRuntimeActionBar`, pas dans `ERPEnterpriseForm`.

### 3. Prochaine passe recommandée

Q2-OP-I8 doit produire un plan d’implémentation sécurisé :

- ajouter / normaliser les workflows metadata ;
- distinguer transitions utilisateur vs états calculés ;
- créer `ERPRuntimeActionBar` ;
- retirer `workflowActions` de `ERPEnterpriseForm` ;
- brancher les effets sur Business Rules / guards / services runtime ;
- ajouter audits bloquants.