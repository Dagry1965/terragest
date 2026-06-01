# AMARKHYS-HUB-FLOW-D2-REFOCUS-C4 — Add invoices in intervention detail

Target: `src\components\erp\hub\ERPClientOperationalSheet.tsx`
Backup: `src\components\erp\hub\ERPClientOperationalSheet.tsx.bak-c4-add-invoices-in-intervention-detail`

## Goal

Add invoices inside the full-width detail row of the selected intervention.

## Scope

- Reused existing generic `ERPRelatedRecordsPanel`.
- Reused existing `facturesChild` metadata.
- Kept lines of intervention as first detail block.
- Added factures under the intervention lines.
- Preserved compact intervention table.
- Preserved selected rendez-vous filtering.
- Did not move encaissements yet.
- Did not relaunch D2-REFOCUS-B.

## Checks

- OK — component changed
- OK — C3 detail row preserved
- OK — C4 invoice block added
- OK — line child panel preserved
- OK — invoice child panel added inside detail
- OK — compact table preserved
- OK — selected rendezvous filtering preserved
- OK — selected intervention behavior preserved
- OK — encaissements downstream preserved
- OK — old expand labels not reintroduced
- OK — selected vehicle card not reintroduced

OK: 11
FAIL: 0
