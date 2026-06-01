# AMARKHYS-HUB-FLOW-D2-REFOCUS-C1C — Remove orphan div after vehicle card removal

Target: `src\components\erp\hub\ERPClientOperationalSheet.tsx`
Backup: `src\components\erp\hub\ERPClientOperationalSheet.tsx.bak-c1c-remove-orphan-div-after-vehicle-card`

## Scope

- Removed only the orphan `</div>` left after C1/C1B.
- Preserved RDV block.
- Preserved interventions block.
- Preserved invoices/payments area.
- Did not relaunch D2-REFOCUS-B.

## Checks

- OK — selected vehicle visual card remains removed
- OK — rdv block preserved
- OK — intervention block preserved
- OK — invoice payment empty card preserved
- OK — synthese parcours section preserved
- OK — specific orphan sequence removed

OK: 6
FAIL: 0
