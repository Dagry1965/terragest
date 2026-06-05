# Q2-I-G0-D — Atelier invoice post-seed audit

## Scope

- Firestore post-seed verification.
- Source intervention: `demo-intervention-old-001`
- Scope: atelier invoice only.
- Boutique and mixed invoices are excluded.

## Summary

- OK: 20
- FAIL: 0

## Checks

| Status | Check | Details |
|---|---|---|
| OK | Source intervention exists | interventionsauto/demo-intervention-old-001 |
| OK | Seed document exists: facturesauto/q2i-atelier-facture-001 | Found |
| OK | Seed document exists: lignesfactureauto/q2i-atelier-lignefacture-001 | Found |
| OK | Seed document exists: lignesfactureauto/q2i-atelier-lignefacture-002 | Found |
| OK | Seed document exists: encaissementsauto/q2i-atelier-encaissement-001 | Found |
| OK | Seed document exists: echeancespaiementauto/q2i-atelier-echeance-001 | Found |
| OK | Seed document exists: rappelsauto/q2i-atelier-rappel-facture-001 | Found |
| OK | Seed document exists: rappelsauto/q2i-atelier-rappel-echeance-001 | Found |
| OK | Invoice sourceScope is atelier | atelier |
| OK | Invoice sourceType is intervention | intervention |
| OK | Invoice sourceModule is interventionsauto | interventionsauto |
| OK | Invoice sourceRecordId targets source intervention | demo-intervention-old-001 |
| OK | Invoice interventionId targets source intervention | demo-intervention-old-001 |
| OK | Invoice has at least 2 invoice lines | 2 |
| OK | Invoice has at least 1 payment | 1 |
| OK | Invoice has at least 1 payment schedule | 1 |
| OK | Invoice has reminders by factureId | 2 |
| OK | Payment schedule has reminder by echeanceId | 1 |
| OK | Invoice amount consistency: HT + TVA = TTC | 140000 + 25200 = 165200 |
| OK | Invoice payment consistency: TTC - paid = remaining | 165200 - 90000 = 75200 |

## Seeded invoice summary

```json
{
  "facture": {
    "numeroFacture": "FAC-ATELIER-Q2I-001",
    "typeFacture": "atelier",
    "sourceScope": "atelier",
    "sourceType": "intervention",
    "sourceModule": "interventionsauto",
    "sourceRecordId": "demo-intervention-old-001",
    "sourceLabel": "demo-intervention-old-001 · Kone · AB-101-AM",
    "statutFacture": "emise",
    "statutPaiement": "partiel",
    "montantHT": 140000,
    "tva": 25200,
    "montantTTC": 165200,
    "montantPaye": 90000,
    "resteAPayer": 75200
  },
  "children": {
    "lignesfactureauto": 2,
    "encaissementsauto": 1,
    "echeancespaiementauto": 1,
    "rappelsautoByFacture": 2,
    "rappelsautoByEcheance": 1
  }
}
```

## Decision

Q2-I-G0-D is validated. The atelier invoice seed exists and has the expected source, child records, schedule and reminder relations.

Next step: Q2-I-G — visual validation of atelier invoice in the operational graphic tree.