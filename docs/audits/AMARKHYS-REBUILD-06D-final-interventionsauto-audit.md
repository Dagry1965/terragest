# AMARKHYS-REBUILD-06D — Audit final interventionsauto

Date: 2026-05-31T22:37:25.477Z

## Synthèse

- OK: 29
- FAIL: 0

## Checks

### Routes

- OK — /interventionsauto existe
- OK — /interventionsauto/nouveau existe
- OK — /interventionsauto/[id] existe
- OK — /interventionsauto/[id]/edit existe

### Statut

- OK — champ statut présent
- OK — statut verrouillé via readonlyIf
- OK — ERPEnterpriseForm applique readonlyIf

### Mécanicien

- OK — mecanicienId présent
- OK — mecanicienId pointe vers employes
- OK — mecanicienId dans form tabs/sections
- OK — relationLabelFields mecanicienId présent
- OK — module employes existe
- OK — module employes exporté
- OK — module employes enregistré dans coreModules
- OK — employes metadata et schema conformes

### Champs modifiables

- OK — dateIntervention non verrouillée
- OK — kilometrage non verrouillé

### Champs verrouillés

- OK — clientId verrouillé
- OK — vehiculeId verrouillé
- OK — rendezVousId verrouillé
- OK — montantHT verrouillé
- OK — montantTTC verrouillé
- OK — coutTotal verrouillé

### Children

- OK — panneau lignes intervention déclaré
- OK — lignes intervention visibles en detail/edit
- OK — ajout ligne conservé
- OK — facture non gérée comme panneau libre en edit

### Actions

- OK — actions intervention présentes

### Générique

- OK — ERPRelatedRecordsPanel gère allowCreate

## Résultat UI validé manuellement

- Mécanicien responsable visible.
- Liste mécanicien non vide.
- Mécanicien sélectionnable.
- Sauvegarde intervention avec mécanicien OK.
- Date intervention modifiable.
- Kilométrage modifiable.
- Montants calculés verrouillés.
- Panneau lignes conservé.
- Facture sortie du flux edit / gouvernée par action runtime.

## Blocs clés

### statut

{
        key: "statut",
        label: "Statut",
        readonlyIf: {
          field: "statut",
          operator: "notEquals",
          value: "__never_editable__",
        },
        helperText: "Statut piloté par les actions. Utilisez les boutons d’action pour changer l’état de l’intervention.",
        type: "select",
        defaultValue: "ouverte",
        options: [
          { label: "Ouverte", value: "ouverte" },
          { label: "Diagnostic", value: "diagnostic" },
          { label: "En cours", value: "en_cours" },
          { label: "Terminée", value: "terminee" },
          { label: "Facturée", value: "facturee" },
          { label: "Annulée", value: "annulee" },
        ],
        list: { visible: true, order: 5 },
        grid: { cols: 6 },
      }

### mecanicienId

{
        key: "mecanicienId",
        label: "Mécanicien responsable",
        type: "relation",
        relation: { module: "employes" },
        searchable: true,
        list: { visible: true, order: 5 },
        grid: { cols: 6 },
        helperText: "Mécanicien responsable réel de l’intervention.",
      }

### readOnlyFields

readOnlyFields: [
          "clientId",
      "vehiculeId",
      "rendezVousId",
      "coutPieces",
      "coutMainOeuvre",
      "coutTotal",
      "montantHT",
      "montantTTC",
]

### lignesinterventionauto

{
        key: "lignes",
        moduleKey: "lignesinterventionauto",
        foreignKey: "interventionId",
        title: "Lignes de l’intervention",
        createLabel: "Ajouter une ligne",
        openLabel: "Ouvrir ligne",
        displayIn: ["detail", "edit"],
        position: "after",
        lazy: true,

        // Q20H5E_B1_CLEAN_LINE_PANEL_LABELS
        // Affichage métier lisible des lignes liées :
        // titre non dupliqué + statut/quantité/montant en informations secondaires.
        labelFields: [
          "designation",
        ],
        subtitleFields: [
          "statut",
          "quantite",
          "typeLigne",
          "montantTotal",
          "stockId",
        ],

        totalField: "montantTotal",
        relations: [
          {
            field: "produitId",
            moduleKey: "produitsauto",
            labelFields: [
              "nom",
              "reference",
              "code",
            ],
            displayAs: "inline",
          },
          {
            field: "stockId",
            moduleKey: "stocksauto",
            labelFields: [
              "nom",
              "emplacement",
              "reference",
            ],
            displayAs: "inline",
          },
        ],
      }

### facturesauto

{
        key: "factures-intervention",
        moduleKey: "facturesauto",
        foreignKey: "interventionId",
        title: "Factures de l'intervention",
        openLabel: "Ouvrir facture",
        displayIn: ["detail"],
        lazy: true,
        position: "after",
        allowCreate: false,
        mode: "readonly",
        prefillFromParent: {
          interventionId: "id",
          clientId: "clientId",
          vehiculeId: "vehiculeId",
        },
        lockFields: ["interventionId", "clientId", "vehiculeId"],
        labelFields: ["numeroFacture", "montantTTC", "resteAPayer", "statutPaiement"],
        subtitleFields: ["clientId", "vehiculeId", "dateFacture"],
        totalField: "montantTTC",
        relations: [
          {
            field: "clientId",
            moduleKey: "clientsauto",
            labelFields: ["prenom", "nom", "telephone"],
          },
          {
            field: "vehiculeId",
            moduleKey: "vehicules",
            labelFields: ["marque", "modele", "immatriculation"],
          },
        ],
      }
