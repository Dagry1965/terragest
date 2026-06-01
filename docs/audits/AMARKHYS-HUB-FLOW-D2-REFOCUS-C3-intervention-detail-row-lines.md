# AMARKHYS-HUB-FLOW-D2-REFOCUS-C3 — Intervention detail row with lines

Target: `src\components\erp\hub\ERPClientOperationalSheet.tsx`
Backup: `src\components\erp\hub\ERPClientOperationalSheet.tsx.bak-c3-intervention-detail-row-lines`

## Goal

Add a full-width detail row under the selected intervention row, showing only the intervention lines.

## Scope

- Added a detail `<tr>` under the selected intervention.
- Detail row spans the full compact table width.
- Detail content uses the existing generic `ERPRelatedRecordsPanel`.
- Detail content is scoped to `parentRecord={intervention}`.
- Preserved selected rendez-vous filtering.
- Preserved compact intervention table.
- Did not move factures or encaissements yet.
- Did not relaunch D2-REFOCUS-B.

## Checks

- OK — component changed
- OK — compact table still present
- OK — detail row marker added
- OK — detail row uses full table width
- OK — line child panel added under intervention row
- OK — detail row scoped to selected intervention
- OK — selected intervention behavior preserved
- OK — selected rendezvous filtering preserved
- OK — factures downstream preserved
- OK — encaissements downstream preserved
- OK — old expand labels not reintroduced
- OK — selected vehicle card not reintroduced

OK: 12
FAIL: 0
