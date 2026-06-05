# Q2-I-F — Invoice source operational tree audit

## Scope

- Goal: audit whether invoice can be represented as a generic source-aware financial document.
- No code modification in this pass.
- Focus modules:
  - facturesauto
  - lignesfactureauto
  - encaissementsauto
  - echeancespaiementauto
  - rappelsauto
  - RuntimeOperationalTreeResolver

## Expected model

```text
Facture
├── Source métier
├── Lignes facture
├── Encaissements
├── Échéances
│   └── Relances échéance
└── Relances facture
```

## Summary

- OK: 26
- WARN: 0
- FAIL: 0

## Checks

| Status | Check | Details |
|---|---|---|
| OK | File exists: treeResolver | src/runtime/operational/RuntimeOperationalTreeResolver.ts |
| OK | File exists: factures | src/runtime/modules/generated/facturesauto/facturesauto.module.ts |
| OK | File exists: lignesFacture | src/runtime/modules/generated/lignesfactureauto/lignesfactureauto.module.ts |
| OK | File exists: encaissements | src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts |
| OK | File exists: echeances | src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts |
| OK | File exists: rappels | src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts |
| OK | Tree resolver supports source metadata | Required for invoices as autonomous source-aware documents. |
| OK | facturesauto declares typeFacture | Invoice type should distinguish atelier/boutique/mixed/other if present. |
| OK | facturesauto declares sourceScope | Source scope is needed for atelier/boutique/mixed source semantics. |
| OK | facturesauto declares sourceType | Source type helps classify facturable origin. |
| OK | facturesauto declares sourceModule | Source module allows invoice to point to intervention, sale, order, or other source. |
| OK | facturesauto declares sourceRecordId | Source record id allows invoice to reference the originating business record. |
| OK | facturesauto declares sourceLabel | Source label improves readable tree display. |
| OK | facturesauto exposes lignesfactureauto by factureId | Invoice lines must be children of the invoice document. |
| OK | facturesauto exposes encaissementsauto by factureId | Payments should be visible under invoice. |
| OK | facturesauto exposes echeancespaiementauto by factureId | Payment schedules should split invoice remaining amount. |
| OK | facturesauto exposes rappelsauto by factureId | Invoice reminders should be visible under invoice. |
| OK | lignesfactureauto declares factureId | Invoice lines must belong to invoice header. |
| OK | encaissementsauto declares factureId | Payments should reduce invoice remaining amount. |
| OK | echeancespaiementauto declares factureId | Schedules should belong to invoice. |
| OK | rappelsauto declares factureId | Reminder can target invoice. |
| OK | rappelsauto declares echeanceId | Reminder can target payment schedule. |
| OK | echeancespaiementauto exposes rappelsauto by echeanceId | Schedule reminders should be nested under schedule. |
| OK | facturesauto still supports interventionId | Allowed: invoice may be linked to workshop intervention, but must not depend only on it. |
| OK | facturesauto supports both source metadata and legacy workshop link | This allows transition from intervention-only invoice toward autonomous source-aware invoice. |
| OK | Tree resolver has no AMARKHYS hardcode | Resolver must stay generic. |

## Business rules confirmed

| Rule | Details |
|---|---|
| Invoice is a financial document, not only an intervention child | Tree should represent invoice through source metadata and composition children. |
| Invoice lines define economic detail | Amounts should aggregate from lignesfactureauto into facturesauto. |
| Payment schedules split remaining invoice amount | Echeances belong to invoice, not to invoice lines by default. |
| Payments reduce invoice remaining amount | Encaissements belong to invoice and should be visible under invoice. |
| Reminders target invoice or schedule | rappelsauto can link via factureId or echeanceId. |

## Decision

Q2-I-F is validated with warnings only if any. The invoice model is compatible with a generic source-aware operational tree.

Next step: address WARN items only if a required source/document field or relation is missing in metadata.