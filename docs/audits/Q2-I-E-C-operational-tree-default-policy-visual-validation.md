# Q2-I-E-C — Operational tree default policy visual validation

## Scope

- Goal: validate default `operational.tree` behavior after generic display policy.
- No code modification in this pass.
- Validation confirms default visibility, placement, depth, contextual return, and no business-page wiring.

## Static audit summary

- OK: 15
- FAIL: 0

## Static checks

| Status | Check | Details |
|---|---|---|
| OK | File exists: erpModule | src/runtime/modules/ERPModule.ts |
| OK | File exists: expandedChildren | src/components/erp/operational/ERPOperationalExpandedChildren.tsx |
| OK | File exists: recordTree | src/components/erp/operational/ERPOperationalRecordTree.tsx |
| OK | File exists: treeView | src/components/erp/operational/ERPOperationalTreeView.tsx |
| OK | ERPOperationalModuleConfig exposes tree policy | Metadata can configure operational tree display. |
| OK | Default placement is beforeChildren | Tree is visible before child blocks by default. |
| OK | Tree can be hidden by metadata | Modules can hide tree without page-specific code. |
| OK | Default depth is 2 | Default depth stays coherent with visual validation. |
| OK | Before children mount is metadata-driven | No fixed props remain in the default mount. |
| OK | After children placement is supported | Future metadata can move tree below child blocks. |
| OK | Record tree still delegates to RuntimeOperationalTreeResolver | Data resolution remains runtime-driven. |
| OK | Tree view preserves return context | Tree links preserve contextual return. |
| OK | No direct Firestore access in tree UI stack | UI stack must not read Firestore directly. |
| OK | No RuntimeDataBinding.list in tree UI stack | UI stack must not call RuntimeDataBinding.list. |
| OK | No hardcoded AMARKHYS context in tree UI stack | Tree remains generic. |

## Manual visual validation

| Result | Check | Details |
|---|---|---|
| OK | Arbre visible par défaut | Validated visually with default operational.tree policy. |
| OK | Placement beforeChildren par défaut | Tree appears before existing child blocks. |
| OK | Profondeur par défaut cohérente | Default depth did not create blocking visual overload. |
| OK | Enfants existants visibles | Existing child blocks remain visible and functional. |
| OK | Retour contextuel depuis l’arbre | Open/return flow remains contextual. |
| OK | Pas de crash | No runtime crash during visual validation. |
| OK | Pas de page métier modifiée | Validation confirms generic runtime wiring. |
| OK | Pas de surcharge visuelle bloquante | Default policy is acceptable for now. |

## Decision

Q2-I-E-C is validated. The operational tree default policy is acceptable visually and remains fully generic.

Next step: keep defaults for now. Configure `operational.tree` only module by module if visual overload appears later.