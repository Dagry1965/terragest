# Q2-I-J-A — Operational tree root summary readiness audit

## Scope

- Goal: prepare a generic root/node summary mechanism for the graphical operational tree.
- No code modification in this pass.
- Target use case: invoice root summary for atelier invoice `FAC-ATELIER-Q2I-001`.
- Doctrine: no invoice-specific hardcode in the generic renderer.

## Target visual direction

```text
FAC-ATELIER-Q2I-001
[FACTURE ATELIER] [EMISE] [PAIEMENT PARTIEL]
HT 140 000 | TVA 25 200 | TTC 165 200 | Paye 90 000 | Reste 75 200

├── Source metier
├── Lignes facture
├── Encaissements
├── Echeances
└── Relances
```

## Summary

- OK: 19
- WARN: 1
- FAIL: 0

## Checks

| Status | Check | Details |
|---|---|---|
| OK | File exists: erpModule | src/runtime/modules/ERPModule.ts |
| OK | File exists: resolver | src/runtime/operational/RuntimeOperationalTreeResolver.ts |
| OK | File exists: treeView | src/components/erp/operational/ERPOperationalTreeView.tsx |
| OK | File exists: recordTree | src/components/erp/operational/ERPOperationalRecordTree.tsx |
| OK | File exists: expandedChildren | src/components/erp/operational/ERPOperationalExpandedChildren.tsx |
| OK | File exists: factures | src/runtime/modules/generated/facturesauto/facturesauto.module.ts |
| OK | Operational tree config exists | Root summary policy should extend the existing operational.tree config. |
| OK | RuntimeOperationalTreeNode exists in resolver | Node summary should be added to the runtime tree node contract. |
| true | OK | Resolver already maps node display fields |
| OK | Resolver already supports source metadata | Source metadata must remain separate from financial summary. |
| OK | facturesauto exposes financial fields | Invoice root summary can use these fields through metadata. |
| OK | facturesauto exposes status/type fields | Invoice root badges can use these fields through metadata. |
| WARN | No existing node summary mechanism detected | Q2-I-J-B can introduce one generically. |
| OK | Tree view has localized node renderer | Summary rendering can be added inside node renderer only. |
| OK | Graphic tree rendering is active | Summary must preserve the graphical hierarchy. |
| OK | Tree view preserves return context | Summary rendering must not affect open/return navigation. |
| OK | Record tree delegates to resolver | No loading logic should be added to the tree view. |
| OK | Expanded children consumes operational.tree policy | Root summary should remain metadata/runtime policy-driven. |
| OK | No direct Firestore access in tree UI stack | Summary must not add direct data reads. |
| OK | No RuntimeDataBinding.list in tree UI stack | Summary must use data already present in runtime tree nodes. |
| OK | No hardcoded AMARKHYS context | Summary mechanism must remain generic. |

## Recommendations

| Recommendation | Details |
|---|---|
| Add a generic node summary contract | Example: RuntimeOperationalTreeNode.summary with badges and metrics. |
| Drive summary fields by metadata | Example: operational.tree.summary.fields or operational.tree.nodeSummary. |
| Keep invoice-specific choices in facturesauto metadata | The renderer must not know about montantHT, montantTTC or statutPaiement directly. |
| Render summary only when present | Non-financial modules should keep the compact node layout. |
| Start with root node summary only | Avoid overloading every child node before validating the UX. |

## Decision

Q2-I-J-A is validated. A generic root/node summary mechanism can be introduced without changing data loading, resolver responsibilities or business pages.

Recommended next step: Q2-I-J-B add metadata-driven summary config and map it into RuntimeOperationalTreeNode.