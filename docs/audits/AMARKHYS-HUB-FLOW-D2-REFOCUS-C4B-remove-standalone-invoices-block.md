# AMARKHYS-HUB-FLOW-D2-REFOCUS-C4B — Remove standalone invoices block

Target: `src\components\erp\hub\ERPClientOperationalSheet.tsx`
Backup: `src\components\erp\hub\ERPClientOperationalSheet.tsx.bak-c4b-remove-standalone-invoices-block`

## Goal

Remove the standalone `Factures liées` block after the intervention section because invoices are now displayed inside the selected intervention detail row.

## Scope

- Preserved compact intervention table.
- Preserved intervention lines in detail row.
- Preserved invoices inside intervention detail row.
- Removed only the old standalone selectedIntervention invoice panel.
- Preserved encaissements section for C5.
- Did not move payments yet.
- Did not relaunch D2-REFOCUS-B.

## Checks

- OK — component changed
- OK — compact intervention table preserved
- OK — intervention lines detail preserved
- OK — nested intervention invoices preserved
- OK — nested invoices still scoped to row intervention
- OK — standalone selectedIntervention invoice block removed
- OK — encaissements section preserved for C5
- OK — selected invoice logic preserved for now
- OK — rdv filter preserved
- OK — selected vehicle card not reintroduced
- OK — old expand labels not reintroduced

OK: 11
FAIL: 0
