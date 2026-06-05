# Q2-I-D-A — Operational tree wiring readiness audit

## Scope

- Goal: inspect where to wire `ERPOperationalTreeView` without page-specific patches.
- No UI modification in this pass.
- Expected doctrine: runtime / metadata-driven / no hardcoded AMARKHYS.

## Summary

- OK: 8
- WARN: 1
- FAIL: 0

## Checks

| Status | Check | Details |
|---|---|---|
| OK | Operational module page exists | src/components/erp/operational/ERPOperationalModulePage.tsx |
| OK | Operational table exists | src/components/erp/operational/ERPOperationalTable.tsx |
| OK | Expanded children component exists | src/components/erp/operational/ERPOperationalExpandedChildren.tsx |
| OK | Operational tree view exists | src/components/erp/operational/ERPOperationalTreeView.tsx |
| OK | RuntimeOperationalTreeResolver exists | src/runtime/operational/RuntimeOperationalTreeResolver.ts |
| true | OK | Expanded children is already wired in the operational UI flow |
| true | OK | Expanded children receives parent module and parent record |
| true | OK | Expanded children currently delegates child loading to runtime resolver |
| true | OK | Tree resolver is available as runtime layer |
| true | OK | Tree resolver is exported from runtime operational index |
| true | OK | Tree view consumes RuntimeOperationalTreeNode |
| OK | Tree view has no direct Firestore access | UI must stay presentation-only. |
| OK | Tree view does not call RuntimeDataBinding.list | Data loading must remain resolver/service side. |
| OK | No hardcoded AMARKHYS context in operational UI files | Operational UI must stay generic. |
| WARN | Tree view exported from operational component index | If missing, Q2-I-D-B should export it before wiring. |
| true | OK | Expanded children already preserves runtime return context |
| true | OK | Tree view has return context props |

## Decision

Q2-I-D-A is ready. The preferred wiring layer is the generic operational expansion flow, not a business page and not the metrics right panel.

Recommended next pass: Q2-I-D-B wire `RuntimeOperationalTreeResolver` into a generic operational component, likely near `ERPOperationalExpandedChildren`, then render `ERPOperationalTreeView` from the resolved tree.