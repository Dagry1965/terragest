# Q2-I-H-C — Operational tree graphic view audit

## Scope

- Component: `src/components/erp/operational/ERPOperationalTreeView.tsx`
- Goal: validate compact graphical tree rendering with branch connectors.
- No resolver, data loading, metadata, or business page changes.

## Summary

- OK: 18
- FAIL: 0

## Checks

| Status | Check | Details |
|---|---|---|
| OK | File exists: treeView | src/components/erp/operational/ERPOperationalTreeView.tsx |
| OK | File exists: recordTree | src/components/erp/operational/ERPOperationalRecordTree.tsx |
| OK | File exists: expandedChildren | src/components/erp/operational/ERPOperationalExpandedChildren.tsx |
| OK | Tree view keeps RuntimeOperationalTreeNode contract | Graphic refactor must keep runtime node typing. |
| OK | Tree view keeps recursive renderer | Tree must remain recursive. |
| OK | Tree view keeps local expand collapse | Expand/collapse must remain local UI state. |
| OK | Tree view has vertical branch connector | Graphical tree must show vertical branch structure. |
| OK | Tree view has horizontal branch connector | Graphical tree must show child connector lines. |
| OK | Tree view is more compact than previous card stack | Node card and expand button should be compact. |
| OK | Tree view keeps role label | Role-based semantic display must be preserved. |
| OK | Tree view keeps source summary | Source metadata remains visible. |
| OK | Tree view keeps open links | Open action must remain available. |
| OK | Tree view preserves return context | Open action must preserve contextual return. |
| OK | Record tree still delegates to RuntimeOperationalTreeResolver | Graphic refactor must not change loading. |
| OK | Expanded children still consumes operational.tree policy | Display policy remains metadata-driven. |
| OK | No direct Firestore access in tree UI stack | UI stack must not read Firestore directly. |
| OK | No RuntimeDataBinding.list in tree UI stack | UI stack must not call RuntimeDataBinding.list. |
| OK | No hardcoded AMARKHYS context | Graphic renderer must remain generic. |

## Decision

Q2-I-H-C is validated. `ERPOperationalTreeView` now renders a compact graphical hierarchy while preserving runtime resolver delegation, metadata display policy and contextual return.

Next step: visual validation on operational pages, especially `/facturesauto` and `/rendezvous`.