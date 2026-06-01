# AMARKHYS-HUB-FLOW-D2-REFOCUS-C1B — Fix JSX after selected vehicle card removal

Target: `src\components\erp\hub\ERPClientOperationalSheet.tsx`
Backup: `src\components\erp\hub\ERPClientOperationalSheet.tsx.bak-c1b-fix-jsx-after-vehicle-card-removal`

## Goal

Repair JSX left by C1 after removing only the selected vehicle visual card.

## Scope

- Removed only the orphan fallback attached to the deleted selectedVehicle card wrapper.
- Preserved RDV block.
- Preserved interventions block.
- Preserved invoices/payments area.
- Did not relaunch D2-REFOCUS-B.

## Checks

- OK — target exists
- OK — backup exists
- OK — selected vehicle visual card removed
- OK — orphan fallback removed
- OK — rdv block preserved
- OK — intervention block preserved
- OK — invoice/payment area preserved
- OK — dangerous D2-B script not touched

OK: 8
FAIL: 0
