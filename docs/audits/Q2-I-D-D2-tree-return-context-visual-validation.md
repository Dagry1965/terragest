# Q2-I-D-D2 — Operational tree return context visual validation

## Scope

- Components:
  - `src/components/erp/operational/ERPOperationalTreeView.tsx`
  - `src/components/erp/operational/ERPOperationalRecordTree.tsx`
  - `src/components/erp/operational/ERPOperationalExpandedChildren.tsx`
- Goal: validate operational tree visual/runtime behavior and contextual return.
- No business page-specific wiring.

## Static audit summary

- OK: 15
- FAIL: 0

## Static checks

| Status | Check | Details |
|---|---|---|
| OK | Tree view exists | src/components/erp/operational/ERPOperationalTreeView.tsx |
| OK | Record tree exists | src/components/erp/operational/ERPOperationalRecordTree.tsx |
| OK | Expanded children exists | src/components/erp/operational/ERPOperationalExpandedChildren.tsx |
| OK | Tree view imports appendRuntimeReturnContext | Tree links must preserve runtime return context. |
| OK | Tree view no longer discards currentReturnTo | The previous no-op marker must be removed. |
| OK | Tree view no longer discards currentReturnLabel | The previous no-op marker must be removed. |
| OK | Tree view passes returnTo to appendRuntimeReturnContext | The current return target must be propagated. |
| OK | Tree view passes returnLabel to appendRuntimeReturnContext | The current return label must be propagated. |
| OK | Tree view passes source module and record | The clicked tree node must be identifiable by the return context. |
| OK | Tree view passes expanded and scroll targets | The destination link must preserve contextual navigation metadata. |
| OK | Record tree still builds current return context | The wrapper must keep generic return context creation. |
| OK | Expanded children still mounts record tree | The operational tree must remain mounted in the generic expansion flow. |
| OK | No direct Firestore access in tree UI stack | Tree UI stack must not access Firestore directly. |
| OK | No RuntimeDataBinding.list in tree UI stack | Tree UI stack must not call data binding directly. |
| OK | No hardcoded AMARKHYS context | Tree wiring must stay generic. |

## Manual validation

| Result | Check | Details |
|---|---|---|
| OK | Arbre opérationnel visible | Validated manually on an operational page. |
| OK | Enfants existants visibles | Existing expanded children remained visible. |
| OK | Pas de crash | No runtime crash during expand/open/return flow. |
| OK | Pas de doublon bloquant | No blocking duplicate UI issue observed. |
| OK | Pas de page métier modifiée | No business page was modified. |
| OK | Retour contextuel | Open from tree and contextual return validated. |
| OK | Build | `pnpm run build` completed successfully. |

## Decision

Q2-I-D-D2 is validated. The operational tree is visible, the existing expanded children remain functional, and contextual return is now preserved from tree links.

Next step: Q2-I-E can refine UX/metadata behavior if needed, without changing the generic runtime architecture.