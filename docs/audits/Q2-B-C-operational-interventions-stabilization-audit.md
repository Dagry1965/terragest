# Q2-B-C — Audit stabilisation page opérationnelle Interventions

OK: 35
FAIL: 0

## Checks

- [OK] src/components/erp/runtime/ERPRuntimePage.tsx — ERPRuntimePage détecte les pages opérationnelles
- [OK] src/components/erp/runtime/ERPRuntimePage.tsx — ERPRuntimePage branche ERPOperationalModulePage
- [OK] src/runtime/modules/ERPModule.ts — ERPModule contient le contrat operational générique
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto déclare operational
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto operational.title est déclaré
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto operational.kpis est déclaré
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto operational.filters est déclaré
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto operational.table est déclaré
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — "clientId" présent dans operational.table.fields
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — "vehiculeId" présent dans operational.table.fields
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — "dateIntervention" présent dans operational.table.fields
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — "typeIntervention" présent dans operational.table.fields
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — "kilometrage" présent dans operational.table.fields
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — "coutTotal" présent dans operational.table.fields
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — "statut" présent dans operational.table.fields
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — libellé relationnel client configuré
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — libellé relationnel véhicule configuré
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto déclare lignesinterventionauto comme enfant
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto déclare facturesauto comme enfant
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — children utilisent interventionId comme foreignKey
- [OK] src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts — lignesinterventionauto contient interventionId
- [OK] src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts — lignes intervention contiennent montantTotal
- [OK] src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts — lignes intervention contiennent un statut
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto contient interventionId
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — Header opérationnel affiche l’utilisateur connecté
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — Header opérationnel affiche la date du jour
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Table opérationnelle résout les libellés relationnels
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Table opérationnelle supporte les totaux enfants
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Table opérationnelle utilise une key React stable pour l’expand
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Colonne Actions absente du tableau principal
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — Expand affiche le bouton Ouvrir intervention
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — Expand affiche le bouton Ouvrir facture
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — Expand charge les enfants via RuntimeDataBinding
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — Expand ne lit pas Firestore directement
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Table opérationnelle ne lit pas Firestore directement
