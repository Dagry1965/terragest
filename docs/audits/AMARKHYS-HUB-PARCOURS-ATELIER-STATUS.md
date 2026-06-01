# AMARKHYS-HUB-PARCOURS-ATELIER-STATUS

Target: `src\components\erp\hub\ERPClientOperationalSheet.tsx`
Backup: `src\components\erp\hub\ERPClientOperationalSheet.tsx.bak-parcours-atelier-status`

## Goal

Display a synthetic workshop journey status in the client operational hub.

## Journey

- RDV
- Intervention
- Facture
- Paiement

## Statuses

- Aucun parcours sélectionné
- RDV planifié
- Intervention en cours
- Intervention terminée
- Facturé à encaisser
- Paiement partiel
- Parcours soldé
- Parcours annulé

## Notes

This pass computes the status from already loaded hub records and does not modify persistence, workflow transitions or runtime writes.

## Checks

- OK — component changed
- OK — status memo added
- OK — status banner added
- OK — RDV step added
- OK — intervention step added
- OK — invoice step added
- OK — payment step added
- OK — sold status added
- OK — partial payment status added
- OK — rdv modal preserved
- OK — intervention block preserved

OK: 11
FAIL: 0
