# Q2-OP-I6 — Workflows runtime cibles par module

Objectif : proposer les workflows runtime attendus, les transitions, les boutons, les conditions d’apparition et les effets métier pour chaque module prioritaire.

## Doctrine

- Les statuts ne sont pas des commandes libres.
- Les transitions passent par RuntimeActionEngine / RuntimeWorkflowEngine.
- Les boutons apparaissent dans une barre runtime hors formulaire.
- Les formulaires affichent les champs mais ne portent pas les boutons de workflow.
- Les effets métier sont exécutés par Business Rules, guards et services runtime.

## Clients — `clientsauto`

### 1. Rôle du module

- Référentiel client et point d’entrée de la fiche client opérationnelle.

### 2. Champ(s) de statut pilotés

- `statut`
- État initial cible : `prospect`

### 3. États cibles

| État | Label | Signification |
|---|---|---|
| `prospect` | Prospect | Client identifié mais pas encore actif. |
| `actif` | Actif | Client utilisable dans les opérations. |
| `inactif` | Inactif | Client suspendu ou non utilisé actuellement. |
| `archive` | Archivé | Client conservé pour historique. |

### 4. Transitions runtime attendues

| Départ | Bouton/action | Arrivée | Condition d’apparition | Effet métier | Guards obligatoires |
|---|---|---|---|---|---|
| `prospect` | Activer client | `actif` | statut = prospect | Le client devient exploitable pour véhicules, RDV, interventions et factures. | Le client doit avoir au minimum un nom ou une raison sociale.<br/>Le téléphone ou email doit être renseigné si la politique commerciale l’exige. |
| `actif` | Désactiver client | `inactif` | statut = actif | Le client reste consultable mais ne doit plus être proposé comme client actif principal. | Ne pas supprimer les véhicules, RDV, interventions ou factures liés. |
| `inactif` | Réactiver client | `actif` | statut = inactif | Le client redevient disponible dans les opérations. | Conserver l’historique existant. |
| `actif|inactif|prospect` | Archiver client | `archive` | client non supprimé | Le client sort des usages courants mais reste auditable. | Ne jamais perdre l’historique financier et opérationnel. |

### 5. Boutons attendus

- Activer client
- Désactiver client
- Réactiver client
- Archiver client
- Ajouter véhicule
- Ouvrir fiche opérationnelle

### 6. Apparition des boutons

- Les boutons doivent apparaître dans `ERPRuntimeActionBar` ou équivalent runtime.
- Ils doivent être visibles uniquement selon l’état courant et les guards.
- Ils ne doivent pas apparaître dans `ERPEnterpriseForm`.

### 7. Interdits formulaire

- Boutons d’activation/archive
- Création véhicule sans contexte client

### 8. Format runtime cible indicatif

```ts
{
  key: "clientsauto",
  statusField: "statut",
  initialState: "prospect",
  transitions: [
    {
      from: "prospect",
      to: "actif",
      action: "Activer client",
      renderIn: "runtime-action-bar",
    },
    {
      from: "actif",
      to: "inactif",
      action: "Désactiver client",
      renderIn: "runtime-action-bar",
    },
    {
      from: "inactif",
      to: "actif",
      action: "Réactiver client",
      renderIn: "runtime-action-bar",
    },
    {
      from: "actif|inactif|prospect",
      to: "archive",
      action: "Archiver client",
      renderIn: "runtime-action-bar",
    },
  ],
}
```

---

## Véhicules — `vehicules`

### 1. Rôle du module

- Fiche véhicule rattachée au client et pivot vers RDV/interventions/factures.

### 2. Champ(s) de statut pilotés

- `statut`
- État initial cible : `actif`

### 3. États cibles

| État | Label | Signification |
|---|---|---|
| `actif` | Actif | Véhicule suivi normalement. |
| `entretien` | Entretien requis | Véhicule nécessitant une opération. |
| `immobilise` | Immobilisé | Véhicule indisponible. |
| `archive` | Archivé | Véhicule conservé pour historique. |

### 4. Transitions runtime attendues

| Départ | Bouton/action | Arrivée | Condition d’apparition | Effet métier | Guards obligatoires |
|---|---|---|---|---|---|
| `actif` | Marquer entretien requis | `entretien` | statut = actif | Le véhicule est signalé comme nécessitant un suivi. | Ne doit pas créer automatiquement une intervention sans RDV/action dédiée. |
| `entretien` | Immobiliser véhicule | `immobilise` | statut = entretien | Le véhicule est marqué indisponible. | Le contexte doit rester visible sur RDV/interventions. |
| `immobilise|entretien` | Remettre en service | `actif` | statut = immobilise ou entretien | Le véhicule redevient utilisable. | Ne modifie pas les interventions/factures historiques. |
| `actif|entretien|immobilise` | Archiver véhicule | `archive` | véhicule non archivé | Le véhicule sort des listes courantes. | Conserver les liens client/RDV/interventions/factures. |

### 5. Boutons attendus

- Créer rendez-vous
- Voir fiche véhicule
- Marquer entretien requis
- Immobiliser véhicule
- Remettre en service
- Archiver véhicule

### 6. Apparition des boutons

- Les boutons doivent apparaître dans `ERPRuntimeActionBar` ou équivalent runtime.
- Ils doivent être visibles uniquement selon l’état courant et les guards.
- Ils ne doivent pas apparaître dans `ERPEnterpriseForm`.

### 7. Interdits formulaire

- Boutons de transition véhicule
- Création RDV sans clientId et vehiculeId

### 8. Format runtime cible indicatif

```ts
{
  key: "vehicules",
  statusField: "statut",
  initialState: "actif",
  transitions: [
    {
      from: "actif",
      to: "entretien",
      action: "Marquer entretien requis",
      renderIn: "runtime-action-bar",
    },
    {
      from: "entretien",
      to: "immobilise",
      action: "Immobiliser véhicule",
      renderIn: "runtime-action-bar",
    },
    {
      from: "immobilise|entretien",
      to: "actif",
      action: "Remettre en service",
      renderIn: "runtime-action-bar",
    },
    {
      from: "actif|entretien|immobilise",
      to: "archive",
      action: "Archiver véhicule",
      renderIn: "runtime-action-bar",
    },
  ],
}
```

---

## Rendez-vous — `rendezvous`

### 1. Rôle du module

- Planification atelier : client, véhicule, service, créneau, durée.

### 2. Champ(s) de statut pilotés

- `statut`
- État initial cible : `planifie`

### 3. États cibles

| État | Label | Signification |
|---|---|---|
| `planifie` | Planifié | RDV créé et placé sur un créneau. |
| `confirme` | Confirmé | RDV validé par le garage. |
| `en_cours` | En cours | Client/véhicule pris en charge. |
| `termine` | Terminé | RDV consommé. |
| `annule` | Annulé | RDV annulé. |

### 4. Transitions runtime attendues

| Départ | Bouton/action | Arrivée | Condition d’apparition | Effet métier | Guards obligatoires |
|---|---|---|---|---|---|
| `planifie` | Confirmer RDV | `confirme` | statut = planifie | Confirme le créneau et déclenche la création automatique d’une intervention si applicable. | Créneau non conflictuel.<br/>clientId et vehiculeId présents.<br/>Ne pas créer d’intervention si consumedByInterventionId existe déjà. |
| `confirme` | Démarrer RDV | `en_cours` | statut = confirme | Marque la prise en charge du RDV. | RDV confirmé.<br/>Intervention liée ou créable selon règle runtime. |
| `en_cours` | Terminer RDV | `termine` | statut = en_cours | Marque le RDV comme consommé. | Ne doit pas modifier directement la facture.<br/>Ne doit pas recréer une intervention. |
| `planifie|confirme|en_cours` | Annuler RDV | `annule` | statut = planifie, confirme ou en_cours | Annule le RDV et libère/neutralise le créneau selon le moteur planning. | Ne pas annuler silencieusement une intervention déjà terminée ou facturée. |
| `planifie|confirme` | Reporter RDV | `planifie` | statut = planifie ou confirme | Change le créneau via le moteur planning. | Nouveau créneau disponible.<br/>typeService et durationMinutes conservés. |

### 5. Boutons attendus

- Confirmer RDV
- Démarrer RDV
- Terminer RDV
- Annuler RDV
- Reporter RDV

### 6. Apparition des boutons

- Les boutons doivent apparaître dans `ERPRuntimeActionBar` ou équivalent runtime.
- Ils doivent être visibles uniquement selon l’état courant et les guards.
- Ils ne doivent pas apparaître dans `ERPEnterpriseForm`.

### 7. Interdits formulaire

- Modification libre du statut si elle déclenche une intervention
- Boutons de workflow dans le formulaire
- Création intervention sans action runtime

### 8. Format runtime cible indicatif

```ts
{
  key: "rendezvous",
  statusField: "statut",
  initialState: "planifie",
  transitions: [
    {
      from: "planifie",
      to: "confirme",
      action: "Confirmer RDV",
      renderIn: "runtime-action-bar",
    },
    {
      from: "confirme",
      to: "en_cours",
      action: "Démarrer RDV",
      renderIn: "runtime-action-bar",
    },
    {
      from: "en_cours",
      to: "termine",
      action: "Terminer RDV",
      renderIn: "runtime-action-bar",
    },
    {
      from: "planifie|confirme|en_cours",
      to: "annule",
      action: "Annuler RDV",
      renderIn: "runtime-action-bar",
    },
    {
      from: "planifie|confirme",
      to: "planifie",
      action: "Reporter RDV",
      renderIn: "runtime-action-bar",
    },
  ],
}
```

---

## Interventions — `interventionsauto`

### 1. Rôle du module

- Exécution atelier et pivot vers lignes, facture, encaissements.

### 2. Champ(s) de statut pilotés

- `statut`
- État initial cible : `ouverte`

### 3. États cibles

| État | Label | Signification |
|---|---|---|
| `ouverte` | Ouverte | Intervention créée mais travaux non démarrés. |
| `diagnostic` | Diagnostic | Diagnostic en cours. |
| `en_cours` | En cours | Travaux en cours. |
| `terminee` | Terminée | Travaux terminés. |
| `facturee` | Facturée | Facture générée. |
| `annulee` | Annulée | Intervention annulée. |

### 4. Transitions runtime attendues

| Départ | Bouton/action | Arrivée | Condition d’apparition | Effet métier | Guards obligatoires |
|---|---|---|---|---|---|
| `ouverte` | Passer en diagnostic | `diagnostic` | statut = ouverte | Marque l’intervention comme en phase diagnostic. | clientId, vehiculeId et éventuellement rendezVousId cohérents. |
| `diagnostic|ouverte` | Démarrer intervention | `en_cours` | statut = ouverte ou diagnostic | Démarre les travaux atelier. | Ne pas modifier les champs hérités client/véhicule/RDV. |
| `en_cours|diagnostic` | Terminer intervention | `terminee` | statut = en_cours ou diagnostic | Clôture l’intervention et agrège les lignes validées. | Les lignes brouillon ne comptent pas.<br/>Les lignes retirées ne comptent pas. |
| `terminee` | Générer facture | `facturee` | statut = terminee | Crée la facture liée depuis les lignes validées. | Ne pas générer deux factures pour la même intervention.<br/>Montants calculés depuis lignes validées. |
| `ouverte|diagnostic|en_cours` | Annuler intervention | `annulee` | statut = ouverte, diagnostic ou en_cours | Annule l’intervention avant facturation. | Bloquer si déjà facturée ou si mouvements stock non compensés. |

### 5. Boutons attendus

- Passer en diagnostic
- Démarrer intervention
- Terminer intervention
- Générer facture
- Annuler intervention

### 6. Apparition des boutons

- Les boutons doivent apparaître dans `ERPRuntimeActionBar` ou équivalent runtime.
- Ils doivent être visibles uniquement selon l’état courant et les guards.
- Ils ne doivent pas apparaître dans `ERPEnterpriseForm`.

### 7. Interdits formulaire

- Boutons de transition intervention
- Modification libre des champs parent client/véhicule/RDV
- Facturation manuelle sans action runtime

### 8. Format runtime cible indicatif

```ts
{
  key: "interventionsauto",
  statusField: "statut",
  initialState: "ouverte",
  transitions: [
    {
      from: "ouverte",
      to: "diagnostic",
      action: "Passer en diagnostic",
      renderIn: "runtime-action-bar",
    },
    {
      from: "diagnostic|ouverte",
      to: "en_cours",
      action: "Démarrer intervention",
      renderIn: "runtime-action-bar",
    },
    {
      from: "en_cours|diagnostic",
      to: "terminee",
      action: "Terminer intervention",
      renderIn: "runtime-action-bar",
    },
    {
      from: "terminee",
      to: "facturee",
      action: "Générer facture",
      renderIn: "runtime-action-bar",
    },
    {
      from: "ouverte|diagnostic|en_cours",
      to: "annulee",
      action: "Annuler intervention",
      renderIn: "runtime-action-bar",
    },
  ],
}
```

---

## Lignes intervention — `lignesinterventionauto`

### 1. Rôle du module

- Détail des pièces, services, main-d’œuvre et montants d’une intervention.

### 2. Champ(s) de statut pilotés

- `statut`
- État initial cible : `brouillon`

### 3. États cibles

| État | Label | Signification |
|---|---|---|
| `brouillon` | Brouillon | Ligne préparée, non comptabilisée. |
| `validee` | Validée | Ligne confirmée et comptabilisable. |
| `retiree` | Retirée | État technique/audit : ligne retirée mais conservée. |

### 4. Transitions runtime attendues

| Départ | Bouton/action | Arrivée | Condition d’apparition | Effet métier | Guards obligatoires |
|---|---|---|---|---|---|
| `brouillon` | Valider la ligne | `validee` | statut = brouillon | La ligne entre dans les totaux de l’intervention/facture et peut impacter le stock. | interventionId obligatoire.<br/>Produit cohérent.<br/>Quantité > 0.<br/>Stock suffisant si type article stockable. |
| `brouillon|validee` | Retirer la ligne | `retiree` | ligne non retirée | Retire la ligne des totaux et réintègre le stock si un mouvement de sortie existe. | Conserver removedAt, removedBy, removedReason.<br/>Bloquer si ligne liée à facture verrouillée selon règle métier. |

### 5. Boutons attendus

- Valider la ligne
- Retirer la ligne

### 6. Apparition des boutons

- Les boutons doivent apparaître dans `ERPRuntimeActionBar` ou équivalent runtime.
- Ils doivent être visibles uniquement selon l’état courant et les guards.
- Ils ne doivent pas apparaître dans `ERPEnterpriseForm`.

### 7. Interdits formulaire

- Statut utilisé comme commande libre
- Modification manuelle de montantHT/montantTTC/montantTotal
- Modification du parent interventionId hors contexte

### 8. Format runtime cible indicatif

```ts
{
  key: "lignesinterventionauto",
  statusField: "statut",
  initialState: "brouillon",
  transitions: [
    {
      from: "brouillon",
      to: "validee",
      action: "Valider la ligne",
      renderIn: "runtime-action-bar",
    },
    {
      from: "brouillon|validee",
      to: "retiree",
      action: "Retirer la ligne",
      renderIn: "runtime-action-bar",
    },
  ],
}
```

---

## Factures — `facturesauto`

### 1. Rôle du module

- Preuve commerciale liée à une intervention et support des encaissements.

### 2. Champ(s) de statut pilotés

- `statutFacture / statutPaiement / statutEnvoiFacture`
- État initial cible : `emise`

### 3. États cibles

| État | Label | Signification |
|---|---|---|
| `brouillon` | Brouillon | Facture préparée. |
| `emise` | Émise | Facture officielle. |
| `annulee` | Annulée | Facture annulée. |
| `en_attente` | Paiement en attente | Aucun paiement ou reste total. |
| `partiel` | Paiement partiel | Paiement partiel reçu. |
| `paye` | Payée | Solde payé. |
| `non_envoyee` | Non envoyée | Facture non envoyée. |
| `envoyee` | Envoyée | Facture envoyée. |
| `echec` | Échec envoi | Échec d’envoi. |

### 4. Transitions runtime attendues

| Départ | Bouton/action | Arrivée | Condition d’apparition | Effet métier | Guards obligatoires |
|---|---|---|---|---|---|
| `brouillon` | Valider facture | `emise` | statutFacture = brouillon | La facture devient officielle. | MontantTTC calculé.<br/>Client, véhicule, intervention cohérents. |
| `emise` | Annuler facture | `annulee` | statutFacture = emise | Annule la facture sans supprimer l’historique. | Vérifier encaissements existants.<br/>Ne pas perdre les traces de paiement. |
| `non_envoyee|echec` | Marquer comme envoyée | `envoyee` | statutEnvoiFacture = non_envoyee ou echec | Marque la facture comme envoyée et renseigne le suivi d’envoi. | Destinataire disponible.<br/>Canal d’envoi cohérent. |
| `en_attente|partiel` | Ajouter paiement | `partiel|paye` | resteAPayer > 0 | Crée un encaissement enfant et recalcule montantPaye, resteAPayer et statutPaiement. | Passer par facture → encaissement avec parentModuleKey, parentRecordId, parentForeignKey.<br/>Ne pas dupliquer les boutons paiement. |

### 5. Boutons attendus

- Valider facture
- Annuler facture
- Marquer comme envoyée
- Voir historique encaissements
- Ajouter paiement via historique

### 6. Apparition des boutons

- Les boutons doivent apparaître dans `ERPRuntimeActionBar` ou équivalent runtime.
- Ils doivent être visibles uniquement selon l’état courant et les guards.
- Ils ne doivent pas apparaître dans `ERPEnterpriseForm`.

### 7. Interdits formulaire

- Bouton paiement doublon
- Modification manuelle de montantPaye/resteAPayer/statutPaiement
- Création encaissement sans contexte parent

### 8. Format runtime cible indicatif

```ts
{
  key: "facturesauto",
  statusField: "statutFacture / statutPaiement / statutEnvoiFacture",
  initialState: "emise",
  transitions: [
    {
      from: "brouillon",
      to: "emise",
      action: "Valider facture",
      renderIn: "runtime-action-bar",
    },
    {
      from: "emise",
      to: "annulee",
      action: "Annuler facture",
      renderIn: "runtime-action-bar",
    },
    {
      from: "non_envoyee|echec",
      to: "envoyee",
      action: "Marquer comme envoyée",
      renderIn: "runtime-action-bar",
    },
    {
      from: "en_attente|partiel",
      to: "partiel|paye",
      action: "Ajouter paiement",
      renderIn: "runtime-action-bar",
    },
  ],
}
```

---

## Encaissements — `encaissementsauto`

### 1. Rôle du module

- Paiement réel reçu sur une facture.

### 2. Champ(s) de statut pilotés

- `statut / statutEnvoiRecu`
- État initial cible : `valide`

### 3. États cibles

| État | Label | Signification |
|---|---|---|
| `en_attente` | En attente | Paiement saisi mais non validé. |
| `valide` | Validé | Paiement comptabilisé. |
| `rejete` | Rejeté | Paiement refusé. |
| `annule` | Annulé | Paiement annulé. |
| `non_envoye` | Reçu non envoyé | Reçu non envoyé. |
| `envoye` | Reçu envoyé | Reçu envoyé. |
| `echec` | Échec envoi reçu | Échec d’envoi du reçu. |

### 4. Transitions runtime attendues

| Départ | Bouton/action | Arrivée | Condition d’apparition | Effet métier | Guards obligatoires |
|---|---|---|---|---|---|
| `en_attente` | Valider encaissement | `valide` | statut = en_attente | Comptabilise le paiement et met à jour la facture parent. | factureId obligatoire.<br/>Contexte parent facture obligatoire.<br/>Montant > 0. |
| `en_attente` | Rejeter encaissement | `rejete` | statut = en_attente | Rejette le paiement sans impacter le montant payé. | Motif recommandé. |
| `valide|en_attente` | Annuler encaissement | `annule` | statut = valide ou en_attente | Annule le paiement et recalcule la facture. | Conserver audit.<br/>Ne pas supprimer la preuve. |
| `non_envoye|echec` | Envoyer reçu | `envoye` | statutEnvoiRecu = non_envoye ou echec | Envoie ou marque le reçu comme envoyé. | Reçu généré.<br/>Destinataire disponible. |

### 5. Boutons attendus

- Valider encaissement
- Rejeter encaissement
- Annuler encaissement
- Envoyer reçu

### 6. Apparition des boutons

- Les boutons doivent apparaître dans `ERPRuntimeActionBar` ou équivalent runtime.
- Ils doivent être visibles uniquement selon l’état courant et les guards.
- Ils ne doivent pas apparaître dans `ERPEnterpriseForm`.

### 7. Interdits formulaire

- Modification libre de factureId/clientId/vehiculeId
- Création hors parent facture
- Boutons de transition dans le formulaire

### 8. Format runtime cible indicatif

```ts
{
  key: "encaissementsauto",
  statusField: "statut / statutEnvoiRecu",
  initialState: "valide",
  transitions: [
    {
      from: "en_attente",
      to: "valide",
      action: "Valider encaissement",
      renderIn: "runtime-action-bar",
    },
    {
      from: "en_attente",
      to: "rejete",
      action: "Rejeter encaissement",
      renderIn: "runtime-action-bar",
    },
    {
      from: "valide|en_attente",
      to: "annule",
      action: "Annuler encaissement",
      renderIn: "runtime-action-bar",
    },
    {
      from: "non_envoye|echec",
      to: "envoye",
      action: "Envoyer reçu",
      renderIn: "runtime-action-bar",
    },
  ],
}
```

---

## Échéances paiement — `echeancespaiementauto`

### 1. Rôle du module

- Plan de paiement, échéances et relances.

### 2. Champ(s) de statut pilotés

- `statut`
- État initial cible : `a_venir`

### 3. États cibles

| État | Label | Signification |
|---|---|---|
| `a_venir` | À venir | Échéance non arrivée. |
| `en_retard` | En retard | Échéance dépassée. |
| `partiellement_payee` | Partiellement payée | Échéance partiellement payée. |
| `payee` | Payée | Échéance soldée. |
| `annulee` | Annulée | Échéance annulée. |

### 4. Transitions runtime attendues

| Départ | Bouton/action | Arrivée | Condition d’apparition | Effet métier | Guards obligatoires |
|---|---|---|---|---|---|
| `a_venir` | Marquer en retard | `en_retard` | dateEcheance dépassée et non payée | Signale l’échéance en retard. | Doit pouvoir être automatisé par job runtime. |
| `a_venir|en_retard|partiellement_payee` | Marquer payée | `payee` | montantPaye >= montantPrevu | Solde l’échéance et peut contribuer à la facture. | Lien facture obligatoire. |
| `a_venir|en_retard|partiellement_payee` | Annuler échéance | `annulee` | échéance non payée complètement | Annule l’échéance. | Conserver audit. |
| `en_retard` | Relancer client | `en_retard` | statut = en_retard | Enregistre ou déclenche une relance. | Canal de relance disponible.<br/>Historique de relance conservé. |

### 5. Boutons attendus

- Marquer payée
- Relancer client
- Annuler échéance

### 6. Apparition des boutons

- Les boutons doivent apparaître dans `ERPRuntimeActionBar` ou équivalent runtime.
- Ils doivent être visibles uniquement selon l’état courant et les guards.
- Ils ne doivent pas apparaître dans `ERPEnterpriseForm`.

### 7. Interdits formulaire

- Relance non auditée
- Modification libre du statut financier sans paiement

### 8. Format runtime cible indicatif

```ts
{
  key: "echeancespaiementauto",
  statusField: "statut",
  initialState: "a_venir",
  transitions: [
    {
      from: "a_venir",
      to: "en_retard",
      action: "Marquer en retard",
      renderIn: "runtime-action-bar",
    },
    {
      from: "a_venir|en_retard|partiellement_payee",
      to: "payee",
      action: "Marquer payée",
      renderIn: "runtime-action-bar",
    },
    {
      from: "a_venir|en_retard|partiellement_payee",
      to: "annulee",
      action: "Annuler échéance",
      renderIn: "runtime-action-bar",
    },
    {
      from: "en_retard",
      to: "en_retard",
      action: "Relancer client",
      renderIn: "runtime-action-bar",
    },
  ],
}
```

---

## Produits — `produitsauto`

### 1. Rôle du module

- Catalogue pièces/services/consommables.

### 2. Champ(s) de statut pilotés

- `statut`
- État initial cible : `actif`

### 3. États cibles

| État | Label | Signification |
|---|---|---|
| `actif` | Actif | Produit utilisable. |
| `rupture` | Rupture | Produit indisponible. |
| `inactif` | Inactif | Produit suspendu. |
| `archive` | Archivé | Produit retiré du catalogue actif. |

### 4. Transitions runtime attendues

| Départ | Bouton/action | Arrivée | Condition d’apparition | Effet métier | Guards obligatoires |
|---|---|---|---|---|---|
| `actif` | Marquer rupture | `rupture` | stock <= seuil ou décision utilisateur | Signale le produit en rupture. | Ne doit pas modifier directement le stock. |
| `rupture|inactif` | Réactiver produit | `actif` | produit non actif | Produit à nouveau utilisable. | Prix et type article cohérents. |
| `actif|rupture|inactif` | Archiver produit | `archive` | produit non archivé | Produit retiré des choix courants. | Conserver historique lignes/stock/mouvements. |

### 5. Boutons attendus

- Créer stock associé
- Voir hub produit/stock
- Marquer rupture
- Réactiver produit
- Archiver produit

### 6. Apparition des boutons

- Les boutons doivent apparaître dans `ERPRuntimeActionBar` ou équivalent runtime.
- Ils doivent être visibles uniquement selon l’état courant et les guards.
- Ils ne doivent pas apparaître dans `ERPEnterpriseForm`.

### 7. Interdits formulaire

- Choix libre typeLigne sur lignes au lieu du typeArticle produit
- Modification stock depuis produit

### 8. Format runtime cible indicatif

```ts
{
  key: "produitsauto",
  statusField: "statut",
  initialState: "actif",
  transitions: [
    {
      from: "actif",
      to: "rupture",
      action: "Marquer rupture",
      renderIn: "runtime-action-bar",
    },
    {
      from: "rupture|inactif",
      to: "actif",
      action: "Réactiver produit",
      renderIn: "runtime-action-bar",
    },
    {
      from: "actif|rupture|inactif",
      to: "archive",
      action: "Archiver produit",
      renderIn: "runtime-action-bar",
    },
  ],
}
```

---

## Stocks — `stocksauto`

### 1. Rôle du module

- État courant du stock par produit/emplacement.

### 2. Champ(s) de statut pilotés

- `statut`
- État initial cible : `disponible`

### 3. États cibles

| État | Label | Signification |
|---|---|---|
| `disponible` | Disponible | Stock utilisable. |
| `stock_faible` | Stock faible | Stock sous seuil. |
| `rupture` | Rupture | Stock nul ou indisponible. |
| `archive` | Archivé | Stock retiré des usages courants. |

### 4. Transitions runtime attendues

| Départ | Bouton/action | Arrivée | Condition d’apparition | Effet métier | Guards obligatoires |
|---|---|---|---|---|---|
| `disponible` | Détecter stock faible | `stock_faible` | quantité <= seuil | Signale un stock bas. | Transition idéalement automatique depuis moteur stock. |
| `stock_faible` | Détecter rupture | `rupture` | quantité <= 0 | Signale la rupture. | Transition automatique depuis mouvements stock. |
| `stock_faible|rupture` | Réapprovisionner | `disponible` | réception/mouvement entrée augmente le stock | Stock redevient disponible. | Doit venir d’un mouvement stock entrant. |

### 5. Boutons attendus

- Voir mouvements
- Créer correction stock contrôlée

### 6. Apparition des boutons

- Les boutons doivent apparaître dans `ERPRuntimeActionBar` ou équivalent runtime.
- Ils doivent être visibles uniquement selon l’état courant et les guards.
- Ils ne doivent pas apparaître dans `ERPEnterpriseForm`.

### 7. Interdits formulaire

- Modification quantité sans mouvement
- Changement statut stock manuel sans cohérence quantité

### 8. Format runtime cible indicatif

```ts
{
  key: "stocksauto",
  statusField: "statut",
  initialState: "disponible",
  transitions: [
    {
      from: "disponible",
      to: "stock_faible",
      action: "Détecter stock faible",
      renderIn: "runtime-action-bar",
    },
    {
      from: "stock_faible",
      to: "rupture",
      action: "Détecter rupture",
      renderIn: "runtime-action-bar",
    },
    {
      from: "stock_faible|rupture",
      to: "disponible",
      action: "Réapprovisionner",
      renderIn: "runtime-action-bar",
    },
  ],
}
```

---

## Mouvements stock — `mouvementsstockauto`

### 1. Rôle du module

- Preuve d’entrée, sortie, correction ou réintégration stock.

### 2. Champ(s) de statut pilotés

- `statut`
- État initial cible : `valide`

### 3. États cibles

| État | Label | Signification |
|---|---|---|
| `brouillon` | Brouillon | Mouvement préparé. |
| `valide` | Validé | Mouvement comptabilisé. |
| `annule` | Annulé | Mouvement annulé ou neutralisé. |

### 4. Transitions runtime attendues

| Départ | Bouton/action | Arrivée | Condition d’apparition | Effet métier | Guards obligatoires |
|---|---|---|---|---|---|
| `brouillon` | Valider mouvement | `valide` | statut = brouillon | Applique la variation stock. | Produit et stock obligatoires.<br/>Quantité cohérente.<br/>quantiteAvant/quantiteApres conservées. |
| `valide` | Annuler mouvement | `annule` | statut = valide | Neutralise le mouvement selon règle métier. | Créer un mouvement inverse plutôt que modifier l’historique si nécessaire. |

### 5. Boutons attendus

- Valider mouvement
- Annuler mouvement

### 6. Apparition des boutons

- Les boutons doivent apparaître dans `ERPRuntimeActionBar` ou équivalent runtime.
- Ils doivent être visibles uniquement selon l’état courant et les guards.
- Ils ne doivent pas apparaître dans `ERPEnterpriseForm`.

### 7. Interdits formulaire

- Modification d’un mouvement validé pour corriger l’historique
- Variation stock sans source métier

### 8. Format runtime cible indicatif

```ts
{
  key: "mouvementsstockauto",
  statusField: "statut",
  initialState: "valide",
  transitions: [
    {
      from: "brouillon",
      to: "valide",
      action: "Valider mouvement",
      renderIn: "runtime-action-bar",
    },
    {
      from: "valide",
      to: "annule",
      action: "Annuler mouvement",
      renderIn: "runtime-action-bar",
    },
  ],
}
```

---

## Fournisseurs — `fournisseursauto`

### 1. Rôle du module

- Référentiel fournisseurs pour achats stock.

### 2. Champ(s) de statut pilotés

- `statut`
- État initial cible : `actif`

### 3. États cibles

| État | Label | Signification |
|---|---|---|
| `actif` | Actif | Fournisseur utilisable. |
| `suspendu` | Suspendu | Fournisseur temporairement non utilisable. |
| `archive` | Archivé | Fournisseur conservé pour historique. |

### 4. Transitions runtime attendues

| Départ | Bouton/action | Arrivée | Condition d’apparition | Effet métier | Guards obligatoires |
|---|---|---|---|---|---|
| `actif` | Suspendre fournisseur | `suspendu` | statut = actif | Empêche ou déconseille les nouvelles commandes. | Ne pas supprimer les commandes historiques. |
| `suspendu` | Réactiver fournisseur | `actif` | statut = suspendu | Rend le fournisseur de nouveau utilisable. | Informations fournisseur cohérentes. |
| `actif|suspendu` | Archiver fournisseur | `archive` | non archivé | Retire le fournisseur des usages courants. | Conserver commandes/réceptions historiques. |

### 5. Boutons attendus

- Créer commande fournisseur
- Voir commandes fournisseur
- Suspendre fournisseur
- Réactiver fournisseur
- Archiver fournisseur

### 6. Apparition des boutons

- Les boutons doivent apparaître dans `ERPRuntimeActionBar` ou équivalent runtime.
- Ils doivent être visibles uniquement selon l’état courant et les guards.
- Ils ne doivent pas apparaître dans `ERPEnterpriseForm`.

### 7. Interdits formulaire

- Création commande sans fournisseur parent si contexte requis

### 8. Format runtime cible indicatif

```ts
{
  key: "fournisseursauto",
  statusField: "statut",
  initialState: "actif",
  transitions: [
    {
      from: "actif",
      to: "suspendu",
      action: "Suspendre fournisseur",
      renderIn: "runtime-action-bar",
    },
    {
      from: "suspendu",
      to: "actif",
      action: "Réactiver fournisseur",
      renderIn: "runtime-action-bar",
    },
    {
      from: "actif|suspendu",
      to: "archive",
      action: "Archiver fournisseur",
      renderIn: "runtime-action-bar",
    },
  ],
}
```

---

## Commandes stock — `commandesstockauto`

### 1. Rôle du module

- Intention d’achat fournisseur avant réception réelle.

### 2. Champ(s) de statut pilotés

- `statut`
- État initial cible : `brouillon`

### 3. États cibles

| État | Label | Signification |
|---|---|---|
| `brouillon` | Brouillon | Commande préparée. |
| `envoyee` | Envoyée | Commande transmise au fournisseur. |
| `partiellement_recue` | Partiellement reçue | Une partie des lignes est réceptionnée. |
| `recue` | Reçue | Commande totalement réceptionnée. |
| `annulee` | Annulée | Commande annulée. |

### 4. Transitions runtime attendues

| Départ | Bouton/action | Arrivée | Condition d’apparition | Effet métier | Guards obligatoires |
|---|---|---|---|---|---|
| `brouillon` | Envoyer commande | `envoyee` | statut = brouillon | Fige l’intention d’achat. | Au moins une ligne validée.<br/>Ne modifie pas le stock. |
| `envoyee` | Réception partielle détectée | `partiellement_recue` | réceptions partielles existantes | Statut calculé depuis les réceptions. | Ne doit pas être une action utilisateur libre si calculé. |
| `envoyee|partiellement_recue` | Réception complète détectée | `recue` | toutes les lignes sont réceptionnées | Commande considérée reçue. | Calculé depuis réceptions/mouvements. |
| `brouillon|envoyee` | Annuler commande | `annulee` | commande non reçue | Annule l’intention d’achat. | Bloquer si réception/mouvement stock existe sans compensation. |

### 5. Boutons attendus

- Envoyer commande
- Créer réception
- Annuler commande

### 6. Apparition des boutons

- Les boutons doivent apparaître dans `ERPRuntimeActionBar` ou équivalent runtime.
- Ils doivent être visibles uniquement selon l’état courant et les guards.
- Ils ne doivent pas apparaître dans `ERPEnterpriseForm`.

### 7. Interdits formulaire

- Modification stock depuis commande
- Statut reçu manuel si calculé depuis réceptions

### 8. Format runtime cible indicatif

```ts
{
  key: "commandesstockauto",
  statusField: "statut",
  initialState: "brouillon",
  transitions: [
    {
      from: "brouillon",
      to: "envoyee",
      action: "Envoyer commande",
      renderIn: "runtime-action-bar",
    },
    {
      from: "envoyee",
      to: "partiellement_recue",
      action: "Réception partielle détectée",
      renderIn: "runtime-action-bar",
    },
    {
      from: "envoyee|partiellement_recue",
      to: "recue",
      action: "Réception complète détectée",
      renderIn: "runtime-action-bar",
    },
    {
      from: "brouillon|envoyee",
      to: "annulee",
      action: "Annuler commande",
      renderIn: "runtime-action-bar",
    },
  ],
}
```

---

## Lignes commande stock — `lignescommandestockauto`

### 1. Rôle du module

- Détail des produits et quantités commandés.

### 2. Champ(s) de statut pilotés

- `statut`
- État initial cible : `brouillon`

### 3. États cibles

| État | Label | Signification |
|---|---|---|
| `brouillon` | Brouillon | Ligne préparée. |
| `validee` | Validée | Ligne confirmée et réceptionnable. |

### 4. Transitions runtime attendues

| Départ | Bouton/action | Arrivée | Condition d’apparition | Effet métier | Guards obligatoires |
|---|---|---|---|---|---|
| `brouillon` | Valider ligne commande | `validee` | statut = brouillon | Rend la ligne réceptionnable. | Produit obligatoire.<br/>Quantité > 0.<br/>Prix achat snapshot cohérent. |

### 5. Boutons attendus

- Valider ligne commande
- Annuler ligne commande

### 6. Apparition des boutons

- Les boutons doivent apparaître dans `ERPRuntimeActionBar` ou équivalent runtime.
- Ils doivent être visibles uniquement selon l’état courant et les guards.
- Ils ne doivent pas apparaître dans `ERPEnterpriseForm`.

### 7. Interdits formulaire

- Choix stock destination sur ligne commande
- Réceptionner deux fois la même ligne sans logique partielle

### 8. Format runtime cible indicatif

```ts
{
  key: "lignescommandestockauto",
  statusField: "statut",
  initialState: "brouillon",
  transitions: [
    {
      from: "brouillon",
      to: "validee",
      action: "Valider ligne commande",
      renderIn: "runtime-action-bar",
    },
  ],
}
```

---

## Réceptions stock — `receptionsstockauto`

### 1. Rôle du module

- Entrée réelle de stock depuis commande fournisseur.

### 2. Champ(s) de statut pilotés

- `statut`
- État initial cible : `brouillon`

### 3. États cibles

| État | Label | Signification |
|---|---|---|
| `brouillon` | Brouillon | Réception préparée. |
| `validee` | Validée | Réception comptabilisée. |

### 4. Transitions runtime attendues

| Départ | Bouton/action | Arrivée | Condition d’apparition | Effet métier | Guards obligatoires |
|---|---|---|---|---|---|
| `brouillon` | Valider réception | `validee` | statut = brouillon | Crée un mouvement stock entrant et augmente le stock. | commandeId obligatoire.<br/>ligneCommandeId obligatoire.<br/>produitId obligatoire.<br/>stockId obligatoire.<br/>mouvementStockId absent pour éviter double traitement. |

### 5. Boutons attendus

- Valider réception
- Annuler réception

### 6. Apparition des boutons

- Les boutons doivent apparaître dans `ERPRuntimeActionBar` ou équivalent runtime.
- Ils doivent être visibles uniquement selon l’état courant et les guards.
- Ils ne doivent pas apparaître dans `ERPEnterpriseForm`.

### 7. Interdits formulaire

- Modification stock directe
- Double traitement d’une réception
- Réception sans ligne commande

### 8. Format runtime cible indicatif

```ts
{
  key: "receptionsstockauto",
  statusField: "statut",
  initialState: "brouillon",
  transitions: [
    {
      from: "brouillon",
      to: "validee",
      action: "Valider réception",
      renderIn: "runtime-action-bar",
    },
  ],
}
```

---

## Synthèse des prochaines décisions

1. Valider module par module les états et transitions.
2. Définir si certains statuts doivent être calculés et non actionnables, notamment facture.statutPaiement et commande.statut réception.
3. Créer une `ERPRuntimeActionBar` unique.
4. Retirer définitivement les boutons workflow de `ERPEnterpriseForm`.
5. Convertir les workflows cibles validés en metadata runtime.
6. Ajouter des audits bloquants : aucun bouton workflow dans formulaire, aucun lien enfant sans parent context, aucun stock modifié sans mouvement.