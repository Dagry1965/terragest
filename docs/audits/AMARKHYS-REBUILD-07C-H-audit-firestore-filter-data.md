# AMARKHYS-REBUILD-07C-H — Audit Firestore filter data

Date: 2026-06-01T00:09:20.949Z

## Synthèse

- OK: 7
- FAIL: 0

## Counts

- produitsauto: 23
- stocksauto: 4
- product type values: ["main_oeuvre","piece"]

## Checks

- OK — produitsauto contient des documents
- OK — stocksauto contient des documents
- OK — au moins un produit piece existe
- OK — au moins un produit main_oeuvre existe
- OK — tous les stocks ont produitId
- OK — tous les stock.produitId correspondent à un produit existant
- OK — au moins une piece a un stock lié

## Produits par typeArticle

```json
[
  {
    "type": "piece",
    "count": 17,
    "samples": [
      {
        "id": "7SVy45XCQiSLP7qvaTyS",
        "code": "HUI-5W40",
        "nom": "Huile moteur 5W40",
        "typeArticle": "piece"
      },
      {
        "id": "7kcNbkvmfbnojNA6NKZM",
        "code": "18025019",
        "nom": "PETRONAS SYNTIUM 800 EU 18025019",
        "typeArticle": "piece"
      },
      {
        "id": "BOS-BAT-45AH",
        "code": "BOS-BAT-45AH",
        "nom": "Batterie Bosch 45Ah",
        "typeArticle": "piece"
      },
      {
        "id": "BOS-BAT-60AH",
        "code": "BOS-BAT-60AH",
        "nom": "Batterie Bosch 60Ah",
        "typeArticle": "piece"
      },
      {
        "id": "BOS-BAT-75AH",
        "code": "BOS-BAT-75AH",
        "nom": "Batterie Bosch 75Ah",
        "typeArticle": "piece"
      },
      {
        "id": "FAM-BATTERIES",
        "code": "FAM-BATTERIES",
        "nom": "Batteries automobiles",
        "typeArticle": "piece"
      },
      {
        "id": "FAM-HUILES-MOTEUR",
        "code": "FAM-HUILES-MOTEUR",
        "nom": "Huiles moteur",
        "typeArticle": "piece"
      },
      {
        "id": "FAM-LIQUIDES-TECH",
        "code": "FAM-LIQUIDES-TECH",
        "nom": "Liquides techniques",
        "typeArticle": "piece"
      },
      {
        "id": "FAM-LUB-GRAISSES",
        "code": "FAM-LUB-GRAISSES",
        "nom": "Lubrifiants et graisses",
        "typeArticle": "piece"
      },
      {
        "id": "PET-HUI-10W40-5L",
        "code": "PET-HUI-10W40-5L",
        "nom": "PETRONAS Syntium 10W40 5L",
        "typeArticle": "piece"
      }
    ]
  },
  {
    "type": "main_oeuvre",
    "count": 6,
    "samples": [
      {
        "id": "MO-ESSENTIELLE",
        "code": "MO-ESSENTIELLE",
        "nom": "Main d'oeuvre essentielle",
        "typeArticle": "main_oeuvre"
      },
      {
        "id": "MO-EXPERTISE",
        "code": "MO-EXPERTISE",
        "nom": "Main d'oeuvre expertise",
        "typeArticle": "main_oeuvre"
      },
      {
        "id": "MO-LEGERE",
        "code": "MO-LEGERE",
        "nom": "Main d’œuvre légère",
        "typeArticle": "main_oeuvre"
      },
      {
        "id": "MO-RENFORCEE",
        "code": "MO-RENFORCEE",
        "nom": "Main d’œuvre renforcée",
        "typeArticle": "main_oeuvre"
      },
      {
        "id": "MO-STANDARD",
        "code": "MO-STANDARD",
        "nom": "Main d’œuvre standard",
        "typeArticle": "main_oeuvre"
      },
      {
        "id": "MO-TECHNIQUE",
        "code": "MO-TECHNIQUE",
        "nom": "Main d'oeuvre technique",
        "typeArticle": "main_oeuvre"
      }
    ]
  },
  {
    "type": "service",
    "count": 0,
    "samples": []
  },
  {
    "type": "remise",
    "count": 0,
    "samples": []
  }
]
```

## Produits sans typeArticle

```json
[]
```

## Stocks sans produitId

```json
[]
```

## Stocks avec produitId inconnu

```json
[]
```

## Produits piece sans stock lié

```json
[
  {
    "id": "7SVy45XCQiSLP7qvaTyS",
    "code": "HUI-5W40",
    "nom": "Huile moteur 5W40",
    "typeArticle": "piece"
  },
  {
    "id": "7kcNbkvmfbnojNA6NKZM",
    "code": "18025019",
    "nom": "PETRONAS SYNTIUM 800 EU 18025019",
    "typeArticle": "piece"
  },
  {
    "id": "BOS-BAT-60AH",
    "code": "BOS-BAT-60AH",
    "nom": "Batterie Bosch 60Ah",
    "typeArticle": "piece"
  },
  {
    "id": "BOS-BAT-75AH",
    "code": "BOS-BAT-75AH",
    "nom": "Batterie Bosch 75Ah",
    "typeArticle": "piece"
  },
  {
    "id": "FAM-BATTERIES",
    "code": "FAM-BATTERIES",
    "nom": "Batteries automobiles",
    "typeArticle": "piece"
  },
  {
    "id": "FAM-HUILES-MOTEUR",
    "code": "FAM-HUILES-MOTEUR",
    "nom": "Huiles moteur",
    "typeArticle": "piece"
  },
  {
    "id": "FAM-LIQUIDES-TECH",
    "code": "FAM-LIQUIDES-TECH",
    "nom": "Liquides techniques",
    "typeArticle": "piece"
  },
  {
    "id": "FAM-LUB-GRAISSES",
    "code": "FAM-LUB-GRAISSES",
    "nom": "Lubrifiants et graisses",
    "typeArticle": "piece"
  },
  {
    "id": "PET-HUI-10W40-5L",
    "code": "PET-HUI-10W40-5L",
    "nom": "PETRONAS Syntium 10W40 5L",
    "typeArticle": "piece"
  },
  {
    "id": "PET-HUI-5W30-1L",
    "code": "PET-HUI-5W30-1L",
    "nom": "PETRONAS Syntium 5W30 1L",
    "typeArticle": "piece"
  },
  {
    "id": "PET-HUI-5W30-5L",
    "code": "PET-HUI-5W30-5L",
    "nom": "PETRONAS Syntium 5W30 5L",
    "typeArticle": "piece"
  },
  {
    "id": "Zyz4vqTVfnZfIWgyXDsC",
    "code": " Huile moteur 5W40 10L",
    "nom": " Huile moteur 5W40 - Bidon 10L",
    "typeArticle": "piece"
  },
  {
    "id": "fOIi4AF6bx92PDuHbmZW",
    "code": "HUI-5W40-5L",
    "nom": "Huile moteur 5W40 - Bidon 5L",
    "typeArticle": "piece"
  }
]
```

## Lecture

- Si produits sans typeArticle : corriger/backfill typeArticle.
- Si stocks sans produitId : corriger/backfill stock.produitId.
- Si stock.produitId inconnu : rattacher au bon produit.
- Si produit piece sans stock : normal que stockId soit vide pour ce produit.
