# Q2-I-H-A — Operational tree graphic readiness audit

## Scope

- Goal: prepare a generic graphical refactor of `ERPOperationalTreeView`.
- No code modification in this pass.
- Target: render a readable hierarchical business tree, not a stack of expandable cards.

## Target visual direction

```text
Client
├── Vehicules
│   └── Rendez-vous
│       └── Interventions
│           ├── Lignes intervention
│           └── Sources de lignes facture atelier
└── Factures liees atelier
    └── Source metier
        ├── sourceScope = atelier
        ├── sourceType = intervention
        ├── sourceModule = interventionsauto
        ├── sourceRecordId = interventionId
        ├── sourceLabel = Intervention / vehicule / client
        ├── Lignes facture
        ├── Encaissements
        ├── Echeances
        │   └── Relances echeance
        └── Relances facture
```

## Summary

- OK: 20
- WARN: 4
- FAIL: 0

## Checks

| Status | Check | Details |
|---|---|---|
| OK | File exists: treeView | src/components/erp/operational/ERPOperationalTreeView.tsx |
| OK | File exists: recordTree | src/components/erp/operational/ERPOperationalRecordTree.tsx |
| OK | File exists: expandedChildren | src/components/erp/operational/ERPOperationalExpandedChildren.tsx |
| OK | File exists: resolver | src/runtime/operational/RuntimeOperationalTreeResolver.ts |
| OK | File exists: tokens | src/components/erp/operational/operationalUiTokens.ts |
| OK | Tree view consumes RuntimeOperationalTreeNode | The graphic renderer must remain based on runtime tree nodes. |
| OK | Tree view has a node renderer | The graphical refactor can be localized in the node renderer. |
| OK | Tree view renders children recursively | Required for hierarchical visual rendering. |
| OK | Tree view supports expand/collapse | The refactor should preserve local expand/collapse. |
| OK | Tree view uses node depth | Depth can drive indentation and branch spacing. |
| WARN | Current indentation is padding-based | Refactor should move toward explicit branch/line rendering. |
| WARN | Current node display is card-like | User requested a more graphical tree, less expandable-list/card stack. |
| OK | Tree view has role-based styling | Role styling can be preserved while changing layout. |
| OK | Tree view displays source summary | Source metadata must remain visible in the new graphic representation. |
| OK | Tree view exposes source fields | Required for invoice/source documentary display. |
| OK | Tree view preserves return context | Graphic refactor must not break open/return navigation. |
| OK | Tree view supports openLabel | Open action must stay available but visually less intrusive. |
| OK | Record tree delegates to resolver | Graphic refactor must not touch data resolution. |
| WARN | Tree display policy is consumed | Graphic rendering should remain controlled by operational.tree. |
| OK | Resolver provides source metadata | Needed for invoice atelier source display. |
| OK | No direct Firestore access in tree UI stack | Graphic refactor must stay presentation-only. |
| OK | No RuntimeDataBinding.list in tree UI stack | Graphic refactor must not add loading logic. |
| OK | No hardcoded AMARKHYS context | Graphic refactor must remain generic. |
| WARN | Operational tokens may include tree/branch styling | If absent, refactor can use local stable classes first, then tokenize later. |

## Recommendations

| Recommendation | Details |
|---|---|
| Replace card-stack feel with explicit tree branches | Use a vertical connector line and horizontal branch segment per child node. |
| Keep node content compact | Show role badge, module label, main label, subtitle and source summary without large cards. |
| Preserve local expand/collapse | A tree node with children should keep a small expand button at the branch point. |
| Keep Open action secondary | Open should remain available but not dominate the graphical hierarchy. |
| Do not alter resolver or data loading | Q2-I-H-B should modify only graphical rendering in ERPOperationalTreeView. |

## Decision

Q2-I-H-A is validated. The graphical refactor can be localized in `ERPOperationalTreeView` while preserving resolver, metadata policy, return context and generic runtime doctrine.

Next step: Q2-I-H-B refactor `ERPOperationalTreeView` into a compact branch-based visual tree.