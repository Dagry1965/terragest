# AMARKHYS-HUB-FLOW-D2-REFOCUS-C2B — Interventions compact table

Target: `src\components\erp\hub\ERPClientOperationalSheet.tsx`
Backup: `src\components\erp\hub\ERPClientOperationalSheet.tsx.bak-c2b-interventions-table-real-names`

## Goal

Convert interventions linked to the selected rendez-vous from cards to a compact table without adding detail rows yet.

## Scope

- Preserved selected rendez-vous filtering.
- Preserved selected intervention state.
- Preserved RDV block.
- Preserved invoice/payment downstream logic.
- Removed only the card-style intervention opening block.
- Did not add intervention line details yet.
- Did not relaunch D2-REFOCUS-B.

## Checks

- OK — component changed
- OK — compact row marker added
- OK — selectedRendezvous preserved
- OK — interventionsForSelectedRendezvous preserved
- OK — selected intervention state preserved
- OK — rdv block preserved
- OK — intervention block preserved
- OK — selected vehicle card not reintroduced
- OK — old card expand labels removed
- OK — no detail row added in C2B

OK: 10
FAIL: 0
