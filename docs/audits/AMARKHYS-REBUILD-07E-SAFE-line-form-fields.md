# AMARKHYS-REBUILD-07E-SAFE — Line form fields

Date: 2026-06-01T01:01:22.605Z

## Corrections

- Remplacement uniquement des entrées standalone de layout `typeLigne` par `typeArticle`.
- Conservation de la définition technique `typeLigne`.
- `typeArticle` rendu obligatoire et éditable.
- `designation` rendue non obligatoire manuellement et verrouillée.
- Conservation stricte de `relation.filterBy` et `dependsOn`.

## Checks

- OK — typeLigne key conservée comme champ technique
- OK — typeLigne retiré des layouts visibles standalone
- OK — typeArticle existe
- OK — typeArticle obligatoire
- OK — typeArticle non verrouillé
- OK — designation existe
- OK — designation non obligatoire manuellement
- OK — designation verrouillée
- OK — produitId filtre toujours typeArticle
- OK — stockId filtre toujours produitId
- OK — aucun pattern cassé sourceField targetField
- OK — fichier modifié

## Synthèse

- OK: 12
- FAIL: 0

## readOnlyFields

readOnlyFields: [
      "produitCode",
      "produitNom",
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
      "designation",
]

## typeArticle window

key: "typeArticle",
        label: "Type article",
        required: true,
        type: "select",
        defaultValue: "piece",
        options: [
          { label: "Pièce", value: "piece" },
          { label: "Main d’œuvre", value: "main_oeuvre" },
          { label: "Service", value: "service" },
          { label: "Remise", value: "remise" },
        ],
        grid: { cols: 4 },
      },
      {
        

## designation window

key: "designation",
        label: "Désignation",
        type: "text",
        required: false,
        searchable: true,
        list: { order: 3 },
        grid: { cols: 6 },
      },
      {
        
