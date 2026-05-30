# Q2-OP-I4 — Carte métier détaillée par module

Objectif : détailler module par module ce que le module gère, ses statuts, ses workflows, ses règles, les effets produits, les boutons attendus et les éléments qui doivent rester hors formulaire.

## Règle d’architecture globale

- Les formulaires ne portent pas les boutons de workflow.
- Les formulaires affichent et saisissent les champs.
- Les boutons de transition/action apparaissent dans une barre runtime hors formulaire.
- Les statuts ne sont pas des commandes libres.
- Les changements de statut passent par des actions runtime contrôlées.
- Les effets métier sont produits par RuntimeActionEngine, RuntimeWorkflowEngine, Business Rules, guards et services runtime.

## Clients — `clientsauto`

- Fichier : `src/runtime/modules/generated/clientsauto/clientsauto.module.ts`
- Fichier actions : `src/runtime/modules/generated/clientsauto/clientsauto.actions.ts`
- Description : CRM clients automobile

### 1. Ce que le module gère

- Le dossier client automobile.
- Les informations d’identité, contact, type client, relation avec les véhicules.
- Point d’entrée de la fiche opérationnelle client.

### 2. Statuts détectés et rôle métier

#### Champ `statut` — Statut

- Type : `select`
- Valeur initiale détectée : `actif`
- Valeurs possibles :
  - `actif` : Actif
  - `prospect` : Prospect
  - `inactif` : Inactif
  - `archive` : Archivé

Règles de statut du module :
- Le client est généralement un référentiel. Il ne doit pas porter trop de workflow métier lourd.
- Le type client influence l’affichage : particulier en cartes, flotte/entreprise en tableau compact.

### 3. Workflows détectés

#### Workflow : Code client

- Aucune transition détectée dans ce workflow.

#### Workflow : Nom

- Aucune transition détectée dans ce workflow.

#### Workflow : Prénom

- Aucune transition détectée dans ce workflow.

#### Workflow : Téléphone

- Aucune transition détectée dans ce workflow.

#### Workflow : Email

- Aucune transition détectée dans ce workflow.

#### Workflow : Adresse

- Aucune transition détectée dans ce workflow.

#### Workflow : Ville

- Aucune transition détectée dans ce workflow.

#### Workflow : Pays

- Aucune transition détectée dans ce workflow.

#### Workflow : Type client

- Aucune transition détectée dans ce workflow.

#### Workflow : Date inscription

- Aucune transition détectée dans ce workflow.

#### Workflow : Observations

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut

- Aucune transition détectée dans ce workflow.

### 4. Actions / boutons détectés

| Action technique | Label utilisateur | Type | Rôle attendu |
|---|---|---|---|
| `codeClient` | Code client | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `nom` | Nom | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `prenom` | Prénom | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `telephone` | Téléphone | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `email` | Email | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `adresse` | Adresse | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `ville` | Ville | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `pays` | Pays | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `typeClient` | Type client | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `dateInscription` | Date inscription | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `observations` | Observations | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statut` | Statut | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `identite` | Identité | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `infos` | Adresse | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `localisation` | Véhicules | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `parc` | Notes | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `observations` | Total | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `actifs` | Actifs | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `prospects` | Prospects | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `total` | Clients affichés | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `actifs` | Clients actifs | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `vehicules` | Nouveau RDV | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `client360-demo` | Fiche 360 demo | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `client` | Cycle client | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `prospect` | Prospect | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `active` | Client | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `inactive` | Inactif | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |

### 5. Règles métier détaillées

- Sélection client → filtre les véhicules.
- Création véhicule depuis client → client prérempli et verrouillé.
- Recherche client/voiture → ouvre la fiche opérationnelle client.

### 6. Relations parent/enfant et panneaux liés

| Relation | Module enfant | Clé étrangère | Création autorisée | Total | Ce que cela gère |
|---|---|---|---:|---|---|
| vehicules | `vehicules` | `clientId` | non | - | Panneau lié runtime. Doit apparaître hors formulaire, généralement après la fiche détail/edit. |
| rendezvous-client | `rendezvous` | `clientId` | non | - | Panneau lié runtime. Doit apparaître hors formulaire, généralement après la fiche détail/edit. |
| interventions-client | `interventionsauto` | `clientId` | non | - | Panneau lié runtime. Doit apparaître hors formulaire, généralement après la fiche détail/edit. |
| factures-client | `facturesauto` | `clientId` | non | - | Panneau lié runtime. Doit apparaître hors formulaire, généralement après la fiche détail/edit. |
| encaissements-client | `encaissementsauto` | `clientId` | non | - | Panneau lié runtime. Doit apparaître hors formulaire, généralement après la fiche détail/edit. |

### 7. Ce qui doit apparaître dans l’interface

- Les champs : dans le formulaire ou détail runtime.
- Les statuts : visibles comme état courant, mais non utilisés comme commande libre si une transition existe.
- Les boutons de workflow : dans la barre d’actions runtime.
- Les enfants liés : dans les panneaux runtime liés, pas dans le corps du formulaire.
- Les créations enfants : via RuntimeChildCreateHrefBuilder ou composition.children.

### 8. Ce qui ne doit pas être dans le formulaire

- Boutons de workflow.
- Boutons métier de transition d’état.
- Actions qui déclenchent des créations automatiques.
- Modifications manuelles de champs calculés ou hérités.
- Liens enfants construits à la main sans contexte parent.

---

## Véhicules — `vehicules`

- Fichier : `src/runtime/modules/generated/vehicules/vehicules.module.ts`
- Fichier actions : `src/runtime/modules/generated/vehicules/vehicules.actions.ts`
- Description : Parc automobile AMARKHYS

### 1. Ce que le module gère

- Le véhicule rattaché à un client.
- La fiche technique : marque, modèle, immatriculation, kilométrage, carburant.
- Le véhicule sert de pivot vers RDV, interventions, factures.

### 2. Statuts détectés et rôle métier

#### Champ `statut` — Statut

- Type : `select`
- Valeur initiale détectée : `actif`
- Valeurs possibles :
  - `actif` : Actif
  - `entretien` : Entretien requis
  - `immobilise` : Immobilisé
  - `archive` : Archivé

Règles de statut du module :
- Le statut véhicule doit indiquer sa disponibilité ou son état de suivi, pas déclencher seul des effets métier.
- La sélection d’un véhicule dans la fiche client doit filtrer les rendez-vous puis les interventions.

### 3. Workflows détectés

#### Workflow : Code véhicule

- Aucune transition détectée dans ce workflow.

#### Workflow : Immatriculation

- Aucune transition détectée dans ce workflow.

#### Workflow : Marque

- Aucune transition détectée dans ce workflow.

#### Workflow : Modèle

- Aucune transition détectée dans ce workflow.

#### Workflow : Année

- Aucune transition détectée dans ce workflow.

#### Workflow : VIN

- Aucune transition détectée dans ce workflow.

#### Workflow : Carburant

- Aucune transition détectée dans ce workflow.

#### Workflow : Kilométrage

- Aucune transition détectée dans ce workflow.

#### Workflow : Mise en circulation

- Aucune transition détectée dans ce workflow.

#### Workflow : Client

- Aucune transition détectée dans ce workflow.

#### Workflow : Prochaine vidange

- Aucune transition détectée dans ce workflow.

#### Workflow : Contrôle technique

- Aucune transition détectée dans ce workflow.

#### Workflow : Expiration assurance

- Aucune transition détectée dans ce workflow.

#### Workflow : Observations

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut

- Aucune transition détectée dans ce workflow.

### 4. Actions / boutons détectés

| Action technique | Label utilisateur | Type | Rôle attendu |
|---|---|---|---|
| `codeVehicule` | Code véhicule | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `immatriculation` | Immatriculation | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `marque` | Marque | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `modele` | Modèle | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `annee` | Année | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `vin` | VIN | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `carburant` | Carburant | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `kilometrage` | Kilométrage | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `dateMiseEnCirculation` | Mise en circulation | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `clientId` | Client | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `prochaineVidange` | Prochaine vidange | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `prochainControleTechnique` | Contrôle technique | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `assuranceExpiration` | Expiration assurance | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `observations` | Observations | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statut` | Statut | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `identite` | Identité | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `vehicule` | Client | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `client` | Maintenance | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `suivi` | Notes | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `obs` | Total | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `actifs` | Actifs | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `entretien` | En entretien | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `total` | Véhicules affichés | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `actifs` | Véhicules actifs | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `rendezvous` | Cycle véhicule | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `actif` | Actif | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `entretien` | Entretien requis | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `immobilise` | Immobilisé | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `archive` | Archivé | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |

### 5. Règles métier détaillées

- Véhicule sélectionné → tableau des rendez-vous du véhicule.
- Création RDV depuis véhicule → véhicule et client préremplis.
- Navigation fiche véhicule → conserve le contexte retour vers la fiche client.

### 6. Relations parent/enfant et panneaux liés

| Relation | Module enfant | Clé étrangère | Création autorisée | Total | Ce que cela gère |
|---|---|---|---:|---|---|
| rendezvous | `rendezvous` | `vehiculeId` | non | - | Panneau lié runtime. Doit apparaître hors formulaire, généralement après la fiche détail/edit. |
| interventions | `interventionsauto` | `vehiculeId` | non | - | Panneau lié runtime. Doit apparaître hors formulaire, généralement après la fiche détail/edit. |
| factures-vehicule | `facturesauto` | `vehiculeId` | non | - | Panneau lié runtime. Doit apparaître hors formulaire, généralement après la fiche détail/edit. |

### 7. Ce qui doit apparaître dans l’interface

- Les champs : dans le formulaire ou détail runtime.
- Les statuts : visibles comme état courant, mais non utilisés comme commande libre si une transition existe.
- Les boutons de workflow : dans la barre d’actions runtime.
- Les enfants liés : dans les panneaux runtime liés, pas dans le corps du formulaire.
- Les créations enfants : via RuntimeChildCreateHrefBuilder ou composition.children.

### 8. Ce qui ne doit pas être dans le formulaire

- Boutons de workflow.
- Boutons métier de transition d’état.
- Actions qui déclenchent des créations automatiques.
- Modifications manuelles de champs calculés ou hérités.
- Liens enfants construits à la main sans contexte parent.

---

## Rendez-vous — `rendezvous`

- Fichier : `src/runtime/modules/generated/rendezvous/rendezvous.module.ts`
- Fichier actions : `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts`
- Description : Gestion des rendez-vous atelier AMARKHYS

### 1. Ce que le module gère

- La demande ou planification de passage atelier.
- Le créneau, le service souhaité, la durée, le client et le véhicule.
- Le point de départ vers l’intervention.

### 2. Statuts détectés et rôle métier

#### Champ `statut` — Statut

- Type : `select`
- Valeur initiale détectée : `planifie`
- Valeurs possibles :
  - `planifie` : Planifié
  - `confirme` : Confirmé
  - `en_cours` : En cours
  - `termine` : Terminé
  - `annule` : Annulé

Règles de statut du module :
- Le RDV confirmé est un état métier fort.
- Un statut RDV ne doit pas être changé librement si cela déclenche des effets.
- Un RDV consommé ne doit pas recréer une deuxième intervention.

### 3. Workflows détectés

#### Workflow : Code rendez-vous

- Aucune transition détectée dans ce workflow.

#### Workflow : Client

- Aucune transition détectée dans ce workflow.

#### Workflow : Véhicule

- Aucune transition détectée dans ce workflow.

#### Workflow : Date rendez-vous

- Aucune transition détectée dans ce workflow.

#### Workflow : Heure

- Aucune transition détectée dans ce workflow.

#### Workflow : Durée prévue

- Aucune transition détectée dans ce workflow.

#### Workflow : Début créneau

- Aucune transition détectée dans ce workflow.

#### Workflow : Fin créneau

- Aucune transition détectée dans ce workflow.

#### Workflow : Intervention liée

- Aucune transition détectée dans ce workflow.

#### Workflow : Type service

- Aucune transition détectée dans ce workflow.

#### Workflow : Motif

- Aucune transition détectée dans ce workflow.

#### Workflow : Commentaire

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut

- Aucune transition détectée dans ce workflow.

### 4. Actions / boutons détectés

| Action technique | Label utilisateur | Type | Rôle attendu |
|---|---|---|---|
| `codeRendezVous` | Code rendez-vous | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `clientId` | Client | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `vehiculeId` | Véhicule | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `dateRendezVous` | Date rendez-vous | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `heureRendezVous` | Heure | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `durationMinutes` | Durée prévue | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `startAt` | Début créneau | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `endAt` | Fin créneau | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `consumedByInterventionId` | Intervention liée | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `typeService` | Type service | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `motif` | Motif | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `commentaire` | Commentaire | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statut` | Statut | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `planification` | Planification | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `rdv` | Détails | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `description` | Total | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `confirmes` | Confirmés | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `en_cours` | En cours | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `annules` | Annulés | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `typeService` | Type de service | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `total` | Rendez-vous affichés | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `interventions-rendezvous` | Cycle rendez-vous | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `planifie` | Planifié | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `confirme` | Confirmé | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `termine` | Terminé | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `annule` | Annulé | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `Confirmer` | Confirmer le RDV | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `Démarrer` | Démarrer le RDV | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `Terminer` | Terminer le RDV | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `Annuler` | Annuler | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |

### 5. Règles métier détaillées

- RDV confirmé → création automatique d’une intervention liée.
- RDV planifié → occupe un créneau planning.
- RDV annulé/reporté → doit libérer ou déplacer le créneau selon le moteur planning.
- Dans la fiche client, sélection d’un RDV → filtre le bloc interventions.

### 6. Relations parent/enfant et panneaux liés

| Relation | Module enfant | Clé étrangère | Création autorisée | Total | Ce que cela gère |
|---|---|---|---:|---|---|
| interventions-rendezvous | `interventionsauto` | `rendezVousId` | non | - | Panneau lié runtime. Doit apparaître hors formulaire, généralement après la fiche détail/edit. |

### 7. Ce qui doit apparaître dans l’interface

- Les champs : dans le formulaire ou détail runtime.
- Les statuts : visibles comme état courant, mais non utilisés comme commande libre si une transition existe.
- Les boutons de workflow : dans la barre d’actions runtime.
- Les enfants liés : dans les panneaux runtime liés, pas dans le corps du formulaire.
- Les créations enfants : via RuntimeChildCreateHrefBuilder ou composition.children.

### 8. Ce qui ne doit pas être dans le formulaire

- Boutons de workflow.
- Boutons métier de transition d’état.
- Actions qui déclenchent des créations automatiques.
- Modifications manuelles de champs calculés ou hérités.
- Liens enfants construits à la main sans contexte parent.

---

## Interventions — `interventionsauto`

- Fichier : `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts`
- Fichier actions : `src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts`
- Description : Interventions atelier AMARKHYS

### 1. Ce que le module gère

- L’exécution atelier sur un véhicule.
- Le lien avec le RDV, le client, le véhicule.
- Le point central vers les lignes, factures et encaissements.

### 2. Statuts détectés et rôle métier

#### Champ `statut` — Statut

- Type : `select`
- Valeur initiale détectée : `ouverte`
- Valeurs possibles :
  - `ouverte` : Ouverte
  - `diagnostic` : Diagnostic
  - `en_cours` : En cours
  - `terminee` : Terminée
  - `facturee` : Facturée
  - `annulee` : Annulée

Règles de statut du module :
- L’intervention représente l’avancement réel des travaux.
- Les champs hérités du RDV/client/véhicule doivent être verrouillés.
- Une intervention terminée peut déclencher la facture.

### 3. Workflows détectés

#### Workflow : Client

- Aucune transition détectée dans ce workflow.

#### Workflow : Véhicule

- Aucune transition détectée dans ce workflow.

#### Workflow : Rendez-vous

- Aucune transition détectée dans ce workflow.

#### Workflow : Date intervention

- Aucune transition détectée dans ce workflow.

#### Workflow : Type intervention

- Aucune transition détectée dans ce workflow.

#### Workflow : Kilométrage

- Aucune transition détectée dans ce workflow.

#### Workflow : Diagnostic

- Aucune transition détectée dans ce workflow.

#### Workflow : Travaux effectués

- Aucune transition détectée dans ce workflow.

#### Workflow : Coût pièces

- Aucune transition détectée dans ce workflow.

#### Workflow : Coût main d

- Aucune transition détectée dans ce workflow.

#### Workflow : Coût total

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut

- Aucune transition détectée dans ce workflow.

### 4. Actions / boutons détectés

| Action technique | Label utilisateur | Type | Rôle attendu |
|---|---|---|---|
| `interventionsauto` | Interventions | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `clientId` | Client | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `vehiculeId` | Véhicule | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `rendezVousId` | Rendez-vous | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `dateIntervention` | Date intervention | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `typeIntervention` | Type intervention | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `kilometrage` | Kilométrage | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `diagnostic` | Diagnostic | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `travauxEffectues` | Travaux effectués | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `coutPieces` | Coût pièces | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `coutMainOeuvre` | Coût main d | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `coutTotal` | Coût total | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statut` | Statut | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `contexte` | Contexte | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `infos` | Atelier | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `travaux` | Coûts | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `financier` | Total | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `ouvertes` | Ouvertes | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `en_cours` | En cours | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `terminees` | Terminées | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `annulees` | Annulées | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `total` | Interventions affichées | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `cout_total` | Coût total | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `lignes` | Cycle intervention | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `ouverte` | Ouverte | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `terminee` | Terminée | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `facturee` | Facturée | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `annulee` | Annulée | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `Démarrer` | Démarrer l | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `Diagnostiquer` | Passer en diagnostic | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `Terminer` | Terminer l | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `Facturer` | Générer la facture | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `Annuler` | Annuler | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |

### 5. Règles métier détaillées

- Intervention créée depuis RDV confirmé.
- Intervention terminée → facture générée automatiquement.
- Intervention sélectionnée → affiche lignes d’intervention, facture et encaissements.

### 6. Relations parent/enfant et panneaux liés

| Relation | Module enfant | Clé étrangère | Création autorisée | Total | Ce que cela gère |
|---|---|---|---:|---|---|
| lignes | `lignesinterventionauto` | `interventionId` | non | - | Panneau lié runtime. Doit apparaître hors formulaire, généralement après la fiche détail/edit. |
| factures-intervention | `facturesauto` | `interventionId` | non | - | Panneau lié runtime. Doit apparaître hors formulaire, généralement après la fiche détail/edit. |

### 7. Ce qui doit apparaître dans l’interface

- Les champs : dans le formulaire ou détail runtime.
- Les statuts : visibles comme état courant, mais non utilisés comme commande libre si une transition existe.
- Les boutons de workflow : dans la barre d’actions runtime.
- Les enfants liés : dans les panneaux runtime liés, pas dans le corps du formulaire.
- Les créations enfants : via RuntimeChildCreateHrefBuilder ou composition.children.

### 8. Ce qui ne doit pas être dans le formulaire

- Boutons de workflow.
- Boutons métier de transition d’état.
- Actions qui déclenchent des créations automatiques.
- Modifications manuelles de champs calculés ou hérités.
- Liens enfants construits à la main sans contexte parent.

---

## Lignes intervention — `lignesinterventionauto`

- Fichier : `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts`
- Fichier actions : `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.actions.ts`
- Description : Pièces, services et main d’œuvre consommés sur une intervention AMARKHYS

### 1. Ce que le module gère

- Les lignes de détail d’une intervention : pièce, service, main-d’œuvre.
- Les quantités, prix unitaires, montants et éventuels impacts stock.
- Les totaux qui alimentent intervention/facture.

### 2. Statuts détectés et rôle métier

#### Champ `statut` — Statut

- Type : `select`
- Valeur initiale détectée : `brouillon`
- Valeurs possibles :
  - `brouillon` : Brouillon
  - `validee` : Validée

Règles de statut du module :
- brouillon : ligne en préparation, non comptabilisée.
- validée : ligne confirmée, comptabilisée dans les totaux.
- retirée : ligne écartée mais conservée pour audit.
- Les lignes brouillon ou retirées ne doivent pas compter dans les montants.

### 3. Workflows détectés

#### Workflow : Intervention

- Aucune transition détectée dans ce workflow.

#### Workflow : Produit / pièce

- Aucune transition détectée dans ce workflow.

#### Workflow : Stock source

- Aucune transition détectée dans ce workflow.

#### Workflow : Code produit

- Aucune transition détectée dans ce workflow.

#### Workflow : Nom produit

- Aucune transition détectée dans ce workflow.

#### Workflow : Type article

- Aucune transition détectée dans ce workflow.

#### Workflow : Désignation

- Aucune transition détectée dans ce workflow.

#### Workflow : Type ligne

- Aucune transition détectée dans ce workflow.

#### Workflow : Quantité

- Aucune transition détectée dans ce workflow.

#### Workflow : Prix unitaire

- Aucune transition détectée dans ce workflow.

#### Workflow : Prix unitaire HT

- Aucune transition détectée dans ce workflow.

#### Workflow : TVA (%)

- Aucune transition détectée dans ce workflow.

#### Workflow : Montant HT

- Aucune transition détectée dans ce workflow.

#### Workflow : Montant TVA

- Aucune transition détectée dans ce workflow.

#### Workflow : Montant TTC

- Aucune transition détectée dans ce workflow.

#### Workflow : Montant total

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut

- Aucune transition détectée dans ce workflow.

#### Workflow : Mouvement stock

- Aucune transition détectée dans ce workflow.

#### Workflow : Stock traité le

- Aucune transition détectée dans ce workflow.

#### Workflow : Quantité traitée en stock

- Aucune transition détectée dans ce workflow.

#### Workflow : Observations

- Aucune transition détectée dans ce workflow.

### 4. Actions / boutons détectés

| Action technique | Label utilisateur | Type | Rôle attendu |
|---|---|---|---|
| `lignesinterventionauto` | Lignes intervention | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `interventionId` | Intervention | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `produitId` | Produit / pièce | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `stockId` | Stock source | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `produitCode` | Code produit | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `produitNom` | Nom produit | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `typeArticle` | Type article | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `designation` | Désignation | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `typeLigne` | Type ligne | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `quantite` | Quantité | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `prixUnitaire` | Prix unitaire | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `prixUnitaireHT` | Prix unitaire HT | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `tauxTVA` | TVA (%) | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `montantHT` | Montant HT | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `montantTVA` | Montant TVA | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `montantTTC` | Montant TTC | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `montantTotal` | Montant total | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statut` | Statut | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `stockMovementId` | Mouvement stock | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `stockProcessedAt` | Stock traité le | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `stockProcessedQuantity` | Quantité traitée en stock | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `observations` | Observations | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `ligne` | Ligne | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `infos` | Notes | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `observations` | Retirer la ligne | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `ligne-intervention` | Cycle ligne intervention | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `brouillon` | Brouillon | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `validee` | Validée | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |

### 5. Règles métier détaillées

- Validation ligne → entre dans les totaux.
- Validation ligne pièce → peut déclencher sortie stock.
- Retrait ligne → peut réintégrer stock si mouvement existant.
- ERPRelatedRecordsPanel doit afficher les totaux des lignes validées.

### 6. Relations parent/enfant et panneaux liés

- Aucun enfant de composition détecté.

### 7. Ce qui doit apparaître dans l’interface

- Les champs : dans le formulaire ou détail runtime.
- Les statuts : visibles comme état courant, mais non utilisés comme commande libre si une transition existe.
- Les boutons de workflow : dans la barre d’actions runtime.
- Les enfants liés : dans les panneaux runtime liés, pas dans le corps du formulaire.
- Les créations enfants : via RuntimeChildCreateHrefBuilder ou composition.children.

### 8. Ce qui ne doit pas être dans le formulaire

- Boutons de workflow.
- Boutons métier de transition d’état.
- Actions qui déclenchent des créations automatiques.
- Modifications manuelles de champs calculés ou hérités.
- Liens enfants construits à la main sans contexte parent.

---

## Factures — `facturesauto`

- Fichier : `src/runtime/modules/generated/facturesauto/facturesauto.module.ts`
- Fichier actions : `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts`
- Description : Facturation atelier AMARKHYS

### 1. Ce que le module gère

- La preuve commerciale liée à une intervention.
- Les montants HT/TTC, TVA, statut facture, statut paiement.
- Le lien vers encaissements et échéances.

### 2. Statuts détectés et rôle métier

#### Champ `statutFacture` — Statut facture

- Type : `select`
- Valeur initiale détectée : `emise`
- Valeurs possibles :
  - `brouillon` : Brouillon
  - `emise` : Émise
  - `annulee` : Annulée

#### Champ `statutPaiement` — Statut paiement

- Type : `select`
- Valeur initiale détectée : `en_attente`
- Valeurs possibles :
  - `en_attente` : En attente
  - `partiel` : Partiel
  - `paye` : Payé

#### Champ `statutEnvoiFacture` — Statut envoi facture

- Type : `select`
- Valeur initiale détectée : `non_envoyee`
- Valeurs possibles :
  - `non_envoyee` : Non envoyée
  - `envoyee` : Envoyée
  - `echec` : Échec envoi

Règles de statut du module :
- statutFacture : cycle commercial de la facture.
- statutPaiement : état financier calculé depuis les encaissements.
- Les montants doivent être calculés, pas saisis librement.
- Un paiement ne doit pas modifier une facture hors contexte.

### 3. Workflows détectés

#### Workflow : Numéro facture

- Aucune transition détectée dans ce workflow.

#### Workflow : Date facture

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut facture

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut paiement

- Aucune transition détectée dans ce workflow.

#### Workflow : Client

- Aucune transition détectée dans ce workflow.

#### Workflow : Véhicule

- Aucune transition détectée dans ce workflow.

#### Workflow : Intervention

- Aucune transition détectée dans ce workflow.

#### Workflow : Montant HT

- Aucune transition détectée dans ce workflow.

#### Workflow : Taux TVA (%)

- Aucune transition détectée dans ce workflow.

#### Workflow : Montant TTC

- Aucune transition détectée dans ce workflow.

#### Workflow : Montant payé

- Aucune transition détectée dans ce workflow.

#### Workflow : Reste à payer

- Aucune transition détectée dans ce workflow.

#### Workflow : Mode paiement

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut envoi facture

- Aucune transition détectée dans ce workflow.

#### Workflow : Dernier envoi facture

- Aucune transition détectée dans ce workflow.

#### Workflow : Canal dernier envoi

- Aucune transition détectée dans ce workflow.

#### Workflow : Destinataire dernier envoi

- Aucune transition détectée dans ce workflow.

#### Workflow : Nombre d

- Aucune transition détectée dans ce workflow.

#### Workflow : Observations

- Aucune transition détectée dans ce workflow.

### 4. Actions / boutons détectés

| Action technique | Label utilisateur | Type | Rôle attendu |
|---|---|---|---|
| `facturesauto` | Factures | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `numeroFacture` | Numéro facture | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `dateFacture` | Date facture | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statutFacture` | Statut facture | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statutPaiement` | Statut paiement | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `clientId` | Client | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `vehiculeId` | Véhicule | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `interventionId` | Intervention | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `montantHT` | Montant HT | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `tva` | Taux TVA (%) | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `montantTTC` | Montant TTC | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `montantPaye` | Montant payé | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `resteAPayer` | Reste à payer | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `modePaiement` | Mode paiement | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statutEnvoiFacture` | Statut envoi facture | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `dernierEnvoiFactureAt` | Dernier envoi facture | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `canalDernierEnvoiFacture` | Canal dernier envoi | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `destinataireDernierEnvoiFacture` | Destinataire dernier envoi | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `nombreEnvoisFacture` | Nombre d | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `observations` | Observations | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `facture` | Facture | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `infos` | Relations | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `liens` | Finance | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `couts` | Envoi | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `suivi-envoi` | Notes | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `obs` | Total | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `en_attente` | En attente | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `partiel` | Partielles | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `payees` | Payées | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `annulees` | Annulées | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `total` | Factures affichées | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `montant_ttc` | Montant TTC | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `reste_a_payer` | Reste à payer | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `encaissements-facture` | Cycle facture | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `partiel` | Paiement partiel | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `paye` | Payé | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `Valider` | Valider la facture | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `Marquer payée` | Marquer payée | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `Enregistrer paiement` | Enregistrer un paiement | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `Marquer envoyee` | Marquer comme envoyée | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |

### 5. Règles métier détaillées

- Intervention terminée → facture créée.
- Encaissement validé → montant payé et reste à payer recalculés.
- Somme encaissements >= total TTC → facture payée.
- Facture partiellement payée → statut partiel.
- Facture sans encaissement → en attente.

### 6. Relations parent/enfant et panneaux liés

| Relation | Module enfant | Clé étrangère | Création autorisée | Total | Ce que cela gère |
|---|---|---|---:|---|---|
| encaissements-facture | `encaissementsauto` | `factureId` | non | - | Panneau lié runtime. Doit apparaître hors formulaire, généralement après la fiche détail/edit. |
| echeances-facture | `echeancespaiementauto` | `factureId` | non | - | Panneau lié runtime. Doit apparaître hors formulaire, généralement après la fiche détail/edit. |

### 7. Ce qui doit apparaître dans l’interface

- Les champs : dans le formulaire ou détail runtime.
- Les statuts : visibles comme état courant, mais non utilisés comme commande libre si une transition existe.
- Les boutons de workflow : dans la barre d’actions runtime.
- Les enfants liés : dans les panneaux runtime liés, pas dans le corps du formulaire.
- Les créations enfants : via RuntimeChildCreateHrefBuilder ou composition.children.

### 8. Ce qui ne doit pas être dans le formulaire

- Boutons de workflow.
- Boutons métier de transition d’état.
- Actions qui déclenchent des créations automatiques.
- Modifications manuelles de champs calculés ou hérités.
- Liens enfants construits à la main sans contexte parent.

---

## Encaissements — `encaissementsauto`

- Fichier : `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts`
- Fichier actions : `src/runtime/modules/generated/encaissementsauto/encaissementsauto.actions.ts`
- Description : Suivi des paiements clients, paiements partiels et encaissements AMARKHYS.

### 1. Ce que le module gère

- Le paiement réel reçu sur une facture.
- Le montant payé, date paiement, mode paiement, reçu, transaction.
- La preuve financière qui met à jour la facture.

### 2. Statuts détectés et rôle métier

#### Champ `statut` — Statut

- Type : `select`
- Valeur initiale détectée : `valide`
- Valeurs possibles :
  - `en_attente` : En attente
  - `valide` : Validé
  - `rejete` : Rejeté
  - `annule` : Annulé

#### Champ `statutEnvoiRecu` — Statut envoi reçu

- Type : `select`
- Valeur initiale détectée : `non_envoye`
- Valeurs possibles :
  - `non_envoye` : Non envoyé
  - `envoye` : Envoyé
  - `echec` : Échec envoi

Règles de statut du module :
- Un encaissement doit être créé depuis sa facture parent.
- Un encaissement validé est comptabilisé.
- Le formulaire doit recevoir factureId, clientId, vehiculeId préremplis et verrouillés.

### 3. Workflows détectés

#### Workflow : Facture

- Aucune transition détectée dans ce workflow.

#### Workflow : Client

- Aucune transition détectée dans ce workflow.

#### Workflow : Véhicule

- Aucune transition détectée dans ce workflow.

#### Workflow : Montant encaissé

- Aucune transition détectée dans ce workflow.

#### Workflow : Date paiement

- Aucune transition détectée dans ce workflow.

#### Workflow : Mode paiement

- Aucune transition détectée dans ce workflow.

#### Workflow : Référence transaction

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut

- Aucune transition détectée dans ce workflow.

#### Workflow : Numéro reçu

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut envoi reçu

- Aucune transition détectée dans ce workflow.

#### Workflow : Dernier envoi reçu

- Aucune transition détectée dans ce workflow.

#### Workflow : Canal dernier envoi reçu

- Aucune transition détectée dans ce workflow.

#### Workflow : Destinataire dernier envoi reçu

- Aucune transition détectée dans ce workflow.

#### Workflow : Nombre d

- Aucune transition détectée dans ce workflow.

#### Workflow : Notes

- Aucune transition détectée dans ce workflow.

### 4. Actions / boutons détectés

| Action technique | Label utilisateur | Type | Rôle attendu |
|---|---|---|---|
| `encaissementsauto` | Encaissements | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `factureId` | Facture | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `clientId` | Client | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `vehiculeId` | Véhicule | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `montant` | Montant encaissé | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `datePaiement` | Date paiement | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `modePaiement` | Mode paiement | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `referenceTransaction` | Référence transaction | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statut` | Statut | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `numeroRecu` | Numéro reçu | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statutEnvoiRecu` | Statut envoi reçu | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `dernierEnvoiRecuAt` | Dernier envoi reçu | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `canalDernierEnvoiRecu` | Canal dernier envoi reçu | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `destinataireDernierEnvoiRecu` | Destinataire dernier envoi reçu | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `nombreEnvoisRecu` | Nombre d | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `notes` | Notes | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `paiement` | Paiement | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `infos` | Relations | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `liens` | Reçu | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `suivi-recu` | Notes | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `observations` | Cycle encaissement | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `en_attente` | En attente | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `valide` | Validé | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `rejete` | Rejeté | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `annule` | Annulé | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `Valider` | Valider l’encaissement | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `Rejeter` | Rejeter | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `Annuler` | Annuler | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |

### 5. Règles métier détaillées

- Création encaissement → met à jour facture.
- Encaissement lié à facture → recalcule montant payé et reste à payer.
- Le lien de création doit toujours transporter parentModuleKey, parentRecordId, parentForeignKey.

### 6. Relations parent/enfant et panneaux liés

- Aucun enfant de composition détecté.

### 7. Ce qui doit apparaître dans l’interface

- Les champs : dans le formulaire ou détail runtime.
- Les statuts : visibles comme état courant, mais non utilisés comme commande libre si une transition existe.
- Les boutons de workflow : dans la barre d’actions runtime.
- Les enfants liés : dans les panneaux runtime liés, pas dans le corps du formulaire.
- Les créations enfants : via RuntimeChildCreateHrefBuilder ou composition.children.

### 8. Ce qui ne doit pas être dans le formulaire

- Boutons de workflow.
- Boutons métier de transition d’état.
- Actions qui déclenchent des créations automatiques.
- Modifications manuelles de champs calculés ou hérités.
- Liens enfants construits à la main sans contexte parent.

---

## Échéances paiement — `echeancespaiementauto`

- Fichier : `src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts`
- Fichier actions : `src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.actions.ts`
- Description : Suivi des échéances de paiement, paiements fractionnés et relances de recouvrement AMARKHYS.

### 1. Ce que le module gère

- Les échéances ou plans de paiement liés à une facture.
- Les montants prévus/payés, date échéance, relances.
- Le suivi de paiement échelonné.

### 2. Statuts détectés et rôle métier

#### Champ `statut` — Statut

- Type : `select`
- Valeur initiale détectée : `a_venir`
- Valeurs possibles :
  - `a_venir` : À venir
  - `en_retard` : En retard
  - `partiellement_payee` : Partiellement payée
  - `payee` : Payée
  - `annulee` : Annulée

Règles de statut du module :
- Une échéance doit être liée à une facture.
- Le paiement d’échéance doit contribuer à l’état financier de la facture selon règles.

### 3. Workflows détectés

#### Workflow : Facture

- Aucune transition détectée dans ce workflow.

#### Workflow : Client

- Aucune transition détectée dans ce workflow.

#### Workflow : Véhicule

- Aucune transition détectée dans ce workflow.

#### Workflow : Montant prévu

- Aucune transition détectée dans ce workflow.

#### Workflow : Montant payé

- Aucune transition détectée dans ce workflow.

#### Workflow : Date échéance

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut

- Aucune transition détectée dans ce workflow.

#### Workflow : Canal relance

- Aucune transition détectée dans ce workflow.

#### Workflow : Dernier rappel

- Aucune transition détectée dans ce workflow.

#### Workflow : Notes

- Aucune transition détectée dans ce workflow.

### 4. Actions / boutons détectés

| Action technique | Label utilisateur | Type | Rôle attendu |
|---|---|---|---|
| `echeancespaiementauto` | Échéances paiement | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `factureId` | Facture | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `clientId` | Client | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `vehiculeId` | Véhicule | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `montantPrevu` | Montant prévu | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `montantPaye` | Montant payé | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `dateEcheance` | Date échéance | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statut` | Statut | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `canalRelance` | Canal relance | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `dernierRappelAt` | Dernier rappel | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `notes` | Notes | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `echeance` | Échéance | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `infos` | Relations | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `liens` | Relance | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `suivi` | Cycle échéance | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `a_venir` | À venir | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `en_retard` | En retard | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `partiellement_payee` | Partiellement payée | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `payee` | Payée | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `annulee` | Annulée | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `Marquer payee` | Marquer payée | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `Relancer` | Relancer le client | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `Annuler` | Annuler | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |

### 5. Règles métier détaillées

- Échéance créée depuis facture → factureId/client/vehicule hérités.
- Échéance payée → peut créer ou référencer un encaissement.

### 6. Relations parent/enfant et panneaux liés

- Aucun enfant de composition détecté.

### 7. Ce qui doit apparaître dans l’interface

- Les champs : dans le formulaire ou détail runtime.
- Les statuts : visibles comme état courant, mais non utilisés comme commande libre si une transition existe.
- Les boutons de workflow : dans la barre d’actions runtime.
- Les enfants liés : dans les panneaux runtime liés, pas dans le corps du formulaire.
- Les créations enfants : via RuntimeChildCreateHrefBuilder ou composition.children.

### 8. Ce qui ne doit pas être dans le formulaire

- Boutons de workflow.
- Boutons métier de transition d’état.
- Actions qui déclenchent des créations automatiques.
- Modifications manuelles de champs calculés ou hérités.
- Liens enfants construits à la main sans contexte parent.

---

## Produits — `produitsauto`

- Fichier : `src/runtime/modules/generated/produitsauto/produitsauto.module.ts`
- Fichier actions : `src/runtime/modules/generated/produitsauto/produitsauto.actions.ts`
- Description : Produits, pièces et consommables AMARKHYS

### 1. Ce que le module gère

- Le catalogue article/service atelier.
- La désignation, type article, famille, prix, caractère stockable.
- Le produit pilote les lignes d’intervention, stocks et commandes.

### 2. Statuts détectés et rôle métier

#### Champ `statut` — Statut

- Type : `select`
- Valeur initiale détectée : `actif`
- Valeurs possibles :
  - `actif` : Actif
  - `rupture` : Rupture
  - `inactif` : Inactif
  - `archive` : Archivé

Règles de statut du module :
- Le type article doit être porté par le produit, pas librement par la ligne.
- Stockable/non stockable pilote les comportements stock.
- Les prix et champs calculés doivent être protégés selon le contexte.

### 3. Workflows détectés

#### Workflow : Référence

- Aucune transition détectée dans ce workflow.

#### Workflow : Nom

- Aucune transition détectée dans ce workflow.

#### Workflow : Marque

- Aucune transition détectée dans ce workflow.

#### Workflow : Type fiche

- Aucune transition détectée dans ce workflow.

#### Workflow : Famille produit

- Aucune transition détectée dans ce workflow.

#### Workflow : Type article

- Aucune transition détectée dans ce workflow.

#### Workflow : Sous-catégorie

- Aucune transition détectée dans ce workflow.

#### Workflow : Taux TVA

- Aucune transition détectée dans ce workflow.

#### Workflow : Prix promotionnel

- Aucune transition détectée dans ce workflow.

#### Workflow : Stockable

- Aucune transition détectée dans ce workflow.

#### Workflow : Contenance

- Aucune transition détectée dans ce workflow.

#### Workflow : Unité contenance

- Aucune transition détectée dans ce workflow.

#### Workflow : Poids

- Aucune transition détectée dans ce workflow.

#### Workflow : Unité poids

- Aucune transition détectée dans ce workflow.

#### Workflow : Taille

- Aucune transition détectée dans ce workflow.

#### Workflow : Couleur

- Aucune transition détectée dans ce workflow.

#### Workflow : Modèle

- Aucune transition détectée dans ce workflow.

#### Workflow : Compatibilités

- Aucune transition détectée dans ce workflow.

#### Workflow : Visible boutique

- Aucune transition détectée dans ce workflow.

#### Workflow : Slug boutique

- Aucune transition détectée dans ce workflow.

#### Workflow : Titre SEO

- Aucune transition détectée dans ce workflow.

#### Workflow : Description SEO

- Aucune transition détectée dans ce workflow.

#### Workflow : Image originale

- Aucune transition détectée dans ce workflow.

#### Workflow : Image miniature

- Aucune transition détectée dans ce workflow.

#### Workflow : Image moyenne

- Aucune transition détectée dans ce workflow.

#### Workflow : Image large

- Aucune transition détectée dans ce workflow.

#### Workflow : Texte alternatif image

- Aucune transition détectée dans ce workflow.

#### Workflow : Chemin stockage image

- Aucune transition détectée dans ce workflow.

#### Workflow : Catégorie

- Aucune transition détectée dans ce workflow.

#### Workflow : Type produit

- Aucune transition détectée dans ce workflow.

#### Workflow : Unité

- Aucune transition détectée dans ce workflow.

#### Workflow : Prix achat

- Aucune transition détectée dans ce workflow.

#### Workflow : Prix vente

- Aucune transition détectée dans ce workflow.

#### Workflow : Seuil minimum

- Aucune transition détectée dans ce workflow.

#### Workflow : Description

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut

- Aucune transition détectée dans ce workflow.

### 4. Actions / boutons détectés

| Action technique | Label utilisateur | Type | Rôle attendu |
|---|---|---|---|
| `produitsauto` | Produits | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `reference` | Référence | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `nom` | Nom | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `marque` | Marque | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `typeRecord` | Type fiche | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `parentProductId` | Famille produit | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `typeArticle` | Type article | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `sousCategorie` | Sous-catégorie | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `tauxTVA` | Taux TVA | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `prixPromo` | Prix promotionnel | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `stockable` | Stockable | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `contenance` | Contenance | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `uniteContenance` | Unité contenance | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `poids` | Poids | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `unitePoids` | Unité poids | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `taille` | Taille | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `couleur` | Couleur | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `modele` | Modèle | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `compatibilites` | Compatibilités | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `visibleBoutique` | Visible boutique | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `slugBoutique` | Slug boutique | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `seoTitle` | Titre SEO | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `seoDescription` | Description SEO | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `imageOriginalUrl` | Image originale | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `imageThumbnailUrl` | Image miniature | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `imageMediumUrl` | Image moyenne | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `imageLargeUrl` | Image large | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `imageAlt` | Texte alternatif image | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `imageStoragePath` | Chemin stockage image | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `categorie` | Catégorie | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `typeProduit` | Type produit | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `unite` | Unité | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `prixAchat` | Prix achat | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `prixVente` | Prix vente | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `seuilMinimum` | Seuil minimum | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `description` | Description | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statut` | Statut | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `identite` | Identité | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `infos` | Prix | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `tarifs` | Catalogue | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |

### 5. Règles métier détaillées

- Choix produit dans ligne → type article et prix auto-remplis.
- Produit stockable → sélection/contrôle du stock.
- Produit non stockable → pas de mouvement stock obligatoire.

### 6. Relations parent/enfant et panneaux liés

- Aucun enfant de composition détecté.

### 7. Ce qui doit apparaître dans l’interface

- Les champs : dans le formulaire ou détail runtime.
- Les statuts : visibles comme état courant, mais non utilisés comme commande libre si une transition existe.
- Les boutons de workflow : dans la barre d’actions runtime.
- Les enfants liés : dans les panneaux runtime liés, pas dans le corps du formulaire.
- Les créations enfants : via RuntimeChildCreateHrefBuilder ou composition.children.

### 8. Ce qui ne doit pas être dans le formulaire

- Boutons de workflow.
- Boutons métier de transition d’état.
- Actions qui déclenchent des créations automatiques.
- Modifications manuelles de champs calculés ou hérités.
- Liens enfants construits à la main sans contexte parent.

---

## Stocks — `stocksauto`

- Fichier : `src/runtime/modules/generated/stocksauto/stocksauto.module.ts`
- Fichier actions : `src/runtime/modules/generated/stocksauto/stocksauto.actions.ts`
- Description : Stocks pièces, produits et consommables AMARKHYS

### 1. Ce que le module gère

- L’état courant du stock par produit/emplacement.
- La quantité disponible, seuils, valeur stock.
- La lecture du stock résultant des mouvements.

### 2. Statuts détectés et rôle métier

#### Champ `statut` — Statut

- Type : `select`
- Valeur initiale détectée : `disponible`
- Valeurs possibles :
  - `disponible` : Disponible
  - `stock_faible` : Stock faible
  - `rupture` : Rupture
  - `archive` : Archivé

Règles de statut du module :
- Le stock n’est pas une saisie libre.
- currentStock / quantite doivent être pilotés par mouvements.
- Les stocks faibles doivent être détectés via seuils.

### 3. Workflows détectés

#### Workflow : Produit

- Aucune transition détectée dans ce workflow.

#### Workflow : Quantité

- Aucune transition détectée dans ce workflow.

#### Workflow : Seuil alerte

- Aucune transition détectée dans ce workflow.

#### Workflow : Emplacement

- Aucune transition détectée dans ce workflow.

#### Workflow : Type stock

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut

- Aucune transition détectée dans ce workflow.

#### Workflow : Observations

- Aucune transition détectée dans ce workflow.

### 4. Actions / boutons détectés

| Action technique | Label utilisateur | Type | Rôle attendu |
|---|---|---|---|
| `stocksauto` | Stocks | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `produitId` | Produit | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `quantite` | Quantité | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `seuilAlerte` | Seuil alerte | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `emplacement` | Emplacement | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `typeStock` | Type stock | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statut` | Statut | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `observations` | Observations | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `stock` | Stock | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `infos` | Notes | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `observations` | Cycle stock | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `disponible` | Disponible | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `stock_faible` | Stock faible | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `rupture` | Rupture | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `archive` | Archivé | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |

### 5. Règles métier détaillées

- Mouvement entrée → augmente stock.
- Mouvement sortie → diminue stock.
- Correction → ajuste stock avec audit.
- Aucune modification stock sans mouvement.

### 6. Relations parent/enfant et panneaux liés

- Aucun enfant de composition détecté.

### 7. Ce qui doit apparaître dans l’interface

- Les champs : dans le formulaire ou détail runtime.
- Les statuts : visibles comme état courant, mais non utilisés comme commande libre si une transition existe.
- Les boutons de workflow : dans la barre d’actions runtime.
- Les enfants liés : dans les panneaux runtime liés, pas dans le corps du formulaire.
- Les créations enfants : via RuntimeChildCreateHrefBuilder ou composition.children.

### 8. Ce qui ne doit pas être dans le formulaire

- Boutons de workflow.
- Boutons métier de transition d’état.
- Actions qui déclenchent des créations automatiques.
- Modifications manuelles de champs calculés ou hérités.
- Liens enfants construits à la main sans contexte parent.

---

## Mouvements stock — `mouvementsstockauto`

- Fichier : `src/runtime/modules/generated/mouvementsstockauto/mouvementsstockauto.module.ts`
- Description : Entrées, sorties et corrections de stock AMARKHYS

### 1. Ce que le module gère

- La preuve de variation stock.
- Entrée, sortie, correction, réintégration.
- Les quantités avant/après et la source métier.

### 2. Statuts détectés et rôle métier

#### Champ `statut` — Statut

- Type : `select`
- Valeur initiale détectée : `valide`
- Valeurs possibles :
  - `brouillon` : Brouillon
  - `valide` : Validé
  - `annule` : Annulé

Règles de statut du module :
- Un mouvement validé matérialise une variation.
- Le mouvement doit porter sourceModule/sourceId.
- Un mouvement ne doit pas être modifié pour maquiller un stock.

### 3. Workflows détectés

#### Workflow : Type mouvement

- Aucune transition détectée dans ce workflow.

#### Workflow : Stock

- Aucune transition détectée dans ce workflow.

#### Workflow : Produit

- Aucune transition détectée dans ce workflow.

#### Workflow : Quantité

- Aucune transition détectée dans ce workflow.

#### Workflow : Quantité avant

- Aucune transition détectée dans ce workflow.

#### Workflow : Quantité après

- Aucune transition détectée dans ce workflow.

#### Workflow : Module source

- Aucune transition détectée dans ce workflow.

#### Workflow : Source

- Aucune transition détectée dans ce workflow.

#### Workflow : Intervention

- Aucune transition détectée dans ce workflow.

#### Workflow : Ligne intervention

- Aucune transition détectée dans ce workflow.

#### Workflow : Motif

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut

- Aucune transition détectée dans ce workflow.

#### Workflow : Date mouvement

- Aucune transition détectée dans ce workflow.

#### Workflow : Observations

- Aucune transition détectée dans ce workflow.

### 4. Actions / boutons détectés

| Action technique | Label utilisateur | Type | Rôle attendu |
|---|---|---|---|
| `mouvementsstockauto` | Mouvements stock | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `typeMouvement` | Type mouvement | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `stockId` | Stock | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `produitId` | Produit | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `quantite` | Quantité | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `quantiteAvant` | Quantité avant | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `quantiteApres` | Quantité après | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `sourceModule` | Module source | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `sourceId` | Source | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `interventionId` | Intervention | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `ligneInterventionId` | Ligne intervention | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `motif` | Motif | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statut` | Statut | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `dateMouvement` | Date mouvement | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `observations` | Observations | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `mouvement` | Mouvement | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `infos` | Source | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `source` | Notes | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `observations` | Cycle mouvement stock | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `brouillon` | Brouillon | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `valide` | Validé | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `annule` | Annulé | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |

### 5. Règles métier détaillées

- Réception validée → mouvement entrée.
- Ligne intervention validée pièce → mouvement sortie.
- Ligne retirée avec stock mouvement → mouvement inverse.

### 6. Relations parent/enfant et panneaux liés

- Aucun enfant de composition détecté.

### 7. Ce qui doit apparaître dans l’interface

- Les champs : dans le formulaire ou détail runtime.
- Les statuts : visibles comme état courant, mais non utilisés comme commande libre si une transition existe.
- Les boutons de workflow : dans la barre d’actions runtime.
- Les enfants liés : dans les panneaux runtime liés, pas dans le corps du formulaire.
- Les créations enfants : via RuntimeChildCreateHrefBuilder ou composition.children.

### 8. Ce qui ne doit pas être dans le formulaire

- Boutons de workflow.
- Boutons métier de transition d’état.
- Actions qui déclenchent des créations automatiques.
- Modifications manuelles de champs calculés ou hérités.
- Liens enfants construits à la main sans contexte parent.

---

## Fournisseurs — `fournisseursauto`

- Fichier : `src/runtime/modules/generated/fournisseursauto/fournisseursauto.module.ts`
- Description : Fournisseurs pieces, consommables et services AMARKHYS

### 1. Ce que le module gère

- Le référentiel fournisseur.
- Identité, contact, conditions, relation avec commandes stock.
- Point d’entrée achat.

### 2. Statuts détectés et rôle métier

#### Champ `statut` — Statut

- Type : `select`
- Valeur initiale détectée : `actif`
- Valeurs possibles :
  - `actif` : Actif
  - `suspendu` : Suspendu
  - `archive` : Archive

Règles de statut du module :
- Référentiel peu workflow.
- Le fournisseur peut être actif/inactif selon besoin.

### 3. Workflows détectés

#### Workflow : Nom fournisseur

- Aucune transition détectée dans ce workflow.

#### Workflow : Code fournisseur

- Aucune transition détectée dans ce workflow.

#### Workflow : Telephone

- Aucune transition détectée dans ce workflow.

#### Workflow : Email

- Aucune transition détectée dans ce workflow.

#### Workflow : Adresse

- Aucune transition détectée dans ce workflow.

#### Workflow : Ville

- Aucune transition détectée dans ce workflow.

#### Workflow : Type fournisseur

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut

- Aucune transition détectée dans ce workflow.

#### Workflow : Notes

- Aucune transition détectée dans ce workflow.

### 4. Actions / boutons détectés

| Action technique | Label utilisateur | Type | Rôle attendu |
|---|---|---|---|
| `fournisseursauto` | Fournisseurs | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `nom` | Nom fournisseur | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `codeFournisseur` | Code fournisseur | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `telephone` | Telephone | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `email` | Email | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `adresse` | Adresse | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `ville` | Ville | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `typeFournisseur` | Type fournisseur | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statut` | Statut | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `notes` | Notes | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `identite` | Identite | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |

### 5. Règles métier détaillées

- Fournisseur sélectionné → commandes stock filtrées.
- Commande stock créée depuis fournisseur → fournisseur prérempli.

### 6. Relations parent/enfant et panneaux liés

- Aucun enfant de composition détecté.

### 7. Ce qui doit apparaître dans l’interface

- Les champs : dans le formulaire ou détail runtime.
- Les statuts : visibles comme état courant, mais non utilisés comme commande libre si une transition existe.
- Les boutons de workflow : dans la barre d’actions runtime.
- Les enfants liés : dans les panneaux runtime liés, pas dans le corps du formulaire.
- Les créations enfants : via RuntimeChildCreateHrefBuilder ou composition.children.

### 8. Ce qui ne doit pas être dans le formulaire

- Boutons de workflow.
- Boutons métier de transition d’état.
- Actions qui déclenchent des créations automatiques.
- Modifications manuelles de champs calculés ou hérités.
- Liens enfants construits à la main sans contexte parent.

---

## Commandes stock — `commandesstockauto`

- Fichier : `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts`
- Description : Commandes fournisseurs pour pieces et consommables AMARKHYS

### 1. Ce que le module gère

- L’intention d’achat stock.
- Le fournisseur, les lignes de commande, montants calculés.
- Le cycle brouillon/envoyée.

### 2. Statuts détectés et rôle métier

#### Champ `statut` — Statut

- Type : `select`
- Valeur initiale détectée : `brouillon`
- Valeurs possibles :
  - `brouillon` : Brouillon
  - `envoyee` : Envoyee
  - `partiellement_recue` : Partiellement recue
  - `recue` : Recue
  - `annulee` : Annulee

Règles de statut du module :
- brouillon : commande préparée.
- envoyée : intention d’achat transmise.
- La commande ne modifie pas le stock.
- Les statuts de réception doivent être calculés depuis les réceptions, pas manipulés librement.

### 3. Workflows détectés

#### Workflow : Numero commande

- Aucune transition détectée dans ce workflow.

#### Workflow : Fournisseur

- Aucune transition détectée dans ce workflow.

#### Workflow : Date commande

- Aucune transition détectée dans ce workflow.

#### Workflow : Date livraison prevue

- Aucune transition détectée dans ce workflow.

#### Workflow : Montant HT

- Aucune transition détectée dans ce workflow.

#### Workflow : Montant TTC

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut

- Aucune transition détectée dans ce workflow.

#### Workflow : Notes

- Aucune transition détectée dans ce workflow.

### 4. Actions / boutons détectés

| Action technique | Label utilisateur | Type | Rôle attendu |
|---|---|---|---|
| `commandesstockauto` | Commandes stock | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `numeroCommande` | Numero commande | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `fournisseurId` | Fournisseur | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `dateCommande` | Date commande | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `dateLivraisonPrevue` | Date livraison prevue | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `montantHT` | Montant HT | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `montantTTC` | Montant TTC | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statut` | Statut | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `notes` | Notes | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `commande` | Commande | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |

### 5. Règles métier détaillées

- Commande envoyée → fige l’intention.
- Lignes commande validées → base des réceptions possibles.
- Réception réelle → seule elle impacte le stock.

### 6. Relations parent/enfant et panneaux liés

| Relation | Module enfant | Clé étrangère | Création autorisée | Total | Ce que cela gère |
|---|---|---|---:|---|---|
| lignes-commandestock | `lignescommandestockauto` | `commandeId` | non | - | Panneau lié runtime. Doit apparaître hors formulaire, généralement après la fiche détail/edit. |
| receptions-stock | `receptionsstockauto` | `commandeId` | non | - | Panneau lié runtime. Doit apparaître hors formulaire, généralement après la fiche détail/edit. |

### 7. Ce qui doit apparaître dans l’interface

- Les champs : dans le formulaire ou détail runtime.
- Les statuts : visibles comme état courant, mais non utilisés comme commande libre si une transition existe.
- Les boutons de workflow : dans la barre d’actions runtime.
- Les enfants liés : dans les panneaux runtime liés, pas dans le corps du formulaire.
- Les créations enfants : via RuntimeChildCreateHrefBuilder ou composition.children.

### 8. Ce qui ne doit pas être dans le formulaire

- Boutons de workflow.
- Boutons métier de transition d’état.
- Actions qui déclenchent des créations automatiques.
- Modifications manuelles de champs calculés ou hérités.
- Liens enfants construits à la main sans contexte parent.

---

## Lignes commande stock — `lignescommandestockauto`

- Fichier : `src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts`
- Description : Details produits des commandes fournisseurs AMARKHYS

### 1. Ce que le module gère

- Le détail produit/quantité/prix d’une commande stock.
- La base des réceptions stock.
- Les montants de commande.

### 2. Statuts détectés et rôle métier

#### Champ `statut` — Statut

- Type : `select`
- Valeur initiale détectée : `brouillon`
- Valeurs possibles :
  - `brouillon` : Brouillon
  - `validee` : Validee

Règles de statut du module :
- brouillon : ligne préparée.
- validée : ligne confirmée et réceptionnable.
- La ligne de commande ne choisit pas le stock destination.

### 3. Workflows détectés

#### Workflow : Commande

- Aucune transition détectée dans ce workflow.

#### Workflow : Produit

- Aucune transition détectée dans ce workflow.

#### Workflow : Stock destination

- Aucune transition détectée dans ce workflow.

#### Workflow : Designation

- Aucune transition détectée dans ce workflow.

#### Workflow : Quantite commandee

- Aucune transition détectée dans ce workflow.

#### Workflow : Quantite recue

- Aucune transition détectée dans ce workflow.

#### Workflow : Prix unitaire HT

- Aucune transition détectée dans ce workflow.

#### Workflow : Montant HT

- Aucune transition détectée dans ce workflow.

#### Workflow : Montant TTC

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut

- Aucune transition détectée dans ce workflow.

### 4. Actions / boutons détectés

| Action technique | Label utilisateur | Type | Rôle attendu |
|---|---|---|---|
| `lignescommandestockauto` | Lignes commande stock | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `commandeId` | Commande | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `produitId` | Produit | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `stockId` | Stock destination | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `designation` | Designation | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `quantiteCommandee` | Quantite commandee | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `quantiteRecue` | Quantite recue | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `prixUnitaireHT` | Prix unitaire HT | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `montantHT` | Montant HT | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `montantTTC` | Montant TTC | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statut` | Statut | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `ligne` | Ligne | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |

### 5. Règles métier détaillées

- Choix produit → designation/prix achat snapshot.
- Ligne validée → peut être proposée dans réception.
- Ligne déjà réceptionnée → doit être exclue sauf réception partielle gérée.

### 6. Relations parent/enfant et panneaux liés

| Relation | Module enfant | Clé étrangère | Création autorisée | Total | Ce que cela gère |
|---|---|---|---:|---|---|
| receptions-ligne-commande | `receptionsstockauto` | `ligneCommandeId` | non | - | Panneau lié runtime. Doit apparaître hors formulaire, généralement après la fiche détail/edit. |

### 7. Ce qui doit apparaître dans l’interface

- Les champs : dans le formulaire ou détail runtime.
- Les statuts : visibles comme état courant, mais non utilisés comme commande libre si une transition existe.
- Les boutons de workflow : dans la barre d’actions runtime.
- Les enfants liés : dans les panneaux runtime liés, pas dans le corps du formulaire.
- Les créations enfants : via RuntimeChildCreateHrefBuilder ou composition.children.

### 8. Ce qui ne doit pas être dans le formulaire

- Boutons de workflow.
- Boutons métier de transition d’état.
- Actions qui déclenchent des créations automatiques.
- Modifications manuelles de champs calculés ou hérités.
- Liens enfants construits à la main sans contexte parent.

---

## Receptions stock — `receptionsstockauto`

- Fichier : `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts`
- Description : Receptions fournisseurs et entrees stock AMARKHYS

### 1. Ce que le module gère

- L’entrée réelle de stock à partir d’une commande.
- Le lien commande, ligne commande, produit, stock destination.
- La preuve opérationnelle avant mouvement stock.

### 2. Statuts détectés et rôle métier

#### Champ `statut` — Statut

- Type : `select`
- Valeur initiale détectée : `brouillon`
- Valeurs possibles :
  - `brouillon` : Brouillon
  - `validee` : Validee

Règles de statut du module :
- brouillon : réception préparée.
- validée : réception réelle confirmée.
- Une réception validée ne doit pas être traitée deux fois.

### 3. Workflows détectés

#### Workflow : Commande

- Aucune transition détectée dans ce workflow.

#### Workflow : Ligne commande

- Aucune transition détectée dans ce workflow.

#### Workflow : Produit

- Aucune transition détectée dans ce workflow.

#### Workflow : Stock destination

- Aucune transition détectée dans ce workflow.

#### Workflow : Quantite recue

- Aucune transition détectée dans ce workflow.

#### Workflow : Date reception

- Aucune transition détectée dans ce workflow.

#### Workflow : Mouvement stock

- Aucune transition détectée dans ce workflow.

#### Workflow : Date traitement stock

- Aucune transition détectée dans ce workflow.

#### Workflow : Quantite traitee stock

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut

- Aucune transition détectée dans ce workflow.

#### Workflow : Notes

- Aucune transition détectée dans ce workflow.

### 4. Actions / boutons détectés

| Action technique | Label utilisateur | Type | Rôle attendu |
|---|---|---|---|
| `receptionsstockauto` | Receptions stock | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `commandeId` | Commande | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `ligneCommandeId` | Ligne commande | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `produitId` | Produit | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `stockId` | Stock destination | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `quantiteRecue` | Quantite recue | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `dateReception` | Date reception | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `mouvementStockId` | Mouvement stock | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `stockProcessedAt` | Date traitement stock | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `stockProcessedQuantity` | Quantite traitee stock | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statut` | Statut | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `notes` | Notes | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `reception` | Reception | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |

### 5. Règles métier détaillées

- Réception validée → crée mouvement stock entrée.
- Mouvement créé → stock augmenté.
- mouvementStockId renseigné → anti double traitement.

### 6. Relations parent/enfant et panneaux liés

| Relation | Module enfant | Clé étrangère | Création autorisée | Total | Ce que cela gère |
|---|---|---|---:|---|---|
| mouvements-stock-reception | `mouvementsstockauto` | `sourceId` | non | - | Panneau lié runtime. Doit apparaître hors formulaire, généralement après la fiche détail/edit. |

### 7. Ce qui doit apparaître dans l’interface

- Les champs : dans le formulaire ou détail runtime.
- Les statuts : visibles comme état courant, mais non utilisés comme commande libre si une transition existe.
- Les boutons de workflow : dans la barre d’actions runtime.
- Les enfants liés : dans les panneaux runtime liés, pas dans le corps du formulaire.
- Les créations enfants : via RuntimeChildCreateHrefBuilder ou composition.children.

### 8. Ce qui ne doit pas être dans le formulaire

- Boutons de workflow.
- Boutons métier de transition d’état.
- Actions qui déclenchent des créations automatiques.
- Modifications manuelles de champs calculés ou hérités.
- Liens enfants construits à la main sans contexte parent.

---

## Budgets — `budgets`

- Fichier : `src/runtime/modules/generated/budgets/budgets.module.ts`
- Description : Budgets module

### 1. Ce que le module gère

- Module détecté automatiquement.
- Le rôle métier détaillé doit être confirmé selon le processus.

### 2. Statuts détectés et rôle métier

#### Champ `statut` — Statut

- Type : `select`
- Valeur initiale détectée : `actif`
- Valeurs possibles :
  - `actif` : Actif
  - `inactif` : Inactif

Règles de statut du module :
- Les statuts éventuels doivent rester pilotés par actions runtime.
- Les changements d’état ne doivent pas être des modifications libres du formulaire.

### 3. Workflows détectés

#### Workflow : Nom

- Aucune transition détectée dans ce workflow.

#### Workflow : Description

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut

- Aucune transition détectée dans ce workflow.

### 4. Actions / boutons détectés

| Action technique | Label utilisateur | Type | Rôle attendu |
|---|---|---|---|
| `budgets` | Budgets | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `nom` | Nom | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `description` | Description | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statut` | Statut | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `general` | Général | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `informations` | Workflow principal | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `draft` | Brouillon | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `active` | Actif | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `archived` | Archivé | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |

### 5. Règles métier détaillées

- Effets métier à confirmer dans les règles runtime.
- Relations parent/enfant à gérer via composition et contexte parent.

### 6. Relations parent/enfant et panneaux liés

- Aucun enfant de composition détecté.

### 7. Ce qui doit apparaître dans l’interface

- Les champs : dans le formulaire ou détail runtime.
- Les statuts : visibles comme état courant, mais non utilisés comme commande libre si une transition existe.
- Les boutons de workflow : dans la barre d’actions runtime.
- Les enfants liés : dans les panneaux runtime liés, pas dans le corps du formulaire.
- Les créations enfants : via RuntimeChildCreateHrefBuilder ou composition.children.

### 8. Ce qui ne doit pas être dans le formulaire

- Boutons de workflow.
- Boutons métier de transition d’état.
- Actions qui déclenchent des créations automatiques.
- Modifications manuelles de champs calculés ou hérités.
- Liens enfants construits à la main sans contexte parent.

---

## Campagnes — `campagnes`

- Fichier : `src/runtime/modules/generated/campagnes/campagnes.module.ts`
- Description : Campagnes module

### 1. Ce que le module gère

- Module détecté automatiquement.
- Le rôle métier détaillé doit être confirmé selon le processus.

### 2. Statuts détectés et rôle métier

#### Champ `statut` — Statut

- Type : `select`
- Valeur initiale détectée : `actif`
- Valeurs possibles :
  - `actif` : Actif
  - `inactif` : Inactif

Règles de statut du module :
- Les statuts éventuels doivent rester pilotés par actions runtime.
- Les changements d’état ne doivent pas être des modifications libres du formulaire.

### 3. Workflows détectés

#### Workflow : Nom

- Aucune transition détectée dans ce workflow.

#### Workflow : Description

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut

- Aucune transition détectée dans ce workflow.

### 4. Actions / boutons détectés

| Action technique | Label utilisateur | Type | Rôle attendu |
|---|---|---|---|
| `campagnes` | Campagnes | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `nom` | Nom | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `description` | Description | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statut` | Statut | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `general` | Général | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `informations` | Workflow principal | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `draft` | Brouillon | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `active` | Actif | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `archived` | Archivé | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |

### 5. Règles métier détaillées

- Effets métier à confirmer dans les règles runtime.
- Relations parent/enfant à gérer via composition et contexte parent.

### 6. Relations parent/enfant et panneaux liés

- Aucun enfant de composition détecté.

### 7. Ce qui doit apparaître dans l’interface

- Les champs : dans le formulaire ou détail runtime.
- Les statuts : visibles comme état courant, mais non utilisés comme commande libre si une transition existe.
- Les boutons de workflow : dans la barre d’actions runtime.
- Les enfants liés : dans les panneaux runtime liés, pas dans le corps du formulaire.
- Les créations enfants : via RuntimeChildCreateHrefBuilder ou composition.children.

### 8. Ce qui ne doit pas être dans le formulaire

- Boutons de workflow.
- Boutons métier de transition d’état.
- Actions qui déclenchent des créations automatiques.
- Modifications manuelles de champs calculés ou hérités.
- Liens enfants construits à la main sans contexte parent.

---

## Contrats — `contrats`

- Fichier : `src/runtime/modules/generated/contrats/contrats.module.ts`
- Fichier actions : `src/runtime/modules/generated/contrats/contrats.actions.ts`
- Description : Contrats module

### 1. Ce que le module gère

- Module détecté automatiquement.
- Le rôle métier détaillé doit être confirmé selon le processus.

### 2. Statuts détectés et rôle métier

#### Champ `statut` — Statut

- Type : `select`
- Valeur initiale détectée : `actif`
- Valeurs possibles :
  - `actif` : Actif
  - `inactif` : Inactif

Règles de statut du module :
- Les statuts éventuels doivent rester pilotés par actions runtime.
- Les changements d’état ne doivent pas être des modifications libres du formulaire.

### 3. Workflows détectés

#### Workflow : Nom

- Aucune transition détectée dans ce workflow.

#### Workflow : Description

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut

- Aucune transition détectée dans ce workflow.

### 4. Actions / boutons détectés

| Action technique | Label utilisateur | Type | Rôle attendu |
|---|---|---|---|
| `contrats` | Contrats | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `nom` | Nom | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `description` | Description | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statut` | Statut | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `general` | Général | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `informations` | Workflow principal | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `draft` | Brouillon | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `active` | Actif | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `archived` | Archivé | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |

### 5. Règles métier détaillées

- Effets métier à confirmer dans les règles runtime.
- Relations parent/enfant à gérer via composition et contexte parent.

### 6. Relations parent/enfant et panneaux liés

- Aucun enfant de composition détecté.

### 7. Ce qui doit apparaître dans l’interface

- Les champs : dans le formulaire ou détail runtime.
- Les statuts : visibles comme état courant, mais non utilisés comme commande libre si une transition existe.
- Les boutons de workflow : dans la barre d’actions runtime.
- Les enfants liés : dans les panneaux runtime liés, pas dans le corps du formulaire.
- Les créations enfants : via RuntimeChildCreateHrefBuilder ou composition.children.

### 8. Ce qui ne doit pas être dans le formulaire

- Boutons de workflow.
- Boutons métier de transition d’état.
- Actions qui déclenchent des créations automatiques.
- Modifications manuelles de champs calculés ou hérités.
- Liens enfants construits à la main sans contexte parent.

---

## Facturations — `facturations`

- Fichier : `src/runtime/modules/generated/facturations/facturations.module.ts`
- Fichier actions : `src/runtime/modules/generated/facturations/facturations.actions.ts`
- Description : Facturations module

### 1. Ce que le module gère

- Module détecté automatiquement.
- Le rôle métier détaillé doit être confirmé selon le processus.

### 2. Statuts détectés et rôle métier

#### Champ `statut` — Statut

- Type : `select`
- Valeur initiale détectée : `actif`
- Valeurs possibles :
  - `actif` : Actif
  - `inactif` : Inactif

Règles de statut du module :
- Les statuts éventuels doivent rester pilotés par actions runtime.
- Les changements d’état ne doivent pas être des modifications libres du formulaire.

### 3. Workflows détectés

#### Workflow : Nom

- Aucune transition détectée dans ce workflow.

#### Workflow : Description

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut

- Aucune transition détectée dans ce workflow.

### 4. Actions / boutons détectés

| Action technique | Label utilisateur | Type | Rôle attendu |
|---|---|---|---|
| `facturations` | Facturations | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `nom` | Nom | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `description` | Description | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statut` | Statut | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `general` | Général | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `informations` | Workflow principal | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `draft` | Brouillon | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `active` | Actif | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `archived` | Archivé | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |

### 5. Règles métier détaillées

- Effets métier à confirmer dans les règles runtime.
- Relations parent/enfant à gérer via composition et contexte parent.

### 6. Relations parent/enfant et panneaux liés

- Aucun enfant de composition détecté.

### 7. Ce qui doit apparaître dans l’interface

- Les champs : dans le formulaire ou détail runtime.
- Les statuts : visibles comme état courant, mais non utilisés comme commande libre si une transition existe.
- Les boutons de workflow : dans la barre d’actions runtime.
- Les enfants liés : dans les panneaux runtime liés, pas dans le corps du formulaire.
- Les créations enfants : via RuntimeChildCreateHrefBuilder ou composition.children.

### 8. Ce qui ne doit pas être dans le formulaire

- Boutons de workflow.
- Boutons métier de transition d’état.
- Actions qui déclenchent des créations automatiques.
- Modifications manuelles de champs calculés ou hérités.
- Liens enfants construits à la main sans contexte parent.

---

## Rappels — `rappelsauto`

- Fichier : `src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts`
- Fichier actions : `src/runtime/modules/generated/rappelsauto/rappelsauto.actions.ts`
- Description : Rappels clients et véhicules AMARKHYS

### 1. Ce que le module gère

- Module détecté automatiquement.
- Le rôle métier détaillé doit être confirmé selon le processus.

### 2. Statuts détectés et rôle métier

#### Champ `statut` — Statut

- Type : `select`
- Valeur initiale détectée : `planifie`
- Valeurs possibles :
  - `planifie` : Planifié
  - `envoye` : Envoyé
  - `echoue` : Échoué
  - `annule` : Annulé

Règles de statut du module :
- Les statuts éventuels doivent rester pilotés par actions runtime.
- Les changements d’état ne doivent pas être des modifications libres du formulaire.

### 3. Workflows détectés

#### Workflow : Client

- Aucune transition détectée dans ce workflow.

#### Workflow : Véhicule

- Aucune transition détectée dans ce workflow.

#### Workflow : Type rappel

- Aucune transition détectée dans ce workflow.

#### Workflow : Date rappel

- Aucune transition détectée dans ce workflow.

#### Workflow : Canal

- Aucune transition détectée dans ce workflow.

#### Workflow : Message

- Aucune transition détectée dans ce workflow.

#### Workflow : Statut

- Aucune transition détectée dans ce workflow.

### 4. Actions / boutons détectés

| Action technique | Label utilisateur | Type | Rôle attendu |
|---|---|---|---|
| `rappelsauto` | Rappels | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `clientId` | Client | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `vehiculeId` | Véhicule | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `typeRappel` | Type rappel | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `dateRappel` | Date rappel | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `canal` | Canal | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `message` | Message | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `statut` | Statut | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `cible` | Cible | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `infos` | Message | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `contenu` | Cycle rappel | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `planifie` | Planifié | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `envoye` | Envoyé | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `echoue` | Échoué | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |
| `annule` | Annulé | - | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |

### 5. Règles métier détaillées

- Effets métier à confirmer dans les règles runtime.
- Relations parent/enfant à gérer via composition et contexte parent.

### 6. Relations parent/enfant et panneaux liés

- Aucun enfant de composition détecté.

### 7. Ce qui doit apparaître dans l’interface

- Les champs : dans le formulaire ou détail runtime.
- Les statuts : visibles comme état courant, mais non utilisés comme commande libre si une transition existe.
- Les boutons de workflow : dans la barre d’actions runtime.
- Les enfants liés : dans les panneaux runtime liés, pas dans le corps du formulaire.
- Les créations enfants : via RuntimeChildCreateHrefBuilder ou composition.children.

### 8. Ce qui ne doit pas être dans le formulaire

- Boutons de workflow.
- Boutons métier de transition d’état.
- Actions qui déclenchent des créations automatiques.
- Modifications manuelles de champs calculés ou hérités.
- Liens enfants construits à la main sans contexte parent.

---
