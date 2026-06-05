# Q2-I-E-B-C — Operational tree display policy audit

## Scope

- Type: `ERPOperationalTreeConfig`
- Metadata location: `ERPOperationalModuleConfig.tree`
- Consumer: `ERPOperationalExpandedChildren`
- Goal: validate generic display policy for operational tree.

## Summary

- OK: 21
- FAIL: 0

## Checks

| Status | Check | Details |
|---|---|---|
| OK | File exists: erpModule | src/runtime/modules/ERPModule.ts |
| OK | File exists: expandedChildren | src/components/erp/operational/ERPOperationalExpandedChildren.tsx |
| OK | File exists: recordTree | src/components/erp/operational/ERPOperationalRecordTree.tsx |
| OK | File exists: treeView | src/components/erp/operational/ERPOperationalTreeView.tsx |
| OK | ERPOperationalTreePlacement is typed | Tree placement must be generic and metadata-driven. |
| OK | ERPOperationalTreeConfig is typed | Tree display policy must expose enabled/title/empty/depth/placement. |
| OK | ERPOperationalModuleConfig exposes tree policy | Module metadata can now configure operational tree display. |
| OK | Expanded children reads parentModule.operational.tree | Display policy must come from module metadata. |
| OK | Expanded children supports hidden placement | Metadata can hide the tree without page patches. |
| OK | Expanded children supports beforeChildren placement | Metadata can place tree before child blocks. |
| OK | Expanded children supports afterChildren placement | Metadata can place tree after child blocks. |
| OK | Expanded children supports enabled false | Metadata can disable the tree. |
| OK | Expanded children uses metadata title | Fixed title must be replaced by policy value. |
| OK | Expanded children uses metadata empty label | Fixed empty label must be replaced by policy value. |
| OK | Expanded children uses metadata expanded depth | Fixed depth must be replaced by policy value. |
| OK | Fixed tree props removed from mount | Mount should be metadata-driven. |
| OK | Record tree still delegates to RuntimeOperationalTreeResolver | Display policy must not affect data resolution. |
| OK | Tree view still preserves return context | Return context must remain preserved. |
| OK | No direct Firestore access in tree UI stack | UI stack must not read Firestore directly. |
| OK | No RuntimeDataBinding.list in tree UI stack | UI stack must not call RuntimeDataBinding.list. |
| OK | No hardcoded AMARKHYS context in tree UI stack | Policy must remain generic. |

## Decision

Q2-I-E-B-C is validated. Operational tree display is now controlled by generic module metadata via `operational.tree` with fallbacks.

Next step: optionally configure selected modules through metadata, or run a visual validation with default policy.