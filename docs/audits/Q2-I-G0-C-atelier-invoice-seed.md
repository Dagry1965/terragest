# Q2-I-G0-C — Atelier invoice controlled seed

## Scope

- Controlled atelier invoice seed.
- Source intervention: `demo-intervention-old-001`
- Boutique and mixed invoices are excluded.
- Deterministic IDs.
- Write mode: `DRY_RUN`

## Source context

```json
{
  "interventionId": "demo-intervention-old-001",
  "clientId": "demo-client-old-001",
  "vehiculeId": "demo-vehicle-old-001",
  "interventionLineCount": 4,
  "sourceLabel": "demo-intervention-old-001 · Kone · AB-101-AM"
}
```

## Planned writes

| Collection | ID |
|---|---|
| facturesauto | q2i-atelier-facture-001 |
| lignesfactureauto | q2i-atelier-lignefacture-001 |
| lignesfactureauto | q2i-atelier-lignefacture-002 |
| encaissementsauto | q2i-atelier-encaissement-001 |
| echeancespaiementauto | q2i-atelier-echeance-001 |
| rappelsauto | q2i-atelier-rappel-facture-001 |
| rappelsauto | q2i-atelier-rappel-echeance-001 |

## Existing deterministic docs before write

- facturesauto/q2i-atelier-facture-001
- lignesfactureauto/q2i-atelier-lignefacture-001
- lignesfactureauto/q2i-atelier-lignefacture-002
- encaissementsauto/q2i-atelier-encaissement-001
- echeancespaiementauto/q2i-atelier-echeance-001
- rappelsauto/q2i-atelier-rappel-facture-001
- rappelsauto/q2i-atelier-rappel-echeance-001

## Seed preview

```json
{
  "facture": {
    "id": "q2i-atelier-facture-001",
    "tenantId": "ORG_AMARKHYS_001",
    "workspace": "amarkhys",
    "clientId": "demo-client-old-001",
    "vehiculeId": "demo-vehicle-old-001",
    "interventionId": "demo-intervention-old-001",
    "sourceScope": "atelier",
    "sourceType": "intervention",
    "sourceModule": "interventionsauto",
    "sourceRecordId": "demo-intervention-old-001",
    "sourceLabel": "demo-intervention-old-001 · Kone · AB-101-AM",
    "createdAt": "2026-06-05T20:55:44.692Z",
    "updatedAt": "2026-06-05T20:55:44.692Z",
    "createdBy": "q2i-g0-c-seed",
    "updatedBy": "q2i-g0-c-seed",
    "moduleKey": "facturesauto",
    "numeroFacture": "FAC-ATELIER-Q2I-001",
    "dateFacture": "2026-06-05",
    "typeFacture": "atelier",
    "statutFacture": "emise",
    "statutPaiement": "partiel",
    "montantHT": 140000,
    "tva": 25200,
    "montantTTC": 165200,
    "montantPaye": 90000,
    "resteAPayer": 75200,
    "modePaiement": "mixte",
    "statutEnvoiFacture": "envoyee",
    "notes": "Seed Q2-I-G0-C — facture atelier source-aware pour validation arbre operationnel."
  },
  "ligneFacture1": {
    "id": "q2i-atelier-lignefacture-001",
    "tenantId": "ORG_AMARKHYS_001",
    "workspace": "amarkhys",
    "clientId": "demo-client-old-001",
    "vehiculeId": "demo-vehicle-old-001",
    "interventionId": "demo-intervention-old-001",
    "sourceScope": "atelier",
    "sourceType": "ligne_intervention",
    "sourceModule": "lignesinterventionauto",
    "sourceRecordId": "demo-intervention-old-001-line-001",
    "sourceLabel": "Huile moteur 5W30 synthèse",
    "createdAt": "2026-06-05T20:55:44.692Z",
    "updatedAt": "2026-06-05T20:55:44.692Z",
    "createdBy": "q2i-g0-c-seed",
    "updatedBy": "q2i-g0-c-seed",
    "moduleKey": "lignesfactureauto",
    "factureId": "q2i-atelier-facture-001",
    "designation": "Huile moteur 5W30 synthèse",
    "typeLigne": "main_oeuvre",
    "quantite": 1,
    "prixUnitaireHT": 85000,
    "montantHT": 85000,
    "tva": 15300,
    "montantTTC": 100300,
    "sourceLineId": "demo-intervention-old-001-line-001",
    "statut": "validee"
  },
  "ligneFacture2": {
    "id": "q2i-atelier-lignefacture-002",
    "tenantId": "ORG_AMARKHYS_001",
    "workspace": "amarkhys",
    "clientId": "demo-client-old-001",
    "vehiculeId": "demo-vehicle-old-001",
    "interventionId": "demo-intervention-old-001",
    "sourceScope": "atelier",
    "sourceType": "ligne_intervention",
    "sourceModule": "lignesinterventionauto",
    "sourceRecordId": "demo-intervention-old-001-line-002",
    "sourceLabel": "Filtre à huile",
    "createdAt": "2026-06-05T20:55:44.692Z",
    "updatedAt": "2026-06-05T20:55:44.692Z",
    "createdBy": "q2i-g0-c-seed",
    "updatedBy": "q2i-g0-c-seed",
    "moduleKey": "lignesfactureauto",
    "factureId": "q2i-atelier-facture-001",
    "designation": "Filtre à huile",
    "typeLigne": "piece",
    "quantite": 2,
    "prixUnitaireHT": 27500,
    "montantHT": 55000,
    "tva": 9900,
    "montantTTC": 64900,
    "sourceLineId": "demo-intervention-old-001-line-002",
    "statut": "validee"
  },
  "encaissement": {
    "id": "q2i-atelier-encaissement-001",
    "tenantId": "ORG_AMARKHYS_001",
    "workspace": "amarkhys",
    "clientId": "demo-client-old-001",
    "vehiculeId": "demo-vehicle-old-001",
    "interventionId": "demo-intervention-old-001",
    "sourceScope": "atelier",
    "sourceType": "intervention",
    "sourceModule": "interventionsauto",
    "sourceRecordId": "demo-intervention-old-001",
    "sourceLabel": "demo-intervention-old-001 · Kone · AB-101-AM",
    "createdAt": "2026-06-05T20:55:44.692Z",
    "updatedAt": "2026-06-05T20:55:44.692Z",
    "createdBy": "q2i-g0-c-seed",
    "updatedBy": "q2i-g0-c-seed",
    "moduleKey": "encaissementsauto",
    "factureId": "q2i-atelier-facture-001",
    "montant": 90000,
    "modePaiement": "mobile_money",
    "referenceTransaction": "Q2I-ATELIER-PAY-001",
    "statut": "valide",
    "numeroRecu": "REC-Q2I-ATELIER-001",
    "notes": "Paiement partiel seed Q2-I-G0-C."
  },
  "echeance": {
    "id": "q2i-atelier-echeance-001",
    "tenantId": "ORG_AMARKHYS_001",
    "workspace": "amarkhys",
    "clientId": "demo-client-old-001",
    "vehiculeId": "demo-vehicle-old-001",
    "interventionId": "demo-intervention-old-001",
    "sourceScope": "atelier",
    "sourceType": "intervention",
    "sourceModule": "interventionsauto",
    "sourceRecordId": "demo-intervention-old-001",
    "sourceLabel": "demo-intervention-old-001 · Kone · AB-101-AM",
    "createdAt": "2026-06-05T20:55:44.692Z",
    "updatedAt": "2026-06-05T20:55:44.692Z",
    "createdBy": "q2i-g0-c-seed",
    "updatedBy": "q2i-g0-c-seed",
    "moduleKey": "echeancespaiementauto",
    "factureId": "q2i-atelier-facture-001",
    "montant": 75200,
    "montantEcheance": 75200,
    "dateEcheance": "2026-06-20",
    "statut": "en_attente",
    "notes": "Echeance restante seed Q2-I-G0-C."
  },
  "rappelFacture": {
    "id": "q2i-atelier-rappel-facture-001",
    "tenantId": "ORG_AMARKHYS_001",
    "workspace": "amarkhys",
    "clientId": "demo-client-old-001",
    "vehiculeId": "demo-vehicle-old-001",
    "interventionId": "demo-intervention-old-001",
    "sourceScope": "atelier",
    "sourceType": "intervention",
    "sourceModule": "interventionsauto",
    "sourceRecordId": "demo-intervention-old-001",
    "sourceLabel": "demo-intervention-old-001 · Kone · AB-101-AM",
    "createdAt": "2026-06-05T20:55:44.692Z",
    "updatedAt": "2026-06-05T20:55:44.692Z",
    "createdBy": "q2i-g0-c-seed",
    "updatedBy": "q2i-g0-c-seed",
    "moduleKey": "rappelsauto",
    "factureId": "q2i-atelier-facture-001",
    "typeRappel": "facture",
    "dateRappel": "2026-06-12",
    "canal": "email",
    "message": "Rappel facture atelier partiellement payee.",
    "statut": "planifie"
  },
  "rappelEcheance": {
    "id": "q2i-atelier-rappel-echeance-001",
    "tenantId": "ORG_AMARKHYS_001",
    "workspace": "amarkhys",
    "clientId": "demo-client-old-001",
    "vehiculeId": "demo-vehicle-old-001",
    "interventionId": "demo-intervention-old-001",
    "sourceScope": "atelier",
    "sourceType": "intervention",
    "sourceModule": "interventionsauto",
    "sourceRecordId": "demo-intervention-old-001",
    "sourceLabel": "demo-intervention-old-001 · Kone · AB-101-AM",
    "createdAt": "2026-06-05T20:55:44.692Z",
    "updatedAt": "2026-06-05T20:55:44.692Z",
    "createdBy": "q2i-g0-c-seed",
    "updatedBy": "q2i-g0-c-seed",
    "moduleKey": "rappelsauto",
    "factureId": "q2i-atelier-facture-001",
    "echeanceId": "q2i-atelier-echeance-001",
    "typeRappel": "echeance",
    "dateRappel": "2026-06-17",
    "canal": "sms",
    "message": "Rappel echeance facture atelier.",
    "statut": "planifie"
  }
}
```

## Decision

Dry-run completed. Re-run with `--confirm-seed-atelier-invoice` to write the atelier invoice seed.
