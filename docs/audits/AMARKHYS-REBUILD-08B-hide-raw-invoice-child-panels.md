# AMARKHYS-REBUILD-08B — Hide raw invoice child panels

Date: 2026-06-01T01:28:57.792Z

## Décision

- Masquer les panneaux enfants bruts Encaissements et Échéances de paiement sous facturesauto.
- Conserver les blocs métier dédiés : Paiements enregistrés et Paiement en plusieurs fois.
- Désactiver la création directe depuis les panneaux relationnels bruts.

## Checks

- OK — encaissementsauto child existe
- OK — encaissementsauto masqué du runtime detail/edit
- OK — encaissementsauto création directe désactivée
- OK — echeancespaiementauto child existe
- OK — echeancespaiementauto masqué du runtime detail/edit
- OK — echeancespaiementauto création directe désactivée
- OK — module modifié

## Synthèse

- OK: 7
- FAIL: 0

## Encaissements block

{
        key: "encaissements-facture",
        moduleKey: "encaissementsauto",
        foreignKey: "factureId",
        title: "Encaissements",
        description: "Paiements enregistrés pour cette facture.",
        displayIn: [],
        lazy: true,
        position: "after",
        allowCreate: false,
        createLabel: "Ajouter un encaissement",
        openLabel: "Ouvrir encaissement",
        labelFields: ["numeroRecu", "montant", "datePaiement", "statut"],
        subtitleFields: ["clientId", "vehiculeId", "modePaiement", "referenceTransaction"],
        totalField: "montant",
        prefillFromParent: {
          clientId: "clientId",
          vehiculeId: "vehiculeId",
        },
        lockFields: ["factureId", "clientId", "vehiculeId"],
        

## Échéances block

{
        key: "echeances-facture",
        moduleKey: "echeancespaiementauto",
        foreignKey: "factureId",
        title: "Échéances de paiement",
        description: "Plan de paiement et relances liées à cette facture.",
        displayIn: [],
        lazy: true,
        position: "after",
        allowCreate: false,
        createLabel: "Ajouter une échéance",
        openLabel: "Ouvrir échéance",
        labelFields: ["montantPrevu", "montantPaye", "dateEcheance", "statut"],
        subtitleFields: ["clientId", "vehiculeId", "canalRelance"],
        totalField: "montantPrevu",
        prefillFromParent: {
          clientId: "clientId",
          vehiculeId: "vehiculeId",
        },
        lockFields: ["factureId", "clientId", "vehiculeId"],
        
