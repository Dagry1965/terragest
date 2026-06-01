# AMARKHYS-REBUILD-07C-G — Audit filter values contract

Date: 2026-06-01T00:09:14.064Z

## Synthèse

- OK: 10
- FAIL: 0

## Valeurs typeArticle

- lignes.typeArticle values: ["piece","main_oeuvre","service","remise"]
- produits.typeArticle values: ["piece","main_oeuvre","service","remise"]
- valeurs lignes absentes dans produits: []
- valeurs produits absentes dans lignes: []

## Checks

- OK — lignes.typeArticle existe
- OK — produits.typeArticle existe
- OK — valeurs typeArticle lignes non vides
- OK — valeurs typeArticle produits non vides
- OK — valeurs lignes couvertes par produits
- OK — valeurs produits couvertes par lignes
- OK — produitId filterBy typeArticle exact
- OK — stockId filterBy produitId exact
- OK — stocks.produitId existe
- OK — filter engine compare en string normalisé

## Blocs clés

### lignes.typeArticle

{
        key: "typeArticle",
        label: "Type article",
        type: "select",
        defaultValue: "piece",
        options: [
          { label: "Pièce", value: "piece" },
          { label: "Main d’œuvre", value: "main_oeuvre" },
          { label: "Service", value: "service" },
          { label: "Remise", value: "remise" },
        ],
        grid: { cols: 4 },
      }

### produits.typeArticle

{
        key: "typeArticle",
        label: "Type article",
        type: "select",
        defaultValue: "piece",
        options: [
          { label: "Pièce", value: "piece" },
          { label: "Main d’œuvre", value: "main_oeuvre" },
          { label: "Service", value: "service" },
          { label: "Remise", value: "remise" },
        ],
        list: { visible: true, order: 4 },
        grid: { cols: 6 },
      }

### lignes.produitId

{
        key: "produitId",
        label: "Produit / pièce",
        type: "relation",
        relation: {
    module: "produitsauto",
    filterBy: {
      sourceField: "typeArticle",
      targetField: "typeArticle",
    },
  },
        dependsOn: "typeArticle",
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
  helperText: "Produit filtré selon le type d’article sélectionné.",
        list: { order: 2 },
        grid: { cols: 6 },
      }

### lignes.stockId

{
        key: "stockId",
        label: "Stock source",
        type: "relation",
        relation: {
    module: "stocksauto",
    filterBy: {
      sourceField: "produitId",
      targetField: "produitId",
    },
  },
        dependsOn: "produitId",
        searchable: true,
        grid: { cols: 6 },
        helperText: "Stock source filtré selon le produit sélectionné.",
      }

### stocks.produitId

{
        key: "produitId",
        label: "Produit",
        type: "relation",
        relation: { module: "produitsauto" },
        required: true,
        searchable: true,
        list: { visible: true, order: 1 },
        grid: { cols: 6 },
      }
