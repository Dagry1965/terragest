# Q2-I-C3 — ERPOperationalTreeView generic audit

## Scope

- Component: `src/components/erp/operational/ERPOperationalTreeView.tsx`
- Goal: validate generic runtime-driven tree UI foundation.
- No page wiring in this pass.

## Summary

- OK: 14
- FAIL: 0

## Checks

| Status | Check | Details |
|---|---|---|
| OK | Component file exists | src/components/erp/operational/ERPOperationalTreeView.tsx |
| OK | Receives RuntimeOperationalTreeNode | The component must be typed from the runtime tree resolver contract. |
| OK | Displays node label | Tree nodes must expose the business label. |
| OK | Displays node subtitle | Tree nodes must expose the business subtitle. |
| OK | Displays moduleLabel | Tree nodes must expose the module label. |
| OK | Displays nodeRole | Tree nodes must expose the semantic node role. |
| OK | Displays source information | Tree nodes must support documentary/source metadata. |
| OK | Supports recursive children rendering | The component must render children recursively or through a recursive renderer. |
| OK | Supports local expand/collapse | Expand/collapse must stay local to the UI component. |
| OK | Supports openLabel | The component must expose navigation wording without owning navigation policy. |
| OK | Does not read Firestore directly | The UI component must not access Firestore. |
| OK | Does not call RuntimeDataBinding.list | The UI component must not load data directly. |
| OK | Does not hardcode AMARKHYS | The UI component must remain product/runtime generic. |
| OK | Does not use missing operationalUiTokens.card | The previous build error must be removed. |

## Decision

Q2-I-C3 is validated. `ERPOperationalTreeView` is ready as a generic UI foundation.

Next step: Q2-I-D can wire the tree into a runtime page/view, after a dedicated readiness audit.