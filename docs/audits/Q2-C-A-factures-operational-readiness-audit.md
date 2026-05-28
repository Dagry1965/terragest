# Q2-C-A — Audit readiness vue opérationnelle Factures

OK: 19
WARN: 0
FAIL: 0

## Checks

- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — composition présente sur facturesauto
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — children déclarés sur facturesauto
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto déclare encaissementsauto comme enfant
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto déclare échéances paiement comme enfant
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — clientId présent
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — vehiculeId présent
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — interventionId présent ou à confirmer
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — numeroFacture présent
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — montantTTC présent
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — montantPaye présent
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — resteAPayer présent
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — statutPaiement présent
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — workflow facture présent
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — operational pas encore activé sur facturesauto
- [OK] src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts — encaissementsauto contient factureId
- [OK] src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts — encaissementsauto contient un montant exploitable
- [OK] src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts — encaissementsauto contient un statut
- [OK] src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts — echeancespaiementauto contient factureId
- [OK] src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts — echeancespaiementauto contient un montant exploitable

## Décision

La vue opérationnelle factures peut être préparée après validation humaine des champs/statuts.
