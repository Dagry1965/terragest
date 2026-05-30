# Q2-OP-I5 — Carte métier nettoyée modules / statuts / workflows / règles

Cette version ne confond plus les champs avec des workflows ou des actions.

## Doctrine

- Un champ n’est pas un workflow.
- Un onglet, une section, un KPI ou un filtre n’est pas une action métier.
- Un bouton métier correspond à une transition ou à une opération contrôlée.
- Les boutons métier apparaissent dans une barre runtime hors formulaire.
- Les formulaires ne portent pas les workflows.
- Les statuts ne sont pas des commandes libres.

## Clients — `clientsauto`

- Fichier : `src/runtime/modules/generated/clientsauto/clientsauto.module.ts`
- Fichier actions : `src/runtime/modules/generated/clientsauto/clientsauto.actions.ts`
- Description : CRM clients automobile

### 1. Ce que le module gère

- Le dossier client automobile.
- L’identité, les coordonnées, le type client et le rattachement aux véhicules.
- Le point d’entrée de la fiche client opérationnelle.

### 2. Statuts

#### `statut` — Statut
- Valeur initiale : `actif`
- Valeurs non détectées automatiquement.

### 3. Workflows réels détectés

- Aucun workflow réel déclaré détecté.

### 4. Boutons métier attendus

- Ajouter un véhicule depuis le client
- Voir la fiche client
- Ouvrir la fiche opérationnelle

Emplacement cible : barre d’actions runtime, jamais dans le formulaire.

### 5. Actions métier réellement détectées

- Aucune action métier réelle détectée automatiquement dans le fichier actions.

### 6. Règles métier détaillées

- Le client est un référentiel : il ne doit pas porter un workflow lourd.
- Le type client pilote l’affichage des véhicules : particulier en cartes, flotte/entreprise en tableau.
- La recherche client doit aussi permettre de retrouver par véhicule/immatriculation.

### 7. Relations parent/enfant

| Panneau | Module enfant | Clé étrangère | Création | Total |
|---|---|---|---:|---|
| vehicules | `vehicules` | `clientId` | non | - |
| rendezvous-client | `rendezvous` | `clientId` | non | - |
| interventions-client | `interventionsauto` | `clientId` | non | - |
| factures-client | `facturesauto` | `clientId` | non | - |
| encaissements-client | `encaissementsauto` | `clientId` | non | - |

### 8. Ce que le module doit gérer automatiquement

- Appliquer les règles runtime du module.
- Respecter parent/enfant, verrouillage et audit.

### 9. Ce qui ne doit pas être dans le formulaire

- Boutons workflow.
- Boutons de transition statut.
- Créations automatiques.
- Modifications directes de champs calculés.
- Liens enfants construits sans contexte parent.

---

## Véhicules — `vehicules`

- Fichier : `src/runtime/modules/generated/vehicules/vehicules.module.ts`
- Fichier actions : `src/runtime/modules/generated/vehicules/vehicules.actions.ts`
- Description : Parc automobile AMARKHYS

### 1. Ce que le module gère

- La fiche véhicule rattachée à un client.
- Les informations techniques : immatriculation, marque, modèle, kilométrage.
- Le pivot vers les rendez-vous, interventions et factures.

### 2. Statuts

#### `statut` — Statut
- Valeur initiale : `actif`
- Valeurs non détectées automatiquement.

### 3. Workflows réels détectés

- Aucun workflow réel déclaré détecté.

### 4. Boutons métier attendus

- Créer un rendez-vous pour ce véhicule
- Voir la fiche véhicule
- Retour fiche client opérationnelle

Emplacement cible : barre d’actions runtime, jamais dans le formulaire.

### 5. Actions métier réellement détectées

- Aucune action métier réelle détectée automatiquement dans le fichier actions.

### 6. Règles métier détaillées

- Le véhicule sélectionné filtre les rendez-vous.
- Le véhicule sélectionné filtre les interventions après sélection du RDV.
- La création RDV depuis véhicule doit préremplir clientId et vehiculeId.

### 7. Relations parent/enfant

| Panneau | Module enfant | Clé étrangère | Création | Total |
|---|---|---|---:|---|
| rendezvous | `rendezvous` | `vehiculeId` | non | - |
| interventions | `interventionsauto` | `vehiculeId` | non | - |
| factures-vehicule | `facturesauto` | `vehiculeId` | non | - |

### 8. Ce que le module doit gérer automatiquement

- Appliquer les règles runtime du module.
- Respecter parent/enfant, verrouillage et audit.

### 9. Ce qui ne doit pas être dans le formulaire

- Boutons workflow.
- Boutons de transition statut.
- Créations automatiques.
- Modifications directes de champs calculés.
- Liens enfants construits sans contexte parent.

---

## Rendez-vous — `rendezvous`

- Fichier : `src/runtime/modules/generated/rendezvous/rendezvous.module.ts`
- Fichier actions : `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts`
- Description : Gestion des rendez-vous atelier AMARKHYS

### 1. Ce que le module gère

- La planification atelier.
- Le créneau, le type de service, la durée, le client et le véhicule.
- Le point de départ vers l’intervention.

### 2. Statuts

#### `statut` — Statut
- Valeur initiale : `planifie`
- Valeurs :
  - `planifie` : Planifié
  - `confirme` : Confirmé
  - `en_cours` : En cours
  - `termine` : Terminé
  - `annule` : Annulé

### 3. Workflows réels détectés

- Aucun workflow réel déclaré détecté.

### 4. Boutons métier attendus

- Confirmer RDV
- Démarrer RDV
- Terminer RDV
- Annuler RDV
- Reporter RDV

Emplacement cible : barre d’actions runtime, jamais dans le formulaire.

### 5. Actions métier réellement détectées

| Key | Label | Type |
|---|---|---|
| `Confirmer` | Confirmer le RDV | - |
| `Démarrer` | Démarrer le RDV | - |
| `Terminer` | Terminer le RDV | - |
| `Annuler` | Annuler | - |

### 6. Règles métier détaillées

- Un RDV confirmé peut créer automatiquement une intervention.
- Un RDV déjà consommé ne doit pas créer une deuxième intervention.
- Un créneau occupé ne doit pas être proposé comme disponible.
- Le RDV doit conserver typeService et durationMinutes.
- Dans la fiche client : véhicule sélectionné → tableau RDV → RDV sélectionné → interventions filtrées.

### 7. Relations parent/enfant

| Panneau | Module enfant | Clé étrangère | Création | Total |
|---|---|---|---:|---|
| interventions-rendezvous | `interventionsauto` | `rendezVousId` | non | - |

### 8. Ce que le module doit gérer automatiquement

- Vérifier les conflits planning.
- Créer une intervention après confirmation si applicable.
- Empêcher la double création d’intervention.

### 9. Ce qui ne doit pas être dans le formulaire

- Boutons workflow.
- Boutons de transition statut.
- Créations automatiques.
- Modifications directes de champs calculés.
- Liens enfants construits sans contexte parent.

---

## Interventions — `interventionsauto`

- Fichier : `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts`
- Fichier actions : `src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts`
- Description : Interventions atelier AMARKHYS

### 1. Ce que le module gère

- L’exécution atelier sur un véhicule.
- Le lien RDV/client/véhicule.
- Le pivot vers lignes d’intervention, facture et encaissements.

### 2. Statuts

#### `statut` — Statut
- Valeur initiale : `ouverte`
- Valeurs :
  - `ouverte` : Ouverte
  - `diagnostic` : Diagnostic
  - `en_cours` : En cours
  - `terminee` : Terminée
  - `facturee` : Facturée
  - `annulee` : Annulée

### 3. Workflows réels détectés

- Aucun workflow réel déclaré détecté.

### 4. Boutons métier attendus

- Démarrer intervention
- Passer en diagnostic
- Terminer intervention
- Générer facture
- Annuler intervention

Emplacement cible : barre d’actions runtime, jamais dans le formulaire.

### 5. Actions métier réellement détectées

| Key | Label | Type |
|---|---|---|
| `Démarrer` | Démarrer l | - |
| `Terminer` | Terminer l | - |
| `Facturer` | Générer la facture | - |
| `Annuler` | Annuler | - |

### 6. Règles métier détaillées

- L’intervention est créée depuis un RDV confirmé.
- Une intervention terminée peut générer une facture.
- Les champs hérités RDV/client/véhicule doivent être verrouillés.
- Les lignes validées alimentent les montants de l’intervention.

### 7. Relations parent/enfant

| Panneau | Module enfant | Clé étrangère | Création | Total |
|---|---|---|---:|---|
| lignes | `lignesinterventionauto` | `interventionId` | non | - |
| factures-intervention | `facturesauto` | `interventionId` | non | - |

### 8. Ce que le module doit gérer automatiquement

- Agréger les lignes validées.
- Déclencher la facture à la fin de l’intervention.

### 9. Ce qui ne doit pas être dans le formulaire

- Boutons workflow.
- Boutons de transition statut.
- Créations automatiques.
- Modifications directes de champs calculés.
- Liens enfants construits sans contexte parent.

---

## Lignes intervention — `lignesinterventionauto`

- Fichier : `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts`
- Fichier actions : `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.actions.ts`
- Description : Pièces, services et main d’œuvre consommés sur une intervention AMARKHYS

### 1. Ce que le module gère

- Les pièces, services et main-d’œuvre d’une intervention.
- Les quantités, prix, TVA, montants et impact stock éventuel.
- La base des totaux intervention/facture.

### 2. Statuts

#### `statut` — Statut
- Valeur initiale : `brouillon`
- Valeurs :
  - `brouillon` : Brouillon
  - `validee` : Validée

### 3. Workflows réels détectés

- Aucun workflow réel déclaré détecté.

### 4. Boutons métier attendus

- Valider la ligne
- Retirer la ligne

Emplacement cible : barre d’actions runtime, jamais dans le formulaire.

### 5. Actions métier réellement détectées

- Aucune action métier réelle détectée automatiquement dans le fichier actions.

### 6. Règles métier détaillées

- brouillon : ne compte pas dans les totaux.
- validée : compte dans les totaux.
- retirée : reste auditée mais ne compte pas.
- Une pièce validée peut déclencher une sortie stock.
- Le type article doit venir du produit, pas être choisi librement sur la ligne.

### 7. Relations parent/enfant

- Aucun enfant de composition détecté.

### 8. Ce que le module doit gérer automatiquement

- Appliquer les règles runtime du module.
- Respecter parent/enfant, verrouillage et audit.

### 9. Ce qui ne doit pas être dans le formulaire

- Boutons workflow.
- Boutons de transition statut.
- Créations automatiques.
- Modifications directes de champs calculés.
- Liens enfants construits sans contexte parent.

---

## Factures — `facturesauto`

- Fichier : `src/runtime/modules/generated/facturesauto/facturesauto.module.ts`
- Fichier actions : `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts`
- Description : Facturation atelier AMARKHYS

### 1. Ce que le module gère

- La preuve commerciale liée à une intervention.
- Les montants HT/TTC, TVA, montant payé, reste à payer.
- Le statut facture et le statut paiement.
- Les encaissements et échéances liés.

### 2. Statuts

#### `statutFacture` — Statut facture
- Valeur initiale : `emise`
- Valeurs :
  - `brouillon` : Brouillon
  - `emise` : Émise
  - `annulee` : Annulée

#### `statutPaiement` — Statut paiement
- Valeur initiale : `en_attente`
- Valeurs :
  - `en_attente` : En attente
  - `partiel` : Partiel
  - `paye` : Payé

#### `statutEnvoiFacture` — Statut envoi facture
- Valeur initiale : `non_envoyee`
- Valeurs :
  - `non_envoyee` : Non envoyée
  - `envoyee` : Envoyée
  - `echec` : Échec envoi

### 3. Workflows réels détectés

- Aucun workflow réel déclaré détecté.

### 4. Boutons métier attendus

- Valider facture
- Envoyer facture
- Annuler facture
- Voir historique encaissements
- Ajouter paiement via historique encaissements

Emplacement cible : barre d’actions runtime, jamais dans le formulaire.

### 5. Actions métier réellement détectées

| Key | Label | Type |
|---|---|---|
| `Valider` | Valider la facture | - |
| `Marquer payée` | Marquer payée | - |
| `Enregistrer paiement` | Enregistrer un paiement | - |
| `Marquer envoyee` | Marquer comme envoyée | - |
| `Relancer` | Relancer le client | - |
| `Annuler` | Annuler | - |

### 6. Règles métier détaillées

- La facture est créée depuis une intervention terminée.
- Les montants facture viennent des lignes validées.
- Le statut paiement est calculé depuis les encaissements.
- Une action paiement ne doit pas être dupliquée.
- Un encaissement doit être créé avec contexte parent facture.

### 7. Relations parent/enfant

| Panneau | Module enfant | Clé étrangère | Création | Total |
|---|---|---|---:|---|
| encaissements-facture | `encaissementsauto` | `factureId` | non | - |
| echeances-facture | `echeancespaiementauto` | `factureId` | non | - |

### 8. Ce que le module doit gérer automatiquement

- Recalculer montant payé, reste à payer et statut paiement.
- Afficher encaissements et échéances comme enfants runtime.

### 9. Ce qui ne doit pas être dans le formulaire

- Boutons workflow.
- Boutons de transition statut.
- Créations automatiques.
- Modifications directes de champs calculés.
- Liens enfants construits sans contexte parent.

---

## Encaissements — `encaissementsauto`

- Fichier : `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts`
- Fichier actions : `src/runtime/modules/generated/encaissementsauto/encaissementsauto.actions.ts`
- Description : Suivi des paiements clients, paiements partiels et encaissements AMARKHYS.

### 1. Ce que le module gère

- Le paiement réel reçu sur une facture.
- Le montant encaissé, la date, le mode de paiement, le reçu.
- La mise à jour financière de la facture.

### 2. Statuts

#### `statut` — Statut
- Valeur initiale : `valide`
- Valeurs :
  - `en_attente` : En attente
  - `valide` : Validé
  - `rejete` : Rejeté
  - `annule` : Annulé

#### `statutEnvoiRecu` — Statut envoi reçu
- Valeur initiale : `non_envoye`
- Valeurs :
  - `non_envoye` : Non envoyé
  - `envoye` : Envoyé
  - `echec` : Échec envoi

### 3. Workflows réels détectés

- Aucun workflow réel déclaré détecté.

### 4. Boutons métier attendus

- Valider encaissement
- Rejeter encaissement
- Annuler encaissement
- Envoyer reçu

Emplacement cible : barre d’actions runtime, jamais dans le formulaire.

### 5. Actions métier réellement détectées

| Key | Label | Type |
|---|---|---|
| `Valider` | Valider l’encaissement | - |
| `Rejeter` | Rejeter | - |
| `Annuler` | Annuler | - |

### 6. Règles métier détaillées

- Un encaissement doit être créé depuis sa facture parent.
- Le lien doit transporter parentModuleKey, parentRecordId et parentForeignKey.
- Un encaissement validé met à jour montant payé, reste à payer et statut paiement facture.
- factureId, clientId et vehiculeId doivent être préremplis/verrouillés.

### 7. Relations parent/enfant

- Aucun enfant de composition détecté.

### 8. Ce que le module doit gérer automatiquement

- Mettre à jour la facture parent.
- Conserver la preuve de paiement.

### 9. Ce qui ne doit pas être dans le formulaire

- Boutons workflow.
- Boutons de transition statut.
- Créations automatiques.
- Modifications directes de champs calculés.
- Liens enfants construits sans contexte parent.

---

## Échéances paiement — `echeancespaiementauto`

- Fichier : `src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts`
- Fichier actions : `src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.actions.ts`
- Description : Suivi des échéances de paiement, paiements fractionnés et relances de recouvrement AMARKHYS.

### 1. Ce que le module gère

- Les échéances et plans de paiement liés à une facture.
- Les relances de paiement.
- Le suivi des montants prévus/payés.

### 2. Statuts

#### `statut` — Statut
- Valeur initiale : `a_venir`
- Valeurs :
  - `a_venir` : À venir
  - `en_retard` : En retard
  - `partiellement_payee` : Partiellement payée
  - `payee` : Payée
  - `annulee` : Annulée

### 3. Workflows réels détectés

- Aucun workflow réel déclaré détecté.

### 4. Boutons métier attendus

- Marquer payée
- Relancer client
- Annuler échéance

Emplacement cible : barre d’actions runtime, jamais dans le formulaire.

### 5. Actions métier réellement détectées

| Key | Label | Type |
|---|---|---|
| `Marquer payee` | Marquer payée | - |
| `Relancer` | Relancer le client | - |
| `Annuler` | Annuler | - |

### 6. Règles métier détaillées

- Une échéance doit être liée à une facture.
- Une échéance payée doit contribuer au suivi financier.
- Une relance doit être auditée.

### 7. Relations parent/enfant

- Aucun enfant de composition détecté.

### 8. Ce que le module doit gérer automatiquement

- Appliquer les règles runtime du module.
- Respecter parent/enfant, verrouillage et audit.

### 9. Ce qui ne doit pas être dans le formulaire

- Boutons workflow.
- Boutons de transition statut.
- Créations automatiques.
- Modifications directes de champs calculés.
- Liens enfants construits sans contexte parent.

---

## Produits — `produitsauto`

- Fichier : `src/runtime/modules/generated/produitsauto/produitsauto.module.ts`
- Fichier actions : `src/runtime/modules/generated/produitsauto/produitsauto.actions.ts`
- Description : Produits, pièces et consommables AMARKHYS

### 1. Ce que le module gère

- Le catalogue produits, pièces, services et consommables.
- Le type article, famille, prix, TVA, caractère stockable.
- La donnée source pour lignes d’intervention, stock et commandes.

### 2. Statuts

#### `statut` — Statut
- Valeur initiale : `actif`
- Valeurs :
  - `actif` : Actif
  - `rupture` : Rupture
  - `inactif` : Inactif
  - `archive` : Archivé

### 3. Workflows réels détectés

- Aucun workflow réel déclaré détecté.

### 4. Boutons métier attendus

- Créer stock associé
- Voir hub produit/stock
- Archiver produit

Emplacement cible : barre d’actions runtime, jamais dans le formulaire.

### 5. Actions métier réellement détectées

- Aucune action métier réelle détectée automatiquement dans le fichier actions.

### 6. Règles métier détaillées

- Le produit porte le type article.
- Un produit stockable doit pouvoir être lié à un stock.
- Un produit non stockable ne doit pas déclencher de mouvement stock obligatoire.
- Le choix produit doit auto-remplir type article, désignation et prix snapshot.

### 7. Relations parent/enfant

- Aucun enfant de composition détecté.

### 8. Ce que le module doit gérer automatiquement

- Appliquer les règles runtime du module.
- Respecter parent/enfant, verrouillage et audit.

### 9. Ce qui ne doit pas être dans le formulaire

- Boutons workflow.
- Boutons de transition statut.
- Créations automatiques.
- Modifications directes de champs calculés.
- Liens enfants construits sans contexte parent.

---

## Stocks — `stocksauto`

- Fichier : `src/runtime/modules/generated/stocksauto/stocksauto.module.ts`
- Fichier actions : `src/runtime/modules/generated/stocksauto/stocksauto.actions.ts`
- Description : Stocks pièces, produits et consommables AMARKHYS

### 1. Ce que le module gère

- L’état courant du stock par produit/emplacement.
- La quantité disponible et les seuils.
- La conséquence des mouvements stock.

### 2. Statuts

#### `statut` — Statut
- Valeur initiale : `disponible`
- Valeurs :
  - `disponible` : Disponible
  - `stock_faible` : Stock faible
  - `rupture` : Rupture
  - `archive` : Archivé

### 3. Workflows réels détectés

- Aucun workflow réel déclaré détecté.

### 4. Boutons métier attendus

- Voir mouvements
- Créer correction stock contrôlée

Emplacement cible : barre d’actions runtime, jamais dans le formulaire.

### 5. Actions métier réellement détectées

- Aucune action métier réelle détectée automatiquement dans le fichier actions.

### 6. Règles métier détaillées

- Le stock ne doit pas être modifié sans mouvement.
- Les entrées/sorties/corrections doivent passer par mouvementsstockauto.
- Les seuils doivent déclencher alertes stock faible.

### 7. Relations parent/enfant

- Aucun enfant de composition détecté.

### 8. Ce que le module doit gérer automatiquement

- Garantir qu’aucune variation stock n’existe sans mouvement.
- Conserver source métier, quantité avant et quantité après.

### 9. Ce qui ne doit pas être dans le formulaire

- Boutons workflow.
- Boutons de transition statut.
- Créations automatiques.
- Modifications directes de champs calculés.
- Liens enfants construits sans contexte parent.

---

## Mouvements stock — `mouvementsstockauto`

- Fichier : `src/runtime/modules/generated/mouvementsstockauto/mouvementsstockauto.module.ts`
- Description : Entrées, sorties et corrections de stock AMARKHYS

### 1. Ce que le module gère

- La preuve de variation stock.
- Entrées, sorties, corrections, réintégrations.
- Les quantités avant/après et la source métier.

### 2. Statuts

#### `statut` — Statut
- Valeur initiale : `valide`
- Valeurs :
  - `brouillon` : Brouillon
  - `valide` : Validé
  - `annule` : Annulé

### 3. Workflows réels détectés

- Aucun workflow réel déclaré détecté.

### 4. Boutons métier attendus

- Valider mouvement
- Annuler mouvement si autorisé

Emplacement cible : barre d’actions runtime, jamais dans le formulaire.

### 5. Actions métier réellement détectées

- Aucune action métier réelle détectée automatiquement dans le fichier actions.

### 6. Règles métier détaillées

- Un mouvement stock doit porter sourceModule et sourceId.
- Il doit conserver quantiteAvant et quantiteApres.
- Il est la seule preuve fiable de modification stock.

### 7. Relations parent/enfant

- Aucun enfant de composition détecté.

### 8. Ce que le module doit gérer automatiquement

- Garantir qu’aucune variation stock n’existe sans mouvement.
- Conserver source métier, quantité avant et quantité après.

### 9. Ce qui ne doit pas être dans le formulaire

- Boutons workflow.
- Boutons de transition statut.
- Créations automatiques.
- Modifications directes de champs calculés.
- Liens enfants construits sans contexte parent.

---

## Fournisseurs — `fournisseursauto`

- Fichier : `src/runtime/modules/generated/fournisseursauto/fournisseursauto.module.ts`
- Description : Fournisseurs pieces, consommables et services AMARKHYS

### 1. Ce que le module gère

- Le référentiel fournisseur.
- Les informations de contact fournisseur.
- Le point d’entrée des commandes stock.

### 2. Statuts

#### `statut` — Statut
- Valeur initiale : `actif`
- Valeurs :
  - `actif` : Actif
  - `suspendu` : Suspendu
  - `archive` : Archive

### 3. Workflows réels détectés

- Aucun workflow réel déclaré détecté.

### 4. Boutons métier attendus

- Créer commande fournisseur
- Voir commandes fournisseur

Emplacement cible : barre d’actions runtime, jamais dans le formulaire.

### 5. Actions métier réellement détectées

- Aucune action métier réelle détectée automatiquement dans le fichier actions.

### 6. Règles métier détaillées

- Un fournisseur peut être actif/inactif.
- Les commandes stock doivent être rattachées à un fournisseur.

### 7. Relations parent/enfant

- Aucun enfant de composition détecté.

### 8. Ce que le module doit gérer automatiquement

- Appliquer les règles runtime du module.
- Respecter parent/enfant, verrouillage et audit.

### 9. Ce qui ne doit pas être dans le formulaire

- Boutons workflow.
- Boutons de transition statut.
- Créations automatiques.
- Modifications directes de champs calculés.
- Liens enfants construits sans contexte parent.

---

## Commandes stock — `commandesstockauto`

- Fichier : `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts`
- Description : Commandes fournisseurs pour pieces et consommables AMARKHYS

### 1. Ce que le module gère

- L’intention d’achat stock.
- Le fournisseur, les lignes de commande, les montants.
- Le suivi avant réception réelle.

### 2. Statuts

#### `statut` — Statut
- Valeur initiale : `brouillon`
- Valeurs :
  - `brouillon` : Brouillon
  - `envoyee` : Envoyee
  - `partiellement_recue` : Partiellement recue
  - `recue` : Recue
  - `annulee` : Annulee

### 3. Workflows réels détectés

- Aucun workflow réel déclaré détecté.

### 4. Boutons métier attendus

- Valider commande
- Envoyer commande
- Créer réception
- Annuler commande

Emplacement cible : barre d’actions runtime, jamais dans le formulaire.

### 5. Actions métier réellement détectées

- Aucune action métier réelle détectée automatiquement dans le fichier actions.

### 6. Règles métier détaillées

- La commande est une intention d’achat, pas une entrée stock.
- Envoyer une commande ne modifie pas le stock.
- Les montants doivent venir des lignes de commande.
- Le statut de réception doit être calculé depuis les réceptions.

### 7. Relations parent/enfant

| Panneau | Module enfant | Clé étrangère | Création | Total |
|---|---|---|---:|---|
| lignes-commandestock | `lignescommandestockauto` | `commandeId` | non | - |
| receptions-stock | `receptionsstockauto` | `commandeId` | non | - |

### 8. Ce que le module doit gérer automatiquement

- Garantir qu’aucune variation stock n’existe sans mouvement.
- Conserver source métier, quantité avant et quantité après.

### 9. Ce qui ne doit pas être dans le formulaire

- Boutons workflow.
- Boutons de transition statut.
- Créations automatiques.
- Modifications directes de champs calculés.
- Liens enfants construits sans contexte parent.

---

## Lignes commande stock — `lignescommandestockauto`

- Fichier : `src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts`
- Description : Details produits des commandes fournisseurs AMARKHYS

### 1. Ce que le module gère

- Les produits et quantités commandés.
- Le prix d’achat snapshot.
- La base de réception stock.

### 2. Statuts

#### `statut` — Statut
- Valeur initiale : `brouillon`
- Valeurs :
  - `brouillon` : Brouillon
  - `validee` : Validee

### 3. Workflows réels détectés

- Aucun workflow réel déclaré détecté.

### 4. Boutons métier attendus

- Valider ligne commande
- Annuler ligne commande

Emplacement cible : barre d’actions runtime, jamais dans le formulaire.

### 5. Actions métier réellement détectées

- Aucune action métier réelle détectée automatiquement dans le fichier actions.

### 6. Règles métier détaillées

- La ligne commande ne choisit pas le stock destination.
- Produit choisi → désignation/prix achat snapshot.
- Une ligne déjà réceptionnée ne doit pas être proposée à nouveau sauf réception partielle gérée.

### 7. Relations parent/enfant

| Panneau | Module enfant | Clé étrangère | Création | Total |
|---|---|---|---:|---|
| receptions-ligne-commande | `receptionsstockauto` | `ligneCommandeId` | non | - |

### 8. Ce que le module doit gérer automatiquement

- Garantir qu’aucune variation stock n’existe sans mouvement.
- Conserver source métier, quantité avant et quantité après.

### 9. Ce qui ne doit pas être dans le formulaire

- Boutons workflow.
- Boutons de transition statut.
- Créations automatiques.
- Modifications directes de champs calculés.
- Liens enfants construits sans contexte parent.

---

## Receptions stock — `receptionsstockauto`

- Fichier : `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts`
- Description : Receptions fournisseurs et entrees stock AMARKHYS

### 1. Ce que le module gère

- L’entrée réelle de stock.
- Le lien commande, ligne commande, produit et stock destination.
- La création du mouvement stock entrant.

### 2. Statuts

#### `statut` — Statut
- Valeur initiale : `brouillon`
- Valeurs :
  - `brouillon` : Brouillon
  - `validee` : Validee

### 3. Workflows réels détectés

- Aucun workflow réel déclaré détecté.

### 4. Boutons métier attendus

- Valider réception
- Annuler réception

Emplacement cible : barre d’actions runtime, jamais dans le formulaire.

### 5. Actions métier réellement détectées

- Aucune action métier réelle détectée automatiquement dans le fichier actions.

### 6. Règles métier détaillées

- Réception validée → mouvement stock entrée.
- Mouvement créé → stock augmenté.
- mouvementStockId empêche le double traitement.
- Le stock destination est choisi selon le produit.

### 7. Relations parent/enfant

| Panneau | Module enfant | Clé étrangère | Création | Total |
|---|---|---|---:|---|
| mouvements-stock-reception | `mouvementsstockauto` | `sourceId` | non | - |

### 8. Ce que le module doit gérer automatiquement

- Garantir qu’aucune variation stock n’existe sans mouvement.
- Conserver source métier, quantité avant et quantité après.

### 9. Ce qui ne doit pas être dans le formulaire

- Boutons workflow.
- Boutons de transition statut.
- Créations automatiques.
- Modifications directes de champs calculés.
- Liens enfants construits sans contexte parent.

---

## Budgets — `budgets`

- Fichier : `src/runtime/modules/generated/budgets/budgets.module.ts`
- Description : Budgets module

### 1. Ce que le module gère

- Module détecté. Rôle métier à préciser.

### 2. Statuts

#### `statut` — Statut
- Valeurs :
  - `actif` : Actif
  - `inactif` : Inactif

### 3. Workflows réels détectés

- Aucun workflow réel déclaré détecté.

### 4. Boutons métier attendus

- Actions runtime à définir selon le processus.

Emplacement cible : barre d’actions runtime, jamais dans le formulaire.

### 5. Actions métier réellement détectées

- Aucune action métier réelle détectée automatiquement dans le fichier actions.

### 6. Règles métier détaillées

- Les statuts doivent être pilotés par runtime.
- Les boutons ne doivent pas être dans le formulaire.

### 7. Relations parent/enfant

- Aucun enfant de composition détecté.

### 8. Ce que le module doit gérer automatiquement

- Appliquer les règles runtime du module.
- Respecter parent/enfant, verrouillage et audit.

### 9. Ce qui ne doit pas être dans le formulaire

- Boutons workflow.
- Boutons de transition statut.
- Créations automatiques.
- Modifications directes de champs calculés.
- Liens enfants construits sans contexte parent.

---

## Campagnes — `campagnes`

- Fichier : `src/runtime/modules/generated/campagnes/campagnes.module.ts`
- Description : Campagnes module

### 1. Ce que le module gère

- Module détecté. Rôle métier à préciser.

### 2. Statuts

#### `statut` — Statut
- Valeurs :
  - `actif` : Actif
  - `inactif` : Inactif

### 3. Workflows réels détectés

- Aucun workflow réel déclaré détecté.

### 4. Boutons métier attendus

- Actions runtime à définir selon le processus.

Emplacement cible : barre d’actions runtime, jamais dans le formulaire.

### 5. Actions métier réellement détectées

- Aucune action métier réelle détectée automatiquement dans le fichier actions.

### 6. Règles métier détaillées

- Les statuts doivent être pilotés par runtime.
- Les boutons ne doivent pas être dans le formulaire.

### 7. Relations parent/enfant

- Aucun enfant de composition détecté.

### 8. Ce que le module doit gérer automatiquement

- Appliquer les règles runtime du module.
- Respecter parent/enfant, verrouillage et audit.

### 9. Ce qui ne doit pas être dans le formulaire

- Boutons workflow.
- Boutons de transition statut.
- Créations automatiques.
- Modifications directes de champs calculés.
- Liens enfants construits sans contexte parent.

---

## Contrats — `contrats`

- Fichier : `src/runtime/modules/generated/contrats/contrats.module.ts`
- Fichier actions : `src/runtime/modules/generated/contrats/contrats.actions.ts`
- Description : Contrats module

### 1. Ce que le module gère

- Module détecté. Rôle métier à préciser.

### 2. Statuts

#### `statut` — Statut
- Valeurs :
  - `actif` : Actif
  - `inactif` : Inactif

### 3. Workflows réels détectés

- Aucun workflow réel déclaré détecté.

### 4. Boutons métier attendus

- Actions runtime à définir selon le processus.

Emplacement cible : barre d’actions runtime, jamais dans le formulaire.

### 5. Actions métier réellement détectées

- Aucune action métier réelle détectée automatiquement dans le fichier actions.

### 6. Règles métier détaillées

- Les statuts doivent être pilotés par runtime.
- Les boutons ne doivent pas être dans le formulaire.

### 7. Relations parent/enfant

- Aucun enfant de composition détecté.

### 8. Ce que le module doit gérer automatiquement

- Appliquer les règles runtime du module.
- Respecter parent/enfant, verrouillage et audit.

### 9. Ce qui ne doit pas être dans le formulaire

- Boutons workflow.
- Boutons de transition statut.
- Créations automatiques.
- Modifications directes de champs calculés.
- Liens enfants construits sans contexte parent.

---

## Facturations — `facturations`

- Fichier : `src/runtime/modules/generated/facturations/facturations.module.ts`
- Fichier actions : `src/runtime/modules/generated/facturations/facturations.actions.ts`
- Description : Facturations module

### 1. Ce que le module gère

- Module détecté. Rôle métier à préciser.

### 2. Statuts

#### `statut` — Statut
- Valeurs :
  - `actif` : Actif
  - `inactif` : Inactif

### 3. Workflows réels détectés

- Aucun workflow réel déclaré détecté.

### 4. Boutons métier attendus

- Actions runtime à définir selon le processus.

Emplacement cible : barre d’actions runtime, jamais dans le formulaire.

### 5. Actions métier réellement détectées

- Aucune action métier réelle détectée automatiquement dans le fichier actions.

### 6. Règles métier détaillées

- Les statuts doivent être pilotés par runtime.
- Les boutons ne doivent pas être dans le formulaire.

### 7. Relations parent/enfant

- Aucun enfant de composition détecté.

### 8. Ce que le module doit gérer automatiquement

- Appliquer les règles runtime du module.
- Respecter parent/enfant, verrouillage et audit.

### 9. Ce qui ne doit pas être dans le formulaire

- Boutons workflow.
- Boutons de transition statut.
- Créations automatiques.
- Modifications directes de champs calculés.
- Liens enfants construits sans contexte parent.

---

## Rappels — `rappelsauto`

- Fichier : `src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts`
- Fichier actions : `src/runtime/modules/generated/rappelsauto/rappelsauto.actions.ts`
- Description : Rappels clients et véhicules AMARKHYS

### 1. Ce que le module gère

- Module détecté. Rôle métier à préciser.

### 2. Statuts

#### `statut` — Statut
- Valeur initiale : `planifie`
- Valeurs :
  - `planifie` : Planifié
  - `envoye` : Envoyé
  - `echoue` : Échoué
  - `annule` : Annulé

### 3. Workflows réels détectés

- Aucun workflow réel déclaré détecté.

### 4. Boutons métier attendus

- Actions runtime à définir selon le processus.

Emplacement cible : barre d’actions runtime, jamais dans le formulaire.

### 5. Actions métier réellement détectées

- Aucune action métier réelle détectée automatiquement dans le fichier actions.

### 6. Règles métier détaillées

- Les statuts doivent être pilotés par runtime.
- Les boutons ne doivent pas être dans le formulaire.

### 7. Relations parent/enfant

- Aucun enfant de composition détecté.

### 8. Ce que le module doit gérer automatiquement

- Appliquer les règles runtime du module.
- Respecter parent/enfant, verrouillage et audit.

### 9. Ce qui ne doit pas être dans le formulaire

- Boutons workflow.
- Boutons de transition statut.
- Créations automatiques.
- Modifications directes de champs calculés.
- Liens enfants construits sans contexte parent.

---
