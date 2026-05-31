# AMARKHYS — Recadrage métier consolidé

Document consolidé des décisions validées pour Terragest_V2 / AMARKHYS.

## Principe directeur

- Aucun bouton workflow dans ERPEnterpriseForm.
- Aucune transition statut libre dans le formulaire.
- Aucune création enfant sans contexte parent.
- Aucune modification stock sans mouvement.
- Aucun paiement sans facture parent.
- Les boutons métier sont rendus par ERPRuntimePage / ERPRuntimeActionBar.
- Les transitions sont exécutées via RuntimeActionEngine, RuntimeWorkflowEngine, Business Rules, guards et services runtime.

## Flux métier AMARKHYS validé

1. Clients
2. Véhicules
3. RDV
4. Intervention
5. Lignes d’intervention / Produit / Stock
6. Facture / Paiement
7. Encaissements
8. Stock / Commandes / Réceptions

## Règles transversales validées

### Documents / justificatifs

- R-GEN-DOC-01 — Les pièces justificatives doivent être gérées par un mécanisme générique.
- R-GEN-DOC-02 — Chaque module peut déclarer les documents attendus, facultatifs ou obligatoires.
- R-GEN-DOC-03 — Certaines actions peuvent rendre un document obligatoire.
- R-GEN-DOC-04 — Les documents doivent être liés au module, au record, à l’action et à l’utilisateur.

### Chronologie métier

- R-GEN-DATE-01 — Les dates doivent respecter la chronologie métier.
- R-GEN-DATE-02 — Les contrôles de dates doivent être centralisés dans un moteur runtime.
- R-GEN-DATE-03 — Une action ne peut pas être datée avant l’événement qui la rend possible.
- R-GEN-DATE-04 — Les incohérences de dates doivent bloquer ou alerter selon la sévérité.
- R-GEN-DATE-05 — Les exceptions doivent passer par une action contrôlée et auditée.

### Statut général du parcours atelier

- R-GEN-PROC-01 — Le processus garage possède un statut général calculé nommé `statutParcoursAtelier`.
- R-GEN-PROC-02 — Ce statut ne remplace pas les statuts propres des modules RDV, Intervention, Facture et Encaissement.
- R-GEN-PROC-03 — Il est calculé par le runtime depuis les états réels du parcours.
- R-GEN-PROC-04 — Il n’est pas modifiable librement dans un formulaire.
- R-GEN-PROC-05 — Il sert à la lecture opérationnelle, au cockpit, aux hubs, aux listes et aux filtres.

Valeurs candidates : `demande_rdv`, `rdv_confirme`, `prise_en_charge`, `diagnostic`, `travaux_en_cours`, `travaux_termines`, `facturation`, `paiement_partiel`, `solde`, `annule`, `hors_planning`.

## 1. Clients — clientsauto

Le module clientsauto reste un référentiel relationnel et opérationnel léger.

Il porte l’identité, le contact, le type client, le statut client, les véhicules liés, l’historique RDV / interventions / factures / encaissements et l’accès à la fiche opérationnelle.

Il ne porte pas la logique atelier, le statut RDV, le statut intervention, le statut facture, le statut paiement, le diagnostic, les lignes d’intervention, le stock ou l’avancement travaux.

Statuts : `prospect`, `actif`, `inactif`, `archive`.

Transitions :
- prospect → Activer client → actif
- actif → Désactiver client → inactif
- inactif → Réactiver client → actif
- prospect / actif / inactif → Archiver client → archive

Règles :
- R-CLI-01 — Un client actif peut avoir des véhicules, RDV, interventions, factures et encaissements.
- R-CLI-02 — Un client archivé reste consultable pour historique.
- R-CLI-03 — Le type client pilote l’affichage des véhicules.
- R-CLI-04 — La recherche client doit permettre de retrouver un client par nom, téléphone, email, code client, véhicule ou immatriculation.
- R-CLI-05 — La création d’un véhicule depuis un client doit préremplir et verrouiller clientId.
- R-CLI-06 — Les transitions client passent par le runtime.
- R-CLI-07 — Le client ne porte pas les statuts atelier, facture ou paiement.
- R-CLI-08 — La fiche opérationnelle client affiche le parcours Client → Véhicule → RDV → Intervention → Lignes → Facture → Encaissements.

## 2. Véhicules — vehicules

Le véhicule est le pivot opérationnel entre le client et l’atelier.

Il porte clientId, immatriculation, marque, modèle, année, VIN, kilométrage, carburant/énergie, dateMiseEnCirculation, dateFinGarantie, statut véhicule et historique.

Il ne porte pas les statuts RDV, intervention, facture ou paiement.

Statuts : `actif`, `entretien`, `immobilise`, `archive`.

Règles :
- R-VEH-01 — Un véhicule appartient obligatoirement à un client.
- R-VEH-02 — Dans la fiche client opérationnelle, le véhicule sélectionné filtre les RDV.
- R-VEH-03 — Le RDV sélectionné filtre ensuite les interventions.
- R-VEH-04 — La création d’un RDV depuis un véhicule préremplit et verrouille clientId et vehiculeId.
- R-VEH-05 — L’archivage du véhicule ne supprime pas l’historique.
- R-VEH-05-A — L’archivage du véhicule verrouille les RDV, interventions, lignes, factures et encaissements liés.
- R-VEH-06 — Le véhicule ne porte pas de statut facture, paiement ou intervention.
- R-VEH-07 — Le statut véhicule décrit l’état de suivi et ne déclenche pas automatiquement une intervention.
- R-VEH-08 — Carburants/énergies : Essence, Diesel, GPL, GNV, Bioéthanol, Électrique, Hybride, Hydrogène.
- R-VEH-09 — Le véhicule peut porter dateMiseEnCirculation et dateFinGarantie.
- R-VEH-10 — Un véhicule archivé reste historique mais n’est plus proposé par défaut.

## 3. RDV — rendezvous

Le RDV porte la réservation atelier, l’intention de venue, le créneau planning et la présence prévue.

Il ne porte pas diagnostic, travaux, lignes, stock, facture, paiement ou encaissement.

Statuts : `planifie`, `confirme`, `en_cours`, `termine`, `annule`.

Règles :
- R-RDV-01 — Un RDV appartient à un client et à un véhicule.
- R-RDV-02 — Un RDV confirmé peut créer ou lier une intervention.
- R-RDV-03 — Un RDV déjà lié ne doit jamais créer une deuxième intervention.
- R-RDV-04 — Un RDV conserve typeService et durationMinutes.
- R-RDV-05 — Un créneau occupé ne doit pas être proposé au-delà de la capacité définie.
- R-RDV-06 — La création depuis véhicule préremplit et verrouille clientId et vehiculeId.
- R-RDV-07 — Le statut RDV passe par runtime, pas formulaire.
- R-RDV-08 — Le RDV ne porte pas facture, paiement ou travaux.
- R-RDV-09 — L’annulation conserve cancelledAt, cancelledBy, cancellationReason.
- R-RDV-10 — L’annulation peut cascader vers l’intervention liée par runtime.
- R-RDV-11 — Le report passe par le moteur planning.
- R-RDV-12 — Dans la fiche client : véhicule sélectionné → RDV filtrés → RDV sélectionné → interventions filtrées.
- R-RDV-13 — Un RDV lié à un véhicule archivé devient historique verrouillé.
- R-RDV-14 — Un RDV terminé conserve sa plage comme consommée selon la capacité définie.
- R-RDV-15 — Le RDV peut porter une ressource ou mécanicien prévu, mais le mécanicien réel est porté par l’intervention.

## 4. Intervention — interventionsauto

L’intervention porte le travail atelier : diagnostic, travaux, lignes, produits/services via lignes et totaux techniques.

Elle ne porte pas statut facture, statut paiement, encaissement, stock direct ou mouvement stock direct.

Statuts : `ouverte`, `diagnostic`, `en_cours`, `terminee`, `annulee`.

Le statut `facturee` est supprimé de la cible métier.

Règles :
- R-INT-12 — Le statut facturee n’existe plus dans le workflow intervention.
- R-INT-13 — L’intervention ne porte pas directement le stock ; produits/services passent par les lignes.
- R-INT-14 — Champs obligatoires : Client, Véhicule, Date intervention, Statut, Type d’intervention. Rendez-vous facultatif.
- R-INT-14-A — Une intervention exceptionnelle sans RDV possède une dateIntervention obligatoire hors planning.
- R-INT-15 — Si liée à un RDV, la liste RDV ne contient que des RDV sans intervention déjà liée et cohérents client/véhicule.
- R-INT-16 — Si liée à un RDV, dateIntervention >= date RDV ; si hors planning, dateIntervention reste obligatoire.
- R-INT-17 — La liste véhicules se vide toujours avant remplissage. Règle générique.
- R-INT-18 — Choix client filtre les véhicules, auto-sélection si un seul véhicule actif.
- R-INT-19 — Une intervention sans RDV porte `origineIntervention = hors_planning` ou équivalent.
- R-INT-20 — L’intervention porte un mécanicien / technicien responsable via mecanicienId.

## 5. Lignes d’intervention / Produit / Stock

Les lignes d’intervention portent le détail technique et facturable. Elles ne modifient jamais directement le stock.

Statuts lignes : `brouillon`, `validee`, `retiree`.

Règles :
- R-LIG-01 — Une ligne appartient à une intervention parent.
- R-LIG-02 — Une ligne brouillon ne compte pas dans les totaux.
- R-LIG-03 — Une ligne validée compte dans les totaux.
- R-LIG-04 — Une ligne retirée ne compte plus mais reste auditée.
- R-LIG-05 — Une ligne produit stockable validée peut déclencher une sortie stock contrôlée.
- R-LIG-06 — Le type article vient du produit autant que possible.
- R-LIG-07 — Le produit préremplit/verrouille désignation, type article, prix snapshot, TVA, stockable.
- R-LIG-08 — La ligne porte quantité, prix unitaire, HT, TVA, TTC.
- R-LIG-09 — L’intervention agrège uniquement les lignes validées.
- R-LIG-10 — Brouillon et retirée n’alimentent pas les totaux.
- R-LIG-11 — Produit stockable → mouvement stock obligatoire.
- R-LIG-12 — Pas de modification directe du stock depuis la ligne.
- R-LIG-17 — Retrait d’une ligne validée recalcule totaux et compense stock si besoin.

## 6. Facture / Paiement — facturesauto

La facture porte le document commercial, l’origine de facturation, les montants dus et la synthèse calculée.

Elle ne porte pas le mode de paiement, les détails d’encaissement, le reçu ou l’envoi du reçu.

origineFacture : `atelier`, `boutique`.
contexteClientFacture : `client_garage`, `client_comptoir`, `client_comptoir_anonyme` si nécessaire.

Règles :
- R-FAC-18 — Le mode de paiement est porté par les encaissements, pas par la facture.
- R-FAC-19 — Les statuts financiers sont bloqués et pilotés par runtime.
- R-FAC-20 — La facture porte `origineFacture` : atelier ou boutique.
- R-FAC-21 — Une facture atelier est liée à une intervention.
- R-FAC-22 — Une facture boutique peut être créée hors RDV/intervention.
- R-FAC-23 — Les champs de finances réels sont déplacés vers Encaissements.
- R-FAC-24 — Les champs d’envoi liés au reçu sont déplacés vers Encaissements.
- R-FAC-25 — Une facture boutique peut concerner un client garage ou client comptoir.
- R-FAC-26 — client_garage implique clientId existant.
- R-FAC-27 — client_comptoir peut porter nom/téléphone/email légers.
- R-FAC-28 — Un client comptoir peut être transformé en client garage.
- R-FAC-29 — Une facture boutique ne crée pas automatiquement RDV ou intervention.
- R-FAC-30 — La boutique est un canal d’acquisition client.

## 7. Encaissements — encaissementsauto

L’encaissement porte le paiement réel, le mode de paiement, le reçu et l’envoi du reçu.

Statuts : `en_attente`, `valide`, `rejete`, `annule`.
statutEnvoiRecu : `non_envoye`, `envoye`, `echec`.

Règles :
- R-ENC-01 — Un encaissement est créé depuis une facture parent.
- R-ENC-06 — Un encaissement validé met à jour montantPaye, resteAPayer, statutPaiement.
- R-ENC-10 — Le mode de paiement est porté par l’encaissement.
- R-ENC-11 — Le reçu et l’envoi du reçu sont portés par l’encaissement.
- R-ENC-12 — La somme des encaissements valides ne dépasse pas montantTTC sauf action contrôlée.
- R-ENC-19 — Le paiement en plusieurs fois est géré par les échéances de paiement.
- R-ENC-20 — Une échéance est un paiement attendu ; un encaissement est un paiement reçu.
- R-ENC-24 — Plusieurs fois = plusieurs échéances, pas plusieurs factures.
- R-ENC-25 — Si statut rejete, raisonRejetPaiement est obligatoire.

## 8. Stock / Commandes / Réceptions

Commande = intention d’achat. Réception = entrée réelle. Mouvement stock = preuve. Stock = état résultant.

Règles :
- R-CMD-09 — Une commande partiellement reçue permet relances, rappels et suivis fournisseur.
- R-CMD-10 — Le runtime identifie les lignes non reçues, partiellement reçues ou totalement reçues.
- R-CMD-11 — montantHT, montantTVA, montantTTC de commande sont calculés depuis les lignes et verrouillés.
- R-CMD-12 — Les totaux de commande ne sont pas modifiables librement.
- R-LCMD-06 — Commande stock → Lignes commande suit le même principe que Intervention → Lignes intervention.
- R-LCMD-07 — prixUnitaireHT, montantHT, montantTTC des lignes commande sont verrouillés.
- R-LCMD-08 — prixUnitaireHT vient du produit comme prix achat snapshot sauf action contrôlée.
- R-LCMD-09 — montantHT et montantTTC sont recalculés depuis quantité, prixUnitaireHT et TVA.

Les nuances `partiellement_recue` et `recue` sont conservées mais calculées par le runtime.

## Conclusion

Ce document devient la base consolidée de recadrage métier AMARKHYS avant mise à jour du code runtime.
