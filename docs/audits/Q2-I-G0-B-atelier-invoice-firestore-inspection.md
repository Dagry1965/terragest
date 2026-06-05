# Q2-I-G0-B — Atelier invoice Firestore inspection

## Scope

- Read-only Firestore inspection.
- Goal: identify existing atelier data usable for invoice/source tree validation.
- No Firestore write in this pass.
- Scope: atelier invoices only. Boutique and mixed invoices are excluded.

## Collection counts

| Collection | Count read |
|---|---:|
| clientsauto | 20 |
| vehicules | 20 |
| interventionsauto | 9 |
| lignesinterventionauto | 18 |
| facturesauto | 8 |
| lignesfactureauto | 4 |
| encaissementsauto | 4 |
| echeancespaiementauto | 2 |
| rappelsauto | 3 |

## Best intervention candidates

| Rank | Intervention | Score | Statut | Client | Véhicule | Lines | Existing invoices |
|---:|---|---:|---|---|---|---:|---:|
| 1 | demo-intervention-old-001 | 12 | terminee | Kone | AB-101-AM | 4 | 1 |
| 2 | demo-intervention-old-002 | 12 | terminee | Traore | AB-202-MT | 4 | 1 |
| 3 | billing-dd1-intervention | 10 | terminee | Ouattara | AB-111-ON | 2 | 1 |
| 4 | billing-dd2-intervention | 10 | terminee | Ouattara | AB-111-ON | 2 | 1 |
| 5 | demo-intervention-old-003 | 10 | terminee | Coulibaly | AB-303-YC | 2 | 1 |
| 6 | billing-dd3-intervention | 5 | facturee | Ouattara | AB-111-ON | 2 | 1 |
| 7 | demo-intervention-new-001 | 5 | en_cours | Yapi | AB-222-YK | 2 | 1 |
| 8 | gIh2qojO6u2D5MdsLGyG | 4 | planifiee | Zadi | AB-555-ZC | 0 | 0 |
| 9 | demo-intervention-new-002 | 3 | annulee | Zadi | AB-555-ZC | 0 | 1 |

## Recommended deterministic seed plan

```json
{
  "scenario": "atelier-partial-schedule",
  "recommendedSourceInterventionId": "demo-intervention-old-001",
  "ids": {
    "factureId": "q2i-atelier-facture-001",
    "ligneFactureMainOeuvreId": "q2i-atelier-lignefacture-001",
    "ligneFacturePieceId": "q2i-atelier-lignefacture-002",
    "encaissementId": "q2i-atelier-encaissement-001",
    "echeanceId": "q2i-atelier-echeance-001",
    "rappelFactureId": "q2i-atelier-rappel-facture-001",
    "rappelEcheanceId": "q2i-atelier-rappel-echeance-001"
  }
}
```

## Candidate details

### Intervention `demo-intervention-old-001`

```json
{
  "intervention": {
    "id": "demo-intervention-old-001",
    "statut": "terminee",
    "clientId": "demo-client-old-001",
    "vehiculeId": "demo-vehicle-old-001",
    "rendezVousId": "demo-rdv-old-001",
    "dateIntervention": "2026-02-28",
    "montantHT": 31500,
    "montantTTC": 37170
  },
  "client": {
    "codeClient": "CLI-OLD-001",
    "nom": "Kone",
    "prenom": "Amadou",
    "telephone": "+22507010001",
    "email": "client.old.001@amarkhys.demo"
  },
  "vehicule": {
    "immatriculation": "AB-101-AM",
    "marque": "Toyota",
    "modele": "Corolla",
    "clientId": "demo-client-old-001"
  },
  "lines": [
    {
      "id": "demo-intervention-old-001-line-001",
      "designation": "Huile moteur 5W30 synthèse",
      "produitId": "demo-product-oil-5w30",
      "quantite": 1,
      "prixUnitaireHT": 8500,
      "montantHT": 8500,
      "montantTTC": 10030,
      "statut": "validee"
    },
    {
      "id": "demo-intervention-old-001-line-002",
      "designation": "Filtre à huile",
      "produitId": "demo-product-oil-filter",
      "quantite": 1,
      "prixUnitaireHT": 4500,
      "montantHT": 4500,
      "montantTTC": 5310,
      "statut": "validee"
    },
    {
      "id": "demo-intervention-old-001-line-003",
      "designation": "Joint bouchon vidange",
      "produitId": "demo-product-drain-plug-seal",
      "quantite": 1,
      "prixUnitaireHT": 500,
      "montantHT": 500,
      "montantTTC": 590,
      "statut": "validee"
    },
    {
      "id": "demo-intervention-old-001-line-004",
      "designation": "Forfait vidange",
      "produitId": "demo-service-oil-change",
      "quantite": 1,
      "prixUnitaireHT": 18000,
      "montantHT": 18000,
      "montantTTC": 21240,
      "statut": "validee"
    }
  ],
  "existingInvoices": [
    {
      "id": "demo-invoice-old-001",
      "numeroFacture": "FAC-OLD-001",
      "statutFacture": "emise",
      "statutPaiement": "paye",
      "montantHT": 31500,
      "montantTTC": 37170,
      "resteAPayer": 0
    }
  ]
}
```

### Intervention `demo-intervention-old-002`

```json
{
  "intervention": {
    "id": "demo-intervention-old-002",
    "statut": "terminee",
    "clientId": "demo-client-old-002",
    "vehiculeId": "demo-vehicle-old-002",
    "rendezVousId": "demo-rdv-old-002",
    "dateIntervention": "2026-03-17",
    "montantHT": 48000,
    "montantTTC": 56640
  },
  "client": {
    "codeClient": "CLI-OLD-002",
    "nom": "Traore",
    "prenom": "Mariam",
    "telephone": "+22507010002",
    "email": "client.old.002@amarkhys.demo"
  },
  "vehicule": {
    "immatriculation": "AB-202-MT",
    "marque": "Peugeot",
    "modele": "3008",
    "clientId": "demo-client-old-002"
  },
  "lines": [
    {
      "id": "demo-intervention-old-002-line-001",
      "designation": "Plaquettes frein avant",
      "produitId": "demo-product-front-brake-pads",
      "quantite": 1,
      "prixUnitaireHT": 18000,
      "montantHT": 18000,
      "montantTTC": 21240,
      "statut": "validee"
    },
    {
      "id": "demo-intervention-old-002-line-002",
      "designation": "Liquide de frein DOT4",
      "produitId": "demo-product-brake-fluid-dot4",
      "quantite": 1,
      "prixUnitaireHT": 3500,
      "montantHT": 3500,
      "montantTTC": 4130,
      "statut": "validee"
    },
    {
      "id": "demo-intervention-old-002-line-003",
      "designation": "Nettoyant frein",
      "produitId": "demo-product-brake-cleaner",
      "quantite": 1,
      "prixUnitaireHT": 2500,
      "montantHT": 2500,
      "montantTTC": 2950,
      "statut": "validee"
    },
    {
      "id": "demo-intervention-old-002-line-004",
      "designation": "Main d’œuvre mécanique",
      "produitId": "demo-service-labor",
      "quantite": 2,
      "prixUnitaireHT": 12000,
      "montantHT": 24000,
      "montantTTC": 28320,
      "statut": "validee"
    }
  ],
  "existingInvoices": [
    {
      "id": "demo-invoice-old-002",
      "numeroFacture": "FAC-OLD-002",
      "statutFacture": "emise",
      "statutPaiement": "paye",
      "montantHT": 48000,
      "montantTTC": 56640,
      "resteAPayer": 0
    }
  ]
}
```

### Intervention `billing-dd1-intervention`

```json
{
  "intervention": {
    "id": "billing-dd1-intervention",
    "numeroIntervention": "BILL-D-D1-INTERVENTION",
    "code": "BILL-D-D1-INTERVENTION",
    "statut": "terminee",
    "clientId": "demo-client-new-001",
    "vehiculeId": "demo-vehicle-new-001",
    "dateIntervention": "2026-06-04",
    "montantHT": 65000,
    "montantTTC": 76700
  },
  "client": {
    "codeClient": "CLI-NEW-001",
    "nom": "Ouattara",
    "prenom": "Nadine",
    "telephone": "+22507020001",
    "email": "client.new.001@amarkhys.demo"
  },
  "vehicule": {
    "immatriculation": "AB-111-ON",
    "marque": "Dacia",
    "modele": "Duster",
    "clientId": "demo-client-new-001"
  },
  "lines": [
    {
      "id": "billing-dd1-line-diagnostic",
      "designation": "Diagnostic électronique D-D1",
      "typeLigne": "service",
      "quantite": 1,
      "prixUnitaireHT": 25000,
      "montantHT": 25000,
      "montantTTC": 29500,
      "statut": "validee"
    },
    {
      "id": "billing-dd1-line-main-oeuvre",
      "designation": "Main d’œuvre atelier D-D1",
      "typeLigne": "main_oeuvre",
      "quantite": 2,
      "prixUnitaireHT": 20000,
      "montantHT": 40000,
      "montantTTC": 47200,
      "statut": "validee"
    }
  ],
  "existingInvoices": [
    {
      "id": "nn2TuMyENRGsTaSdNetb",
      "numeroFacture": "FAC-1780579752186",
      "statutFacture": "emise",
      "statutPaiement": "en_attente",
      "sourceScope": "single",
      "sourceType": "atelier",
      "sourceModule": "facturesauto",
      "sourceRecordId": "nn2TuMyENRGsTaSdNetb",
      "sourceLabel": "BILL-D-D1-INTERVENTION",
      "montantHT": 65000,
      "montantTTC": 76700,
      "resteAPayer": 76700
    }
  ]
}
```

## Decision

Q2-I-G0-B is validated. Existing atelier data can be used as source context for a deterministic invoice seed.

Next step: Q2-I-G0-C should create a controlled seed using deterministic IDs and only atelier invoice records.