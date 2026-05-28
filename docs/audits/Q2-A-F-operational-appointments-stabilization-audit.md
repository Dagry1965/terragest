# Q2-A-F — Audit stabilisation page opérationnelle RDV

OK: 18
FAIL: 0

- [OK] src/components/erp/runtime/ERPRuntimePage.tsx — ERPRuntimePage détecte les pages opérationnelles
- [OK] src/components/erp/runtime/ERPRuntimePage.tsx — ERPRuntimePage branche ERPOperationalModulePage
- [OK] src/runtime/modules/ERPModule.ts — ERPModule contient le contrat operational générique
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous déclare operational
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous déclare un total enfant pour Montant total
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — codeRendezVous absent de operational.table.fields
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Intervention liée absente de operational.table.fields
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — Header opérationnel affiche l’utilisateur connecté
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — Header opérationnel affiche la date du jour
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Table opérationnelle résout les libellés relationnels
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Table opérationnelle calcule les totaux enfants
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Table opérationnelle utilise une key React stable pour l’expand
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Colonne Actions retirée du tableau principal
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — Expand affiche le bouton Ouvrir intervention
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — Expand prévoit le bouton Ouvrir facture
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — Expand charge les enfants via RuntimeDataBinding
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — Expand ne lit pas Firestore directement
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Table opérationnelle ne lit pas Firestore directement
