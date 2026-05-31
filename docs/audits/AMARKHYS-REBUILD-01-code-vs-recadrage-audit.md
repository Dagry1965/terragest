# AMARKHYS-REBUILD-01 — Audit code vs recadrage consolidé

Objectif : mesurer les écarts entre le code actuel et le recadrage métier consolidé AMARKHYS.

## Doctrine runtime

| Check | Résultat |
|---|---:|
| Document consolidé présent | OK |
| ERPEnterpriseForm ne contient pas RuntimeActionEngine | OK |
| ERPRuntimePage rend ERPRuntimeActionBar | OK |
| RuntimeActionEngine existe | OK |
| RuntimeWorkflowEngine existe | OK |
| Business Rules existent | OK |
| Guards runtime existent | OK |
| statutParcoursAtelier présent dans recadrage | OK |

## Synthèse modules

| Priorité métier | Module | Fichier | Actions | Statuts | Champs | Marqueurs | Interdits | Couverture | Priorité correction |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| HIGH | Clients `clientsauto` | OK | 67% | 100% | 100% | 100% | 2 | 72% | HIGH |
| HIGH | Vehicules `vehicules` | OK | 17% | 100% | 100% | 100% | 2 | 59% | HIGH |
| HIGH | RDV `rendezvous` | OK | 20% | 100% | 100% | 100% | 3 | 50% | HIGH |
| HIGH | Interventions `interventionsauto` | OK | 50% | 100% | 100% | 100% | 4 | 58% | HIGH |
| HIGH | Lignes intervention `lignesinterventionauto` | OK | 50% | 100% | 100% | 100% | 1 | 78% | HIGH |
| HIGH | Factures `facturesauto` | OK | 20% | 100% | 100% | 100% | 4 | 50% | HIGH |
| HIGH | Encaissements `encaissementsauto` | OK | 25% | 100% | 86% | 100% | 3 | 48% | HIGH |
| LOW | Echeances paiement `echeancespaiementauto` | OK | 67% | 100% | 100% | 100% | 0 | 92% | LOW |
| LOW | Commandes stock `commandesstockauto` | OK | 50% | 100% | 100% | 100% | 0 | 88% | LOW |
| LOW | Lignes commande stock `lignescommandestockauto` | OK | 0% | 100% | 100% | 100% | 0 | 75% | LOW |
| LOW | Receptions stock `receptionsstockauto` | OK | 33% | 100% | 83% | 100% | 0 | 79% | LOW |

## Clients — `clientsauto`

- Module file : `src/runtime/modules/generated/clientsauto/clientsauto.module.ts` → OK
- Actions file : `src/runtime/modules/generated/clientsauto/clientsauto.actions.ts` → OK
- Couverture globale : 72%
- Priorité correction : HIGH

### Statuts attendus

| Statut | Détecté |
|---|---:|
| prospect | OK |
| actif | OK |
| inactif | OK |
| archive | OK |

### Actions attendues

| Action | Détectée |
|---|---:|
| Activer client | OK |
| Desactiver client | OK |
| Reactiver client | OK |
| Archiver client | OK |
| Ajouter vehicule | KO |
| Ouvrir fiche operationnelle | KO |

### Champs attendus

| Champ | Détecté |
|---|---:|
| nom | OK |
| telephone | OK |
| email | OK |
| typeClient | OK |
| statut | OK |

### Éléments interdits / à retirer

| Élément | Présent |
|---|---:|
| statutPaiement | KO - présent |
| statutFacture | KO - présent |
| statutIntervention | OK - absent |

### Diagnostic

Correction prioritaire. Le module contient des écarts majeurs ou des éléments interdits.

## Vehicules — `vehicules`

- Module file : `src/runtime/modules/generated/vehicules/vehicules.module.ts` → OK
- Actions file : `src/runtime/modules/generated/vehicules/vehicules.actions.ts` → OK
- Couverture globale : 59%
- Priorité correction : HIGH

### Statuts attendus

| Statut | Détecté |
|---|---:|
| actif | OK |
| entretien | OK |
| immobilise | OK |
| archive | OK |

### Actions attendues

| Action | Détectée |
|---|---:|
| Creer rendez-vous | KO |
| Voir fiche vehicule | KO |
| Marquer entretien requis | KO |
| Immobiliser vehicule | KO |
| Remettre en service | KO |
| Archiver vehicule | OK |

### Champs attendus

| Champ | Détecté |
|---|---:|
| clientId | OK |
| immatriculation | OK |
| marque | OK |
| modele | OK |
| carburant | OK |
| dateMiseEnCirculation | OK |
| dateFinGarantie | OK |
| statut | OK |

### Éléments interdits / à retirer

| Élément | Présent |
|---|---:|
| statutPaiement | KO - présent |
| statutFacture | KO - présent |
| statutIntervention | OK - absent |

### Diagnostic

Correction prioritaire. Le module contient des écarts majeurs ou des éléments interdits.

## RDV — `rendezvous`

- Module file : `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` → OK
- Actions file : `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts` → OK
- Couverture globale : 50%
- Priorité correction : HIGH

### Statuts attendus

| Statut | Détecté |
|---|---:|
| planifie | OK |
| confirme | OK |
| en_cours | OK |
| termine | OK |
| annule | OK |

### Actions attendues

| Action | Détectée |
|---|---:|
| Confirmer RDV | KO |
| Demarrer RDV | KO |
| Terminer RDV | KO |
| Annuler RDV | KO |
| Reporter RDV | OK |

### Champs attendus

| Champ | Détecté |
|---|---:|
| clientId | OK |
| vehiculeId | OK |
| typeService | OK |
| durationMinutes | OK |
| statut | OK |
| cancelledAt | OK |
| cancelledBy | OK |
| cancellationReason | OK |

### Éléments interdits / à retirer

| Élément | Présent |
|---|---:|
| statutPaiement | KO - présent |
| statutFacture | KO - présent |
| lignesIntervention | KO - présent |

### Diagnostic

Correction prioritaire. Le module contient des écarts majeurs ou des éléments interdits.

## Interventions — `interventionsauto`

- Module file : `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` → OK
- Actions file : `src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts` → OK
- Couverture globale : 58%
- Priorité correction : HIGH

### Statuts attendus

| Statut | Détecté |
|---|---:|
| ouverte | OK |
| diagnostic | OK |
| en_cours | OK |
| terminee | OK |
| annulee | OK |

### Actions attendues

| Action | Détectée |
|---|---:|
| Passer en diagnostic | OK |
| Demarrer intervention | OK |
| Terminer intervention | KO |
| Generer facture | KO |
| Annuler intervention | KO |
| Intervention exceptionnelle sans RDV | OK |

### Champs attendus

| Champ | Détecté |
|---|---:|
| clientId | OK |
| vehiculeId | OK |
| dateIntervention | OK |
| statut | OK |
| typeIntervention | OK |
| mecanicienId | OK |
| origineIntervention | OK |

### Éléments interdits / à retirer

| Élément | Présent |
|---|---:|
| statutPaiement | KO - présent |
| stockId | KO - présent |
| mouvementStockId | KO - présent |
| facturee | KO - présent |

### Diagnostic

Correction prioritaire. Le module contient des écarts majeurs ou des éléments interdits.

## Lignes intervention — `lignesinterventionauto`

- Module file : `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` → OK
- Actions file : `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.actions.ts` → OK
- Couverture globale : 78%
- Priorité correction : HIGH

### Statuts attendus

| Statut | Détecté |
|---|---:|
| brouillon | OK |
| validee | OK |
| retiree | OK |

### Actions attendues

| Action | Détectée |
|---|---:|
| Valider la ligne | KO |
| Retirer la ligne | OK |

### Champs attendus

| Champ | Détecté |
|---|---:|
| interventionId | OK |
| produitId | OK |
| quantite | OK |
| prixUnitaire | OK |
| montantHT | OK |
| montantTTC | OK |
| statut | OK |

### Éléments interdits / à retirer

| Élément | Présent |
|---|---:|
| statutPaiement | KO - présent |

### Diagnostic

Correction prioritaire. Le module contient des écarts majeurs ou des éléments interdits.

## Factures — `facturesauto`

- Module file : `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` → OK
- Actions file : `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` → OK
- Couverture globale : 50%
- Priorité correction : HIGH

### Statuts attendus

| Statut | Détecté |
|---|---:|
| brouillon | OK |
| emise | OK |
| annulee | OK |

### Actions attendues

| Action | Détectée |
|---|---:|
| Valider facture | KO |
| Annuler facture | OK |
| Voir encaissements | KO |
| Ajouter encaissement | KO |
| Relancer client | KO |

### Champs attendus

| Champ | Détecté |
|---|---:|
| clientId | OK |
| origineFacture | OK |
| montantHT | OK |
| montantTTC | OK |
| montantPaye | OK |
| resteAPayer | OK |
| statutFacture | OK |

### Marqueurs spécifiques

| Marqueur | Détecté |
|---|---:|
| atelier | OK |
| boutique | OK |
| client_garage | OK |
| client_comptoir | OK |

### Éléments interdits / à retirer

| Élément | Présent |
|---|---:|
| modePaiement | KO - présent |
| referenceTransaction | KO - présent |
| statutEnvoiRecu | KO - présent |
| datePaiement | KO - présent |

### Diagnostic

Correction prioritaire. Le module contient des écarts majeurs ou des éléments interdits.

## Encaissements — `encaissementsauto`

- Module file : `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts` → OK
- Actions file : `src/runtime/modules/generated/encaissementsauto/encaissementsauto.actions.ts` → OK
- Couverture globale : 48%
- Priorité correction : HIGH

### Statuts attendus

| Statut | Détecté |
|---|---:|
| en_attente | OK |
| valide | OK |
| rejete | OK |
| annule | OK |

### Actions attendues

| Action | Détectée |
|---|---:|
| Valider encaissement | KO |
| Rejeter encaissement | KO |
| Annuler encaissement | OK |
| Envoyer recu | KO |

### Champs attendus

| Champ | Détecté |
|---|---:|
| factureId | OK |
| montantEncaisse | KO |
| datePaiement | OK |
| modePaiement | OK |
| referenceTransaction | OK |
| raisonRejetPaiement | OK |
| statutEnvoiRecu | OK |

### Éléments interdits / à retirer

| Élément | Présent |
|---|---:|
| diagnostic | KO - présent |
| travaux | KO - présent |
| stockId | KO - présent |

### Diagnostic

Correction prioritaire. Le module contient des écarts majeurs ou des éléments interdits.

## Echeances paiement — `echeancespaiementauto`

- Module file : `src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts` → OK
- Actions file : `src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.actions.ts` → OK
- Couverture globale : 92%
- Priorité correction : LOW

### Statuts attendus

| Statut | Détecté |
|---|---:|
| a_venir | OK |
| en_retard | OK |
| partiellement_payee | OK |
| payee | OK |
| annulee | OK |

### Actions attendues

| Action | Détectée |
|---|---:|
| Marquer payee | OK |
| Relancer client | KO |
| Annuler echeance | OK |

### Champs attendus

| Champ | Détecté |
|---|---:|
| factureId | OK |
| montantPrevu | OK |
| montantPaye | OK |
| dateEcheance | OK |
| statut | OK |

### Éléments interdits / à retirer

| Élément | Présent |
|---|---:|
| modePaiement | OK - absent |

### Diagnostic

Conformité correcte. À stabiliser par tests et gouvernance runtime.

## Commandes stock — `commandesstockauto`

- Module file : `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` → OK
- Actions file : `src/runtime/modules/generated/commandesstockauto/commandesstockauto.actions.ts` → KO
- Couverture globale : 88%
- Priorité correction : LOW

### Statuts attendus

| Statut | Détecté |
|---|---:|
| brouillon | OK |
| envoyee | OK |
| partiellement_recue | OK |
| recue | OK |
| annulee | OK |

### Actions attendues

| Action | Détectée |
|---|---:|
| Envoyer commande | OK |
| Creer reception | KO |
| Annuler commande | OK |
| Voir receptions | KO |

### Champs attendus

| Champ | Détecté |
|---|---:|
| fournisseurId | OK |
| dateCommande | OK |
| montantHT | OK |
| montantTVA | OK |
| montantTTC | OK |
| statut | OK |

### Marqueurs spécifiques

| Marqueur | Détecté |
|---|---:|
| partiellement_recue | OK |
| recue | OK |

### Diagnostic

Conformité correcte. À stabiliser par tests et gouvernance runtime.

## Lignes commande stock — `lignescommandestockauto`

- Module file : `src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts` → OK
- Actions file : `src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.actions.ts` → KO
- Couverture globale : 75%
- Priorité correction : LOW

### Statuts attendus

| Statut | Détecté |
|---|---:|
| brouillon | OK |
| validee | OK |

### Actions attendues

| Action | Détectée |
|---|---:|
| Valider ligne commande | KO |
| Annuler ligne commande | KO |

### Champs attendus

| Champ | Détecté |
|---|---:|
| commandeId | OK |
| produitId | OK |
| quantite | OK |
| prixUnitaireHT | OK |
| montantHT | OK |
| montantTTC | OK |

### Marqueurs spécifiques

| Marqueur | Détecté |
|---|---:|
| prixUnitaireHT | OK |
| montantHT | OK |
| montantTTC | OK |

### Diagnostic

Conformité correcte. À stabiliser par tests et gouvernance runtime.

## Receptions stock — `receptionsstockauto`

- Module file : `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` → OK
- Actions file : `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.actions.ts` → KO
- Couverture globale : 79%
- Priorité correction : LOW

### Statuts attendus

| Statut | Détecté |
|---|---:|
| brouillon | OK |
| validee | OK |

### Actions attendues

| Action | Détectée |
|---|---:|
| Valider reception | OK |
| Annuler reception | KO |
| Voir mouvement stock lie | KO |

### Champs attendus

| Champ | Détecté |
|---|---:|
| commandeId | OK |
| ligneCommandeId | OK |
| produitId | OK |
| stockDestinationId | KO |
| quantiteRecue | OK |
| mouvementStockId | OK |

### Diagnostic

Conformité correcte. À stabiliser par tests et gouvernance runtime.

## Ordre recommandé de correction

- HIGH — Clients `clientsauto` — couverture 72%
- HIGH — Vehicules `vehicules` — couverture 59%
- HIGH — RDV `rendezvous` — couverture 50%
- HIGH — Interventions `interventionsauto` — couverture 58%
- HIGH — Lignes intervention `lignesinterventionauto` — couverture 78%
- HIGH — Factures `facturesauto` — couverture 50%
- HIGH — Encaissements `encaissementsauto` — couverture 48%
- LOW — Echeances paiement `echeancespaiementauto` — couverture 92%
- LOW — Commandes stock `commandesstockauto` — couverture 88%
- LOW — Lignes commande stock `lignescommandestockauto` — couverture 75%
- LOW — Receptions stock `receptionsstockauto` — couverture 79%
