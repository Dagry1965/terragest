# AMARKHYS-REBUILD-01-B — Audit précis code vs recadrage consolidé

Correction de l'audit : les champs interdits sont désormais cherchés uniquement dans le module concerné, pas dans tout le runtime.

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

| Ordre métier | Module | Module | Actions | Statuts | Champs | Marqueurs | Interdits locaux | Couverture | Priorité |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | Clients `clientsauto` | OK | 0% | 100% | 100% | 100% | 1 | 60% | HIGH |
| 2 | Vehicules `vehicules` | OK | 0% | 100% | 88% | 100% | 1 | 57% | HIGH |
| 3 | RDV `rendezvous` | OK | 20% | 100% | 63% | 100% | 0 | 71% | MEDIUM |
| 4 | Interventions `interventionsauto` | OK | 33% | 100% | 71% | 100% | 3 | 36% | HIGH |
| 5 | Lignes intervention `lignesinterventionauto` | OK | 50% | 67% | 100% | 100% | 0 | 79% | LOW |
| 6 | Factures `facturesauto` | OK | 20% | 100% | 86% | 25% | 3 | 18% | HIGH |
| 7 | Encaissements `encaissementsauto` | OK | 0% | 100% | 71% | 100% | 0 | 68% | MEDIUM |
| 7 | Echeances paiement `echeancespaiementauto` | OK | 33% | 100% | 100% | 100% | 0 | 83% | LOW |
| 8 | Commandes stock `commandesstockauto` | OK | 50% | 100% | 83% | 100% | 0 | 83% | LOW |
| 8 | Lignes commande stock `lignescommandestockauto` | OK | 0% | 100% | 100% | 100% | 0 | 75% | LOW |
| 8 | Receptions stock `receptionsstockauto` | OK | 33% | 100% | 83% | 100% | 0 | 79% | LOW |

## Clients — `clientsauto`

- Couverture : 60%
- Priorité : HIGH
- Module : `src/runtime/modules/generated/clientsauto/clientsauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/clientsauto/clientsauto.actions.ts` → OK

### Actions manquantes
- KO — Activer client
- KO — Desactiver client
- KO — Reactiver client
- KO — Archiver client
- KO — Ajouter vehicule
- KO — Ouvrir fiche operationnelle

### Champs attendus manquants
- Aucun

### Statuts attendus manquants
- Aucun

### Éléments interdits locaux
- KO — présent localement : statutPaiement

## Vehicules — `vehicules`

- Couverture : 57%
- Priorité : HIGH
- Module : `src/runtime/modules/generated/vehicules/vehicules.module.ts` → OK
- Actions : `src/runtime/modules/generated/vehicules/vehicules.actions.ts` → OK

### Actions manquantes
- KO — Creer rendez-vous
- KO — Voir fiche vehicule
- KO — Marquer entretien requis
- KO — Immobiliser vehicule
- KO — Remettre en service
- KO — Archiver vehicule

### Champs attendus manquants
- KO — dateFinGarantie

### Statuts attendus manquants
- Aucun

### Éléments interdits locaux
- KO — présent localement : statutPaiement

## RDV — `rendezvous`

- Couverture : 71%
- Priorité : MEDIUM
- Module : `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` → OK
- Actions : `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts` → OK

### Actions manquantes
- KO — Confirmer RDV
- KO — Demarrer RDV
- KO — Terminer RDV
- KO — Annuler RDV

### Champs attendus manquants
- KO — cancelledAt
- KO — cancelledBy
- KO — cancellationReason

### Statuts attendus manquants
- Aucun

### Éléments interdits locaux
- Aucun

## Interventions — `interventionsauto`

- Couverture : 36%
- Priorité : HIGH
- Module : `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts` → OK

### Actions manquantes
- KO — Terminer intervention
- KO — Generer facture
- KO — Annuler intervention
- KO — Intervention exceptionnelle sans RDV

### Champs attendus manquants
- KO — mecanicienId
- KO — origineIntervention

### Statuts attendus manquants
- Aucun

### Éléments interdits locaux
- KO — présent localement : statutPaiement
- KO — présent localement : stockId
- KO — présent localement : facturee

## Lignes intervention — `lignesinterventionauto`

- Couverture : 79%
- Priorité : LOW
- Module : `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.actions.ts` → OK

### Actions manquantes
- KO — Valider la ligne

### Champs attendus manquants
- Aucun

### Statuts attendus manquants
- KO — retiree

### Éléments interdits locaux
- Aucun

## Factures — `facturesauto`

- Couverture : 18%
- Priorité : HIGH
- Module : `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` → OK

### Actions manquantes
- KO — Valider facture
- KO — Voir encaissements
- KO — Ajouter encaissement
- KO — Relancer client

### Champs attendus manquants
- KO — origineFacture

### Statuts attendus manquants
- Aucun

### Éléments interdits locaux
- KO — présent localement : modePaiement
- KO — présent localement : referenceTransaction
- KO — présent localement : datePaiement

## Encaissements — `encaissementsauto`

- Couverture : 68%
- Priorité : MEDIUM
- Module : `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/encaissementsauto/encaissementsauto.actions.ts` → OK

### Actions manquantes
- KO — Valider encaissement
- KO — Rejeter encaissement
- KO — Annuler encaissement
- KO — Envoyer recu

### Champs attendus manquants
- KO — montantEncaisse
- KO — raisonRejetPaiement

### Statuts attendus manquants
- Aucun

### Éléments interdits locaux
- Aucun

## Echeances paiement — `echeancespaiementauto`

- Couverture : 83%
- Priorité : LOW
- Module : `src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.actions.ts` → OK

### Actions manquantes
- KO — Relancer client
- KO — Annuler echeance

### Champs attendus manquants
- Aucun

### Statuts attendus manquants
- Aucun

### Éléments interdits locaux
- Aucun

## Commandes stock — `commandesstockauto`

- Couverture : 83%
- Priorité : LOW
- Module : `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/commandesstockauto/commandesstockauto.actions.ts` → KO

### Actions manquantes
- KO — Creer reception
- KO — Voir receptions

### Champs attendus manquants
- KO — montantTVA

### Statuts attendus manquants
- Aucun

### Éléments interdits locaux
- Aucun

## Lignes commande stock — `lignescommandestockauto`

- Couverture : 75%
- Priorité : LOW
- Module : `src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.actions.ts` → KO

### Actions manquantes
- KO — Valider ligne commande
- KO — Annuler ligne commande

### Champs attendus manquants
- Aucun

### Statuts attendus manquants
- Aucun

### Éléments interdits locaux
- Aucun

## Receptions stock — `receptionsstockauto`

- Couverture : 79%
- Priorité : LOW
- Module : `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.actions.ts` → KO

### Actions manquantes
- KO — Annuler reception
- KO — Voir mouvement stock lie

### Champs attendus manquants
- KO — stockDestinationId

### Statuts attendus manquants
- Aucun

### Éléments interdits locaux
- Aucun

## Ordre recommandé de correction

- HIGH — Clients `clientsauto` — couverture 60%
- HIGH — Vehicules `vehicules` — couverture 57%
- HIGH — Interventions `interventionsauto` — couverture 36%
- HIGH — Factures `facturesauto` — couverture 18%
- MEDIUM — RDV `rendezvous` — couverture 71%
- MEDIUM — Encaissements `encaissementsauto` — couverture 68%
- LOW — Lignes intervention `lignesinterventionauto` — couverture 79%
- LOW — Echeances paiement `echeancespaiementauto` — couverture 83%
- LOW — Commandes stock `commandesstockauto` — couverture 83%
- LOW — Lignes commande stock `lignescommandestockauto` — couverture 75%
- LOW — Receptions stock `receptionsstockauto` — couverture 79%
