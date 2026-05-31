# AMARKHYS-REBUILD-06C-FIX4-A — Audit UI governance interventionsauto

Date: 2026-05-31T22:01:47.363Z

## Objectif

Identifier ce qui relève du module interventionsauto et ce qui relève des composants génériques.

## Synthèse

- OK: 8
- FAIL: 3

## Checks

### Module metadata

- OK — mecanicienId existe dans schema.fields
- OK — mecanicienId apparaît dans les layouts form/tabs/sections
- FAIL — dateIntervention est actuellement verrouillée
- FAIL — kilometrage est actuellement verrouillé
- OK — facturesauto allowCreate false
- FAIL — facturesauto conserve createLabel Ajouter une facture
- OK — lignesinterventionauto autorise ajout ligne

### Générique related panel

- OK — ERPRelatedRecordsPanel lit allowCreate
- OK — ERPRelatedRecordsPanel masque création si allowCreate false

### Générique form

- OK — ERPEnterpriseForm applique readOnlyFields
- OK — ERPEnterpriseForm applique readonlyIf

## Blocs module

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

## Hits ERPRelatedRecordsPanel

- allowCreate — L790: {(child.allowCreate ?? child.mode !== "readonly") ? (
- href — L792: href={createHref}
- createLabel — L795: {child.createLabel ?? "Ajouter"}
- Ajouter — L795: {child.createLabel ?? "Ajouter"}
- href — L845: href={buildChildEditHref(
- openLabel — L908: ) : child.openLabel ? (
- openLabel — L910: {child.openLabel}

## Lecture attendue

- Si mecanicienId existe mais n'est pas dans form.tabs.sections.fields, corriger le module.
- Si dateIntervention/kilometrage sont dans readOnlyFields, corriger le module.
- Si facturesauto a allowCreate false mais le bouton reste visible, corriger ERPRelatedRecordsPanel générique.
