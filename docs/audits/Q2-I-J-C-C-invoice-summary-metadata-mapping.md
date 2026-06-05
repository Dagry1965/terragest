# Q2-I-J-C-C — Invoice summary metadata mapping audit

## Scope

- Goal: validate metadata-driven invoice summary in the operational tree.
- Renderer must stay generic.
- Invoice fields must live in `facturesauto` metadata.

## Summary

- OK: 17
- FAIL: 0

## Checks

| Status | Check | Details |
|---|---|---|
| OK | File exists: erpModule | src/runtime/modules/ERPModule.ts |
| OK | File exists: resolver | src/runtime/operational/RuntimeOperationalTreeResolver.ts |
| OK | File exists: treeView | src/components/erp/operational/ERPOperationalTreeView.tsx |
| OK | File exists: factures | src/runtime/modules/generated/facturesauto/facturesauto.module.ts |
| OK | ERPModule exposes operational tree summary config | Metadata type must allow operational.tree.summary. |
| OK | Resolver exposes runtime summary contract | Runtime tree node must expose summary. |
| OK | Resolver builds summary from module metadata | Summary must be metadata-driven. |
| OK | Resolver maps summary into buildNode | Every node can receive a summary when configured. |
| OK | Resolver applies rootOnly policy | Summary can be limited to root node. |
| OK | TreeView renders summary generically | Renderer consumes generic node.summary only. |
| OK | TreeView has no invoice field hardcode | Invoice-specific fields must stay in metadata. |
| OK | facturesauto configures operational tree summary | Invoice summary must be configured in module metadata. |
| OK | facturesauto configures invoice badges | Badges should reflect type/status/payment status. |
| OK | facturesauto configures financial metrics | Metrics should expose HT/TVA/TTC/paid/remaining. |
| OK | facturesauto metrics use currency format | Financial metrics should render as currency-like numbers. |
| OK | No direct Firestore access in tree UI stack | TreeView remains presentation-only. |
| OK | No hardcoded AMARKHYS context in generic runtime files | Generic runtime must remain tenant/domain agnostic. |

## Decision

Q2-I-J-C-C is validated. Invoice root summary is now metadata-driven and mapped into RuntimeOperationalTreeNode.summary without hardcoding invoice fields in the generic renderer.

Next step: visual validation on FAC-ATELIER-Q2I-001.