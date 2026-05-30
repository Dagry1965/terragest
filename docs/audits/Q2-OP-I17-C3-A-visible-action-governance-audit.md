# Q2-OP-I17-C3-A — Audit gouvernance actions visibles

Objectif : identifier si les boutons visibles viennent d’actions historiques, de workflows/transitions, ou d’actions runtimeOnly ajoutées récemment.

## rendezvous

### Boutons visibles transmis par le test utilisateur

#### "Reporter RDV"

- Intention normalisée : `reporter`
- Candidats détectés : 1

- `reporter-rdv` — "Reporter RDV" — actions.ts — src/runtime/modules/generated/rendezvous/rendezvous.actions.ts:7 — RECENT_I16

#### "Confirmer le RDV"

- Intention normalisée : `valider/confirmer`
- Candidats détectés : 1

- `Confirmer` — "Confirmer le RDV" — actions.ts — src/runtime/modules/generated/rendezvous/rendezvous.actions.ts:13

#### "Démarrer le RDV"

- Intention normalisée : `demarrer`
- Candidats détectés : 1

- `Démarrer` — "Démarrer le RDV" — actions.ts — src/runtime/modules/generated/rendezvous/rendezvous.actions.ts:19

#### "Terminer le RDV"

- Intention normalisée : `terminer`
- Candidats détectés : 1

- `Terminer` — "Terminer le RDV" — actions.ts — src/runtime/modules/generated/rendezvous/rendezvous.actions.ts:25

#### "Annuler"

- Intention normalisée : `annuler`
- Candidats détectés : 1

- `Annuler` — "Annuler" — actions.ts — src/runtime/modules/generated/rendezvous/rendezvous.actions.ts:31

### Toutes les actions extraites

- `rendezvous` — "Rendez-vous" — intention=`rendez vous` — module.ts — src/runtime/modules/generated/rendezvous/rendezvous.module.ts:17 — recent=false
- `clientId` — "Client" — intention=`client` — module.ts — src/runtime/modules/generated/rendezvous/rendezvous.module.ts:52 — recent=false
- `vehiculeId` — "Véhicule" — intention=`vehicule` — module.ts — src/runtime/modules/generated/rendezvous/rendezvous.module.ts:62 — recent=false
- `dateRendezVous` — "Date rendez-vous" — intention=`date rendez vous` — module.ts — src/runtime/modules/generated/rendezvous/rendezvous.module.ts:79 — recent=false
- `heureRendezVous` — "Heure" — intention=`heure` — module.ts — src/runtime/modules/generated/rendezvous/rendezvous.module.ts:87 — recent=false
- `durationMinutes` — "Durée prévue" — intention=`duree prevue` — module.ts — src/runtime/modules/generated/rendezvous/rendezvous.module.ts:95 — recent=false
- `startAt` — "Début créneau" — intention=`debut creneau` — module.ts — src/runtime/modules/generated/rendezvous/rendezvous.module.ts:103 — recent=false
- `endAt` — "Fin créneau" — intention=`fin creneau` — module.ts — src/runtime/modules/generated/rendezvous/rendezvous.module.ts:110 — recent=false
- `consumedByInterventionId` — "Intervention liée" — intention=`intervention liee` — module.ts — src/runtime/modules/generated/rendezvous/rendezvous.module.ts:117 — recent=false
- `typeService` — "Type service" — intention=`type service` — module.ts — src/runtime/modules/generated/rendezvous/rendezvous.module.ts:126 — recent=false
- `motif` — "Motif" — intention=`motif` — module.ts — src/runtime/modules/generated/rendezvous/rendezvous.module.ts:141 — recent=false
- `commentaire` — "Commentaire" — intention=`commentaire` — module.ts — src/runtime/modules/generated/rendezvous/rendezvous.module.ts:148 — recent=false
- `statut` — "Statut" — intention=`statut` — module.ts — src/runtime/modules/generated/rendezvous/rendezvous.module.ts:155 — recent=false
- `total` — "En cours" — intention=`en cours` — module.ts — src/runtime/modules/generated/rendezvous/rendezvous.module.ts:243 — recent=false
- `typeService` — "Type de service" — intention=`type de service` — module.ts — src/runtime/modules/generated/rendezvous/rendezvous.module.ts:290 — recent=false
- `vehiculeId` — "Véhicule" — intention=`vehicule` — module.ts — src/runtime/modules/generated/rendezvous/rendezvous.module.ts:303 — recent=false
- `total` — "Rendez-vous affichés" — intention=`rendez vous affiches` — module.ts — src/runtime/modules/generated/rendezvous/rendezvous.module.ts:352 — recent=false
- `confirmes` — "Confirmés" — intention=`confirmes` — module.ts — src/runtime/modules/generated/rendezvous/rendezvous.module.ts:358 — recent=false
- `en_cours` — "En cours" — intention=`en cours` — module.ts — src/runtime/modules/generated/rendezvous/rendezvous.module.ts:366 — recent=false
- `reporter-rdv` — "Reporter RDV" — intention=`reporter` — actions.ts — src/runtime/modules/generated/rendezvous/rendezvous.actions.ts:7 — recent=true
- `Confirmer` — "Confirmer le RDV" — intention=`valider/confirmer` — actions.ts — src/runtime/modules/generated/rendezvous/rendezvous.actions.ts:13 — recent=false
- `Démarrer` — "Démarrer le RDV" — intention=`demarrer` — actions.ts — src/runtime/modules/generated/rendezvous/rendezvous.actions.ts:19 — recent=false
- `Terminer` — "Terminer le RDV" — intention=`terminer` — actions.ts — src/runtime/modules/generated/rendezvous/rendezvous.actions.ts:25 — recent=false
- `Annuler` — "Annuler" — intention=`annuler` — actions.ts — src/runtime/modules/generated/rendezvous/rendezvous.actions.ts:31 — recent=false

### Décision recommandée

- `Reporter RDV` existe bien comme intention reporter si détecté.
- Le libellé exact n’est pas prioritaire ; la présence de l’action l’est.

## interventionsauto

### Boutons visibles transmis par le test utilisateur

#### "Demarrer intervention"

- Intention normalisée : `demarrer`
- Candidats détectés : 2

- `demarrer-intervention` — "Demarrer intervention" — actions.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:7 — RECENT_I16
- `Démarrer` — "Démarrer l" — actions.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:13

⚠️ Doublon sémantique potentiel :
- `demarrer-intervention` — "Demarrer intervention" — actions.ts — recent=true
- `Démarrer` — "Démarrer l" — actions.ts — recent=false

#### "Démarrer l’intervention"

- Intention normalisée : `demarrer`
- Candidats détectés : 2

- `demarrer-intervention` — "Demarrer intervention" — actions.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:7 — RECENT_I16
- `Démarrer` — "Démarrer l" — actions.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:13

⚠️ Doublon sémantique potentiel :
- `demarrer-intervention` — "Demarrer intervention" — actions.ts — recent=true
- `Démarrer` — "Démarrer l" — actions.ts — recent=false

#### "Passer en diagnostic"

- Intention normalisée : `diagnostic`
- Candidats détectés : 8

- `diagnostic` — "Diagnostic" — module.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:93
- `Diagnostiquer` — "Passer en diagnostic" — actions.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:19
- (workflow label) — "Diagnostic" — workflow/module-label — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:76
- (workflow label) — "Diagnostic" — workflow/module-label — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:94
- (workflow label) — "Diagnostic" — workflow/module-label — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:134
- (workflow label) — "Diagnostic" — workflow/module-label — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:287
- (workflow label) — "Diagnostic" — workflow/module-label — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:301
- (workflow label) — "Diagnostic" — workflow/module-label — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:630

⚠️ Doublon sémantique potentiel :
- `diagnostic` — "Diagnostic" — module.ts — recent=false
- `Diagnostiquer` — "Passer en diagnostic" — actions.ts — recent=false

#### "Terminer l’intervention"

- Intention normalisée : `terminer`
- Candidats détectés : 1

- `Terminer` — "Terminer l" — actions.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:25

#### "Générer la facture"

- Intention normalisée : `generer-facture`
- Candidats détectés : 1

- `Facturer` — "Générer la facture" — actions.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:31

#### "Annuler"

- Intention normalisée : `annuler`
- Candidats détectés : 1

- `Annuler` — "Annuler" — actions.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:37

### Toutes les actions extraites

- `interventionsauto` — "Interventions" — intention=`interventions` — module.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:9 — recent=false
- `vehiculeId` — "Véhicule" — intention=`vehicule` — module.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:44 — recent=false
- `rendezVousId` — "Rendez-vous" — intention=`rendez vous` — module.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:54 — recent=false
- `dateIntervention` — "Date intervention" — intention=`date intervention` — module.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:63 — recent=false
- `typeIntervention` — "Type intervention" — intention=`type intervention` — module.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:71 — recent=false
- `kilometrage` — "Kilométrage" — intention=`kilometrage` — module.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:86 — recent=false
- `diagnostic` — "Diagnostic" — intention=`diagnostic` — module.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:93 — recent=false
- `travauxEffectues` — "Travaux effectués" — intention=`travaux effectues` — module.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:100 — recent=false
- `coutPieces` — "Coût pièces" — intention=`cout pieces` — module.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:107 — recent=false
- `coutMainOeuvre` — "Coût main d" — intention=`cout main d` — module.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:114 — recent=false
- `coutTotal` — "Coût total" — intention=`cout total` — module.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:121 — recent=false
- `statut` — "Statut" — intention=`statut` — module.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:128 — recent=false
- `ouvertes` — "Terminées" — intention=`terminees` — module.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:247 — recent=false
- `typeIntervention` — "Type intervention" — intention=`type intervention` — module.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:295 — recent=false
- `clientId` — "Client" — intention=`client` — module.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:309 — recent=false
- `total` — "Interventions affichées" — intention=`interventions affichees` — module.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:362 — recent=false
- `en_cours` — "En cours" — intention=`en cours` — module.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:368 — recent=false
- `cout_total` — "Coût total" — intention=`cout total` — module.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:376 — recent=false
- `demarrer-intervention` — "Demarrer intervention" — intention=`demarrer` — actions.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:7 — recent=true
- `Démarrer` — "Démarrer l" — intention=`demarrer` — actions.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:13 — recent=false
- `Diagnostiquer` — "Passer en diagnostic" — intention=`diagnostic` — actions.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:19 — recent=false
- `Terminer` — "Terminer l" — intention=`terminer` — actions.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:25 — recent=false
- `Facturer` — "Générer la facture" — intention=`generer-facture` — actions.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:31 — recent=false
- `Annuler` — "Annuler" — intention=`annuler` — actions.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:37 — recent=false

### Décision recommandée

- `Demarrer intervention` et `Démarrer l’intervention` semblent être le même métier.
- Garder la version historique si elle est déjà branchée à un workflow réel.
- Ne garder l’action récente que si l’action historique ne s’exécute pas.

## facturesauto

### Boutons visibles transmis par le test utilisateur

#### "Valider la facture"

- Intention normalisée : `valider/confirmer`
- Candidats détectés : 1

- `Valider` — "Valider la facture" — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:7

#### "Marquer payée"

- Intention normalisée : `paiement`
- Candidats détectés : 14

- `statutPaiement` — "Statut paiement" — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:62
- `resteAPayer` — "Reste à payer" — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:142
- `modePaiement` — "Mode paiement" — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:150
- `en_attente` — "Payées" — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:358
- `reste_a_payer` — "Reste à payer" — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:480
- `Marquer payée` — "Marquer payée" — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:13
- `Enregistrer paiement` — "Enregistrer un paiement" — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:19
- (workflow label) — "Statut paiement" — workflow/module-label — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:63
- (workflow label) — "Reste à payer" — workflow/module-label — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:143
- (workflow label) — "Mode paiement" — workflow/module-label — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:151
- (workflow label) — "Payées" — workflow/module-label — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:375
- (workflow label) — "Statut paiement" — workflow/module-label — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:393
- (workflow label) — "Reste à payer" — workflow/module-label — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:481
- (workflow label) — "Paiement partiel" — workflow/module-label — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:636

⚠️ Doublon sémantique potentiel :
- `statutPaiement` — "Statut paiement" — module.ts — recent=false
- `resteAPayer` — "Reste à payer" — module.ts — recent=false
- `modePaiement` — "Mode paiement" — module.ts — recent=false
- `en_attente` — "Payées" — module.ts — recent=false
- `reste_a_payer` — "Reste à payer" — module.ts — recent=false
- `Marquer payée` — "Marquer payée" — actions.ts — recent=false
- `Enregistrer paiement` — "Enregistrer un paiement" — actions.ts — recent=false

#### "Enregistrer un paiement"

- Intention normalisée : `paiement`
- Candidats détectés : 14

- `statutPaiement` — "Statut paiement" — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:62
- `resteAPayer` — "Reste à payer" — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:142
- `modePaiement` — "Mode paiement" — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:150
- `en_attente` — "Payées" — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:358
- `reste_a_payer` — "Reste à payer" — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:480
- `Marquer payée` — "Marquer payée" — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:13
- `Enregistrer paiement` — "Enregistrer un paiement" — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:19
- (workflow label) — "Statut paiement" — workflow/module-label — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:63
- (workflow label) — "Reste à payer" — workflow/module-label — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:143
- (workflow label) — "Mode paiement" — workflow/module-label — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:151
- (workflow label) — "Payées" — workflow/module-label — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:375
- (workflow label) — "Statut paiement" — workflow/module-label — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:393
- (workflow label) — "Reste à payer" — workflow/module-label — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:481
- (workflow label) — "Paiement partiel" — workflow/module-label — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:636

⚠️ Doublon sémantique potentiel :
- `statutPaiement` — "Statut paiement" — module.ts — recent=false
- `resteAPayer` — "Reste à payer" — module.ts — recent=false
- `modePaiement` — "Mode paiement" — module.ts — recent=false
- `en_attente` — "Payées" — module.ts — recent=false
- `reste_a_payer` — "Reste à payer" — module.ts — recent=false
- `Marquer payée` — "Marquer payée" — actions.ts — recent=false
- `Enregistrer paiement` — "Enregistrer un paiement" — actions.ts — recent=false

#### "Marquer comme envoyée"

- Intention normalisée : `envoyer`
- Candidats détectés : 4

- `Marquer envoyee` — "Marquer comme envoyée" — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:25
- `envoyer-facture` — "Envoyer facture" — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:44 — RECENT_I16
- (workflow label) — "Non envoyée" — workflow/module-label — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:168
- (workflow label) — "Envoyée" — workflow/module-label — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:169

⚠️ Doublon sémantique potentiel :
- `Marquer envoyee` — "Marquer comme envoyée" — actions.ts — recent=false
- `envoyer-facture` — "Envoyer facture" — actions.ts — recent=true

#### "Relancer le client"

- Intention normalisée : `relancer`
- Candidats détectés : 1

- `Relancer` — "Relancer le client" — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:31

#### "Annuler"

- Intention normalisée : `annuler`
- Candidats détectés : 2

- `Annuler` — "Annuler" — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:37
- `annuler-facture` — "Annuler facture" — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:51 — RECENT_I16

⚠️ Doublon sémantique potentiel :
- `Annuler` — "Annuler" — actions.ts — recent=false
- `annuler-facture` — "Annuler facture" — actions.ts — recent=true

#### "Envoyer facture"

- Intention normalisée : `envoyer`
- Candidats détectés : 4

- `Marquer envoyee` — "Marquer comme envoyée" — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:25
- `envoyer-facture` — "Envoyer facture" — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:44 — RECENT_I16
- (workflow label) — "Non envoyée" — workflow/module-label — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:168
- (workflow label) — "Envoyée" — workflow/module-label — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:169

⚠️ Doublon sémantique potentiel :
- `Marquer envoyee` — "Marquer comme envoyée" — actions.ts — recent=false
- `envoyer-facture` — "Envoyer facture" — actions.ts — recent=true

#### "Annuler facture"

- Intention normalisée : `annuler`
- Candidats détectés : 2

- `Annuler` — "Annuler" — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:37
- `annuler-facture` — "Annuler facture" — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:51 — RECENT_I16

⚠️ Doublon sémantique potentiel :
- `Annuler` — "Annuler" — actions.ts — recent=false
- `annuler-facture` — "Annuler facture" — actions.ts — recent=true

### Toutes les actions extraites

- `facturesauto` — "Factures" — intention=`factures` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:9 — recent=false
- `dateFacture` — "Date facture" — intention=`date facture` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:40 — recent=false
- `statutFacture` — "Statut facture" — intention=`statut facture` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:49 — recent=false
- `statutPaiement` — "Statut paiement" — intention=`paiement` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:62 — recent=false
- `clientId` — "Client" — intention=`client` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:75 — recent=false
- `vehiculeId` — "Véhicule" — intention=`vehicule` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:86 — recent=false
- `interventionId` — "Intervention" — intention=`intervention` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:97 — recent=false
- `montantHT` — "Montant HT" — intention=`montant ht` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:108 — recent=false
- `tva` — "Taux TVA (%)" — intention=`taux tva` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:115 — recent=false
- `montantTTC` — "Montant TTC" — intention=`montant ttc` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:123 — recent=false
- `montantPaye` — "Montant payé" — intention=`montant paye` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:134 — recent=false
- `resteAPayer` — "Reste à payer" — intention=`paiement` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:142 — recent=false
- `modePaiement` — "Mode paiement" — intention=`paiement` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:150 — recent=false
- `statutEnvoiFacture` — "Statut envoi facture" — intention=`statut envoi facture` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:163 — recent=false
- `dernierEnvoiFactureAt` — "Dernier envoi facture" — intention=`dernier envoi facture` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:176 — recent=false
- `canalDernierEnvoiFacture` — "Canal dernier envoi" — intention=`canal dernier envoi` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:183 — recent=false
- `destinataireDernierEnvoiFacture` — "Destinataire dernier envoi" — intention=`destinataire dernier envoi` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:197 — recent=false
- `nombreEnvoisFacture` — "Nombre d" — intention=`nombre d` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:204 — recent=false
- `observations` — "Observations" — intention=`observations` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:212 — recent=false
- `en_attente` — "Payées" — intention=`paiement` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:358 — recent=false
- `statutFacture` — "Statut facture" — intention=`statut facture` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:403 — recent=false
- `clientId` — "Client" — intention=`client` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:414 — recent=false
- `total` — "Factures affichées" — intention=`factures affichees` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:466 — recent=false
- `montant_ttc` — "Montant TTC" — intention=`montant ttc` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:472 — recent=false
- `reste_a_payer` — "Reste à payer" — intention=`paiement` — module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts:480 — recent=false
- `Valider` — "Valider la facture" — intention=`valider/confirmer` — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:7 — recent=false
- `Marquer payée` — "Marquer payée" — intention=`paiement` — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:13 — recent=false
- `Enregistrer paiement` — "Enregistrer un paiement" — intention=`paiement` — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:19 — recent=false
- `Marquer envoyee` — "Marquer comme envoyée" — intention=`envoyer` — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:25 — recent=false
- `Relancer` — "Relancer le client" — intention=`relancer` — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:31 — recent=false
- `Annuler` — "Annuler" — intention=`annuler` — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:37 — recent=false
- `envoyer-facture` — "Envoyer facture" — intention=`envoyer` — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:44 — recent=true
- `annuler-facture` — "Annuler facture" — intention=`annuler` — actions.ts — src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:51 — recent=true

### Décision recommandée

- Si `Marquer comme envoyée` existe déjà, ne pas afficher en plus `Envoyer facture`.
- Si `Annuler` existe déjà, ne pas afficher en plus `Annuler facture`.
- Garder une seule action visible par intention métier.

## Résumé

- WARN gouvernance : 9

## Conclusion

Les doublons doivent être traités par gouvernance runtime centrale, pas par formulaire.
Décision cible : une seule action visible par intention métier et par module.