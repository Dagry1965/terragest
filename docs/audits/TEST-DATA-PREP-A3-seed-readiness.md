# TEST-DATA-PREP-A3 — Audit metadata seed readiness

## Objectif

Auditer les modules générés AMARKHYS avant génération d’un jeu de données démo réaliste, cohérent et rejouable.

Cette passe ne touche pas à Firestore.

## Résumé

- Modules attendus : 15
- Modules trouvés : 15
- Modules manquants : 0

## Modules audités

### clientsauto

**Statut : OK**

- Fichier : `src\runtime\modules\generated\clientsauto\clientsauto.module.ts`
- Metadata key : `clientsauto`
- Label : Clients
- Description : CRM clients automobile

#### Champs détectés

- `adresse`
- `codeClient`
- `dateInscription`
- `email`
- `nom`
- `observations`
- `pays`
- `prenom`
- `statut`
- `telephone`
- `typeClient`
- `ville`

#### Champs relationnels / IDs

- Aucun élément détecté

#### Champs dates

- `dateInscription`

#### Champs montants/prix/totaux

- Aucun élément détecté

#### Champs quantités/stock

- Aucun élément détecté

#### Champs statuts

- `statut`

#### Champs codes/références

- `codeClient`

#### Relations détectées

- Champs relation :
- `vehiculeId`

- Modules liés :
- `vehicules`

- Foreign keys children :
- `clientId`

#### Children / panneaux liés

- Keys :
- `rendezvous-client`
- `vehicules`

- Modules enfants :
- `rendezvous`
- `vehicules`

- Titres :
- `Rendez-vous du client`
- `Véhicules du client`

#### Options / valeurs détectées

- `Actif`
- `Archivé`
- `Entreprise`
- `Flotte`
- `Inactif`
- `Particulier`
- `Prospect`
- `actif`
- `archive`
- `entreprise`
- `flotte`
- `inactif`
- `particulier`
- `prospect`

#### Label fields

- `codeClient`
- `nom`
- `prenom`
- `telephone`

#### Subtitle fields

- `immatriculation`
- `kilometrage`
- `statut`

#### Actions runtime probables

- Aucun élément détecté

### vehicules

**Statut : OK**

- Fichier : `src\runtime\modules\generated\vehicules\vehicules.module.ts`
- Metadata key : `vehicules`
- Label : Véhicules
- Description : Parc automobile AMARKHYS

#### Champs détectés

- `annee`
- `assuranceExpiration`
- `carburant`
- `clientId`
- `codeVehicule`
- `dateFinGarantie`
- `dateMiseEnCirculation`
- `energie`
- `immatriculation`
- `kilometrage`
- `marque`
- `modele`
- `observations`
- `prochainControleTechnique`
- `prochaineVidange`
- `statut`
- `vin`

#### Champs relationnels / IDs

- `clientId`

#### Champs dates

- `dateFinGarantie`
- `dateMiseEnCirculation`

#### Champs montants/prix/totaux

- Aucun élément détecté

#### Champs quantités/stock

- Aucun élément détecté

#### Champs statuts

- `statut`

#### Champs codes/références

- `codeVehicule`

#### Relations détectées

- Champs relation :
- `clientId`

- Modules liés :
- `clientsauto`

- Foreign keys children :
- `vehiculeId`

#### Children / panneaux liés

- Keys :
- `factures-vehicule`
- `interventions`
- `rendezvous`

- Modules enfants :
- `clientsauto`
- `facturesauto`
- `interventionsauto`
- `rendezvous`

- Titres :
- `Factures du véhicule`
- `Interventions du véhicule`
- `Rendez-vous du véhicule`

#### Options / valeurs détectées

- `Actif`
- `Archivé`
- `Bioéthanol`
- `Diesel`
- `Entretien requis`
- `Essence`
- `GNV`
- `GPL`
- `Hybride`
- `Hydrogène`
- `Immobilisé`
- `actif`
- `archive`
- `bioethanol`
- `diesel`
- `electrique`
- `entretien`
- `essence`
- `gnv`
- `gpl`
- `hybride`
- `hydrogene`
- `immobilise`
- `Électrique`

#### Label fields

- `nom`
- `prenom`
- `telephone`

#### Subtitle fields

- `motif`
- `statut`

#### Actions runtime probables

- Aucun élément détecté

### rendezvous

**Statut : OK**

- Fichier : `src\runtime\modules\generated\rendezvous\rendezvous.module.ts`
- Metadata key : `rendezvous`
- Label : Rendez-vous
- Description : Gestion des rendez-vous atelier AMARKHYS

#### Champs détectés

- `clientId`
- `codeRendezVous`
- `commentaire`
- `consumedByInterventionId`
- `dateRendezVous`
- `durationMinutes`
- `endAt`
- `heureRendezVous`
- `motif`
- `startAt`
- `statut`
- `typeService`
- `vehiculeId`

#### Champs relationnels / IDs

- `clientId`
- `consumedByInterventionId`
- `vehiculeId`

#### Champs dates

- `dateRendezVous`

#### Champs montants/prix/totaux

- Aucun élément détecté

#### Champs quantités/stock

- Aucun élément détecté

#### Champs statuts

- `statut`

#### Champs codes/références

- `codeRendezVous`

#### Relations détectées

- Champs relation :
- `clientId`
- `vehiculeId`

- Modules liés :
- `clientsauto`
- `vehicules`

- Foreign keys children :
- `rendezVousId`

#### Children / panneaux liés

- Keys :
- `interventions-rendezvous`

- Modules enfants :
- `clientsauto`
- `interventionsauto`
- `vehicules`

- Titres :
- `Intervention générée`

#### Options / valeurs détectées

- `Annulé`
- `Autre`
- `Confirmé`
- `Contrôle`
- `Diagnostic`
- `En cours`
- `Planifié`
- `Réparation`
- `Terminé`
- `Vidange`
- `annule`
- `autre`
- `confirme`
- `controle`
- `diagnostic`
- `en_cours`
- `planifie`
- `reparation`
- `statut`
- `termine`
- `vidange`

#### Label fields

- `clientId`
- `dateRendezVous`
- `heureRendezVous`
- `statut`
- `typeService`
- `vehiculeId`

#### Subtitle fields

- `clientId`
- `coutTotal`
- `vehiculeId`

#### Actions runtime probables

- Aucun élément détecté

### interventionsauto

**Statut : OK**

- Fichier : `src\runtime\modules\generated\interventionsauto\interventionsauto.module.ts`
- Metadata key : `interventionsauto`
- Label : Interventions
- Description : Interventions atelier AMARKHYS

#### Champs détectés

- `clientId`
- `coutMainOeuvre`
- `coutPieces`
- `coutTotal`
- `dateIntervention`
- `diagnostic`
- `kilometrage`
- `mecanicienId`
- `montantHT`
- `rendezVousId`
- `statut`
- `travauxEffectues`
- `typeIntervention`
- `vehiculeId`

#### Champs relationnels / IDs

- `clientId`
- `mecanicienId`
- `rendezVousId`
- `vehiculeId`

#### Champs dates

- `dateIntervention`

#### Champs montants/prix/totaux

- `coutMainOeuvre`
- `coutPieces`
- `coutTotal`
- `montantHT`

#### Champs quantités/stock

- Aucun élément détecté

#### Champs statuts

- `statut`

#### Champs codes/références

- Aucun élément détecté

#### Relations détectées

- Champs relation :
- `clientId`
- `rendezVousId`
- `vehiculeId`

- Modules liés :
- `clientsauto`
- `rendezvous`
- `vehicules`

- Foreign keys children :
- `interventionId`

#### Children / panneaux liés

- Keys :
- `factures-intervention`
- `lignes`

- Modules enfants :
- `clientsauto`
- `facturesauto`
- `lignesinterventionauto`
- `produitsauto`
- `stocksauto`
- `vehicules`

- Titres :
- `Factures de l'intervention`
- `Lignes de l’intervention`

#### Options / valeurs détectées

- `Annulée`
- `Autre`
- `Contrôle`
- `Diagnostic`
- `En cours`
- `Facturée`
- `Ouverte`
- `Pneumatiques`
- `Réparation`
- `Terminée`
- `Vidange`
- `annulee`
- `autre`
- `controle`
- `diagnostic`
- `en_cours`
- `facturee`
- `ouverte`
- `pneumatiques`
- `reparation`
- `terminee`
- `vidange`

#### Label fields

- `nom`
- `prenom`
- `telephone`

#### Subtitle fields

- `montantTotal`
- `quantite`
- `statut`
- `stockId`
- `typeLigne`

#### Actions runtime probables

- Aucun élément détecté

### lignesinterventionauto

**Statut : OK**

- Fichier : `src\runtime\modules\generated\lignesinterventionauto\lignesinterventionauto.module.ts`
- Metadata key : `lignesinterventionauto`
- Label : Lignes intervention
- Description : Pièces, services et main d’œuvre consommés sur une intervention AMARKHYS

#### Champs détectés

- `designation`
- `interventionId`
- `montantHT`
- `montantTTC`
- `montantTVA`
- `montantTotal`
- `observations`
- `prixUnitaire`
- `prixUnitaireHT`
- `produitCode`
- `produitId`
- `produitNom`
- `quantite`
- `removedAt`
- `removedBy`
- `removedReason`
- `statut`
- `stockId`
- `stockMovementId`
- `stockProcessedAt`
- `stockProcessedQuantity`
- `tauxTVA`
- `typeArticle`
- `typeLigne`

#### Champs relationnels / IDs

- `interventionId`
- `produitId`
- `stockId`
- `stockMovementId`

#### Champs dates

- Aucun élément détecté

#### Champs montants/prix/totaux

- `montantHT`
- `montantTTC`
- `montantTVA`
- `montantTotal`
- `prixUnitaire`
- `prixUnitaireHT`
- `tauxTVA`

#### Champs quantités/stock

- `quantite`
- `stockId`
- `stockMovementId`
- `stockProcessedAt`
- `stockProcessedQuantity`

#### Champs statuts

- `statut`

#### Champs codes/références

- `produitCode`

#### Relations détectées

- Champs relation :
- `interventionId`
- `produitId`
- `stockId`

- Modules liés :
- `interventionsauto`
- `produitsauto`
- `stocksauto`

- Foreign keys children :
- `interventionId`

#### Children / panneaux liés

- Keys :
- Aucun élément détecté

- Modules enfants :
- Aucun élément détecté

- Titres :
- Aucun élément détecté

#### Options / valeurs détectées

- `Brouillon`
- `Main d’œuvre`
- `Pièce`
- `Remise`
- `Service`
- `Validée`
- `brouillon`
- `main_oeuvre`
- `piece`
- `remise`
- `service`
- `validee`

#### Label fields

- `dateIntervention`
- `statut`
- `typeIntervention`

#### Subtitle fields

- Aucun élément détecté

#### Actions runtime probables

- `retirer-ligne`

### facturesauto

**Statut : OK**

- Fichier : `src\runtime\modules\generated\facturesauto\facturesauto.module.ts`
- Metadata key : `facturesauto`
- Label : Factures
- Description : Facturation atelier AMARKHYS

#### Champs détectés

- `canalDernierEnvoiFacture`
- `clientId`
- `dateFacture`
- `dernierEnvoiFactureAt`
- `destinataireDernierEnvoiFacture`
- `interventionId`
- `modePaiement`
- `montantHT`
- `montantPaye`
- `montantTTC`
- `nombreEnvoisFacture`
- `numeroFacture`
- `observations`
- `resteAPayer`
- `statutEnvoiFacture`
- `statutFacture`
- `statutPaiement`
- `tva`
- `vehiculeId`

#### Champs relationnels / IDs

- `clientId`
- `interventionId`
- `vehiculeId`

#### Champs dates

- `dateFacture`

#### Champs montants/prix/totaux

- `montantHT`
- `montantPaye`
- `montantTTC`
- `resteAPayer`
- `tva`

#### Champs quantités/stock

- Aucun élément détecté

#### Champs statuts

- `statutEnvoiFacture`
- `statutFacture`
- `statutPaiement`

#### Champs codes/références

- `numeroFacture`

#### Relations détectées

- Champs relation :
- `clientId`
- `vehiculeId`

- Modules liés :
- `clientsauto`
- `vehicules`

- Foreign keys children :
- `factureId`

#### Children / panneaux liés

- Keys :
- `echeances-facture`
- `encaissements-facture`

- Modules enfants :
- `clientsauto`
- `echeancespaiementauto`
- `encaissementsauto`
- `vehicules`

- Titres :
- `Encaissements`
- `Échéances de paiement`

#### Options / valeurs détectées

- `Annulée`
- `Brouillon`
- `Carte`
- `Email`
- `En attente`
- `Envoyée`
- `Espèces`
- `Lien`
- `Manuel`
- `Mobile Money`
- `Non envoyée`
- `Partiel`
- `Payé`
- `SMS`
- `Virement`
- `WhatsApp`
- `annulee`
- `brouillon`
- `carte`
- `echec`
- `email`
- `emise`
- `en_attente`
- `envoyee`
- `especes`
- `lien`
- `manuel`
- `mobile_money`
- `non_envoyee`
- `partiel`
- `paye`
- `sms`
- `virement`
- `whatsapp`
- `Échec envoi`
- `Émise`

#### Label fields

- `clientId`
- `montantTTC`
- `numeroFacture`
- `resteAPayer`
- `statutPaiement`

#### Subtitle fields

- `clientId`
- `modePaiement`
- `referenceTransaction`
- `vehiculeId`

#### Actions runtime probables

- `resteAPayer`
- `reste_a_payer`

### encaissementsauto

**Statut : OK**

- Fichier : `src\runtime\modules\generated\encaissementsauto\encaissementsauto.module.ts`
- Metadata key : `encaissementsauto`
- Label : Encaissements
- Description : Suivi des paiements clients, paiements partiels et encaissements AMARKHYS.

#### Champs détectés

- `canalDernierEnvoiRecu`
- `clientId`
- `datePaiement`
- `dernierEnvoiRecuAt`
- `destinataireDernierEnvoiRecu`
- `factureId`
- `modePaiement`
- `montant`
- `nombreEnvoisRecu`
- `notes`
- `numeroRecu`
- `referenceTransaction`
- `statut`
- `statutEnvoiRecu`
- `vehiculeId`

#### Champs relationnels / IDs

- `clientId`
- `factureId`
- `vehiculeId`

#### Champs dates

- `datePaiement`

#### Champs montants/prix/totaux

- `montant`

#### Champs quantités/stock

- Aucun élément détecté

#### Champs statuts

- `statut`
- `statutEnvoiRecu`

#### Champs codes/références

- `numeroRecu`
- `referenceTransaction`

#### Relations détectées

- Champs relation :
- Aucun élément détecté

- Modules liés :
- Aucun élément détecté

- Foreign keys children :
- `factureId`

#### Children / panneaux liés

- Keys :
- Aucun élément détecté

- Modules enfants :
- Aucun élément détecté

- Titres :
- Aucun élément détecté

#### Options / valeurs détectées

- `Annulé`
- `Autre`
- `Carte`
- `Chèque`
- `Email`
- `En attente`
- `Envoyé`
- `Espèces`
- `Manuel`
- `Mobile Money`
- `Non envoyé`
- `Rejeté`
- `SMS`
- `Validé`
- `Virement`
- `WhatsApp`
- `annule`
- `autre`
- `carte`
- `cheque`
- `echec`
- `email`
- `en_attente`
- `envoye`
- `especes`
- `manuel`
- `mobile_money`
- `non_envoye`
- `rejete`
- `sms`
- `valide`
- `virement`
- `whatsapp`
- `Échec envoi`

#### Label fields

- `datePaiement`
- `factureId`
- `montant`
- `numeroRecu`
- `statut`

#### Subtitle fields

- Aucun élément détecté

#### Actions runtime probables

- Aucun élément détecté

### produitsauto

**Statut : OK**

- Fichier : `src\runtime\modules\generated\produitsauto\produitsauto.module.ts`
- Metadata key : `produitsauto`
- Label : Produits
- Description : Produits, pièces et consommables AMARKHYS

#### Champs détectés

- `categorie`
- `compatibilites`
- `contenance`
- `couleur`
- `description`
- `imageAlt`
- `imageLargeUrl`
- `imageMediumUrl`
- `imageOriginalUrl`
- `imageStoragePath`
- `imageThumbnailUrl`
- `marque`
- `modele`
- `nom`
- `parentProductId`
- `poids`
- `prixAchat`
- `prixPromo`
- `prixVente`
- `reference`
- `seoDescription`
- `seoTitle`
- `seuilMinimum`
- `slugBoutique`
- `sousCategorie`
- `statut`
- `stockable`
- `taille`
- `tauxTVA`
- `typeArticle`
- `typeProduit`
- `typeRecord`
- `unite`
- `uniteContenance`
- `unitePoids`
- `visibleBoutique`

#### Champs relationnels / IDs

- `parentProductId`

#### Champs dates

- Aucun élément détecté

#### Champs montants/prix/totaux

- `prixAchat`
- `prixPromo`
- `prixVente`
- `tauxTVA`

#### Champs quantités/stock

- `seuilMinimum`
- `stockable`

#### Champs statuts

- `statut`

#### Champs codes/références

- `reference`

#### Relations détectées

- Champs relation :
- Aucun élément détecté

- Modules liés :
- Aucun élément détecté

- Foreign keys children :
- Aucun élément détecté

#### Children / panneaux liés

- Keys :
- Aucun élément détecté

- Modules enfants :
- Aucun élément détecté

- Titres :
- Aucun élément détecté

#### Options / valeurs détectées

- `Actif`
- `Archivé`
- `Consommable`
- `Famille`
- `Filtre`
- `Huile moteur`
- `Inactif`
- `L`
- `Liquide`
- `Main d’œuvre`
- `Non stockable`
- `Pièce`
- `Produit simple`
- `Remise`
- `Rupture`
- `Service`
- `Stockable`
- `Variante`
- `actif`
- `archive`
- `consommable`
- `family`
- `filtre`
- `g`
- `huile_moteur`
- `inactif`
- `kg`
- `liquide`
- `main_oeuvre`
- `ml`
- `non_stockable`
- `piece`
- `remise`
- `rupture`
- `service`
- `simple`
- `stockable`
- `variant`

#### Label fields

- Aucun élément détecté

#### Subtitle fields

- Aucun élément détecté

#### Actions runtime probables

- Aucun élément détecté

### stocksauto

**Statut : OK**

- Fichier : `src\runtime\modules\generated\stocksauto\stocksauto.module.ts`
- Metadata key : `stocksauto`
- Label : Stocks
- Description : Stocks pièces, produits et consommables AMARKHYS

#### Champs détectés

- `emplacement`
- `observations`
- `produitId`
- `quantite`
- `seuilAlerte`
- `statut`
- `typeStock`

#### Champs relationnels / IDs

- `produitId`

#### Champs dates

- Aucun élément détecté

#### Champs montants/prix/totaux

- Aucun élément détecté

#### Champs quantités/stock

- `quantite`
- `seuilAlerte`
- `typeStock`

#### Champs statuts

- `statut`

#### Champs codes/références

- Aucun élément détecté

#### Relations détectées

- Champs relation :
- Aucun élément détecté

- Modules liés :
- Aucun élément détecté

- Foreign keys children :
- Aucun élément détecté

#### Children / panneaux liés

- Keys :
- Aucun élément détecté

- Modules enfants :
- Aucun élément détecté

- Titres :
- Aucun élément détecté

#### Options / valeurs détectées

- `Archivé`
- `Atelier`
- `Disponible`
- `Dépôt`
- `Magasin`
- `Rupture`
- `Réserve`
- `Stock faible`
- `archive`
- `atelier`
- `depot`
- `disponible`
- `magasin`
- `reserve`
- `rupture`
- `stock_faible`

#### Label fields

- `emplacement`
- `produitId`
- `quantite`
- `statut`
- `typeStock`

#### Subtitle fields

- Aucun élément détecté

#### Actions runtime probables

- Aucun élément détecté

### fournisseursauto

**Statut : OK**

- Fichier : `src\runtime\modules\generated\fournisseursauto\fournisseursauto.module.ts`
- Metadata key : `fournisseursauto`
- Label : Fournisseurs
- Description : Fournisseurs pieces, consommables et services AMARKHYS

#### Champs détectés

- `adresse`
- `codeFournisseur`
- `email`
- `nom`
- `notes`
- `statut`
- `telephone`
- `typeFournisseur`
- `ville`

#### Champs relationnels / IDs

- Aucun élément détecté

#### Champs dates

- Aucun élément détecté

#### Champs montants/prix/totaux

- Aucun élément détecté

#### Champs quantités/stock

- Aucun élément détecté

#### Champs statuts

- `statut`

#### Champs codes/références

- `codeFournisseur`

#### Relations détectées

- Champs relation :
- Aucun élément détecté

- Modules liés :
- Aucun élément détecté

- Foreign keys children :
- Aucun élément détecté

#### Children / panneaux liés

- Keys :
- Aucun élément détecté

- Modules enfants :
- Aucun élément détecté

- Titres :
- Aucun élément détecté

#### Options / valeurs détectées

- `Actif`
- `Archive`
- `Consommables`
- `Mixte`
- `Pieces`
- `Services`
- `Suspendu`
- `actif`
- `archive`
- `consommables`
- `mixte`
- `pieces`
- `services`
- `suspendu`

#### Label fields

- `codeFournisseur`
- `nom`
- `telephone`

#### Subtitle fields

- Aucun élément détecté

#### Actions runtime probables

- Aucun élément détecté

### commandesstockauto

**Statut : OK**

- Fichier : `src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts`
- Metadata key : `commandesstockauto`
- Label : Commandes stock
- Description : Commandes fournisseurs pour pieces et consommables AMARKHYS

#### Champs détectés

- `dateCommande`
- `dateLivraisonPrevue`
- `fournisseurId`
- `montantHT`
- `montantTTC`
- `notes`
- `numeroCommande`
- `statut`

#### Champs relationnels / IDs

- `fournisseurId`

#### Champs dates

- `dateCommande`
- `dateLivraisonPrevue`

#### Champs montants/prix/totaux

- `montantHT`
- `montantTTC`

#### Champs quantités/stock

- Aucun élément détecté

#### Champs statuts

- `statut`

#### Champs codes/références

- `numeroCommande`

#### Relations détectées

- Champs relation :
- `produitId`

- Modules liés :
- `produitsauto`

- Foreign keys children :
- `commandeId`

#### Children / panneaux liés

- Keys :
- `lignes-commandestock`
- `receptions-stock`

- Modules enfants :
- `lignescommandestockauto`
- `mouvementsstockauto`
- `produitsauto`
- `receptionsstockauto`
- `stocksauto`

- Titres :
- `Lignes de commande`
- `Réceptions`

#### Options / valeurs détectées

- `Annulee`
- `Brouillon`
- `Envoyee`
- `Partiellement recue`
- `Recue`
- `annulee`
- `brouillon`
- `envoyee`
- `partiellement_recue`
- `recue`

#### Label fields

- `fournisseurId`
- `numeroCommande`
- `statut`

#### Subtitle fields

- `designation`
- `montantHT`
- `montantTTC`

#### Actions runtime probables

- `annuler-commande`

### lignescommandestockauto

**Statut : OK**

- Fichier : `src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts`
- Metadata key : `lignescommandestockauto`
- Label : Lignes commande stock
- Description : Details produits des commandes fournisseurs AMARKHYS

#### Champs détectés

- `commandeId`
- `designation`
- `montantHT`
- `montantTTC`
- `prixUnitaireHT`
- `produitId`
- `quantiteCommandee`
- `quantiteRecue`
- `statut`
- `stockId`

#### Champs relationnels / IDs

- `commandeId`
- `produitId`
- `stockId`

#### Champs dates

- Aucun élément détecté

#### Champs montants/prix/totaux

- `montantHT`
- `montantTTC`
- `prixUnitaireHT`

#### Champs quantités/stock

- `quantiteCommandee`
- `quantiteRecue`
- `stockId`

#### Champs statuts

- `statut`

#### Champs codes/références

- Aucun élément détecté

#### Relations détectées

- Champs relation :
- `mouvementStockId`
- `produitId`
- `stockId`

- Modules liés :
- `mouvementsstockauto`
- `produitsauto`
- `stocksauto`

- Foreign keys children :
- `commandeId`
- `ligneCommandeId`

#### Children / panneaux liés

- Keys :
- `receptions-ligne-commande`

- Modules enfants :
- `mouvementsstockauto`
- `produitsauto`
- `receptionsstockauto`
- `stocksauto`

- Titres :
- `Réceptions de la ligne`

#### Options / valeurs détectées

- `Brouillon`
- `Validee`
- `brouillon`
- `validee`

#### Label fields

- `produitId`
- `quantiteCommandee`
- `statut`

#### Subtitle fields

- `mouvementStockId`
- `stockId`

#### Actions runtime probables

- Aucun élément détecté

### receptionsstockauto

**Statut : OK**

- Fichier : `src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts`
- Metadata key : `receptionsstockauto`
- Label : Receptions stock
- Description : Receptions fournisseurs et entrees stock AMARKHYS

#### Champs détectés

- `commandeId`
- `dateReception`
- `ligneCommandeId`
- `mouvementStockId`
- `notes`
- `produitId`
- `quantiteRecue`
- `statut`
- `stockId`
- `stockProcessedAt`
- `stockProcessedQuantity`

#### Champs relationnels / IDs

- `commandeId`
- `ligneCommandeId`
- `mouvementStockId`
- `produitId`
- `stockId`

#### Champs dates

- `dateReception`

#### Champs montants/prix/totaux

- Aucun élément détecté

#### Champs quantités/stock

- `mouvementStockId`
- `quantiteRecue`
- `stockId`
- `stockProcessedAt`
- `stockProcessedQuantity`

#### Champs statuts

- `statut`

#### Champs codes/références

- Aucun élément détecté

#### Relations détectées

- Champs relation :
- `produitId`
- `stockId`

- Modules liés :
- `produitsauto`
- `stocksauto`

- Foreign keys children :
- `commandeId`
- `sourceId`

#### Children / panneaux liés

- Keys :
- `mouvements-stock-reception`

- Modules enfants :
- `mouvementsstockauto`
- `produitsauto`
- `stocksauto`

- Titres :
- `Mouvements stock générés`

#### Options / valeurs détectées

- `Brouillon`
- `Validee`
- `brouillon`
- `validee`

#### Label fields

- `dateReception`
- `ligneCommandeId`
- `produitId`
- `quantiteRecue`
- `statut`
- `stockId`

#### Subtitle fields

- `dateMouvement`
- `sourceModule`

#### Actions runtime probables

- `valider-reception`

### mouvementsstockauto

**Statut : OK**

- Fichier : `src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts`
- Metadata key : `mouvementsstockauto`
- Label : Mouvements stock
- Description : Entrées, sorties et corrections de stock AMARKHYS

#### Champs détectés

- `dateMouvement`
- `interventionId`
- `ligneInterventionId`
- `motif`
- `observations`
- `produitId`
- `quantite`
- `quantiteApres`
- `quantiteAvant`
- `sourceId`
- `sourceModule`
- `statut`
- `stockId`
- `typeMouvement`

#### Champs relationnels / IDs

- `interventionId`
- `ligneInterventionId`
- `produitId`
- `sourceId`
- `stockId`

#### Champs dates

- `dateMouvement`

#### Champs montants/prix/totaux

- Aucun élément détecté

#### Champs quantités/stock

- `quantite`
- `quantiteApres`
- `quantiteAvant`
- `stockId`

#### Champs statuts

- `statut`

#### Champs codes/références

- Aucun élément détecté

#### Relations détectées

- Champs relation :
- Aucun élément détecté

- Modules liés :
- Aucun élément détecté

- Foreign keys children :
- Aucun élément détecté

#### Children / panneaux liés

- Keys :
- Aucun élément détecté

- Modules enfants :
- Aucun élément détecté

- Titres :
- Aucun élément détecté

#### Options / valeurs détectées

- `Annulation`
- `Annulé`
- `Brouillon`
- `Correction`
- `Entrée`
- `Sortie`
- `Validé`
- `annulation`
- `annule`
- `brouillon`
- `correction`
- `entree`
- `sortie`
- `valide`

#### Label fields

- `dateMouvement`
- `produitId`
- `quantite`
- `stockId`
- `typeMouvement`

#### Subtitle fields

- Aucun élément détecté

#### Actions runtime probables

- Aucun élément détecté

### rappelsauto

**Statut : OK**

- Fichier : `src\runtime\modules\generated\rappelsauto\rappelsauto.module.ts`
- Metadata key : `rappelsauto`
- Label : Rappels
- Description : Rappels clients et véhicules AMARKHYS

#### Champs détectés

- `canal`
- `clientId`
- `dateRappel`
- `message`
- `statut`
- `typeRappel`
- `vehiculeId`

#### Champs relationnels / IDs

- `clientId`
- `vehiculeId`

#### Champs dates

- `dateRappel`

#### Champs montants/prix/totaux

- Aucun élément détecté

#### Champs quantités/stock

- Aucun élément détecté

#### Champs statuts

- `statut`

#### Champs codes/références

- Aucun élément détecté

#### Relations détectées

- Champs relation :
- Aucun élément détecté

- Modules liés :
- Aucun élément détecté

- Foreign keys children :
- Aucun élément détecté

#### Children / panneaux liés

- Keys :
- Aucun élément détecté

- Modules enfants :
- Aucun élément détecté

- Titres :
- Aucun élément détecté

#### Options / valeurs détectées

- `Annulé`
- `Assurance`
- `Autre`
- `Contrôle technique`
- `Email`
- `Envoyé`
- `Facture impayée`
- `Marketing`
- `Notification`
- `Planifié`
- `Rendez-vous`
- `SMS`
- `Téléphone`
- `Vidange`
- `WhatsApp`
- `annule`
- `assurance`
- `autre`
- `controle_technique`
- `echoue`
- `email`
- `envoye`
- `facture_impayee`
- `marketing`
- `notification`
- `planifie`
- `rendezvous`
- `sms`
- `telephone`
- `vidange`
- `whatsapp`
- `Échoué`

#### Label fields

- Aucun élément détecté

#### Subtitle fields

- Aucun élément détecté

#### Actions runtime probables

- `dateRappel`
- `rappel`
- `rappelsauto`
- `typeRappel`

## Recommandations pour A3-B

- Utiliser des IDs stables préfixés par `demo-`.
- Générer les relations dans l’ordre : stocks → fournisseurs → produits → clients → véhicules → commandes → lignes → réceptions → mouvements → RDV → interventions → lignes intervention → factures → encaissements → rappels.
- Ne créer aucun champ absent des metadata détectées.
- Respecter les champs relationnels détectés (`clientId`, `vehiculeId`, `produitId`, `stockId`, etc.).
- Séparer les scénarios anciens de 3 mois et plus des scénarios récents.
- Générer au minimum des cas : facture payée, facture partielle, facture en retard, rappel, intervention en cours, intervention terminée, RDV planifié, RDV confirmé, produit commandé, produit livré, produit utilisé atelier.
- Prévoir un audit post-seed pour vérifier les liens, les totaux et les états.

## Conclusion

Audit metadata terminé. Tous les modules attendus sont présents. La prochaine étape est A3-B : plan détaillé du seed réaliste.
