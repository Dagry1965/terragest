# AMARKHYS-REBUILD-07A — Audit lignesinterventionauto

Date: 2026-05-31T22:43:38.841Z

## Objectif

Auditer les lignes d'intervention : statuts, relations, calculs, stock, retrait, verrouillages et absence de facture/paiement direct.

## Synthèse

- OK: 28
- FAIL: 0

## Checks

### Fichiers

- OK — lignesinterventionauto.module.ts existe
- OK — lignesinterventionauto.actions.ts existe

### Statuts

- OK — champ statut présent
- OK — statuts utilisateur limités à brouillon / validée
- OK — guidance brouillon / validée possible

### Relations

- OK — interventionId présent
- OK — interventionId pointe vers interventionsauto
- OK — produitId présent
- OK — produitId pointe vers produitsauto
- OK — stockId présent
- OK — stockId pointe vers stocksauto
- OK — stockId filtré/dépendant du produit

### Calculs

- OK — quantite présent
- OK — prixUnitaireHT présent
- OK — montantHT présent
- OK — montantTTC présent
- OK — montants verrouillés ou calculés

### Stock

- OK — RuntimeStockMovementService existe
- OK — logique stock liée aux lignes intervention
- OK — stock traité une seule fois / idempotence possible

### Retrait ligne

- OK — RuntimeLineRemovalService existe
- OK — action retirer ligne présente
- OK — action retirer ligne runtimeOnly ou contrôlée
- OK — champs techniques removedAt/removedBy/removedReason présents

### Verrouillage

- OK — interventionId verrouillé depuis parent
- OK — pas de factureId / paiementId / encaissementId directs visibles

### Parent intervention

- OK — interventionsauto déclare lignesinterventionauto comme child

### Form runtime

- OK — ERPEnterpriseForm supporte readOnlyFields

## Blocs clés

### statut

{
        key: "statut",
        label: "Statut",
        type: "select",
        defaultValue: "brouillon",
        // Q20H3_SIMPLIFIED_LINE_STATUSES
        // Côté utilisateur, une ligne est seulement préparée ou confirmée.
        // Facturation/retrait sont gérés par relations/actions runtime, pas par statut manuel.
        options: [
          { label: "Brouillon", value: "brouillon" },
          { label: "Validée", value: "validee" },
        ],
        list: { order: 8 },
        grid: { cols: 4 },
      }

### interventionId

{
        key: "interventionId",
        label: "Intervention",
        type: "relation",
        relation: { module: "interventionsauto" },
        required: true,
        searchable: true,
        list: { order: 1 },
        grid: { cols: 6 },
      }

### produitId

{
        key: "produitId",
        label: "Produit / pièce",
        type: "relation",
        relation: { module: "produitsauto" },
        autoFill: {
          map: {
            produitCode: ["code", "reference"],
            produitNom: ["nom", "designation"],
            designation: ["nom", "designation"],
            typeArticle: ["typeArticle"],
            typeLigne: ["typeArticle"],
            prixUnitaireHT: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],
            prixUnitaire: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],
            tauxTVA: ["tauxTVA"],
          },
          recalculate: true,
        },
        searchable: true,
        list: { order: 2 },
        grid: { cols: 6 },
      }

### stockId

{
        key: "stockId",
        label: "Stock source",
        type: "relation",
        relation: { module: "stocksauto" },
        dependsOn: "produitId",
        searchable: true,
        grid: { cols: 6 },
        helperText: "Stock source filtré selon le produit sélectionné.",
      }

### readOnlyFields

readOnlyFields: [
      "produitCode",
      "produitNom",
      "typeArticle",
      "prixUnitaireHT",
      "tauxTVA",
      "montantHT",
      "montantTVA",
      "montantTTC",
      "montantTotal",
      "stockMovementId",
      "stockProcessedAt",
      "stockProcessedQuantity",
          "removedAt",
      "removedBy",
      "removedReason",
]

## Hits module/actions

- interventionId — L28: key: "interventionId",
- produitId — L38: key: "produitId",
- prixUnitaireHT — L49: prixUnitaireHT: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],
- prixUnitaireHT — L50: prixUnitaire: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],
- stockId — L60: key: "stockId",
- produitId — L64: dependsOn: "produitId",
- quantite — L121: key: "quantite",
- prixUnitaireHT — L139: key: "prixUnitaireHT",
- montantHT — L153: key: "montantHT",
- montantTTC — L165: key: "montantTTC",
- quantite — L175: formula: "quantite * prixUnitaire",
- quantite — L176: dependsOn: ["quantite", "prixUnitaire"],
- statut — L182: key: "statut",
- brouillon — L185: defaultValue: "brouillon",
- statut — L188: // Facturation/retrait sont gérés par relations/actions runtime, pas par statut manuel.
- brouillon — L190: { label: "Brouillon", value: "brouillon" },
- validee — L191: { label: "Validée", value: "validee" },
- stockMovementId — L197: key: "stockMovementId",
- removedAt — L205: key: "removedAt",
- removedBy — L212: key: "removedBy",
- removedReason — L219: key: "removedReason",
- interventionId — L255: "interventionId",
- produitId — L258: "produitId",
- stockId — L259: "stockId",
- quantite — L263: "quantite",
- prixUnitaireHT — L265: "prixUnitaireHT",
- montantHT — L267: "montantHT",
- montantTTC — L269: "montantTTC",
- statut — L271: "statut",
- interventionId — L279: "interventionId",
- statut — L282: "statut",
- produitId — L289: "produitId",
- stockId — L290: "stockId",
- quantite — L300: "quantite",
- prixUnitaireHT — L302: "prixUnitaireHT",
- montantHT — L304: "montantHT",
- montantTTC — L306: "montantTTC",
- interventionId — L341: relationField: "interventionId",
- statut — L346: "statut",
- produitId — L351: relationField: "produitId",
- stockId — L361: relationField: "stockId",
- quantite — L365: "quantite",
- interventionId — L379: foreignKey: "interventionId",
- statut — L386: "statut",
- interventionId — L391: field: "interventionId",
- statut — L396: "statut",
- interventionId — L403: field: "interventionId",
- statut — L408: "statut",
- produitId — L421: field: "produitId",
- stockId — L431: field: "stockId",
- interventionId — L443: "interventionId",
- prixUnitaireHT — L447: "prixUnitaireHT",
- montantHT — L449: "montantHT",
- montantTTC — L451: "montantTTC",
- stockMovementId — L453: "stockMovementId",
- prixUnitaireHT — L462: "prixUnitaireHT",
- montantHT — L464: "montantHT",
- montantTTC — L466: "montantTTC",
- stockMovementId — L468: "stockMovementId",
- removedAt — L471: "removedAt",
- removedBy — L472: "removedBy",
- removedReason — L473: "removedReason",
- retirer-ligne — L479: key: "retirer-ligne",
- Retirer la ligne — L480: label: "Retirer la ligne",
- runtimeOnly — L482: runtimeOnly: true,
- brouillon — L491: initialState: "brouillon",
- brouillon — L497: { key: "brouillon", label: "Brouillon", color: "default" },
- validee — L498: { key: "validee", label: "Validée", color: "success" },
- brouillon — L502: { from: "brouillon", to: "validee", action: "Valider" },
- validee — L502: { from: "brouillon", to: "validee", action: "Valider" },

## Lecture attendue

- Corriger uniquement les FAIL.
- Statuts visibles lignes : brouillon / validée.
- Retrait ligne par action contrôlée, pas statut annulée utilisateur.
- Stock traité par runtime, pas saisie directe désordonnée.
- InterventionId verrouillé depuis parent.
- Facture/paiement/encaissement absents des lignes.
