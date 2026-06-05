# Q2-I-E-B-A — Operational tree display policy readiness

## Scope

- Goal: inspect readiness for a generic operational tree display policy.
- No code modification in this pass.
- Target policy location: `ERPOperationalModuleConfig.tree`.

## Proposed policy

```ts
export type ERPOperationalTreePlacement =
  | "beforeChildren"
  | "afterChildren"
  | "hidden";

export interface ERPOperationalTreeConfig {
  enabled?: boolean;
  title?: string;
  emptyLabel?: string;
  defaultExpandedDepth?: number;
  placement?: ERPOperationalTreePlacement;
}
```

## Summary

- OK: 14
- WARN: 6
- FAIL: 0

## Checks

| Status | Check | Details |
|---|---|---|
| OK | File exists: erpModule | src/runtime/modules/ERPModule.ts |
| OK | File exists: expandedChildren | src/components/erp/operational/ERPOperationalExpandedChildren.tsx |
| OK | File exists: recordTree | src/components/erp/operational/ERPOperationalRecordTree.tsx |
| OK | File exists: treeView | src/components/erp/operational/ERPOperationalTreeView.tsx |
| OK | ERPOperationalModuleConfig exists | Tree display policy should be added to the existing operational config. |
| OK | Operational config already hosts rightPanel policy | This confirms tree config belongs beside table/rightPanel. |
| OK | No existing operational tree config | Q2-I-E-B-B can introduce it without replacing another config. |
| OK | Record tree currently mounted | The display policy will control this generic mount. |
| WARN | Tree title is fixed in expanded children | This should become operational.tree.title with fallback. |
| WARN | Tree empty label is fixed in expanded children | This should become operational.tree.emptyLabel with fallback. |
| WARN | Tree default expanded depth is fixed in expanded children | This should become operational.tree.defaultExpandedDepth with fallback. |
| OK | Record tree receives generic parent context | Policy can be read from parentModule.operational?.tree. |
| OK | Record tree already accepts display props | Wiring can pass metadata values without changing resolver behavior. |
| WARN | Record tree has fallback expanded depth | Acceptable fallback, but parent policy should drive preferred value. |
| WARN | Tree view has fallback title | Fallback is acceptable, but mounted policy should drive user-facing label. |
| OK | Record tree still delegates to resolver | Display policy must not alter tree loading architecture. |
| OK | No RuntimeDataBinding.list in UI stack | Policy must stay display-only. |
| OK | No direct Firestore access in UI stack | Policy must not add UI data loading. |
| OK | No hardcoded AMARKHYS context | Tree policy must remain generic. |
| WARN | Generated modules do not obviously declare operational config in search result | Not blocking: policy can be typed first, configured later only where needed. |

## Decision

Q2-I-E-B-A is validated. The operational tree display policy can be added generically to `ERPOperationalModuleConfig.tree`.

Recommended next step: Q2-I-E-B-B add the type and consume `parentModule.operational?.tree` in `ERPOperationalExpandedChildren`, while keeping fallbacks.