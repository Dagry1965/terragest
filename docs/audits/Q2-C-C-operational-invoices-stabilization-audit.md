# Q2-C-C — Audit stabilisation page opérationnelle Factures

OK: 36
FAIL: 0

## Checks

- [OK] src/components/erp/runtime/ERPRuntimePage.tsx — ERPRuntimePage détecte les pages opérationnelles
- [OK] src/components/erp/runtime/ERPRuntimePage.tsx — ERPRuntimePage branche ERPOperationalModulePage
- [OK] src/runtime/modules/ERPModule.ts — ERPModule contient le contrat operational générique
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto déclare operational
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto operational.title est déclaré
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto operational.kpis est déclaré
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto operational.filters est déclaré
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto operational.table est déclaré
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — "numeroFacture" présent dans operational.table.fields
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — "clientId" présent dans operational.table.fields
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — "vehiculeId" présent dans operational.table.fields
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — "dateFacture" présent dans operational.table.fields
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — "montantTTC" présent dans operational.table.fields
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — "montantPaye" présent dans operational.table.fields
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — "resteAPayer" présent dans operational.table.fields
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — "statutPaiement" présent dans operational.table.fields
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — libellé relationnel client configuré
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — libellé relationnel véhicule configuré
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto déclare encaissementsauto comme enfant
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto déclare echeancespaiementauto comme enfant
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — children utilisent factureId comme foreignKey
- [OK] src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts — encaissementsauto contient factureId
- [OK] src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts — encaissementsauto contient montant
- [OK] src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts — encaissementsauto contient statut
- [OK] src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts — echeancespaiementauto contient factureId
- [OK] src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts — echeancespaiementauto contient montantPrevu
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — Header opérationnel affiche l’utilisateur connecté
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — Header opérationnel affiche la date du jour
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Table opérationnelle résout les libellés relationnels
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Table opérationnelle supporte les totaux enfants
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Table opérationnelle utilise une key React stable pour l’expand
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Colonne Actions absente du tableau principal
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — Expand charge les enfants via RuntimeDataBinding
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — Expand affiche des boutons de navigation
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — Expand ne lit pas Firestore directement
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Table opérationnelle ne lit pas Firestore directement
