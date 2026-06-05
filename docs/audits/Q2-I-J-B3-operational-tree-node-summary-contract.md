# Q2-I-J-B3 — Operational tree node summary contract audit

## Scope

- Goal: validate the generic `RuntimeOperationalTreeNode.summary` contract.
- No invoice-specific configuration in this pass.
- Renderer must stay generic and data-loading free.

## Summary

- OK: 19
- FAIL: 0

## Checks

| Status | Check | Details |
|---|---|---|
| OK | File exists: resolver | src/runtime/operational/RuntimeOperationalTreeResolver.ts |
| OK | File exists: treeView | src/components/erp/operational/ERPOperationalTreeView.tsx |
| OK | File exists: recordTree | src/components/erp/operational/ERPOperationalRecordTree.tsx |
| OK | File exists: expandedChildren | src/components/erp/operational/ERPOperationalExpandedChildren.tsx |
| OK | Runtime summary tone type exists | Summary badges can use generic semantic tones. |
| OK | Runtime summary metric format exists | Summary metrics can be formatted generically. |
| OK | Runtime summary badge contract exists | Badges are generic and not invoice-specific. |
| OK | Runtime summary metric contract exists | Metrics are generic and not invoice-specific. |
| OK | Runtime tree node exposes optional summary | Any tree node can optionally expose a summary. |
| OK | Tree view renders summary badges | Badges are rendered only when present. |
| OK | Tree view renders summary metrics | Metrics are rendered only when present. |
| OK | Tree view summary is generic | Generic renderer must not know invoice fields. |
| OK | Tree graphic rendering preserved | Summary must not remove graphical hierarchy. |
| OK | Tree return context preserved | Open links must preserve contextual return. |
| OK | Record tree still delegates to resolver | No UI loading regression. |
| OK | Expanded children still consumes operational tree policy | Display remains metadata-policy driven. |
| OK | No direct Firestore access in tree UI stack | UI stack must not read Firestore directly. |
| OK | No RuntimeDataBinding.list in tree UI stack | UI stack must not call RuntimeDataBinding.list. |
| OK | No hardcoded AMARKHYS context | Summary rendering remains generic. |

## Decision

Q2-I-J-B3 is validated. The operational tree now supports a generic optional node summary with badges and metrics, without invoice-specific hardcode.

Next step: Q2-I-J-C can configure `facturesauto` metadata and map summary values from records.