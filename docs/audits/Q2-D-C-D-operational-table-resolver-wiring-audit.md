# Q2-D-C-D — Audit branchement ERPOperationalTable vers RuntimeOperationalDataResolver

OK: 11
FAIL: 0

## Checks

- [OK] src/components/erp/operational/ERPOperationalTable.tsx — ERPOperationalTable importe/utilise RuntimeOperationalDataResolver
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — ERPOperationalTable utilise resolveRelationLabels
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — ERPOperationalTable utilise resolveChildTotals
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — ERPOperationalTable ne charge plus directement via RuntimeDataBinding.list
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — ERPOperationalTable conserve setRelationLabels
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — ERPOperationalTable conserve setChildTotals
- [OK] src/runtime/operational/RuntimeOperationalDataResolver.ts — Resolver expose resolveRelationLabels
- [OK] src/runtime/operational/RuntimeOperationalDataResolver.ts — Resolver expose resolveChildTotals
- [OK] src/runtime/operational/RuntimeOperationalDataResolver.ts — Resolver centralise les lectures RuntimeDataBinding.list
- [OK] src/runtime/operational/RuntimeOperationalDataResolver.ts — Resolver ne lit pas Firestore directement
- [OK] src/runtime/operational/index.ts — index.ts exporte RuntimeOperationalDataResolver

## Décision

ERPOperationalTable est correctement branché au RuntimeOperationalDataResolver.
