# Audit conformité runtime — Cartographie métier AMARKHYS

Document généré par audit automatique du code Terragest_V2 contre la cartographie métier AMARKHYS.

## Principe directeur audité

- Aucun bouton workflow dans ERPEnterpriseForm.
- Aucune transition statut libre dans le formulaire.
- Aucune creation enfant sans contexte parent.
- Aucune modification stock sans mouvement.
- Aucun paiement sans facture parent.
- Les boutons metier doivent etre rendus par ERPRuntimePage / ERPRuntimeActionBar.
- L'execution doit passer par RuntimeActionEngine, RuntimeWorkflowEngine, Business Rules, guards et services runtime.

## Synthèse transversale

- Doctrine runtime conforme : 8/8
- Modules audités : 15

| Check | Résultat |
|---|---:|
| ERPEnterpriseForm ne doit pas importer RuntimeActionEngine | OK |
| ERPEnterpriseForm ne doit pas contenir workflowActions.map | OK |
| ERPRuntimePage utilise ERPRuntimeActionBar | OK |
| ERPRuntimePage utilise RuntimeActionEngine.execute | OK |
| RuntimeActionEngine existe | OK |
| RuntimeWorkflowEngine existe | OK |
| Business Rules existent | OK |
| Guards runtime existent | OK |

## Synthèse par module

| Module | Fichier module | Actions | Statuts | Boutons | Workflows | Règles | Couverture | Priorité |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Clients `clientsauto` | OK | OK | 100% | 0% | 0% | 100% | 50% | MEDIUM |
| Vehicules `vehicules` | OK | OK | 100% | 0% | 0% | 100% | 50% | MEDIUM |
| Rendez-vous `rendezvous` | OK | OK | 100% | 20% | 20% | 100% | 60% | MEDIUM |
| Interventions `interventionsauto` | OK | OK | 100% | 40% | 40% | 100% | 70% | LOW |
| Lignes intervention `lignesinterventionauto` | OK | OK | 67% | 50% | 0% | 100% | 54% | MEDIUM |
| Factures `facturesauto` | OK | OK | 100% | 40% | 50% | 100% | 73% | LOW |
| Encaissements `encaissementsauto` | OK | OK | 100% | 0% | 0% | 100% | 50% | MEDIUM |
| Echeances paiement `echeancespaiementauto` | OK | OK | 100% | 33% | 50% | 100% | 71% | LOW |
| Produits `produitsauto` | OK | OK | 100% | 0% | 0% | 100% | 50% | MEDIUM |
| Stocks `stocksauto` | OK | OK | 100% | 0% | 33% | 100% | 58% | MEDIUM |
| Mouvements stock `mouvementsstockauto` | OK | KO | 100% | 0% | 0% | 100% | 50% | MEDIUM |
| Fournisseurs `fournisseursauto` | OK | KO | 100% | 0% | 0% | 100% | 50% | MEDIUM |
| Commandes stock `commandesstockauto` | OK | KO | 100% | 67% | 50% | 100% | 79% | LOW |
| Lignes commande stock `lignescommandestockauto` | OK | KO | 100% | 0% | 0% | 100% | 50% | MEDIUM |
| Receptions stock `receptionsstockauto` | OK | KO | 100% | 50% | 100% | 100% | 88% | LOW |

## Clients — `clientsauto`

### 1. Ce que le module gère

Dossier client automobile et point d'entree de la relation client.

### 2. Statuts attendus vs détectés

| Statut attendu | Détecté dans code |
|---|---:|
| prospect | OK |
| actif | OK |
| inactif | OK |
| archive | OK |

Couverture statuts : 100%

### 3. Workflows attendus vs détectés

| Départ | Bouton attendu | Arrivée | Détecté |
|---|---|---|---:|
| prospect | Activer client | actif | KO |
| actif | Desactiver client | inactif | KO |
| inactif | Reactiver client | actif | KO |
| prospect/actif/inactif | Archiver client | archive | KO |

Couverture workflows : 0%

### 4. Boutons attendus vs détectés

| Bouton attendu | Détecté dans actions/workflows |
|---|---:|
| Activer client | KO |
| Desactiver client | KO |
| Reactiver client | KO |
| Archiver client | KO |
| Ajouter vehicule | KO |
| Ouvrir fiche operationnelle | KO |

Couverture boutons : 0%

### 5. Règles métier attendues vs indices détectés

| Règle attendue | Indice détecté |
|---|---:|
| R-CLI-01 client actif peut avoir vehicules RDV interventions factures encaissements | OK |
| R-CLI-02 client archive reste consultable pour historique | OK |
| R-CLI-03 type client pilote affichage vehicules cartes/tableau compact | OK |
| R-CLI-04 recherche client par vehicule ou immatriculation | OK |
| R-CLI-05 creation vehicule depuis client pre-remplit clientId | OK |
| R-CLI-06 boutons activation/desactivation/archivage via runtime | OK |

Couverture règles : 100%

### 6. Routes et fichiers

- Module : `src/runtime/modules/generated/clientsauto/clientsauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/clientsauto/clientsauto.actions.ts` → OK
- Route : `src/app/(private)/clientsauto/page.tsx` → OK
- Route : `src/app/(private)/clientsauto/[id]/page.tsx` → OK
- Route : `src/app/(private)/clientsauto/[id]/edit/page.tsx` → OK

### 7. Diagnostic

Couverture partielle. Des actions, workflows ou règles doivent être complétés.

### 8. Emplacement cible des boutons

ERPRuntimePage → ERPRuntimeActionBar → hors ERPEnterpriseForm.

## Vehicules — `vehicules`

### 1. Ce que le module gère

Fiche vehicule rattachee a un client, pivot operationnel entre client et atelier.

### 2. Statuts attendus vs détectés

| Statut attendu | Détecté dans code |
|---|---:|
| actif | OK |
| entretien | OK |
| immobilise | OK |
| archive | OK |

Couverture statuts : 100%

### 3. Workflows attendus vs détectés

| Départ | Bouton attendu | Arrivée | Détecté |
|---|---|---|---:|
| actif | Marquer entretien requis | entretien | KO |
| entretien | Immobiliser vehicule | immobilise | KO |
| entretien/immobilise | Remettre en service | actif | KO |
| actif/entretien/immobilise | Archiver vehicule | archive | KO |

Couverture workflows : 0%

### 4. Boutons attendus vs détectés

| Bouton attendu | Détecté dans actions/workflows |
|---|---:|
| Creer rendez-vous | KO |
| Voir fiche vehicule | KO |
| Marquer entretien requis | KO |
| Immobiliser vehicule | KO |
| Remettre en service | KO |
| Archiver vehicule | KO |

Couverture boutons : 0%

### 5. Règles métier attendues vs indices détectés

| Règle attendue | Indice détecté |
|---|---:|
| R-VEH-01 vehicule appartient a un client | OK |
| R-VEH-02 vehicule selectionne filtre les RDV | OK |
| R-VEH-03 RDV selectionne filtre les interventions | OK |
| R-VEH-04 creation RDV depuis vehicule pre-remplit clientId vehiculeId | OK |
| R-VEH-05 archivage vehicule conserve historique | OK |

Couverture règles : 100%

### 6. Routes et fichiers

- Module : `src/runtime/modules/generated/vehicules/vehicules.module.ts` → OK
- Actions : `src/runtime/modules/generated/vehicules/vehicules.actions.ts` → OK
- Route : `src/app/(private)/vehicules/page.tsx` → OK
- Route : `src/app/(private)/vehicules/[id]/page.tsx` → OK
- Route : `src/app/(private)/vehicules/[id]/edit/page.tsx` → OK

### 7. Diagnostic

Couverture partielle. Des actions, workflows ou règles doivent être complétés.

### 8. Emplacement cible des boutons

ERPRuntimePage → ERPRuntimeActionBar → hors ERPEnterpriseForm.

## Rendez-vous — `rendezvous`

### 1. Ce que le module gère

Planification atelier avant intervention.

### 2. Statuts attendus vs détectés

| Statut attendu | Détecté dans code |
|---|---:|
| planifie | OK |
| confirme | OK |
| en_cours | OK |
| termine | OK |
| annule | OK |

Couverture statuts : 100%

### 3. Workflows attendus vs détectés

| Départ | Bouton attendu | Arrivée | Détecté |
|---|---|---|---:|
| planifie | Confirmer RDV | confirme | KO |
| confirme | Demarrer RDV | en_cours | KO |
| en_cours | Terminer RDV | termine | KO |
| planifie/confirme/en_cours | Annuler RDV | annule | KO |
| planifie/confirme | Reporter RDV | planifie | OK |

Couverture workflows : 20%

### 4. Boutons attendus vs détectés

| Bouton attendu | Détecté dans actions/workflows |
|---|---:|
| Confirmer RDV | KO |
| Demarrer RDV | KO |
| Terminer RDV | KO |
| Annuler RDV | KO |
| Reporter RDV | OK |

Couverture boutons : 20%

### 5. Règles métier attendues vs indices détectés

| Règle attendue | Indice détecté |
|---|---:|
| R-RDV-01 RDV confirme peut creer intervention | OK |
| R-RDV-02 RDV consomme ne cree jamais deuxieme intervention | OK |
| R-RDV-03 RDV conserve typeService durationMinutes | OK |
| R-RDV-04 creneau occupe non disponible | OK |
| R-RDV-05 creation RDV depuis vehicule pre-remplit clientId vehiculeId | OK |
| R-RDV-06 statut RDV via runtime pas formulaire | OK |
| R-RDV-07 hub client vehicule RDV intervention | OK |

Couverture règles : 100%

### 6. Routes et fichiers

- Module : `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` → OK
- Actions : `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts` → OK
- Route : `src/app/(private)/rendezvous/page.tsx` → OK
- Route : `src/app/(private)/rendezvous/[id]/page.tsx` → OK
- Route : `src/app/(private)/rendezvous/[id]/edit/page.tsx` → OK

### 7. Diagnostic

Couverture partielle. Des actions, workflows ou règles doivent être complétés.

### 8. Emplacement cible des boutons

ERPRuntimePage → ERPRuntimeActionBar → hors ERPEnterpriseForm.

## Interventions — `interventionsauto`

### 1. Ce que le module gère

Execution atelier et cycle central travaux.

### 2. Statuts attendus vs détectés

| Statut attendu | Détecté dans code |
|---|---:|
| ouverte | OK |
| diagnostic | OK |
| en_cours | OK |
| terminee | OK |
| facturee | OK |
| annulee | OK |

Couverture statuts : 100%

### 3. Workflows attendus vs détectés

| Départ | Bouton attendu | Arrivée | Détecté |
|---|---|---|---:|
| ouverte | Passer en diagnostic | diagnostic | OK |
| ouverte/diagnostic | Demarrer intervention | en_cours | OK |
| diagnostic/en_cours | Terminer intervention | terminee | KO |
| terminee | Generer facture | facturee | KO |
| ouverte/diagnostic/en_cours | Annuler intervention | annulee | KO |

Couverture workflows : 40%

### 4. Boutons attendus vs détectés

| Bouton attendu | Détecté dans actions/workflows |
|---|---:|
| Passer en diagnostic | OK |
| Demarrer intervention | OK |
| Terminer intervention | KO |
| Generer facture | KO |
| Annuler intervention | KO |

Couverture boutons : 40%

### 5. Règles métier attendues vs indices détectés

| Règle attendue | Indice détecté |
|---|---:|
| R-INT-01 intervention creee depuis RDV confirme | OK |
| R-INT-02 intervention terminee peut generer facture | OK |
| R-INT-03 intervention ne genere pas deux factures | OK |
| R-INT-04 champs herites RDV client vehicule verrouilles | OK |
| R-INT-05 lignes brouillon exclues des totaux | OK |
| R-INT-06 lignes retirees exclues des totaux | OK |
| R-INT-07 intervention facturee protegee | OK |

Couverture règles : 100%

### 6. Routes et fichiers

- Module : `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts` → OK
- Route : `src/app/(private)/interventionsauto/page.tsx` → OK
- Route : `src/app/(private)/interventionsauto/[id]/page.tsx` → OK
- Route : `src/app/(private)/interventionsauto/[id]/edit/page.tsx` → OK

### 7. Diagnostic

Couverture globalement correcte. À consolider par tests fonctionnels.

### 8. Emplacement cible des boutons

ERPRuntimePage → ERPRuntimeActionBar → hors ERPEnterpriseForm.

## Lignes intervention — `lignesinterventionauto`

### 1. Ce que le module gère

Detail d'une intervention, totaux et impact stock eventuel.

### 2. Statuts attendus vs détectés

| Statut attendu | Détecté dans code |
|---|---:|
| brouillon | OK |
| validee | OK |
| retiree | KO |

Couverture statuts : 67%

### 3. Workflows attendus vs détectés

| Départ | Bouton attendu | Arrivée | Détecté |
|---|---|---|---:|
| brouillon | Valider la ligne | validee | KO |
| brouillon/validee | Retirer la ligne | retiree | KO |

Couverture workflows : 0%

### 4. Boutons attendus vs détectés

| Bouton attendu | Détecté dans actions/workflows |
|---|---:|
| Valider la ligne | KO |
| Retirer la ligne | OK |

Couverture boutons : 50%

### 5. Règles métier attendues vs indices détectés

| Règle attendue | Indice détecté |
|---|---:|
| R-LIG-01 ligne creee depuis intervention parent | OK |
| R-LIG-02 ligne brouillon ne compte pas | OK |
| R-LIG-03 ligne validee compte | OK |
| R-LIG-04 ligne retiree ne compte plus mais reste auditee | OK |
| R-LIG-05 ligne piece validee peut declencher sortie stock | OK |
| R-LIG-06 type article vient du produit | OK |
| R-LIG-07 stock auto si un seul stock disponible | OK |
| R-LIG-08 stock insuffisant bloque ou alerte | OK |

Couverture règles : 100%

### 6. Routes et fichiers

- Module : `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.actions.ts` → OK
- Route : `src/app/(private)/lignesinterventionauto/page.tsx` → OK
- Route : `src/app/(private)/lignesinterventionauto/[id]/page.tsx` → OK
- Route : `src/app/(private)/lignesinterventionauto/[id]/edit/page.tsx` → OK

### 7. Diagnostic

Couverture partielle. Des actions, workflows ou règles doivent être complétés.

### 8. Emplacement cible des boutons

ERPRuntimePage → ERPRuntimeActionBar → hors ERPEnterpriseForm.

## Factures — `facturesauto`

### 1. Ce que le module gère

Preuve commerciale et suivi financier.

### 2. Statuts attendus vs détectés

| Statut attendu | Détecté dans code |
|---|---:|
| brouillon | OK |
| emise | OK |
| annulee | OK |
| en_attente | OK |
| partiel | OK |
| paye | OK |
| non_envoyee | OK |
| envoyee | OK |
| echec | OK |

Couverture statuts : 100%

### 3. Workflows attendus vs détectés

| Départ | Bouton attendu | Arrivée | Détecté |
|---|---|---|---:|
| brouillon | Valider facture | emise | KO |
| emise | Annuler facture | annulee | OK |
| non_envoyee/echec | Marquer comme envoyee | envoyee | OK |
| en_attente/partiel | Ajouter paiement | partiel/paye | KO |

Couverture workflows : 50%

### 4. Boutons attendus vs détectés

| Bouton attendu | Détecté dans actions/workflows |
|---|---:|
| Valider facture | KO |
| Annuler facture | OK |
| Marquer comme envoyee | OK |
| Voir historique encaissements | KO |
| Ajouter paiement | KO |

Couverture boutons : 40%

### 5. Règles métier attendues vs indices détectés

| Règle attendue | Indice détecté |
|---|---:|
| R-FAC-01 facture creee depuis intervention terminee | OK |
| R-FAC-02 montants facture viennent des lignes validees | OK |
| R-FAC-03 montant paye somme encaissements valides | OK |
| R-FAC-04 reste a payer = montantTTC - montantPaye | OK |
| R-FAC-05 reste a payer zero donne statut paye | OK |
| R-FAC-06 paiement partiel donne statut partiel | OK |
| R-FAC-07 aucun paiement donne en_attente | OK |
| R-FAC-08 encaissement cree avec contexte facture | OK |
| R-FAC-09 pas deux boutons concurrents ajouter paiement | OK |

Couverture règles : 100%

### 6. Routes et fichiers

- Module : `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` → OK
- Route : `src/app/(private)/facturesauto/page.tsx` → OK
- Route : `src/app/(private)/facturesauto/[id]/page.tsx` → OK
- Route : `src/app/(private)/facturesauto/[id]/edit/page.tsx` → OK

### 7. Diagnostic

Couverture globalement correcte. À consolider par tests fonctionnels.

### 8. Emplacement cible des boutons

ERPRuntimePage → ERPRuntimeActionBar → hors ERPEnterpriseForm.

## Encaissements — `encaissementsauto`

### 1. Ce que le module gère

Paiement recu, preuve et comptabilisation.

### 2. Statuts attendus vs détectés

| Statut attendu | Détecté dans code |
|---|---:|
| en_attente | OK |
| valide | OK |
| rejete | OK |
| annule | OK |
| non_envoye | OK |
| envoye | OK |
| echec | OK |

Couverture statuts : 100%

### 3. Workflows attendus vs détectés

| Départ | Bouton attendu | Arrivée | Détecté |
|---|---|---|---:|
| en_attente | Valider encaissement | valide | KO |
| en_attente | Rejeter encaissement | rejete | KO |
| en_attente/valide | Annuler encaissement | annule | KO |
| non_envoye/echec | Envoyer recu | envoye | KO |

Couverture workflows : 0%

### 4. Boutons attendus vs détectés

| Bouton attendu | Détecté dans actions/workflows |
|---|---:|
| Valider encaissement | KO |
| Rejeter encaissement | KO |
| Annuler encaissement | KO |
| Envoyer recu | KO |

Couverture boutons : 0%

### 5. Règles métier attendues vs indices détectés

| Règle attendue | Indice détecté |
|---|---:|
| R-ENC-01 encaissement cree depuis facture parent | OK |
| R-ENC-02 lien transporte parentModuleKey parentRecordId parentForeignKey | OK |
| R-ENC-03 factureId clientId vehiculeId pre-remplis et verrouilles | OK |
| R-ENC-04 encaissement valide met a jour facture | OK |
| R-ENC-05 encaissement annule recalcule facture | OK |
| R-ENC-06 encaissement ne modifie pas facture hors contexte | OK |

Couverture règles : 100%

### 6. Routes et fichiers

- Module : `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/encaissementsauto/encaissementsauto.actions.ts` → OK
- Route : `src/app/(private)/encaissementsauto/page.tsx` → OK
- Route : `src/app/(private)/encaissementsauto/[id]/page.tsx` → OK
- Route : `src/app/(private)/encaissementsauto/[id]/edit/page.tsx` → OK

### 7. Diagnostic

Couverture partielle. Des actions, workflows ou règles doivent être complétés.

### 8. Emplacement cible des boutons

ERPRuntimePage → ERPRuntimeActionBar → hors ERPEnterpriseForm.

## Echeances paiement — `echeancespaiementauto`

### 1. Ce que le module gère

Paiements prevus ou fractionnes.

### 2. Statuts attendus vs détectés

| Statut attendu | Détecté dans code |
|---|---:|
| a_venir | OK |
| en_retard | OK |
| partiellement_payee | OK |
| payee | OK |
| annulee | OK |

Couverture statuts : 100%

### 3. Workflows attendus vs détectés

| Départ | Bouton attendu | Arrivée | Détecté |
|---|---|---|---:|
| a_venir | Marquer en retard | en_retard | OK |
| a_venir/en_retard/partiellement_payee | Marquer payee | payee | OK |
| a_venir/en_retard/partiellement_payee | Annuler echeance | annulee | KO |
| en_retard | Relancer client | en_retard | KO |

Couverture workflows : 50%

### 4. Boutons attendus vs détectés

| Bouton attendu | Détecté dans actions/workflows |
|---|---:|
| Marquer payee | OK |
| Relancer client | KO |
| Annuler echeance | KO |

Couverture boutons : 33%

### 5. Règles métier attendues vs indices détectés

| Règle attendue | Indice détecté |
|---|---:|
| R-ECH-01 echeance liee a facture | OK |
| R-ECH-02 echeance payee contribue suivi financier | OK |
| R-ECH-03 relance auditee | OK |
| R-ECH-04 statut en_retard calcule par job runtime | OK |
| R-ECH-05 echeance ne modifie pas facture sans regle claire | OK |

Couverture règles : 100%

### 6. Routes et fichiers

- Module : `src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.actions.ts` → OK
- Route : `src/app/(private)/echeancespaiementauto/page.tsx` → OK
- Route : `src/app/(private)/echeancespaiementauto/[id]/page.tsx` → OK
- Route : `src/app/(private)/echeancespaiementauto/[id]/edit/page.tsx` → OK

### 7. Diagnostic

Couverture globalement correcte. À consolider par tests fonctionnels.

### 8. Emplacement cible des boutons

ERPRuntimePage → ERPRuntimeActionBar → hors ERPEnterpriseForm.

## Produits — `produitsauto`

### 1. Ce que le module gère

Catalogue pieces/services.

### 2. Statuts attendus vs détectés

| Statut attendu | Détecté dans code |
|---|---:|
| actif | OK |
| rupture | OK |
| inactif | OK |
| archive | OK |

Couverture statuts : 100%

### 3. Workflows attendus vs détectés

| Départ | Bouton attendu | Arrivée | Détecté |
|---|---|---|---:|
| actif | Marquer rupture | rupture | KO |
| rupture/inactif | Reactiver produit | actif | KO |
| actif/rupture/inactif | Archiver produit | archive | KO |

Couverture workflows : 0%

### 4. Boutons attendus vs détectés

| Bouton attendu | Détecté dans actions/workflows |
|---|---:|
| Creer stock associe | KO |
| Voir hub produit/stock | KO |
| Marquer rupture | KO |
| Reactiver produit | KO |
| Archiver produit | KO |

Couverture boutons : 0%

### 5. Règles métier attendues vs indices détectés

| Règle attendue | Indice détecté |
|---|---:|
| R-PROD-01 produit porte type article | OK |
| R-PROD-02 ligne intervention ne choisit pas librement typeLigne si produit impose typeArticle | OK |
| R-PROD-03 produit stockable rattache a stock | OK |
| R-PROD-04 produit non stockable pas mouvement obligatoire | OK |
| R-PROD-05 choix produit auto-remplit designation type article prix snapshot | OK |
| R-PROD-06 archiver produit ne casse pas historique | OK |

Couverture règles : 100%

### 6. Routes et fichiers

- Module : `src/runtime/modules/generated/produitsauto/produitsauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/produitsauto/produitsauto.actions.ts` → OK
- Route : `src/app/(private)/produitsauto/page.tsx` → OK
- Route : `src/app/(private)/produitsauto/[id]/page.tsx` → OK
- Route : `src/app/(private)/produitsauto/[id]/edit/page.tsx` → OK

### 7. Diagnostic

Couverture partielle. Des actions, workflows ou règles doivent être complétés.

### 8. Emplacement cible des boutons

ERPRuntimePage → ERPRuntimeActionBar → hors ERPEnterpriseForm.

## Stocks — `stocksauto`

### 1. Ce que le module gère

Etat courant du stock.

### 2. Statuts attendus vs détectés

| Statut attendu | Détecté dans code |
|---|---:|
| disponible | OK |
| stock_faible | OK |
| rupture | OK |
| archive | OK |

Couverture statuts : 100%

### 3. Workflows attendus vs détectés

| Départ | Bouton attendu | Arrivée | Détecté |
|---|---|---|---:|
| disponible | Detecter stock faible | stock_faible | KO |
| stock_faible | Detecter rupture | rupture | KO |
| stock_faible/rupture | Reapprovisionner | disponible | OK |

Couverture workflows : 33%

### 4. Boutons attendus vs détectés

| Bouton attendu | Détecté dans actions/workflows |
|---|---:|
| Voir mouvements | KO |
| Creer correction stock controlee | KO |

Couverture boutons : 0%

### 5. Règles métier attendues vs indices détectés

| Règle attendue | Indice détecté |
|---|---:|
| R-STK-01 stock est etat resultant | OK |
| R-STK-02 aucune modification quantite sans mouvement | OK |
| R-STK-03 entree augmente quantite | OK |
| R-STK-04 sortie diminue quantite | OK |
| R-STK-05 stock_faible rupture calcules quantite seuil | OK |
| R-STK-06 formulaire ne modifie pas quantite librement | OK |

Couverture règles : 100%

### 6. Routes et fichiers

- Module : `src/runtime/modules/generated/stocksauto/stocksauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/stocksauto/stocksauto.actions.ts` → OK
- Route : `src/app/(private)/stocksauto/page.tsx` → OK
- Route : `src/app/(private)/stocksauto/[id]/page.tsx` → OK
- Route : `src/app/(private)/stocksauto/[id]/edit/page.tsx` → OK

### 7. Diagnostic

Couverture partielle. Des actions, workflows ou règles doivent être complétés.

### 8. Emplacement cible des boutons

ERPRuntimePage → ERPRuntimeActionBar → hors ERPEnterpriseForm.

## Mouvements stock — `mouvementsstockauto`

### 1. Ce que le module gère

Preuve de variation stock.

### 2. Statuts attendus vs détectés

| Statut attendu | Détecté dans code |
|---|---:|
| brouillon | OK |
| valide | OK |
| annule | OK |

Couverture statuts : 100%

### 3. Workflows attendus vs détectés

| Départ | Bouton attendu | Arrivée | Détecté |
|---|---|---|---:|
| brouillon | Valider mouvement | valide | KO |
| valide | Annuler mouvement | annule | KO |

Couverture workflows : 0%

### 4. Boutons attendus vs détectés

| Bouton attendu | Détecté dans actions/workflows |
|---|---:|
| Valider mouvement | KO |
| Annuler mouvement | KO |

Couverture boutons : 0%

### 5. Règles métier attendues vs indices détectés

| Règle attendue | Indice détecté |
|---|---:|
| R-MVT-01 mouvement porte sourceModule sourceId | OK |
| R-MVT-02 mouvement conserve quantiteAvant quantiteApres | OK |
| R-MVT-03 mouvement est seule preuve modification stock | OK |
| R-MVT-04 mouvement valide non modifiable pour maquiller historique | OK |
| R-MVT-05 annulation via mouvement inverse idealement | OK |

Couverture règles : 100%

### 6. Routes et fichiers

- Module : `src/runtime/modules/generated/mouvementsstockauto/mouvementsstockauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/mouvementsstockauto/mouvementsstockauto.actions.ts` → KO
- Route : `src/app/(private)/mouvementsstockauto/page.tsx` → OK
- Route : `src/app/(private)/mouvementsstockauto/[id]/page.tsx` → OK
- Route : `src/app/(private)/mouvementsstockauto/[id]/edit/page.tsx` → OK

### 7. Diagnostic

Couverture partielle. Des actions, workflows ou règles doivent être complétés.

### 8. Emplacement cible des boutons

ERPRuntimePage → ERPRuntimeActionBar → hors ERPEnterpriseForm.

## Fournisseurs — `fournisseursauto`

### 1. Ce que le module gère

Referentiel fournisseur.

### 2. Statuts attendus vs détectés

| Statut attendu | Détecté dans code |
|---|---:|
| actif | OK |
| suspendu | OK |
| archive | OK |

Couverture statuts : 100%

### 3. Workflows attendus vs détectés

| Départ | Bouton attendu | Arrivée | Détecté |
|---|---|---|---:|
| actif | Suspendre fournisseur | suspendu | KO |
| suspendu | Reactiver fournisseur | actif | KO |
| actif/suspendu | Archiver fournisseur | archive | KO |

Couverture workflows : 0%

### 4. Boutons attendus vs détectés

| Bouton attendu | Détecté dans actions/workflows |
|---|---:|
| Creer commande fournisseur | KO |
| Voir commandes fournisseur | KO |
| Suspendre fournisseur | KO |
| Reactiver fournisseur | KO |
| Archiver fournisseur | KO |

Couverture boutons : 0%

### 5. Règles métier attendues vs indices détectés

| Règle attendue | Indice détecté |
|---|---:|
| R-FOU-01 commande stock rattachee a fournisseur | OK |
| R-FOU-02 fournisseur archive non propose dans nouvelles commandes | OK |
| R-FOU-03 archiver fournisseur conserve historique | OK |
| R-FOU-04 creer commande depuis fournisseur pre-remplit fournisseurId | OK |

Couverture règles : 100%

### 6. Routes et fichiers

- Module : `src/runtime/modules/generated/fournisseursauto/fournisseursauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/fournisseursauto/fournisseursauto.actions.ts` → KO
- Route : `src/app/(private)/fournisseursauto/page.tsx` → OK
- Route : `src/app/(private)/fournisseursauto/[id]/page.tsx` → OK
- Route : `src/app/(private)/fournisseursauto/[id]/edit/page.tsx` → OK

### 7. Diagnostic

Couverture partielle. Des actions, workflows ou règles doivent être complétés.

### 8. Emplacement cible des boutons

ERPRuntimePage → ERPRuntimeActionBar → hors ERPEnterpriseForm.

## Commandes stock — `commandesstockauto`

### 1. Ce que le module gère

Intention d'achat fournisseur.

### 2. Statuts attendus vs détectés

| Statut attendu | Détecté dans code |
|---|---:|
| brouillon | OK |
| envoyee | OK |
| partiellement_recue | OK |
| recue | OK |
| annulee | OK |

Couverture statuts : 100%

### 3. Workflows attendus vs détectés

| Départ | Bouton attendu | Arrivée | Détecté |
|---|---|---|---:|
| brouillon | Envoyer commande | envoyee | OK |
| envoyee | Reception partielle detectee | partiellement_recue | KO |
| envoyee/partiellement_recue | Reception complete detectee | recue | KO |
| brouillon/envoyee | Annuler commande | annulee | OK |

Couverture workflows : 50%

### 4. Boutons attendus vs détectés

| Bouton attendu | Détecté dans actions/workflows |
|---|---:|
| Envoyer commande | OK |
| Creer reception | KO |
| Annuler commande | OK |

Couverture boutons : 67%

### 5. Règles métier attendues vs indices détectés

| Règle attendue | Indice détecté |
|---|---:|
| R-CMD-01 envoyer commande ne modifie pas stock | OK |
| R-CMD-02 montants commande viennent des lignes | OK |
| R-CMD-03 reception modifie stock pas commande | OK |
| R-CMD-04 statuts reception calcules depuis receptions | OK |
| R-CMD-05 annuler commande receptionnee bloque ou compense | OK |

Couverture règles : 100%

### 6. Routes et fichiers

- Module : `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/commandesstockauto/commandesstockauto.actions.ts` → KO
- Route : `src/app/(private)/commandesstockauto/page.tsx` → OK
- Route : `src/app/(private)/commandesstockauto/[id]/page.tsx` → OK
- Route : `src/app/(private)/commandesstockauto/[id]/edit/page.tsx` → OK

### 7. Diagnostic

Couverture globalement correcte. À consolider par tests fonctionnels.

### 8. Emplacement cible des boutons

ERPRuntimePage → ERPRuntimeActionBar → hors ERPEnterpriseForm.

## Lignes commande stock — `lignescommandestockauto`

### 1. Ce que le module gère

Produits commandes.

### 2. Statuts attendus vs détectés

| Statut attendu | Détecté dans code |
|---|---:|
| brouillon | OK |
| validee | OK |

Couverture statuts : 100%

### 3. Workflows attendus vs détectés

| Départ | Bouton attendu | Arrivée | Détecté |
|---|---|---|---:|
| brouillon | Valider ligne commande | validee | KO |

Couverture workflows : 0%

### 4. Boutons attendus vs détectés

| Bouton attendu | Détecté dans actions/workflows |
|---|---:|
| Valider ligne commande | KO |
| Annuler ligne commande | KO |

Couverture boutons : 0%

### 5. Règles métier attendues vs indices détectés

| Règle attendue | Indice détecté |
|---|---:|
| R-LCMD-01 ligne commande appartient a commande parent | OK |
| R-LCMD-02 produit auto-remplit designation prix achat snapshot | OK |
| R-LCMD-03 ligne commande ne choisit pas stock destination | OK |
| R-LCMD-04 stock destination se choisit a reception | OK |
| R-LCMD-05 ligne deja receptionnee non reproposee sauf partiel | OK |

Couverture règles : 100%

### 6. Routes et fichiers

- Module : `src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.actions.ts` → KO
- Route : `src/app/(private)/lignescommandestockauto/page.tsx` → OK
- Route : `src/app/(private)/lignescommandestockauto/[id]/page.tsx` → OK
- Route : `src/app/(private)/lignescommandestockauto/[id]/edit/page.tsx` → OK

### 7. Diagnostic

Couverture partielle. Des actions, workflows ou règles doivent être complétés.

### 8. Emplacement cible des boutons

ERPRuntimePage → ERPRuntimeActionBar → hors ERPEnterpriseForm.

## Receptions stock — `receptionsstockauto`

### 1. Ce que le module gère

Entree reelle de stock.

### 2. Statuts attendus vs détectés

| Statut attendu | Détecté dans code |
|---|---:|
| brouillon | OK |
| validee | OK |

Couverture statuts : 100%

### 3. Workflows attendus vs détectés

| Départ | Bouton attendu | Arrivée | Détecté |
|---|---|---|---:|
| brouillon | Valider reception | validee | OK |

Couverture workflows : 100%

### 4. Boutons attendus vs détectés

| Bouton attendu | Détecté dans actions/workflows |
|---|---:|
| Valider reception | OK |
| Annuler reception | KO |

Couverture boutons : 50%

### 5. Règles métier attendues vs indices détectés

| Règle attendue | Indice détecté |
|---|---:|
| R-REC-01 reception liee a commande | OK |
| R-REC-02 reception liee a ligne commande | OK |
| R-REC-03 reception validee cree mouvement entree | OK |
| R-REC-04 mouvement augmente stock | OK |
| R-REC-05 mouvementStockId empeche double traitement | OK |
| R-REC-06 ligne deja receptionnee non reproposee sauf partiel | OK |
| R-REC-07 stock destination depend produit | OK |

Couverture règles : 100%

### 6. Routes et fichiers

- Module : `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` → OK
- Actions : `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.actions.ts` → KO
- Route : `src/app/(private)/receptionsstockauto/page.tsx` → OK
- Route : `src/app/(private)/receptionsstockauto/[id]/page.tsx` → OK
- Route : `src/app/(private)/receptionsstockauto/[id]/edit/page.tsx` → OK

### 7. Diagnostic

Couverture globalement correcte. À consolider par tests fonctionnels.

### 8. Emplacement cible des boutons

ERPRuntimePage → ERPRuntimeActionBar → hors ERPEnterpriseForm.

## Priorités recommandées

- MEDIUM — Clients `clientsauto` : couverture 50%
- MEDIUM — Vehicules `vehicules` : couverture 50%
- MEDIUM — Rendez-vous `rendezvous` : couverture 60%
- MEDIUM — Lignes intervention `lignesinterventionauto` : couverture 54%
- MEDIUM — Encaissements `encaissementsauto` : couverture 50%
- MEDIUM — Produits `produitsauto` : couverture 50%
- MEDIUM — Stocks `stocksauto` : couverture 58%
- MEDIUM — Mouvements stock `mouvementsstockauto` : couverture 50%
- MEDIUM — Fournisseurs `fournisseursauto` : couverture 50%
- MEDIUM — Lignes commande stock `lignescommandestockauto` : couverture 50%

## Conclusion

Ce rapport ne remplace pas la cartographie métier source. Il mesure la conformité du code actuel avec cette cartographie et sert de base aux prochaines passes runtime.