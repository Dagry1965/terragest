# Q2-D-C-A — Audit relationLabels / childTotals loading

OK: 16
FAIL: 0
WARN: 2
RECOMMEND: 1

## Checks

- [OK] src/components/erp/operational/ERPOperationalTable.tsx — ERPOperationalTable utilise RuntimeDataBinding.list
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — ERPOperationalTable gère relationLabels
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — ERPOperationalTable gère childTotals
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — ERPOperationalTable lit relationLabelFields
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — ERPOperationalTable lit totalField
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — ERPOperationalTable lit foreignKey
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — ERPOperationalExpandedChildren utilise RuntimeDataBinding.list
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — ERPOperationalExpandedChildren lit composition.children
- [OK] src/runtime/modules/ERPModule.ts — Type ERPOperationalChildTotalConfig présent
- [OK] src/runtime/modules/ERPModule.ts — Type relationLabelFields présent
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — src/runtime/modules/generated/rendezvous/rendezvous.module.ts déclare operational
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — src/runtime/modules/generated/rendezvous/rendezvous.module.ts déclare relationLabelFields
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts déclare operational
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts déclare relationLabelFields
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts déclare operational
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — src/runtime/modules/generated/facturesauto/facturesauto.module.ts déclare relationLabelFields

## Findings

- [INFO] src/components/erp/operational/ERPOperationalTable.tsx — RuntimeDataBinding.list dans la table : 2
- [INFO] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — RuntimeDataBinding.list dans l'expand : 1
- [INFO] src/components/erp/operational/ERPOperationalTable.tsx — Occurrences relationLabels : 2
- [INFO] src/components/erp/operational/ERPOperationalTable.tsx — Occurrences childTotals : 6
- [WARN] src/components/erp/operational/ERPOperationalTable.tsx — La table semble charger séparément les relations et les totaux enfants. Un resolver/cache central est recommandé.
- [WARN] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — L'expand charge les enfants via RuntimeDataBinding.list. À garder lazy, mais prévoir cache/batch pour gros volumes.
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Des chargements parallèles Promise.all existent déjà.
- [INFO] src/components/erp/operational/ERPOperationalTable.tsx — relationLabels est stocké localement dans le composant.
- [INFO] src/components/erp/operational/ERPOperationalTable.tsx — childTotals est stocké localement dans le composant.
- [INFO] src/components/erp/operational/ERPOperationalTable.tsx — ERPOperationalTable utilise useEffect pour charger des données auxiliaires.
- [RECOMMEND] src/runtime/operational — Créer une couche runtime dédiée : RuntimeOperationalDataResolver.

## Décision

Préparer RuntimeOperationalDataResolver sans modifier encore le comportement UI.
