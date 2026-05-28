# Q2-D-F-A — Audit operational branding hardcode

OK: 3
FAIL: 0
WARN_HIGH: 3
WARN: 11

## Checks

- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — ERPOperationalModulePage contient actuellement le branding hardcodé à extraire
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — ERPOperationalModulePage contient actuellement le libellé runtime hardcodé à extraire
- [OK] src/runtime/modules/ERPModule.ts — Le contrat operational existe dans ERPModule

## Findings

- [WARN_HIGH] src/components/erp/operational/ERPOperationalModulePage.tsx — Chaîne branding/contexte détectée : AMARKHYS
- [WARN_HIGH] src/components/erp/operational/ERPOperationalModulePage.tsx — Chaîne branding/contexte détectée : Runtime ERP
- [WARN_HIGH] src/components/erp/operational/ERPOperationalModulePage.tsx — Chaîne branding/contexte détectée : Vue opérationnelle
- [WARN] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Chaîne branding/contexte détectée : AMARKHYS
- [WARN] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Chaîne branding/contexte détectée : Vue opérationnelle
- [WARN] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Chaîne branding/contexte détectée : atelier
- [WARN] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Chaîne branding/contexte détectée : AMARKHYS
- [WARN] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Chaîne branding/contexte détectée : Atelier aujourd'hui
- [WARN] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Chaîne branding/contexte détectée : Vue opérationnelle
- [WARN] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Chaîne branding/contexte détectée : atelier
- [WARN] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Chaîne branding/contexte détectée : AMARKHYS
- [WARN] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Chaîne branding/contexte détectée : Facturation aujourd'hui
- [WARN] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Chaîne branding/contexte détectée : Vue opérationnelle
- [WARN] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Chaîne branding/contexte détectée : atelier

## Décision

Le branding peut être extrait vers une configuration metadata-driven.
