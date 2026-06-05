# Q2-I-D-C-C — Expanded children record tree wiring audit

## Scope

- Component: `src/components/erp/operational/ERPOperationalExpandedChildren.tsx`
- Mounted component: `ERPOperationalRecordTree`
- Goal: validate generic tree wiring in the operational expansion flow.
- No business page wiring.

## Summary

- OK: 15
- FAIL: 0

## Checks

| Status | Check | Details |
|---|---|---|
| OK | Expanded children exists | src/components/erp/operational/ERPOperationalExpandedChildren.tsx |
| OK | Record tree exists | src/components/erp/operational/ERPOperationalRecordTree.tsx |
| OK | Tree view exists | src/components/erp/operational/ERPOperationalTreeView.tsx |
| OK | Expanded children imports ERPOperationalRecordTree | The generic wrapper must be imported from the same operational component layer. |
| OK | Expanded children mounts ERPOperationalRecordTree | The tree must be mounted in the generic expanded children flow. |
| OK | Expanded children passes parentModule | The tree resolver wrapper must receive module context. |
| OK | Expanded children passes parentRecord | The tree resolver wrapper must receive record context. |
| OK | Expanded children still uses RuntimeOperationalChildrenResolver | Existing expanded children behavior must remain runtime-driven. |
| OK | Expanded children still preserves return navigation context | Existing child/grandchild links must remain protected. |
| OK | Record tree still delegates to RuntimeOperationalTreeResolver | Tree loading must stay in runtime resolver layer. |
| OK | Record tree still delegates UI to ERPOperationalTreeView | Tree rendering must stay in the tree view component. |
| OK | No direct Firestore access in wired files | Operational UI must not read Firestore directly. |
| OK | No RuntimeDataBinding.list in wired files | UI must not call data binding list directly. |
| OK | No hardcoded AMARKHYS context | Wiring must stay generic and tenant/workspace agnostic. |
| OK | No business page path wiring | The tree must not be wired through business-specific routes. |

## Decision

Q2-I-D-C-C is validated. `ERPOperationalRecordTree` is now mounted in the generic operational expanded children flow.

Next step: visual/runtime test on one operational page, without adding any page-specific code.