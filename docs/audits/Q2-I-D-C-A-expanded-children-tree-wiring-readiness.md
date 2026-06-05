# Q2-I-D-C-A — Expanded children tree wiring readiness

## Scope

- Goal: inspect whether `ERPOperationalRecordTree` can be mounted in the generic expanded children flow.
- No business page wiring.
- No UI modification in this audit pass.

## Summary

- OK: 14
- FAIL: 0

## Checks

| Status | Check | Details |
|---|---|---|
| OK | Expanded children component exists | src/components/erp/operational/ERPOperationalExpandedChildren.tsx |
| OK | Record tree wrapper exists | src/components/erp/operational/ERPOperationalRecordTree.tsx |
| OK | Tree view exists | src/components/erp/operational/ERPOperationalTreeView.tsx |
| OK | Expanded children receives parentModule | Required for generic runtime tree resolution. |
| OK | Expanded children receives parentRecord | Required for generic runtime tree resolution. |
| OK | Expanded children already works in parent record context | The component has the exact context needed by ERPOperationalRecordTree. |
| OK | Expanded children already preserves return context | Tree links must stay aligned with existing navigation context. |
| OK | Expanded children delegates loading to runtime children resolver | The existing component is already runtime-driven. |
| OK | Record tree delegates to runtime tree resolver | No tree traversal should be implemented inside expanded children. |
| OK | Record tree renders tree view | Expanded children should only mount the wrapper. |
| OK | Expanded children currently does not mount record tree | Q2-I-D-C-B should add the mount once. |
| OK | No direct Firestore access in record tree | UI wrapper must not access Firestore directly. |
| OK | No RuntimeDataBinding.list in record tree | Data access must remain runtime resolver responsibility. |
| OK | No AMARKHYS hardcode in tree components | Operational tree wiring must remain generic. |

## Decision

Q2-I-D-C-A is validated. `ERPOperationalExpandedChildren` is the correct generic wiring point for mounting `ERPOperationalRecordTree`.

Next step: Q2-I-D-C-B can mount `ERPOperationalRecordTree` inside `ERPOperationalExpandedChildren`, without modifying business pages.